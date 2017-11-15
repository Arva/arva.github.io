/* eslint no-var: "off" */
/* global Raphael */

var NUM_PARTICLES = ( ( ROWS = 27 ) * ( COLS = 61 ) ),
    THICKNESS = Math.pow( 20, 4 ),
    SPACING = 30,
    MARGIN = 0,
    COLOR = 170,
    DRAG = 0.5,
    EASE = 0.25,

    /*

    used for sine approximation, but Math.sin in Chrome is still fast enough :)http://jsperf.com/math-sin-vs-sine-approximation

    B = 4 / Math.PI,
    C = -4 / Math.pow( Math.PI, 2 ),
    P = 0.225,

    */

    container,
    particle,
    canvas,
    mouse,
    stats,
    list,
    ctx,
    tog,
    man,
    dx, dy,
    mx, my,
    d, t, f,
    a, b,
    i, n,
    w, h,
    p, s,
    r, c
    ;

particle = {
  vx: 0,
  vy: 0,
  x: 0,
  y: 0
};

function init() {

  container = document.getElementById( 'container' );
  canvas = document.createElement( 'canvas' );

  ctx = canvas.getContext( '2d' );
  man = false;
  tog = true;

  list = [];

  w = canvas.width = COLS * SPACING + MARGIN * 2;
  h = canvas.height = ROWS * SPACING + MARGIN * 2;

  container.style.marginLeft = Math.round( w * -0.5 ) + 'px';
  container.style.marginTop = Math.round( h * -0.5 ) + 'px';

  for ( i = 0; i < NUM_PARTICLES; i++ ) {

    p = Object.create( particle );
    p.x = p.ox = MARGIN + SPACING * ( i % COLS );
    p.y = p.oy = MARGIN + SPACING * Math.floor( i / COLS );

    list[i] = p;
  }

  document.addEventListener( 'mousemove', function(e) {

    bounds = container.getBoundingClientRect();
    mx = e.clientX - bounds.left;
    my = e.clientY - bounds.top;
    man = true;

  });

  if ( typeof Stats === 'function' ) {
    document.body.appendChild( ( stats = new Stats() )
        .domElement );
  }

  container.appendChild( canvas );
}

function step() {

  if ( stats ) stats.begin();

  if ( tog = !tog ) {

    if ( !man ) {

      t = +new Date() * 0.001;
      mx = w * 0.5 + ( Math.cos( t * 2.1 ) * Math.cos( t * 0.9 ) * w * 0.45 );
      my = h * 0.5 + ( Math.sin( t * 3.2 ) * Math.tan( Math.sin( t * 0.8 ) ) * h * 0.45 );
    }

    for ( i = 0; i < NUM_PARTICLES; i++ ) {

      p = list[i];

      d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
      f = -THICKNESS / d;

      if ( d < THICKNESS ) {
        t = Math.atan2( dy, dx );
        p.vx += f * Math.cos(t);
        p.vy += f * Math.sin(t);
      }

      p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
      p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;

    }

  } else {

    b = ( a = ctx.createImageData( w, h ) )
        .data;

    for ( i = 0; i < NUM_PARTICLES; i++ ) {

      p = list[i];
      b[n = ( ~~p.x + ( ~~p.y * w ) ) * 4] = b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
    }

    ctx.putImageData( a, 0, 0 );
  }

  if ( stats ) stats.end();

  requestAnimationFrame( step );
}

init();
step();

