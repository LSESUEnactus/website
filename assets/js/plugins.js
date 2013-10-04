// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Textualizer
(function(b,j){function x(a){var b,d,f,n={};if(j.getComputedStyle)if(a=j.getComputedStyle(a,null),a.length){d=0;for(f=a.length;d<f;d++)b=a[d].replace(/\-([a-z])/,function(a,b){return b.toUpperCase()}),n[b]=a.getPropertyValue(a[d])}else for(b in a)"function"!==typeof a[b]&&"length"!==b&&(n[b]=a[b]);else for(b in a=a.currentStyle||a.style,a)Object.prototype.hasOwnProperty.call(a,b)&&(n[b]=a[b]);return n}function H(){this.pos=this.domNode=this.character=null;this.visited=this.inserted=this.used=!1}function A(){this.str=
"";this.characterList=[]}var q,I=1E3,J=500,K=2E3,L=2E3,M="textualizer.changed";A.prototype={use:function(a){var c=null;b.each(this.characterList,function(){if(this.character===a&&!this.used)return this.used=!0,c=this,!1});return c},reset:function(){b.each(this.characterList,function(){this.used=this.inserted=!1})}};q=function(a,c,d){function f(a){var c=b.fn.textualizer.effects,f="random"===d.effect?c[Math.floor(Math.random()*(c.length-2))+1][1]:s,e=b.Deferred(),g=[];b.each(a.characterList,function(a,
d){if(!d.inserted){d.domNode.css({left:d.pos.left,top:d.pos.top});var c=b.Deferred();j.setTimeout(function(){f({item:d,container:h,dfd:c})},Math.random()*K);g.push(c)}});b.when.apply(null,g).done(function(){e.resolve()});return e.promise()}function n(){e===t.length-1&&(b.each(u,function(a,b){b.reset()}),e=-1,d.loop||G.pause());e++;q(e)}function q(c){if(!y){var e=b.Deferred(),o=u[c];if(!o){var h=[],g=new A,k,i,r,m;g.str=t[c];u.push(g);k=0;for(m=g.str.length;k<m;k++)i=g.str.charAt(k),""===i?l.append(" "):
(r=new H,r.character=i,r.domNode=b("<span/>").text(i),l.append(r.domNode),h.push(r));var s=d.centered?(z-l.height())/2:0;b.each(h,function(a,b){b.pos=b.domNode.position();b.domNode=b.domNode.clone();b.pos.top+=s;b.domNode.css({left:b.pos.left,top:b.pos.top,position:"absolute"});g.characterList.push(b)});l.html("");o=g}if(v){var h=v,x=o,B=[],C=[],D=b.Deferred(),E,p;k=[function(a){p=b.Deferred();a.animate({top:F.bottom,opacity:"hide"},p.resolve);return p.promise()},function(a){p=b.Deferred();a.fadeOut(1E3,
p.resolve);return p.promise()}];E=k[Math.floor(Math.random()*k.length)];var w;b.each(h.characterList,function(a,d){if(w=x.use(d.character))w.domNode=d.domNode,w.inserted=!0,B.push(w);else{var c=b.Deferred();C.push(c);E(d.domNode.delay(Math.random()*L)).done(function(){d.domNode.remove();c.resolve()})}});b.when.apply(null,C).done(function(){return D.resolve(B)});D.promise().done(function(a){var c=o,g=b.Deferred(),h=[];j.setTimeout(function(){b.each(a,function(a,c){var e=b.Deferred();c.domNode.animate({left:c.pos.left,
top:c.pos.top},d.rearrangeDuration,e.resolve);h.push(e.promise())});b.when.apply(null,h).done(function(){j.setTimeout(function(){f(c).done(function(){g.resolve()})},J)})},I);g.promise().done(function(){e.resolve()})})}else f(o).done(function(){e.resolve()});v=o;e.promise().done(function(){a.trigger(M,{index:c});j.setTimeout(n,d.duration)})}}var G=this,t=[],u,e,v,s=null,i=!1,y=!1,z,F,m,h,l;"random"!==d.effect&&b.each(b.fn.textualizer.effects,function(){if(this[0]===d.effect)return s=this[1],!1});m=
a.clone().removeAttr("id").appendTo(j.document.body);m.css(x(a[0]));m.css({position:"absolute",top:"-1000px"});l=b("<div />").css({position:"relative",visibility:"hidden"}).appendTo(m);a.css("overflow","hidden");h=b("<div />").css("position","relative").appendTo(a);z=a.height();F={bottom:z};this.data=function(a){this.stop();t=a;u=[]};this.stop=function(){this.pause();i=!1;v=null;e=0;h.empty();l.empty()};this.pause=function(){y=!0;i=!1};this.start=function(){0===t.length||i||(e=e||0,i=!0,y=!1,q(e))};
this.destroy=function(){h.parent().removeData("textualizer").end().remove();l.remove()};c&&c instanceof Array&&this.data(c)};b.fn.textualizer=function(){var a=arguments,c,d,f;f=this.data("textualizer");f||(c=[],1===a.length&&a[0]instanceof Array?c=a[0]:1===a.length&&"object"===typeof a[0]?d=a[0]:2===a.length&&(c=a[0],d=a[1]),0===c.length&&this.find("p").each(function(){c.push(b(this).text())}),this.html(""),f=new q(this,c,b.extend({},b.fn.textualizer.defaults,d)),this.data("textualizer",f));d=f;"string"===
typeof a[0]&&d[a[0]]&&d[a[0]].apply(d,Array.prototype.slice.call(a,1));return this};b.fn.textualizer.defaults={effect:"random",duration:2E3,rearrangeDuration:1E3,centered:!1,loop:!0};b.fn.textualizer.effects=[["none",function(a){a.container.append(a.item.domNode.show())}],["fadeIn",function(a){a.container.append(a.item.domNode.fadeIn(2E3,a.dfd.resolve));return a.dfd.promise()}],["slideLeft",function(a){a.item.domNode.appendTo(a.container).css({left:-1E3}).show().animate({left:a.item.pos.left},2E3,
a.dfd.resolve);return a.dfd.promise()}],["slideTop",function(a){a.item.domNode.appendTo(a.container).css({top:-1E3}).show().animate({top:a.item.pos.top},2E3,a.dfd.resolve);return a.dfd.promise()}]]})(jQuery,window);

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
            $('#big-video-control-container').css('display','none');

            // add events
            /*$('#big-video-control-track').slider({
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
            });*/
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
                    //$('#big-video-control-track').slider('value',progress);
                    $('#big-video-control-progress').css('width',(progress-0.16)+'%');
                    $('#big-video-control-timer').text(minutes+':'+seconds+'/'+vidDur);
                }
            });
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

