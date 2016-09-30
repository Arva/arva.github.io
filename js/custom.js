/**
 * Created by tom on 29/04/15.
 */

$(document).ready(function () {
    attachClickTouchHandlers();
    attachMouseHandlers();
    preventMapsScroll();
});

function attachClickTouchHandlers() {
    $('.contactcontainer img').click(function (e) {
        showHover($(e.target).parent().children('.contacthover')[0]);
    });

    $('.contacthover').click(function (e) {
        hideAllHovers();
        return true;
    });
}

function attachMouseHandlers() {
    if(bowser && bowser.mobile){return;}

    var containers = $('.contactcontainer').children().not('p');
    containers.mouseenter(function (e) {
        showHover($(e.target).parent().children('.contacthover')[0]);
        return true;
    });
    containers.mouseleave(function(e){
        hideAllHovers();
        return true;
    });
}

function showHover(hoverItem) {
    $(hoverItem).css('visibility', 'visible');
}

function hideAllHovers() {
    $('.contacthover').css('visibility', 'hidden');
}

function preventMapsScroll() {
    var googleMapSelector = "iframe[src*=\"google.com/maps\"]";
    var options = {
        hoverMessage:""
    };
    $(googleMapSelector).mapScrollPrevent(options);
    $(googleMapSelector).width(window.innerWidth);
}