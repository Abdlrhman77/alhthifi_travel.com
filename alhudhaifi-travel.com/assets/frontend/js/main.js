! function(a) {
    "use strict";
    a(document).ready(function() {
        if ($(".bgvdoplayer").length > 0) {
            $(".bgvdoplayer").YTPlayer();
        }
        var t = a("html").attr("dir"),
            e = void 0 !== t && "ltr" !== t;
        a(window).width() < 992 && (a(document).on("click", ".navbar-area .navbar-nav li.menu-item-has-mega-menu>a", function(a) {
            a.preventDefault()
        }), a(document).on("click", ".navbar-area .navbar-nav li.menu-item-has-children>a", function(a) {
            a.preventDefault()
        })), (new WOW).init(), a(".video-play-btn,.video-popup,.small-vide-play-btn,.video-play,.mfp-video-init").magnificPopup({
            type: "video"
        }), a(".image-popup").magnificPopup({
            type: "image",
            gallery: {
                enabled: !0
            }
        }), a(document).on("click", ".back-to-top", function() {
            a("html,body").animate({
                scrollTop: 0
            }, 2e3)
        });
        var n = a(".count-num");
        n.length > 1 && n.rCounter();
        var i = a(".case-studies-masonry");
        i.length > 0 && (a(".case-studies-masonry").imagesLoaded(function() {
            var t = i.isotope({
                itemSelector: ".masonry-item",
                masonry: {
                    gutter: 0
                }
            });
            a(document).on("click", ".case-studies-menu li", function() {
                var e = a(this).attr("data-filter");
                t.isotope({
                    filter: e
                })
            })
        }), a(document).on("click", ".case-studies-menu li", function() {
            a(this).siblings().removeClass("active"), a(this).addClass("active")
        }));
        var o = a(".global-carousel-init");
        o.length > 0 && a.each(o, function() {
            var t = a(this),
                n = t.children("div"),
                i = !!t.data("loop") && t.data("loop"),
                o = !!t.data("center") && t.data("center"),
                d = t.data("desktopitem") ? t.data("desktopitem") : 1,
                s = t.data("mobileitem") ? t.data("mobileitem") : 1,
                l = t.data("tabletitem") ? t.data("tabletitem") : 1,
                c = !!t.data("nav") && t.data("nav"),
                r = !!t.data("dots") && t.data("dots"),
                u = !!t.data("autoplay") && t.data("autoplay"),
                m = t.data("navcontainer") ? t.data("navcontainer") : "",
                v = t.data("stagepadding") ? t.data("stagepadding") : 0,
                p = t.data("margin") ? t.data("margin") : 0;
            n.length < 2 || t.owlCarousel({
                loop: i,
                autoplay: u,
                autoPlayTimeout: 5000,
                smartSpeed: 2000,
                margin: p,
                dots: r,
                center: o,
                nav: c,
                rtl: e,
                navContainer: m,
                stagePadding: v,
                navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
                responsive: {
                    0: {
                        items: 1,
                        nav: !1,
                        stagePadding: 0
                    },
                    460: {
                        items: s,
                        nav: !1,
                        stagePadding: 0
                    },
                    599: {
                        items: s,
                        nav: !1,
                        stagePadding: 0
                    },
                    768: {
                        items: l,
                        nav: !1,
                        stagePadding: 0
                    },
                    960: {
                        items: l,
                        nav: !1,
                        stagePadding: 0
                    },
                    1200: {
                        items: d
                    },
                    1920: {
                        items: d
                    }
                }
            })
        });
        $(document).on('click', '.user-dashboard-wrapper > ul .mobile_nav', function(e) {
            $(this).parent().toggleClass('show');
        });
        var d = a("#body-overlay"),
            s = a("#search-popup");
        a(document).on("click", "#body-overlay,.search-popup-close-btn", function(a) {
            a.preventDefault(), d.removeClass("active"), s.removeClass("show")
        }), a(document).on("click", "#search", function(a) {
            a.preventDefault(), s.addClass("show"), d.addClass("active")
        })
    }), a(window).on("scroll", function() {
        var t = a(".back-to-top");
        a(window).scrollTop() > 1e3 ? t.fadeIn(1e3) : t.fadeOut(1e3)
    }), a(window).on("load", function() {
        a("#preloader").fadeOut(1e3), a(".back-to-top").fadeOut();
    })
}(jQuery);