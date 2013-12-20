/**
 * bootstrap.js v3.0.0 by @fat and @mdo
 * Copyright 2013 Twitter Inc.
 * http://www.apache.org/licenses/LICENSE-2.0
 */
if (!jQuery) throw new Error("Bootstrap requires jQuery"); + function (a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            }
    }
    a.fn.emulateTransitionEnd = function (b) {
        var c = !1,
            d = this;
        a(this).one(a.support.transition.end, function () {
            c = !0
        });
        var e = function () {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function () {
        a.support.transition = b()
    })
}(window.jQuery), + function (a) {
    "use strict";
    var b = function (b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, b.prototype.cycle = function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, b.prototype.getActiveIndex = function () {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, b.prototype.to = function (b) {
        var c = this,
            d = this.getActiveIndex();
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid", function () {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }, b.prototype.pause = function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, b.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, b.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, b.prototype.slide = function (b, c) {
        var d = this.$element.find(".item.active"),
            e = c || d[b](),
            f = this.interval,
            g = "next" == b ? "left" : "right",
            h = "next" == b ? "first" : "last",
            i = this;
        if (!e.length) {
            if (!this.options.wrap) return;
            e = this.$element.find(".item")[h]()
        }
        this.sliding = !0, f && this.pause();
        var j = a.Event("slide.bs.carousel", {
            relatedTarget: e[0],
            direction: g
        });
        if (!e.hasClass("active")) {
            if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () {
                var b = a(i.$indicators.children()[i.getActiveIndex()]);
                b && b.addClass("active")
            })), a.support.transition && this.$element.hasClass("slide")) {
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one(a.support.transition.end, function () {
                    e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function () {
                        i.$element.trigger("slid")
                    }, 0)
                }).emulateTransitionEnd(600)
            } else {
                if (this.$element.trigger(j), j.isDefaultPrevented()) return;
                d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return f && this.cycle(), this
        }
    };
    var c = a.fn.carousel;
    a.fn.carousel = function (c) {
        return this.each(function () {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, b.DEFAULTS, d.data(), "object" == typeof c && c),
                g = "string" == typeof c ? c : f.slide;
            e || d.data("bs.carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = c, this
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function (b) {
        var c, d = a(this),
            e = a(d.attr("data-target") || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")),
            f = a.extend({}, e.data(), d.data()),
            g = d.attr("data-slide-to");
        g && (f.interval = !1), e.carousel(f), (g = d.attr("data-slide-to")) && e.data("bs.carousel").to(g), b.preventDefault()
    }), a(window).on("load", function () {
        a('[data-ride="carousel"]').each(function () {
            var b = a(this);
            b.carousel(b.data())
        })
    })
}(window.jQuery);
/*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2012 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */
(function (k) {
    k.transit = {
        version: "0.9.9",
        propertyMap: {
            marginLeft: "margin",
            marginRight: "margin",
            marginBottom: "margin",
            marginTop: "margin",
            paddingLeft: "padding",
            paddingRight: "padding",
            paddingBottom: "padding",
            paddingTop: "padding"
        },
        enabled: true,
        useTransitionEnd: false
    };
    var d = document.createElement("div");
    var q = {};

    function b(v) {
        if (v in d.style) {
            return v
        }
        var u = ["Moz", "Webkit", "O", "ms"];
        var r = v.charAt(0).toUpperCase() + v.substr(1);
        if (v in d.style) {
            return v
        }
        for (var t = 0; t < u.length; ++t) {
            var s = u[t] + r;
            if (s in d.style) {
                return s
            }
        }
    }

    function e() {
        d.style[q.transform] = "";
        d.style[q.transform] = "rotateY(90deg)";
        return d.style[q.transform] !== ""
    }
    var a = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    q.transition = b("transition");
    q.transitionDelay = b("transitionDelay");
    q.transform = b("transform");
    q.transformOrigin = b("transformOrigin");
    q.transform3d = e();
    var i = {
        transition: "transitionEnd",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
        msTransition: "MSTransitionEnd"
    };
    var f = q.transitionEnd = i[q.transition] || null;
    for (var p in q) {
        if (q.hasOwnProperty(p) && typeof k.support[p] === "undefined") {
            k.support[p] = q[p]
        }
    }
    d = null;
    k.cssEase = {
        _default: "ease",
        "in": "ease-in",
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
    k.cssHooks["transit:transform"] = {
        get: function (r) {
            return k(r).data("transform") || new j()
        },
        set: function (s, r) {
            var t = r;
            if (!(t instanceof j)) {
                t = new j(t)
            }
            if (q.transform === "WebkitTransform" && !a) {
                s.style[q.transform] = t.toString(true)
            } else {
                s.style[q.transform] = t.toString()
            }
            k(s).data("transform", t)
        }
    };
    k.cssHooks.transform = {
        set: k.cssHooks["transit:transform"].set
    };
    if (k.fn.jquery < "1.8") {
        k.cssHooks.transformOrigin = {
            get: function (r) {
                return r.style[q.transformOrigin]
            },
            set: function (r, s) {
                r.style[q.transformOrigin] = s
            }
        };
        k.cssHooks.transition = {
            get: function (r) {
                return r.style[q.transition]
            },
            set: function (r, s) {
                r.style[q.transition] = s
            }
        }
    }
    n("scale");
    n("translate");
    n("rotate");
    n("rotateX");
    n("rotateY");
    n("rotate3d");
    n("perspective");
    n("skewX");
    n("skewY");
    n("x", true);
    n("y", true);

    function j(r) {
        if (typeof r === "string") {
            this.parse(r)
        }
        return this
    }
    j.prototype = {
        setFromString: function (t, s) {
            var r = (typeof s === "string") ? s.split(",") : (s.constructor === Array) ? s : [s];
            r.unshift(t);
            j.prototype.set.apply(this, r)
        },
        set: function (s) {
            var r = Array.prototype.slice.apply(arguments, [1]);
            if (this.setter[s]) {
                this.setter[s].apply(this, r)
            } else {
                this[s] = r.join(",")
            }
        },
        get: function (r) {
            if (this.getter[r]) {
                return this.getter[r].apply(this)
            } else {
                return this[r] || 0
            }
        },
        setter: {
            rotate: function (r) {
                this.rotate = o(r, "deg")
            },
            rotateX: function (r) {
                this.rotateX = o(r, "deg")
            },
            rotateY: function (r) {
                this.rotateY = o(r, "deg")
            },
            scale: function (r, s) {
                if (s === undefined) {
                    s = r
                }
                this.scale = r + "," + s
            },
            skewX: function (r) {
                this.skewX = o(r, "deg")
            },
            skewY: function (r) {
                this.skewY = o(r, "deg")
            },
            perspective: function (r) {
                this.perspective = o(r, "px")
            },
            x: function (r) {
                this.set("translate", r, null)
            },
            y: function (r) {
                this.set("translate", null, r)
            },
            translate: function (r, s) {
                if (this._translateX === undefined) {
                    this._translateX = 0
                }
                if (this._translateY === undefined) {
                    this._translateY = 0
                }
                if (r !== null && r !== undefined) {
                    this._translateX = o(r, "px")
                }
                if (s !== null && s !== undefined) {
                    this._translateY = o(s, "px")
                }
                this.translate = this._translateX + "," + this._translateY
            }
        },
        getter: {
            x: function () {
                return this._translateX || 0
            },
            y: function () {
                return this._translateY || 0
            },
            scale: function () {
                var r = (this.scale || "1,1").split(",");
                if (r[0]) {
                    r[0] = parseFloat(r[0])
                }
                if (r[1]) {
                    r[1] = parseFloat(r[1])
                }
                return (r[0] === r[1]) ? r[0] : r
            },
            rotate3d: function () {
                var t = (this.rotate3d || "0,0,0,0deg").split(",");
                for (var r = 0; r <= 3; ++r) {
                    if (t[r]) {
                        t[r] = parseFloat(t[r])
                    }
                }
                if (t[3]) {
                    t[3] = o(t[3], "deg")
                }
                return t
            }
        },
        parse: function (s) {
            var r = this;
            s.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function (t, v, u) {
                r.setFromString(v, u)
            })
        },
        toString: function (t) {
            var s = [];
            for (var r in this) {
                if (this.hasOwnProperty(r)) {
                    if ((!q.transform3d) && ((r === "rotateX") || (r === "rotateY") || (r === "perspective") || (r === "transformOrigin"))) {
                        continue
                    }
                    if (r[0] !== "_") {
                        if (t && (r === "scale")) {
                            s.push(r + "3d(" + this[r] + ",1)")
                        } else {
                            if (t && (r === "translate")) {
                                s.push(r + "3d(" + this[r] + ",0)")
                            } else {
                                s.push(r + "(" + this[r] + ")")
                            }
                        }
                    }
                }
            }
            return s.join(" ")
        }
    };

    function m(s, r, t) {
        if (r === true) {
            s.queue(t)
        } else {
            if (r) {
                s.queue(r, t)
            } else {
                t()
            }
        }
    }

    function h(s) {
        var r = [];
        k.each(s, function (t) {
            t = k.camelCase(t);
            t = k.transit.propertyMap[t] || k.cssProps[t] || t;
            t = c(t);
            if (k.inArray(t, r) === -1) {
                r.push(t)
            }
        });
        return r
    }

    function g(s, v, x, r) {
        var t = h(s);
        if (k.cssEase[x]) {
            x = k.cssEase[x]
        }
        var w = "" + l(v) + " " + x;
        if (parseInt(r, 10) > 0) {
            w += " " + l(r)
        }
        var u = [];
        k.each(t, function (z, y) {
            u.push(y + " " + w)
        });
        return u.join(", ")
    }
    k.fn.transition = k.fn.transit = function (z, s, y, C) {
        var D = this;
        var u = 0;
        var w = true;
        if (typeof s === "function") {
            C = s;
            s = undefined
        }
        if (typeof y === "function") {
            C = y;
            y = undefined
        }
        if (typeof z.easing !== "undefined") {
            y = z.easing;
            delete z.easing
        }
        if (typeof z.duration !== "undefined") {
            s = z.duration;
            delete z.duration
        }
        if (typeof z.complete !== "undefined") {
            C = z.complete;
            delete z.complete
        }
        if (typeof z.queue !== "undefined") {
            w = z.queue;
            delete z.queue
        }
        if (typeof z.delay !== "undefined") {
            u = z.delay;
            delete z.delay
        }
        if (typeof s === "undefined") {
            s = k.fx.speeds._default
        }
        if (typeof y === "undefined") {
            y = k.cssEase._default
        }
        s = l(s);
        var E = g(z, s, y, u);
        var B = k.transit.enabled && q.transition;
        var t = B ? (parseInt(s, 10) + parseInt(u, 10)) : 0;
        if (t === 0) {
            var A = function (F) {
                D.css(z);
                if (C) {
                    C.apply(D)
                }
                if (F) {
                    F()
                }
            };
            m(D, w, A);
            return D
        }
        var x = {};
        var r = function (H) {
            var G = false;
            var F = function () {
                if (G) {
                    D.unbind(f, F)
                }
                if (t > 0) {
                    D.each(function () {
                        this.style[q.transition] = (x[this] || null)
                    })
                }
                if (typeof C === "function") {
                    C.apply(D)
                }
                if (typeof H === "function") {
                    H()
                }
            };
            if ((t > 0) && (f) && (k.transit.useTransitionEnd)) {
                G = true;
                D.bind(f, F)
            } else {
                window.setTimeout(F, t)
            }
            D.each(function () {
                if (t > 0) {
                    this.style[q.transition] = E
                }
                k(this).css(z)
            })
        };
        var v = function (F) {
            this.offsetWidth;
            r(F)
        };
        m(D, w, v);
        return this
    };

    function n(s, r) {
        if (!r) {
            k.cssNumber[s] = true
        }
        k.transit.propertyMap[s] = q.transform;
        k.cssHooks[s] = {
            get: function (v) {
                var u = k(v).css("transit:transform");
                return u.get(s)
            },
            set: function (v, w) {
                var u = k(v).css("transit:transform");
                u.setFromString(s, w);
                k(v).css({
                    "transit:transform": u
                })
            }
        }
    }

    function c(r) {
        return r.replace(/([A-Z])/g, function (s) {
            return "-" + s.toLowerCase()
        })
    }

    function o(s, r) {
        if ((typeof s === "string") && (!s.match(/^[\-0-9\.]+$/))) {
            return s
        } else {
            return "" + s + r
        }
    }

    function l(s) {
        var r = s;
        if (k.fx.speeds[r]) {
            r = k.fx.speeds[r]
        }
        return o(r, "ms")
    }
    k.transit.getTransitionValue = g
})(jQuery); // Generated by CoffeeScript 1.6.2
/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function () {
    var t = [].indexOf || function (t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t) return e
            }
            return -1
        }, e = [].slice;
    (function (t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function (n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(this, function (n, r) {
            var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
            i = n(r);
            c = t.call(r, "ontouchstart") >= 0;
            s = {
                horizontal: {},
                vertical: {}
            };
            f = 1;
            a = {};
            u = "waypoints-context-id";
            p = "resize.waypoints";
            y = "scroll.waypoints";
            v = 1;
            w = "waypoints-waypoint-ids";
            g = "waypoint";
            m = "waypoints";
            o = function () {
                function t(t) {
                    var e = this;
                    this.$element = t;
                    this.element = t[0];
                    this.didResize = false;
                    this.didScroll = false;
                    this.id = "context" + f++;
                    this.oldScroll = {
                        x: t.scrollLeft(),
                        y: t.scrollTop()
                    };
                    this.waypoints = {
                        horizontal: {},
                        vertical: {}
                    };
                    t.data(u, this.id);
                    a[this.id] = this;
                    t.bind(y, function () {
                        var t;
                        if (!(e.didScroll || c)) {
                            e.didScroll = true;
                            t = function () {
                                e.doScroll();
                                return e.didScroll = false
                            };
                            return r.setTimeout(t, n[m].settings.scrollThrottle)
                        }
                    });
                    t.bind(p, function () {
                        var t;
                        if (!e.didResize) {
                            e.didResize = true;
                            t = function () {
                                n[m]("refresh");
                                return e.didResize = false
                            };
                            return r.setTimeout(t, n[m].settings.resizeThrottle)
                        }
                    })
                }
                t.prototype.doScroll = function () {
                    var t, e = this;
                    t = {
                        horizontal: {
                            newScroll: this.$element.scrollLeft(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left"
                        },
                        vertical: {
                            newScroll: this.$element.scrollTop(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up"
                        }
                    };
                    if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                        n[m]("refresh")
                    }
                    n.each(t, function (t, r) {
                        var i, o, l;
                        l = [];
                        o = r.newScroll > r.oldScroll;
                        i = o ? r.forward : r.backward;
                        n.each(e.waypoints[t], function (t, e) {
                            var n, i;
                            if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                                return l.push(e)
                            } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                                return l.push(e)
                            }
                        });
                        l.sort(function (t, e) {
                            return t.offset - e.offset
                        });
                        if (!o) {
                            l.reverse()
                        }
                        return n.each(l, function (t, e) {
                            if (e.options.continuous || t === l.length - 1) {
                                return e.trigger([i])
                            }
                        })
                    });
                    return this.oldScroll = {
                        x: t.horizontal.newScroll,
                        y: t.vertical.newScroll
                    }
                };
                t.prototype.refresh = function () {
                    var t, e, r, i = this;
                    r = n.isWindow(this.element);
                    e = this.$element.offset();
                    this.doScroll();
                    t = {
                        horizontal: {
                            contextOffset: r ? 0 : e.left,
                            contextScroll: r ? 0 : this.oldScroll.x,
                            contextDimension: this.$element.width(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left",
                            offsetProp: "left"
                        },
                        vertical: {
                            contextOffset: r ? 0 : e.top,
                            contextScroll: r ? 0 : this.oldScroll.y,
                            contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up",
                            offsetProp: "top"
                        }
                    };
                    return n.each(t, function (t, e) {
                        return n.each(i.waypoints[t], function (t, r) {
                            var i, o, l, s, f;
                            i = r.options.offset;
                            l = r.offset;
                            o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                            if (n.isFunction(i)) {
                                i = i.apply(r.element)
                            } else if (typeof i === "string") {
                                i = parseFloat(i);
                                if (r.options.offset.indexOf("%") > -1) {
                                    i = Math.ceil(e.contextDimension * i / 100)
                                }
                            }
                            r.offset = o - e.contextOffset + e.contextScroll - i;
                            if (r.options.onlyOnScroll && l != null || !r.enabled) {
                                return
                            }
                            if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                                return r.trigger([e.backward])
                            } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                                return r.trigger([e.forward])
                            } else if (l === null && e.oldScroll >= r.offset) {
                                return r.trigger([e.forward])
                            }
                        })
                    })
                };
                t.prototype.checkEmpty = function () {
                    if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                        this.$element.unbind([p, y].join(" "));
                        return delete a[this.id]
                    }
                };
                return t
            }();
            l = function () {
                function t(t, e, r) {
                    var i, o;
                    r = n.extend({}, n.fn[g].defaults, r);
                    if (r.offset === "bottom-in-view") {
                        r.offset = function () {
                            var t;
                            t = n[m]("viewportHeight");
                            if (!n.isWindow(e.element)) {
                                t = e.$element.height()
                            }
                            return t - n(this).outerHeight()
                        }
                    }
                    this.$element = t;
                    this.element = t[0];
                    this.axis = r.horizontal ? "horizontal" : "vertical";
                    this.callback = r.handler;
                    this.context = e;
                    this.enabled = r.enabled;
                    this.id = "waypoints" + v++;
                    this.offset = null;
                    this.options = r;
                    e.waypoints[this.axis][this.id] = this;
                    s[this.axis][this.id] = this;
                    i = (o = t.data(w)) != null ? o : [];
                    i.push(this.id);
                    t.data(w, i)
                }
                t.prototype.trigger = function (t) {
                    if (!this.enabled) {
                        return
                    }
                    if (this.callback != null) {
                        this.callback.apply(this.element, t)
                    }
                    if (this.options.triggerOnce) {
                        return this.destroy()
                    }
                };
                t.prototype.disable = function () {
                    return this.enabled = false
                };
                t.prototype.enable = function () {
                    this.context.refresh();
                    return this.enabled = true
                };
                t.prototype.destroy = function () {
                    delete s[this.axis][this.id];
                    delete this.context.waypoints[this.axis][this.id];
                    return this.context.checkEmpty()
                };
                t.getWaypointsByElement = function (t) {
                    var e, r;
                    r = n(t).data(w);
                    if (!r) {
                        return []
                    }
                    e = n.extend({}, s.horizontal, s.vertical);
                    return n.map(r, function (t) {
                        return e[t]
                    })
                };
                return t
            }();
            d = {
                init: function (t, e) {
                    var r;
                    if (e == null) {
                        e = {}
                    }
                    if ((r = e.handler) == null) {
                        e.handler = t
                    }
                    this.each(function () {
                        var t, r, i, s;
                        t = n(this);
                        i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                        if (!n.isWindow(i)) {
                            i = t.closest(i)
                        }
                        i = n(i);
                        r = a[i.data(u)];
                        if (!r) {
                            r = new o(i)
                        }
                        return new l(t, r, e)
                    });
                    n[m]("refresh");
                    return this
                },
                disable: function () {
                    return d._invoke(this, "disable")
                },
                enable: function () {
                    return d._invoke(this, "enable")
                },
                destroy: function () {
                    return d._invoke(this, "destroy")
                },
                prev: function (t, e) {
                    return d._traverse.call(this, t, e, function (t, e, n) {
                        if (e > 0) {
                            return t.push(n[e - 1])
                        }
                    })
                },
                next: function (t, e) {
                    return d._traverse.call(this, t, e, function (t, e, n) {
                        if (e < n.length - 1) {
                            return t.push(n[e + 1])
                        }
                    })
                },
                _traverse: function (t, e, i) {
                    var o, l;
                    if (t == null) {
                        t = "vertical"
                    }
                    if (e == null) {
                        e = r
                    }
                    l = h.aggregate(e);
                    o = [];
                    this.each(function () {
                        var e;
                        e = n.inArray(this, l[t]);
                        return i(o, e, l[t])
                    });
                    return this.pushStack(o)
                },
                _invoke: function (t, e) {
                    t.each(function () {
                        var t;
                        t = l.getWaypointsByElement(this);
                        return n.each(t, function (t, n) {
                            n[e]();
                            return true
                        })
                    });
                    return this
                }
            };
            n.fn[g] = function () {
                var t, r;
                r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
                if (d[r]) {
                    return d[r].apply(this, t)
                } else if (n.isFunction(r)) {
                    return d.init.apply(this, arguments)
                } else if (n.isPlainObject(r)) {
                    return d.init.apply(this, [null, r])
                } else if (!r) {
                    return n.error("jQuery Waypoints needs a callback function or handler option.")
                } else {
                    return n.error("The " + r + " method does not exist in jQuery Waypoints.")
                }
            };
            n.fn[g].defaults = {
                context: r,
                continuous: true,
                enabled: true,
                horizontal: false,
                offset: 0,
                triggerOnce: false
            };
            h = {
                refresh: function () {
                    return n.each(a, function (t, e) {
                        return e.refresh()
                    })
                },
                viewportHeight: function () {
                    var t;
                    return (t = r.innerHeight) != null ? t : i.height()
                },
                aggregate: function (t) {
                    var e, r, i;
                    e = s;
                    if (t) {
                        e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
                    }
                    if (!e) {
                        return []
                    }
                    r = {
                        horizontal: [],
                        vertical: []
                    };
                    n.each(r, function (t, i) {
                        n.each(e[t], function (t, e) {
                            return i.push(e)
                        });
                        i.sort(function (t, e) {
                            return t.offset - e.offset
                        });
                        r[t] = n.map(i, function (t) {
                            return t.element
                        });
                        return r[t] = n.unique(r[t])
                    });
                    return r
                },
                above: function (t) {
                    if (t == null) {
                        t = r
                    }
                    return h._filter(t, "vertical", function (t, e) {
                        return e.offset <= t.oldScroll.y
                    })
                },
                below: function (t) {
                    if (t == null) {
                        t = r
                    }
                    return h._filter(t, "vertical", function (t, e) {
                        return e.offset > t.oldScroll.y
                    })
                },
                left: function (t) {
                    if (t == null) {
                        t = r
                    }
                    return h._filter(t, "horizontal", function (t, e) {
                        return e.offset <= t.oldScroll.x
                    })
                },
                right: function (t) {
                    if (t == null) {
                        t = r
                    }
                    return h._filter(t, "horizontal", function (t, e) {
                        return e.offset > t.oldScroll.x
                    })
                },
                enable: function () {
                    return h._invoke("enable")
                },
                disable: function () {
                    return h._invoke("disable")
                },
                destroy: function () {
                    return h._invoke("destroy")
                },
                extendFn: function (t, e) {
                    return d[t] = e
                },
                _invoke: function (t) {
                    var e;
                    e = n.extend({}, s.vertical, s.horizontal);
                    return n.each(e, function (e, n) {
                        n[t]();
                        return true
                    })
                },
                _filter: function (t, e, r) {
                    var i, o;
                    i = a[n(t).data(u)];
                    if (!i) {
                        return []
                    }
                    o = [];
                    n.each(i.waypoints[e], function (t, e) {
                        if (r(i, e)) {
                            return o.push(e)
                        }
                    });
                    o.sort(function (t, e) {
                        return t.offset - e.offset
                    });
                    return n.map(o, function (t) {
                        return t.element
                    })
                }
            };
            n[m] = function () {
                var t, n;
                n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
                if (h[n]) {
                    return h[n].apply(null, t)
                } else {
                    return h.aggregate.call(null, n)
                }
            };
            n[m].settings = {
                resizeThrottle: 100,
                scrollThrottle: 30
            };
            return i.load(function () {
                return n[m]("refresh")
            })
        })
}).call(this); // Generated by CoffeeScript 1.6.2
/*
Sticky Elements Shortcut for jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
(function () {
    (function (t, n) {
        if (typeof define === "function" && define.amd) {
            return define(["jquery", "waypoints"], n)
        } else {
            return n(t.jQuery)
        }
    })(this, function (t) {
        var n, s;
        n = {
            wrapper: '<div class="sticky-wrapper" />',
            stuckClass: "stuck"
        };
        s = function (t, n) {
            t.wrap(n.wrapper);
            return t.parent()
        };
        t.waypoints("extendFn", "sticky", function (e) {
            var i, r, a;
            r = t.extend({}, t.fn.waypoint.defaults, n, e);
            i = s(this, r);
            a = r.handler;
            r.handler = function (n) {
                var s, e;
                s = t(this).children(":first");
                e = n === "down" || n === "right";
                s.toggleClass(r.stuckClass, e);
                i.height(e ? s.outerHeight() : "");
                if (a != null) {
                    return a.call(this, n)
                }
            };
            i.waypoint(r);
            return this.data("stuckClass", r.stuckClass)
        });
        return t.waypoints("extendFn", "unsticky", function () {
            this.parent().waypoint("destroy");
            this.unwrap();
            return this.removeClass(this.data("stuckClass"))
        })
    })
}).call(this);
jQuery.easing.jswing = jQuery.easing.swing;
(function () {
    var A = function (a, j) {
        return function () {
            return a.apply(j, arguments)
        }
    }, l = function () {
            this.itemIconsAnimationDidEnd = A(this.itemIconsAnimationDidEnd, this);
            this.animateItemIcons = A(this.animateItemIcons, this)
        };
    l.prototype.initialize = function () {
        this.itemAnimationEl = $(".item-animation");
        this.projectsEl = this.itemAnimationEl.find(".projects");
        this.itemsEl = this.itemAnimationEl.find(".item-icons-container");
        this.itemsSpacerEl = $(".item-icons-spacer");
        this.infoEl = this.itemAnimationEl.find(".item-animation-projects");
        this.h1El = $("h1");
        this.itemAnimationEl.waypoint(this.animateItemIcons, {
            offset: 0
        });
        $(".navbar-scrapd").waypoint("sticky");
        this.indexItemIcons();
        this.animateH1();
        return this
    };
    l.prototype.indexItemIcons = function () {
        var a, j, p, d, g;
        this.itemIcons = {};
        d = this.catNames = "email calendar convos link idea photo thought graph".split(" ");
        g = [];
        j = 0;
        for (p = d.length; j < p; j++) a = d[j], g.push(this.itemIcons[a] = this.itemAnimationEl.find(".item-icon-" + a));
        return g
    };
    l.prototype.animateH1 = function () {
        var a, j, p, d, g, m, q, n, y, u, l,
            v, h, s, t, b, k, c, e, f, w, x, r;
        c = !1;
        $(".carousel").carousel("pause");
        k = 100 / 1.1;
        this.h1El.empty();
        f = "ORGANIZE EMAILS";
        x = f.split("");
        r = $("<span>" + f + "</span>").appendTo(this.h1El);
        y = $('<span class="animated-caret">').appendTo(this.h1El);
        w = $("<span>").appendTo(this.h1El);
        n = null;
        a = function (a) {
            clearInterval(n);
            return a ? n = setInterval(function () {
                return y.css("visibility", "visible" === y.css("visibility") ? "hidden" : "visible")
            }, 600) : y.css("visibility", "visible")
        };
        this.finishH1Animation = function () {
            c = !0;
            r.text("YOU ARE CREATIVE");
            w.text("");
            return a(!0)
        };
        b = f.length - 1;
        e = 0;
        a(!0);
        setTimeout(function () {
            a(!1);
            return j()
        }, 1E3);
        j = function () {
            if (!c) {
                r.text(f.substring(0, b + 1));
                if (0 > b) return u();
                b--;
                return setTimeout(j, 100 / 1.2)
            }
        };
        u = function () {
            if (!c) return f = "HASHTAG EMAILS", x = f.split(""), b = 0, a(!0), setTimeout(function () {
                a(!1);
                e = 3;
                return p()
            }, 2E3)
        };
        p = function () {
            if (!c) {
                r.text(r.text() + x[b]);
                if (b >= x.length - 1) return l();
                b++;
                return setTimeout(p, 200)
            }
        };
        l = function () {
            if (!c) return a(!0), setTimeout(function () {
                a(!1);
                e = 0;
                return d()
            }, 3E3)
        };
        d = function () {
            if (!c) {
                r.text(f.substring(0,
                    b + 1));
                w.text(f.substring(b + 1));
                if (b === e) return v();
                b--;
                return setTimeout(d, k)
            }
        };
        v = function () {
            if (!c) return a(!0), f = "#HASHTAG EMAILS", x = f.split(""), setTimeout(function () {
                a(!1);
                e = 0;
                return g()
            }, 400)
        };
        g = function () {
            if (!c) {
                r.text(f.substring(0, b + 1));
                w.text(f.substring(e + 1));
                if (b === e) return h();
                b++;
                return setTimeout(g, 200)
            }
        };
        h = function () {
            if (!c) return a(!0), setTimeout(function () {
                a(!1);
                e = 14;
                return t()
            }, 1E3)
        };
        return t = function () {
            if (!c) return a(!0), setTimeout(function () {
                $(".carousel").carousel("cycle");
                r.text(f);
                return w.text("")
            }, 400)
        }
    };
    l.prototype.animateItemIcons = function (a) {
        var j, p, d, g, m, q, n, l, u, z, v, h, s, t, b, k, c, e;
        $("html").hasClass("csstransitions") || this.finishH1Animation();
        if (this.animating) return this.queuedItemIconsAnimation = a;
        if (a !== this.lastItemIconsAnimation) {
            this.lastItemIconsAnimation = a;
            if ("down" === a) {
                this.itemsEl.transition({
                    y: -380
                }, 1600);
                this.infoEl.transition({
                    y: -380
                }, 1600);
                setTimeout(this.itemIconsAnimationDidEnd, 2100);
                this.animating = !0;
                u = [];
                e = this.projectsEl.find(".project");
                k = 0;
                for (c = e.length; k < c; k++) q = e[k], d = $(q), !1 !== d.is(":visible") && (a = {
                    cats: -1,
                    items: {},
                    offset: d.offset(),
                    size: {
                        width: d.width(),
                        height: d.height()
                    },
                    itemTopOffset: 0,
                    skip: this.catNames[Math.floor(Math.random() *
                        (this.catNames.length - 1))]
                }, a.offset.top += 8, u.push(a));
                k = this.itemIcons;
                c = [];
                for (g in k) n = k[g], a = $(n[0]), a.css("transform", null), j = a.width(), p = a.height(), c.push(function () {
                    var a, c, e;
                    e = [];
                    a = 0;
                    for (c = n.length; a < c; a++) {
                        q = n[a];
                        d.css("transform", null);
                        d = $(q);
                        z = function () {
                            return u[Math.floor(Math.random() * u.length)]
                        };
                        h = z();
                        for (b = 0; h.skip === g && 20 > b;) b++, h = z();
                        l = d.offset();
                        m = Math.floor(800 * Math.random()) + 400;
                        h.skip === g || (0.7 * j + 10) * ((h.items[g] || 0) + 1) >= h.size.width ? d.transition({
                                x: 0,
                                y: 0,
                                scale: 0.1,
                                opacity: 0
                            },
                            m / 2, "cubic-bezier(0.250, 0.250, 0.015, 1.005)") : (h.items[g] || (h.items[g] = 0, h.itemTopOffset += 0.7 * p + 20), s = h.offset.left - l.left + (0.7 * j + 10) * h.items[g], t = h.offset.top - l.top + h.itemTopOffset - 0.7 * p - 20, v = 1.5 * Math.random() + 1, d.transition({
                            x: s / 2,
                            y: t / 2,
                            scale: v,
                            delay: Math.floor(800 * Math.random())
                        }, m / 2, "in").transition({
                            x: s,
                            y: t,
                            scale: 0.7
                        }, m / 2, "cubic-bezier(0.250, 0.250, 0.015, 1.005)"), e.push(h.items[g]++))
                    }
                    return e
                }());
                return c
            }
            this.itemsEl.transition({
                y: 0
            }, 1400);
            this.infoEl.transition({
                y: 0
            }, 1400);
            setTimeout(this.itemIconsAnimationDidEnd,
                2E3);
            this.animating = !0;
            a = this.itemIcons;
            k = [];
            for (g in a) n = a[g], k.push(function () {
                var a, b, c;
                c = [];
                a = 0;
                for (b = n.length; a < b; a++) q = n[a], d = $(q), t = s = 0, m = Math.floor(800 * Math.random()) + 400, v = 2 * Math.random() + 1, c.push(d.transition({
                    x: d.css("x") / 2,
                    y: d.css("y") / 2,
                    scale: v,
                    opacity: 1,
                    delay: Math.floor(800 * Math.random())
                }, m / 1.5, "in").transition({
                    x: s,
                    y: t,
                    scale: 1
                }, m / 2, "cubic-bezier(0.250, 0.250, 0.015, 1.005)"));
                return c
            }());
            return k
        }
    };
    l.prototype.itemIconsAnimationDidEnd = function () {
        this.animating = !1;
        if (this.queuedItemIconsAnimation) return this.animateItemIcons(this.queuedItemIconsAnimation),
        this.queuedItemIconsAnimation = !1
    };
    $(document).ready(function () {
        $(".carousel").carousel();
        $("html").hasClass("csstransitions") || (jQuery.extend(jQuery.easing, {
            "in": jQuery.easing.easeInQuad,
            "cubic-bezier(0.250, 0.250, 0.015, 1.005)": jQuery.easing.easeOutQuad
        }), $.fn.transition = $.fn.animate);
        return window.scrapdLanding = (new l).initialize()
    })
}).call(this);






