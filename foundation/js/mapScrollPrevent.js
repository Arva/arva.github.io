/*!
 * mapScrollPrevent (jQuery Google Maps Scroll Prevent Plugin)
 * Version 0.5.x
 * URL: https://github.com/diazemiliano/mapScrollPrevent
 * Description: mapScrollPrevent is an easy solution to the problem of page scrolling with Google Maps.
 * Author: Emiliano Díaz https://github.com/diazemiliano/
 * Copyright: The MIT License (MIT) Copyright (c) 2015 Emiliano Díaz.
 */
jQuery.fn.extend({
    mapScrollPrevent: function (e) {
        var o = $.extend(!0, {
            wrapClass: "map-wrap",
            overlayClass: "map-overlay",
            overlayMessage: "Clic para Navegar.",
            inTouch: !0,
            stop: !1
        }, e), r = "/* mapScrollPrevent.js CSS Classes */." + o.overlayClass + "{position: absolute; overflow:hidden; cursor: pointer;text-align: center;background-color: rgba(255, 255, 255, 0);-moz-transition: background-color .3s ease-in-out;-o-transition: background-color .3s ease-in-out;-webkit-transition: background-color .3s ease-in-out;transition: background-color .3s ease-in-out;}." + o.overlayClass + ":hover{background-color : rgba(255, 255, 255, 0.2);}." + o.overlayClass + ' p{font-family: Lato, "Helvetica Neue", Helvetica, Arial, sans-serif;font-size: 13px;padding-top: 2.5%;padding-bottom: 2.5%;margin-right: auto;margin-left: auto;width: 70%;position: relative;top: 50%;transform: translateY(-50%);border-color: rgba(0, 0, 0, 0.3);color: rgba(58, 132, 223, 0);background-color: rgba(0, 0, 0, 0);-moz-transition: color 0.3s ease-in-out;-o-transition: color 0.3s ease-in-out;-webkit-transition: color 0.3s ease-in-out;transition: color 0.3s ease-in-out;-moz-border-radius-topleft: 2px;-webkit-border-top-left-radius: 2px;border-top-left-radius: 2px;-moz-border-radius-topright: 2px;-webkit-border-top-right-radius: 2px;border-top-right-radius: 2px;}.' + o.overlayClass + ":hover p{background-color: rgb(255, 255, 255); color: rgb(58, 132, 223); -moz-box-shadow: rgba(0,0,0,0.3) 0px 1px 4px -1px; -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;}." + o.wrapClass + "{display: inline-block;}." + o.wrapClass + " iframe{position:  relative;top:  0;left:  0;}";
        iframeObject = $(this), overlayObject = $('<div class="' + o.overlayClass + '">' + "</div>"), wrapObject = $('<div class="' + o.wrapClass + '"></div>'), iframeObject.length && ($.ajaxSetup({cache: !0}), wrapIframe = function () {
            iframeObject.closest("." + o.wrapClass).is("div") || iframeObject.wrap(wrapObject), wrapObject = iframeObject.closest("." + o.wrapClass).append(overlayObject), overlayObject = wrapObject.children("." + o.overlayClass), coverObject()
        }, applyCss = function () {
            $("head").append('<style rel="stylesheet" type="text/css">' + r + "</style>")
        }, coverObject = function () {
            overlayObject.height(iframeObject.height()).width('100%').css({
                top: iframeObject.position().top,
                left: iframeObject.position().left
            })
        }, hideOverlay = function () {
            iframeObject.css({"pointer-events": "initial"}), $(this).fadeOut()
        }, showOverlay = function () {
            coverObject(), iframeObject.css({"pointer-events": "none"}), overlayObject.show()
        }, isTouchScreen = function () {
            return "ontouchstart"in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? !0 : void 0
        }, start = function () {
            applyCss(), wrapIframe(), $(window).on("resize", coverObject), isTouchScreen() ? ($(window).on("touchstart", showOverlay).on("touchend click", hideOverlay), overlayObject.bind("click", hideOverlay)) : (overlayObject.bind("click", hideOverlay), wrapObject.bind("mouseenter", showOverlay))
        }, stop = function () {
            iframeObject.removeAttr("style"), iframeObject.parent().is("." + o.wrapClass) && iframeObject.unwrap(), $("." + o.overlayClass).remove()
        }, o.stop ? stop() : start())
    }
});