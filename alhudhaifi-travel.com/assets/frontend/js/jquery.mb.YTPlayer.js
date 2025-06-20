/*jquery.mb.YTPlayer 23-01-2021
 _ jquery.mb.components
 _ email: matbicoc@gmail.com
 _ Copyright (c) 2001-2021. Matteo Bicocchi (Pupunzi);
 _ blog: http://pupunzi.open-lab.com
 _ Open Lab s.r.l., Florence - Italy
 */

var ytp = ytp || {};
let YTPRndSuffix = (new Date).getTime(),
    YTPTimerLabels = {
        init: "YTPlayerInit_" + YTPRndSuffix,
        startPlaying: "YTPlayerStartPlay_" + YTPRndSuffix
    };

function onYouTubeIframeAPIReady() {
    ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"))
}
let getYTPVideoID = function(e) {
    let r, t;
    return e.indexOf("youtu.be") > 0 || e.indexOf("youtube.com/embed") > 0 ? r = (t = (r = e.substr(e.lastIndexOf("/") + 1, e.length)).indexOf("?list=") > 0 ? r.substr(r.lastIndexOf("="), r.length) : null) ? r.substr(0, r.lastIndexOf("?")) : r : e.indexOf("http") > -1 ? (r = e.match(/[\\?&]v=([^&#]*)/)[1], t = e.indexOf("list=") > 0 ? e.match(/[\\?&]list=([^&#]*)/)[1] : null) : t = (r = e.length > 15 ? null : e) ? null : e, {
        videoID: r,
        playlistID: t
    }
};
! function(jQuery, ytp) {
    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "3.3.9",
        build: "7581",
        author: "Matteo Bicocchi (pupunzi)",
        apiKey: "",
        defaults: {
            videoURL: null,
            containment: "body",
            ratio: "auto",
            fadeOnStartTime: 1e3,
            startAt: 0,
            stopAt: 0,
            autoPlay: !0,
            delayAtStart: 1e3,
            coverImage: !1,
            loop: !0,
            addRaster: !1,
            mask: !1,
            opacity: 1,
            quality: "hd1080",
            vol: 50,
            mute: !1,
            showControls: !0,
            anchor: "center,center",
            showAnnotations: !1,
            cc_load_policy: !1,
            showYTLogo: !0,
            useOnMobile: !0,
            playOnlyIfVisible: !1,
            onScreenPercentage: 30,
            goFullScreenOnPlay: !1,
            stopMovieOnBlur: !0,
            realFullscreen: !0,
            optimizeDisplay: !0,
            abundance: .3,
            gaTrack: !0,
            remember_last_time: !1,
            addFilters: !1,
            useNoCookie: !0,
            onReady: function(e) {},
            onError: function(e, r) {},
            onEnd: function() {}
        },
        controls: {
            play: "P",
            pause: "p",
            mute: "M",
            unmute: "A",
            onlyYT: "O",
            showSite: "R",
            ytLogo: "Y"
        },
        controlBar: null,
        locationProtocol: "https:",
        defaultFilters: {
            grayscale: {
                value: 0,
                unit: "%"
            },
            hue_rotate: {
                value: 0,
                unit: "deg"
            },
            invert: {
                value: 0,
                unit: "%"
            },
            opacity: {
                value: 0,
                unit: "%"
            },
            saturate: {
                value: 0,
                unit: "%"
            },
            sepia: {
                value: 0,
                unit: "%"
            },
            brightness: {
                value: 0,
                unit: "%"
            },
            contrast: {
                value: 0,
                unit: "%"
            },
            blur: {
                value: 0,
                unit: "px"
            }
        },
        buildPlayer: function(options) {
            if (ytp.YTAPIReady || void 0 !== window.YT) setTimeout(function() {
                jQuery(document).trigger("YTAPIReady"), ytp.YTAPIReady = !0
            }, 100);
            else {
                jQuery("#YTAPI").remove();
                let e = jQuery("<script>").attr({
                    src: "https://www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
                    id: "YTAPI"
                });
                jQuery("head").prepend(e)
            }

            function isIframe() {
                let e = !1;
                try {
                    self.location.href !== top.location.href && (e = !0)
                } catch (r) {
                    e = !0
                }
                return e
            }
            return this.each(function() {
                let YTPlayer = this,
                    $YTPlayer = jQuery(YTPlayer);
                $YTPlayer.hide(), YTPlayer.loop = 0, YTPlayer.state = 0, YTPlayer.filters = jQuery.extend(!0, {}, jQuery.mbYTPlayer.defaultFilters), YTPlayer.filtersEnabled = !0, YTPlayer.id = YTPlayer.id || "YTP_" + (new Date).getTime(), $YTPlayer.addClass("mb_YTPlayer");
                let property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
                "object" != typeof property && (property = {}), YTPlayer.opt = jQuery.extend(!0, {}, jQuery.mbYTPlayer.defaults, YTPlayer.opt, options, property), YTPRndSuffix = getYTPVideoID(YTPlayer.opt.videoURL).videoID, YTPTimerLabels = {
                    init: "YTPlayerInit_" + YTPRndSuffix,
                    startPlaying: "YTPlayerStartPlay_" + YTPRndSuffix
                }, console.time(YTPTimerLabels.init), console.time(YTPTimerLabels.startPlaying), YTPlayer.opt.elementId = YTPlayer.id, 0 === YTPlayer.opt.vol && (YTPlayer.opt.vol = 1, YTPlayer.opt.mute = !0), YTPlayer.opt.loop && "boolean" == typeof YTPlayer.opt.loop && (YTPlayer.opt.loop = 9999);
                let fullScreenAvailable = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
                YTPlayer.opt.realFullscreen = !(isIframe() || !fullScreenAvailable) && YTPlayer.opt.realFullscreen, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "1" : "3", YTPlayer.opt.cc_load_policy = YTPlayer.opt.cc_load_policy ? "1" : "0", YTPlayer.opt.coverImage = YTPlayer.opt.coverImage || YTPlayer.opt.backgroundImage, YTPlayer.opt.quality = "hd1080", jQuery.mbBrowser.msie && jQuery.mbBrowser.version < 9 && (YTPlayer.opt.opacity = 1), YTPlayer.opt.containment = "self" === YTPlayer.opt.containment ? $YTPlayer : jQuery(YTPlayer.opt.containment), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1, YTPlayer.opt.ratio = "auto" === YTPlayer.opt.ratio ? 16 / 9 : YTPlayer.opt.ratio, YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio);
                let origContainmentBackground = YTPlayer.opt.containment.css("background-image");
                origContainmentBackground = "none" === origContainmentBackground ? null : origContainmentBackground, YTPlayer.orig_containment_background = origContainmentBackground, $YTPlayer.attr("id") || $YTPlayer.attr("id", "ytp_" + (new Date).getTime()), YTPlayer.playerID = "iframe_" + YTPlayer.id, YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0, YTPlayer.videoID = YTPlayer.opt.videoURL ? getYTPVideoID(YTPlayer.opt.videoURL).videoID : !!$YTPlayer.attr("href") && getYTPVideoID($YTPlayer.attr("href")).videoID, YTPlayer.playlistID = YTPlayer.opt.videoURL ? getYTPVideoID(YTPlayer.opt.videoURL).playlistID : !!$YTPlayer.attr("href") && getYTPVideoID($YTPlayer.attr("href")).playlistID;
                let start_from_last = 0;
                if (jQuery.mbCookie.get("YTPlayer_start_from" + YTPlayer.videoID) && (start_from_last = parseFloat(jQuery.mbCookie.get("YTPlayer_start_from" + YTPlayer.videoID))), YTPlayer.opt.remember_last_time && start_from_last && (YTPlayer.start_from_last = start_from_last, jQuery.mbCookie.remove("YTPlayer_start_from" + YTPlayer.videoID)), YTPlayer.isPlayer = $YTPlayer.is(YTPlayer.opt.containment), YTPlayer.isBackground = YTPlayer.opt.containment.is("body"), YTPlayer.isBackground && ytp.backgroundIsInited) return;
                if (YTPlayer.isPlayer && $YTPlayer.show(), YTPlayer.overlay = jQuery("<div/>").css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }).addClass("YTPOverlay"), $YTPlayer.changeCoverImage(), YTPlayer.wrapper = jQuery("<div/>").attr("id", "wrapper_" + YTPlayer.id).css({
                        position: "absolute",
                        zIndex: 0,
                        minWidth: "100%",
                        minHeight: "100%",
                        left: 0,
                        top: 0,
                        overflow: "hidden",
                        opacity: 0
                    }).addClass("mbYTP_wrapper"), YTPlayer.isPlayer) {
                    let e = jQuery.mbBrowser.mobile ? "inlinePlayButtonMobile" : "inlinePlayButton";
                    YTPlayer.inlinePlayButton = jQuery("<div/>").addClass("inlinePlayButton").html(jQuery.mbYTPlayer.controls.play), $YTPlayer.append(YTPlayer.inlinePlayButton), YTPlayer.inlinePlayButton.on("click", function(e) {
                        $YTPlayer.YTPPlay(), YTPlayer.inlinePlayButton.hide(), YTPlayer.opt.goFullScreenOnPlay && $YTPlayer.YTPFullscreen(), e.stopPropagation()
                    }), YTPlayer.opt.autoPlay && YTPlayer.inlinePlayButton.hide(), YTPlayer.overlay.on("click", function() {
                        $YTPlayer.YTPTogglePlay(), YTPlayer.opt.goFullScreenOnPlay && $YTPlayer.YTPFullscreen()
                    }).css({
                        cursor: "pointer"
                    })
                }
                let playerBox = jQuery("<div/>").attr("id", YTPlayer.playerID).addClass("playerBox");
                if (playerBox.css({
                        position: "absolute",
                        zIndex: 0,
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        overflow: "hidden",
                        opacity: 1
                    }), YTPlayer.wrapper.append(playerBox), playerBox.after(YTPlayer.overlay), YTPlayer.isPlayer && (YTPlayer.inlineWrapper = jQuery("<div/>").addClass("inline-YTPlayer"), YTPlayer.inlineWrapper.css({
                        position: "relative",
                        maxWidth: YTPlayer.opt.containment.css("width")
                    }), YTPlayer.opt.containment.css({
                        position: "relative",
                        paddingBottom: "56.25%",
                        overflow: "hidden",
                        height: 0
                    }), YTPlayer.opt.containment.wrap(YTPlayer.inlineWrapper)), YTPlayer.opt.containment.children().not("script, style").each(function() {
                        "static" === jQuery(this).css("position") && jQuery(this).css("position", "relative")
                    }), YTPlayer.isBackground ? (jQuery("body").css({
                        boxSizing: "border-box"
                    }), YTPlayer.wrapper.css({
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: 0
                    })) : "static" === YTPlayer.opt.containment.css("position") && (YTPlayer.opt.containment.css({
                        position: "relative"
                    }), $YTPlayer.show()), YTPlayer.opt.containment.prepend(YTPlayer.wrapper), YTPlayer.isBackground || YTPlayer.overlay.on("mouseenter", function() {
                        YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.addClass("visible")
                    }).on("mouseleave", function() {
                        YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.removeClass("visible")
                    }), jQuery.mbBrowser.mobile && !YTPlayer.opt.useOnMobile) return YTPlayer.opt.coverImage && (YTPlayer.wrapper.css({
                    backgroundImage: "url(" + YTPlayer.opt.coverImage + ")",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    opacity: 1
                }), YTPlayer.wrapper.css({
                    opacity: 1
                })), $YTPlayer;
                jQuery.mbBrowser.mobile && YTPlayer.opt.autoPlay && YTPlayer.opt.useOnMobile && jQuery("body").one("touchstart", function() {
                    YTPlayer.player.playVideo()
                }), jQuery(document).one("YTAPIReady", function() {
                    $YTPlayer.trigger("YTAPIReady_" + YTPlayer.id), ytp.YTAPIReady = !0
                }), YTPlayer.isOnScreen = jQuery.mbYTPlayer.isOnScreen(YTPlayer, YTPlayer.opt.onScreenPercentage), $YTPlayer.one("YTAPIReady_" + YTPlayer.id, function() {
                    let e = this,
                        r = jQuery(e);
                    e.isBackground && ytp.backgroundIsInited || e.isInit || (e.isBackground && (ytp.backgroundIsInited = !0), e.opt.autoPlay = void 0 === e.opt.autoPlay ? !!e.isBackground : e.opt.autoPlay, e.opt.vol = e.opt.vol ? e.opt.vol : 100, jQuery.mbYTPlayer.getDataFromAPI(e), jQuery(e).on("YTPChanged", function(t) {
                        if (e.isInit) return;
                        e.isInit = !0;
                        let a = {
                            modestbranding: 1,
                            autoplay: 0,
                            controls: 0,
                            showinfo: 0,
                            rel: 0,
                            enablejsapi: 1,
                            version: 3,
                            playerapiid: e.playerID,
                            origin: "*",
                            allowfullscreen: !0,
                            wmode: "transparent",
                            iv_load_policy: e.opt.showAnnotations,
                            cc_load_policy: e.opt.cc_load_policy,
                            playsinline: jQuery.mbBrowser.mobile && !e.isPlayer ? 1 : 0,
                            html5: document.createElement("video").canPlayType ? 1 : 0
                        };
                        new YT.Player(e.playerID, {
                            host: e.opt.useNoCookie ? "https://www.youtube-nocookie.com" : "https://www.youtube.com",
                            playerVars: a,
                            events: {
                                onReady: function(t) {
                                    e.player = t.target, e.player.loadVideoById({
                                        videoId: e.videoID.toString(),
                                        suggestedQuality: e.opt.quality
                                    }), r.trigger("YTPlayerIsReady_" + e.id)
                                },
                                onStateChange: function(r) {
                                    if ("function" != typeof r.target.getPlayerState) return;
                                    let t, a = r.target.getPlayerState();
                                    if (e.preventTrigger || e.isStarting) return void(e.preventTrigger = !1);
                                    switch (e.state = a, r.data === YT.PlayerState.PLAYING && r.target.setPlaybackQuality(e.opt.quality), a) {
                                        case -1:
                                            t = "YTPUnstarted";
                                            break;
                                        case 0:
                                            t = "YTPRealEnd";
                                            break;
                                        case 1:
                                            t = "YTPPlay", e.controlBar.length && e.controlBar.find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.pause), e.isPlayer && e.inlinePlayButton.hide(), jQuery(document).off("mousedown.YTPstart");
                                            break;
                                        case 2:
                                            t = "YTPPause", e.controlBar.length && e.controlBar.find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.play), e.isPlayer && e.inlinePlayButton.show();
                                            break;
                                        case 3:
                                            e.player.setPlaybackQuality(e.opt.quality), t = "YTPBuffering", e.controlBar.length && e.controlBar.find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.play);
                                            break;
                                        case 5:
                                            t = "YTPCued"
                                    }
                                    let o = jQuery.Event(t);
                                    o.time = e.currentTime, jQuery(e).trigger(o)
                                },
                                onPlaybackQualityChange: function(r) {
                                    let t = r.target.getPlaybackQuality(),
                                        a = jQuery.Event("YTPQualityChange");
                                    a.quality = t, jQuery(e).trigger(a)
                                },
                                onError: function(t) {
                                    switch ("function" == typeof e.opt.onError && e.opt.onError(r, t), console.debug("error:", t), t.data) {
                                        case 2:
                                            console.error("video ID:: " + e.videoID + ": The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.");
                                            break;
                                        case 5:
                                            console.error("video ID:: " + e.videoID + ": The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.");
                                            break;
                                        case 100:
                                            console.error("video ID:: " + e.videoID + ": The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.");
                                            break;
                                        case 101:
                                        case 150:
                                            console.error("video ID:: " + e.videoID + ": The video doesn't exist or The owner does not allow it to be played in embedded players.")
                                    }
                                    e.isList && jQuery(e).YTPPlayNext()
                                }
                            }
                        }), r.on("YTPlayerIsReady_" + e.id, function() {
                            if (e.isReady) return this;
                            e.playerEl = e.player.getIframe(), jQuery(e.playerEl).unselectable(), r.optimizeDisplay(), jQuery(window).off("resize.YTP_" + e.id).on("resize.YTP_" + e.id, function() {
                                r.optimizeDisplay()
                            }), jQuery(window).off("orientationchange.YTP_" + e.id).on("orientationchange.YTP_" + e.id, function() {
                                r.optimizeDisplay()
                            }), e.opt.remember_last_time && jQuery(window).on("unload.YTP_" + e.id, function() {
                                let r = e.player.getCurrentTime();
                                jQuery.mbCookie.set("YTPlayer_start_from" + e.videoID, r, 0)
                            }), r.YTPCheckForState()
                        })
                    }))
                }), $YTPlayer.off("YTPTime.mask"), jQuery.mbYTPlayer.applyMask(YTPlayer), console.timeEnd(YTPTimerLabels.init), setTimeout(function() {
                    ytp.YTAPIReady || "object" != typeof window.YT || (jQuery(document).trigger("YTAPIReady"), ytp.YTAPIReady = !0, console.error("YTPlayer: More then a call to the YT API has been detected"))
                }, YTPlayer.opt.delayAtStart)
            })
        },
        isOnScreen: function(e, r) {
            r = r || 10;
            let t = e.wrapper,
                a = jQuery(window).scrollTop(),
                o = a + jQuery(window).height(),
                n = t.height() * r / 100,
                i = t.offset().top + n;
            return t.offset().top + (t.height() - n) <= o && i >= a
        },
        getDataFromAPI: function(e) {
            e.videoData = jQuery.mbStorage.get("YTPlayer_data_" + e.videoID), e.videoData ? (setTimeout(function() {
                e.dataReceived = !0;
                let r = jQuery.Event("YTPChanged");
                r.time = e.currentTime, r.videoId = e.videoID, r.opt = e.opt, jQuery(e).trigger(r);
                let t = jQuery.Event("YTPData");
                t.prop = {};
                for (let r in e.videoData) e.videoData.hasOwnProperty(r) && (t.prop[r] = e.videoData[r]);
                jQuery(e).trigger(t)
            }, e.opt.fadeOnStartTime), e.hasData = !0) : jQuery.mbYTPlayer.apiKey ? jQuery.getJSON("https://www.googleapis.com/youtube/v3/videos?id=" + e.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function(r) {
                e.dataReceived = !0;
                let t = jQuery.Event("YTPChanged");
                t.time = e.currentTime, t.videoId = e.videoID, jQuery(e).trigger(t), r.items[0] ? (! function(r) {
                    e.videoData = {}, e.videoData.id = e.videoID, e.videoData.channelTitle = r.channelTitle, e.videoData.title = r.title, e.videoData.description = r.description.length < 400 ? r.description : r.description.substring(0, 400) + " ...", e.videoData.thumb_max = r.thumbnails.maxres ? r.thumbnails.maxres.url : null, e.videoData.thumb_high = r.thumbnails.high ? r.thumbnails.high.url : null, e.videoData.thumb_medium = r.thumbnails.medium ? r.thumbnails.medium.url : null, jQuery.mbStorage.set("YTPlayer_data_" + e.videoID, e.videoData)
                }(r.items[0].snippet), e.hasData = !0) : (e.videoData = {}, e.hasData = !1);
                let a = jQuery.Event("YTPData");
                a.prop = {};
                for (let r in e.videoData) a.prop[r] = e.videoData[r];
                jQuery(e).trigger(a)
            }).fail(function(r) {
                console.error("YT data error:: ", r), e.hasData = !1;
                let t = jQuery.Event("YTPChanged");
                t.time = e.currentTime, t.videoId = e.videoID, jQuery(e).trigger(t)
            }) : (setTimeout(function() {
                let r = jQuery.Event("YTPChanged");
                r.time = e.currentTime, r.videoId = e.videoID, jQuery(e).trigger(r)
            }, 10), e.videoData = null), e.opt.ratio = "auto" == e.opt.ratio ? 16 / 9 : e.opt.ratio, e.isPlayer && !e.opt.autoPlay && (e.loading = jQuery("<div/>").addClass("loading").html("Loading").hide(), jQuery(e).append(e.loading), e.loading.fadeIn())
        },
        removeStoredData: function() {
            jQuery.mbStorage.remove()
        },
        getVideoData: function() {
            return this.get(0).videoData
        },
        getVideoID: function() {
            return this.get(0).videoID || !1
        },
        getPlaylistID: function() {
            return this.get(0).playlistID || !1
        },
        setVideoQuality: function(e) {
            let r = this.get(0),
                t = r.player.getCurrentTime();
            return jQuery(r).YTPPause(), r.opt.quality = e, r.player.setPlaybackQuality(e), r.player.seekTo(t), jQuery(r).YTPPlay(), this
        },
        getVideoQuality: function() {
            return this.get(0).player.getPlaybackQuality()
        },
        playlist: function(e, r, t) {
            let a = this.get(0);
            return a.isList = !0, r && (e = jQuery.shuffle(e)), a.videoID || (a.videos = e, a.videoCounter = 1, a.videoLength = e.length, jQuery(a).data("property", e[0]), jQuery(a).YTPlayer()), "function" == typeof t && jQuery(a).on("YTPChanged", function() {
                t(a)
            }), jQuery(a).on("YTPEnd", function() {
                jQuery(a).YTPPlayNext()
            }), this
        },
        playNext: function() {
            let e = this.get(0);
            return e.videoCounter++, e.videoCounter > e.videoLength && (e.videoCounter = 1), jQuery(e).YTPPlayIndex(e.videoCounter), this
        },
        playPrev: function() {
            let e = this.get(0);
            return e.videoCounter--, e.videoCounter <= 0 && (e.videoCounter = e.videoLength), jQuery(e).YTPPlayIndex(e.videoCounter), this
        },
        playIndex: function(e) {
            let r = this.get(0);
            r.checkForStartAt && (clearInterval(r.checkForStartAt), clearInterval(r.getState)), r.videoCounter = e, r.videoCounter >= r.videoLength && (r.videoCounter = r.videoLength);
            let t = r.videos[r.videoCounter - 1];
            return jQuery(r).YTPChangeVideo(t), this
        },
        changeVideo: function(e) {
            let r = this,
                t = r.get(0);
            t.opt.startAt = 0, t.opt.stopAt = 0, t.opt.mask = !1, t.opt.mute = !0, t.opt.autoPlay = !0, t.opt.addFilters = !1, t.opt.coverImage = !1, t.hasData = !1, t.hasChanged = !0, t.player.loopTime = void 0, e && jQuery.extend(t.opt, e), t.videoID = getYTPVideoID(t.opt.videoURL).videoID, t.opt.loop && "boolean" == typeof t.opt.loop && (t.opt.loop = 9999), t.wrapper.css({
                background: "none"
            }), jQuery(t.playerEl).CSSAnimate({
                opacity: 0
            }, t.opt.fadeOnStartTime, function() {
                jQuery.mbYTPlayer.getDataFromAPI(t), r.YTPGetPlayer().loadVideoById({
                    videoId: t.videoID,
                    suggestedQuality: t.opt.quality
                }), r.YTPPause(), r.optimizeDisplay(), t.checkForStartAt && (clearInterval(t.checkForStartAt), clearInterval(t.getState)), r.YTPCheckForState()
            });
            let a = jQuery.Event("YTPChangeVideo");
            return a.time = t.currentTime, jQuery(t).trigger(a), jQuery.mbYTPlayer.applyMask(t), this
        },
        getPlayer: function() {
            let e = this.get(0);
            return e.isReady ? e.player : null
        },
        playerDestroy: function() {
            let e = this.get(0);
            return e.isReady ? (ytp.YTAPIReady = !0, ytp.backgroundIsInited = !1, e.isInit = !1, e.videoID = null, e.isReady = !1, e.wrapper.remove(), jQuery("#controlBar_" + e.id).remove(), clearInterval(e.checkForStartAt), clearInterval(e.getState), this) : this
        },
        fullscreen: function(real) {
            let YTPlayer = this.get(0);
            void 0 === real && (real = eval(YTPlayer.opt.realFullscreen));
            let controls = jQuery("#controlBar_" + YTPlayer.id),
                fullScreenBtn = controls.find(".mb_OnlyYT"),
                videoWrapper = YTPlayer.isPlayer ? YTPlayer.opt.containment : YTPlayer.wrapper;
            if (real) {
                let e = jQuery.mbBrowser.mozilla ? "mozfullscreenchange" : jQuery.mbBrowser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery(document).off(e).on(e, function() {
                    RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen") ? jQuery(YTPlayer).trigger("YTPFullScreenStart") : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality), videoWrapper.removeClass("YTPFullscreen"), videoWrapper.CSSAnimate({
                        opacity: YTPlayer.opt.opacity
                    }, YTPlayer.opt.fadeOnStartTime), videoWrapper.css({
                        zIndex: 0
                    }), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
                })
            }
            if (YTPlayer.isAlone) jQuery(document).off("mousemove.YTPlayer"), clearTimeout(YTPlayer.hideCursor), YTPlayer.overlay.css({
                cursor: "auto"
            }), real ? cancelFullscreen() : (videoWrapper.CSSAnimate({
                opacity: YTPlayer.opt.opacity
            }, YTPlayer.opt.fadeOnStartTime), videoWrapper.css({
                zIndex: 0
            })), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1;
            else {
                function hideMouse() {
                    YTPlayer.overlay.css({
                        cursor: "none"
                    })
                }
                jQuery(document).on("mousemove.YTPlayer", function(e) {
                    YTPlayer.overlay.css({
                        cursor: "auto"
                    }), clearTimeout(YTPlayer.hideCursor), jQuery(e.target).parents().is(".mb_YTPBar") || (YTPlayer.hideCursor = setTimeout(hideMouse, 3e3))
                }), hideMouse(), real ? (videoWrapper.css({
                    opacity: 0
                }), videoWrapper.addClass("YTPFullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function() {
                    videoWrapper.CSSAnimate({
                        opacity: 1
                    }, 2 * YTPlayer.opt.fadeOnStartTime), videoWrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0)
                }, YTPlayer.opt.fadeOnStartTime)) : videoWrapper.css({
                    zIndex: 1e4
                }).CSSAnimate({
                    opacity: 1
                }, 2 * YTPlayer.opt.fadeOnStartTime), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0
            }

            function RunPrefixMethod(e, r) {
                let t, a, o = ["webkit", "moz", "ms", "o", ""],
                    n = 0;
                for (; n < o.length && !e[t];) {
                    if (t = r, "" === o[n] && (t = t.substr(0, 1).toLowerCase() + t.substr(1)), "undefined" != (a = typeof e[t = o[n] + t])) return o = [o[n]], "function" == a ? e[t]() : e[t];
                    n++
                }
            }

            function launchFullscreen(e) {
                RunPrefixMethod(e, "RequestFullScreen")
            }

            function cancelFullscreen() {
                (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
            }
            return this
        },
        toggleLoops: function() {
            let e = this.get(0),
                r = e.opt;
            return 1 == r.loop ? r.loop = 0 : (r.startAt ? e.player.seekTo(r.startAt) : e.player.playVideo(), r.loop = 1), this
        },
        play: function() {
            let e = this.get(0),
                r = jQuery(e);
            return e.isReady ? (setTimeout(function() {
                r.YTPSetAbundance(e.opt.abundance)
            }, 300), e.player.playVideo(), jQuery(e.playerEl).css({
                opacity: 1
            }), e.wrapper.css({
                backgroundImage: "none"
            }), e.wrapper.CSSAnimate({
                opacity: e.isAlone ? 1 : e.opt.opacity
            }, e.opt.fadeOnStartTime), jQuery("#controlBar_" + e.id).find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.pause), e.state = 1, this) : this
        },
        togglePlay: function(e) {
            let r = this.get(0);
            return r.isReady ? (1 === r.state ? this.YTPPause() : this.YTPPlay(), "function" == typeof e && e(r.state), this) : this
        },
        stop: function() {
            let e = this.get(0);
            return e.isReady ? (jQuery("#controlBar_" + e.id).find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.play), e.player.stopVideo(), this) : this
        },
        pause: function() {
            let e = this.get(0);
            return e.isReady ? (e.opt.abundance < .2 && this.YTPSetAbundance(.2), e.player.pauseVideo(), e.state = 2, this) : this
        },
        seekTo: function(e) {
            let r = this.get(0);
            return r.isReady ? (r.player.seekTo(e, !0), this) : this
        },
        getPlaybackRate: function() {
            let e = this.get(0);
            return e.isReady ? e.player.getPlaybackRate() : this
        },
        setPlaybackRate: function(e) {
            let r = this.get(0);
            return r.isReady ? (r.player.setPlaybackRate(e), this) : this
        },
        setVolume: function(e) {
            let r = this.get(0);
            return r.isReady ? (r.opt.vol = e, this.YTPUnmute(), r.player.setVolume(r.opt.vol), r.volumeBar && r.volumeBar.length && r.volumeBar.updateSliderVal(e), this) : this
        },
        getVolume: function() {
            let e = this.get(0);
            return e.isReady ? e.player.getVolume() : this
        },
        toggleVolume: function() {
            let e = this.get(0);
            return e.isReady ? (e.isMute ? (jQuery.mbBrowser.mobile || this.YTPSetVolume(e.opt.vol), this.YTPUnmute()) : this.YTPMute(), this) : this
        },
        mute: function() {
            let e = this.get(0);
            if (!e.isReady) return this;
            if (e.isMute) return this;
            e.player.mute(), e.isMute = !0, e.player.setVolume(0), e.volumeBar && e.volumeBar.length && e.volumeBar.width() > 10 && e.volumeBar.updateSliderVal(0), jQuery("#controlBar_" + e.id).find(".mb_YTPMuteUnmute").html(jQuery.mbYTPlayer.controls.unmute), jQuery(e).addClass("isMuted"), e.volumeBar && e.volumeBar.length && e.volumeBar.addClass("muted");
            let r = jQuery.Event("YTPMuted");
            return r.time = e.currentTime, e.preventTrigger || jQuery(e).trigger(r), this
        },
        unmute: function() {
            let e = this.get(0);
            if (!e.isReady) return this;
            if (!e.isMute) return this;
            e.player.unMute(), e.isMute = !1, jQuery(e).YTPSetVolume(e.opt.vol), e.volumeBar && e.volumeBar.length && e.volumeBar.updateSliderVal(e.opt.vol > 10 ? e.opt.vol : 10), jQuery("#controlBar_" + e.id).find(".mb_YTPMuteUnmute").html(jQuery.mbYTPlayer.controls.mute), jQuery(e).removeClass("isMuted"), e.volumeBar && e.volumeBar.length && e.volumeBar.removeClass("muted");
            let r = jQuery.Event("YTPUnmuted");
            return r.time = e.currentTime, e.preventTrigger || jQuery(e).trigger(r), this
        },
        applyFilter: function(e, r) {
            let t = this.get(0);
            if (!t.isReady) return this;
            t.filters[e].value = r, t.filtersEnabled && this.YTPEnableFilters()
        },
        applyFilters: function(e) {
            let r = this,
                t = r.get(0);
            if (!t.isReady) return jQuery(t).on("YTPReady", function() {
                r.YTPApplyFilters(e)
            }), this;
            for (let t in e) r.YTPApplyFilter(t, e[t]);
            r.trigger("YTPFiltersApplied")
        },
        toggleFilter: function(e, r) {
            let t = this.get(0);
            return t.isReady ? (t.filters[e].value ? t.filters[e].value = 0 : t.filters[e].value = r, t.filtersEnabled && jQuery(t).YTPEnableFilters(), this) : this
        },
        toggleFilters: function(e) {
            let r = this.get(0);
            return r.isReady ? (r.filtersEnabled ? (jQuery(r).trigger("YTPDisableFilters"), jQuery(r).YTPDisableFilters()) : (jQuery(r).YTPEnableFilters(), jQuery(r).trigger("YTPEnableFilters")), "function" == typeof e && e(r.filtersEnabled), this) : this
        },
        disableFilters: function() {
            let e = this.get(0);
            if (!e.isReady) return this;
            let r = jQuery(e.playerEl);
            return r.css("-webkit-filter", ""), r.css("filter", ""), e.filtersEnabled = !1, this
        },
        enableFilters: function() {
            let e = this.get(0);
            if (!e.isReady) return this;
            let r = jQuery(e.playerEl),
                t = "";
            for (let r in e.filters) e.filters[r].value && (t += r.replace("_", "-") + "(" + e.filters[r].value + e.filters[r].unit + ") ");
            return r.css("-webkit-filter", t), r.css("filter", t), e.filtersEnabled = !0, this
        },
        removeFilter: function(e, r) {
            let t = this,
                a = t.get(0);
            if (!a.isReady) return this;
            if ("function" == typeof e && (r = e, e = null), e) t.YTPApplyFilter(e, 0), "function" == typeof r && r(e);
            else {
                for (let e in a.filters) a.filters.hasOwnProperty(e) && (t.YTPApplyFilter(e, 0), "function" == typeof r && r(e));
                a.filters = jQuery.extend(!0, {}, jQuery.mbYTPlayer.defaultFilters)
            }
            let o = jQuery.Event("YTPFiltersApplied");
            return t.trigger(o), this
        },
        getFilters: function() {
            let e = this.get(0);
            return e.isReady ? e.filters : this
        },
        addMask: function(e) {
            let r = this.get(0);
            e || (e = r.actualMask);
            let t = jQuery("<img/>").attr("src", e).on("load", function() {
                r.overlay.CSSAnimate({
                    opacity: 0
                }, r.opt.fadeOnStartTime, function() {
                    r.hasMask = !0, t.remove(), r.overlay.css({
                        backgroundImage: "url(" + e + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "cover"
                    }), r.overlay.CSSAnimate({
                        opacity: 1
                    }, r.opt.fadeOnStartTime)
                })
            });
            return this
        },
        removeMask: function() {
            let e = this.get(0);
            return e.overlay.CSSAnimate({
                opacity: 0
            }, e.opt.fadeOnStartTime, function() {
                e.hasMask = !1, e.overlay.css({
                    backgroundImage: "",
                    backgroundRepeat: "",
                    backgroundPosition: "",
                    backgroundSize: ""
                }), e.overlay.CSSAnimate({
                    opacity: 1
                }, e.opt.fadeOnStartTime)
            }), this
        },
        applyMask: function(e) {
            let r = jQuery(e);
            if (r.off("YTPTime.mask"), e.opt.mask)
                if ("string" == typeof e.opt.mask) r.YTPAddMask(e.opt.mask), e.actualMask = e.opt.mask;
                else if ("object" == typeof e.opt.mask) {
                for (let r in e.opt.mask) e.opt.mask[r] && (img = jQuery("<img/>").attr("src", e.opt.mask[r]));
                e.opt.mask[0] && r.YTPAddMask(e.opt.mask[0]), r.on("YTPTime.mask", function(t) {
                    for (let a in e.opt.mask) t.time === a && (e.opt.mask[a] ? (r.YTPAddMask(e.opt.mask[a]), e.actualMask = e.opt.mask[a]) : r.YTPRemoveMask())
                })
            }
        },
        toggleMask: function() {
            let e = this.get(0),
                r = jQuery(e);
            return e.hasMask ? r.YTPRemoveMask() : r.YTPAddMask(), this
        },
        manageProgress: function() {
            let e = this.get(0),
                r = jQuery("#controlBar_" + e.id),
                t = r.find(".mb_YTPProgress"),
                a = r.find(".mb_YTPLoaded"),
                o = r.find(".mb_YTPseekbar"),
                n = t.outerWidth(),
                i = Math.floor(e.player.getCurrentTime()),
                l = Math.floor(e.player.getDuration()),
                s = i * n / l,
                u = 100 * e.player.getVideoLoadedFraction();
            return a.css({
                left: 0,
                width: u + "%"
            }), o.css({
                left: 0,
                width: s
            }), {
                totalTime: l,
                currentTime: i
            }
        },
        buildControls: function(YTPlayer) {
            if (jQuery("#controlBar_" + YTPlayer.id).remove(), !YTPlayer.opt.showControls) return void(YTPlayer.controlBar = !1);
            if (YTPlayer.opt.showYTLogo = YTPlayer.opt.showYTLogo || YTPlayer.opt.printUrl, jQuery("#controlBar_" + YTPlayer.id).length) return;
            YTPlayer.controlBar = jQuery("<div/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
                whiteSpace: "noWrap",
                position: YTPlayer.isBackground ? "fixed" : "absolute",
                zIndex: YTPlayer.isBackground ? 1e4 : 1e3
            }).hide().on("click", function(e) {
                e.stopPropagation()
            });
            let buttonBar = jQuery("<div/>").addClass("buttonBar"),
                playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlayPause ytpicon").on("click", function(e) {
                    e.stopPropagation(), jQuery(YTPlayer).YTPTogglePlay()
                }),
                MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").on("click", function(e) {
                    e.stopPropagation(), jQuery(YTPlayer).YTPToggleVolume()
                }),
                volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({
                    display: "inline-block"
                });
            YTPlayer.volumeBar = volumeBar;
            let idx = jQuery("<span/>").addClass("mb_YTPTime"),
                vURL = YTPlayer.opt.videoURL ? YTPlayer.opt.videoURL : "";
            vURL.indexOf("http") < 0 && (vURL = "https://www.youtube.com/watch?v=" + YTPlayer.opt.videoURL);
            let movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function() {
                    window.open(vURL, "viewOnYT")
                }),
                onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function(e) {
                    e.stopPropagation(), jQuery(YTPlayer).YTPFullscreen(YTPlayer.opt.realFullscreen)
                }),
                progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").on("click", function(e) {
                    e.stopPropagation(), timeBar.css({
                        width: e.clientX - timeBar.offset().left
                    }), YTPlayer.timeW = e.clientX - timeBar.offset().left, YTPlayer.controlBar.find(".mb_YTPLoaded").css({
                        width: 0
                    });
                    let r = Math.floor(YTPlayer.player.getDuration());
                    YTPlayer.goto = timeBar.outerWidth() * r / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer.goto), !0), YTPlayer.controlBar.find(".mb_YTPLoaded").css({
                        width: 0
                    })
                }),
                loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
                timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
            progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx), YTPlayer.opt.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realFullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), YTPlayer.controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(YTPlayer.controlBar) : (YTPlayer.controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(YTPlayer.controlBar)), volumeBar.simpleSlider({
                initialval: YTPlayer.opt.vol,
                scale: 100,
                orientation: "h",
                callback: function(e) {
                    0 == e.value ? jQuery(YTPlayer).YTPMute() : jQuery(YTPlayer).YTPUnmute(), YTPlayer.player.setVolume(e.value), YTPlayer.isMute || (YTPlayer.opt.vol = e.value)
                }
            })
        },
        changeCoverImage: function(e) {
            let r = this.get(0);
            if (r.opt.coverImage || r.orig_containment_background) {
                let t = e || (r.opt.coverImage ? "url(" + r.opt.coverImage + ") center center" : r.orig_containment_background);
                t && r.opt.containment.css({
                    background: t,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed"
                })
            }
            return this
        },
        checkForState: function() {
            let YTPlayer = this.get(0),
                $YTPlayer = jQuery(YTPlayer);
            clearInterval(YTPlayer.getState);
            let interval = 100;
            if (!jQuery.contains(document, YTPlayer)) return $YTPlayer.YTPPlayerDestroy(), clearInterval(YTPlayer.getState), void clearInterval(YTPlayer.checkForStartAt);
            jQuery.mbYTPlayer.checkForStart(YTPlayer), YTPlayer.getState = setInterval(function() {
                let $YTPlayer = jQuery(YTPlayer);
                if (!YTPlayer.isReady) return;
                let prog = jQuery(YTPlayer).YTPManageProgress(),
                    stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
                if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.currentTime != prog.currentTime) {
                    let e = jQuery.Event("YTPTime");
                    e.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(e)
                }
                if (YTPlayer.currentTime = prog.currentTime, YTPlayer.totalTime = YTPlayer.player.getDuration(), 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && (prog.totalTime ? YTPlayer.controlBar.find(".mb_YTPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime)) : YTPlayer.controlBar.find(".mb_YTPTime").html("-- : -- / -- : --")), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, YTPlayer.preventTrigger = !0, $YTPlayer.YTPPlay()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, YTPlayer.preventTrigger = !0, $YTPlayer.YTPPause())), YTPlayer.opt.playOnlyIfVisible) {
                    let e = jQuery.mbYTPlayer.isOnScreen(YTPlayer, YTPlayer.opt.onScreenPercentage);
                    e || 1 != YTPlayer.state ? e && !YTPlayer.isOnScreen && (YTPlayer.isOnScreen = !0, YTPlayer.player.playVideo()) : (YTPlayer.isOnScreen = !1, $YTPlayer.YTPPause())
                }
                if (YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ? (YTPlayer.controlBar.addClass("compact"), YTPlayer.isCompact = !0, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)) : YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact && (YTPlayer.controlBar.removeClass("compact"), YTPlayer.isCompact = !1, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)), YTPlayer.player.getPlayerState() > 0 && (parseFloat(YTPlayer.player.getDuration() - YTPlayer.opt.fadeOnStartTime / 1e3) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) >= stopAt)) {
                    if (YTPlayer.isEnded) return;
                    if (YTPlayer.isEnded = !0, setTimeout(function() {
                            YTPlayer.isEnded = !1
                        }, 1e3), YTPlayer.isList) {
                        if (!YTPlayer.opt.loop || YTPlayer.opt.loop > 0 && YTPlayer.player.loopTime === YTPlayer.opt.loop - 1) {
                            YTPlayer.player.loopTime = void 0, clearInterval(YTPlayer.getState);
                            let e = jQuery.Event("YTPEnd");
                            return e.time = YTPlayer.currentTime, void jQuery(YTPlayer).trigger(e)
                        }
                    } else if (!YTPlayer.opt.loop || YTPlayer.opt.loop > 0 && YTPlayer.player.loopTime === YTPlayer.opt.loop - 1) return YTPlayer.player.loopTime = void 0, YTPlayer.state = 2, $YTPlayer.changeCoverImage(YTPlayer), jQuery(YTPlayer).YTPPause(), void YTPlayer.wrapper.CSSAnimate({
                        opacity: 0
                    }, YTPlayer.opt.fadeOnStartTime, function() {
                        YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.play), $YTPlayer.changeCoverImage();
                        let e = jQuery.Event("YTPEnd");
                        e.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(e), YTPlayer.player.seekTo(YTPlayer.opt.startAt, !0)
                    });
                    YTPlayer.player.loopTime = YTPlayer.player.loopTime ? ++YTPlayer.player.loopTime : 1, YTPlayer.opt.startAt = YTPlayer.opt.startAt || 1, YTPlayer.preventTrigger = !0, YTPlayer.state = 2, YTPlayer.player.seekTo(YTPlayer.opt.startAt, !0)
                }
            }, interval)
        },
        checkForStart: function(YTPlayer) {
            let $YTPlayer = jQuery(YTPlayer);
            if (!jQuery.contains(document, YTPlayer)) return void $YTPlayer.YTPPlayerDestroy();
            if (jQuery.mbYTPlayer.buildControls(YTPlayer), YTPlayer.overlay)
                if (YTPlayer.opt.addRaster) {
                    let e = "dot" == YTPlayer.opt.addRaster ? "raster-dot" : "raster";
                    YTPlayer.overlay.addClass(YTPlayer.isRetina ? e + " retina" : e)
                } else YTPlayer.overlay.removeClass(function(e, r) {
                    let t = r.split(" "),
                        a = [];
                    return jQuery.each(t, function(e, r) {
                        /raster.*/.test(r) && a.push(r)
                    }), a.push("retina"), a.join(" ")
                });
            YTPlayer.preventTrigger = !0, YTPlayer.state = 2, YTPlayer.preventTrigger = !0, YTPlayer.player.mute(), YTPlayer.player.playVideo(), YTPlayer.isStarting = !0;
            let startAt = YTPlayer.start_from_last ? YTPlayer.start_from_last : YTPlayer.opt.startAt ? YTPlayer.opt.startAt : 1;
            return YTPlayer.preventTrigger = !0, YTPlayer.checkForStartAt = setInterval(function() {
                YTPlayer.player.mute(), YTPlayer.player.seekTo(startAt, !0);
                let canPlayVideo = YTPlayer.player.getVideoLoadedFraction() >= startAt / YTPlayer.player.getDuration();
                if (jQuery.mbBrowser.mobile && (canPlayVideo = !0), YTPlayer.player.getDuration() > 0 && YTPlayer.player.getCurrentTime() >= startAt && canPlayVideo) {
                    YTPlayer.start_from_last = null, YTPlayer.preventTrigger = !0, $YTPlayer.YTPPause(), clearInterval(YTPlayer.checkForStartAt), "function" == typeof YTPlayer.opt.onReady && YTPlayer.opt.onReady(YTPlayer), YTPlayer.isReady = !0, $YTPlayer.YTPRemoveFilter(), YTPlayer.opt.addFilters ? $YTPlayer.YTPApplyFilters(YTPlayer.opt.addFilters) : $YTPlayer.YTPApplyFilters(), $YTPlayer.YTPEnableFilters();
                    let YTPready = jQuery.Event("YTPReady");
                    if (YTPready.time = YTPlayer.currentTime, $YTPlayer.trigger(YTPready), YTPlayer.state = 2, YTPlayer.opt.mute ? $YTPlayer.YTPMute() : YTPlayer.opt.autoPlay ? (console.debug("We muted the audio to make the video 'auto-play' according with the latest vendor policy. The audio will unmute at the first user interaction with the page"), YTPlayer.player.mute(), YTPlayer.forcedMuted = !0, jQuery(document).on("mousedown.YTPstartAudio", function() {
                            YTPlayer.forcedMuted && (console.debug("AAAAAAA"), YTPlayer.player.unMute(), YTPlayer.forcedMuted = !1, jQuery(document).off("mousedown.YTPstartAudio"))
                        }), jQuery(window).on("scroll", function() {
                            console.debug("AAAAA")
                        })) : YTPlayer.player.unMute(), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) ? _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()]) : "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()), YTPlayer.opt.autoPlay) {
                        let e = jQuery.Event("YTPStart");
                        e.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(e), YTPlayer.isStarting = !1, "mac" === jQuery.mbBrowser.os.name && jQuery.mbBrowser.safari && jQuery("body").one("mousedown.YTPstart", function() {
                            $YTPlayer.YTPPlay()
                        }), $YTPlayer.YTPPlay(), console.timeEnd(YTPTimerLabels.startPlaying)
                    } else YTPlayer.preventTrigger = !0, $YTPlayer.YTPPause(), YTPlayer.start_from_last && YTPlayer.player.seekTo(startAt, !0), setTimeout(function() {
                        YTPlayer.preventTrigger = !0, $YTPlayer.YTPPause(), YTPlayer.isPlayer || (YTPlayer.opt.coverImage ? (YTPlayer.wrapper.css({
                            opacity: 0
                        }), setTimeout(function() {
                            $YTPlayer.changeCoverImage()
                        }, YTPlayer.opt.fadeOnStartTime)) : (jQuery(YTPlayer.playerEl).CSSAnimate({
                            opacity: 1
                        }, YTPlayer.opt.fadeOnStartTime), YTPlayer.wrapper.CSSAnimate({
                            opacity: YTPlayer.isAlone ? 1 : YTPlayer.opt.opacity
                        }, YTPlayer.opt.fadeOnStartTime))), YTPlayer.isStarting = !1
                    }, 500), YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlayPause").html(jQuery.mbYTPlayer.controls.play);
                    YTPlayer.isPlayer && !YTPlayer.opt.autoPlay && YTPlayer.loading && YTPlayer.loading.length && (YTPlayer.loading.html("Ready"), setTimeout(function() {
                        YTPlayer.loading.fadeOut()
                    }, 100)), YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.slideDown(1e3)
                }
                "mac" === jQuery.mbBrowser.os.name && jQuery.mbBrowser.safari && (YTPlayer.player.playVideo(), startAt >= 0 && YTPlayer.player.seekTo(startAt, !0))
            }, 100), $YTPlayer
        },
        getTime: function() {
            let e = this.get(0);
            return jQuery.mbYTPlayer.formatTime(e.currentTime)
        },
        getTotalTime: function() {
            let e = this.get(0);
            return jQuery.mbYTPlayer.formatTime(e.totalTime)
        },
        formatTime: function(e) {
            let r = Math.floor(e / 60),
                t = Math.floor(e - 60 * r);
            return (r <= 9 ? "0" + r : r) + " : " + (t <= 9 ? "0" + t : t)
        },
        setAnchor: function(e) {
            this.optimizeDisplay(e)
        },
        getAnchor: function() {
            return this.get(0).opt.anchor
        },
        setAbundance: function(e, r) {
            let t = this.get(0);
            return r && (t.opt.abundance = e), this.optimizeDisplay(t.opt.anchor, e), this
        },
        getAbundance: function() {
            return this.get(0).opt.abundance
        },
        setOption: function(e, r) {
            return this.get(0).opt[e] = r, this
        }
    }, jQuery.fn.optimizeDisplay = function(anchor, abundanceX) {
        let YTPlayer = this.get(0),
            vid = {},
            el = YTPlayer.wrapper,
            iframe = jQuery(YTPlayer.playerEl);
        YTPlayer.opt.anchor = anchor || YTPlayer.opt.anchor, YTPlayer.opt.anchor = "undefined " != typeof YTPlayer.opt.anchor ? YTPlayer.opt.anchor : "center,center";
        let YTPAlign = YTPlayer.opt.anchor.split(","),
            ab = abundanceX || YTPlayer.opt.abundance;
        if (YTPlayer.opt.optimizeDisplay) {
            let abundance = el.height() * ab,
                win = {};
            win.width = el.outerWidth(), win.height = el.outerHeight() + abundance, YTPlayer.opt.ratio = "auto" === YTPlayer.opt.ratio ? 16 / 9 : YTPlayer.opt.ratio, YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio), vid.width = win.width + abundance, vid.height = Math.ceil(vid.width / YTPlayer.opt.ratio), vid.marginTop = Math.ceil(-(vid.height - win.height + abundance) / 2), vid.marginLeft = -abundance / 2;
            let lowest = vid.height < win.height;
            lowest && (vid.height = win.height + abundance, vid.width = Math.ceil(vid.height * YTPlayer.opt.ratio), vid.marginTop = -abundance / 2, vid.marginLeft = Math.ceil(-(vid.width - win.width) / 2));
            for (let e in YTPAlign)
                if (YTPAlign.hasOwnProperty(e)) {
                    let r = YTPAlign[e].replace(/ /g, "");
                    switch (r) {
                        case "top":
                            vid.marginTop = -abundance;
                            break;
                        case "bottom":
                            vid.marginTop = Math.ceil(-(vid.height - win.height) - abundance / 2);
                            break;
                        case "left":
                            vid.marginLeft = -abundance;
                            break;
                        case "right":
                            vid.marginLeft = Math.ceil(-(vid.width - win.width) + abundance / 2)
                    }
                }
        } else vid.width = "100%", vid.height = "100%", vid.marginTop = 0, vid.marginLeft = 0;
        iframe.css({
            width: vid.width,
            height: vid.height,
            marginTop: vid.marginTop,
            marginLeft: vid.marginLeft,
            maxWidth: "initial"
        })
    }, jQuery.shuffle = function(e) {
        let r = e.slice(),
            t = r.length,
            a = t;
        for (; a--;) {
            let e = parseInt(Math.random() * t),
                o = r[a];
            r[a] = r[e], r[e] = o
        }
        return r
    }, jQuery.fn.unselectable = function() {
        return this.each(function() {
            jQuery(this).css({
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "user-select": "none"
            }).attr("unselectable", "on")
        })
    }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPCheckForState = jQuery.mbYTPlayer.checkForState, jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.YTPGetPlaylistID = jQuery.mbYTPlayer.getPlaylistID, jQuery.fn.YTPChangeVideo = jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeVideo, jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play, jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay, jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop, jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause, jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo, jQuery.fn.YTPGetPlaybackRate = jQuery.mbYTPlayer.getPlaybackRate, jQuery.fn.YTPSetPlaybackRate = jQuery.mbYTPlayer.setPlaybackRate, jQuery.fn.changeCoverImage = jQuery.mbYTPlayer.changeCoverImage, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist, jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext, jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.YTPPlayIndex = jQuery.mbYTPlayer.playIndex, jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute, jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute, jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume, jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.YTPGetVolume = jQuery.mbYTPlayer.getVolume, jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData, jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.YTPGetVideoQuality = jQuery.mbYTPlayer.getVideoQuality, jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter, jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters, jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter, jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters, jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter, jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters, jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters, jQuery.fn.YTPGetFilters = jQuery.mbYTPlayer.getFilters, jQuery.fn.YTPGetTime = jQuery.mbYTPlayer.getTime, jQuery.fn.YTPGetTotalTime = jQuery.mbYTPlayer.getTotalTime, jQuery.fn.YTPAddMask = jQuery.mbYTPlayer.addMask, jQuery.fn.YTPRemoveMask = jQuery.mbYTPlayer.removeMask, jQuery.fn.YTPToggleMask = jQuery.mbYTPlayer.toggleMask, jQuery.fn.YTPGetAbundance = jQuery.mbYTPlayer.getAbundance, jQuery.fn.YTPSetAbundance = jQuery.mbYTPlayer.setAbundance, jQuery.fn.YTPSetAnchor = jQuery.mbYTPlayer.setAnchor, jQuery.fn.YTPGetAnchor = jQuery.mbYTPlayer.getAnchor, jQuery.fn.YTPSetOption = jQuery.mbYTPlayer.setOption
}(jQuery, ytp);
var nAgt = navigator.userAgent;

