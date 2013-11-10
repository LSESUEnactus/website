/*!
 * imagesLoaded PACKAGED v3.0.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function(){"use strict";function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}function n(e){return function(){return this[e].apply(this,arguments)}}var i=e.prototype;i.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},i.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},i.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},i.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},i.on=n("addListener"),i.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},i.once=n("addOnceListener"),i.defineEvent=function(e){return this.getListeners(e),this},i.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},i.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},i.off=n("removeListener"),i.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},i.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},i.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},i.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},i.removeAllListeners=n("removeEvent"),i.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),o=n.listener.apply(this,t||[]),o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);return this},i.trigger=n("emitEvent"),i.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},i.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},"function"==typeof define&&define.amd?define(function(){return e}):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){"use strict";var t=document.documentElement,n=function(){};t.addEventListener?n=function(e,t,n){e.addEventListener(t,n,!1)}:t.attachEvent&&(n=function(t,n,i){t[n+i]=i.handleEvent?function(){var t=e.event;t.target=t.target||t.srcElement,i.handleEvent.call(i,t)}:function(){var n=e.event;n.target=n.target||n.srcElement,i.call(t,n)},t.attachEvent("on"+n,t[n+i])});var i=function(){};t.removeEventListener?i=function(e,t,n){e.removeEventListener(t,n,!1)}:t.detachEvent&&(i=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var r={bind:n,unbind:i};"function"==typeof define&&define.amd?define(r):e.eventie=r}(this),function(e){"use strict";function t(e,t){for(var n in t)e[n]=t[n];return e}function n(e){return"[object Array]"===c.call(e)}function i(e){var t=[];if(n(e))t=e;else if("number"==typeof e.length)for(var i=0,r=e.length;r>i;i++)t.push(e[i]);else t.push(e);return t}function r(e,n){function r(e,n,s){if(!(this instanceof r))return new r(e,n);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=i(e),this.options=t({},this.options),"function"==typeof n?s=n:t(this.options,n),s&&this.on("always",s),this.getImages(),o&&(this.jqDeferred=new o.Deferred);var a=this;setTimeout(function(){a.check()})}function c(e){this.img=e}r.prototype=new e,r.prototype.options={},r.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},r.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},r.prototype.check=function(){function e(e,r){return t.options.debug&&a&&s.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},r.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify(t,e)})},r.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},o&&(o.fn.imagesLoaded=function(e,t){var n=new r(this,e,t);return n.jqDeferred.promise(o(this))});var f={};return c.prototype=new e,c.prototype.check=function(){var e=f[this.img.src];if(e)return this.useCached(e),void 0;if(f[this.img.src]=this,this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this.proxyImage=new Image;n.bind(t,"load",this),n.bind(t,"error",this),t.src=this.img.src},c.prototype.useCached=function(e){if(e.isConfirmed)this.confirm(e.isLoaded,"cached was confirmed");else{var t=this;e.on("confirm",function(e){return t.confirm(e.isLoaded,"cache emitted confirmed"),!0})}},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindProxyEvents()},c.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindProxyEvents()},c.prototype.unbindProxyEvents=function(){n.unbind(this.proxyImage,"load",this),n.unbind(this.proxyImage,"error",this)},r}var o=e.jQuery,s=e.console,a=s!==void 0,c=Object.prototype.toString;"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],r):e.imagesLoaded=r(e.EventEmitter,e.eventie)}(window);


/*
    BigVideo - The jQuery Plugin for Big Background Video (and Images)
    by John Polacek (@johnpolacek)
    
    Dual licensed under MIT and GPL.

    Dependencies: jQuery, jQuery UI (Slider), Video.js, ImagesLoaded
 */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            'videojs',
            'imagesloaded',
            'jquery-ui'
        ], factory);
    } else {
        factory(jQuery, videojs);
    }
})(function($, videojs) {

    $.BigVideo = function(options) {

        var defaults = {
            // If you want to use a single mp4 source, set as true
            useFlashForFirefox:true,
            // If you are doing a playlist, the video won't play the first time
            // on a touchscreen unless the play event is attached to a user click
            forceAutoplay:false,
            controls:true,
            doLoop:false,
            container:$('body')
        };

        var BigVideo = this,
            player,
            vidEl = '#big-video-vid',
            wrap = $('<div id="big-video-wrap"></div>'),
            video = $(''),
            mediaAspect = 16/9,
            vidDur = 0,
            defaultVolume = 0.8,
            isInitialized = false,
            isSeeking = false,
            isPlaying = false,
            isQueued = false,
            isAmbient = false,
            playlist = [],
            currMediaIndex,
            currMediaType;

        var settings = $.extend({}, defaults, options);

        function updateSize() {
            var windowW = $(window).width();
            var windowH = $(window).height();
            var windowAspect = windowW/windowH;
            if (windowAspect < mediaAspect) {
                // taller
                if (currMediaType === 'video') {
                    player
                        .width(windowH*mediaAspect)
                        .height(windowH);
                    $(vidEl)
                        .css('top',0)
                        .css('left',-(windowH*mediaAspect-windowW)/2)
                        .css('height',windowH);
                    $(vidEl+'_html5_api').css('width',windowH*mediaAspect);
                    $(vidEl+'_flash_api')
                        .css('width',windowH*mediaAspect)
                        .css('height',windowH);
                } else {
                    // is image
                    $('#big-video-image')
                        .css({
                            width: 'auto',
                            height: windowH,
                            top:0,
                            left:-(windowH*mediaAspect-windowW)/2
                        });
                }
            } else {
                // wider
                if (currMediaType === 'video') {
                    player
                        .width(windowW)
                        .height(windowW/mediaAspect);
                    $(vidEl)
                        .css('top',-(windowW/mediaAspect-windowH)/2)
                        .css('left',0)
                        .css('height',windowW/mediaAspect);
                    $(vidEl+'_html5_api').css('width','100%');
                    $(vidEl+'_flash_api')
                        .css('width',windowW)
                        .css('height',windowW/mediaAspect);
                } else {
                    // is image
                    $('#big-video-image')
                        .css({
                            width: windowW,
                            height: 'auto',
                            top:-(windowW/mediaAspect-windowH)/2,
                            left:0
                        });
                }
            }
        }

        function initPlayControl() {
            // create video controller
            var markup = '<div id="big-video-control-container">';
            markup += '<div id="big-video-control">';
            markup += '<a href="#" id="big-video-control-play"></a>';
            markup += '<div id="big-video-control-middle">';
            markup += '<div id="big-video-control-bar">';
            markup += '<div id="big-video-control-bound-left"></div>';
            markup += '<div id="big-video-control-progress"></div>';
            markup += '<div id="big-video-control-track"></div>';
            markup += '<div id="big-video-control-bound-right"></div>';
            markup += '</div>';
            markup += '</div>';
            markup += '<div id="big-video-control-timer"></div>';
            markup += '</div>';
            markup += '</div>';
            settings.container.append(markup);

            // hide until playVideo
            /*$('#big-video-control-container').css('display','none');

            // add events
            $('#big-video-control-track').slider({
                animate: true,
                step: 0.01,
                slide: function(e,ui) {
                    isSeeking = true;
                    $('#big-video-control-progress').css('width',(ui.value-0.16)+'%');
                    player.currentTime((ui.value/100)*player.duration());
                },
                stop:function(e,ui) {
                    isSeeking = false;
                    player.currentTime((ui.value/100)*player.duration());
                }
            });
            $('#big-video-control-bar').click(function(e) {
                player.currentTime((e.offsetX/$(this).width())*player.duration());
            });
            $('#big-video-control-play').click(function(e) {
                e.preventDefault();
                playControl('toggle');
            });
            player.on('timeupdate', function() {
                if (!isSeeking && (player.currentTime()/player.duration())) {
                    var currTime = player.currentTime();
                    var minutes = Math.floor(currTime/60);
                    var seconds = Math.floor(currTime) - (60*minutes);
                    if (seconds < 10) seconds='0'+seconds;
                    var progress = player.currentTime()/player.duration()*100;
                    $('#big-video-control-track').slider('value',progress);
                    $('#big-video-control-progress').css('width',(progress-0.16)+'%');
                    $('#big-video-control-timer').text(minutes+':'+seconds+'/'+vidDur);
                }
            });*/
        }

        function playControl(a) {
            var action = a || 'toggle';
            if (action === 'toggle') action = isPlaying ? 'pause' : 'play';
            if (action === 'pause') {
                player.pause();
                $('#big-video-control-play').css('background-position','-16px');
                isPlaying = false;

            } else if (action === 'play') {
                player.play();
                $('#big-video-control-play').css('background-position','0');
                isPlaying = true;
            }
        }

        function setUpAutoPlay() {
            player.play();
            settings.container.off('click',setUpAutoPlay);
        }

        function nextMedia() {
            currMediaIndex++;
            if (currMediaIndex === playlist.length) currMediaIndex=0;
            playVideo(playlist[currMediaIndex]);
        }

        function playVideo(source) {

            // clear image
            $(vidEl).css('display','block');
            currMediaType = 'video';
            player.src(source);
            isPlaying = true;
            if (isAmbient) {
                $('#big-video-control-container').css('display','none');
                player.ready(function(){
                    player.volume(0);
                });
                doLoop = true;
            } else {
                $('#big-video-control-container').css('display','block');
                player.ready(function(){
                    player.volume(defaultVolume);
                });
                doLoop = false;
            }
            $('#big-video-image').css('display','none');
            $(vidEl).css('display','block');
        }

        function showPoster(source) {
            // remove old image
            $('#big-video-image').remove();

            // hide video
            player.pause();
            $(vidEl).css('display','none');
            $('#big-video-control-container').css('display','none');

            // show image
            currMediaType = 'image';
            var bgImage = $('<img id="big-video-image" src='+source+' />');
            wrap.append(bgImage);

            $('#big-video-image').imagesLoaded(function() {
                mediaAspect = $('#big-video-image').width() / $('#big-video-image').height();
                updateSize();
            });
        }

        BigVideo.init = function() {
            if (!isInitialized) {
                // create player
                settings.container.prepend(wrap);
                var autoPlayString = settings.forceAutoplay ? 'autoplay' : '';
                player = $('<video id="'+vidEl.substr(1)+'" class="video-js vjs-default-skin" preload="auto" data-setup="{}" '+autoPlayString+' webkit-playsinline></video>');
                player.css('position','absolute');
                wrap.append(player);

                var videoTechOrder = ['html5','flash'];
                // If only using mp4s and on firefox, use flash fallback
                var ua = navigator.userAgent.toLowerCase();
                var isFirefox = ua.indexOf('firefox') != -1;
                if (settings.useFlashForFirefox && (isFirefox)) {
                    videoTechOrder = ['flash', 'html5'];
                }
                player = videojs(vidEl.substr(1), { 
                    controls:false, 
                    autoplay:true, 
                    preload:'auto', 
                    techOrder:videoTechOrder
                });

                // add controls
                if (settings.controls) initPlayControl();

                // set initial state
                updateSize();
                isInitialized = true;
                isPlaying = false;

                if (settings.forceAutoplay) {
                    $('body').on('click', setUpAutoPlay);
                }

                $('#big-video-vid_flash_api')
                    .attr('scale','noborder')
                    .attr('width','100%')
                    .attr('height','100%');

                // set events
                $(window).resize(function() {
                    updateSize();
                });

                player.on('loadedmetadata', function(data) {
                    if (document.getElementById('big-video-vid_flash_api')) {
                        // use flash callback to get mediaAspect ratio
                        mediaAspect = document.getElementById('big-video-vid_flash_api').vjs_getProperty('videoWidth')/document.getElementById('big-video-vid_flash_api').vjs_getProperty('videoHeight');
                    } else {
                        // use html5 player to get mediaAspect
                        mediaAspect = $('#big-video-vid_html5_api').prop('videoWidth')/$('#big-video-vid_html5_api').prop('videoHeight');
                    }
                    updateSize();
                    var dur = Math.round(player.duration());
                    var durMinutes = Math.floor(dur/60);
                    var durSeconds = dur - durMinutes*60;
                    if (durSeconds < 10) durSeconds='0'+durSeconds;
                    vidDur = durMinutes+':'+durSeconds;
                });

                player.on('ended', function() {
                    if (settings.doLoop) {
                        player.currentTime(0);
                        player.play();
                    }
                    if (isQueued) {
                        nextMedia();
                    }
                });
            }
        };

        BigVideo.show = function(source,options) {
            if (options === undefined) options = {};
            isAmbient = options.ambient === true;
            if (isAmbient || options.doLoop) settings.doLoop = true;
            if (typeof(source) === 'string') {
                var ext = source.substring(source.lastIndexOf('.')+1);
                if (ext === 'jpg' || ext === 'gif' || ext === 'png') {
                    showPoster(source);
                } else {
                    if (options.altSource && navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                        source = options.altSource;
                    }
                    playVideo(source);
                    isQueued = false;
                }
            } else {
                playlist = source;
                currMediaIndex = 0;
                playVideo(playlist[currMediaIndex]);
                isQueued = true;
            }
        };

        // Expose Video.js player
        BigVideo.getPlayer = function() {
            return player;
        };

        // Expose BigVideoJS player actions (like 'play', 'pause' and so on)
        BigVideo.triggerPlayer = function(action){
            playControl(action);
        };
    };

});