function loadSVG() {

    // var rsr = Raphael('graph', '800', '406');

    // var Page1 = rsr.set();
    // Page1.attr({'id': 'Page-1','stroke': 'none','stroke-width': '1','fill': 'none','fill-rule': 'evenodd','name': 'Page1'});
    // var home = rsr.set();
    // home.attr({'id': '01-home','stroke': 'none','stroke-width': '1','fill': 'none','fill-rule': 'evenodd','parent': 'Page1','name': 'home'});
    // // home.transform('t-326.000000, -5880.000000');
    // var Graph = rsr.set();
    // Graph.attr({'id': 'Graph','transformG': 'translate(-326.000000, -5880.000000)','stroke': 'none','stroke-width': '1','fill': 'none','fill-rule': 'evenodd','parent': 'Page1','name': 'Graph'});
    // // Graph.transform('t224.000000, 5880.000000');
    // var Graphic = rsr.set();
    // var Rectangle1 = rsr.path('M19,169 L79,169 L79,286.992483 C79,288.101204 78.1052696,289 77.0036926,289 L20.9963074,289 C19.8937773,289 19,288.103084 19,286.992483 L19,169 Z')
    //     .attr({id: 'Rectangle-6',fill: '#00FA9A',stroke: 'none','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Rectangle2 = rsr.path('M89,169 L149,169 L149,286.992483 C149,288.101204 148.10527,289 147.003693,289 L90.9963074,289 C89.8937773,289 89,288.103084 89,286.992483 L89,169 Z')
    //     .attr({id: 'Rectangle-6',fill: '#00FA9A',stroke: 'none','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Line1 = rsr.path('M84,1 L84,303')
    //     .attr({id: 'Line','stroke-opacity': '0.302451313',stroke: '#24EAC9','stroke-linecap': 'square','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Line');
    // var Rectangle3 = rsr.path('M159,169 L219,169 L219,286.992483 C219,288.101204 218.10527,289 217.003693,289 L160.996307,289 C159.893777,289 159,288.103084 159,286.992483 L159,169 Z')
    //     .attr({id: 'Rectangle-6',fill: '#00FA9A',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Line2 = rsr.path('M154,1 L154,303')
    //     .attr({id: 'Line','stroke-opacity': '0.302451313',stroke: '#24EAC9','stroke-linecap': 'square','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Line');
    // var Line3 = rsr.path('M760,167 L8,167')
    //     .attr({id: 'Line','stroke-opacity': '0.302451313',stroke: '#24EAC9',opacity: '0.5','stroke-linecap': 'square','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Line');
    // var Line4 = rsr.path('M760,46 L8,46')
    //     .attr({id: 'Line','stroke-opacity': '0.302451313',stroke: '#24EAC9',opacity: '0.5','stroke-linecap': 'square','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Line');
    // var Rectangle4 = rsr.path('M229,169 L289,169 L289,286.992483 C289,288.101204 288.10527,289 287.003693,289 L230.996307,289 C229.893777,289 229,288.103084 229,286.992483 L229,169 Z')
    //     .attr({id: 'Rectangle-6',fill: '#00FA9A',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Line5 = rsr.path('M224,1 L224,303')
    //     .attr({id: 'Line','stroke-opacity': '0.302451313',stroke: '#24EAC9','stroke-linecap': 'square','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Line');
    // var Rectangle5 = rsr.path('M299,169 L359,169 L359,286.992483 C359,288.101204 358.10527,289 357.003693,289 L300.996307,289 C299.893777,289 299,288.103084 299,286.992483 L299,169 Z')
    //     .attr({id: 'Rectangle-6',fill: '#00FA9A',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Line6 = rsr.path('M294,1 L294,303')
    //     .attr({id: 'Line','stroke-opacity': '0.302451313',stroke: '#24EAC9','stroke-linecap': 'square','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Line');
    // var Rectangle6 = rsr.path('M369,169 L429,169 L429,286.992483 C429,288.101204 428.10527,289 427.003693,289 L370.996307,289 C369.893777,289 369,288.103084 369,286.992483 L369,169 Z')
    //     .attr({id: 'Rectangle-6',fill: '#00FA9A',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Line7 = rsr.path('M364,1 L364,303')
    //     .attr({id: 'Line','stroke-opacity': '0.302451313',stroke: '#24EAC9','stroke-linecap': 'square','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Line');
    // var Rectangle7 = rsr.path('M439,169 L499,169 L499,286.992483 C499,288.101204 498.10527,289 497.003693,289 L440.996307,289 C439.893777,289 439,288.103084 439,286.992483 L439,169 Z')
    //     .attr({id: 'Rectangle-6',fill: '#00FA9A',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Line8 = rsr.path('M434,1 L434,303')
    //     .attr({id: 'Line','stroke-opacity': '0.302451313',stroke: '#24EAC9','stroke-linecap': 'square','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Line');
    // var Rectangle8 = rsr.path('M509,169 L569,169 L569,286.992483 C569,288.101204 568.10527,289 567.003693,289 L510.996307,289 C509.893777,289 509,288.103084 509,286.992483 L509,169 Z')
    //     .attr({id: 'Rectangle-6',fill: '#00FA9A',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Line9 = rsr.path('M504,1 L504,303')
    //     .attr({id: 'Line','stroke-opacity': '0.302451313',stroke: '#24EAC9','stroke-linecap': 'square','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Line');
    // var Rectangle9 = rsr.path('M579,169 L639,169 L639,286.992483 C639,288.101204 638.10527,289 637.003693,289 L580.996307,289 C579.893777,289 579,288.103084 579,286.992483 L579,169 Z')
    //     .attr({id: 'Rectangle-6',fill: '#00FA9A',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Line10 = rsr.path('M574,1 L574,303')
    //     .attr({id: 'Line','stroke-opacity': '0.302451313',stroke: '#24EAC9','stroke-linecap': 'square','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Line');
    // var Rectangle10 = rsr.rect(649, 169, 60, 120)
    //     .attr({id: 'Rectangle-6',fill: '#00FA9A',x: '649',y: '169',rx: '2',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Line11 = rsr.path('M644,1 L644,303')
    //     .attr({id: 'Line','stroke-opacity': '0.302451313',stroke: '#24EAC9','stroke-linecap': 'square','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Line');
    // var Line12 = rsr.path('M714,1 L714,303')
    //     .attr({id: 'Line','stroke-opacity': '0.302451313',stroke: '#24EAC9','stroke-linecap': 'square','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Line');
    // var Path1 = rsr.path('M398,353 C398,353 397.067661,348.026058 388,348 L94,348 C90.0634947,348 90,346 90,346')
    //     .attr({id: 'Path-3',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3');
    // var Path2 = rsr.path('M706,353 C706,353 705.067661,348.026058 696,348 L402,348 C398.063495,348 398,346 398,346')
    //     .attr({id: 'Path-3',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3');
    // var Rectangle11 = rsr.path('M19,46.0075171 C19,44.898796 19.8947304,44 20.9963074,44 L77.0036926,44 C78.1062227,44 79,44.8969164 79,46.0075171 L79,164 L19,164 L19,46.0075171 Z')
    //     .attr({id: 'Rectangle-6',fill: '#FEFE7C',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Rectangle12 = rsr.path('M89,58.9949669 C89,57.8931771 89.8947304,57 90.9963074,57 L147.003693,57 C148.106223,57 149,57.8928826 149,58.9949669 L149,164 L89,164 L89,58.9949669 Z')
    //     .attr({id: 'Rectangle-6',fill: '#FEFE7C',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Rectangle13 = rsr.path('M159,73.0071396 C159,71.898627 159.89473,71 160.996307,71 L217.003693,71 C218.106223,71 219,71.8906306 219,73.0071396 L219,164 L159,164 L159,73.0071396 Z')
    //     .attr({id: 'Rectangle-6',fill: '#FEFE7C',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Rectangle14 = rsr.path('M229,85.9974983 C229,84.8943104 229.89473,84 230.996307,84 L287.003693,84 C288.106223,84 289,84.8984375 289,85.9974983 L289,164 L229,164 L229,85.9974983 Z')
    //     .attr({id: 'Rectangle-6',fill: '#FEFE7C',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Rectangle15 = rsr.path('M299,99.0051769 C299,97.8977483 299.89473,97 300.996307,97 L357.003693,97 C358.106223,97 359,97.8964684 359,99.0051769 L359,164 L299,164 L299,99.0051769 Z')
    //     .attr({id: 'Rectangle-6',fill: '#FEFE7C',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Rectangle16 = rsr.path('M369,112.99691 C369,111.894047 369.89473,111 370.996307,111 L427.003693,111 C428.106223,111 429,111.897676 429,112.99691 L429,164 L369,164 L369,112.99691 Z')
    //     .attr({id: 'Rectangle-6',fill: '#FEFE7C',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Rectangle17 = rsr.path('M439,125.997292 C439,124.894218 439.89473,124 440.996307,124 L497.003693,124 C498.106223,124 499,124.89154 499,125.997292 L499,164 L439,164 L439,125.997292 Z')
    //     .attr({id: 'Rectangle-6',fill: '#FEFE7C',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Rectangle18 = rsr.path('M509,139.997005 C509,138.894089 509.89473,138 510.996307,138 L567.003693,138 C568.106223,138 569,138.894979 569,139.997005 L569,164 L509,164 L509,139.997005 Z')
    //     .attr({id: 'Rectangle-6',fill: '#FEFE7C',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Rectangle19 = rsr.path('M579,153.00276 C579,151.896666 579.89473,151 580.996307,151 L637.003693,151 C638.106223,151 639,151.893543 639,153.00276 L639,164 L579,164 L579,153.00276 Z')
    //     .attr({id: 'Rectangle-6',fill: '#FEFE7C',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Rectangle6');
    // var Path3 = rsr.path('M 392.799988 405.689663 396.229988 405.689663 395.929947 405 393.105545 405 z')
    //     .attr({id: 'Path-5','fill-opacity': '0.302451313',fill: '#24EAC9',stroke: 'none','stroke-width':'1','stroke-opacity':'1','stroke-width': '1','fill-rule': 'evenodd',parent: 'Page1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path5');
    // var Path3Copy1 = rsr.path('M752.5,202.5 C752.5,202.5 751.567661,197.526058 742.5,197.5 L697.5,197.5 C693.563495,197.5 693.5,195.5 693.5,195.5')
    //     .attr({id: 'Path-3-Copy',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     .rotate(-90)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path3Copy2 = rsr.path('M752.5,261.5 C752.5,261.5 751.567661,256.526058 742.5,256.5 L697.5,256.5 C693.563495,256.5 693.5,254.5 693.5,254.5')
    //     .attr({id: 'Path-3-Copy',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .rotate(90)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path3Copy3 = rsr.path('M63.5,110.5 C63.5,110.5 62.567661,105.526058 53.5,105.5 L-51.5,105.5 C-55.4365053,105.5 -55.5,103.5 -55.5,103.5')
    //     .attr({id: 'Path-3-Copy',stroke: '#FEFE7C','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //
    //     .rotate(-90)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path3Copy4 = rsr.path('M63.5,229.5 C63.5,229.5 62.567661,224.526058 53.5,224.5 L-51.5,224.5 C-55.4365053,224.5 -55.5,222.5 -55.5,222.5')
    //     .attr({id: 'Path-3-Copy',stroke: '#FEFE7C','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     .rotate(90)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path4 = rsr.path('M49,314 C49,314 48.067661,309.026058 39,309 L23,309 C19.0634947,309 19,307 19,307')
    //     .attr({id: 'Path-3',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3');
    // var Path3Copy5 = rsr.path('M79,314 C79,314 78.067661,309.026058 69,309 L53,309 C49.0634947,309 49,307 49,307')
    //     .attr({id: 'Path-3-Copy',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path5 = rsr.path('M119,314 C119,314 118.067661,309.026058 109,309 L93,309 C89.0634947,309 89,307 89,307')
    //     .attr({id: 'Path-3',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3');
    // var Path3Copy6 = rsr.path('M149,314 C149,314 148.067661,309.026058 139,309 L123,309 C119.063495,309 119,307 119,307')
    //     .attr({id: 'Path-3-Copy',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path6 = rsr.path('M189,314 C189,314 188.067661,309.026058 179,309 L163,309 C159.063495,309 159,307 159,307')
    //     .attr({id: 'Path-3',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3');
    // var Path3Copy7 = rsr.path('M219,314 C219,314 218.067661,309.026058 209,309 L193,309 C189.063495,309 189,307 189,307')
    //     .attr({id: 'Path-3-Copy',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path7 = rsr.path('M259,314 C259,314 258.067661,309.026058 249,309 L233,309 C229.063495,309 229,307 229,307')
    //     .attr({id: 'Path-3',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3');
    // var Path3Copy8 = rsr.path('M289,314 C289,314 288.067661,309.026058 279,309 L263,309 C259.063495,309 259,307 259,307')
    //     .attr({id: 'Path-3-Copy',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path8 = rsr.path('M329,314 C329,314 328.067661,309.026058 319,309 L303,309 C299.063495,309 299,307 299,307')
    //     .attr({id: 'Path-3',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3');
    // var Path3Copy9 = rsr.path('M359,314 C359,314 358.067661,309.026058 349,309 L333,309 C329.063495,309 329,307 329,307')
    //     .attr({id: 'Path-3-Copy',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path9 = rsr.path('M399,314 C399,314 398.067661,309.026058 389,309 L373,309 C369.063495,309 369,307 369,307')
    //     .attr({id: 'Path-3',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3');
    // var Path3Copy10 = rsr.path('M429,314 C429,314 428.067661,309.026058 419,309 L403,309 C399.063495,309 399,307 399,307')
    //     .attr({id: 'Path-3-Copy',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path10 = rsr.path('M469,314 C469,314 468.067661,309.026058 459,309 L443,309 C439.063495,309 439,307 439,307')
    //     .attr({id: 'Path-3',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3');
    // var Path3Copy11 = rsr.path('M499,314 C499,314 498.067661,309.026058 489,309 L473,309 C469.063495,309 469,307 469,307')
    //     .attr({id: 'Path-3-Copy',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path11 = rsr.path('M539,314 C539,314 538.067661,309.026058 529,309 L513,309 C509.063495,309 509,307 509,307')
    //     .attr({id: 'Path-3',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3');
    // var Path3Copy12 = rsr.path('M569,314 C569,314 568.067661,309.026058 559,309 L543,309 C539.063495,309 539,307 539,307')
    //     .attr({id: 'Path-3-Copy',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path12 = rsr.path('M609,314 C609,314 608.067661,309.026058 599,309 L583,309 C579.063495,309 579,307 579,307')
    //     .attr({id: 'Path-3',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3');
    // var Path3Copy13 = rsr.path('M639,314 C639,314 638.067661,309.026058 629,309 L613,309 C609.063495,309 609,307 609,307')
    //     .attr({id: 'Path-3-Copy',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // var Path13 = rsr.path('M679,314 C679,314 678.067661,309.026058 669,309 L653,309 C649.063495,309 649,307 649,307')
    //     .attr({id: 'Path-3',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3');
    // var Path3Copy14 = rsr.path('M709,314 C709,314 708.067661,309.026058 699,309 L683,309 C679.063495,309 679,307 679,307')
    //     .attr({id: 'Path-3-Copy',stroke: '#00FA9A','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .scale(-1, 1)
    //     // .transform('t-326.000000, -5880.000000')
    //     .data('id', 'Path3Copy');
    // Graphic.attr({'id': 'Graphic','transformG': 'translate(-326.000000, -5880.000000)','stroke': 'none','stroke-width': '1','fill': 'none','fill-rule': 'evenodd','parent': 'Page1','name': 'Graphic'})
    //     // .transform('t102.000000, 0.000000');
    // var Line13 = rsr.path('M753,4 L-2.27373675e-13,4')
    //     .attr({id: 'Line','stroke-linecap': 'square',stroke: '#24EAC9','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .transform('t0, 289')
    //     .data('id', 'Line');
    // var Line14 = rsr.path('M750,4 L754,8')
    //     .attr({id: 'Line14','stroke-linecap': 'round',stroke: '#24EAC9','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .transform('t0, 289')
    //     .scale(1, -1)
    //     .data('id', 'Line');
    // var Line15 = rsr.path('M750,-9.09494702e-13 L754,4')
    //     .attr({id: 'Line','stroke-linecap': 'round',stroke: '#24EAC9','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .transform('t0, 289')
    //     .data('id', 'Line');
    // var Line16 = rsr.path('M4,1 L4,303')
    //     .attr({id: 'Line','stroke-linecap': 'square',stroke: '#24EAC9','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .transform('t5, 0')
    //     .data('id', 'Line');
    // var Line17 = rsr.path('M4,-9.09494702e-13 L8,4')
    //     .attr({id: 'Line','stroke-linecap': 'round',stroke: '#24EAC9','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .transform('t5, 0')
    //     .data('id', 'Line');
    // var Line18 = rsr.path('M-9.09494702e-13,-9.09494702e-13 L4,4')
    //     .attr({id: 'Line','stroke-linecap': 'round',stroke: '#24EAC9','stroke-width': '1',fill: 'none','fill-rule': 'evenodd',parent: 'Page1','stroke-opacity': '1'})
    //     .transform('t5, 0')
    //     .scale(1, -1)
    //     .data('id', 'Line');
    // var Text1 = rsr.text(50, 30, '100%\nBONUS')
    //     .attr({fill: '#FEFE7C', 'font-family': 'Montserrat'});
    //
    // var 100%bonus = rsr.text(0, 0, '')
    //     .attr({id: '100%-bonus',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"font-weight": 'normal',"line-spacing": '11',"letter-spacing": '1.63636363',fill: '#FEFE7C',stroke: 'none','stroke-width':'1','stroke-opacity':'1',"stroke-width": '1',"fill-rule": 'evenodd',parent: 'Page1'})
    //     .transform("t-224.000000, -5896.000000")
    //     .data('id', '100%bonus');
    //
    //
    // var Group1 = [Rectangle1, Rectangle11, Text1];
    //
    // attachEvent(Group1, function() {
    //     Rectangle1.animate({
    //         fill: '#9A00FA'
    //     }, 150);
    //     Rectangle11.animate({
    //         fill: '#9A00FA'
    //     }, 150);
    //     Text1.animate({
    //         fill: '#9A00FA'
    //     }, 150);
    // }, function() {
    //     Rectangle1.animate({
    //         fill: '#00FA9A'
    //     }, 150);
    //     Rectangle11.animate({
    //         fill: '#FEFE7C'
    //     }, 150);
    //     Text1.animate({
    //         fill: '#FEFE7C'
    //     }, 150);
    // });


    var rsr = Raphael('graph', '935', '426');


    var group_a = new rsr.group('graph', []);
    var path_e = rsr.path("M120 198L180 198 180 315.992483C180 317.101204 179.10527 318 178.003693 318L121.996307 318C120.893777 318 120 317.103084 120 315.992483L120 198zM190 198L250 198 250 315.992483C250 317.101204 249.10527 318 248.003693 318L191.996307 318C190.893777 318 190 317.103084 190 315.992483L190 198z")
        .attr({fill: '#00FA9A',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_e');
    var path_f = rsr.path("M185,30 L185,332")
        .attr({stroke: '#24EAC9',"stroke-linecap": 'square',"stroke-opacity": '.302',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1'})
        .data('id', 'path_f');
    var path_g = rsr.path("M260,198 L320,198 L320,315.992483 C320,317.101204 319.10527,318 318.003693,318 L261.996307,318 C260.893777,318 260,317.103084 260,315.992483 L260,198 Z")
        .attr({fill: '#00FA9A',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_g');
    var path_h = rsr.path("M255,30 L255,332")
        .attr({stroke: '#24EAC9',"stroke-linecap": 'square',"stroke-opacity": '.302',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1'})
        .data('id', 'path_h');
    var path_i = rsr.path("M861 196L109 196M861 75L109 75")
        .attr({stroke: '#24EAC9',"stroke-linecap": 'square',"stroke-opacity": '.302',opacity: '.5',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1'})
        .data('id', 'path_i');
    var path_j = rsr.path("M330,198 L390,198 L390,315.992483 C390,317.101204 389.10527,318 388.003693,318 L331.996307,318 C330.893777,318 330,317.103084 330,315.992483 L330,198 Z")
        .attr({fill: '#00FA9A',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_j');
    var path_k = rsr.path("M325,30 L325,332")
        .attr({stroke: '#24EAC9',"stroke-linecap": 'square',"stroke-opacity": '.302',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1'})
        .data('id', 'path_k');
    var path_l = rsr.path("M400,198 L460,198 L460,315.992483 C460,317.101204 459.10527,318 458.003693,318 L401.996307,318 C400.893777,318 400,317.103084 400,315.992483 L400,198 Z")
        .attr({fill: '#00FA9A',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_l');
    var path_m = rsr.path("M395,30 L395,332")
        .attr({stroke: '#24EAC9',"stroke-linecap": 'square',"stroke-opacity": '.302',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1'})
        .data('id', 'path_m');
    var path_n = rsr.path("M470,198 L530,198 L530,315.992483 C530,317.101204 529.10527,318 528.003693,318 L471.996307,318 C470.893777,318 470,317.103084 470,315.992483 L470,198 Z")
        .attr({fill: '#00FA9A',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_n');
    var path_o = rsr.path("M465,30 L465,332")
        .attr({stroke: '#24EAC9',"stroke-linecap": 'square',"stroke-opacity": '.302',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1'})
        .data('id', 'path_o');
    var path_p = rsr.path("M540,198 L600,198 L600,315.992483 C600,317.101204 599.10527,318 598.003693,318 L541.996307,318 C540.893777,318 540,317.103084 540,315.992483 L540,198 Z")
        .attr({fill: '#00FA9A',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_p');
    var path_q = rsr.path("M535,30 L535,332")
        .attr({stroke: '#24EAC9',"stroke-linecap": 'square',"stroke-opacity": '.302',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1'})
        .data('id', 'path_q');
    var path_r = rsr.path("M610,198 L670,198 L670,315.992483 C670,317.101204 669.10527,318 668.003693,318 L611.996307,318 C610.893777,318 610,317.103084 610,315.992483 L610,198 Z")
        .attr({fill: '#00FA9A',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_r');
    var path_s = rsr.path("M605,30 L605,332")
        .attr({stroke: '#24EAC9',"stroke-linecap": 'square',"stroke-opacity": '.302',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1'})
        .data('id', 'path_s');
    var path_t = rsr.path("M680,198 L740,198 L740,315.992483 C740,317.101204 739.10527,318 738.003693,318 L681.996307,318 C680.893777,318 680,317.103084 680,315.992483 L680,198 Z")
        .attr({fill: '#00FA9A',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_t');
    var path_u = rsr.path("M675,30 L675,332")
        .attr({stroke: '#24EAC9',"stroke-linecap": 'square',"stroke-opacity": '.302',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1'})
        .data('id', 'path_u');
    var rect_v = rsr.rect(750, 198, 60, 120)
        .attr({x: '750',y: '198',fill: '#00FA9A',rx: '2',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'rect_v');
    var path_w = rsr.path("M745 30L745 332M815 30L815 332")
        .attr({stroke: '#24EAC9',"stroke-linecap": 'square',"stroke-opacity": '.302',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1'})
        .data('id', 'path_w');
    var path_x = rsr.path("M499,382 C499,382 498.067661,377.026058 489,377 L195,377 C191.063495,377 191,375 191,375")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_x');
    var path_y = rsr.path("M807,382 C807,382 806.067661,377.026058 797,377 L503,377 C499.063495,377 499,375 499,375")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m-1 0 0 1 1306 0")
        .data('id', 'path_y');
    var path_z = rsr.path("M120 75.0075171C120 73.898796 120.89473 73 121.996307 73L178.003693 73C179.106223 73 180 73.8969164 180 75.0075171L180 193 120 193 120 75.0075171zM190 87.9949669C190 86.8931771 190.89473 86 191.996307 86L248.003693 86C249.106223 86 250 86.8928826 250 87.9949669L250 193 190 193 190 87.9949669zM260 102.00714C260 100.898627 260.89473 100 261.996307 100L318.003693 100C319.106223 100 320 100.890631 320 102.00714L320 193 260 193 260 102.00714zM330 114.997498C330 113.89431 330.89473 113 331.996307 113L388.003693 113C389.106223 113 390 113.898438 390 114.997498L390 193 330 193 330 114.997498zM400 128.005177C400 126.897748 400.89473 126 401.996307 126L458.003693 126C459.106223 126 460 126.896468 460 128.005177L460 193 400 193 400 128.005177zM470 141.99691C470 140.894047 470.89473 140 471.996307 140L528.003693 140C529.106223 140 530 140.897676 530 141.99691L530 193 470 193 470 141.99691zM540 154.997292C540 153.894218 540.89473 153 541.996307 153L598.003693 153C599.106223 153 600 153.89154 600 154.997292L600 193 540 193 540 154.997292zM610 168.997005C610 167.894089 610.89473 167 611.996307 167L668.003693 167C669.106223 167 670 167.894979 670 168.997005L670 193 610 193 610 168.997005zM680 182.00276C680 180.896666 680.89473 180 681.996307 180L738.003693 180C739.106223 180 740 180.893543 740 182.00276L740 193 680 193 680 182.00276z")
        .attr({fill: '#FEFE7C',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_z');
    var path_aa = rsr.path("M853.5,231.5 C853.5,231.5 852.567661,226.526058 843.5,226.5 L798.5,226.5 C794.563495,226.5 794.5,224.5 794.5,224.5")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m0 1 1 0 596 -596")
        .data('id', 'path_aa');
    var path_ab = rsr.path("M853.5,290.5 C853.5,290.5 852.567661,285.526058 843.5,285.5 L798.5,285.5 C794.563495,285.5 794.5,283.5 794.5,283.5")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("")
        .data('id', 'path_ab');
    var path_ac = rsr.path("M164.5,139.5 C164.5,139.5 163.567661,134.526058 154.5,134.5 L49.5,134.5 C45.5634947,134.5 45.5,132.5 45.5,132.5")
        .attr({stroke: '#FEFE7C',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("")
        .data('id', 'path_ac');
    var path_ad = rsr.path("M164.5,258.5 C164.5,258.5 163.567661,253.526058 154.5,253.5 L49.5,253.5 C45.5634947,253.5 45.5,251.5 45.5,251.5")
        .attr({stroke: '#FEFE7C',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m0 -1 -1 0 360 360")
        .data('id', 'path_ad');
    var path_ae = rsr.path("M150,343 C150,343 149.067661,338.026058 140,338 L124,338 C120.063495,338 120,336 120,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_ae');
    var path_af = rsr.path("M180,343 C180,343 179.067661,338.026058 170,338 L154,338 C150.063495,338 150,336 150,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m-1 0 0 1 330 0")
        .data('id', 'path_af');
    var path_ag = rsr.path("M220,343 C220,343 219.067661,338.026058 210,338 L194,338 C190.063495,338 190,336 190,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_ag');
    var path_ah = rsr.path("M250,343 C250,343 249.067661,338.026058 240,338 L224,338 C220.063495,338 220,336 220,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m-1 0 0 1 470 0")
        .data('id', 'path_ah');
    var path_ai = rsr.path("M290,343 C290,343 289.067661,338.026058 280,338 L264,338 C260.063495,338 260,336 260,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_ai');
    var path_aj = rsr.path("M320,343 C320,343 319.067661,338.026058 310,338 L294,338 C290.063495,338 290,336 290,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m-1 0 0 1 610 0")
        .data('id', 'path_aj');
    var path_ak = rsr.path("M360,343 C360,343 359.067661,338.026058 350,338 L334,338 C330.063495,338 330,336 330,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_ak');
    var path_al = rsr.path("M390,343 C390,343 389.067661,338.026058 380,338 L364,338 C360.063495,338 360,336 360,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m-1 0 0 1 750 0")
        .data('id', 'path_al');
    var path_am = rsr.path("M430,343 C430,343 429.067661,338.026058 420,338 L404,338 C400.063495,338 400,336 400,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_am');
    var path_an = rsr.path("M460,343 C460,343 459.067661,338.026058 450,338 L434,338 C430.063495,338 430,336 430,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m-1 0 0 1 890 0")
        .data('id', 'path_an');
    var path_ao = rsr.path("M500,343 C500,343 499.067661,338.026058 490,338 L474,338 C470.063495,338 470,336 470,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_ao');
    var path_ap = rsr.path("M530,343 C530,343 529.067661,338.026058 520,338 L504,338 C500.063495,338 500,336 500,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m-1 0 0 1 1030 0")
        .data('id', 'path_ap');
    var path_aq = rsr.path("M570,343 C570,343 569.067661,338.026058 560,338 L544,338 C540.063495,338 540,336 540,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_aq');
    var path_ar = rsr.path("M600,343 C600,343 599.067661,338.026058 590,338 L574,338 C570.063495,338 570,336 570,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m-1 0 0 1 1170 0")
        .data('id', 'path_ar');
    var path_as = rsr.path("M640,343 C640,343 639.067661,338.026058 630,338 L614,338 C610.063495,338 610,336 610,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_as');
    var path_at = rsr.path("M670,343 C670,343 669.067661,338.026058 660,338 L644,338 C640.063495,338 640,336 640,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m-1 0 0 1 1310 0")
        .data('id', 'path_at');
    var path_au = rsr.path("M710,343 C710,343 709.067661,338.026058 700,338 L684,338 C680.063495,338 680,336 680,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_au');
    var path_av = rsr.path("M740,343 C740,343 739.067661,338.026058 730,338 L714,338 C710.063495,338 710,336 710,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m-1 0 0 1 1450 0")
        .data('id', 'path_av');
    var path_aw = rsr.path("M780,343 C780,343 779.067661,338.026058 770,338 L754,338 C750.063495,338 750,336 750,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_aw');
    var path_ax = rsr.path("M810,343 C810,343 809.067661,338.026058 800,338 L784,338 C780.063495,338 780,336 780,336")
        .attr({stroke: '#00FA9A',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("m-1 0 0 1 1590 0")
        .data('id', 'path_ax');
    var text_ay = rsr.text(135, 52, '100%\nBonus')
        .attr({fill: '#FEFE7C',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_ay');
    var text_az = rsr.text(0, 0, '')
        .attr({fill: '#FEFE7C',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_az');
    var text_ba = rsr.text(0, 0, '')
        .attr({fill: '#FEFE7C',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_ba');
    var text_bb = rsr.text(0, 0, '')
        .attr({fill: '#FEFE7C',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bb');
    var text_bc = rsr.text(0, 0, '')
        .attr({fill: '#FEFE7C',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bc');
    var text_bd = rsr.text(0, 0, '')
        .attr({fill: '#FEFE7C',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bd');
    var text_be = rsr.text(0, 0, '')
        .attr({fill: '#FEFE7C',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_be');
    var text_bf = rsr.text(0, 0, '')
        .attr({fill: '#FEFE7C',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bf');
    var text_bg = rsr.text(0, 0, '')
        .attr({fill: '#FEFE7C',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bg');
    var text_bh = rsr.text(0, 0, '')
        .attr({fill: '#24EAC9',"fill-opacity": '.302',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bh');
    var text_bi = rsr.text(0, 0, '')
        .attr({fill: '#24EAC9',"fill-opacity": '.302',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bi');
    var text_bj = rsr.text(0, 0, '')
        .attr({fill: '#24EAC9',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bj');
    var text_bk = rsr.text(0, 0, '')
        .attr({fill: '#FEFE7C',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bk');
    var path_bl = rsr.path("M74.896,224.578 L71.719,224.578 L71.116,226 L70.009,226 L72.79,219.7 L73.879,219.7 L76.633,226 L75.499,226 L74.896,224.578 Z M74.491,223.633 L72.115,223.633 L73.303,220.834 L74.491,223.633 Z M71.6499939,226.689663 L71.9555509,226 L74.7799532,226 L75.079994,226.689663 L71.6499939,226.689663 Z")
        .attr({fill: '#FEFE7C',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_bl');
    var path_bm = rsr.path("M 74.4 209.69 77.83 209.69 77.53 209 74.706 209 z")
        .attr({fill: '#FEFE7C',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_bm');
    var text_bn = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bn');
    var text_bo = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bo');
    var text_bp = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bp');
    var text_bq = rsr.text(0, 0, '')
        .attr({fill: '#24EAC9',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bq');
    var path_br = rsr.path("M 531.5 418.69 534.93 418.69 534.63 418 531.806 418 z")
        .attr({fill: '#24EAC9',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_br');
    var text_bs = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bs');
    var text_bt = rsr.text(0, 0, '')
        .attr({fill: '#24EAC9',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bt');
    var path_bu = rsr.path("M 175 379.69 178.429 379.69 178.129 379 175.305 379 z")
        .attr({fill: '#24EAC9',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'path_bu');
    var text_bv = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bv');
    var text_bw = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bw');
    var text_bx = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bx');
    var text_by = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_by');
    var text_bz = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_bz');
    var text_ca = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_ca');
    var text_cb = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_cb');
    var text_cc = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_cc');
    var text_cd = rsr.text(0, 0, '')
        .attr({fill: '#FFF',"font-family": 'Montserrat-Regular, Montserrat',"font-size": '9',"letter-spacing": '1.636',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .data('id', 'text_cd');
    var group_b = new rsr.group('graph', []);
    group_b.translate(107, 29);
    var group_c = new rsr.group('graph', []);
    var path_ce = rsr.path("M753,4 L-2.27373675e-13,4")
        .attr({"stroke-linecap": 'square',stroke: '#24EAC9',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("t107 29")
        .data('id', 'path_ce');
    var path_cf = rsr.path("M750,4 L754,8")
        .attr({"stroke-linecap": 'round',stroke: '#24EAC9',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("t107 29 m1 0 0 -1 0 12")
        .data('id', 'path_cf');
    var path_cg = rsr.path("M750,-9.09494702e-13 L754,4")
        .attr({"stroke-linecap": 'round',stroke: '#24EAC9',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("t107 29")
        .data('id', 'path_cg');
    group_c.translate(0, 289);
    var group_d = new rsr.group('graph', []);
    var path_ch = rsr.path("M4,1 L4,303")
        .attr({"stroke-linecap": 'square',stroke: '#24EAC9',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("t107 29")
        .data('id', 'path_ch');
    var path_ci = rsr.path("M4,-9.09494702e-13 L8,4")
        .attr({"stroke-linecap": 'round',stroke: '#24EAC9',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("t107 29")
        .data('id', 'path_ci');
    var path_cj = rsr.path("M-9.09494702e-13,-9.09494702e-13 L4,4")
        .attr({"stroke-linecap": 'round',stroke: '#24EAC9',fill: 'none',"fill-rule": 'evenodd',parent: 'group_a','stroke-width': '1','stroke-opacity': '1'})
        .transform("t107 29 m1 0 0 -1 0 4")
        .data('id', 'path_cj');
    group_d.translate(5, 0);


    var rsrGroups = [group_a,group_b,group_c,group_d];
    group_a.push(
        path_e ,
        path_f ,
        path_g ,
        path_h ,
        path_i ,
        path_j ,
        path_k ,
        path_l ,
        path_m ,
        path_n ,
        path_o ,
        path_p ,
        path_q ,
        path_r ,
        path_s ,
        path_t ,
        path_u ,
        rect_v ,
        path_w ,
        path_x ,
        path_y ,
        path_z ,
        path_aa ,
        path_ab ,
        path_ac ,
        path_ad ,
        path_ae ,
        path_af ,
        path_ag ,
        path_ah ,
        path_ai ,
        path_aj ,
        path_ak ,
        path_al ,
        path_am ,
        path_an ,
        path_ao ,
        path_ap ,
        path_aq ,
        path_ar ,
        path_as ,
        path_at ,
        path_au ,
        path_av ,
        path_aw ,
        path_ax ,
        text_ay ,
        text_az ,
        text_ba ,
        text_bb ,
        text_bc ,
        text_bd ,
        text_be ,
        text_bf ,
        text_bg ,
        text_bh ,
        text_bi ,
        text_bj ,
        text_bk ,
        path_bl ,
        path_bm ,
        text_bn ,
        text_bo ,
        text_bp ,
        text_bq ,
        path_br ,
        text_bs ,
        text_bt ,
        path_bu ,
        text_bv ,
        text_bw ,
        text_bx ,
        text_by ,
        text_bz ,
        text_ca ,
        text_cb ,
        text_cc ,
        text_cd
    );
    group_b.push(
    );
    group_c.push(
        path_ce ,
        path_cf ,
        path_cg
    );
    group_d.push(
        path_ch ,
        path_ci ,
        path_cj
    );

}

function attachEvent(group, animationIn, animationOut) {
    for(var i = 0; i < group.length; i++) {
        group[i].mouseover(animationIn);
        group[i].mouseout(animationOut);
    }
}

function makeResponsive() {
    responsive();
    $(window).on('resize', function(e) {
       responsive();
    });
}

function responsive() {
    var svg = $('.bars');
    var bBox = svg[0].getBBox();
    var ctm = svg[0].getCTM();
    $('#tooltips').css({
        'top': (bBox.y * ctm.a) + ctm.f,
        'left': svg[0].getBoundingClientRect().left,
        'height': '100%',
        // 'height': bBox.height * ctm.a,
        'width': bBox.width * ctm.a
    })
}

function FBShare() {
    FB.ui({
        method: 'share',
        href: 'https://arva.io'
    }, function(response){});
}

function SVGAnimation() {
    $('.bar').on('mouseover', function() {
        onBarSelect(this);
    });

    $('.bar').on('mouseout', function() {
        onBarSelect(this);
    });
}

function onBarSelect(el) {
    var id = $(el).attr('id');
    var tooltip = $('#' + id.replace('percent', 'tooltip'));
    var open = $(el).attr('data-open') || false;
    if(!open || open === 'false') {
        $(tooltip).fadeIn();
        for(var i = 0; i <= el.children.length; i++) {
            var child = $(el.children[i]);
            $(child).attr('data-oldFill', $(child).attr('fill'));
            $(child).attr('fill', '#9A00FA');
        }
        $(el).attr('data-open', true);
    } else {
        $(tooltip).fadeOut();
        for(var i = 0; i <= el.children.length; i++) {
            var child = $(el.children[i]);
            $(child).attr('fill', $(child).attr('data-oldFill'));
        }
        $(el).attr('data-open', false);
    }
}

function getSocialStats() {
    var boxLength = 6;
    var getShares = function() {
        return $.getJSON('https://graph.facebook.com/', 'id=' + encodeURIComponent('http://arva.io'));
    }
    var getTweets = function() {
        return $.getJSON(
            "http://opensharecount.com/count.json",
            "url="+encodeURIComponent("http://arva.io"));
    }

    getShares().done(function(json) {
        var sharesEl = $('<h1></h1>');
        var shares = json.share.share_count + '';
        var zeroes = '';
        for(var i = 0; i < (boxLength - shares.length); i++) {
            zeroes += '0';
        }
        sharesZeroes = $('<span></span>');
        sharesZeroes.text(zeroes.split('').join(' '));
        sharesEl.text(' ' + shares.split('').join(' '));
        sharesEl.prepend(sharesZeroes);

        $('#facebook-shares').empty().append(sharesEl);
    });


    getTweets().done(function(json) {
        var tweetsEl = $('<h1></h1>');
        var tweets = json.count + '';
        var zeroes = '';
        for(var i = 0; i < (boxLength - tweets.length); i++) {
            zeroes += '0';
        }
        tweetsZeroes = $('<span></span>');
        tweetsZeroes.text(zeroes.split('').join(' '));
        tweetsEl.text(' ' + tweets.split('').join(' '));
        tweetsEl.prepend(tweetsZeroes);


        $('#twitter-tweets').empty().append(tweetsEl);
    })
}

function getDaysUntilICO(date) {
    var boxLength = 3;
    var now = new Date();
    var timeDiff = Math.abs(date.getTime() - now.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    var numbers = (diffDays + '').split('');
    var id = 1;
    var countdownEl = $('.index-countdown .flex-left');
    countdownEl.empty();
    for(var i = 0; i < boxLength - (diffDays + '').length; i++) {
        var el = $('<div class="number-disabled"></div>');
        el.attr('id', 'num-' + id);
        el.text('0');
        id++;
        countdownEl.append(el);
    }
    for(var i = 0; i < numbers.length; i++) {
        var el = $('<div class="number-enabled"></div>');
        el.attr('id', 'num-' + id);
        el.text(numbers[i]);
        id++;
        countdownEl.append(el);
    }
    var text = $('<div class="number-text">Days Left Until<br>The ICO Start</div>');
    countdownEl.append(text);
}

$(document).ready(function() {
    var tweetText = 'Testing 1 2 3';
    var ICODate = new Date(2017, 10, 11);
    $('body').removeClass('loading');
    $('#preloader').fadeOut();
    $('.social-tw a').on('click', function() {
        window.open('https://twitter.com/share?text=' + encodeURIComponent(tweetText), '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        return false;
    })

    $('.social-tw a, .social-fb a').hover(
        function() {
            $(this).addClass('hover');
        },
        function() {
            $(this).removeClass('hover');
        })

    $('.social-fb a').on('click', function() {
        window.open('https://www.facebook.com/dialog/share?app_id=110410239636929&display=popup&href=' + encodeURIComponent('https://arva.io') + '&redirect_uri=' + encodeURIComponent('https://arva.io') + '', '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
        return false;
    })

    getDaysUntilICO(ICODate);
    SVGAnimation();
    makeResponsive();
    getSocialStats();
});