function isTouchSupported() {
    var e = nAgt.msMaxTouchPoints,
        r = "ontouchstart" in document.createElement("div");
    return !(!e && !r)
}
jQuery.browser = jQuery.browser || {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.androidStock = !1, jQuery.browser.msie = !1, jQuery.browser.edge = !1, jQuery.browser.ua = nAgt;
var getOS = function() {
        var e = {
            version: "Unknown version",
            name: "Unknown OS"
        };
        return -1 != navigator.appVersion.indexOf("Win") && (e.name = "Windows"), -1 != navigator.appVersion.indexOf("Mac") && 0 > navigator.appVersion.indexOf("Mobile") && (e.name = "Mac"), -1 != navigator.appVersion.indexOf("Linux") && (e.name = "Linux"), /Mac OS X/.test(nAgt) && !/Mobile/.test(nAgt) && (e.version = /Mac OS X ([\._\d]+)/.exec(nAgt)[1], e.version = e.version.replace(/_/g, ".").substring(0, 5)), /Windows/.test(nAgt) && (e.version = "Unknown.Unknown"), /Windows NT 5.1/.test(nAgt) && (e.version = "5.1"), /Windows NT 6.0/.test(nAgt) && (e.version = "6.0"), /Windows NT 6.1/.test(nAgt) && (e.version = "6.1"), /Windows NT 6.2/.test(nAgt) && (e.version = "6.2"), /Windows NT 10.0/.test(nAgt) && (e.version = "10.0"), /Linux/.test(nAgt) && /Linux/.test(nAgt) && (e.version = "Unknown.Unknown"), e.name = e.name.toLowerCase(), e.major_version = "Unknown", e.minor_version = "Unknown", "Unknown.Unknown" != e.version && (e.major_version = parseFloat(e.version.split(".")[0]), e.minor_version = parseFloat(e.version.split(".")[1])), e
    },
    nameOffset, verOffset, ix;
if (jQuery.browser.os = getOS(), jQuery.browser.hasTouch = isTouchSupported(), jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10), -1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8));
else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4);
else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
else if (-1 != nAgt.indexOf("Trident")) {
    jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
    var start = nAgt.indexOf("rv:") + 3,
        end = start + 4;
    jQuery.browser.fullVersion = nAgt.substring(start, end)
} else -1 != (verOffset = nAgt.indexOf("Edge")) ? (jQuery.browser.edge = !0, jQuery.browser.name = "Microsoft Edge", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5)) : -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 < nAgt.indexOf("mozilla/5.0") && -1 < nAgt.indexOf("android ") && -1 < nAgt.indexOf("applewebkit") && !(-1 < nAgt.indexOf("chrome")) ? (verOffset = nAgt.indexOf("Chrome"), jQuery.browser.webkit = !0, jQuery.browser.androidStock = !0, jQuery.browser.name = "androidStock", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName));