/* ===========================================================
 * jquery-simple-text-rotator.js v1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * A very simple and light weight jQuery plugin that 
 * allows you to rotate multiple text without changing 
 * the layout
 * https://github.com/peachananr/simple-text-rotator
 *
 * ========================================================== */
!function(e){var t={animation:"dissolve",separator:",",speed:2e3};e.fx.step.textShadowBlur=function(t){e(t.elem).prop("textShadowBlur",t.now).css({textShadow:"0 0 "+Math.floor(t.now)+"px black"})};e.fn.textrotator=function(n){var r=e.extend({},t,n);return this.each(function(){var t=e(this);var n=[];e.each(t.text().split(r.separator),function(e,t){n.push(t)});t.text(n[0]);var i=function(){switch(r.animation){case"dissolve":t.animate({textShadowBlur:20,opacity:0},500,function(){s=e.inArray(t.text(),n);if(s+1==n.length)s=-1;t.text(n[s+1]).animate({textShadowBlur:0,opacity:1},500)});break;case"flip":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip").show().css({"-webkit-transform":" rotateY(-180deg)","-moz-transform":" rotateY(-180deg)","-o-transform":" rotateY(-180deg)",transform:" rotateY(-180deg)"});break;case"flipUp":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip up").show().css({"-webkit-transform":" rotateX(-180deg)","-moz-transform":" rotateX(-180deg)","-o-transform":" rotateX(-180deg)",transform:" rotateX(-180deg)"});break;case"flipCube":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube").show().css({"-webkit-transform":" rotateY(180deg)","-moz-transform":" rotateY(180deg)","-o-transform":" rotateY(180deg)",transform:" rotateY(180deg)"});break;case"flipCubeUp":if(t.find(".back").length>0){t.html(t.find(".back").html())}var i=t.text();var s=e.inArray(i,n);if(s+1==n.length)s=-1;t.html("");e("<span class='front'>"+i+"</span>").appendTo(t);e("<span class='back'>"+n[s+1]+"</span>").appendTo(t);t.wrapInner("<span class='rotating' />").find(".rotating").hide().addClass("flip cube up").show().css({"-webkit-transform":" rotateX(180deg)","-moz-transform":" rotateX(180deg)","-o-transform":" rotateX(180deg)",transform:" rotateX(180deg)"});break;case"spin":if(t.find(".rotating").length>0){t.html(t.find(".rotating").html())}s=e.inArray(t.text(),n);if(s+1==n.length)s=-1;t.wrapInner("<span class='rotating spin' />").find(".rotating").hide().text(n[s+1]).show().css({"-webkit-transform":" rotate(0) scale(1)","-moz-transform":"rotate(0) scale(1)","-o-transform":"rotate(0) scale(1)",transform:"rotate(0) scale(1)"});break;case"fade":t.fadeOut(r.speed,function(){s=e.inArray(t.text(),n);if(s+1==n.length)s=-1;t.text(n[s+1]).fadeIn(r.speed)});break}};setInterval(i,r.speed)})}}(window.jQuery)




/*
 * Application
 */
$(function () {
    // BigVideo
    var BV = new $.BigVideo();
    BV.init();
    if (Modernizr.touch)
        BV.show('/img/enactus.jpg');
    else
        BV.show('/vids/enactus.mp4', {ambient:true});

    // Simple Text Rotator
    $(".js-rotate").textrotator({
      //animation: "flipCube",
      separator: ";",
      speed: 2000
    });

    // Horizontal and vertical centering
    var $window = $(window);
    var $headerObj = $('.header');

    var $centreMarginObj = $('.js-centre');
    var $centreMarginHeight;
    var centreMargin = function () {
        $centreMarginHeight = $window.outerHeight() - $headerObj.outerHeight() - $centreMarginObj.outerHeight();
        if ($centreMarginHeight <= 20)
            $centreMarginHeight = 20;
        $centreMarginObj.css('margin', $centreMarginHeight / 2 + 'px auto');
    }
    centreMargin();
    $window.resize(centreMargin);
});