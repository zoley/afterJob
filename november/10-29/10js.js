"use strict";

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

try {
    !function() {
        var t;
        window._SF_ && window._SF_._global_ && window._SF_._global_._ssp ? (t = window._SF_._global_._ssp, 
        t.DUP_4_SF = !0, t.destroy = function() {}) : t = window._ssp_global = window._ssp_global || {};
        var e = {
            global: t,
            proxyName: !1,
            basePath: "https://cpro.baidustatic.com/cpro/ui/dup/"
        };
        !function() {
            var i = {
                name: "oojs",
                namespace: "",
                classes: {},
                noop: function() {},
                $oojs: function() {
                    var i = {};
                    if ("undefined" != typeof window && window && "undefined" != typeof document && document ? (this.runtime = "browser", 
                    i.global = window) : (this.runtime = "node", i.global = t), i.proxyName = "proxy", 
                    i.path = "node" === this.runtime ? process.cwd() + "/src/" : "/src/", void 0 !== e) for (var n in e) n && e.hasOwnProperty(n) && (i[n] = e[n]);
                    this.global = i.global, i.proxyName && (Function.prototype[i.proxyName] = this.proxy), 
                    this.setPath(i.path), this.global.oojs = this.global.oojs || this;
                },
                path: {},
                pathCache: {},
                getPath: function(t) {
                    var e = !!t && t.split("."), i = this.path;
                    if (e) for (var n = 0, o = e.length; o > n; n++) {
                        var s = e[n].toLowerCase();
                        if (!i[s]) break;
                        i = i[s];
                    }
                    return i.pathValue;
                },
                setPath: function(t, e) {
                    var i = this.path;
                    if ("object" != (void 0 === t ? "undefined" : _typeof(t))) {
                        if (e) for (var n = t.split("."), o = 0, s = n.length; s > o; o++) {
                            var r = n[o].toLowerCase();
                            i[r] = i[r] || {
                                pathValue: i.pathValue
                            }, i = i[r];
                        } else e = t;
                        i.pathValue = e, this.pathCache = {};
                    } else for (var a in t) a && t.hasOwnProperty(a) && this.setPath(a, t[a]);
                },
                getClassPath: function(t) {
                    if (!this.pathCache[t]) {
                        this.pathCache[t] = this.getPath(t) + t.replace(/\./gi, "/") + ".js";
                        var e = this.getPath(t), i = e.length - 1;
                        e.lastIndexOf("\\") !== i && e.lastIndexOf("/") !== i && (e += "/"), this.pathCache[t] = e + t.replace(/\./gi, "/") + ".js";
                    }
                    return this.pathCache[t];
                },
                loadDeps: function(t, e) {
                    e = e || {};
                    var i = t.__deps, n = (t.__namespace, []);
                    for (var o in i) if (i.hasOwnProperty(o) && i[o]) {
                        var s;
                        if ("string" != typeof i[o] ? (t[o] = i[o], t[o] && t[o].__name && (s = t[o].__full)) : (s = i[o], 
                        t[o] = this.find(s)), !s || e[s]) continue;
                        if (e[s] = !0, t[o]) t[o].__deps && (n = n.concat(this.loadDeps(t[o], e))); else {
                            if ("node" === this.runtime) try {
                                t[o] = require(this.getClassPath(s));
                            } catch (t) {
                                n.push(s);
                            }
                            t[o] || n.push(s);
                        }
                    }
                    return n;
                },
                fastClone: function(t) {
                    var e = function() {};
                    return e.prototype = t, new e();
                },
                deepClone: function(t, e) {
                    "number" != typeof e && (e = 10);
                    var i, n = e - 1;
                    if (e > 0) if (t instanceof Date) i = new Date(), i.setTime(t.getTime()); else if (t instanceof Array) {
                        i = [];
                        for (var o = 0, s = t.length; s > o; o++) i[o] = this.deepClone(t[o], n);
                    } else if ("object" == (void 0 === t ? "undefined" : _typeof(t))) {
                        i = {};
                        for (var r in t) if (t.hasOwnProperty(r)) {
                            var a = t[r];
                            i[r] = this.deepClone(a, n);
                        }
                    } else i = t; else i = t;
                    return i;
                },
                proxy: function(t, e) {
                    var i = Array.prototype.slice.apply(arguments), n = i.shift(), o = "function" == typeof this ? this : i.shift();
                    return function() {
                        var t = Array.prototype.slice.apply(arguments);
                        return o.apply(n, t.concat(i));
                    };
                },
                find: function(t) {
                    var e, i = t.split(".");
                    e = this.classes[i[0]];
                    for (var n = 1, o = i.length; o > n; n++) {
                        if (!e || !e[i[n]]) {
                            e = null;
                            break;
                        }
                        e = e[i[n]];
                    }
                    return e;
                },
                reload: function(t) {
                    var e = this.find(t);
                    if (e) if (e.__registed = !1, "node" === this.runtime) {
                        var i = this.getClassPath(t);
                        delete require.cache[require.resolve(i)], e = require(i);
                    } else e = this.define(e); else e = this.using(t);
                    return e;
                },
                create: function(t, e, i, n, o, s) {
                    return "string" == typeof t && (t = this.using(t)), new t.__constructor(e, i, n, o, s);
                },
                using: function(t) {
                    var e = this.find(t);
                    return e || "node" === this.runtime && (require(this.getClassPath(t)), e = this.find(t)), 
                    e;
                },
                define: function(t) {
                    var e = t.name || "__tempName", i = t.namespace || "";
                    t.__name = e, t.__namespace = i, t.__full = i.length > 1 ? i + "." + e : e, t.__deps = t.deps, 
                    t.__oojs = this, t.__constructor = function(t, e, i, n, o) {
                        if (this.__clones && this.__clones.length > 0) for (var s = 0, r = this.__clones.length; r > s; s++) {
                            var a = this.__clones[s];
                            this[a] = this.__oojs.deepClone(this[a]);
                        }
                        this.__constructorSource(t, e, i, n, o);
                    }, t.__constructorSource = t[e] || this.noop, t.__staticSource = t["$" + e] || this.noop, 
                    t.__staticUpdate = function() {
                        var e = [];
                        for (var i in this) if (this.hasOwnProperty(i)) {
                            var n = this[i];
                            "object" != (void 0 === n ? "undefined" : _typeof(n)) || null === n || "deps" === i || 0 === i.indexOf("__") || t.__deps && t.__deps[i] || e.push(i);
                        }
                        this.__clones = e, this.__constructor.prototype = this;
                    }, t.__static = function() {
                        this.__staticSource(), this.__staticUpdate();
                    };
                    for (var n, o = !1, s = !1, r = i.split("."), a = r.length, d = this.classes, l = 0; a > l; l++) (n = r[l]) && (d[n] = d[n] || {}, 
                    d = d[n]);
                    d[e] = d[e] || {};
                    var c = d;
                    if (d = d[e], d.__name && d.__registed) {
                        if (d.__registed) {
                            o = !0;
                            for (var h in t) h && t.hasOwnProperty(h) && (void 0 === d[h] || d[h] === this.noop) && (s = !0, 
                            d[h] = t[h]);
                        }
                    } else t.__registed = !0, c[e] = t;
                    if (t = c[e], !o || s) {
                        var p = this.loadDeps(t);
                        if (p.length > 0) {
                            if (this.loader = this.loader || this.using("oojs.loader"), "browser" !== this.runtime || !this.loader) throw new Error('class "' + t.name + '" loadDeps error:' + p.join(","));
                            this.loader.loadDepsBrowser(t, p);
                        } else t.__static();
                    }
                    return "node" === this.runtime && arguments.callee.caller.arguments[2] && (arguments.callee.caller.arguments[2].exports = t), 
                    t;
                }
            };
            i.define(i);
        }();
        var i = t.oojs, n = new Date().getTime();
        i.setPath("https://dup.baidustatic.com/"), i.define({
            name: "bottomSearchBar",
            namespace: "dup.ui.assertion",
            deps: {},
            painterName: "bottomSearchBar",
            assert: function(t) {
                var e = t.placement, i = (e.basic, e.container), n = e.fillstyle;
                return !(3 != i.anchoredType || !i.slide || 9 != n.btnStyleId);
            }
        }), i.define({
            name: "baiduRec",
            namespace: "dup.ui.assertion",
            deps: {},
            painterName: "baiduRec",
            assert: function(t) {
                var e = t.placement, i = e.basic, n = e.container;
                return 3 === i.rspFormat && 1 === i.flowType && 1 === n.anchoredType;
            }
        }), i.define({
            name: "inlayFix",
            namespace: "dup.ui.assertion",
            deps: {},
            painterName: "inlayFix",
            assert: function(t) {
                var e = t.placement, i = e.basic, n = e.container, o = n.floated;
                return 1 === i.rspFormat && 1 === i.flowType && 1 === n.anchoredType && (!o || (1 === o.trigger || !this.isFloat(o)));
            },
            isFloat: function(t) {
                for (var e in t) return !0;
                return !1;
            }
        }), i.define({
            name: "insideText",
            namespace: "dup.ui.assertion",
            deps: {},
            painterName: "insideText",
            assert: function(t) {
                var e = t.placement, i = e.basic, n = e.container;
                return 3 === i.rspFormat && 1 === i.flowType && 8 === n.occurrence && 11 === n.anchoredType;
            }
        }), i.define({
            name: "dynamicFloat",
            namespace: "dup.ui.assertion",
            deps: {},
            painterName: "dynamicFloat",
            assert: function(t) {
                var e = t.placement, i = e.basic, n = e.container, o = n.floated;
                return !(1 !== i.rspFormat || 1 !== i.flowType || 1 !== n.anchoredType || !o || 8 !== o.trigger);
            }
        }), i.define({
            name: "float",
            namespace: "dup.ui.assertion",
            deps: {},
            painterName: "float",
            assert: function(t) {
                var e = t.placement, i = e.basic, n = e.container;
                return 1 === i.rspFormat && 1 === i.flowType && n.anchoredType, !1;
            }
        }), i.define({
            name: "inlayFix",
            namespace: "dup.ui.assertion.mobile",
            deps: {},
            painterName: "inlayFix",
            assert: function(t) {
                var e = t.placement, i = e.basic, n = e.container;
                return 1 === i.rspFormat && 2 === i.flowType && 1 === n.anchoredType;
            }
        }), i.define({
            name: "float",
            namespace: "dup.ui.assertion.mobile",
            painterName: "float",
            assert: function(t) {
                var e = t.placement, i = e.basic, n = e.container;
                return 1 === i.rspFormat && 2 === i.flowType && (3 === n.anchoredType || 11 === n.anchoredType);
            }
        }), i.define({
            name: "config",
            namespace: "dup.common",
            DUP_PREFIX: "BAIDU_SSP_",
            HTTP_PROTOCOL: "http:",
            LOADER_DEFINE_NAME: "___adblockplus",
            LCR_COOKIE_NAME: "BAIDU_SSP_lcr",
            REQUEST_URL: "//pos.baidu.com/",
            POS_URL: "",
            ISPDB_DELIV: !1,
            DUP_TM: "BAIDU_DUP_SETJSONADSLOT",
            HTML_POST: "HTML_POST",
            SSP_JSONP: "SSP_JSONP",
            STATIC_JSONP: "STATIC_JSONP",
            LOG_URL: "//eclick.baidu.com/se.jpg",
            SBD_LOG: "//eclick.baidu.com/aoc.jpg",
            CACHE_URL: "//pos.baidu.com/bfp/snippetcacher.php?",
            STORAGE_TIMER: 864e5,
            STATUS_CREATE: 1,
            STATUS_REQUEST: 2,
            STATUS_RESPONSE: 4,
            STATUS_RENDERED: 8,
            STATUS_FINISH: 16,
            EXP_SWITCH: !1,
            EXP_SATUS: !1,
            BASE_ID: "110001",
            EXP_ID: "",
            RD_ID: "110002",
            SHUNT_NUMBER: 500,
            IS_PREVIEW: !1,
            FIRST_ONCESEACH: !1,
            AD_ICON: "https://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.0/bd-logo08.png",
            $config: function() {
                this.HTTP_PROTOCOL = "https:" === document.location.protocol ? "https:" : "http:", 
                0 !== location.protocol.indexOf("http") && (this.HTTP_PROTOCOL = "https:");
            }
        }), i.define({
            name: "lang",
            namespace: "dup.common.utility",
            hasOwn: Object.prototype.hasOwnProperty,
            getAttribute: function(t, e) {
                for (var i = t, n = e.split("."); n.length; ) {
                    if (void 0 === i || null === i) return;
                    i = i[n.shift()];
                }
                return i;
            },
            serialize: function(t) {
                if ("object" != (void 0 === t ? "undefined" : _typeof(t))) return "";
                var e = [];
                for (var i in t) this.hasOwn.call(t, i) && e.push(i + "=" + encodeURIComponent(t[i]));
                return e.join("&");
            },
            getType: function(t) {
                for (var e = {}, i = "Array Boolean Date Error Function Number RegExp String".split(" "), n = 0, o = i.length; o > n; n++) e["[object " + i[n] + "]"] = i[n].toLowerCase();
                return null == t ? "null" : e[Object.prototype.toString.call(t)] || "object";
            },
            isEmptyObj: function(t) {
                for (var e in t) return !1;
                return !0;
            },
            argumentsToArray: function(t) {
                var e = [];
                switch (this.getType(t)) {
                  case "object":
                    e = Array.prototype.slice.call(t);
                    break;

                  case "array":
                    e = t;
                    break;

                  case "number":
                  case "string":
                    e.push(t);
                }
                return e;
            },
            template: function(t, e) {
                var i = /{(.*?)}/g;
                return t.replace(i, function(t, i, n, o) {
                    return e[i] || "";
                });
            },
            encodeHTML: function(t) {
                var e = {
                    '"': "&quot;",
                    ">": "&gt;",
                    "<": "&lt;",
                    "&": "&amp;"
                };
                return t.replace(/[\"<>\&]/g, function(t) {
                    return e[t];
                });
            },
            format: function(t, e) {
                var i = /\{(\w+)\:(\w+)\}/g, n = this;
                return t.replace(i, function(t, i, o) {
                    var s = e[i];
                    switch (o) {
                      case "number":
                        s = +s || 0;
                        break;

                      case "boolean":
                        s = !!s;
                        break;

                      case "html":
                        s = n.encodeHTML(s);
                    }
                    return s;
                });
            },
            jsonToObj: function(t) {
                var e = "";
                return window.JSON && window.JSON.parse && (e = window.JSON.parse(t)), e;
            },
            objToString: function(t) {
                var e = "";
                try {
                    e = window.JSON && window.JSON.stringify ? window.JSON.stringify(t) : window.eval(t);
                } catch (t) {}
                return e;
            },
            trim: function(t) {
                return t.replace(/(^\s*)|(\s*$)/g, "");
            },
            unique: function(t) {
                for (var e = [], i = {}, n = t.length, o = 0; n > o; o++) {
                    var s = t[o];
                    i[s] || (e[e.length] = s, i[s] = !0);
                }
                return e;
            },
            isArray: function(t) {
                return "[object Array]" == Object.prototype.toString.call(t);
            },
            isFunction: function(t) {
                return "[object Function]" == Object.prototype.toString.call(t);
            },
            toArray: function(t) {
                if (null === t || void 0 === t) return [];
                if (this.isArray(t)) return t;
                if ("number" != typeof t.length || "string" == typeof t || this.isFunction(t)) return [ t ];
                if (t.item) {
                    for (var e = t.length, i = new Array(e); e--; ) i[e] = t[e];
                    return i;
                }
                return [].slice.call(t);
            },
            encode: function(t) {
                return void 0 === t ? "" : encodeURIComponent(t);
            },
            encodeUrl: function(t) {
                var e = escape(t);
                return e = e.replace(/([*+-.\/@_])/g, function(t) {
                    return "%" + t.charCodeAt(0).toString(16);
                }), e.replace(/%/g, "_");
            },
            isPlain: function(t) {
                var e, i = Object.prototype.hasOwnProperty;
                if (!(t && "[object Object]" === Object.prototype.toString.call(t) && "isPrototypeOf" in t)) return !1;
                if (t.constructor && !i.call(t, "constructor") && !i.call(t.constructor.prototype, "isPrototypeOf")) return !1;
                for (e in t) ;
                return void 0 === e || i.call(t, e);
            },
            clone: function(t) {
                var e, i, n = t;
                if (!t || t instanceof Number || t instanceof String || t instanceof Boolean) return n;
                if (this.isArray(t)) {
                    n = [];
                    var o = 0;
                    for (e = 0, i = t.length; i > e; e++) n[o++] = this.clone(t[e]);
                } else if (this.isPlain(t)) {
                    n = {};
                    for (e in t) t.hasOwnProperty(e) && (n[e] = this.clone(t[e]));
                }
                return n;
            }
        }), i.define({
            name: "browser",
            namespace: "dup.common.utility",
            deps: {
                lang: "dup.common.utility.lang"
            },
            $browser: function() {
                this.win = window, this.nav = window.navigator, this.checkBrowser();
            },
            checkBrowser: function() {
                var t = navigator.userAgent, e = window.RegExp;
                this.antBrowser = !1, /msie (\d+\.\d)/i.test(t) && (this.ie = document.documentMode || +e.$1), 
                /opera\/(\d+\.\d)/i.test(t) && (this.opera = +e.$1), /firefox\/(\d+\.\d)/i.test(t) && (this.firefox = +e.$1), 
                /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(t) && !/chrome/i.test(t) && (this.safari = +(e.$1 || e.$2)), 
                /chrome\/(\d+\.\d)/i.test(t) && (this.chrome = +e.$1, this.test360() && (this.qihoo = !0)), 
                /qqbrowser\/(\d+\.\d)/i.test(t) && (this.tencent = !0), (/ucbrowser\/(\d+\.\d)/i.test(t) || /ubrowser\/(\d+\.\d)/i.test(t)) && (this.uc = !0), 
                /miuibrowser\/(\d+\.\d)/i.test(t) && (this.xiaomi = !0), /vivobrowser\/(\d+\.\d)/i.test(t) && (this.vivo = !0), 
                /oppobrowser\/(\d+\.\d)/i.test(t) && (this.oppo = !0), /baiduboxapp\/([\d.]+)/.test(t) && (this.baiduboxapp = !0);
                try {
                    /(\d+\.\d)/.test(this.lang.getAttribute(window, "external.max_version")) && (this.maxthon = +e.$1);
                } catch (t) {}
                (this.tencent || this.uc || this.xiaomi || this.vivo || this.oppo) && (this.antBrowser = !0), 
                this.isWebkit = /webkit/i.test(t), this.isGecko = /gecko/i.test(t) && !/like gecko/i.test(t);
                for (var i = [ "Android", "iPad", "Phone", "iOS", "iPod", "Linux", "Macintosh", "Windows" ], n = "", o = 0; o < i.length; o++) {
                    if ("iPad" === (n = i[o]) || "iPhone" === n || "iOS" === n || "iPod" === n) {
                        this.isIOS = !0;
                        break;
                    }
                    if ("Android" === n) {
                        this.isAndroid = !0;
                        break;
                    }
                    if (t.match(new RegExp(n.toLowerCase(), "i"))) break;
                }
                this.platform = n;
            },
            test360: function() {
                try {
                    return "scoped" in document.createElement("style");
                } catch (t) {
                    return !1;
                }
            },
            getFlashPlayerVersion: function() {
                var t = 0;
                try {
                    var e = "https:" === location.protocol;
                    if (this.chrome >= 45 || e) return 0;
                    if (this.nav.plugins && this.nav.mimeTypes.length) {
                        var i = this.nav.plugins["Shockwave Flash"];
                        i && i.description && (t = i.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0");
                    }
                    if (0 === t && (this.win.ActiveXObject || this.win.hasOwnProperty("ActiveXObject"))) for (var n = 30; n >= 2; n--) try {
                        var o = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + n);
                        if (o) {
                            var s = o.GetVariable("$version");
                            if ((t = s.replace(/WIN/g, "").replace(/,/g, ".")) > 0) break;
                        }
                    } catch (t) {}
                    t = parseInt(t, 10), this.getFlashPlayerVersion = function() {
                        return t;
                    };
                } catch (e) {
                    t = 0;
                }
                return t;
            }
        }), i.define({
            name: "cookie",
            namespace: "dup.common.utility",
            deps: {
                lang: "dup.common.utility.lang"
            },
            get: function(t, e) {
                var i = new RegExp("(^| )" + t + "=([^;]*)(;|$)"), n = i.exec(document.cookie);
                return n ? e ? decodeURIComponent(n[2]) : n[2] : "";
            },
            set: function(t, e, i, n) {
                var o = i.expires;
                document.cookie = t + "=" + (n ? encodeURIComponent(e) : e) + (i.path ? "; path=" + i.path : "") + (o ? "; expires=" + o.toGMTString() : "") + (i.domain ? "; domain=" + i.domain : "");
            },
            remove: function(t) {
                var e = new Date();
                e.setTime(e.getTime() - 86400), this.set(t, "", {
                    path: "/",
                    expires: e
                });
            }
        }), i.define({
            name: "additionalParam",
            namespace: "dup.business.parameter",
            deps: {},
            paramsList: [],
            ParamsMap: {
                clid: {
                    key: "apdi",
                    encode: !0
                },
                cuid: {
                    key: "udi",
                    encode: !0
                },
                ctkey: {
                    key: "lcdi",
                    encode: !0
                },
                acid: {
                    key: "acid",
                    encode: !0
                }
            },
            paramCheck: function(t, e) {
                this.paramsList = [];
                for (var i in e) if (i && e.hasOwnProperty(i) && this.ParamsMap[i]) {
                    var n = this.ParamsMap[i], o = {};
                    try {
                        n.key && (o.key = n.key, o.value = this.paramEncode(n, e[i])), n && !n.key && (o.key = i, 
                        o.value = this.paramEncode(n, e[i])), this.paramsList.push(o);
                    } catch (t) {}
                }
            },
            paramEncode: function(t, e) {
                return t.encode ? encodeURIComponent(e) : e;
            }
        }), i.define({
            name: "requestCache",
            namespace: "dup.business",
            deps: {
                config: "dup.common.config"
            },
            slotInfoMap: {},
            secondResult: {},
            add: function(t, e) {
                this.slotInfoMap[t] = e;
            },
            get: function(t) {
                return this.slotInfoMap[t];
            },
            cacheRequest: function(t, e) {
                if (!t || this.secondResult[t]) return !1;
                this.secondResult[t] = e;
                var i = this.get(t), n = this.config.CACHE_URL + "dpv=" + t + "&di=" + i.slotId;
                this.loadScript(n);
            },
            loadScript: function(t) {
                var e = document.createElement("script");
                e.charset = "utf-8", e.async = !0, e.src = t;
                var i = document.getElementsByTagName("head")[0] || document.body;
                i.insertBefore(e, i.firstChild);
            }
        }), i.define({
            name: "storage",
            namespace: "dup.common.utility",
            store: null,
            isAvailable: !1,
            $storage: function() {
                try {
                    this.store = window.localStorage, this.store && this.store.removeItem && (this.isAvailable = !0);
                } catch (t) {}
            },
            available: function() {
                var t = !1;
                return this.store && this.store.removeItem && (t = !0), t;
            },
            setItem: function(t, e, i) {
                if (this.store) {
                    e = i ? encodeURIComponent(e) : e;
                    try {
                        this.store.setItem(t, e);
                    } catch (t) {}
                }
            },
            getItem: function(t, e) {
                if (this.store) {
                    var i = this.store.getItem(t);
                    return e && i ? decodeURIComponent(i) : i;
                }
                return null;
            },
            addItem: function(t, e, i) {
                if (this.store) {
                    e = i ? encodeURIComponent(e) : e;
                    var n = this.getItem(t) || "";
                    n += (n && "|") + e;
                    try {
                        this.setItem(t, n);
                    } catch (t) {}
                }
            },
            removeItem: function(t) {
                this.store && this.store.removeItem(t);
            },
            spliceItem: function(t, e, i) {
                if (this.store) {
                    e = i ? encodeURIComponent(e) : e;
                    var n = this.getItem(t) || "";
                    if (n = n.replace(new RegExp(e + "\\|?", "g"), "").replace(/\|$/, "")) try {
                        this.setItem(t, n);
                    } catch (t) {} else this.store.removeItem(t);
                }
            }
        }), i.define({
            name: "loader",
            namespace: "dup.common",
            deps: {
                config: "dup.common.config"
            },
            $loader: function() {
                this.loadingCls = this.loadingCls || {};
            },
            load: function(t, e, n) {
                var o = i.getClassPath(e);
                if (!this.check(o)) {
                    var s = document.createElement("script");
                    s.type = "text/javascript", s.async = !0, s.src = o;
                    var r = i.proxy(this, this.onLoadStatusHandler, t, s);
                    s.onload = s.onerror = s.onreadystatechange = r;
                    var a = document.getElementsByTagName("script")[0];
                    a.parentNode.insertBefore(s, a), this.loadingCls[t] = n;
                }
            },
            check: function() {
                for (var t in this.loadingCls) if (this.loadingCls.hasOwnProperty(t) && !0 === this.loadingCls[t]) return !0;
                return !1;
            },
            onLoadStatusHandler: function(t, e, i) {
                var e, i;
                3 === arguments.length ? (e = arguments[1], i = arguments[2]) : (e = arguments[0], 
                i = arguments[1]);
                var n = this.loadingCls[e];
                i && /loaded|complete|undefined/.test(i.readyState) && (i.onload = i.onerror = i.onreadystatechange = null, 
                i = void 0, n && n());
            }
        }), i.define({
            name: "float",
            namespace: "dup.ui.assertion.mobile",
            painterName: "float",
            assert: function(t) {
                var e = t.placement, i = e.basic, n = e.container;
                return 1 === i.rspFormat && 2 === i.flowType && (3 === n.anchoredType || 11 === n.anchoredType);
            }
        }), i.define({
            name: "dynamicFloat",
            namespace: "dup.ui.assertion",
            deps: {},
            painterName: "dynamicFloat",
            assert: function(t) {
                var e = t.placement, i = e.basic, n = e.container, o = n.floated;
                return !(1 !== i.rspFormat || 1 !== i.flowType || 1 !== n.anchoredType || !o || 8 !== o.trigger);
            }
        }), i.define({
            name: "interface",
            namespace: "dup.business",
            deps: {
                lang: "dup.common.utility.lang"
            },
            apiMap: {},
            $Interface: function() {},
            register: function(t, e, n) {
                this.apiMap[t] = i.proxy(e, n);
            },
            executeTask: function(t) {
                for (var e in t) {
                    var i = t[e];
                    if ("array" === this.lang.getType(i) && ("id" !== e || "container" !== e || "size" !== e || "async" !== e)) {
                        var n = this.apiMap[e];
                        if (n) return n.apply(null, i);
                    }
                }
            },
            perform: function(t, e) {
                var i = this.apiMap[t];
                return i ? i.apply(null, e) : void 0;
            }
        }), i.define({
            name: "expBranch",
            namespace: "dup.business",
            deps: {
                config: "dup.common.config"
            },
            tactics: function() {
                var t = 1e3 - this.config.SHUNT_NUMBER, e = 1e9 * Math.random();
                e < 1e6 * this.config.SHUNT_NUMBER ? (this.config.EXP_SATUS = !0, this.config.EXP_ID = this.config.RD_ID) : e >= 1e6 * t && (this.config.EXP_ID = this.config.BASE_ID);
            }
        }), i.define({
            name: "material",
            namespace: "dup.business",
            deps: {
                lang: "dup.common.utility.lang",
                config: "dup.common.config"
            },
            $material: function() {
                var t = this;
                this.materialFactory = {}, this.materialFactory.text = function(e) {
                    var i = '<span style="word-wrap:break-word;"><a href="{clickUrl:string}" target="{target:string}" style="font-size:{size:number}{unit:string};color:{defaultColor:string};font-weight:{defaultBold:string};font-style:{defaultItalic:string};text-decoration:{defaultUnderline:string};"{events}>{text:string}</a></span>', n = /\{events\}/;
                    if (1 === e.version) i = i.replace(n, ""); else if (2 === e.version) {
                        i = i.replace(n, " onmouseover=\"this.style.color='{hoverColor:string}';this.style.fontWeight='{hoverBold:string}';this.style.fontStyle='{hoverItalic:string}';this.style.textDecoration='{hoverUnderline:string}';\" onmouseout=\"this.style.color='{defaultColor:string}';this.style.fontWeight='{defaultBold:string}';this.style.fontStyle='{defaultItalic:string}';this.style.textDecoration='{defaultUnderline:string}';\"");
                        for (var o = [ "default", "hover" ], s = 0; s < o.length; s++) {
                            var r = o[s], a = r + "Color", d = r + "Bold", l = r + "Italic", c = r + "Underline";
                            e[a] = "#" + e[a], e[d] = e[d] ? "bold" : "normal", e[l] = e[l] ? "italic" : "normal", 
                            e[c] = e[c] ? "underline" : "none";
                        }
                    }
                    return t.lang.format(i, e);
                }, this.materialFactory.image = '<a href="{clickUrl:string}" target="{target:string}"><img src="{src:string}" title="{title:html}" alt="{title:html}" border="0" height="{height:number}" width="{width:number}" /></a>', 
                this.materialFactory.flash = function(e) {
                    var i = [ "<script>", "var BD = BD || {};", "BD.MC = BD.MC || {};", "BD.MC.ADFlash = BD.MC.ADFlash || {};", "BD.MC.ADImg = BD.MC.ADImg || {};", "BD.MC.ADFlash.w = {width:number};", "BD.MC.ADFlash.h = {height:number};", 'BD.MC.ADFlash.mu = "{src:string}";', 'BD.MC.ADFlash.cu = "{clickUrl:string}";', "BD.MC.ADFlash.wm = {wmode:number};", 'BD.MC.ADFlash.ct = "{clickTag:string}";', "BD.MC.ADImg.w = {imageWidth:number};", "BD.MC.ADImg.h = {imageHeight:number};", 'BD.MC.ADImg.mu = "{imageSrc:string}";', 'BD.MC.ADImg.cu = "{imageClickUrl:string}";', 'BD.MC.ADImg.tw = "{target:string}";', "BD.MC.ADImg.flag = {backupImage:number};", "<\/script>", '<script src ="', '//cbjs.baidu.com/js/{file:string}.js">', "<\/script>" ];
                    return e.file = e.hasLink ? "cflash" : "flash", e.imageClickUrl = e.clickUrl, e.hasLink || (e.clickUrl = ""), 
                    t.lang.format(i.join(""), e);
                }, this.materialFactory.rich = function(t) {
                    return t.content;
                }, this.materialFactory.slide = function(e, i) {
                    for (var n = [], o = e.materials, s = 0; s < o.length; s++) {
                        var r = o[s];
                        "string" != typeof r && (r = t.formatMaterial(r, i, !0)), n.push(r);
                    }
                    e.html = "<div>" + n.join("</div><div>") + "</div>";
                    var a = i.response.placement, d = a.container;
                    return e.width = i.width || d.width, e.height = i.height || d.height, t.lang.format('<div id="bd_ec_clb_asp" style="width:{width:number}px;height:{height:number}px;overflow:hidden;">{html:string}</div><script>(function(){var d = document;function G(id) { return d.getElementById(id); };var container = G("bd_ec_clb_asp");var pages = container.childNodes;var pl = 0;for (var i = 0; i < pages.length; i++) {if (pages[i].nodeType === 1) {pl++;}}var cp = 0;function showPage(pn) { pages[pn].style.display = ""; };function hidePages() {for (var i = 0; i < pl; i++) {pages[i].style.display = "none";}};function roll() {hidePages();showPage(cp);cp == (pages.length - 1) ? cp = 0 : cp++;};var autoRoll;function setRoll() { autoRoll = window.setInterval(function() { roll(); }, {interval:number});};roll();setRoll();container.onmouseover = function() { window.clearInterval(autoRoll); };container.onmouseout = function() {setRoll(); };})();<\/script>', e);
                };
            },
            formatMaterial: function(t, e, i) {
                if ("string" == typeof t) return t;
                if (!t.type) return "";
                var n = this.materialFactory[t.type];
                if (n) {
                    var o = "string" == typeof n ? this.lang.format(n, t) : n(t, e);
                    return i ? o : "<!DOCTYPE html><body>" + o;
                }
                return "";
            }
        }), i.define({
            name: "inlayFix",
            namespace: "dup.ui.assertion",
            deps: {},
            painterName: "inlayFix",
            assert: function(t) {
                var e = t.placement, i = e.basic, n = e.container, o = n.floated;
                return 1 === i.rspFormat && 1 === i.flowType && 1 === n.anchoredType && (!o || (1 === o.trigger || !this.isFloat(o)));
            },
            isFloat: function(t) {
                for (var e in t) return !0;
                return !1;
            }
        }), i.define({
            name: "float",
            namespace: "dup.ui.assertion",
            deps: {},
            painterName: "float",
            assert: function(t) {
                var e = t.placement, i = e.basic, n = e.container;
                return 1 === i.rspFormat && 1 === i.flowType && n.anchoredType, !1;
            }
        }), i.define({
            name: "unicode",
            namespace: "dup.common.utility",
            deps: {},
            toDecode: function(t) {
                var e = [];
                if (t instanceof Array) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        e.push(this.decode(n));
                    }
                    return e;
                }
                return "string" == typeof t ? this.decode(t) : void 0;
            },
            toEncode: function(t) {
                var e = [];
                if (t instanceof Array) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        e.push(this.encode(n));
                    }
                    return e;
                }
                return "string" == typeof t ? this.encode(t) : void 0;
            },
            decode: function(t) {
                return unescape(t.replace(/\\(u[0-9a-fA-F]{4})/gm, "%$1"));
            },
            encode: function(t) {
                return escape(t).replace(/%(u[0-9A-F]{4})|(%[0-9A-F]{2})/gm, function(t, e, i) {
                    return e && "\\" + e.toLowerCase() || unescape(i);
                });
            }
        }), i.define({
            name: "dom",
            namespace: "dup.common.utility",
            deps: {
                lang: "dup.common.utility.lang",
                browser: "dup.common.utility.browser"
            },
            $dom: function() {},
            g: function(t, e) {
                return t ? "string" === this.lang.getType(t) && t.length > 0 ? (e = e || window, 
                e.document.getElementById(t)) : !t.nodeName || 1 !== t.nodeType && 9 !== t.nodeType ? null : t : null;
            },
            getDocument: function(t) {
                return 9 === t.nodeType ? t : t.ownerDocument || t.document;
            },
            getWindow: function(t) {
                var e = this.getDocument(t);
                return e.parentWindow || e.defaultView || null;
            },
            isWindow: function(t) {
                try {
                    if (t && "object" == (void 0 === t ? "undefined" : _typeof(t)) && t.document && "setInterval" in t) return !0;
                } catch (t) {
                    return !1;
                }
                return !1;
            },
            isInIframe: function(t, e) {
                return (t = t || window) != window.top && t != t.parent || !this.isWindow(t);
            },
            checkParentAccess: function(t) {
                try {
                    return !!t.parent.location.toString();
                } catch (t) {
                    return !1;
                }
            },
            isInCrossDomainIframe: function(t, e) {
                e = 2 === arguments.length ? e : t.parent;
                for (var i = 0; i++ < 10 && this.isInIframe(t, e); ) {
                    if (!this.checkParentAccess(t)) return !0;
                    t = t.parent;
                }
                return i >= 10;
            },
            ready: function(t, e, n) {
                n = n || this.win || window;
                var o = n.document;
                e = e || 0, this.domReadyMonitorRunTimes = 0, this.readyFuncArray = this.readyFuncArray || [], 
                this.readyFuncArray.push({
                    func: t,
                    delay: e,
                    done: !1
                });
                var s = i.proxy(this, function() {
                    var t = !1;
                    this.domReadyMonitorRunTimes++;
                    var e = !1;
                    try {
                        n.frameElement && (e = !0);
                    } catch (t) {
                        e = !0;
                    }
                    if (this.browser.ie && this.browser.ie < 9 && !e) try {
                        o.documentElement.doScroll("left"), t = !0;
                    } catch (t) {} else if ("complete" === o.readyState || this.domContentLoaded) t = !0; else if (this.domReadyMonitorRunTimes > 3e5) return void (this.domReadyMonitorId && (n.clearInterval(this.domReadyMonitorId), 
                    this.domReadyMonitorId = null));
                    if (t) try {
                        if (this.readyFuncArray && this.readyFuncArray.length) for (var i = 0, s = this.readyFuncArray.length; s > i; i++) {
                            var r = this.readyFuncArray[i];
                            r && r.func && !r.done && (r.delay ? (r.done = !0, n.setTimeout(r.func, r.delay)) : (r.done = !0, 
                            r.func()));
                        }
                    } catch (t) {
                        throw t;
                    } finally {
                        this.domReadyMonitorId && (n.clearInterval(this.domReadyMonitorId), this.domReadyMonitorId = null);
                    }
                }, this), r = i.proxy(this, function() {
                    this.domContentLoaded = !0, s();
                });
                this.domReadyMonitorId || (this.domReadyMonitorId = n.setInterval(s, 50), o.addEventListener ? (o.addEventListener("DOMContentLoaded", r, !1), 
                n.addEventListener("load", r, !1)) : o.attachEvent && n.attachEvent("onload", r, !1));
            },
            bind: function(t, e, i) {
                return "string" == typeof t && (t = this.g(t)), e = e.replace(/^on/i, "").toLowerCase(), 
                t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent && t.attachEvent("on" + e, i), 
                t;
            },
            getNotCrossDomainTopWindow: function(t, e) {
                1 === arguments.length && "number" === this.lang.getType(arguments[0]) && (e = arguments[0], 
                t = void 0), e = e || 10;
                for (var i = window, n = 0; n++ < e && this.isInIframe(i) && !this.isInCrossDomainIframe(i) && (!t || !t(i)); ) i = i.parent;
                return i;
            },
            getTopElement: function(t) {
                var e = this.isWindow(t) ? t.document : this.getDocument(t);
                return "CSS1Compat" === e.compatMode ? e.documentElement : e.body;
            },
            getDocumentTitle: function() {
                var t = this.getNotCrossDomainTopWindow(), e = t.document.title;
                return e.length > 60 && (e = e.substr(0, 60)), e;
            },
            getPageClient: function() {
                var t;
                return "number" == typeof window.innerWidth ? t = {
                    width: window.innerWidth,
                    height: window.innerHeight
                } : document.documentElement && document.documentElement.clientWidth ? t = {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                } : document.body && document.body.clientWidth && (t = {
                    width: document.body.clientWidth,
                    height: document.body.clientHeight
                }), t;
            },
            getNotCrossDomainWin: function() {
                var t = this.getWinList();
                return t[t.length - 1];
            },
            getWinList: function(t) {
                function e() {
                    return t.apply(this, arguments);
                }
                return e.toString = function() {
                    return t.toString();
                }, e;
            }(function() {
                for (var t = 0, e = window, i = e.top, n = [ e ]; e !== i && t++ < 10 && this.isWindow(e) && this.isWindow(e.parent); ) e = e.parent, 
                n.push(e);
                return getWinList = function() {
                    return n;
                }, n;
            })
        }), i.define({
            name: "style",
            namespace: "dup.common.utility",
            deps: {
                dom: "dup.common.utility.dom",
                lang: "dup.common.utility.lang",
                browser: "dup.common.utility.browser"
            },
            $style: function() {},
            getClientWidth: function(t) {
                t = t || window;
                try {
                    var e = this.dom.getTopElement(t).clientWidth;
                    if (e || 0 === e) return e;
                } catch (t) {}
                return -1;
            },
            getClientHeight: function(t) {
                t = t || window;
                try {
                    var e = this.dom.getTopElement(t).clientHeight;
                    if (e || 0 === e) return e;
                } catch (t) {}
                return -1;
            },
            getPositionCore: function(t) {
                var e = {
                    top: 0,
                    left: 0
                };
                if (t === this.dom.getTopElement(t)) return e;
                var i = this.dom.getDocument(t), n = i.body, o = i.documentElement;
                if (n && t.getBoundingClientRect) {
                    var s = t.getBoundingClientRect();
                    e.left = Math.floor(s.left) + Math.max(o.scrollLeft, n.scrollLeft), e.top = Math.floor(s.top) + Math.max(o.scrollTop, n.scrollTop), 
                    e.left -= o.clientLeft, e.top -= o.clientTop;
                    var r = this.getStyle(n, "borderLeftWidth"), a = this.getStyle(n, "borderTopWidth"), d = parseInt(r, 10), l = parseInt(a, 10);
                    e.left -= isNaN(d) ? 2 : d, e.top -= isNaN(l) ? 2 : l;
                }
                return e;
            },
            getStyle: function(t, e) {
                if (!t) return "";
                var i = "";
                i = e.indexOf("-") > -1 ? e.replace(/[-][^-]{1}/g, function(t) {
                    return t.charAt(1).toUpperCase();
                }) : e.replace(/[A-Z]{1}/g, function(t) {
                    return "-" + t.charAt(0).toLowerCase();
                });
                var n, o = this.dom.getWindow(t);
                if (o && o.getComputedStyle) {
                    if (n = o.getComputedStyle(t, null)) return n.getPropertyValue(e) || n.getPropertyValue(i);
                } else if (t.currentStyle) return n = t.currentStyle, n[e] || n[i];
                return "";
            },
            getPosition: function(t) {
                if (t) {
                    var e = this.dom.g(t);
                    if (!e) return !1;
                    var i = this.getPositionCore(e), n = this.dom.getWindow(e);
                    if (!n) return i;
                    for (var o = 0; n !== n.parent && o++ < 10 && !this.dom.isInCrossDomainIframe(n) && n.frameElement; ) {
                        var s = this.getPositionCore(n.frameElement);
                        i.left += s.left, i.top += s.top, n = n.parent;
                    }
                    return i;
                }
            },
            getOpacityInWin: function(t) {
                for (var e = t, i = this.dom.getWindow(e), n = 100; e && e.tagName; ) {
                    var o = 100;
                    if (this.browser.ie) {
                        if (this.browser.ie > 5) try {
                            o = parseInt(this.lang.getAttribute(e, "filters.alpha.opacity"), 10) || 100;
                        } catch (t) {}
                        n = n > o ? o : n;
                    } else {
                        try {
                            o = 100 * (i.getComputedStyle(e, null).opacity || 1);
                        } catch (t) {}
                        n *= o / 100;
                    }
                    e = e.parentNode;
                }
                return 0 === n ? 0 : n || 100;
            },
            getOpacity: function(t) {
                for (var e = this.dom.g(t), i = this.dom.getWindow(e), n = this.getOpacityInWin(e), o = 0; o++ < 10 && this.dom.isInIframe(i) && !this.dom.isInCrossDomainIframe(i); ) {
                    n *= (i.frameElement ? this.getOpacityInWin(i.frameElement) : 100) / 100, i = i.parent;
                }
                return n;
            },
            getScrollWidth: function(t) {
                t = t || window;
                try {
                    var e = this.dom.getTopElement(t).scrollWidth;
                    if (e || 0 === e) return e;
                } catch (t) {}
                return -1;
            },
            getScrollHeight: function(t) {
                t = t || window;
                try {
                    var e = this.dom.getTopElement(t).scrollHeight;
                    if (e || 0 === e) return e;
                } catch (t) {}
                return -1;
            },
            getScrollTop: function(t) {
                t = t || window;
                var e = t.document;
                return t.pageYOffset || e.documentElement.scrollTop || e.body.scrollTop;
            },
            getScrollLeft: function(t) {
                var e = t || window, i = this.dom.getTopElement(e);
                return e.pageXOffset || i.scrollLeft;
            },
            getOuterWidth: function(t, e) {
                var i = this.dom.g(t), n = i.offsetWidth;
                return e && (n += this.getMargin(i, "Left") + this.getMargin(i, "Right")), n;
            },
            getMargin: function(t, e) {
                var i = this.getStyle(t, "margin" + e).toString().toLowerCase().replace("px", "").replace("auto", "0");
                return parseInt(i, 10) || 0;
            },
            getOuterHeight: function(t, e) {
                var i = this.dom.g(t), n = i.offsetHeight;
                return e && (n += this.getMargin(i, "Top") + this.getMargin(i, "Bottom")), n;
            },
            canFixed: function() {
                var t = !0;
                return this.browser.ie && (this.browser.ie < 7 || "BackCompat" === document.compatMode) && (t = !1), 
                t;
            },
            setStyle: function(t, e, i) {
                this.dom.g(t).style[e] = i;
            },
            setStyles: function(t, e) {
                for (var i in e) e.hasOwnProperty(i) && this.setStyle(t, i, e[i]);
                return t;
            },
            getDefaultStyle: function(t, e) {
                return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, !1)[e];
            },
            isVisible: function(t) {
                return "none" !== this.getDefaultStyle(t, "display") && "hidden" !== this.getDefaultStyle(t, "visibility") && "100" == this.getOpacity(t);
            }
        }), i.define({
            name: "url",
            namespace: "dup.common.utility",
            deps: {
                dom: "dup.common.utility.dom"
            },
            getQueryValue: function(t, e, i) {
                var n = new RegExp("(\\?|&|#)" + e + "=([^&#]*)(&|#)?"), o = t.match(n), s = "";
                return o && (s = o[2]), i && (s = decodeURIComponent(s)), s;
            },
            getTopWindowUrl: function(t) {
                var e = this.dom.getNotCrossDomainTopWindow(t), i = "";
                return this.dom.isInIframe(e) && (i = e.document.referrer), i = i || e.location.href;
            },
            getMainDomain: function(t) {
                t = t || document.domain, 0 === t.indexOf("www.") && (t = t.substr(4)), "." === t.charAt(t.length - 1) && (t = t.substring(0, t.length - 1));
                var e = [ "com", "cn", "net", "org", "gov", "info", "la", "cc", "co", "jp", "us", "hk", "tv", "me", "biz", "in", "be", "io", "tk", "cm", "li", "ru", "ws", "hn", "fm", "tw", "ma", "in", "vn", "name", "mx", "gd", "im" ], i = new RegExp("([a-z0-9][a-z0-9\\-]*?\\.(?:" + e.join("|") + ")(?:\\.(?:cn|jp|tw|ru|th))?)$", "i"), n = t.match(i);
                return n ? n[0] : t;
            },
            queryToJson: function(t) {
                for (var e, i, n, o, s = t.substr(t.indexOf("?") + 1), r = s.split("&"), a = r.length, d = {}, l = 0; a > l; l++) o = r[l].split("="), 
                e = o[0], i = o[1], n = d[e], void 0 === n ? d[e] = i : "[object Array]" == Object.prototype.toString.call(n) ? n.push(i) : d[e] = [ n, i ];
                return d;
            }
        }), i.define({
            name: "data",
            namespace: "dup.common.utility",
            deps: {
                lang: "dup.common.utility.lang",
                dom: "dup.common.utility.dom"
            },
            $data: function() {
                this.pageInfo = {};
            },
            data: function() {
                this.topWin = this.dom.getNotCrossDomainTopWindow(), this.globalInfo = this.topWin.BAIDU_SSP__info || (this.topWin.BAIDU_SSP__info = {});
            },
            forEach: function(t, e) {
                var i, n, o = t.length;
                if ("function" == typeof e) for (n = 0; o > n && (i = t[n], !1 !== e.call(t, i, n)); n++) ;
                return t;
            },
            putInfo: function(t, e, i) {
                var n, o = i ? this.globalInfo : this.pageInfo;
                if ("string" === this.lang.getType(t)) {
                    for (var s = t.split("."), r = o; s.length; ) {
                        var a = s.shift();
                        r[a] = s.length ? void 0 !== r[a] ? r[a] : {} : e, r = r[a];
                    }
                    n = e;
                }
                return n;
            },
            removeInfo: function(t, e) {
                var i = e ? this.globalInfo : this.pageInfo;
                switch (this.lang.getType(t)) {
                  default:
                    return !1;

                  case "string":
                    for (var n = t.split("."); n.length; ) {
                        var o = n.shift();
                        if (!n.length || void 0 === i[o]) return delete i[o], !0;
                        i = i[o];
                    }
                }
                return !1;
            },
            getInfo: function(t, e) {
                var i, n = e ? this.globalInfo : this.pageInfo;
                return "string" === this.lang.getType(t) && (i = this.lang.getAttribute(n, t)), 
                i;
            },
            getOnce: function(t) {
                var e = window, i = e[t];
                return e[t] = void 0, i;
            },
            defineOnce: function(t, e) {
                var i = window;
                return i[t] ? i[t] : (i[t] = e, e);
            },
            getConfig: function(t) {
                return !!t && (this.pageInfo = this.getInfo("pageConfig") || {}, this.pageInfo[t]);
            },
            putConfig: function(t, e) {
                return !(!t || !e) && (this.pageInfo = this.getInfo("pageConfig") || {}, this.pageInfo[t] = e, 
                this.putInfo("pageConfig", this.pageInfo), !0);
            }
        }), i.define({
            name: "origentation",
            namespace: "dup.business",
            deps: {
                lang: "dup.common.utility.lang",
                data: "dup.common.utility.data"
            },
            orientKey: "bizOrientations",
            orientUrgentKey: "bizUrgentOrientations",
            hasOwn: Object.prototype.hasOwnProperty,
            watchingSlotsMap: {},
            slotFinishedCallback: function() {},
            addOrientation: function(t, e) {
                var i = this.beforeSavingOrientation.apply(this, arguments);
                return this.saveOrientation(t, i);
            },
            addOrientationOnce: function(t, e) {
                var i = this.beforeSavingOrientation.apply(this, arguments);
                return this.saveOrientation(t, i, {
                    urgent: !0,
                    merge: !0
                });
            },
            setOrientationOnce: function(t, e) {
                var i = this.beforeSavingOrientation.apply(this, arguments);
                return this.saveOrientation(t, i, {
                    urgent: !0,
                    override: !0
                });
            },
            beforeSavingOrientation: function(t, e) {
                var i = /^[0-9a-zA-Z]+$/;
                return t && i.test(t) && e ? e = "array" === this.lang.getType(e) ? e : Array.prototype.slice.call(arguments, 1) : [];
            },
            saveOrientation: function(t, e, i) {
                if (!e || !e.length) return !1;
                i = i || {
                    urgent: !1,
                    merge: !1,
                    override: !1
                };
                var n = i.merge ? this.data.getInfo(this.orientKey) : {}, o = i.urgent ? this.orientUrgentKey : this.orientKey, s = i.override ? {} : this.data.getInfo(o) || n, r = {};
                for (var a in s) this.hasOwn.call(s, a) && (r[a] = "array" === this.lang.getType(s[a]) ? s[a].slice() : s[a]);
                for (var d = r[t] || [], l = e.length, c = 0; l > c; c++) {
                    var h = e[c];
                    "string" == typeof h && (h = encodeURIComponent(h), h.length <= 100 && (d[d.length] = h));
                }
                return !!d.length && (r[t] = this.lang.unique(d), this.data.putInfo(o, r), !0);
            },
            getOrientationQuery: function(t) {
                t = t || 500, t = Math.max(0, Math.min(t, 500));
                var e, i = [], n = this.data.getInfo(this.orientUrgentKey) || this.data.getInfo(this.orientKey) || {};
                if ("object" === this.lang.getType(n)) for (var o in n) this.lang.hasOwn.call(n, o) && (e = o + "=" + n[o].join(","), 
                i[i.length] = e);
                this.data.putInfo(this.orientUrgentKey, void 0), i.sort(function(t, e) {
                    return t.length - e.length;
                });
                for (var s = "", r = i.length, a = 0; r > a && !(s.length + i[a].length >= t); a++) s += (a ? "&" : "") + i[a];
                return s;
            },
            addSlotStatusCallback: function(t, e) {
                this.setSlotFinishCallback(t), this.addWatchSlotId(e);
            },
            setSlotFinishCallback: function(t) {
                this.slotFinishedCallback = t;
            },
            addWatchSlotId: function(t) {
                this.watchingSlotsMap[t] = !0;
            }
        }), i.define({
            name: "browserParam",
            namespace: "dup.business.parameter",
            deps: {
                config: "dup.common.config",
                browser: "dup.common.utility.browser",
                dom: "dup.common.utility.dom",
                style: "dup.common.utility.style",
                url: "dup.common.utility.url",
                cookie: "dup.common.utility.cookie"
            },
            $browserParam: function() {
                this.win = window, this.doc = this.win.document, this.nav = this.win.navigator;
            },
            getTopWin: function() {
                return this.topWindow || (this.topWindow = this.dom.getNotCrossDomainTopWindow()), 
                this.topWindow;
            },
            paramsList: [ {
                key: "dbv",
                value: function() {
                    return this.browser.qihoo ? "1" : this.browser.chrome ? "2" : "0";
                }
            }, {
                key: "drs",
                value: function() {
                    var t = {
                        uninitialized: 0,
                        loading: 1,
                        loaded: 2,
                        interactive: 3,
                        complete: 4
                    };
                    try {
                        return t[this.doc.readyState];
                    } catch (t) {
                        return -1;
                    }
                }
            }, {
                key: "pcs",
                value: function() {
                    return [ this.style.getClientWidth(this.getTopWin()), this.style.getClientHeight(this.getTopWin()) ].join("x");
                }
            }, {
                key: "pss",
                value: function() {
                    return [ this.style.getScrollWidth(this.getTopWin()), this.style.getScrollHeight(this.getTopWin()) ].join("x");
                }
            }, {
                key: "cfv",
                value: function() {
                    return this.browser.getFlashPlayerVersion();
                }
            }, {
                key: "cpl",
                value: function() {
                    return this.nav.plugins.length || 0;
                }
            }, {
                key: "chi",
                value: function() {
                    return this.win.history.length || 0;
                }
            }, {
                key: "cce",
                value: function() {
                    return this.nav.cookieEnabled || 0;
                }
            }, {
                key: "cec",
                value: function() {
                    return (this.doc.characterSet ? this.doc.characterSet : this.doc.charset) || "";
                }
            }, {
                key: "tlm",
                value: function() {
                    return Date.parse(this.doc.lastModified) / 1e3;
                }
            }, {
                key: "prot",
                value: function() {
                    return "https:" === this.config.HTTP_PROTOCOL ? "2" : "";
                }
            }, {
                key: "rw",
                value: function() {
                    var t = Math.max(320, Math.min(window.innerWidth, window.innerHeight));
                    return isNaN(t) && (t = Math.min(this.style.getClientWidth(), this.style.getClientHeight())), 
                    t || 0;
                }
            }, {
                key: "ltu",
                encode: !0,
                limit: 700,
                value: function() {
                    var e, n = i.proxy(this, function(t) {
                        var e = this.style.getClientWidth(t), i = this.style.getClientHeight(t);
                        return e > 400 && i > 120;
                    });
                    return e = t.location && t.location.href ? t.location.href : this.url.getTopWindowUrl(n), 
                    e.indexOf("cpro_prev") > 0 && (e = e.slice(0, e.indexOf("?"))), e;
                }
            }, {
                key: "liu",
                encode: !0,
                limit: 700,
                value: function() {
                    return this.dom.isInIframe(this.win) ? this.doc.URL : "";
                }
            }, {
                key: "ltr",
                encode: !0,
                limit: 300,
                value: function() {
                    var t = this.getTopWin(), e = "";
                    try {
                        e = t.opener ? t.opener.document.location.href : "";
                    } catch (t) {}
                    return e || t.document.referrer;
                }
            }, {
                key: "lcr",
                encode: !0,
                value: function() {
                    if ("union" === this.slotInfo.productLine) return "";
                    var t = this.doc.referrer;
                    if (!t) return "";
                    var e = t.replace(/^https?:\/\//, "");
                    e = e.split("/")[0], e = e.split(":")[0], e = this.url.getMainDomain(e);
                    var i = this.url.getMainDomain(), n = this.cookie.get(this.config.LCR_COOKIE_NAME);
                    return n && i === e ? n : i !== e ? (this.cookie.set(this.config.LCR_COOKIE_NAME, t, {
                        domain: i
                    }), t) : "";
                }
            }, {
                key: "ecd",
                encode: !0,
                value: function() {
                    return this.browser.ie && this.browser.ie < 8 ? 0 : 1;
                }
            } ],
            setSlotInfo: function(t) {
                this.slotInfo = t;
            }
        }), i.define({
            name: "systemParam",
            namespace: "dup.business.parameter",
            deps: {
                dom: "dup.common.utility.dom",
                style: "dup.common.utility.style"
            },
            $systemParam: function() {
                this.win = window, this.doc = this.win.document, this.screen = this.win.screen;
            },
            paramsList: [ {
                key: "uc",
                value: function() {
                    return [ this.screen.availWidth, this.screen.availHeight ].join("x");
                }
            }, {
                key: "pis",
                value: function() {
                    return (this.dom.isInIframe(this.win) ? [ this.style.getClientWidth(), this.style.getClientHeight() ] : [ -1, -1 ]).join("x");
                }
            }, {
                key: "sr",
                value: function() {
                    return [ this.screen.width, this.screen.height ].join("x");
                }
            }, {
                key: "tcn",
                value: function() {
                    var t = +new Date();
                    return Math.round(t / 1e3);
                }
            } ]
        }), i.define({
            name: "event",
            namespace: "dup.common.utility",
            deps: {
                dom: "dup.common.utility.dom"
            },
            bind: function(t, e, i) {
                var n = this.dom.isWindow(t) ? t : this.dom.g(t);
                if (n) if (n.addEventListener) n.addEventListener(e, i, !1); else if (n.attachEvent) n.attachEvent("on" + e, i); else {
                    var o = n["on" + e];
                    n["on" + e] = function() {
                        o && o.apply(this, arguments), i.apply(this, arguments);
                    };
                }
                return n;
            },
            off: function(t, e, i) {
                var n, o, s = t._listeners_;
                if (!s) return t;
                if (void 0 === e) {
                    for (n in s) delete s[n];
                    return t;
                }
                if (e.indexOf("on") && (e = "on" + e), void 0 === i) delete s[e]; else if (o = s[e]) for (n = o.length - 1; n >= 0; n--) o[n].handler === i && o.splice(n, 1);
                return t;
            },
            unBind: function(t, e, i) {
                return "string" == typeof t && (t = this.dom.g(t)), t = this.off(t, e.replace(/^\s*on/, ""), i);
            },
            app: function(t, e) {
                return t.bind.apply(t, Array.prototype.slice.call(arguments, 1));
            }
        }), i.define({
            name: "fingerPrint",
            namespace: "dup.business",
            deps: {
                browser: "dup.common.utility.browser",
                event: "dup.common.utility.event",
                dom: "dup.common.utility.dom",
                storage: "dup.common.utility.storage"
            },
            start: function() {
                this.idPrefix = "BAIDU_DUP_fp_", this.fpElId = this.idPrefix + "wrapper", this.dom.g(this.fpElId) || this.event.bind(window, "load", i.proxy(this, this.createFPIframe));
            },
            createFPIframe: function() {
                if (!this.dom.g(this.fpElId)) {
                    var t = window, e = t.document, i = e.body, n = this.dom.isInIframe(t) ? e.URL : "";
                    if ((this.browser.ie > 9 || !this.browser.ie) && n) try {
                        e.cookie, this.storage.isAvailable;
                    } catch (t) {
                        return;
                    }
                    var o = e.createElement("div");
                    o.id = this.fpElId, o.style.position = "absolute", o.style.left = "-1px", o.style.bottom = "-1px", 
                    o.style.zIndex = 0, o.style.width = 0, o.style.height = 0, o.style.overflow = "hidden", 
                    o.style.visibility = "hidden", o.style.display = "none";
                    var s = e.createElement("iframe");
                    s.id = this.idPrefix + "iframe", s.src = "https://pos.baidu.com/wh/o.htm?ltr=", 
                    s.style.width = 0, s.style.height = 0, s.style.visibility = "hidden", s.style.display = "none";
                    try {
                        o.insertBefore(s, o.firstChild), i && i.insertBefore(o, i.firstChild);
                    } catch (t) {}
                }
            }
        }), i.define({
            name: "asserter",
            namespace: "dup.ui.assertion",
            deps: {
                mobile: "dup.ui.assertion.mobile.float",
                dynamicFloat: "dup.ui.assertion.dynamicFloat"
            },
            assert: function(t) {
                var e = t.response.placement.userdefine || "", i = t.response.placement.encode_userdefine || "";
                i && "encoded" === i && (e = decodeURIComponent(e));
                for (var n = e.split("|") || [], o = {}, s = 0, r = n.length; r > s; s++) {
                    var a = n[s], d = a.split("="), l = d[0];
                    l && (o[l] = d[1]);
                }
                if (o.hasOwnProperty("painter")) return o.painter;
                var c = t.styleOpenApi.tn || "", h = parseInt(t.styleOpenApi.xuanting || 0, 10);
                return c.indexOf("mobile") >= 0 ? h > 0 || this.mobile.assert(t.response) ? "mobile.float" : "mobile.inlayFix" : "template_float_searchBar" === c ? "searchBar" : "template_float_bottom_lu" === c ? "" : c.indexOf("_xuanfu") >= 0 || c.indexOf("float") >= 0 ? "" : h > 0 || this.dynamicFloat.assert(t.response) ? "dynamicFloat" : c && c.length > 0 ? "inlayFix" : "";
            }
        }), i.define({
            name: "sceneTactics",
            namespace: "dup.business",
            deps: {
                config: "dup.common.config",
                exp: "dup.business.expBranch"
            },
            $sceneTactics: function() {
                var t = String.fromCharCode(Math.floor(26 * Math.random()) + 97), e = String.fromCharCode(Math.floor(26 * Math.random()) + 97);
                this.config.POS_URL || (this.config.POS_URL = this.config.HTTP_PROTOCOL + this.config.REQUEST_URL + t + "c" + e + "m?"), 
                this.config.EXP_SWITCH && this.exp.tactics();
            },
            sceneTactics: function() {}
        }), i.define({
            name: "creativePreview",
            namespace: "dup.business",
            deps: {
                url: "dup.common.utility.url",
                dom: "dup.common.utility.dom",
                cookie: "dup.common.utility.cookie",
                config: "dup.common.config",
                lang: "dup.common.utility.lang"
            },
            PREV_TEMP_URL: "//cpro.baidu.com/cpro/ui/preview/templates/",
            validate: function(t, e, i, n, o) {
                var s = !1, r = this.getPrevValue(i, o);
                if (!r) return s;
                for (var a = this.parsePreviewData(r), d = 1 === parseInt(a.type, 10), l = !(n.length > 0), c = !(n.length > 0), h = 0, p = n.length; p > h; h++) {
                    var u = n[h];
                    0 === u ? c = !0 : 4 === u || 50 === u ? (c = !0, l = !0) : 1 !== u && 2 !== u || (l = !0);
                }
                return !d && l ? s = parseInt(a.imgWidth, 10) === parseInt(t, 10) && parseInt(a.imgHeight, 10) === parseInt(e, 10) : d && c && this.isAvalibleTextSize(t, e) && (s = !0), 
                s;
            },
            isAvalibleTextSize: function(t, e) {
                for (var i = [ "1024_60", "120_240", "120_600", "125_125", "160_600", "180_150", "200_200", "234_60", "250_250", "300_120", "300_250", "300_280", "336_280", "360_150", "360_300", "460_60", "468_60", "480_160", "500_200", "580_90", "640_60", "728_90", "760_60", "760_75", "760_90", "960_60", "960_75", "960_90" ], n = 0, o = i.length; o > n; n++) if (t + "_" + e === i[n]) return !0;
                return !1;
            },
            getPreviewUrl: function(t, e, i, n) {
                var o = window.location.href;
                if (!this.validate(t, e, n, i, o)) return "";
                var s = n.indexOf("inlay") >= 0 ? "bd_cpro_prev" : "bd_cpro_fprev", r = this.getPrevValue(n, o), a = this.parsePreviewData(r), d = "";
                return n.indexOf("inlay") >= 0 ? d = this.getInlayUrl(parseInt(a.type, 10), s, r, "text_default_" + t + "_" + e) : n.indexOf("float") >= 0 && (d = this.getFloatUrl(parseInt(a.type, 10), s, r)), 
                d;
            },
            getPrevValue: function(t, e) {
                var i;
                i = e ? e.substring(e.indexOf("?")) : this.dom.isInCrossDomainIframe(window) ? window.location.search.slice(1) : window.top.location.search.slice(1);
                var n, o = document.referrer, s = t.indexOf("inlay") >= 0 || "ui" === t ? "bd_cpro_prev" : "bd_cpro_fprev", r = "";
                try {
                    n = document.cookie;
                } catch (t) {}
                return i.indexOf(s) > -1 && (r = this.url.getQueryValue(i, s)), !r && n && -1 !== n.indexOf(s) && (r = this.cookie.get(s)), 
                r || -1 === o.indexOf(s) || (r = this.url.getQueryValue(o, s)), r;
            },
            parsePreviewData: function(t) {
                return t = decodeURIComponent(t).replace(/\\x1e/g, "&").replace(/\\x1d/g, "=").replace(/\\x1c/g, "?").replace(/\\x5c/g, "\\"), 
                this.lang.jsonToObj(t);
            },
            getFloatUrl: function(t, e, i) {
                var n;
                return n = 2 === t ? "float_image.html" : 4 === t || 3 === t ? "float_flash.html" : "blank_tips.html", 
                this.PREV_TEMP_URL + n + "?tn=template_float_all_normal" + ("&" + e + "=" + i).replace(/\./g, "%252e") + "&ut=" + +new Date();
            },
            getInlayUrl: function(t, e, i, n) {
                var o;
                o = 1 === t ? n + ".html" : 2 === t ? "image.html" : 4 === t || 3 === t ? "flash.html" : "blank_tips.html";
                var s = this.PREV_TEMP_URL + o + "?";
                return s += (e + "=#" + i + "&ut=" + +new Date()).replace(/\.(?!swf)/g, "%252e");
            }
        }), i.define({
            name: "deliveryLimit",
            namespace: "dup.business",
            deps: {
                inlayFixAssert: "dup.ui.assertion.inlayFix",
                dynamicFloatAssert: "dup.ui.assertion.dynamicFloat",
                floatAssert: "dup.ui.assertion.float",
                dom: "dup.common.utility.dom"
            },
            MAX_COUNT: {},
            TYPE: {
                INLAY: "inlay",
                COUPLET: "couplet",
                POPUP: "popup",
                LINKUNIT: "linkunit"
            },
            $deliveryLimit: function() {
                this.displayedMap = this.displayedMap || {}, this.MAX_COUNT[this.TYPE.INLAY] = 25, 
                this.MAX_COUNT[this.TYPE.COUPLET] = 2, this.MAX_COUNT[this.TYPE.POPUP] = 1, this.MAX_COUNT[this.TYPE.LINKUNIT] = 25;
            },
            validate: function(t) {
                if ("union" !== t.productLine) return !0;
                var e = this.getSlotType(t), i = this.getAdCount(e);
                return this.MAX_COUNT[e] > i;
            },
            getAdCount: function(t) {
                var e = this.displayedMap[t] || {}, i = 0;
                for (var n in e) n && e[n] && e.hasOwnProperty(n) && (this.dom.g(n) ? i++ : e[n] = void 0);
                return i;
            },
            setAdsCount: function(t, e) {
                var i = this.displayedMap[t];
                return i || (this.displayedMap[t] = {}, i = this.displayedMap[t]), i[e] = 1, !0;
            },
            getSlotType: function(t) {
                var e = this.TYPE.INLAY, i = t.response;
                if (!i) return e;
                var n = i.placement;
                if ((this.inlayFixAssert.assert(i) || this.dynamicFloatAssert.assert(i)) && (e = this.TYPE.INLAY), 
                n && n.fillstyle) for (var o = i.placement.fillstyle.elements || [], s = 0, r = o.length; r > s; s++) if (5 === o[s]) return this.TYPE.LINKUNIT;
                return e;
            }
        }), i.define({
            name: "landingPage",
            namespace: "dup.ui.painter",
            deps: {
                lang: "dup.common.utility.lang",
                style: "dup.common.utility.style",
                browser: "dup.common.utility.browser",
                dom: "dup.common.utility.dom"
            },
            activate: function(t) {
                return !!this.validate(t) && (this.expansionActionName = "BaiduCproExpansion" + t.containerId, 
                this.pageIframeId = t.containerId + "_ExpansionLP", t.paramObj.expToken = this.expansionActionName, 
                this.dom.bind(window, "message", i.proxy(this, this.onPostMessageHandler)), !0);
            },
            validate: function(t) {
                return 1 === parseInt(t.styleOpenApi.expansion || 0, 10) && !this.browser.isIOS && "postMessage" in window;
            },
            onPostMessageHandler: function(t) {
                if ("object" == (void 0 === t ? "undefined" : _typeof(t)) && t.data) {
                    var e = t.data;
                    if ("string" == typeof e && !(e.indexOf(this.expansionActionName) < 0)) {
                        this.expandContainerEl = document.createElement("div");
                        var n = Math.max(this.style.getClientWidth(), this.style.getClientHeight()), o = this.expandContainerEl.style;
                        o.position = "fixed", o.left = "0", o.top = n + "px", o.zIndex = 2147483647, o.background = "#ffffff", 
                        o.width = "100%", o.transition = o.WebkitTransition = o.MozTransition = o.OTransition = "top 1s ease-in-out", 
                        e = e.slice(this.expansionActionName.length);
                        var s = [ '<iframe id="{lpIframeId}" ', 'src="{clickUrl}" width="{iframeWidth}" ', 'height="{iframeHeight}" align="center,center" ', 'marginwidth="0"  marginheight="0" ', 'frameborder="0"></iframe>', '<div id="{lpIframeId}_closeBtn" ', 'style="position:absolute;right:0;top:0;', "width:{closeBtnSize}px;", "height:{closeBtnSize}px;", "overflow:hidden;display:block;", "background:url('https://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.0/xuantingClose.png') ", "no-repeat 0 0; ", "_filter:progid:DXImageTransform", ".Microsoft.AlphaImageLoader(", "enabled=true, sizingMethod=none, ", "src='https://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.0/xuantingClose.png');", "_background:none;cursor:pointer;", 'background-position:center;background-size:100%,100%;">&nbsp;</div>' ].join(""), r = Math.min(this.style.getClientWidth(), this.style.getClientHeight()), a = {
                            lpIframeId: this.pageIframeId,
                            clickUrl: e,
                            iframeWidth: this.style.getClientWidth(),
                            iframeHeight: this.style.getClientHeight(),
                            closeBtnSize: 80 * r / 640
                        };
                        this.expandContainerEl.innerHTML = this.lang.template(s, a), this.expandContainerEl.style.top = "0", 
                        document.body.appendChild(this.expandContainerEl), this.dom.bind(window, "resize", i.proxy(this, this.onResizeHandler));
                        var d = this.dom.g(this.pageIframeId + "_closeBtn");
                        this.dom.bind(d, "click", i.proxy(this, this.onCloseBtnClickHandler));
                    }
                }
            },
            onCloseBtnClickHandler: function() {
                this.expandContainerEl.style.top = Math.max(this.style.getClientWidth(), this.style.getClientHeight()) + "px", 
                this.expandContainerEl && this.expandContainerEl.parentNode ? (this.expandContainerEl.parentNode.removeChild(this.expandContainerEl), 
                this.expandContainerEl = null) : this.expandContainerEl.innerHTML = "";
            },
            onResizeHandler: function() {
                var t = this.style.getClientWidth(), e = this.style.getClientHeight(), i = this.dom.g(this.pageIframeId);
                i.style.width = t + "px", i.style.height = e + "px", i.setAttribute("width", t), 
                i.setAttribute("height", e);
            }
        }), i.define({
            name: "hiddenFloatAd",
            namespace: "dup.ui.painter",
            deps: {
                style: "dup.common.utility.style",
                dom: "dup.common.utility.dom"
            },
            TOP: 2,
            BOTTOM: 3,
            render: function(t) {
                if (!this.validate(t)) return !1;
                this.alreadyEnableHidden = !0, this.autoCloseTime = t.response.placement.container.closeTime || 5, 
                t.styleOpenApi.cpro_close_time && (this.autoCloseTime = parseInt(t.styleOpenApi.cpro_close_time, 10) || 5), 
                this.autoCloseTime = this.autoCloseTime >= 3 ? this.autoCloseTime : 3;
                var e = parseInt(t.styleOpenApi.cpro_show_dist, 10) || 5;
                e = e >= 5 ? e : 5, this.percentage = (1 / e).toFixed(2);
                var n = t.response.placement, o = n.container;
                this.dockTo = parseInt(o.location, 10) || this.BOTTOM, this.adWrapEl = document.getElementById(t.containerId), 
                this.adWrapEl.style.display = "block", this.adIframe = this.dom.g(t.containerId + "_frame");
                var s = this.dom.g(t.containerId + "_closebtn"), r = parseInt(this.adWrapEl.style.height || t.height, 10), a = parseInt(s.style.height, 10);
                this.hiddenHeight = -1 * (r + a), this.haveSetIframeUrl = !0, this.countDownTimerId = !1, 
                this.close4ever = !1, this.shrinkAd(), this.transitionDecorator(this.adWrapEl), 
                this.lastScrollTop = this.style.getScrollTop(), this.dom.bind(s, "click", i.proxy(this, this.closeBtnOnClickHandler)), 
                this.dom.bind(window, "scroll", i.proxy(this, this.onScrollHandler));
            },
            validate: function(t) {
                var e = !!t.styleOpenApi.cpro_enable_hidden_float, i = t.response.placement.container, n = i.anchoredType, o = i.floated.trigger;
                return !!(e || "11" == n && o) && (!this.alreadyEnableHidden && (this.alreadyEnableHidden = !0, 
                !0));
            },
            shrinkAd: function() {
                this.dockTo === this.TOP ? this.adWrapEl.style.top = this.hiddenHeight + "px" : this.dockTo === this.BOTTOM && (this.adWrapEl.style.bottom = this.hiddenHeight + "px");
            },
            expandAd: function() {
                this.dockTo === this.TOP ? this.adWrapEl.style.top = 0 : this.adWrapEl.style.bottom = 0, 
                this.adIframe && !this.haveSetIframeUrl && (this.adIframe.src = this.adIframe.getAttribute("_src"), 
                this.haveSetIframeUrl = !0);
            },
            transitionDecorator: function(t) {
                t.style.cssText = t.style.cssText + "-webkit-transition: all .3s linear;-moz-transition: all .3s linear;-ms-transition: all .3s linear;-o-transition: all .3s linear;transition: all .3s linear;";
            },
            startCountDown: function(t, e) {
                var i = t, n = setInterval(function() {
                    0 >= --i && (clearInterval(n), e && e());
                }, 1e3);
                this.countDownTimerId = n;
            },
            closeBtnOnClickHandler: function() {
                this.shrinkAd(), this.close4ever = !0;
            },
            onScrollHandler: function() {
                var t = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * this.percentage, e = this.style.getScrollTop(), n = e > this.lastScrollTop ? "down" : "top";
                this.totalScrollLength += e - this.lastScrollTop, this.lastScrollTop = e, "top" === n && !this.close4ever && Math.abs(this.totalScrollLength) >= t && !this.countDownTimerId ? (this.expandAd(), 
                this.startCountDown(this.autoCloseTime, i.proxy(this, this.onTimeCountDownHandler))) : "down" === n && (this.totalScrollLength = 0);
            },
            onTimeCountDownHandler: function() {
                this.shrinkAd(), this.countDownTimerId = !1, this.totalScrollLength = 0;
            }
        }), i.define({
            name: "slotParam",
            namespace: "dup.business.parameter",
            deps: {
                dom: "dup.common.utility.dom",
                style: "dup.common.utility.style"
            },
            $slotParam: function() {
                this.win = window;
            },
            paramsList: [ {
                key: "di",
                value: function() {
                    return this.slotInfo.slotId;
                }
            }, {
                key: "dri",
                value: function() {
                    return this.slotInfo.index;
                }
            }, {
                key: "dis",
                value: function() {
                    var t = 0;
                    this.dom.isInIframe(this.win) && (t += 1), this.dom.isInCrossDomainIframe(this.win, this.win.top) && (t += 2);
                    var e = this.style.getClientWidth(), i = this.style.getClientHeight();
                    return (40 > e || 10 > i) && (t += 4), t;
                }
            }, {
                key: "dai",
                value: function() {
                    return this.slotInfo.count;
                }
            }, {
                key: "ps",
                value: function() {
                    var t = "0", e = this.dom.g(this.slotInfo.containerId), i = this.style.getPosition(e);
                    return i && void 0 !== i.top && void 0 !== i.left && (t = i.top + "x" + i.left), 
                    t;
                }
            }, {
                key: "coa",
                encode: !0,
                value: function() {
                    var t = [], e = this.slotInfo.styleOpenApi;
                    "-1" === this.slotInfo.pcwd && (e.cpro_ftpc = "true");
                    for (var i in e) if (i && void 0 !== e[i] && e.hasOwnProperty(i)) {
                        var n = i;
                        "cpro_w" === i && (n = "rsi0"), "cpro_h" === i && (n = "rsi1"), t.push(n + "=" + encodeURIComponent(e[i]));
                    }
                    return t.join("&");
                }
            }, {
                key: "enu",
                value: function() {
                    return "encoding";
                }
            }, {
                key: "cw",
                value: function() {
                    var t = this.slotInfo.styleOpenApi.cpro_ftpc || "true" === this.slotInfo.styleOpenApi.cpro_ftpc || "-1" === this.slotInfo.pcwd, e = this.dom.g(this.slotInfo.containerId);
                    return t && e && e.parentElement.clientWidth ? e.parentElement.clientWidth || 0 : void 0;
                }
            } ],
            setSlotInfo: function(t) {
                this.slotInfo = t;
            }
        }), i.define({
            name: "preview",
            namespace: "dup.business",
            deps: {
                config: "dup.common.config",
                url: "dup.common.utility.url",
                data: "dup.common.utility.data"
            },
            CLB_PREFIX: "baidu_clb_preview_",
            DUP_PREFIX: "baidu_dup_preview_",
            getValue: function(t) {
                var e, i = this.url.getTopWindowUrl();
                return e = this.url.getQueryValue(i, this.CLB_PREFIX + t), e || (e = this.url.getQueryValue(i, this.DUP_PREFIX + t)), 
                e;
            },
            getInfo: function() {
                var t, e = this.getValue("sid"), i = this.getValue("mid"), n = this.getValue("vc"), o = +this.getValue("ts");
                return 3e4 >= +new Date() - o && (t = {
                    sid: e,
                    mid: i,
                    vc: n
                }), this.getInfo = function() {
                    return t;
                }, t;
            },
            isUnionPreview: function(t) {
                var e = !1;
                return t ? /cpro_template=/gi.test(t) && (this.data.putInfo("#unionPreviewSwitch", !0), 
                e = !0) : e = !!this.data.getInfo("#unionPreviewSwitch"), e;
            },
            setUnionPreviewData: function(t) {
                this.data.putInfo("#unionPreviewData", t);
            },
            getUnionPreviewData: function() {
                var t = this.data.getInfo("#unionPreviewData");
                return t ? "prev=" + encodeURIComponent(t) + "&pt=union" : "";
            },
            clearUnionPreviewData: function() {
                this.data.removeInfo("#unionPreviewSwitch"), this.data.removeInfo("#unionPreviewData");
            },
            getSearchParams: function(t) {
                var e = {}, i = this.getInfo();
                return i && t == i.sid && (e.mid = i.mid, e.sid = i.vc, this.config.IS_PREVIEW = !0), 
                e;
            }
        }), i.define({
            name: "log",
            namespace: "dup.common.utility",
            deps: {
                config: "dup.common.config",
                lang: "dup.common.utility.lang",
                event: "dup.common.utility.event",
                storage: "dup.common.utility.storage"
            },
            storageKey: "BAIDU_DUP_log_storage",
            loadImage: function(t, e) {
                var i = new Image(), n = "BAIDU_DUP_log_" + Math.floor(2147483648 * Math.random()).toString(36);
                window[n] = i, i.onload = i.onerror = i.onabort = function() {
                    i.onload = i.onerror = i.onabort = null, window[n] = null, i = null, e && e(this.storageKey, t, !0);
                }, i.src = t;
            },
            resendLog: function() {
                var t = this.storage.getItem(this.storageKey);
                if (t) {
                    t = t.split("|");
                    for (var e = 0, i = t.length; i > e; e++) this.loadImage(decodeURIComponent(t[e]), this.storage.spliceItem);
                }
            },
            sendLogRequest: function(t) {
                var e = new Image(), i = +new Date(), n = "baidu_dan_log_" + i;
                window[n] = e, e.onload = e.onerror = e.onabort = function() {
                    try {
                        delete window[n];
                    } catch (t) {
                        window[n] = void 0;
                    }
                    e = null;
                }, t += t.indexOf("?") > -1 ? "&" : "?", t += ".stamp=" + Math.random(), e.src = t;
            },
            sendLog: function(t) {
                t = "object" === this.lang.getType(t) ? t : {};
                var e = t.url || this.config.LOG_URL, i = t.data || {}, n = t.option || "now", o = this.lang.serialize(i);
                switch (e += (e.indexOf("?") >= 0 ? "&" : "?") + o + (o ? "&" : "") + "rdm=" + +new Date(), 
                n) {
                  case "now":
                    this.loadImage(e);
                    break;

                  case "block":
                    break;

                  case "unload":
                  default:
                    this.storage.addItem(this.storageKey, e, !0), this.event.bind(window, "unload", function() {
                        this.loadImage(e, this.storage.spliceItem);
                    });
                }
            }
        }), i.define({
            name: "monitor",
            namespace: "dup.business",
            deps: {
                config: "dup.common.config",
                log: "dup.common.utility.log"
            },
            adFilterLog: function(t) {
                var e = this.config.HTTP_PROTOCOL + this.config.SBD_LOG + [ "?type=bdapp", "cn=" + t.cname, "host=" + window.location.host, "from=" + t.isBaiduApp, "style=" + t.adType, "display=" + t.display ].join("&");
                this.log.sendLogRequest(e);
            },
            expLog: function(t) {
                var e, i = t.id ? t.id : "", n = t.async ? t.async : "", o = t.type ? t.type : "ssplog", s = t.pos ? t.pos : "", r = t.status ? t.status : "", a = t.mes ? encodeURIComponent(t.mes) : "", d = t.exps ? t.exps : "";
                e = this.config.LOG_URL + [ "?type=" + o, "id=" + i, "pos=" + s, "status=" + r, "async=" + n, "mes=" + a, "exps=" + d, "from=ssp", "tm=" + +new Date() ].join("&"), 
                this.log.sendLogRequest(e);
            },
            sendLog: function(t) {
                if (t.response) {
                    var e = t.response.pdb_deliv.deliv_des, i = e._html, n = i && i.monitorUrl;
                    if (n) {
                        var o = new Image(), s = "log" + +new Date();
                        window[s] = o, "http" == n.substr(0, 4).toLowerCase() ? ("http://" == n.substr(0, 7).toLowerCase() && (n = n.replace("http://", "//")), 
                        "https://" == n.substr(0, 8).toLowerCase() && (n = n.replace("https://", "//"))) : n = "//" + n;
                        var r = function() {
                            o.onload = o.onerror = o.onabort = null;
                            try {
                                delete window[s];
                            } catch (t) {
                                window[s] = void 0;
                            }
                        };
                        o.onload = o.onerror = o.onabort = r, o.src = n;
                    }
                }
            }
        }), i.define({
            name: "painterSelector",
            namespace: "dup.business",
            deps: {
                asserter: "dup.ui.assertion.asserter"
            },
            getPainter: function(t) {
                var e = this.asserter.assert(t);
                if (e) return "dup.ui.painter." + e;
                for (var n = t.response, o = [ "bottomSearchBar", "inlayFix", "baiduRec", "dynamicFloat", "insideText", "mobile.inlayFix", "mobile.float" ], s = 0, r = o.length; r > s; s++) {
                    var a = i.using("dup.ui.assertion." + o[s]);
                    if (a && a.assert(n)) return "dup.ui.painter." + o[s];
                }
                e || (t.errors = t.errors || [], t.errors.push("painterName is empty"));
            }
        }), i.define({
            name: "businessParam",
            namespace: "dup.business.parameter",
            deps: {
                config: "dup.common.config",
                preview: "dup.business.preview",
                dom: "dup.common.utility.dom",
                origentation: "dup.business.origentation"
            },
            paramsList: [ {
                key: "dcb",
                value: function() {
                    return this.config.LOADER_DEFINE_NAME;
                }
            }, {
                key: "dtm",
                value: function() {
                    return this.config.SSP_JSONP;
                }
            }, {
                key: "dvi",
                value: function() {
                    return "0.0";
                }
            }, {
                key: "dci",
                value: function() {
                    return "-1";
                }
            }, {
                key: "dds",
                value: function() {
                    return "";
                }
            }, {
                key: "dpt",
                value: function() {
                    var t = "none";
                    return this.preview.isUnionPreview() && (t = "union"), t;
                }
            }, {
                key: "tsr",
                value: function() {
                    var t = 0, e = +new Date();
                    return this.config.startTime && (t = e - this.config.startTime), t;
                }
            }, {
                key: "tpr",
                value: function() {
                    var e, i = new Date().getTime();
                    e = t.DUP_4_SF ? t : this.dom.isInIframe(window) ? window.top : window;
                    var n = e.BAIDU_DUP2_pageFirstRequestTime;
                    return n ? i - n >= 24e4 && (n = e.BAIDU_DUP2_pageFirstRequestTime = i) : n = e.BAIDU_DUP2_pageFirstRequestTime = i, 
                    n || "";
                }
            }, {
                key: "cop",
                encode: !0,
                value: function() {
                    return this.origentation.getOrientationQuery();
                }
            }, {
                key: "ti",
                encode: !0,
                value: function() {
                    return this.dom.getDocumentTitle();
                }
            }, {
                key: "ari",
                value: function() {
                    return 2;
                }
            } ]
        }), i.define({
            name: "param",
            namespace: "dup.business",
            deps: {
                config: "dup.common.config",
                slotParams: "dup.business.parameter.slotParam",
                businessParams: "dup.business.parameter.businessParam",
                browserParams: "dup.business.parameter.browserParam",
                browser: "dup.common.utility.browser",
                systemParams: "dup.business.parameter.systemParam",
                additionalParam: "dup.business.parameter.additionalParam",
                style: "dup.common.utility.style",
                dom: "dup.common.utility.dom",
                preview: "dup.business.preview",
                requestCache: "dup.business.requestCache"
            },
            snap: function(t) {
                for (var e = [], i = t.paramsList, n = 0, o = i.length; o > n; n++) {
                    var s = i[n], r = s.key, a = s.encode, d = s.value, l = s.limit;
                    try {
                        d = "function" == typeof d ? d.apply(t) : d, d = a ? encodeURIComponent(d) : d, 
                        d = l ? d.substr(0, l) : d, e.push({
                            key: r,
                            value: d
                        });
                    } catch (t) {
                        var c = this.config.LOG_URL;
                        c += "?type=adcodex_error", c += "&info=" + encodeURIComponent(t.message), c += "&stack=" + encodeURIComponent(t.stack || ""), 
                        c += "&key=" + encodeURIComponent(r), c += "&t=" + new Date().getTime(), new Image().src = c;
                    }
                }
                return e;
            },
            processExtendsParam: function(t) {
                var e = t.response, i = e.placement.container;
                if (5 !== i.sizeType && 0 !== t.id.indexOf("u")) {
                    var n = e.pdb_deliv, o = e.rtb_deliv, s = e.order_deliv;
                    0 === parseInt(n.deliv_id, 10) && (n.deliv_id = 0), 0 === parseInt(n.demand_id, 10) && (n.demand_id = 0), 
                    0 === parseInt(o.deliv_id, 10) && (o.deliv_id = 0), 0 === parseInt(o.demand_id, 10) && (o.demand_id = 0), 
                    0 === parseInt(s.deliv_id, 10) && (s.deliv_id = 0), 0 === parseInt(s.demand_id, 10) && (s.demand_id = 0);
                    var r = e.extends || {};
                    if (r && r.hasOwnProperty("sspw") && r.hasOwnProperty("ssph")) {
                        var a = parseInt(r.sspw || 0, 10), d = parseInt(r.ssph || 0, 10), l = parseInt(r.cbsz || 0, 10);
                        if (a && d && (i.width = a, i.height = d), l > 0 && (i.sizeType = l), 1 === l) t.width = a, 
                        t.height = d; else if (2 === l) {
                            var c = this.translateScaleToPixelSize(a, d);
                            t.width = c.width, t.height = c.height;
                        }
                    }
                    var h = t.width || i.width, p = t.height || i.height;
                    if (0 === e.placement.complement_type) {
                        var u = this.dom.g(t.containerId);
                        u.style.width = h + "px", u.style.height = p + "px", u.style.display = "inline-block";
                    }
                }
            },
            translateScaleToPixelSize: function(t, e, i) {
                var n = i || {};
                return t = Math.abs(t), e = Math.abs(e), n.width || (n.width = Math.max(320, Math.min(window.innerWidth, window.innerHeight)), 
                isNaN(n.width) && (n.width = Math.min(this.style.getClientWidth(), this.style.getClientHeight()))), 
                n.height || (n.height = Math.ceil(n.width / t * e)), {
                    width: n.width,
                    height: n.height
                };
            },
            getParamObj: function(t) {
                var e = [];
                this.slotParams.setSlotInfo(t), this.browserParams.setSlotInfo(t), e = e.concat(this.snap(this.slotParams)), 
                e = e.concat(this.snap(this.businessParams)), e = e.concat(this.snap(this.browserParams)), 
                e = e.concat(this.snap(this.additionalParam)), e = e.concat(this.snap(this.systemParams));
                for (var i = {}, n = 0, o = e.length; o > n; n++) {
                    var s = e[n];
                    i[s.key] = s.value;
                }
                if (t.width > 0 && t.height > 0 && (i.sz = t.width + "x" + t.height), this.browser.baiduboxapp) {
                    t.rpdn && 0 !== location.protocol.indexOf("http") && (i.ltu = "https://" + t.rpdn);
                    var r = window || top.window;
                    r.articleTitle && (i.ti = r.articleTitle), r.MP && r.MP.globalConf && (i.utdi = encodeURIComponent(window.MP.globalConf.cuid) || "", 
                    i.atdi = encodeURIComponent(window.MP.globalConf.nid) || "");
                }
                var a = this.preview.getSearchParams(t.slotId);
                return i.mid = a.mid, i.sid = a.sid, i;
            },
            getParamString: function(t) {
                var e = [];
                for (var i in t) if (i && (t[i] || 0 === t[i]) && t.hasOwnProperty(i)) {
                    var n = t[i];
                    e.push(i + "=" + n);
                }
                if (window && window.location && window.location.ancestorOrigins && window.location.ancestorOrigins.length) {
                    var o = window.location.ancestorOrigins;
                    e.push("lto=" + encodeURIComponent(o[o.length - 1])), e.push("ltl=" + o.length);
                }
                return e.join("&");
            },
            getPmpRequestUrl: function(t) {
                var e = {}, i = [], n = t.paramObj;
                for (var o in n) o && n.hasOwnProperty(o) && (e[o] = n[o]);
                var s = t.timestampWatcher, r = s.t1, a = s.t2, d = s.t3, l = t.response;
                if (l) {
                    var c = l.placement.container;
                    e.qn = l.queryid, t.paramObj.qn = l.queryid;
                    var h = t.width, p = t.height;
                    h > 0 && p > 0 && (e.sz && (e.sz = ""), i.push("sz=" + h + "x" + p)), (t.pcwd || 5 === c.sizeType) && i.push("conwid=" + h), 
                    (t.pchd || 5 === c.sizeType) && i.push("conhei=" + p);
                    var u = l.pdb_deliv;
                    u.deliv_id && "0" !== u.deliv_id && i.push("pdbid=" + u.deliv_id), l.media_protect && "0" !== l.media_protect && i.push("mpdi=" + l.media_protect);
                    var m = l.order_deliv;
                    m.deliv_id && "0" !== m.deliv_id && i.push("orderid=" + m.deliv_id), m.demand_id && "0" !== m.demand_id && i.push("odid=" + m.demand_id);
                    var f = l.rtb_deliv;
                    f.deliv_id && "0" !== f.deliv_id && i.push("rtbid=" + f.deliv_id), f.demand_id && "0" !== f.demand_id && i.push("rdid=" + f.demand_id);
                    var g = l.placement.complement_type;
                    if (t.isNeedCacheRequest || 4 === g || 7 === g) {
                        var y = e.qn;
                        e.dpv = y, t.paramObj.dpv = y, this.requestCache.add(y, t);
                    }
                    0 === t.id.indexOf("u") ? i.push("dc=3") : i.push("dc=2"), s && r > 0 && (e.tt = r + "." + (a - r) + "." + (d - r) + "." + (+new Date() - r)), 
                    e.exps && (i.push("exps=" + e.exps), e.exps = "");
                }
                var v = i.join("&");
                return t.posUrl && (this.browser.antBrowser || t.proxy) ? t.posUrl + v + "&" + this.getParamString(e) : this.config.POS_URL + v + "&" + this.getParamString(e);
            }
        }), i.define({
            name: "slot",
            namespace: "dup.business",
            deps: {
                config: "dup.common.config",
                param: "dup.business.param",
                dom: "dup.common.utility.dom",
                log: "dup.common.utility.log",
                monitor: "dup.business.monitor",
                lang: "dup.common.utility.lang",
                style: "dup.common.utility.style",
                browser: "dup.common.utility.browser",
                storage: "dup.common.utility.storage",
                origentation: "dup.business.origentation"
            },
            slotIdCountMap: {},
            slotCount: 0,
            storageTime: {},
            $slot: function() {
                this.slotsMap = this.slotsMap || {}, this.win = window;
            },
            getSlotInfo: function(t) {
                return this.slotsMap[t];
            },
            getSlotInfoByRawId: function(t) {
                for (var e in this.slotsMap) if (this.slotsMap.hasOwnProperty(e) && e.indexOf(t) > -1) return this.slotsMap[e];
                return {};
            },
            createSlot: function(t) {
                var e = "" + t.slotId;
                this.slotIdCountMap[e] = this.slotIdCountMap[e] || 0;
                var i = {};
                return i.index = this.slotIdCountMap[e]++, i.count = 0 === e.indexOf("u") ? ++this.slotCount : 0, 
                i.id = e + "_" + i.index, i.containerId = this.config.DUP_PREFIX + "_wrapper_" + e + "_" + i.index, 
                i.slotId = t.slotId, i.productLine = t.productLine, i.errors = [], i.isAsync = t.isAsync, 
                this.setStatus(i.id, this.config.STATUS_CREATE), i.timestampWatcher = n ? {
                    t1: n
                } : {
                    t1: 0
                }, window.cproStyleApi ? i.styleOpenApi = window.cproStyleApi[e] || {} : i.styleOpenApi = {}, 
                0 === e.indexOf("u") && (i.productLine = "union", i.width = i.styleOpenApi.cpro_w || i.styleOpenApi.rsi0 || 0, 
                i.height = i.styleOpenApi.cpro_h || i.styleOpenApi.rsi1 || 0), i;
            },
            cloneSlot: function(t) {
                var e;
                return e = window.JSON && window.JSON.parse ? JSON.parse(JSON.stringify(t)) : this.lang.clone(t), 
                e.index = this.slotIdCountMap[e.slotId]++, e.id = e.slotId + "_" + e.index, e;
            },
            processSlot: function(t) {
                if (t.isPdbAd = !1, t.isNeedCacheRequest = !1, t.response) {
                    var e = t.response.rtb_deliv, i = t.response.order_deliv, n = t.response.pdb_deliv, o = parseInt(e.deliv_id, 10), s = parseInt(e.demand_id, 10), r = parseInt(i.deliv_id, 10), a = parseInt(i.demand_id, 10), d = parseInt(n.deliv_id, 10), l = t.response.placement, c = l && 7 === l.complement_type;
                    t.isPdbAd = !(o || s || r || a), t.isNeedCacheRequest = 0 !== o && c || 0 !== r || 0 !== o && 0 !== d;
                }
            },
            addSlot: function(t) {
                this.slotsMap[t.id] = t;
            },
            clearStatus: function(t, e) {
                t.status = t.status ^ e;
            },
            checkStatus: function(t, e) {
                return (t.status & e) > 0;
            },
            setStatus: function(t, e) {
                var i = this.getSlotInfo(t);
                i && (i.status |= e), (e & this.config.STATUS_CREATE) > 0 && (this.storageTime[t] = +new Date()), 
                (e & this.config.STATUS_FINISH) > 0 && this.adSlotFinish(t);
            },
            addErrorInfo: function(t, e) {
                t.errors = t.errors || [], t.errors.push(e);
            },
            adSlotFinish: function(t) {
                var e = {}, i = !1, n = this.getSlotInfo(t);
                if (n.response) {
                    var o = n.response ? n.response.pdb_deliv : {};
                    for (var s in this.origentation.watchingSlotsMap) if (s && this.origentation.watchingSlotsMap.hasOwnProperty(s) && this.origentation.watchingSlotsMap[s] && 0 === ("" + t).indexOf("" + s) && n.response) {
                        var r = o.deliv_des, a = r.width || 0, d = r.height || 0;
                        e[t] = 0 !== a && 0 !== d, i = !0;
                    }
                    i && this.origentation.slotFinishedCallback(e);
                }
            },
            process: function() {
                var t = this.slotsMap;
                for (var e in t) if (e && t[e] && t.hasOwnProperty(e)) {
                    var i = t[e];
                    if (i.status >= this.config.STATUS_REQUEST) continue;
                    this.createContainer(i), this.requestSlotInfo(i);
                }
            },
            requestSlotInfo: function(t) {
                this.config.FIRST_ONCESEACH || (this.config.FIRST_ONCESEACH = !0, this.dom.bind(window, "message", i.proxy(this, this.onMessageHandler)));
                var e = !1;
                t.paramObj = this.param.getParamObj(t), t.paramObj.exps = t.exps || this.config.EXP_ID;
                var n, o;
                t.posUrl && (this.browser.antBrowser || t.proxy) ? (t.paramObj.ctxant = "1", n = this.param.getParamString(t.paramObj), 
                o = t.posUrl + n) : (n = this.param.getParamString(t.paramObj), o = this.config.POS_URL + n), 
                t.paramObj.dtm = this.config.HTML_POST, t.timestampWatcher.t2 = +new Date();
                var s = !1;
                "union" === t.productLine && (s = !0), !0 === t.isAsync && (s = !0), e = this.reqLocalInfo(t), 
                e ? (this.setStatus(t.id, this.config.STATUS_REQUEST), window[this.config.LOADER_DEFINE_NAME](e)) : (this.sendJsonpRequest(o, s), 
                this.setStatus(t.id, this.config.STATUS_REQUEST));
            },
            onMessageHandler: function(t) {
                var e = (t.origin || t.originalEvent.origin, t.data);
                e && e.placement && e.placement.update && e.queryid && e.tuid && this.updateInfo(e);
            },
            updateInfo: function(t) {
                var e = {}, i = t.placement.update;
                this.storageSlotInfo = this.storage.getItem(t.tuid), this.storageSlotInfo && (e = this.lang.jsonToObj(this.storageSlotInfo), 
                this.storage.isAvailable && window.JSON && window.JSON.stringify && e && e.placement && e.placement.update && e.placement.update !== i && (t.adExpire = new Date().getTime(), 
                this.storage.setItem(t.tuid, JSON.stringify(t))));
            },
            reqLocalInfo: function(t) {
                try {
                    if (this.browser.ie && this.browser.ie < 9) return !1;
                    return !!this.storage.isAvailable && (this.storageSlotInfo = this.storage.getItem(t.id), 
                    !!this.storageSlotInfo && this.lang.jsonToObj(this.storageSlotInfo));
                } catch (n) {
                    var e = encodeURIComponent(n), i = {
                        type: "elog",
                        pos: "localAdInfo",
                        id: t.id,
                        mes: e,
                        exps: this.config.EXP_ID
                    };
                    this.monitor.expLog(i);
                }
            },
            adInfoStorage: function(t) {
                try {
                    var e = t.response || {}, i = !1;
                    e && e.pdb_deliv && e.pdb_deliv.deliv_des && e.pdb_deliv.deliv_des._html && (i = !0);
                    var n = !1;
                    e && e.tuid && (n = 0 === e.tuid.indexOf("u"));
                    var o = t.id;
                    !i && n && this.storage.isAvailable && window.JSON && window.JSON.stringify && o && !this.storageSlotInfo && (e.adExpire = new Date().getTime(), 
                    this.storage.setItem(o, JSON.stringify(e)));
                } catch (t) {}
            },
            createContainer: function(t) {
                if (!(t.status > this.config.STATUS_CREATE)) {
                    if (this.dom.g(t.containerId)) return void this.setStatus(t.id, this.config.STATUS_CREATE);
                    t.isAsync ? "union" === t.productLine && (t.containerId = "cpro_" + t.slotId) : (document.write('<div id="' + t.containerId + '"></div>'), 
                    this.dom.g(t.containerId) || this.createBackupWrapper(t)), this.setStatus(t.id, this.config.STATUS_CREATE);
                }
            },
            createBackupWrapper: function(t) {
                try {
                    var e = document.getElementsByTagName("script"), i = e[e.length - 1];
                    if (i) {
                        var n = i.parentNode;
                        if (n) {
                            var o = document.createElement("div");
                            return o.id = t.containerId, n.insertBefore(o, i), !0;
                        }
                    }
                } catch (t) {}
                return !1;
            },
            sendJsonpRequest: function(t, e) {
                if (e) {
                    var i = document.createElement("script");
                    i.type = "text/javascript", i.async = !0, i.src = t;
                    var n = document.getElementsByTagName("script")[0];
                    n && n.parentNode ? n.parentNode.insertBefore(i, n) : document.write('<script charset="utf-8" src="' + t + '"><\/script>');
                } else document.write('<script charset="utf-8" src="' + t + '"><\/script>');
            },
            adInfoIsAvailable: function(t) {
                var e = t.response;
                if (!e) return !0;
                var i = e.pdb_deliv, n = e.rtb_deliv, o = e.order_deliv, s = e.pdb_deliv.deliv_des, r = (s._html, 
                e.placement.complement_type);
                return !(!this.config.IS_PREVIEW && 0 === i.deliv_id && 0 === n.deliv_id && 0 === o.deliv_id && 7 == r);
            },
            getCurViewportWidth: function(t) {
                var e = this.isUnionPreview ? t : Math.max(320, this.win.innerWidth);
                return isNaN && isNaN(e) && (e = this.style.getClientWidth()), e;
            },
            processSlotInfo: function(t) {
                var e = {}, i = t.response.placement, n = i.basic;
                e.cname = n.cname;
                var o = i.container, s = (i.fillstyle, o.sizeType), r = o.width, a = o.height;
                if (t.styleOpenApi.scale) {
                    s = 2;
                    var d = t.styleOpenApi.scale, l = d.split(".");
                    r = l[0], a = l[1];
                }
                if (1 === s) e.width = r, e.height = a; else if (2 === s || 5 === s) {
                    t.pcwd || t.ftpc ? (e.wScale = t.pcwd || "-1", t.styleOpenApi.cpro_ftpc = "true") : e.wScale = r, 
                    t.pchd ? e.hScale = t.pchd : e.hScale = a;
                    var c = {}, h = t.styleOpenApi.cpro_ftpc || "true" === t.styleOpenApi.cpro_ftpc || "-1" === e.wScale;
                    h = 5 === s || h;
                    var p = this.dom.g(t.containerId);
                    h && p && p.parentElement.clientWidth && (c.width = p.parentElement.clientWidth || 0), 
                    "-1" === e.hScale && p && p.parentElement && (c.height = p.parentElement.clientHeight || 0);
                    var u = this.param.translateScaleToPixelSize(e.wScale, e.hScale, c);
                    o.width = u.width, o.height = u.height, t.width = u.width, t.height = u.height, 
                    e.width = u.width, e.height = u.height;
                } else if (3 === s) {
                    var m = this.getCurViewportWidth(r);
                    o.width = t.width = e.width = m, o.height = t.height = e.height = a;
                }
                e.sizeType = s;
                var f = t.styleOpenApi, g = f.cpro_w || f.rsi0 || 0, y = f.cpro_h || f.rsi1 || 0;
                return (g || y) && (e.width = g || this.getCurViewportWidth(r), e.height = y || a, 
                t.width = e.width, t.height = e.height), e;
            }
        }), i.define({
            name: "detect",
            namespace: "dup.business",
            deps: {
                config: "dup.common.config",
                log: "dup.common.utility.log",
                slot: "dup.business.slot"
            },
            $detect: function() {},
            sendLog: function(t) {
                t.url = "", t.host = window.location.hostname, t.from = "SSP", this.config.EXP_ID && (t.exp = this.config.EXP_ID), 
                this.log.sendLog({
                    data: t,
                    option: "now"
                });
            },
            checkFail: function() {
                var t = this.slot.slotsMap;
                for (var e in t) if (e && t.hasOwnProperty(e) && t[e]) {
                    var i = t[e], n = i.slotId, o = "";
                    i.response && (o = i.response.queryid);
                    var s = i.status, r = i.errors || [], a = decodeURIComponent(r.join(","));
                    a && this.sendLog({
                        type: "hlog",
                        exp: this.config.EXP_ID || "",
                        status: s,
                        pos: "checkFail",
                        id: n,
                        sid: o,
                        index: i.index,
                        errorInfo: a
                    });
                }
            }
        }), i.define({
            name: "viewWatch",
            namespace: "dup.business",
            deps: {
                dom: "dup.common.utility.dom",
                lang: "dup.common.utility.lang",
                style: "dup.common.utility.style",
                browser: "dup.common.utility.browser",
                log: "dup.common.utility.log",
                slot: "dup.business.slot"
            },
            analysisUrl: "//eclick.baidu.com/a.js",
            maxTime: 72e5,
            STATUS: {
                WAIT: 0,
                LOAD: 1,
                RUN: 2,
                UNLOAD: 3
            },
            opacity: {},
            clientParam: {},
            focusSwitch: !0,
            watchingList: null,
            intervalId: null,
            intervalTimeSpan: 500,
            isEventInited: !1,
            $viewWatch: function() {
                this.winFocused = !0, this.win = window, this.pageStayTime = null == this.pageStayTime ? 0 : this.pageStayTime, 
                this.intervalStatus = this.STATUS.WAIT;
            },
            viewWatch: function() {},
            regisetViewWatch: function(t) {
                this.isEventInited || (this.initializeEvent(), this.isEventInited = !0), this.watchingList = this.watchingList || [];
                var e = this.dom.g(t.containerId);
                if (e) {
                    var i = t.paramObj, n = t.width, o = t.height, s = "";
                    if (t.response) {
                        var r = t.response.placement, a = r.container;
                        n = a.width, o = a.height, s = t.response.queryid;
                    }
                    var d = new Date(), l = {
                        slotId: t.slotId,
                        domId: t.containerId,
                        jk: s,
                        word: i.ltu,
                        iframeStatus: i.dis,
                        aw: n,
                        ah: o,
                        viewContext: {
                            opacity: 1,
                            pageStayTime: 0,
                            pageStayTimeStamp: d,
                            inViewTime: 0,
                            inViewTimeStamp: d,
                            currViewStatus: !1,
                            focusTime: 0,
                            adViewTime: 0,
                            currAdViewStatus: !1,
                            adViewTimeStamp: d
                        }
                    };
                    this.calculateClientParam(l, e), this.watchingList.push(l);
                }
            },
            unregisetViewWatch: function(t) {
                if (this.watchingList) for (var e = t.containerId, i = 0; i < this.watchingList.length; i++) {
                    var n = this.watchingList[i];
                    if (n.domId == e) return void this.watchingList.splice(i, 1);
                }
            },
            buildAnalysisUrl: function(t, e) {
                if (t && e) {
                    var i = t + "?", n = e.viewContext;
                    n.inViewTime > this.maxTime && (n.inViewTime = this.maxTime), n.adViewTime > this.maxTime && (n.adViewTime = this.maxTime), 
                    n.pageStayTime >= this.maxTime && (n.pageStayTime = this.maxTime);
                    var o = [];
                    return o.push("tu=" + e.slotId), o.push("op=" + n.opacity), o.push("jk=" + e.jk), 
                    o.push("word=" + e.word), o.push("if=" + e.iframeStatus), o.push("aw=" + e.aw), 
                    o.push("ah=" + e.ah), o.push("pt=" + n.pageStayTime), o.push("it=" + n.inViewTime), 
                    o.push("vt=" + n.adViewTime), o.push("csp=" + e.desktopResolution), o.push("bcl=" + e.browserRegion), 
                    o.push("pof=" + e.pageRegion), o.push("top=" + e.top), o.push("left=" + e.left), 
                    i + o.join("&");
                }
            },
            initializeEvent: function() {
                this.windowOnLoadHandler(), this.dom.ready(i.proxy(this, this.windowOnLoadDelay), 2e3), 
                this.dom.bind(this.win, "beforeunload", i.proxy(this, this.windowOnUnloadHandler));
            },
            calculateClientParam: function(t, e) {
                var i = this.style.getPosition(e);
                t.left = i.left || 0, t.top = i.top || 0;
                var n = window.screen.availWidth, o = window.screen.availHeight;
                n > 1e4 && (n = 0), o > 1e4 && (o = 0), t.desktopResolution = n + "," + o, t.browserRegion = this.style.getClientWidth(window) + "," + this.style.getClientHeight(window), 
                t.pageRegion = this.style.getScrollWidth(window) + "," + this.style.getScrollHeight(window);
            },
            updateViewStatus: function(t, e) {
                var i, n, o, s = e.isInView, r = e.isAdView, a = new Date();
                return i = n = o = this.intervalTimeSpan, this.intervalStatus === this.STATUS.LOAD && (this.intervalStatus = this.STATUS.RUN, 
                i = n = 0, o = n = 0), t.currViewStatus ? (this.intervalStatus === this.STATUS.LOAD && (i = parseInt(a.getTime() - t.inViewTimeStamp.getTime(), 10), 
                0 > i ? i = 0 : i > this.intervalTimeSpan && (i = this.intervalTimeSpan)), t.inViewTime += i, 
                t.inViewTimeStamp = a) : s && (t.inViewTimeStamp = a), t.currViewStatus = s, t.currAdViewStatus ? (this.intervalStatus === this.STATUS.UNLOAD && (o = parseInt(a.getTime() - t.adViewTimeStamp.getTime(), 10), 
                0 > o ? o = 0 : o > this.intervalTimeSpan && (o = this.intervalTimeSpan)), t.adViewTime += o, 
                t.adViewTimeStamp = a) : r && (t.adViewTimeStamp = a), t.currAdViewStatus = r, t.pageStayTime = t.pageStayTime || 0, 
                this.pageStayTime = this.pageStayTime || 0, this.intervalStatus === this.STATUS.UNLOAD && (this.pageTimeSpan = parseInt(a.getTime() - t.pageStayTimeStamp.getTime(), 10), 
                0 > n ? n = 0 : n > this.intervalTimeSpan && (n = this.intervalTimeSpan)), t.pageStayTime += n, 
                this.pageStayTime += n, this.winFocused && (t.focusTime += n), t.pageStayTimeStamp = a, 
                t.opacity = e.opacity, t;
            },
            computeViewStatus: function(t) {
                var e = t.domId, i = this.dom.g(e);
                if (!i) return {
                    isInView: !1,
                    isAdView: !1,
                    opacity: 1
                };
                var n = !1, o = !1, s = 1;
                if (this.winFocused) try {
                    var r = this.style.getClientWidth(this.win), a = this.style.getClientHeight(this.win), d = this.getPosition(i), l = this.style.getOuterWidth(i), c = this.style.getOuterHeight(i);
                    s = this.getOpacity(t), n = d.top >= 0 && d.bottom <= a && d.left >= 0 && d.left <= r;
                    var h = d.top > 0 ? d.top : 0, p = d.bottom > a ? a : d.bottom, u = d.left > 0 ? d.left : 0, m = d.right > r ? r : d.right, f = l * c;
                    if (p > h && m > u) {
                        o = (p - h) * (m - u) > .5 * f;
                    }
                } catch (t) {}
                return {
                    isInView: n,
                    isAdView: o,
                    opacity: s
                };
            },
            getOpacity: function(t) {
                var e = t.domId;
                this.opacity[e] = this.opacity[e] || 0;
                var i = this.style.getOpacity(e);
                return 100 === i && (this.opacity[e] |= 1), 100 > i && i > 0 && (this.opacity[e] |= 2), 
                0 === i && (this.opacity[e] |= 4), this.opacity[e];
            },
            getPosition: function(t) {
                var e = this.style.getPositionCore(t), i = this.style.getScrollLeft(window), n = this.style.getScrollTop(window), o = this.style.getOuterWidth(t, !1), s = this.style.getOuterHeight(t, !1);
                return {
                    top: e.top - n,
                    bottom: e.top - n + s,
                    left: e.left - i,
                    right: e.left - i + o,
                    topAbs: e.top,
                    bottomAbs: e.top + s,
                    leftAbs: e.left,
                    rightAbs: e.left + o
                };
            },
            viewableCompute: function() {
                if (this.watchingList) {
                    var t, e;
                    for (t = 0, e = this.watchingList.length; e > t; t++) {
                        var i = this.watchingList[t], n = this.computeViewStatus(i);
                        i.viewContext = this.updateViewStatus(i.viewContext, n), i.analysisUrl = this.buildAnalysisUrl(this.analysisUrl, i);
                    }
                }
            },
            viewOnChange: function() {
                this.viewableCompute(), this.pageStayTime >= this.maxTime && this.windowOnUnloadHandler(!1);
            },
            windowOnLoadHandler: function(t) {
                this.intervalStatus = this.STATUS.LOAD, this.registerFocusEvent(this.win), (!this.browser.ie || this.browser.ie && this.browser.ie > 6) && this.viewOnChange(), 
                this.intervalId = setInterval(i.proxy(this, this.viewOnChange), this.intervalTimeSpan);
            },
            windowOnLoadDelay: function(t) {
                var e, i, n, o, s;
                for (e = 0, i = this.watchingList.length; i > e; e++) (n = this.watchingList[e]) && (s = n.domId, 
                s && (o = this.win.document.getElementById(s)), o && (n.clientParam = n.clientParam || {}, 
                this.calculateClientParam(n, o)));
            },
            windowOnUnloadHandler: function(t) {
                try {
                    if (clearInterval(this.intervalId), this.intervalStatus !== this.STATUS.RUN) return void (this.intervalStatus = this.STATUS.UNLOAD);
                    this.intervalStatus = this.STATUS.UNLOAD, this.viewableCompute();
                    for (var e = 0, i = this.watchingList.length; i > e; e++) {
                        var n = this.watchingList[e];
                        n && n.analysisUrl && !n.isSended && (n.isSended = !0, 0 === e && (n.analysisUrl += "&total=" + this.watchingList.length), 
                        this.log.sendLog({
                            url: n.analysisUrl
                        }));
                    }
                    if (t) {
                        var o, s = new Date().getTime();
                        if (this.browser.ie) for (o = s + 200; o > s; ) s = new Date().getTime(); else {
                            for (var i = 1e5, e = 0; i > e; e++) ;
                            o = new Date().getTime(), i = 2e7 / (o - s), i = i > 1e7 ? 1e7 : i;
                            for (var e = 0; i > e; e++) ;
                        }
                    }
                } catch (t) {}
            },
            registerFocusEvent: function(t) {
                var t = t || this.win;
                this.winFocused = !0, this.browser.ie ? (this.dom.bind(t, "focusin", i.proxy(this, this.allDomOnFocusHandler)), 
                this.dom.bind(t, "focusout", i.proxy(this, this.allDomOnBlurHandler))) : (this.dom.bind(t, "focus", i.proxy(this, this.allDomOnFocusHandler)), 
                this.dom.bind(t, "blur", i.proxy(this, this.allDomOnBlurHandler)));
            },
            allDomOnFocusHandler: function(t) {
                this.winFocused = !0;
            },
            allDomOnBlurHandler: function(t) {
                this.winFocused = !1;
            }
        }), i.define({
            name: "unionDelivery",
            namespace: "dup.business.delivery",
            deps: {
                slot: "dup.business.slot"
            },
            launch: function() {
                var t, e = window.cpro_id;
                window.cpro_id = null, e && (t = this.slot.createSlot({
                    slotId: e,
                    productLine: "union",
                    isAsync: !1
                }), this.slot.addSlot(t));
                var i = window.cproArray;
                if (window.cproArray = null, i) for (var n = 0, o = i.length; o > n; n++) t = this.slot.createSlot({
                    slotId: i[n].id,
                    productLine: "union",
                    isAsync: !0
                }), this.slot.addSlot(t);
                var s = window.cpro_mobile_slot;
                if (window.cpro_mobile_slot = null, s) for (var n = 0, o = s.length; o > n; n++) {
                    var r = s[n];
                    t = this.slot.createSlot({
                        slotId: r.id,
                        productLine: "union",
                        isAsync: !0
                    }), t.styleOpenApi = t.styleOpenApi || {};
                    for (var a in r) a && r[a] && r.hasOwnProperty(a) && (t.styleOpenApi[a] = r[a]);
                    this.slot.addSlot(t);
                }
                this.slot.process();
            }
        }), i.define({
            name: "dupDelivery",
            namespace: "dup.business.delivery",
            deps: {
                slot: "dup.business.slot",
                interface: "dup.business.interface"
            },
            launch: function() {
                this.delieveryObjArray = this.delieveryObjArray || [], window.BAIDU_DUP = window.BAIDU_DUP || [], 
                window.BAIDU_DUP && window.BAIDU_DUP instanceof Array && (this.delieveryObjArray = this.delieveryObjArray.concat(window.BAIDU_DUP), 
                window.BAIDU_DUP = []), this.updateApi(), this.process();
            },
            updateApi: function() {
                window.BAIDU_DUP = this, window.BAIDU_DUP.load = !0, this.interface.register("fill", this, this.fill), 
                this.interface.register("fillAsync", this, this.fillAsync);
            },
            process: function() {
                for (var t = 0, e = this.delieveryObjArray.length; e > t; t++) {
                    var i = this.delieveryObjArray[t];
                    if (i instanceof Array) {
                        var n = i.splice(0, 1)[0], o = i;
                        this.interface.perform(n, o);
                    }
                }
                this.delieveryObjArray = [], this.slot.process();
            },
            push: function(t) {
                this.delieveryObjArray = this.delieveryObjArray && [], this.delieveryObjArray.push(t), 
                this.process();
            },
            fill: function(t) {
                var e = this.slot.createSlot({
                    slotId: t,
                    productLine: "dup",
                    isAsync: !1
                });
                this.slot.addSlot(e), this.slot.process();
            },
            fillAsync: function(t, e) {
                var i = this.slot.createSlot({
                    slotId: t,
                    productLine: "dup",
                    isAsync: !0
                });
                i.containerId = e, this.slot.addSlot(i), this.slot.process();
            }
        }), i.define({
            name: "standardDelivery",
            namespace: "dup.business.delivery",
            deps: {
                config: "dup.common.config",
                slot: "dup.business.slot",
                interface: "dup.business.interface",
                param: "dup.business.param",
                data: "dup.common.utility.data",
                additionalParam: "dup.business.parameter.additionalParam"
            },
            launch: function() {
                this.delieveryObjArray = this.delieveryObjArray || [], window.slotbydup = window.slotbydup || [], 
                window.slotbydup && window.slotbydup instanceof Array && (this.delieveryObjArray = this.delieveryObjArray.concat(window.slotbydup), 
                window.slotbydup = []), this.updateApi(), this.process();
            },
            process: function() {
                for (var t, e = 0, i = this.delieveryObjArray.length; i > e; e++) {
                    var n = this.delieveryObjArray[e];
                    if (n.hasOwnProperty("id")) {
                        var o = !1;
                        if (n.hasOwnProperty("isAsync") && n.isAsync ? o = n.isAsync : n.hasOwnProperty("async") && n.async && (o = n.async), 
                        t = this.slot.createSlot({
                            slotId: n.id,
                            productLine: "adcodex",
                            isAsync: o
                        }), n.hasOwnProperty("pos") && n.pos && (t.posUrl = this.config.HTTP_PROTOCOL + "//" + n.pos + "/s?", 
                        t.pcn = n.pos), this.additionalParam.paramCheck(t, n), t.containerId = n.container || t.containerId, 
                        t.display = n.display, t.rpdn = n.rpdn || "", t.ftpc = n.ftpc || !1, t.size = n.size || "", 
                        t.pcwd = n.pcwd || "", t.pchd = n.pchd || "", t.proxy = n.proxy || "", t.exps = n.exps || "", 
                        !t.styleOpenApi.cpro_w && !t.styleOpenApi.cpro_h) {
                            var s, r = n.size;
                            if (r && r.indexOf(":") > -1) {
                                s = r.split(":");
                                var a = this.param.translateScaleToPixelSize(s[0], s[1]);
                                t.width = a.width, t.height = a.height;
                            }
                        }
                        this.slot.addSlot(t);
                        var d = "cpro_set_baiduRec_jsonpCb";
                        n[d] && n.hasOwnProperty(d) && this.data.putInfo("baiduRecCallback", n.cpro_set_baiduRec_jsonpCb || "");
                    } else this.interface.executeTask(n);
                }
                this.delieveryObjArray = [], this.slot.process();
            },
            updateApi: function() {
                window.slotbydup = this, window.slotbydup.load = !0;
            },
            push: function(t) {
                this.delieveryObjArray = this.delieveryObjArray && [], this.delieveryObjArray.push(t), 
                this.process();
            }
        }), i.define({
            name: "expand",
            namespace: "dup.ui.painter",
            deps: {
                config: "dup.common.config",
                dom: "dup.common.utility.dom",
                style: "dup.common.utility.style",
                event: "dup.common.utility.event",
                slot: "dup.business.slot"
            },
            validate: function(t) {
                return !0;
            },
            sendMessage: function(t, e) {
                var i = this.slot.getSlotInfo(t), n = this.dom.g(i.containerId);
                if (n) {
                    var o = n.getElementsByTagName("iframe")[0];
                    e = JSON.stringify(e), o.contentWindow.postMessage(e, "*");
                }
            },
            getComputedWidth: function(t) {
                return window.getComputedStyle ? window.getComputedStyle(t).width : t.currentStyle.width;
            },
            init: function() {
                function t(t) {
                    if ("string" != typeof i) return !1;
                    var i = JSON.parse(t.data);
                    if (!i.title || "baidudup" != i.title) return !1;
                    if ("invokeMethod" === i.type) switch (i.method) {
                      case "expand":
                        e.expandAd(i.parameters[0]);
                        break;

                      case "close":
                        e.collapseAd(i.parameters[0]);
                    }
                }
                var e = this;
                (window.addEventListener || window.attachEvent) && JSON && JSON.parse && this.event.bind(window, "message", t), 
                this.event.bind(window, "scroll", function() {
                    e.adjustPosWhenViewportChanged();
                }), this.event.bind(window, "resize", function() {
                    e.adjustPosWhenViewportChanged();
                });
            },
            adjustPosWhenViewportChanged: function() {
                var t = this.scrollObserver;
                t.up, t.down, t.left, t.right;
                for (var e in t) for (var i in t[e]) {
                    var n = t[e][i];
                    if (!n.isExpand) return;
                    var o = n.origin, s = o.getElementsByTagName("iframe")[0], r = (n.targetWidth, n.targetHeight, 
                    n.originWidth);
                    switch (n.originHeight, e) {
                      case "up":
                      case "down":
                        var a = parseInt(this.getComputedWidth(o), 10);
                        s.style.left = 0;
                        break;

                      case "left":
                        var a = parseInt(this.getComputedWidth(o));
                        s.style.right = a - r + "px";
                        break;

                      case "right":
                        var a = parseInt(this.getComputedWidth(o));
                        s.style.left = 0;
                    }
                }
            },
            $expand: function() {
                this.observerObjs = [], this.expandStatus = {}, this.timers = {}, this.hasInit = !1, 
                this.maxExpandTime = 5e3, this.canFixed = this.style.canFixed(), this.scrollObserver = {
                    up: {},
                    down: {},
                    left: {},
                    right: {}
                };
            },
            registerScrollSubject: function(t, e, i, n, o, s, r) {
                if (!this.scrollObserver[t][e]) {
                    var a = this.scrollObserver[t][e] = {};
                    a.isExpand = !0, a.origin = i, a.originWidth = n, a.originHeight = o, a.targetWidth = s, 
                    a.targetHeight = r;
                }
            },
            expand2Up: function(t, e, i, n, o, s) {
                this.registerScrollSubject("up", t, e, i, n, o, s);
                var r = e.getElementsByTagName("iframe")[0];
                parseInt(this.getComputedWidth(e)), r.style.bottom = 0, r.style.left = 0;
            },
            expand2Down: function(t, e, i, n, o, s) {
                this.registerScrollSubject("down", t, e, i, n, o, s);
                var r = e.getElementsByTagName("iframe")[0];
                parseInt(this.getComputedWidth(e)), r.style.top = 0, r.style.left = 0;
            },
            expand2Left: function(t, e, i, n, o, s) {
                this.registerScrollSubject("left", t, e, i, n, o, s);
                var r = e.getElementsByTagName("iframe")[0], a = parseInt(this.getComputedWidth(e));
                r.style.bottom = 0, r.style.right = a - i + "px";
            },
            expand2Right: function(t, e, i, n, o, s) {
                this.registerScrollSubject("right", t, e, i, n, o, s);
                var r = e.getElementsByTagName("iframe")[0];
                parseInt(this.getComputedWidth(e)), r.style.bottom = 0, r.style.left = 0;
            },
            expandAd: function(t) {
                if (!this.expandStatus[t]) {
                    this.expandStatus[t] = !0;
                    var e = this.slot.getSlotInfoByRawId(t), i = e.response.placement.container, n = i.width, o = i.height, s = e.response.placement.container.slide, r = s.slideWidth, a = s.slideHeight, d = 1e3 * parseInt(s.extendTime, 10), l = parseInt(s.slideMode, 10), c = parseInt(s.direction, 10), h = e.containerId, p = this.dom.g(h), u = p.getElementsByTagName("iframe")[0];
                    if (1 === c || 2 === c ? (u.setAttribute("height", a), u.style.height = a + "px") : 3 !== c && 4 !== c || (u.setAttribute("width", r), 
                    u.style.width = r + "px"), 2 == l && 2 == c || 2 == l && 4 == c) switch (c) {
                      case 2:
                        u.setAttribute("height", a), u.style.height = a + "px";
                        break;

                      case 4:
                        u.setAttribute("width", r), u.style.width = r + "px";
                    } else switch (p.style.position = "relative", u.style.position = "absolute", p.style.height = o + "px", 
                    c) {
                      case 1:
                        this.expand2Up(t, p, n, o, r, a);
                        break;

                      case 2:
                        this.expand2Down(t, p, n, o, r, a);
                        break;

                      case 3:
                        this.expand2Left(t, p, n, o, r, a);
                        break;

                      case 4:
                        this.expand2Right(t, p, n, o, r, a);
                    }
                    var m = this;
                    this.timers[t] = setTimeout(function() {
                        m.expandStatus[t] && m.collapseAd(t);
                    }, Math.min(d));
                }
            },
            collapseAd: function(t) {
                if (this.expandStatus[t]) {
                    this.expandStatus[t] = !1, clearTimeout(this.timers[t]);
                    var e = this.slot.getSlotInfoByRawId(t), i = e.response.placement.container, n = i.width, o = i.height, s = e.containerId, r = this.dom.g(s), a = r.getElementsByTagName("iframe")[0];
                    r.style.position = "", r.style.width = "", r.style.height = "", r.style.top = "", 
                    r.style.left = "", a.style.position = "", a.style.display = "", a.style.top = "", 
                    a.style.left = "", a.style.right = "", a.style.width = "", a.style.height = "", 
                    a.setAttribute("height", o), a.setAttribute("width", n);
                    for (var d in this.scrollObserver) for (var l in this.scrollObserver[d]) l === t && (this.scrollObserver[d][l].isExpand = !1);
                }
            },
            observer: function(t) {
                var t = this.slot.getSlotInfoByRawId(t.slotId), e = t.response.placement.container.slide, i = t.containerId, n = this.dom.g(i);
                e.slideMode, e.direction, n.style.textAlign = "left", this.hasInit || (this.hasInit = !0, 
                this.init());
            },
            fire: function(t, e) {
                var i, n = this.slot.getSlotInfoByRawId(e), o = n.response.placement.container.slide;
                o && (i = o.trigger), [ "", "BEFORE_PAGELOAD", "AFTER_PAGECLOSE", "PAGE_PERCENT", "mouseover", "click", "adloaded", "SLIP" ][function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t);
                }(i) ? i[0] : i || 0] === t && this.sendMessage(e, {
                    title: "baidudup",
                    type: "eventHappen",
                    parameters: [ t ]
                });
            }
        }), i.define({
            name: "frame",
            namespace: "dup.business",
            deps: {
                config: "dup.common.config",
                slot: "dup.business.slot",
                material: "dup.business.material",
                log: "dup.common.utility.log",
                browser: "dup.common.utility.browser",
                requestCache: "dup.business.requestCache",
                param: "dup.business.param",
                lang: "dup.common.utility.lang",
                data: "dup.common.utility.data",
                viewWatch: "dup.business.viewWatch",
                creativePreview: "dup.business.creativePreview"
            },
            checkRichAdType: function(t) {
                for (var e = "", i = [ "dui-lian", "popup", "right-down", "slide", "top-down", "barrier" ], n = 0; n < i.length; n++) if (t.indexOf(i[n]) > -1) {
                    e = i[n];
                    break;
                }
                return e;
            },
            cacheRequestCallback: function(t) {
                var e = t.html || "success";
                if ("success" !== e) {
                    var n = this.requestCache.get(t.dpv), o = n.response.pdb_deliv.deliv_des;
                    o = o._html || {};
                    var s = n.response, r = s.pdb_deliv, a = s.rtb_deliv, d = s.order_deliv;
                    if (0 === parseInt(r.deliv_id, 10) && (0 !== parseInt(d.deliv_id, 10) || 0 !== parseInt(a.deliv_id, 10)) && "success" !== e && 7 === s.placement.complement_type) {
                        var l = document.getElementById(n.containerId), c = document.getElementById(n.containerId + "_left"), h = document.getElementById(n.containerId + "_right");
                        return l && (this.viewWatch.unregisetViewWatch(n), l.parentNode.removeChild(l)), 
                        c && c.parentNode.removeChild(c), void (h && h.parentNode.removeChild(h));
                    }
                    if (n) if (o.type && "rich" === o.type) {
                        var p = this.material.formatMaterial(o, n), u = document.getElementById(n.containerId), m = "<!DOCTYPE html><body>";
                        p.indexOf(m) > -1 && (p = p.slice(m.length));
                        var f = this.checkRichAdType(p);
                        if ("popup" === f) u.style.display = "none"; else if ("barrier" === f) {
                            u.style.display = "none";
                            var g = document.getElementById(n.containerId + "_placeholder");
                            g && (g.style.display = "none");
                        }
                        var y = i.using("dup.ui.painter.richMaterial");
                        y.render(n, !0);
                    } else {
                        var v = this.requestCache.secondResult[t.dpv];
                        this.slot.clearStatus(n, this.config.STATUS_FINISH), n.isPdbAd = !0, n.isNeedCacheRequest = !1, 
                        v.outerHTML = this.getFrameHTML(n);
                    }
                }
            },
            requireDomainPolicy: function() {
                var t = document.createElement("iframe"), e = !1;
                return t.src = "about:blank", document.body.insertBefore(t, document.body.firstChild), 
                e = function(t) {
                    try {
                        return !t.contentWindow.document;
                    } catch (t) {
                        return !0;
                    }
                }(t), document.body.removeChild(t), this.requireDomainPolicy = function() {
                    return e;
                }, e;
            },
            requireBlankPolicy: function() {
                var t = navigator.userAgent, e = !(!t || !t.match(/iphone.*micromessenger/i));
                return this.requireBlankPolicy = function() {
                    return e;
                }, e;
            },
            renderFrame: function(t, e) {
                var i = this.slot.getSlotInfo(t);
                if (i && !this.slot.checkStatus(i, this.config.STATUS_FINISH)) {
                    var n = i.response.pdb_deliv.deliv_des;
                    n = n._html;
                    var o = this.getFrameUrl();
                    if (this.requireDomainPolicy() && e.getAttribute("src", 2) !== o) return void (e.src = o);
                    if (n && "url" === n.type) return e.src = n.content, void this.slot.setStatus(i.id, this.config.STATUS_FINISH);
                    try {
                        this.slot.setStatus(i.id, this.config.STATUS_FINISH);
                        var s = this.material.formatMaterial(n, i);
                        s.indexOf("<body>") < 0 && (s = "<!DOCTYPE html><body>" + s);
                        var r = e.contentWindow.document;
                        r.open("text/html", "replace"), r.write(s), r.body && (r.body.style.backgroundColor = "transparent");
                    } catch (t) {}
                }
            },
            getFrameUrl: function() {
                return this.requireDomainPolicy() ? this.data.getConfig("domainPolicyFileUrl") || "/domain-policy.htm" : this.requireBlankPolicy() ? this.data.getConfig("blankPolicyFileUrl") || "/blank-policy.htm" : "about:blank";
            },
            getFrameHTML: function(t, e) {
                if (e = e || "iframe" + t.id, t.proxy) {
                    e = String.fromCharCode(Math.floor(26 * Math.random()) + 97) + Math.random().toString(36).slice(2) + t.id;
                }
                t.iframeId = e;
                var i = this.processFrameData(t);
                return this.renderFrameHTML(i);
            },
            processFrameData: function(t) {
                var e, n, o = "", s = [];
                if (t.response) {
                    var r = t.response.placement;
                    n = r.container;
                    try {
                        s = r.fillstyle.elements || [];
                    } catch (t) {}
                }
                var a = t.width || n && n.width, d = t.height || n && n.height, l = this.creativePreview.getPreviewUrl(a, d, s, t.displayType || "inlay");
                if (l) e = l; else if (t.isPdbAd) {
                    var c = this.config.DUP_PREFIX + "renderFrame";
                    this.data.defineOnce(c, i.proxy(this, this.renderFrame)), e = this.getFrameUrl(), 
                    o = 'onload="' + c + "('" + t.id + "', this);\"";
                } else if (t.isNeedCacheRequest) {
                    var h = this.config.DUP_PREFIX + "cacheRequest";
                    this.data.defineOnce("adsbybaidu_callback", i.proxy(this, this.cacheRequestCallback)), 
                    this.data.defineOnce(h, i.proxy(this.requestCache, this.requestCache.cacheRequest)), 
                    e = this.param.getPmpRequestUrl(t), o = 'onload="' + h + "('" + t.paramObj.dpv + "', this);\"";
                } else e = this.param.getPmpRequestUrl(t);
                var p = {};
                return p.iframeId = t.iframeId, p.srcAttriName = "src", p.onloadDefine = o, p.iframeWidth = "" + a, 
                p.iframeHeight = "" + d, p.url = e, p;
            },
            renderFrameHTML: function(t) {
                var e = [ "<iframe", ' id="{iframeId}"', ' name="{iframeId}"', " {onloadDefine}", ' {srcAttriName}="{url}"', ' width="{iframeWidth}"', ' height="{iframeHeight}"', ' align="center,center"', ' vspace="0"', ' hspace="0"', ' marginwidth="0"', ' marginheight="0"', ' scrolling="no"', ' frameborder="0"', ' style="border:0;vertical-align:bottom;margin:0;width:{iframeWidth}px;height:{iframeHeight}px"', ' allowtransparency="true">', "</iframe>" ].join("");
                return this.lang.template(e, t);
            }
        }), i.define({
            name: "richMaterial",
            namespace: "dup.ui.painter",
            deps: {
                dom: "dup.common.utility.dom",
                config: "dup.common.config",
                slot: "dup.business.slot",
                param: "dup.business.param",
                frame: "dup.business.frame",
                log: "dup.business.monitor",
                data: "dup.common.utility.data"
            },
            isNeededNode: function(t, e) {
                return t.nodeName && t.nodeName.toUpperCase() === e.toUpperCase();
            },
            evalScript: function(t, e) {
                try {
                    var i = document.createElement("script");
                    i.type = "text/javascript", t.src ? i.src = t.src : i.text = t.text || t.textContent || t.innerHTML || "", 
                    e.insertBefore(i, e.firstChild);
                } catch (t) {
                    this.monitor.expLog({
                        error: "createscripterror",
                        status: "renderFail"
                    });
                }
            },
            render: function(t, e) {
                try {
                    if (!t.response) return;
                    var i = t.response, n = (i.rtb_deliv, i.order_deliv, i.pdb_deliv.deliv_des), o = n._html, s = t.isNeedCacheRequest;
                    if (!e && (!o || "rich" !== o.type || s)) return !1;
                    var r = o.content;
                } catch (t) {}
                if (!t.isAsync && !s) return document.write(r), this.slot.setStatus(t.id, this.config.STATUS_FINISH), 
                !0;
                var a = this.dom.g(t.containerId);
                if (a && t.isAsync && ("clb" === t.productLine || "dup" === t.productLine) && !s) {
                    var d = this.frame.getFrameHTML(t);
                    return a.innerHTML = d, !0;
                }
                if (!a) return !1;
                a.innerHTML = '<span style="display: none">ie</span>' + r;
                for (var l = a.childNodes, c = [], h = 0; l[h]; h++) !this.isNeededNode(l[h], "script") || l[h].type && "text/javascript" !== l[h].type.toLowerCase() || c.push(l[h]);
                c.reverse();
                for (var p = 0, u = c.length; u > p; p++) this.evalScript(c[p].parentNode.removeChild(c[p]), a);
                return !0;
            }
        }), i.define({
            name: "floatBlock",
            namespace: "dup.ui.painter",
            deps: {
                config: "dup.common.config",
                style: "dup.common.utility.style",
                log: "dup.common.utility.log",
                dom: "dup.common.utility.dom",
                lang: "dup.common.utility.lang",
                cookie: "dup.common.utility.cookie",
                unicode: "dup.common.utility.unicode",
                frame: "dup.business.frame",
                slot: "dup.business.slot",
                deliveryLimit: "dup.business.deliveryLimit"
            },
            GAP: 5,
            NORMAL_CLOSE_BTN_HEIGHT: 17,
            COUPLET_CLOSE_BTN_HEIGHT: 20,
            validate: function(t) {
                if ("union" === t.productLine) {
                    var e = this.deliveryLimit.TYPE.POPUP;
                    "couplet" !== t.blockType && "button" !== t.blockType || (e = this.deliveryLimit.TYPE.COUPLET);
                    if (!this.validateLimit(e)) return !1;
                    this.deliveryLimit.setAdsCount(e, t.domId);
                }
                var i = this.getCloseCookieName(t);
                return 2 !== t.closeType || !this.cookie.get(i);
            },
            validateLimit: function(t) {
                var e = this.deliveryLimit.getAdCount(t);
                return this.deliveryLimit.MAX_COUNT[t] > e || void 0;
            },
            createBlockHtmlTemplate: function(t) {
                var e = [ "{iframe}", "{closeBtn}" ].join("");
                if (!t.blockType || "default" === t.blockType) return e;
                var i = [ "box-sizing: content-box;", "width:{width}px;", "height:{height}px;", "padding:4px;", "border:#acacac 1px solid;", "overflow:hidden;" ];
                return "button" !== t.blockType && "popup" !== t.blockType || i.push("position:absolute;left:0;top:" + (this.COUPLET_CLOSE_BTN_HEIGHT + this.GAP) + "px;"), 
                e = [ '<div style="' + i.join("") + '">', "{iframe}", "</div>", "{closeBtn}" ].join("");
            },
            createCloseElement: function(t) {
                var e = {}, i = t.domId + "_closebtn", n = this;
                return e.couplet = function() {
                    var e = [ "box-sizing: content-box;", "position:absolute;", "width:" + t.containerWidth + "px;", "height:20px;", "top:" + (t.containerHeight - this.COUPLET_CLOSE_BTN_HEIGHT) + "px;", "left:0;", "cursor:pointer;", "background-color:#999999;", "color:#fff;font-size:12px;", "font-family: " + n.unicode.toDecode("\\u5FAE\\u8F6F\\u96C5\\u9ED1") + ";", "text-align:center;line-height:20px;" ].join("");
                    return '<div id="' + i + '" style="' + e + '">' + n.unicode.toDecode("\\u5173\\u95ED") + "</div>";
                }, e.button = e.popup = function() {
                    var e = t.containerWidth - 61, o = [ "box-sizing: content-box;", "position:absolute;width:61px;", "height:20px;top:0;", "left:" + e + "px;", "margin:0;padding:0;margin-bottom:5px;", "cursor:pointer;overflow:hidden;" ].join("");
                    return [ '<div id="' + i + '" style="' + o + '">', '<div style="', "box-sizing: content-box;", "width:40px;height:20px;", "background-color:#999999;", "color:#fff;float:left;", "margin-right:1px;font-size:12px;", "font-family:" + n.unicode.toDecode("\\u5FAE\\u8F6F\\u96C5\\u9ED1") + ";", "text-align: center;line-height:20px;", '">' + n.unicode.toDecode("\\u5173\\u95ED") + "</div>", '<a style="maring:0;padding:0;', "display:inline-block;border:none;", "overflow:hidden;height:20px;", "line-height:20px;cursor:pointer;", "width:20px;background:url(", "'https://cpro.baidustatic.com/cpro/ui/", "noexpire/img/2.0.1/xuanfu_close.png", "') no-repeat 0 0;margin-bottom:3px;", 'float:left" ></a>', "</div>" ].join("");
                }, e.default = function() {
                    var e = [ "box-sizing: content-box;", "height:15px;", "border:1px solid #e1e1e1;", "background:#f0f0f0;", "margin:0;", "padding:0;", "overflow:hidden;" ].join(""), i = [ "box-sizing: content-box;", "float:right;", "clear:right;", "margin:2px 5px 0 0;", "width:39px;", "height:13px;", "cursor:pointer;", "background:url(https://cpro.baidustatic.com/cpro/ui/noexpire/img/clb/1.0.0/close.gif) no-repeat scroll 0 0;" ].join("");
                    return [ '<div style="' + e + '">', '<span id="' + t.domId + '_closebtn" style="' + i + '" ', "onmouseover=\"this.style.backgroundPosition='0 -20px';\" ", "onmouseout=\"this.style.backgroundPosition='0 0';\" ", ">", "</span>", "</div>" ].join("");
                }, e[t.blockType]();
            },
            getVerticalStyle: function(t) {
                var e = t.vSpace || 10;
                "center" === t.verticalType && (e = .5 * (this.style.getClientHeight() - t.containerHeight));
                var i = t.verticalType;
                return i && "center" !== i || (i = "top"), {
                    cssName: i,
                    cssValue: e
                };
            },
            getHorizontalStyle: function(t) {
                var e = t.hSpace || 10;
                if (t.contentWidth > 0 && 1 === t.dockType) {
                    var i = Math.floor(.5 * (this.style.getClientWidth() - t.contentWidth));
                    i >= t.width && (t.horizontalType, e = i - t.containerWidth - e);
                } else "center" === t.horizontalType && (e = .5 * (this.style.getClientWidth() - t.containerWidth));
                var n = t.horizontalType;
                return n && "center" !== n || (n = "left"), {
                    cssName: n,
                    cssValue: e
                };
            },
            createContainerElementByInfo: function(t) {
                var e = null;
                this.dom.g(t.domId) ? e = this.dom.g(t.domId) : (e = document.createElement("div"), 
                e.id = t.domId);
                var i = [ "box-sizing: content-box;", "width: " + t.containerWidth + "px;", "height: " + t.containerHeight + "px;", "overflow: hidden;", "z-index: 2147483647;" ];
                if (1 === t.followType) {
                    if (this.style.canFixed()) i.push("position: fixed;"); else {
                        i.push("position: absolute;"), this.updatePosition(t, e);
                        var n = this;
                        this.dom.bind(window, "scroll", function() {
                            n.updatePosition(t, t.domId);
                        }), this.dom.bind(window, "resize", function() {
                            n.updatePosition(t, t.domId);
                        });
                    }
                    var o = this.getVerticalStyle(t), s = this.getHorizontalStyle(t);
                    i.push(o.cssName + ":" + o.cssValue + "px;"), i.push(s.cssName + ":" + s.cssValue + "px;");
                } else {
                    i.push("position: absolute;");
                    var o = this.getVerticalStyle(t), s = this.getHorizontalStyle(t);
                    i.push(o.cssName + ":" + o.cssValue + "px;"), i.push(s.cssName + ":" + s.cssValue + "px;");
                }
                return e.style.cssText = i.join(""), e;
            },
            updatePosition: function(t, e) {
                var i = this.dom.g(e);
                if (i) {
                    var n = i.style, o = "CSS1Compat" !== document.compatMode, s = document.body ? document.body : document.documentElement, r = o ? s : document.documentElement, a = (r.clientWidth, 
                    r.clientHeight), d = (window.pageXOffset || r.scrollLeft, window.pageYOffset || r.scrollTop);
                    t.contentWidth > 0 && t.dockType, "top" === t.verticalType || 0 === t.verticalType.length ? n.top = d + t.vSpace + "px" : n.top = d + a - t.vSpace - t.containerHeight + "px";
                }
            },
            getCloseCookieName: function(t) {
                var e = "bd_close_" + t.id;
                return "couplet" !== t.blockType && "button" !== t.blockType || (e += "_" + t.horizontalType), 
                e;
            },
            setCookieClose: function(t) {
                var e = this.getCloseCookieName(t), i = new Date();
                i.setTime(i.getTime() + 9e5), this.cookie.set(e, !0, {
                    expires: i,
                    path: "/"
                });
            },
            registEvent: function(t) {
                var e = t.domId + "_closebtn", n = this.dom.g(e);
                this.dom.bind(n, "click", i.proxy(this, this.closeBtnOnClickHandler)), this.dom.bind(n, "mouseover", i.proxy(this, this.closeBtnOnMouseOverHandler)), 
                this.dom.bind(n, "mouseout", i.proxy(this, this.closeBtnOnMouseOutHandler));
            },
            closeBtnOnClickHandler: function() {
                var t = document.getElementById(this.info.domId);
                t && t.parentNode && t.parentNode.removeChild(t), 2 === this.info.closeType && this.setCookieClose(this.info);
                var e = {
                    jk: this.info.queryId || "",
                    dt: new Date().getTime(),
                    rnd: Math.floor(2147483648 * Math.random())
                };
                try {
                    this.log.loadImage(this.lang.template("//eclick.baidu.com/fcb.jpg?jk={jk}&dt={dt}&rnd={rnd}", e));
                } catch (t) {}
            },
            closeBtnOnMouseOverHandler: function() {
                var t = this.info.domId + "_closebtn", e = this.dom.g(t);
                if (e) if ("couplet" === this.info.blockType) e.style.backgroundColor = "#0066cc"; else if ("popup" === this.info.blockType || "button" === this.info.blockType) {
                    var i = e.getElementsByTagName("div")[0];
                    i.style.backgroundColor = "#0066cc";
                    var n = e.getElementsByTagName("a")[0];
                    n.style.backgroundImage = "url(https://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.0/xuanfu_mouseover_close.png)";
                }
            },
            closeBtnOnMouseOutHandler: function() {
                var t = this.info.domId + "_closebtn", e = this.dom.g(t);
                if (e) if ("couplet" === this.info.blockType) e.style.backgroundColor = "#999999"; else if ("popup" === this.info.blockType || "button" === this.info.blockType) {
                    var i = e.getElementsByTagName("div")[0];
                    i.style.backgroundColor = "#999999";
                    var n = e.getElementsByTagName("a")[0];
                    n.style.backgroundImage = "url(https://cpro.baidustatic.com/cpro/ui/noexpire/img/2.0.1/xuanfu_close.png)";
                }
            },
            autoClose: function() {
                var t = document.getElementById(this.adInfo.domId);
                t && t.parentNode && t.parentNode.removeChild(t);
            },
            render: function(t, e) {
                if (this.validate(t)) {
                    this.info = t;
                    var n = this.createCloseElement(t), o = this.createBlockHtmlTemplate(t), s = {
                        width: t.width,
                        height: t.height,
                        iframe: this.frame.getFrameHTML(e),
                        closeBtn: n
                    }, r = this.createContainerElementByInfo(t);
                    r.innerHTML = this.lang.template(o, s), this.dom.g(t.domId) || document.body.insertBefore(r, document.body.firstChild), 
                    this.registEvent(t);
                    var a = t.closeTime || 0;
                    a > 0 && setTimeout(i.proxy(this, this.autoClose), 1e3 * a), e.isPdbAd || this.slot.setStatus(e.id, this.config.STATUS_FINISH);
                }
            }
        }), i.define({
            name: "inlayFix",
            namespace: "dup.ui.painter.mobile",
            deps: {
                config: "dup.common.config",
                lang: "dup.common.utility.lang",
                style: "dup.common.utility.style",
                dom: "dup.common.utility.dom",
                slot: "dup.business.slot",
                param: "dup.business.param",
                expand: "dup.ui.painter.expand",
                monitor: "dup.business.monitor",
                browser: "dup.common.utility.browser",
                frame: "dup.business.frame",
                richMaterial: "dup.ui.painter.richMaterial",
                landingPage: "dup.ui.painter.landingPage"
            },
            $inlayFix: function() {
                this.win = window;
            },
            getCurViewportWidth: function(t) {
                var e = this.isUnionPreview ? t : Math.max(320, this.win.innerWidth);
                return isNaN && isNaN(e) && (e = this.style.getClientWidth()), e;
            },
            parseHtmlSnippet: function(t) {
                var e = [ '<div style="box-sizing: content-box;width:{width}px;height:{height}px;position:relative;margin:0 auto;">', "{closeBtnHtml}", "{iframeHtml}", "</div>" ].join("");
                return this.lang.template(e, t);
            },
            decorateContainer: function(t, e) {
                if (t) {
                    t.style.cssText = [ "box-sizing: content-box;", "text-align:center;", "display:block;", "font-size:0;", "width:100%;", "height:" + e.height + "px;" ].join("");
                }
            },
            validate: function(t) {
                if (/m.baidu.com/gi.test(window.document.referrer) || this.browser.baiduboxapp) {
                    var e = {
                        cname: t.cname,
                        isBaiduApp: this.browser.baiduboxapp ? "1" : "0",
                        adType: "inlay",
                        display: "1"
                    };
                    this.monitor.adFilterLog(e);
                }
                return !0;
            },
            render: function(t) {
                if (this.slot.setStatus(t.id, this.config.STATUS_RENDERED), !this.slot.adInfoIsAvailable(t)) return !1;
                this.monitor.sendLog(t), t.displayType = "inlay-mobile";
                var e = this.dom.g(t.containerId);
                if (e) {
                    this.monitor.sendLog(t);
                    var i = this;
                    if (this.richMaterial.render(t)) return void (this.supportPostMessage && setTimeout(function() {
                        i.expand.fire("adloaded", t.id);
                    }, 800));
                    this.landingPage.activate(t);
                    var n = this.slot.processSlotInfo(t);
                    if (this.validate(n)) {
                        if (this.decorateContainer(e, n), t.width = n.width, t.height = n.height, 2 === n.sizeType || 5 === n.sizeType) {
                            var o = t.response.pdb_deliv.deliv_des;
                            if (o && o._html) {
                                o = o._html;
                                var s = o.type;
                                "text" !== s && "image" !== s && "flash" !== s || (o.width = t.width, o.height = t.height);
                            }
                        }
                        var r = {
                            id: t.id,
                            width: n.width,
                            height: n.height,
                            closeBtnHtml: "",
                            iframeHtml: this.frame.getFrameHTML(t)
                        }, a = this.parseHtmlSnippet(r);
                        e.innerHTML = a, t.isPdbAd || this.slot.setStatus(t.id, this.config.STATUS_FINISH);
                    }
                }
            }
        }), i.define({
            name: "float",
            namespace: "dup.ui.painter.mobile",
            deps: {
                config: "dup.common.config",
                lang: "dup.common.utility.lang",
                style: "dup.common.utility.style",
                dom: "dup.common.utility.dom",
                cookie: "dup.common.utility.cookie",
                slot: "dup.business.slot",
                frame: "dup.business.frame",
                monitor: "dup.business.monitor",
                richMaterial: "dup.ui.painter.richMaterial",
                browser: "dup.common.utility.browser",
                hiddenFloatAd: "dup.ui.painter.hiddenFloatAd"
            },
            $float: function() {},
            float: function() {},
            containerFilter: function(t) {
                var e = !1, i = t.response.placement, n = i.container;
                if (2 === n.location) return !1;
                var o = 3.4;
                if (1 !== n.sizeType) {
                    e = !(o > n.width / n.height);
                }
                if (t.styleOpenApi) {
                    if (t.styleOpenApi.rsi0 || t.styleOpenApi.rsi1) {
                        e = !(o > t.width / t.height);
                    }
                    if (t.styleOpenApi.cpro_w || t.styleOpenApi.cpro_h) {
                        e = !(o > t.width / t.height);
                    }
                    if (t.styleOpenApi.scale) {
                        var s = t.styleOpenApi.scale.split(".");
                        e = !(o > s[0] / s[1]);
                    }
                }
                return e;
            },
            processSlotInfo: function(t) {
                var e = t.response.placement, i = e.container, n = e.fillstyle, o = parseFloat(n.opacity || .9), s = n.backgroundColor || "#000", r = this.slot.processSlotInfo(t);
                r.backgroundOpacity = o, r.backgroundColor = s;
                var a = i.location;
                return 2 !== a && 3 !== a && (a = 3), r.locationType = a, r.containerId = t.containerId, 
                r.closeType = i.closeType, r;
            },
            parseHtmlSnippet: function(t) {
                var e = [ '<div style="width:{width}px;height:{height}px;position:relative;margin:0 auto;">', "{closeBtnHtml}", "{iframeHtml}", "</div>" ].join("");
                return this.lang.template(e, t);
            },
            parseCloseBtnLayoutData: function(t) {
                var e = window.devicePixelRatio || 1, i = t.width / t.height, n = (Math.max(document.documentElement.clientWidth, window.innerWidth || 0), 
                1 === e ? 4 : 8);
                return i >= 10 && (n = 4), {
                    domId: t.containerId,
                    padding: n,
                    top: 0,
                    closeBtnWidth: "16",
                    closeBtnHeight: 16,
                    closeBtnImgUrl: "https://cpro.baidustatic.com/img/ssp_mob_float_3x.png"
                };
            },
            parseCloseButtonHtml: function(t) {
                var e = [ "<div", ' id="{domId}_closebtn"', ' style="', "box-sizing: content-box;", "position:absolute;", "right:0px;", "top:{top}px;", "padding:{padding}px;", "width:{closeBtnWidth}px;", "height:{closeBtnHeight}px;", "overflow:hidden;", "background:url('{closeBtnImgUrl}') no-repeat 0 0;", "cursor:pointer;", "background-position:center;", "background-size:50% 50%;", 'z-index:2147483647;">&nbsp;</div>' ].join(""), i = this.parseCloseBtnLayoutData(t);
                return this.lang.template(e, i);
            },
            decorateContainer: function(t, e) {
                if (t) {
                    var i = "absolute";
                    this.style.canFixed() && (i = "fixed");
                    var n = "";
                    2 === e.locationType ? n = "top" : 3 === e.locationType && (n = "bottom");
                    var o = 0;
                    "absolute" === i && (o = this.style.getScrollTop(window) + this.style.getClientHeight(window) - e.height);
                    t.style.cssText = [ "box-sizing: content-box;", "position:" + i, "z-index:2147483647;", n + ":" + o, "background-color:" + e.backgroundColor, "opacity:" + e.backgroundOpacity, "text-align:center", "display:block", "font-size:0", "left:0", "width:100%", "height:" + e.height + "px" ].join(";");
                }
            },
            getCloseCookieKey: function(t) {
                return "bd_close_" + t.id;
            },
            closeBtnOnClickHandler: function(t, e) {
                var i = this.dom.g(e.containerId);
                if (i && i.parentNode && i.parentNode.removeChild(i), 2 === e.closeType) {
                    var n = "bd_close_" + this.id, o = {
                        path: ""
                    };
                    this.cookie.set(n, !0, o);
                }
            },
            validate: function(t) {
                var e = !0, i = "bd_close_" + this.id, n = this.cookie.get(i, window);
                if (2 === t.closeType && n && (e = !1), /m.baidu.com/gi.test(window.document.referrer) || this.browser.baiduboxapp) {
                    e = !1;
                    var o = {
                        cname: t.cname,
                        isBaiduApp: this.browser.baiduboxapp ? "1" : "0",
                        adType: "float",
                        display: "0"
                    };
                    this.monitor.adFilterLog(o);
                }
                return e;
            },
            render: function(t) {
                if (!this.slot.adInfoIsAvailable(t)) return !1;
                this.slot.setStatus(t.id, this.config.STATUS_RENDERED), this.id = t.id, t.displayType = "inlay-mobile";
                var e = this.processSlotInfo(t);
                if (this.validate(e)) {
                    this.monitor.sendLog(t);
                    if (!this.richMaterial.render(t)) {
                        var n = this.dom.g(t.containerId);
                        if (n && (t.width = e.width, t.height = e.height, this.containerFilter(t))) {
                            this.decorateContainer(n, e);
                            var o = this.parseCloseButtonHtml(e);
                            if (2 === e.sizeType) {
                                var s = t.response.pdb_deliv.deliv_des;
                                if (s && s._html) {
                                    s = s._html;
                                    var r = s.type;
                                    "text" !== r && "image" !== r && "flash" !== r || (s.width = t.width, s.height = t.height);
                                }
                            }
                            var a = {
                                id: t.id,
                                width: n.clientWidth,
                                height: e.height,
                                closeBtnHtml: o,
                                iframeHtml: this.frame.getFrameHTML(t)
                            }, d = this.parseHtmlSnippet(a);
                            n.innerHTML = d;
                            var l = this.dom.g(t.containerId + "_closebtn");
                            l && this.dom.bind(l, "click", i.proxy(this, this.closeBtnOnClickHandler, t)), this.hiddenFloatAd.render(t), 
                            t.isPdbAd || this.slot.setStatus(t.id, this.config.STATUS_FINISH);
                        }
                    }
                }
            }
        }), i.define({
            name: "clbDelivery",
            namespace: "dup.business.delivery",
            deps: {
                slot: "dup.business.slot",
                frame: "dup.business.frame",
                interface: "dup.business.interface",
                config: "dup.common.config",
                log: "dup.common.utility.log",
                origentation: "dup.business.origentation",
                data: "dup.common.utility.data"
            },
            clbSlotArr: {
                BAIDU_CLB_fillSlot: !0,
                BAIDU_CLB_singleFillSlot: !0,
                BAIDU_CLB_fillSlotWithSize: !0,
                BAIDU_CLB_fillSlotAsync: !0,
                BAIDU_CLB_preloadSlots: !0
            },
            launch: function() {
                var t;
                try {
                    var e = window.BAIDU_CLB_SLOT_ID;
                    window.BAIDU_CLB_SLOT_ID = null, e && (t = this.slot.createSlot({
                        slotId: e,
                        productLine: "clb",
                        isAsync: !1
                    }), this.slot.addSlot(t), this.slot.process());
                    for (var n in this.clbSlotArr) "BAIDU_CLB_preloadSlots" === n ? this.data.defineOnce(n, i.proxy(this, this.reSet)) : this.data.defineOnce(n, i.proxy(this, this.getClbFillSlot));
                    this.updateApi();
                } catch (t) {}
            },
            reSet: function() {},
            getClbFillSlot: function(t, e) {
                var i;
                t && !e && (i = this.slot.createSlot({
                    slotId: t,
                    productLine: "clb",
                    isAsync: !1
                })), t && e && (i = this.slot.createSlot({
                    slotId: t,
                    productLine: "clb",
                    isAsync: !0
                }), i.containerId = e), this.slot.addSlot(i), this.slot.process();
            },
            updateApi: function() {
                try {
                    this.data.defineOnce("BAIDU_CLB_prepareMoveSlot", i.proxy(this, this.prepareMove)), 
                    this.data.defineOnce("BAIDU_DUP_addSlotStatusCallback", i.proxy(this.origentation, this.origentation.addSlotStatusCallback)), 
                    this.data.defineOnce(this.config.DUP_PREFIX + "renderFrame", i.proxy(this.frame, this.frame.renderFrame)), 
                    this.data.defineOnce("BAIDU_CLB_setConfig", i.proxy(this.data, this.data.putConfig)), 
                    this.data.defineOnce("BAIDU_CLB_addOrientation", i.proxy(this.origentation, this.origentation.addOrientation)), 
                    this.data.defineOnce("BAIDU_CLB_addOrientationOnce", i.proxy(this.origentation, this.origentation.addOrientationOnce)), 
                    this.data.defineOnce("BAIDU_CLB_setOrientationOnce", i.proxy(this.origentation, this.origentation.setOrientationOnce)), 
                    this.data.defineOnce("BAIDU_CLB_addSlot", i.proxy(this, this.reSet)), this.data.defineOnce("BAIDU_CLB_enableAllSlots", i.proxy(this, this.reSet)), 
                    this.data.defineOnce("BAIDU_CLB_SETHTMLSLOT", i.proxy(this, this.reSet));
                } catch (t) {}
            },
            prepareMove: function(t) {
                try {
                    for (var e = 0, i = t + "_" + e; this.slot.getSlotInfo(i) && 0 !== this.slot.getSlotInfo(i)[0]; ) {
                        var n = this.slot.getSlotInfo(i);
                        this.slot.clearStatus(n, this.config.STATUS_FINISH), i = t + "_" + ++e;
                    }
                } catch (t) {}
            }
        }), i.define({
            name: "inlayFix",
            namespace: "dup.ui.painter",
            deps: {
                config: "dup.common.config",
                dom: "dup.common.utility.dom",
                slot: "dup.business.slot",
                frame: "dup.business.frame",
                viewWatch: "dup.business.viewWatch",
                richMaterial: "dup.ui.painter.richMaterial",
                monitor: "dup.business.monitor",
                expand: "dup.ui.painter.expand",
                event: "dup.common.utility.event",
                lang: "dup.common.utility.lang",
                browser: "dup.common.utility.browser",
                deliveryLimit: "dup.business.deliveryLimit"
            },
            $inlayFix: function() {
                this.supportPostMessage = !(this.browser.ie && this.browser.ie < 8);
            },
            bindEvent4Expand: function(t) {
                var e = this.dom.g(t.containerId), i = this;
                this.event.bind(e, "mouseover", function(e) {
                    var n = e.target || e.srcElement;
                    "iframe" !== n.tagName.toLowerCase() && "iframe" !== n.nodeName.toLowerCase() || i.expand.fire("mouseover", t.id);
                });
            },
            validate: function(t) {
                if ("union" === t.productLine) {
                    var e = this.deliveryLimit.getSlotType(t), i = this.deliveryLimit.validate(t);
                    return i && this.deliveryLimit.setAdsCount(e, t.containerId), i;
                }
                return !0;
            },
            render: function(t) {
                this.slot.setStatus(t.id, this.config.STATUS_RENDERED);
                var e = this.dom.g(t.containerId);
                if (!this.slot.adInfoIsAvailable(t)) return this.slot.setStatus(t.id, this.config.STATUS_FINISH), 
                !1;
                t.displayType = "inlay";
                var i = null == t.response ? null : t.response.placement.container.slide, n = !(!i || this.lang.isEmptyObj(i) || !this.supportPostMessage);
                if (n && (this.expand.observer(t), this.bindEvent4Expand(t)), this.validate(t)) {
                    this.monitor.sendLog(t);
                    var o = this.richMaterial.render(t), s = this;
                    if (o) return void (this.supportPostMessage && setTimeout(function() {
                        s.expand.fire("adloaded", t.id);
                    }, 800));
                    if (!e) return void this.slot.addErrorInfo(t, "container dom not founded");
                    var r = this.frame.getFrameHTML(t);
                    e.innerHTML = r, this.viewWatch.regisetViewWatch(t), t.isPdbAd || this.slot.setStatus(t.id, this.config.STATUS_FINISH), 
                    n && setTimeout(function() {
                        s.expand.fire("adloaded", t.id);
                    }, 800);
                }
            }
        }), i.define({
            name: "float",
            namespace: "dup.ui.painter",
            deps: {
                config: "dup.common.config",
                dom: "dup.common.utility.dom",
                lang: "dup.common.utility.lang",
                frame: "dup.business.frame",
                slot: "dup.business.slot",
                richMaterial: "dup.ui.painter.richMaterial",
                monitor: "dup.business.monitor",
                expand: "dup.ui.painter.expand",
                floatBlock: "dup.ui.painter.floatBlock",
                viewWatch: "dup.business.viewWatch"
            },
            GAP: 5,
            NORMAL_CLOSE_BTN_HEIGHT: 17,
            COUPLET_CLOSE_BTN_HEIGHT: 20,
            validate: function(t) {
                var e = t.response.placement, i = e.container, n = i.floated;
                if (this.dom.isInIframe(window)) return !1;
                var o = parseInt(n.clientw || 0, 10);
                return o > 4095 && (o = 4095), !(o >= screen.width);
            },
            processSlotInfo: function(t) {
                var e = t.response.placement, i = e.container, n = i.floated, o = n.dockType, s = i.closeType, r = i.closeTime || 0, a = n.vspace || 0, d = n.hspace || 0, l = t.response.rtb_deliv.deliv_id && t.response.order_deliv.deliv_id, c = t.width || i.width, h = t.height || i.height, p = +c, u = +h, m = [ "default", "couplet", "button", "popup" ], f = parseInt(n.blockType || 0, 10), g = m[f];
                "default" !== g && (p += 2 * this.GAP + 1, u += 2 * this.GAP + 1), u += "couplet" === g ? this.COUPLET_CLOSE_BTN_HEIGHT : "button" === g || "popup" === g ? this.COUPLET_CLOSE_BTN_HEIGHT + this.GAP : this.NORMAL_CLOSE_BTN_HEIGHT;
                var y = i.location, v = "", w = "";
                switch (y) {
                  case 1:
                    v = "center", w = "center";
                    break;

                  case 2:
                    v = "top";
                    break;

                  case 3:
                    v = "bottom";
                    break;

                  case 4:
                    w = "left";
                    break;

                  case 5:
                    w = "right";
                    break;

                  case 7:
                    v = "top", w = "left";
                    break;

                  case 8:
                    v = "top", w = "right";
                    break;

                  case 9:
                    v = "bottom", w = "left";
                    break;

                  case 10:
                    v = "bottom", w = "right";
                }
                0 === a && "button" === g ? (v = "bottom", a = 40) : 0 === a && "couplet" === g && (v = "top", 
                a = 150);
                var b = t.response.queryid;
                return {
                    id: t.id,
                    domId: t.containerId,
                    width: c,
                    height: h,
                    containerWidth: p,
                    containerHeight: u,
                    verticalType: v,
                    horizontalType: w,
                    followType: n.follow || 1,
                    blockType: g,
                    dockType: o,
                    closeType: s,
                    closeTime: r,
                    vSpace: a,
                    hSpace: d,
                    contentWidth: n.contw,
                    isRTB: l,
                    queryId: b,
                    productLine: t.productLine
                };
            },
            render: function(t) {
                if (this.validate(t)) {
                    if (this.slot.setStatus(t.id, this.config.STATUS_RENDERED), !this.slot.adInfoIsAvailable(t)) return !1;
                    t.displayType = "float", this.monitor.sendLog(t);
                    if (!this.richMaterial.render(t)) {
                        var e = [];
                        e.push(t);
                        var n = t.response.placement, o = n.container;
                        if (6 === parseInt(o.location || 0, 10)) {
                            e = [];
                            var s = this.slot.cloneSlot(t), r = this.slot.cloneSlot(t);
                            s.response.placement.container.location = 5, s.containerId = s.containerId + "_right", 
                            this.slot.addSlot(s), e.push(s), r.response.placement.container.location = 4, r.containerId = r.containerId + "_left", 
                            this.slot.addSlot(r), e.push(r);
                        }
                        for (var a = 0, d = e.length; d > a; a++) {
                            var l = e[a];
                            i.create(this.floatBlock).render(this.processSlotInfo(l), l);
                        }
                        this.viewWatch.regisetViewWatch(t);
                    }
                }
            }
        }), i.define({
            name: "main",
            namespace: "dup.ui.delivery",
            deps: {
                config: "dup.common.config",
                slot: "dup.business.slot",
                fingerPrint: "dup.business.fingerPrint",
                data: "dup.common.utility.data",
                storage: "dup.common.utility.storage",
                loader: "dup.common.loader",
                painterSelector: "dup.business.painterSelector",
                origentation: "dup.business.origentation",
                param: "dup.business.param",
                detect: "dup.business.detect",
                interface: "dup.business.interface",
                monitor: "dup.business.monitor",
                scene: "dup.business.sceneTactics",
                clbDelivery: "dup.business.delivery.clbDelivery",
                unionDelivery: "dup.business.delivery.unionDelivery",
                dupDelivery: "dup.business.delivery.dupDelivery",
                standardDelivery: "dup.business.delivery.standardDelivery",
                inlayFixPainter: "dup.ui.painter.inlayFix",
                floatPainter: "dup.ui.painter.float",
                mobileInlayFixPainter: "dup.ui.painter.mobile.inlayFix",
                mobileFloatPainter: "dup.ui.painter.mobile.float"
            },
            process: function() {
                this.prepareApi(), this.unionDelivery.launch(), this.dupDelivery.launch(), this.clbDelivery.launch(), 
                this.standardDelivery.launch(), this.fingerPrint.start();
            },
            prepareApi: function() {
                this.interface.register("addOrientation", this.origentation, this.origentation.addOrientation), 
                this.interface.register("addOrientationOnce", this.origentation, this.origentation.addOrientationOnce), 
                this.interface.register("setOrientationOnce", this.origentation, this.origentation.setOrientationOnce), 
                this.data.defineOnce(this.config.LOADER_DEFINE_NAME, i.proxy(this, this.callback));
            },
            callback: function(t) {
                try {
                    var e = this.slot.getSlotInfo(t.tuid);
                    e.response = t, this.slot.setStatus(e.id, this.config.STATUS_RESPONSE), this.slot.processSlot(e), 
                    e.timestampWatcher.t3 = new Date().getTime(), this.slot.adInfoStorage(e), this.param.processExtendsParam(e);
                    var n = this.painterSelector.getPainter(e);
                    if (!n) return;
                    var o = i.using(n);
                    o ? o.render(e) : n && this.loader.load(e.id, n, i.proxy(this, this.painterLoadedCallback, n, e));
                } catch (e) {
                    var s = encodeURIComponent(e), r = {
                        type: "fatalError",
                        pos: "callback",
                        id: t.tuid,
                        mes: s
                    };
                    this.monitor.expLog(r);
                }
            },
            painterLoadedCallback: function(t, e) {
                var n = i.using(t);
                n && n.render(e);
            }
        }), i.using("dup.ui.delivery.main").process();
    }();
} catch (t) {
    var url = [ "//eclick.baidu.com/se.jpg?", "type=fatalError", "data=0712", "mes=" + encodeURIComponent(t) ].join("&"), img = new Image();
    img.src = url;
}