function uncamel(e) {
    return e.replace(/([A-Z])/g, function(e) {
        return "-" + e.toLowerCase()
    })
}

function setUnit(e, r) {
    return "string" != typeof e || e.match(/^[\-0-9\.]+jQuery/) ? "" + e + r : e
}

function setFilter(e, r, t) {
    var a = uncamel(r),
        o = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx;
    e[o + "filter"] = e[o + "filter"] || "", t = setUnit(t > jQuery.CSS.filters[r].max ? jQuery.CSS.filters[r].max : t, jQuery.CSS.filters[r].unit), e[o + "filter"] += a + "(" + t + ") ", delete e[r]
} - 1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion, jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && 765 < jQuery(window).width(), jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt), jQuery.mbBrowser = jQuery.browser, jQuery.browser.versionCompare = function(e, r) {
        if ("stringstring" != typeof e + typeof r) return !1;
        for (var t = e.split("."), a = r.split("."), o = 0, n = Math.max(t.length, a.length); o < n; o++) {
            if (t[o] && !a[o] && 0 < parseInt(t[o]) || parseInt(t[o]) > parseInt(a[o])) return 1;
            if (a[o] && !t[o] && 0 < parseInt(a[o]) || parseInt(t[o]) < parseInt(a[o])) return -1
        }
        return 0
    }, jQuery.support.CSStransition = function() {
        var e = (document.body || document.documentElement).style;
        return void 0 !== e.transition || void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.MsTransition || void 0 !== e.OTransition
    }(), jQuery.CSS = {
        name: "mb.CSSAnimate",
        author: "Matteo Bicocchi",
        version: "2.0.0",
        transitionEnd: "transitionEnd",
        sfx: "",
        filters: {
            blur: {
                min: 0,
                max: 100,
                unit: "px"
            },
            brightness: {
                min: 0,
                max: 400,
                unit: "%"
            },
            contrast: {
                min: 0,
                max: 400,
                unit: "%"
            },
            grayscale: {
                min: 0,
                max: 100,
                unit: "%"
            },
            hueRotate: {
                min: 0,
                max: 360,
                unit: "deg"
            },
            invert: {
                min: 0,
                max: 100,
                unit: "%"
            },
            saturate: {
                min: 0,
                max: 400,
                unit: "%"
            },
            sepia: {
                min: 0,
                max: 100,
                unit: "%"
            }
        },
        normalizeCss: function(e) {
            var r = jQuery.extend(!0, {}, e);
            for (var t in jQuery.browser.webkit || jQuery.browser.opera ? jQuery.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? jQuery.CSS.sfx = "-moz-" : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-"), jQuery.CSS.sfx = "", r) {
                if ("transform" === t && (r[jQuery.CSS.sfx + "transform"] = r[t], delete r[t]), "transform-origin" === t && (r[jQuery.CSS.sfx + "transform-origin"] = e[t], delete r[t]), "filter" !== t || jQuery.browser.mozilla || (r[jQuery.CSS.sfx + "filter"] = e[t], delete r[t]), "blur" === t && setFilter(r, "blur", e[t]), "brightness" === t && setFilter(r, "brightness", e[t]), "contrast" === t && setFilter(r, "contrast", e[t]), "grayscale" === t && setFilter(r, "grayscale", e[t]), "hueRotate" === t && setFilter(r, "hueRotate", e[t]), "invert" === t && setFilter(r, "invert", e[t]), "saturate" === t && setFilter(r, "saturate", e[t]), "sepia" === t && setFilter(r, "sepia", e[t]), "x" === t) {
                    var a = jQuery.CSS.sfx + "transform";
                    r[a] = r[a] || "", r[a] += " translateX(" + setUnit(e[t], "px") + ")", delete r[t]
                }
                "y" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " translateY(" + setUnit(e[t], "px") + ")", delete r[t]), "z" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " translateZ(" + setUnit(e[t], "px") + ")", delete r[t]), "rotate" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " rotate(" + setUnit(e[t], "deg") + ")", delete r[t]), "rotateX" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " rotateX(" + setUnit(e[t], "deg") + ")", delete r[t]), "rotateY" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " rotateY(" + setUnit(e[t], "deg") + ")", delete r[t]), "rotateZ" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " rotateZ(" + setUnit(e[t], "deg") + ")", delete r[t]), "scale" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " scale(" + setUnit(e[t], "") + ")", delete r[t]), "scaleX" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " scaleX(" + setUnit(e[t], "") + ")", delete r[t]), "scaleY" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " scaleY(" + setUnit(e[t], "") + ")", delete r[t]), "scaleZ" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " scaleZ(" + setUnit(e[t], "") + ")", delete r[t]), "skew" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " skew(" + setUnit(e[t], "deg") + ")", delete r[t]), "skewX" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " skewX(" + setUnit(e[t], "deg") + ")", delete r[t]), "skewY" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " skewY(" + setUnit(e[t], "deg") + ")", delete r[t]), "perspective" === t && (r[a = jQuery.CSS.sfx + "transform"] = r[a] || "", r[a] += " perspective(" + setUnit(e[t], "px") + ")", delete r[t])
            }
            return r
        },
        getProp: function(e) {
            var r, t = [];
            for (r in e) 0 > t.indexOf(r) && t.push(uncamel(r));
            return t.join(",")
        },
        animate: function(e, r, t, a, o) {
            return this.each(function() {
                function n() {
                    i.called = !0, i.CSSAIsRunning = !1, l.off(jQuery.CSS.transitionEnd + "." + i.id), clearTimeout(i.timeout), l.css(jQuery.CSS.sfx + "transition", ""), "function" == typeof o && o.apply(i), "function" == typeof i.CSSqueue && (i.CSSqueue(), i.CSSqueue = null)
                }
                var i = this,
                    l = jQuery(this);
                i.id = i.id || "CSSA_" + (new Date).getTime();
                var s = s || {
                    type: "noEvent"
                };
                if (i.CSSAIsRunning && i.eventType == s.type && !jQuery.browser.msie && 9 >= jQuery.browser.version) i.CSSqueue = function() {
                    l.CSSAnimate(e, r, t, a, o)
                };
                else if (i.CSSqueue = null, i.eventType = s.type, 0 !== l.length && e) {
                    if (e = jQuery.normalizeCss(e), i.CSSAIsRunning = !0, "function" == typeof r && (o = r, r = jQuery.fx.speeds._default), "function" == typeof t && (a = t, t = 0), "string" == typeof t && (o = t, t = 0), "function" == typeof a && (o = a, a = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof r)
                        for (var u in jQuery.fx.speeds) {
                            if (r == u) {
                                r = jQuery.fx.speeds[u];
                                break
                            }
                            r = jQuery.fx.speeds._default
                        }
                    if (r || (r = jQuery.fx.speeds._default), "string" == typeof o && (a = o, o = null), jQuery.support.CSStransition) {
                        var y = {
                            default: "ease",
                            in: "ease-in",
                            out: "ease-out",
                            "in-out": "ease-in-out",
                            snap: "cubic-bezier(0,1,.5,1)",
                            easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
                            easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
                            easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
                            easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
                            easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
                            easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
                            easeOutExpo: "cubic-bezier(.19,1,.22,1)",
                            easeInOutExpo: "cubic-bezier(1,0,0,1)",
                            easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
                            easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
                            easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
                            easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
                            easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
                            easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
                            easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
                            easeOutQuint: "cubic-bezier(.23,1,.32,1)",
                            easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
                            easeInSine: "cubic-bezier(.47,0,.745,.715)",
                            easeOutSine: "cubic-bezier(.39,.575,.565,1)",
                            easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
                            easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
                            easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
                            easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
                        };
                        y[a] && (a = y[a]), l.off(jQuery.CSS.transitionEnd + "." + i.id), y = jQuery.CSS.getProp(e);
                        var d = {};
                        jQuery.extend(d, e), d[jQuery.CSS.sfx + "transition-property"] = y, d[jQuery.CSS.sfx + "transition-duration"] = r + "ms", d[jQuery.CSS.sfx + "transition-delay"] = t + "ms", d[jQuery.CSS.sfx + "transition-timing-function"] = a, setTimeout(function() {
                            l.one(jQuery.CSS.transitionEnd + "." + i.id, n), l.css(d)
                        }, 1), i.timeout = setTimeout(function() {
                            i.called || !o ? (i.called = !1, i.CSSAIsRunning = !1) : (l.css(jQuery.CSS.sfx + "transition", ""), o.apply(i), i.CSSAIsRunning = !1, "function" == typeof i.CSSqueue && (i.CSSqueue(), i.CSSqueue = null))
                        }, r + t + 10)
                    } else {
                        for (y in e) "transform" === y && delete e[y], "filter" === y && delete e[y], "transform-origin" === y && delete e[y], "auto" === e[y] && delete e[y], "x" === y && (s = e[y], e[u = "left"] = s, delete e[y]), "y" === y && (s = e[y], e[u = "top"] = s, delete e[y]), "-ms-transform" !== y && "-ms-filter" !== y || delete e[y];
                        l.delay(t).animate(e, r, o)
                    }
                }
            })
        }
    }, jQuery.fn.CSSAnimate = jQuery.CSS.animate, jQuery.normalizeCss = jQuery.CSS.normalizeCss, jQuery.fn.css3 = function(e) {
        return this.each(function() {
            var r = jQuery(this),
                t = jQuery.normalizeCss(e);
            r.css(t)
        })
    },
    function(e) {
        e.simpleSlider = {
            defaults: {
                initialval: 0,
                maxval: 100,
                orientation: "h",
                readonly: !1,
                callback: !1
            },
            events: {
                start: e.browser.mobile ? "touchstart" : "mousedown",
                end: e.browser.mobile ? "touchend" : "mouseup",
                move: e.browser.mobile ? "touchmove" : "mousemove"
            },
            init: function(r) {
                return this.each(function() {
                    var t = this,
                        a = e(t);
                    a.addClass("simpleSlider"), t.opt = {}, e.extend(t.opt, e.simpleSlider.defaults, r), e.extend(t.opt, a.data());
                    var o = "h" === t.opt.orientation ? "horizontal" : "vertical";
                    o = e("<div/>").addClass("level").addClass(o), a.prepend(o), t.level = o, a.css({
                        cursor: "default"
                    }), "auto" == t.opt.maxval && (t.opt.maxval = e(t).outerWidth()), a.updateSliderVal(), t.opt.readonly || (a.on(e.simpleSlider.events.start, function(r) {
                        e.browser.mobile && (r = r.changedTouches[0]), t.canSlide = !0, a.updateSliderVal(r), "h" === t.opt.orientation ? a.css({
                            cursor: "col-resize"
                        }) : a.css({
                            cursor: "row-resize"
                        }), t.lastVal = t.val, e.browser.mobile || (r.preventDefault(), r.stopPropagation())
                    }), e(document).on(e.simpleSlider.events.move, function(r) {
                        e.browser.mobile && (r = r.changedTouches[0]), t.canSlide && (e(document).css({
                            cursor: "default"
                        }), a.updateSliderVal(r), e.browser.mobile || (r.preventDefault(), r.stopPropagation()))
                    }).on(e.simpleSlider.events.end, function() {
                        e(document).css({
                            cursor: "auto"
                        }), t.canSlide = !1, a.css({
                            cursor: "auto"
                        })
                    }))
                })
            },
            updateSliderVal: function(r) {
                var t = this.get(0);
                if (t.opt) {
                    t.opt.initialval = "number" == typeof t.opt.initialval ? t.opt.initialval : t.opt.initialval(t);
                    var a = e(t).outerWidth(),
                        o = e(t).outerHeight();
                    t.x = "object" == typeof r ? r.clientX + document.body.scrollLeft - this.offset().left : "number" == typeof r ? r * a / t.opt.maxval : t.opt.initialval * a / t.opt.maxval, t.y = "object" == typeof r ? r.clientY + document.body.scrollTop - this.offset().top : "number" == typeof r ? (t.opt.maxval - t.opt.initialval - r) * o / t.opt.maxval : t.opt.initialval * o / t.opt.maxval, t.y = this.outerHeight() - t.y, t.scaleX = t.x * t.opt.maxval / a, t.scaleY = t.y * t.opt.maxval / o, t.outOfRangeX = t.scaleX > t.opt.maxval ? t.scaleX - t.opt.maxval : 0 > t.scaleX ? t.scaleX : 0, t.outOfRangeY = t.scaleY > t.opt.maxval ? t.scaleY - t.opt.maxval : 0 > t.scaleY ? t.scaleY : 0, t.outOfRange = "h" === t.opt.orientation ? t.outOfRangeX : t.outOfRangeY, t.value = void 0 !== r ? "h" === t.opt.orientation ? t.x >= this.outerWidth() ? t.opt.maxval : 0 >= t.x ? 0 : t.scaleX : t.y >= this.outerHeight() ? t.opt.maxval : 0 >= t.y ? 0 : t.scaleY : "h" === t.opt.orientation ? t.scaleX : t.scaleY, "h" === t.opt.orientation ? t.level.width(Math.floor(100 * t.x / a) + "%") : t.level.height(Math.floor(100 * t.y / o)), t.lastVal === t.value && ("h" === t.opt.orientation && (t.x >= this.outerWidth() || 0 >= t.x) || "h" !== t.opt.orientation && (t.y >= this.outerHeight() || 0 >= t.y)) || ("function" == typeof t.opt.callback && t.opt.callback(t), t.lastVal = t.value)
                }
            }
        }, e.fn.simpleSlider = e.simpleSlider.init, e.fn.updateSliderVal = e.simpleSlider.updateSliderVal
    }(jQuery),
    function(e) {
        e.mbCookie = {
            set: function(e, r, t, a) {
                "object" == typeof r && (r = JSON.stringify(r)), a = a ? "; domain=" + a : "";
                var o = new Date,
                    n = "";
                0 < t && (o.setTime(o.getTime() + 864e5 * t), n = "; expires=" + o.toGMTString()), document.cookie = e + "=" + r + n + "; path=/" + a
            },
            get: function(e) {
                e += "=";
                for (var r = document.cookie.split(";"), t = 0; t < r.length; t++) {
                    for (var a = r[t];
                        " " == a.charAt(0);) a = a.substring(1, a.length);
                    if (0 == a.indexOf(e)) try {
                        return JSON.parse(a.substring(e.length, a.length))
                    } catch (r) {
                        return a.substring(e.length, a.length)
                    }
                }
                return null
            },
            remove: function(r) {
                e.mbCookie.set(r, "", -1)
            }
        }, e.mbStorage = {
            set: function(e, r) {
                "object" == typeof r && (r = JSON.stringify(r)), localStorage.setItem(e, r)
            },
            get: function(e) {
                if (!localStorage[e]) return null;
                try {
                    return JSON.parse(localStorage[e])
                } catch (r) {
                    return localStorage[e]
                }
            },
            remove: function(e) {
                e ? localStorage.removeItem(e) : localStorage.clear()
            }
        }
    }(jQuery);
var nAgt = navigator.userAgent;

function isTouchSupported() {
    var e = nAgt.msMaxTouchPoints,
        r = "ontouchstart" in document.createElement("div");
    return !(!e && !r)
}
jQuery.mbBrowser = {}, jQuery.mbBrowser.mozilla = !1, jQuery.mbBrowser.webkit = !1, jQuery.mbBrowser.opera = !1, jQuery.mbBrowser.safari = !1, jQuery.mbBrowser.chrome = !1, jQuery.mbBrowser.androidStock = !1, jQuery.mbBrowser.msie = !1, jQuery.mbBrowser.edge = !1, jQuery.mbBrowser.ua = nAgt;
var getOS = function() {
        var e = {
            version: "Unknown version",
            name: "Unknown OS"
        };
        return -1 != navigator.appVersion.indexOf("Win") && (e.name = "Windows"), -1 != navigator.appVersion.indexOf("Mac") && 0 > navigator.appVersion.indexOf("Mobile") && (e.name = "Mac"), -1 != navigator.appVersion.indexOf("Linux") && (e.name = "Linux"), /Mac OS X/.test(nAgt) && !/Mobile/.test(nAgt) && (e.version = /Mac OS X ([\._\d]+)/.exec(nAgt)[1], e.version = e.version.replace(/_/g, ".").substring(0, 5)), /Windows/.test(nAgt) && (e.version = "Unknown.Unknown"), /Windows NT 5.1/.test(nAgt) && (e.version = "5.1"), /Windows NT 6.0/.test(nAgt) && (e.version = "6.0"), /Windows NT 6.1/.test(nAgt) && (e.version = "6.1"), /Windows NT 6.2/.test(nAgt) && (e.version = "6.2"), /Windows NT 10.0/.test(nAgt) && (e.version = "10.0"), /Linux/.test(nAgt) && /Linux/.test(nAgt) && (e.version = "Unknown.Unknown"), e.name = e.name.toLowerCase(), e.major_version = "Unknown", e.minor_version = "Unknown", "Unknown.Unknown" != e.version && (e.major_version = parseFloat(e.version.split(".")[0]), e.minor_version = parseFloat(e.version.split(".")[1])), e
    },
    nameOffset, verOffset, ix;
if (jQuery.mbBrowser.os = getOS(), jQuery.mbBrowser.hasTouch = isTouchSupported(), jQuery.mbBrowser.name = navigator.appName, jQuery.mbBrowser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.mbBrowser.majorVersion = parseInt(navigator.appVersion, 10), -1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.mbBrowser.opera = !0, jQuery.mbBrowser.name = "Opera", jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 8));
else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.mbBrowser.opera = !0, jQuery.mbBrowser.name = "Opera", jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 4);
else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.mbBrowser.msie = !0, jQuery.mbBrowser.name = "Microsoft Internet Explorer", jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 5);
else if (-1 != nAgt.indexOf("Trident")) {
    jQuery.mbBrowser.msie = !0, jQuery.mbBrowser.name = "Microsoft Internet Explorer";
    var start = nAgt.indexOf("rv:") + 3,
        end = start + 4;
    jQuery.mbBrowser.fullVersion = nAgt.substring(start, end)
} else -1 != (verOffset = nAgt.indexOf("Edge")) ? (jQuery.mbBrowser.edge = !0, jQuery.mbBrowser.name = "Microsoft Edge", jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 5)) : -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.mbBrowser.webkit = !0, jQuery.mbBrowser.chrome = !0, jQuery.mbBrowser.name = "Chrome", jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 7)) : -1 < nAgt.indexOf("mozilla/5.0") && -1 < nAgt.indexOf("android ") && -1 < nAgt.indexOf("applewebkit") && !(-1 < nAgt.indexOf("chrome")) ? (verOffset = nAgt.indexOf("Chrome"), jQuery.mbBrowser.webkit = !0, jQuery.mbBrowser.androidStock = !0, jQuery.mbBrowser.name = "androidStock", jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.mbBrowser.webkit = !0, jQuery.mbBrowser.safari = !0, jQuery.mbBrowser.name = "Safari", jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.mbBrowser.webkit = !0, jQuery.mbBrowser.safari = !0, jQuery.mbBrowser.name = "Safari", jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.mbBrowser.mozilla = !0, jQuery.mbBrowser.name = "Firefox", jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.mbBrowser.name = nAgt.substring(nameOffset, verOffset), jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 1), jQuery.mbBrowser.name.toLowerCase() == jQuery.mbBrowser.name.toUpperCase() && (jQuery.mbBrowser.name = navigator.appName)); - 1 != (ix = jQuery.mbBrowser.fullVersion.indexOf(";")) && (jQuery.mbBrowser.fullVersion = jQuery.mbBrowser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.mbBrowser.fullVersion.indexOf(" ")) && (jQuery.mbBrowser.fullVersion = jQuery.mbBrowser.fullVersion.substring(0, ix)), jQuery.mbBrowser.majorVersion = parseInt("" + jQuery.mbBrowser.fullVersion, 10), isNaN(jQuery.mbBrowser.majorVersion) && (jQuery.mbBrowser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.mbBrowser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.mbBrowser.version = jQuery.mbBrowser.majorVersion, jQuery.mbBrowser.android = /Android/i.test(nAgt), jQuery.mbBrowser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.mbBrowser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.mbBrowser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.mbBrowser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.mbBrowser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.mbBrowser.mobile = jQuery.mbBrowser.android || jQuery.mbBrowser.blackberry || jQuery.mbBrowser.ios || jQuery.mbBrowser.windowsMobile || jQuery.mbBrowser.operaMobile || jQuery.mbBrowser.kindle, jQuery.isMobile = jQuery.mbBrowser.mobile, jQuery.isTablet = jQuery.mbBrowser.mobile && 765 < jQuery(window).width(), jQuery.isAndroidDefault = jQuery.mbBrowser.android && !/chrome/i.test(nAgt), jQuery.mbBrowser = jQuery.mbBrowser, jQuery.mbBrowser.versionCompare = function(e, r) {
    if ("stringstring" != typeof e + typeof r) return !1;
    for (var t = e.split("."), a = r.split("."), o = 0, n = Math.max(t.length, a.length); o < n; o++) {
        if (t[o] && !a[o] && 0 < parseInt(t[o]) || parseInt(t[o]) > parseInt(a[o])) return 1;
        if (a[o] && !t[o] && 0 < parseInt(a[o]) || parseInt(t[o]) < parseInt(a[o])) return -1
    }
    return 0
};