/**
 * @modified $Author: 牟少峰 $
 * @version $Rev: 8c22e4313774bce0a89dd2b5346156b2b08fad23 $
 */
!
function($, require, define) {
	require.config({
		enable_ozma: true
	});
	define("page/find/play/statistics", ["tui/net"], function(e) {
		var t = [{
			id: "#module_basic_title",
			mid: "001",
			mname: "title_area",
			spm: "a2h0j.8191423"
		}, {
			id: "#module-interact",
			mid: "002",
			mname: "interact",
			spm: "a2h0j.8191423"
		}, {
			id: "#module_basic_sub",
			mid: "003",
			mname: "subscribe",
			spm: "a2h0j.8191423",
			type: "click"
		}, {
			id: "#module_basic_relationleft",
			mid: "004",
			mname: "recshow",
			spm: "a2h0j.8191423"
		}, {
			id: "#module_basic_star",
			mid: "005",
			mname: "starrec",
			spm: "a2h0j.8191423"
		}, {
			id: "#module_basic_comment",
			mid: "006",
			mname: "comment",
			spm: "a2h0j.8191423"
		}, {
			id: "#module_basic_playlist",
			mid: "007",
			mname: "playlist",
			spm: "a2h0j.8191423"
		}, {
			id: "#module_basic_info",
			mid: "008",
			mname: "plistinfo",
			spm: "a2h0j.8191423"
		}, {
			id: "#module_basic_relation",
			mid: "009",
			mname: "relatedshows",
			spm: "a2h0j.8191423"
		}, {
			id: "#yk-player-curtain",
			mid: "1001",
			mname: "showcase",
			spm: "a2h0j.8191423"
		}, {
			id: "#show_vv_broadcast",
			mid: "1002",
			mname: "target",
			spm: "a2h0j.8191423"
		}, {
			id: "#playlistIkuAD",
			mid: "1003",
			mname: "highlight",
			spm: "a2h0j.8191423"
		}, {
			id: "#db11AdBanner",
			mid: "1009",
			mname: "tmall_lead",
			spm: "a2h0j.8191423"
		}];
		var i = {
			showUrl: "//gm.mmstat.com/yt/show.index.module",
			clickUrl: "//gm.mmstat.com/yt/click.index.module",
			init: function() {
				var e = this,
					t;
				e.mshow();
				$(document).ready(function() {
					t && clearTimeout(t);
					t = setTimeout(function() {
						e.otherId("yk-player-curtain", "click")
					}, 500);
					t = setTimeout(function() {
						e.otherId("show_vv_broadcast", "click")
					}, 500);
					t = setTimeout(function() {
						e.otherId("playlistIkuAD", "click")
					}, 500);
					t = setTimeout(function() {
						e.otherId("module_basic_playlist a", "mousedown")
					}, 500);
					t = setTimeout(function() {
						e.otherId("db11AdBanner", "click")
					}, 500)
				});
				$(window).scroll(function() {
					t && clearTimeout(t);
					t = setTimeout(function() {
						e.mshow()
					}, 300)
				})
			},
			otherId: function(e, i) {
				var n = this;
				if (0 != $("#" + e).children().length) {
					$("#" + e).click(function() {
						for (var i = 0; i < t.length; i++) if ("#" + e == t[i].id) n.ShowLog(i, t[i].id, t[i].mid, t[i].mname, t[i].spm, "click")
					});
					$("#" + e).mousedown(function() {
						for (var e = 0; e < t.length; e++) if ("#module_basic_playlist" == t[e].id) n.ShowLog(e, t[e].id, t[e].mid, t[e].mname, t[e].spm, "mousedown")
					})
				}
			},
			mshow: function() {
				var e = this;
				for (var i = 0; i < t.length; i++) {
					var n = $(t[i].id);
					if (!e.checkPosition(n)) continue;
					if (0 != n.length && 0 != n.children().length && !! !n.attr("modshow")) {
						n = n.attr("modshow", 1);
						var a = n.attr("id");
						e.reportShowLog(a);
						if ("1" == n.attr("modshow")) continue
					}
					if (!a) return true
				}
			},
			reportShowLog: function(e) {
				var i = this;
				e = "#" + e;
				for (var n = 0; n < t.length; n++) if (e == t[n].id) {
					i.ShowLog(n, t[n].id, t[n].mid, t[n].mname, t[n].spm, "show");
					return
				}
			},
			reportClickLog: function(e) {
				var i = this;
				var n = "#" + $(e).closest("div[id^=module_basic]").attr("id");
				for (var a = 0; a < t.length; a++) {
					if (n == t[a].id) i.ShowLog(a, t[a].id, t[a].mid, t[a].mname, t[a].spm, "click");
					if ("#module_basic_playlist" == (n == t[a].id)) i.ShowLog(a, t[a].id, t[a].mid, t[a].mname, t[a].spm, "mousedown")
				}
			},
			ShowLog: function(t, i, n, a, r, o) {
				var s = this;
				var l = "";
				var l = "show" == o ? this.showUrl : this.clickUrl;
				if (1 == $(i).length) if ($(i).is(":visible")) l += "?mid=" + n + "&spm=" + r + "&mname=" + a + "&etime=" + (new Date).getTime();
				e.getRequest(l)
			},
			checkPosition: function(e) {
				if (!e.is(":visible") || e.attr("modshow") || !e.height() || $(window).height() + $(document).scrollTop() < e.offset().top + e.height() / 2) return false;
				return true
			}
		};
		return i
	});
	define("page/find/play/authenPhone", ["tui/event", "tui/view", "tui/art"], function(e, t, i) {
		var n = t.extend({
			opt: {
				url: "https://id.youku.com/bindMobileView.htm",
				wrap: $("body"),
				cancleCb: function() {},
				authenCb: function() {},
				cbUrl: "callback=https://idx.youku.com/authenPhone/cb"
			},
			initialize: function(e, t) {
				var e, n, a, r;
				this.opt = $.extend(this.opt, t);
				e = e || "authenFrom" + 1 * new Date;
				instance.events.bind("cancleCb", this.opt.cancleCb);
				instance.events.bind("authenCb", this.opt.authenCb);
				n = this.opt.url.indexOf("?") > -1 ? "&" : "?" + this.opt.cbUrl;
				this.opt.url = this.opt.url + n;
				a = '<div id="<%=data.id%>" class="authen-phone-layer">\n<h2>绑定手机</h2>\n<p>应《中华人民共和国网络安全法》要求共建文明网络环境，网上发布信息需进行实名认证。</p>\n<div class="bottom">\n<a class="authen-btn" target="_blank" href="<%=data.url%>">去绑定</a>\n<a class="cancel-btn" href="#">取消</a>		\n</div>\n</div> ';
				r = i.compile(a)({
					data: {
						id: e,
						url: this.opt.url,
						top: t.top
					}
				});
				this.opt.id = e;
				$(this.opt.wrap).append(r);
				this.el = $("#" + e);
				this._bindEvent()
			},
			_bindEvent: function() {
				var e = this;
				$(".authen-btn", this.el).bind("click", function(t) {
					ykPlyr.PlayerPause(1);
					window.ykPlyr.one("authenDone", function(t) {
						instance.events.trigger("authenCb");
						e._distory();
						t && t.close()
					})
				});
				$(".cancel-btn", this.el).bind("click", function(t) {
					instance.events.trigger("cancleCb");
					e._distory();
					return false
				})
			},
			_distory: function() {
				$.each(instance.item, function(e, t) {
					ykPlyr.PlayerPause(0);
					t.el.remove()
				});
				instance.init()
			}
		});
		window.instance = {};
		instance.init = function() {
			instance.item = {};
			instance.events = new e
		};
		instance.init();
		return function(e, t) {
			if (!instance.item[e]) instance.item[e] = new n(e, t)
		}
	});
	define("tui/encrypt/md5", [], function() {
		function e(e, t) {
			var o = e[0],
				s = e[1],
				l = e[2],
				d = e[3];
			o = i(o, s, l, d, t[0], 7, -680876936);
			d = i(d, o, s, l, t[1], 12, -389564586);
			l = i(l, d, o, s, t[2], 17, 606105819);
			s = i(s, l, d, o, t[3], 22, -1044525330);
			o = i(o, s, l, d, t[4], 7, -176418897);
			d = i(d, o, s, l, t[5], 12, 1200080426);
			l = i(l, d, o, s, t[6], 17, -1473231341);
			s = i(s, l, d, o, t[7], 22, -45705983);
			o = i(o, s, l, d, t[8], 7, 1770035416);
			d = i(d, o, s, l, t[9], 12, -1958414417);
			l = i(l, d, o, s, t[10], 17, -42063);
			s = i(s, l, d, o, t[11], 22, -1990404162);
			o = i(o, s, l, d, t[12], 7, 1804603682);
			d = i(d, o, s, l, t[13], 12, -40341101);
			l = i(l, d, o, s, t[14], 17, -1502002290);
			s = i(s, l, d, o, t[15], 22, 1236535329);
			o = n(o, s, l, d, t[1], 5, -165796510);
			d = n(d, o, s, l, t[6], 9, -1069501632);
			l = n(l, d, o, s, t[11], 14, 643717713);
			s = n(s, l, d, o, t[0], 20, -373897302);
			o = n(o, s, l, d, t[5], 5, -701558691);
			d = n(d, o, s, l, t[10], 9, 38016083);
			l = n(l, d, o, s, t[15], 14, -660478335);
			s = n(s, l, d, o, t[4], 20, -405537848);
			o = n(o, s, l, d, t[9], 5, 568446438);
			d = n(d, o, s, l, t[14], 9, -1019803690);
			l = n(l, d, o, s, t[3], 14, -187363961);
			s = n(s, l, d, o, t[8], 20, 1163531501);
			o = n(o, s, l, d, t[13], 5, -1444681467);
			d = n(d, o, s, l, t[2], 9, -51403784);
			l = n(l, d, o, s, t[7], 14, 1735328473);
			s = n(s, l, d, o, t[12], 20, -1926607734);
			o = a(o, s, l, d, t[5], 4, -378558);
			d = a(d, o, s, l, t[8], 11, -2022574463);
			l = a(l, d, o, s, t[11], 16, 1839030562);
			s = a(s, l, d, o, t[14], 23, -35309556);
			o = a(o, s, l, d, t[1], 4, -1530992060);
			d = a(d, o, s, l, t[4], 11, 1272893353);
			l = a(l, d, o, s, t[7], 16, -155497632);
			s = a(s, l, d, o, t[10], 23, -1094730640);
			o = a(o, s, l, d, t[13], 4, 681279174);
			d = a(d, o, s, l, t[0], 11, -358537222);
			l = a(l, d, o, s, t[3], 16, -722521979);
			s = a(s, l, d, o, t[6], 23, 76029189);
			o = a(o, s, l, d, t[9], 4, -640364487);
			d = a(d, o, s, l, t[12], 11, -421815835);
			l = a(l, d, o, s, t[15], 16, 530742520);
			s = a(s, l, d, o, t[2], 23, -995338651);
			o = r(o, s, l, d, t[0], 6, -198630844);
			d = r(d, o, s, l, t[7], 10, 1126891415);
			l = r(l, d, o, s, t[14], 15, -1416354905);
			s = r(s, l, d, o, t[5], 21, -57434055);
			o = r(o, s, l, d, t[12], 6, 1700485571);
			d = r(d, o, s, l, t[3], 10, -1894986606);
			l = r(l, d, o, s, t[10], 15, -1051523);
			s = r(s, l, d, o, t[1], 21, -2054922799);
			o = r(o, s, l, d, t[8], 6, 1873313359);
			d = r(d, o, s, l, t[15], 10, -30611744);
			l = r(l, d, o, s, t[6], 15, -1560198380);
			s = r(s, l, d, o, t[13], 21, 1309151649);
			o = r(o, s, l, d, t[4], 6, -145523070);
			d = r(d, o, s, l, t[11], 10, -1120210379);
			l = r(l, d, o, s, t[2], 15, 718787259);
			s = r(s, l, d, o, t[9], 21, -343485551);
			e[0] = f(o, e[0]);
			e[1] = f(s, e[1]);
			e[2] = f(l, e[2]);
			e[3] = f(d, e[3])
		}
		function t(e, t, i, n, a, r) {
			t = f(f(t, e), f(n, r));
			return f(t << a | t >>> 32 - a, i)
		}
		function i(e, i, n, a, r, o, s) {
			return t(i & n | ~i & a, e, i, r, o, s)
		}
		function n(e, i, n, a, r, o, s) {
			return t(i & a | n & ~a, e, i, r, o, s)
		}
		function a(e, i, n, a, r, o, s) {
			return t(i ^ n ^ a, e, i, r, o, s)
		}
		function r(e, i, n, a, r, o, s) {
			return t(n ^ (i | ~a), e, i, r, o, s)
		}
		function o(t) {
			if (/[-ÿ]/.test(t)) t = unescape(encodeURI(t));
			txt = "";
			var i = t.length,
				n = [1732584193, -271733879, -1732584194, 271733878],
				a;
			for (a = 64; a <= t.length; a += 64) e(n, s(t.substring(a - 64, a)));
			t = t.substring(a - 64);
			var r = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			for (a = 0; a < t.length; a++) r[a >> 2] |= t.charCodeAt(a) << (a % 4 << 3);
			r[a >> 2] |= 128 << (a % 4 << 3);
			if (a > 55) {
				e(n, r);
				for (a = 0; a < 16; a++) r[a] = 0
			}
			r[14] = 8 * i;
			e(n, r);
			return n
		}
		function s(e) {
			var t = [],
				i;
			for (i = 0; i < 64; i += 4) t[i >> 2] = e.charCodeAt(i) + (e.charCodeAt(i + 1) << 8) + (e.charCodeAt(i + 2) << 16) + (e.charCodeAt(i + 3) << 24);
			return t
		}
		var l = "0123456789abcdef".split("");

		function d(e) {
			var t = "",
				i = 0;
			for (; i < 4; i++) t += l[15 & e >> 8 * i + 4] + l[15 & e >> 8 * i];
			return t
		}
		function c(e) {
			for (var t = 0; t < e.length; t++) e[t] = d(e[t]);
			return e.join("")
		}
		function u(e) {
			return c(o(e))
		}
		function f(e, t) {
			return 4294967295 & e + t
		}
		return u
	});
	define("page/find/play/dmpool/model", [], function() {
		var e = "//service.danmu.youku.com";
		return {
			load: function(e) {
				var t = 0;
				var i = e.success;
				var n = e.error;
				delete e.success;
				delete e.error;
				e.success = function(t) {
					if (!t) {
						e.error();
						return
					}
					i && i.apply(this, Array.prototype.slice.call(arguments))
				};
				e.error = function(i) {
					t++;
					if (t <= 0) $.ajax(e);
					else n && n.apply(this, Array.prototype.slice.call(arguments))
				};
				e.cache = "undefined" === typeof e.cache || e.cache;
				$.ajax(e)
			},
			getStarWordsList: function(t, i) {
				this.load({
					url: e + "/getStarWordsList",
					data: t,
					dataType: "jsonp",
					jsonp: "jsoncallback",
					success: function(e) {
						i && i(e)
					}
				})
			},
			getPool: function(t, i) {
				this.load({
					url: e + "/pool",
					data: t,
					dataType: "jsonp",
					jsonp: "jsoncallback",
					success: function(e) {
						i && i(e)
					}
				})
			},
			getInfo: function(t, i) {
				this.load({
					url: e + "/pool/info",
					data: t,
					dataType: "jsonp",
					jsonp: "jsoncallback",
					success: function(e) {
						i && i(e)
					}
				})
			},
			getUlist: function(t, i) {
				this.load({
					url: e + "/ulist",
					data: t,
					dataType: "jsonp",
					jsonp: "jsoncallback",
					success: function(e) {
						i && i(e)
					}
				})
			},
			getReport: function(t, i) {
				this.load({
					url: e + "/report?ct=1001&ver=1",
					data: t,
					dataType: "jsonp",
					jsonp: "jsoncallback",
					success: function(e) {
						i && i(e)
					}
				})
			},
			getdelDmByOwner: function(t, i) {
				this.load({
					url: e + "/delDmByOwner",
					data: t,
					dataType: "jsonp",
					jsonp: "jsoncallback",
					success: function(e) {
						i && i(e)
					}
				})
			},
			getdel: function(t, i) {
				this.load({
					url: e + "/del",
					data: t,
					dataType: "jsonp",
					jsonp: "jsoncallback",
					success: function(e) {
						i && i(e)
					}
				})
			},
			encodeUid: function(e) {
				var t = this;
				if (!e) return "";
				if (e << 2 > 0) var i = "U" + this.encode64(e << 2);
				else var i = "U" + this.encode64(4 * e);
				return i
			},
			encode64: function(e) {
				var t = this;
				if (!e) return "";
				e = e.toString();
				var i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
				var n = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
				var a, r, o;
				var s, l, d;
				o = e.length;
				r = 0;
				a = "";
				while (r < o) {
					s = 255 & e.charCodeAt(r++);
					if (r == o) {
						a += i.charAt(s >> 2);
						a += i.charAt((3 & s) << 4);
						a += "==";
						break
					}
					l = e.charCodeAt(r++);
					if (r == o) {
						a += i.charAt(s >> 2);
						a += i.charAt((3 & s) << 4 | (240 & l) >> 4);
						a += i.charAt((15 & l) << 2);
						a += "=";
						break
					}
					d = e.charCodeAt(r++);
					a += i.charAt(s >> 2);
					a += i.charAt((3 & s) << 4 | (240 & l) >> 4);
					a += i.charAt((15 & l) << 2 | (192 & d) >> 6);
					a += i.charAt(63 & d)
				}
				return a
			}
		}
	});
	define("tui/easing2", [], function(e, t) {
		jQuery.easing["jswing"] = jQuery.easing["swing"];
		jQuery.extend(jQuery.easing, {
			easeOutCubic: function(e, t, i, n, a) {
				t /= a;
				t--;
				return n * (t * t * t + 1) + i
			},
			easeOutQuart: function(e, t, i, n, a) {
				t /= a;
				t--;
				return -n * (t * t * t * t - 1) + i
			},
			easeOutQuint: function(e, t, i, n, a) {
				t /= a;
				t--;
				return n * (t * t * t * t * t + 1) + i
			},
			easeOutCirc: function(e, t, i, n, a) {
				t /= a;
				t--;
				return n * Math.sqrt(1 - t * t) + i
			},
			easeOutSine: function(e, t, i, n, a) {
				return n * Math.sin(t / a * (Math.PI / 2)) + i
			},
			easeOutExpo: function(e, t, i, n, a) {
				return n * (-Math.pow(2, -10 * t / a) + 1) + i
			},
			mcsEaseOut: function(e, t, i, n, a) {
				var r = (t /= a) * t,
					o = r * t;
				return i + n * (.499999999999997 * o * r + -2.5 * r * r + 5.5 * o + -6.5 * r + 4 * t)
			},
			draggerRailEase: function(e, t, i, n, a) {
				t /= a / 2;
				if (t < 1) return n / 2 * t * t * t + i;
				t -= 2;
				return n / 2 * (t * t * t + 2) + i
			}
		})
	});
	define("tui/scrollbar2", ["tui/event", "tui/drag", "tui/art", "tui/easing2"], function(e, t, i) {
		var n = e.extend({
			initialize: function(e, a) {
				a = a || {};
				n.superClass.initialize.apply(this, arguments);
				var r = this;
				var o = {
					horizontalScroll: false,
					horizontalMaxSize: 1e5,
					prefix: "",
					autoHide: true,
					targetNode: null,
					renderMethod: "after",
					barContainerNode: null,
					animate: false,
					duration: 950,
					easing: "mcsEaseOut",
					arrowEnable: false,
					arrowDelta: 60,
					arrowPrevNode: null,
					arrowNextNode: null,
					draggerNode: null,
					draggerMaxLength: null,
					draggerMinLength: 60,
					draggerAutoLength: true,
					trackEnable: true,
					trackNode: null,
					mouseWheelEnable: true,
					mouseWheelDelta: 30,
					keyPressEnable: false,
					keyPressDelta: 60
				};
				$.extend(true, r, o, a);
				$.extend(true, r, {
					arrowAnimate: {
						enable: r.animate,
						duration: r.duration,
						easing: r.easing
					},
					mouseWheelAnimate: {
						enable: r.animate,
						duration: r.duration,
						easing: r.easing
					},
					draggerAnimate: {
						enable: r.animate,
						duration: r.duration,
						easing: r.easing
					},
					trackAnimate: {
						enable: r.animate,
						duration: r.duration,
						easing: r.easing
					},
					keyPressAnimate: {
						enable: r.animate,
						duration: r.duration,
						easing: r.easing
					}
				}, a);
				var s = $(e);
				var l = r.prefix && "" != r.prefix ? r.prefix + "_" : "";
				var d = r.barContainerNode ? $(r.barContainerNode) : $(i.compile(a.template || '<div class="<%=prefix%>scrollbar_container"><a class="<%=prefix%>scrollbar_prev" href="#"><i></i></a><div class="<%=prefix%>scrollbar_track"><span class="<%=prefix%>scrollbar_dragger"></span></div><a class="<%=prefix%>scrollbar_next" href="#"><i></i></a></div>')({
					prefix: l
				}));
				var c = r.draggerNode ? $(r.draggerNode) : d.find("." + l + "scrollbar_dragger");
				var u = r.trackNode ? $(r.trackNode) : d.find("." + l + "scrollbar_track");
				var f = r.arrowPrevNode ? $(r.arrowPrevNode) : d.find("." + l + "scrollbar_prev");
				var p = r.arrowNextNode ? $(r.arrowNextNode) : d.find("." + l + "scrollbar_next");
				var m = r.targetNode || s;
				if (!r.barContainerNode) m[r.renderMethod](d);
				var h = new t(c, {
					limit: true
				});
				h.bind("drag:move", function(e, t) {
					r.scrollTo(r.horizontalScroll ? e : t, true, r.draggerAnimate)
				});
				s.bind("scroll", function(e) {
					var t = s[r.horizontalScroll ? "scrollLeft" : "scrollTop"]();
					r.trigger("scroll", [t]);
					if (0 == t) r.trigger("scroll:head", [t]);
					else if (t >= r._contentSize - r._containerSize) r.trigger("scroll:end", [t])
				});
				if (!r.arrowEnable) {
					f.hide();
					p.hide()
				} else {
					var v;
					f.mousedown(function(e) {
						e.preventDefault();
						r.scrollTo(r.getScrollPosition() - r.arrowDelta, false, r.arrowAnimate);
						v = setTimeout(function() {
							if (v) clearInterval(v);
							v = setInterval(function() {
								r.scrollTo(r.getScrollPosition() - r.arrowDelta, false, r.arrowAnimate)
							}, 30)
						}, 500)
					}).mouseleave(function() {
						if (v) clearInterval(v)
					}).mouseup(function() {
						if (v) clearInterval(v)
					}).click(function(e) {
						e.preventDefault()
					});
					p.mousedown(function(e) {
						e.preventDefault();
						r.scrollTo(r.getScrollPosition() + r.arrowDelta, false, r.arrowAnimate);
						v = setTimeout(function() {
							if (v) clearInterval(v);
							v = setInterval(function() {
								r.scrollTo(r.getScrollPosition() + r.arrowDelta, false, r.arrowAnimate)
							}, 30)
						}, 500)
					}).mouseleave(function() {
						if (v) clearInterval(v)
					}).mouseup(function() {
						if (v) clearInterval(v)
					}).click(function(e) {
						e.preventDefault()
					})
				}
				if (r.mouseWheelEnable && /firefox/.test(navigator.userAgent.toLowerCase())) s[0].addEventListener("DOMMouseScroll", function(e) {
					if (r._contentSize > r._containerSize) {
						e.preventDefault();
						var t = e.detail > 0 ? r.mouseWheelDelta : -r.mouseWheelDelta;
						r.scrollTo(r.getScrollPosition() + t, false, r.mouseWheelAnimate)
					}
				}, false);
				else if (r.mouseWheelEnable) s[0].onmousewheel = function(e) {
					if (r._contentSize > r._containerSize) {
						e = e || window.event;
						var t = e.wheelDelta > 0 ? -r.mouseWheelDelta : r.mouseWheelDelta;
						if (0 == e.wheelDelta) t = 0;
						r.scrollTo(r.getScrollPosition() + t, false, r.mouseWheelAnimate);
						e.returnValue = false;
						return false
					} else return true
				};
				if (r.trackEnable) {
					c.mousedown(function(e) {
						e.stopPropagation()
					});
					u.mousedown(function(e) {
						e.preventDefault();
						r.scrollTo(e[r.horizontalScroll ? "pageX" : "pageY"] - u.offset()[r.horizontalScroll ? "left" : "top"] - r._draggerSize / 2, true, r.trackAnimate)
					})
				}
				if (r.keyPressEnable) s.css("outline", "none").attr("tabindex", "-1").keydown(function(e) {
					var t = e.keyCode;
					var i = r.getScrollPosition();
					if (~"INPUT,TEXTAREA".indexOf(e.target.nodeName.toUpperCase())) return;
					if (!~"38,39,36,40,37,35".indexOf(t)) return;
					if ([38, 39, 36].indexOf(t) != -1 && 0 != i) e.preventDefault();
					else if ([40, 37, 35].indexOf(t) != -1 && i != r._contentSize - r._containerSize) e.preventDefault();
					switch (t) {
					case 37:
					case 38:
						r.scrollTo(i - r.keyPressDelta, false, r.keyPressAnimate);
						break;
					case 39:
					case 40:
						r.scrollTo(i + r.keyPressDelta, false, r.keyPressAnimate);
						break;
					case 36:
						r.scrollTo(0, false, r.keyPressAnimate);
						break;
					case 35:
						r.scrollTo(r._contentSize - r._containerSize, false, r.keyPressAnimate)
					}
				});
				r.container = s;
				r.barContainerNode = d;
				r.trackNode = u;
				r.arrowPrevNode = f;
				r.arrowNextNode = p;
				r.draggerNode = c;
				r._contentSize = 0;
				r._containerSize = 0;
				r._trackSize = 0;
				r._draggerSize = 0;
				r.update()
			},
			getScrollPosition: function() {
				return this.container[0][this.horizontalScroll ? "scrollLeft" : "scrollTop"]
			},
			scrollTo: function(e, t, i) {
				var n = this;
				var a = n.horizontalScroll;
				var r = t ? e : e * (n._trackSize - n._draggerSize) / (n._contentSize - n._containerSize);
				var o = !t ? e : (e * n._contentSize - e * n._containerSize) / (n._trackSize - n._draggerSize);
				r = Math.min(n._trackSize - n._draggerSize, Math.max(0, r));
				if (a) o = Math.min(o, n.horizontalMaxSize - n._containerSize);
				if (true === i || i && false !== i.enable) {
					var s = {};
					var l = {};
					s[a ? "scrollLeft" : "scrollTop"] = o ? o : 0;
					l[a ? "left" : "top"] = r;
					if (true === i) i = {
						duration: n.duration,
						easing: n.easing
					};
					n.container.stop().animate(s, i);
					n.draggerNode.stop().animate(l, i)
				} else {
					n.container[a ? "scrollLeft" : "scrollTop"](o ? o : 0);
					n.draggerNode.css(a ? "left" : "top", r)
				}
			},
			scrollToElement: function(e, t) {
				e = $(e);
				t = t || {};
				var i = void 0 != t.animate ? t.animate : this.animate;
				var n = this.horizontalScroll;
				if (e.length) {
					var a = this.container[n ? "scrollLeft" : "scrollTop"]() + e.offset()[n ? "left" : "top"] - this.container.offset()[n ? "left" : "top"];
					if (t.pos) a -= t.pos;
					this.scrollTo(a, false, i)
				}
			},
			update: function() {
				this.show();
				var e = this.horizontalScroll;
				this._trackSize = this.trackNode[e ? "innerWidth" : "innerHeight"]();
				this._containerSize = this.container[e ? "innerWidth" : "innerHeight"]();
				this._contentSize = this.container[0][e ? "scrollWidth" : "scrollHeight"];
				this._draggerSize = this.draggerNode[e ? "innerWidth" : "innerHeight"]();
				e && (this._contentSize = Math.min(this._contentSize, this.horizontalMaxSize));
				if (this._contentSize > this._containerSize) {
					if (this.draggerAutoLength) {
						this._draggerSize = Math.floor(this._containerSize * this._trackSize / this._contentSize);
						if (this.draggerMinLength) this._draggerSize = Math.max(this._draggerSize, this.draggerMinLength);
						if (this.draggerMaxLength) this._draggerSize = Math.min(this._draggerSize, this.draggerMaxLength);
						this.draggerNode.css(e ? "width" : "height", this._draggerSize)
					}
					this.scrollTo(this.getScrollPosition(), false, self.animate)
				} else if (this.autoHide) this.hide()
			},
			show: function() {
				this.barContainerNode.show();
				this.trigger("show")
			},
			hide: function() {
				this.barContainerNode.hide();
				this.trigger("hide")
			}
		});
		return n
	});
	define("page/find/play/dmpool/staractivity", ["tui/view", "tui/art", "tui/scrollbar2", "page/find/play/dmpool/model", "module/responsive"], function(e, t, i, n, a) {
		var r = '<%for(var i = 0; i < onePageBslen; i++){%>\n<div class="item-one clearfix <%if(type && type==\'starpool\'){%>starpool-one<%}%>" data-uid="<%=list[i].uids%>" data-objid="<%=list[i].objId%>">\n<div class="list_len clearfix">\n<%if(type && type!=\'starpool\'){%><a class="time" href="javascript:ykPlyr.PlayerSeek(\'<%=list[i].seekTime%>\');" title="点击空降到<%=list[i].timePoint%>"><%=list[i].timePoint%></a><%}%>\n<span class="idoln">\n<%var starst=false;%>\n<%for(var tag in utag){%>\n<%if(list[i].uids==utag[tag].uid || list[i].uids==utag[tag].xuid){ starst=true;%> \n<a href="http://i.youku.com/i/id_<%=utag[tag].uid%>" target="_blank"><img src="<%=utag[tag].headImg%>" class="idol-img"/><b class="idolname" title="<%=utag[tag].name%>"><%=utag[tag].name%></b></a>\n<%}%>\n<%}%>\n</span>\n<!--<span class="afterDelTxt">已删除</span>-->\n<span class="item bsp-list-limitArea <%if(starst && type!=\'starpool\'){%>oneIdolList <%}%>" title="<%=list[i].listBsCont%>"><%=list[i].listBsCont%></span>\n</div>\n<div class="details"  title="<%=list[i].listBsCont%>"><p><%=list[i].listBsCont%></p></div>\n<div class="btnsframe">\n<%if(type && type==\'all\'){%><span class="comp-bs" data-objid="<%=list[i].objId%>">举报</span><%}%>\n<span  class="del-bs" data-objid="<%=list[i].objId%>" style="<%if(type && type==\'star\'){%>margin-right: 15px; <%}%><%if(isdz){%>display:block;<%}%>">删除</span>\n</div>\n</div>\n<%}%>';
		var o = e.extend({
			initialize: function(e) {
				var t = this;
				t.utag = t.options.utag;
				for (var i in t.utag) t.utag[i].xuid = n.encodeUid(t.utag[i].uid);
				this.dmSatrLoad(t.options.starpoolPage)
			},
			dmSatrLoad: function(e) {
				var t = this;
				$("#bs_idol span:eq(0)").show().click();
				if (0 == e.statusSt) {
					var i = '<div class="star_st1"><div style="margin-bottom: 10px;">' + e.description + '</div><div><img style="width:100%;" src="' + e.picurl + '"></div><div class="fix staractiveBtn"><a href="javascript:;" class="starFormBtn starFormshare dmnone" >分 享</a> <a href="' + e.sharedPageUrl + '" class="starFormBtn starFormtie" target="_blank">去看帖</a></div></div>';
					$("#bsp-alllist-wrap0").html(i)
				} else if (1 == e.statusSt) {
					var n = '<div class="star_st2"><div class="dmpolltxt">明星弹幕蓄力中，马上回来</div><div class="dmpollicon"></div><div class="fix staractiveBtn"><a href="javascript:;" class="starFormBtn dmnone" >分 享</a></div></div>';
					$("#bsp-alllist-wrap0").html(n);
					t.ScrollbarFn();
					t.scrollupdate()
				}
			},
			dmSatradd: function(e) {
				var i = this;
				var n = [];
				for (var a in e) n.push({
					listBsCont: e[a].content,
					uids: e[a].uid,
					objId: e[a].id,
					timePoint: i.timeConver(e[a].playat),
					seekTime: parseInt(e[a].playat / 1e3)
				});
				var o = {
					list: n,
					Varnext: 0,
					onePageBslen: e.length
				};
				var s = false;
				$("#bsp-alllist-wrap0 .item-one").each(function(e) {
					var t = $(this).attr("data-objid");
					for (var i in n) if (t == n[li].id) {
						s = true;
						return
					}
				});
				if (s) return;
				var l = $.extend(o, {
					type: "starpool",
					uid: i.options.uid,
					isdz: i.options.isdz,
					utag: i.utag
				});
				$("#bsp-alllist-wrap0 .star_st2").hide();
				var d = t.compile(r)(l);
				$("#bsp-alllist-wrap0").append(d);
				i.$el.trigger("list:update0")
			},
			timeConver: function(e) {
				var t = e / 1e3;
				if (t < 3600) {
					var i = parseInt(t / 60),
						n = Math.floor(t % 60);
					return (i >= 10 ? i : "0" + i) + ":" + (n >= 10 ? n : "0" + n)
				} else {
					var a = parseInt(t / 3600),
						r = parseInt(t % 3600 / 60),
						o = Math.floor(t % 3600 % 60);
					return (a >= 10 ? a : "0" + a) + ":" + (r >= 10 ? r : "0" + r) + ":" + (o >= 10 ? o : "0" + o)
				}
			},
			ScrollbarFn: function() {
				this.scroll = new i($(".scroller", this.el).eq(0), {
					draggerMinLength: 30
				})
			},
			scrollupdate: function() {
				var e = this;
				this.$el.bind("list:update0", function() {
					e.scroll.update()
				});
				a.bind("player:responsive", function() {
					e.scroll.update()
				})
			}
		});
		return o
	});
	define("page/find/play/dmpool/starlist", ["tui/view", "tui/art", "tui/scrollbar2", "page/find/play/dmpool/model", "module/responsive"], function(e, t, i, n, a) {
		var r = '<%for(var key in list){%>\n<%for(var i = 0; i < list[key].length; i++){%>\n<div class="item-one clearfix label<%=list[key][i].uids%>" data-uid="<%=list[key][i].uids%>" data-objid="<%=list[key][i].objId%>">\n<div class="list_len clearfix">\n<a class="time" href="javascript:ykPlyr.PlayerSeek(\'<%=list[key][i].seekTime%>\');" title="点击空降到<%=list[key][i].timePoint%>"><%=list[key][i].timePoint%></a>\n<span class="idoln">\n<%var starst=false;%>\n<%for(var tag in utag){%>\n<%if(list[key][i].uids==utag[tag].uid){ starst=true;%> \n<a href="http://i.youku.com/i/id_<%=utag[tag].uid%>" target="_blank"><img src="<%=utag[tag].headImg%>" class="idol-img"/><b class="idolname" title="<%=utag[tag].name%>"><%=utag[tag].name%></b></a>\n<%}%>\n<%}%>\n</span>\n<!--<span class="afterDelTxt">已删除</span>-->\n<span class="item bsp-list-limitArea <%if(starst){%>oneIdolList <%}%>" title="<%=list[key][i].listBsCont%>"><%=list[key][i].listBsCont%></span>\n</div>\n<div class="details"  title="<%=list[key][i].listBsCont%>"><p><%=list[key][i].listBsCont%></p></div>\n<div class="btnsframe">\n<%if(type && type==\'all\'){%><span class="comp-bs" data-objid="<%=list[key][i].objId%>">举报</span><%}%>\n<span  class="del-bs" data-objid="<%=list[key][i].objId%>" style="<%if(type && type==\'star\'){%>margin-right: 15px; <%}%> <%if(isdz){%>display:block;<%}%>">删除</span>\n</div>\n</div>\n<%}%>\n<%}%>';
		var o = e.extend({
			initialize: function(e) {
				var t = this;
				var i = {
					ct: "10001",
					activityid: 401
				};
				this.load()
			},
			events: {
				"click #bs_idol1 span": "dm_tabFn"
			},
			timeConver: function(e) {
				var t = e / 1e3;
				if (t < 3600) {
					var i = parseInt(t / 60),
						n = Math.floor(t % 60);
					return (i >= 10 ? i : "0" + i) + ":" + (n >= 10 ? n : "0" + n)
				} else {
					var a = parseInt(t / 3600),
						r = parseInt(t % 3600 / 60),
						o = Math.floor(t % 3600 % 60);
					return (a >= 10 ? a : "0" + a) + ":" + (r >= 10 ? r : "0" + r) + ":" + (o >= 10 ? o : "0" + o)
				}
			},
			load: function() {
				var e = this;
				if (e.options.utag.length > 0) {
					var i = 0;
					e.items = [];
					for (var n = 0; n < e.options.utag.length; n++) e.getUlistFn(e.options.utag[n].uid, function(n) {
						i++;
						e._mergeItem(n.list);
						if (i == e.options.utag.length) {
							var a = $.extend({
								type: "star",
								uid: e.options.uid,
								isdz: e.options.isdz
							}, {
								utag: e.options.utag,
								list: e.items
							});
							var o = t.compile(r)(a);
							$("#bsp-alllist-wrap2").append(o);
							e.ScrollbarFn()
						}
					})
				}
			},
			_mergeItem: function(e) {
				var t = this;
				e.forEach(function(e, i) {
					var n = e.seekTime;
					t.items[n] || (t.items[n] = []);
					t.items[n].push(e)
				})
			},
			getUlistFn: function(e, t) {
				$(".bs_loadImg_box").eq(2).addClass("bs_loadImg");
				var i = this;
				var a = {
					iid: this.options.iid,
					ct: 1001,
					uid: e
				};
				var r = [];
				n.getUlist(a, function(e) {
					for (var n = 0; n < e.result.length; n++) r.push({
						listBsCont: e.result[n].content,
						uids: e.result[n].uid,
						objId: e.result[n].id,
						timePoint: i.timeConver(e.result[n].playat),
						seekTime: parseInt(e.result[n].playat / 1e3)
					});
					t({
						list: r,
						onePageBslen: e.result.length
					});
					$(".bs_loadImg_box").eq(2).removeClass("bs_loadImg")
				})
			},
			scrollupdate: function() {
				var e = this;
				this.$el.bind("list:update2", function() {
					e.scroll.update()
				});
				a.bind("player:responsive", function() {
					e.scroll.update()
				})
			},
			ScrollbarFn: function() {
				var e = this;
				var t = false;
				this.scroll = new i($(".scroller", this.el).eq(2), {
					draggerMinLength: 30
				})
			}
		});
		return o
	});
	define("page/find/play/interaction/dramaTab", ["tui/event"], function(e) {
		var t = function(e) {
				return $("#" + e)
			};
		var i = null;
		var n = e.extend({
			tab: null,
			tabLis: {},
			showTabLis: {},
			tabLisCb: {},
			current: "Drama",
			tabId: "#DramaTab",
			pointEle: {},
			maxTabs: 4,
			initialize: function() {
				n.superClass.initialize.call(this);
				this.tab = $(this.tabId);
				var e = $("li", this.tab);
				if (!e || e.length <= 0) return false;
				if (e.length > 0) for (var t = 0, i = e.length; t < i; t++) {
					var a = e[t].getAttribute("_to");
					this._addItem(a, e[t]);
					this._turn(this.current)
				}
			},
			addTab: function(e, t, i, n) {
				if (!this._checkShowTabLen()) return false;
				if (this._checkTab(e)) {
					this._activeTab(e, t, i, n);
					return true
				}
				var a = document.createElement("LI");
				var r = "<span>" + t + "</span>";
				a.innerHTML = r;
				a.setAttribute("_to", e);
				this.tab.append(a);
				this._addItem(e, a, n);
				this.addShowTablis(e, a);
				if (i) this.toggle(e, n)
			},
			addShowTablis: function(e, t) {
				if (!this._checkShowTabLen()) return false;
				if (e) {
					if (this.showTabLis[e]) return true;
					this.showTabLis[e] = t
				}
			},
			toggle: function(e, t) {
				if (!this._checkTab(e)) return false;
				if (e != this.current) this._turn(e);
				if ("function" == typeof t) t();
				else if ("function" == typeof this.tabLisCb[e]) this.tabLisCb[e]()
			},
			showPoint: function(e, t) {
				if (!this._checkTab(e)) return false;
				if (!this.pointEle[e]) {
					this.pointEle[e] = document.createElement("i");
					this.pointEle[e].className = "icon-currentdot"
				}
				t = t || 1;
				this.pointEle[e].innerHTML = t;
				var i = this._getItem(e).getElementsByTagName("span")[0];
				i.appendChild(this.pointEle[e])
			},
			hidePoint: function(e) {
				if (!this._checkTab(e)) return false;
				if (this.pointEle[e] && null != this.pointEle[e].parentNode) {
					var t = this._getItem(e).getElementsByTagName("span")[0];
					t.removeChild(this.pointEle[e]);
					return false
				}
			},
			isCurrent: function(e) {
				if (!this._checkTab(e)) return false;
				return this._getItem(e).className.indexOf("current") !== -1 ? true : false
			},
			_activeTab: function(e, t, i, n) {
				var a = this._getItem(e);
				if (a.length) {
					a.html(a.html().replace("%s", t));
					a.show();
					a.onclick = this._getListener(e, n);
					if (i) this.toggle(e, n);
					this.addShowTablis(e, a)
				}
			},
			_checkTab: function(e) {
				if (this._getItem(e).length) return true;
				return false
			},
			_checkShowTabLen: function() {
				if (this._getTabsLen(this.showTabLis) < this.maxTabs) return true;
				return false
			},
			_getTabsLen: function(e) {
				var t, i = 0;
				for (t in e) if (e.hasOwnProperty(t)) i++;
				return i
			},
			_addItem: function(e, t, i) {
				if (e) {
					this.tabLisCb[e] = i;
					this.tabLis[e] = t;
					this.tabLis[e].onclick = this._getListener(e, i)
				}
			},
			_getItem: function(e) {
				return $(this.tabLis[e]) || null
			},
			_getListener: function(e, t) {
				var i = this;
				return function() {
					i.toggle(e, t)
				}
			},
			_turn: function(e) {
				for (var i in this.tabLis) {
					var n = this._getItem(i),
						a = t(i);
					n[0].className = "";
					if (a.length) a.hide()
				}
				this._setCurrent(e);
				if (t(e).length) {
					t(e).show();
					this.addShowTablis(e, $(e));
					this.trigger("tab:show", [e])
				}
			},
			_setCurrent: function(e) {
				this.current = e;
				this._getItem(e).addClass("current")
			}
		});
		n.getInstance = function() {
			if (i) return i;
			else return i = new n
		};
		return n.getInstance()
	});
	define("page/find/play/dmpool/dmpool", ["tui/view", "tui/art", "tui/scrollbar2", "page/find/play/dmpool/model", "page/find/play/interaction/dramaTab", "page/find/play/dmpool/starlist", "page/find/play/dmpool/staractivity", "module/login/login", "tui/encrypt/md5", "module/responsive"], function(e, t, i, n, a, r, o, s, l, d) {
		var c = '<div class="bspoolTit">\n<div class="bs_data" id="bs_data">\n<span class="name">弹幕数</span>\n<span><%=totalCounts%>发</span>\n</div>\n<div id="bs_selected_label_layer" onselectstart="return false">\n<div class="bs_idol_l clearfix" id="bs_idol">\n<%for(var i = 0; i < idols.length; i++){%>\n<span data-id="label<%=idols[i].uid%>" data-uid="<%=idols[i].uid%>" title="<%=idols[i].name%>"   <%if(idols[i].dis==0){%> style="display:none;"<%}%> <%if(idols[i].dis==1){%> class="active"<%}%> ><%=idols[i].name%></span>\n<%}%>\n</div>\n</div>\n</div>\n<div class="scroll-area scroll-resize-height">\n<div class="scroller-box dmnone">\n<div class="scroller bsp-cont scroll-resize-height" >\n<div class="scroller-container">\n<div class="bsp-all-list hoverOneItem">\n<div id="bsp-alllist-wrap0">\n</div>\n<div class="bs_loadImg_box"></div>\n</div>\n</div>\n</div>\n</div>\n<div class="scroller-box">\n<div class="scroller bsp-cont scroll-resize-height">\n<div class="scroller-container">\n<div class="bsp-all-list hoverOneItem">\n<div id="bsp-alllist-wrap1">\n</div>\n<div class="bs_loadImg_box"></div>\n</div>\n</div>\n<%if(totalCounts == 0 && onePageBslen ==0){%>\n<div class="zerodm_show_bg"></div>\n<%}%>\n</div>\n</div>\n<div class="scroller-box dmnone">\n<div class="scroller bsp-cont scroll-resize-height " >\n<div class="scroller-container">\n<div class="bsp-all-list hoverOneItem">\n<div id="bsp-alllist-wrap2">\n</div>\n<div class="bs_loadImg_box"></div>\n</div>\n</div>\n</div>\n</div>\n</div>\n';
		var u = '<%for(var i = 0; i < onePageBslen; i++){%>\n<div class="item-one clearfix <%if(type && type==\'starpool\'){%>starpool-one<%}%>" data-uid="<%=list[i].uids%>" data-objid="<%=list[i].objId%>">\n<div class="list_len clearfix">\n<%if(type && type!=\'starpool\'){%><a class="time" href="javascript:ykPlyr.PlayerSeek(\'<%=list[i].seekTime%>\');" title="点击空降到<%=list[i].timePoint%>"><%=list[i].timePoint%></a><%}%>\n<span class="idoln">\n<%var starst=false;%>\n<%for(var tag in utag){%>\n<%if(list[i].uids==utag[tag].uid || list[i].uids==utag[tag].xuid){ starst=true;%> \n<a href="http://i.youku.com/i/id_<%=utag[tag].uid%>" target="_blank"><img src="<%=utag[tag].headImg%>" class="idol-img"/><b class="idolname" title="<%=utag[tag].name%>"><%=utag[tag].name%></b></a>\n<%}%>\n<%}%>\n</span>\n<!--<span class="afterDelTxt">已删除</span>-->\n<span class="item bsp-list-limitArea <%if(starst && type!=\'starpool\'){%>oneIdolList <%}%>" title="<%=list[i].listBsCont%>"><%=list[i].listBsCont%></span>\n</div>\n<div class="details"  title="<%=list[i].listBsCont%>"><p><%=list[i].listBsCont%></p></div>\n<div class="btnsframe">\n<%if(type && type==\'all\'){%><span class="comp-bs" data-objid="<%=list[i].objId%>">举报</span><%}%>\n<span  class="del-bs" data-objid="<%=list[i].objId%>" style="<%if(type && type==\'star\'){%>margin-right: 15px; <%}%><%if(isdz){%>display:block;<%}%>">删除</span>\n</div>\n</div>\n<%}%>';
		var f = false;
		document.domain = "youku.com";
		var p = e.extend({
			initialize: function(e) {
				var t = this;
				this.options.uid = s.uid();
				this.options.ucode = s.ucode();
				this.options.isdz = PageConfig.videoOwner == this.options.uid ? true : false;
				t.starpoollist = [];
				this.arrlist = {
					iid: e.iid,
					ct: e.ct,
					cid: e.cid,
					ouid: 0,
					lid: e.lid,
					aid: e.aid,
					type: 1
				};
				if (window.dmpollevent) {
					window.dmpollevent.on("starpoolPage", function(e) {
						console.log("明星弹幕场配置:", e);
						t.starpoolPage = e
					});
					window.dmpollevent.on("addstarpool", function(e) {
						console.log("添加明星弹幕:", e);
						if (t.staractivity) t.staractivity.dmSatradd(e);
						else t.starpoollist.push(e)
					})
				}
				$("body").bind("appearDmpool", function() {
					t.load()
				})
			},
			events: {
				"click #bs_idol span": "dm_tabFn",
				"mouseenter .scroller-box .item-one": "dm_itemFnin",
				"mouseleave .scroller-box .item-one": "dm_itemFnout",
				"click .scroller-box .del-bs": "dm_delFn",
				"click .scroller-box .comp-bs": "dm_comFn"
			},
			dm_delFn: function(e) {
				var t = this;
				var i = $(e.currentTarget);
				if (t.options.isdz) {
					var a = {
						uid: this.options.uid,
						iid: t.options.iid,
						ct: t.options.ct,
						objId: i.attr("data-objid") || 0
					};
					n.getdel(a, function(e) {
						console.log(e)
					});
					console.log("owen删除")
				} else console.log("用户删除")
			},
			dm_comFn: function(e) {
				var t = this;
				var i = $(e.currentTarget);
				var a = i.offset().top - 120,
					r = i.offset().left - 70;
				var o = '<div class="comp-frame"  style="top: ' + a + "px;left: " + r + 'px;"><ul><li data-type="nosen" type="1">刷屏/无意义</li><li data-type="nohor" type="2">辱骂/不和谐</li><li data-type="spoiler" type="3">剧透/误导</li><li data-type="adver" type="4">广告/其他</li></ul></div>';
				var s = i.parents(".item-one").attr("data-uid");
				var d = i.parents(".item-one").find(".details").text();
				if ($("body .comp-box").length <= 0) $('<div class="comp-box"></div>').appendTo($("body")[0]).html(o);
				else $("body .comp-box").html(o);
				$("body").find(".comp-frame").mouseleave(function(e) {
					$("body").find(".comp-frame").remove()
				});
				$("body .comp-frame").find("li").on("click", function(e) {
					var a = $(e.currentTarget);
					$("body .comp-frame").hide();
					var r = {
						reason: a.text(),
						type: a.attr("type"),
						dmid: i.attr("data-objid"),
						uid: t.options.uid,
						iid: t.options.iid,
						reportUid: s,
						dmContent: d,
						status: -5,
						time: (new Date).getTime(),
						sign: l("Ef9/4e4d^@g9a2M3g" + (new Date).getTime() + t.options.uid + t.options.uid + i.attr("data-objid"))
					};
					n.getReport(r, function(e) {
						if (1 == e.code) {
							t.$el.append('<div class="jubao" style="position:absolute;left:48%;top:48%;background:#000;border-radius:3px;padding:10px;z-index:9999999;color:#fff;">举报成功</div>');
							setTimeout(function(e) {
								$(".jubao").fadeOut()
							}, 3e3)
						}
					})
				})
			},
			dm_tabFn: function(e) {
				var t = this;
				var i = $(e.currentTarget);
				$("#bs_idol span").removeClass("active");
				i.addClass("active");
				var n = i.attr("data-uid");
				$(".scroller-box", this.el).removeClass("dmnone").hide().eq(n).show();
				if (2 == n && !t.Starlist && t.labeldata.utag.length > 0) t.Starlist = new r($.extend({}, t.options, t.labeldata))
			},
			dm_itemFnin: function(e) {
				var t = this;
				var i = $(e.currentTarget);
				i.addClass("showBtnsframe")
			},
			dm_itemFnout: function(e) {
				var t = this;
				var i = $(e.currentTarget);
				i.removeClass("showBtnsframe")
			},
			load: function() {
				var e = this;
				if (!e.flag) {
					e.flag = a.addTab("bspoolBox", "弹幕列表", false);
					a.bind("tab:show", function() {
						if (!f) {
							f = true;
							e.render()
						}
					});
					e.getInfoFn(function(t) {
						e.labeldata = t
					})
				}
			},
			render: function() {
				var e = this;
				this.getpoolFn(0, function(i) {
					e.listdata = i;
					var n = $.extend({
						type: "all",
						uid: e.options.uid,
						isdz: e.options.isdz
					}, i, e.labeldata);
					$("#bspoolBox").html(t.compile(c)(n));
					var a = t.compile(u)(n);
					$("#bsp-alllist-wrap1").append(a);
					e.ScrollbarFn();
					e.scrollupdate();
					e.dmSatrLoad()
				})
			},
			dmSatrLoad: function() {
				var e = this;
				if (e.starpoolPage && !e.staractivity && e.labeldata.utag.length > 0) {
					e.staractivity = new o($.extend({
						starpoolPage: e.starpoolPage
					}, e.options, e.labeldata));
					if (e.starpoollist.length > 0) for (var t in e.starpoollist) e.staractivity.dmSatradd(e.starpoollist[t])
				}
			},
			scrollupdate: function() {
				var e = this;
				this.$el.bind("list:update1", function() {
					e.scroll.update()
				});
				d.bind("player:responsive", function() {
					e.scroll.update()
				})
			},
			getpoolFn: function(e, t) {
				var i = $.extend({}, this.arrlist, {
					begin: e
				});
				$(".bs_loadImg_box").eq(1).addClass("bs_loadImg");
				var a;
				var r = this;
				var o = [];
				n.getPool(i, function(e) {
					if (e.data.length > 0) {
						for (var i = 0; i < e.data.length; i++) o.push({
							listBsCont: e.data[i].content,
							uids: e.data[i].uid,
							objId: e.data[i].id,
							timePoint: r.timeConver(e.data[i].playat),
							seekTime: parseInt(e.data[i].playat / 1e3)
						});
						a = e.next;
						$("#bspoolBox").data("mat", a)
					}
					$(".bs_loadImg_box").eq(1).removeClass("bs_loadImg");
					t({
						totalCounts: e.count,
						list: o,
						Varnext: a,
						onePageBslen: e.data.length
					})
				})
			},
			timeConver: function(e) {
				var t = e / 1e3;
				if (t < 3600) {
					var i = parseInt(t / 60),
						n = Math.floor(t % 60);
					return (i >= 10 ? i : "0" + i) + ":" + (n >= 10 ? n : "0" + n)
				} else {
					var a = parseInt(t / 3600),
						r = parseInt(t % 3600 / 60),
						o = Math.floor(t % 3600 % 60);
					return (a >= 10 ? a : "0" + a) + ":" + (r >= 10 ? r : "0" + r) + ":" + (o >= 10 ? o : "0" + o)
				}
			},
			getInfoFn: function(e) {
				var t, i = [],
					a;
				n.getInfo(this.arrlist, function(n) {
					if (1 == n.code) {
						t = n.count;
						if (n.utag.length > 0) {
							a = n.utag;
							i.push({
								name: "星驾到",
								uid: "0",
								dis: "0"
							});
							i.push({
								name: "全部",
								uid: "1",
								dis: "1"
							});
							i.push({
								name: "明星",
								uid: "2",
								dis: "2"
							})
						}
					} else console.log("iid错误");
					e({
						utag: a,
						totalCounts: t,
						idols: i
					})
				})
			},
			ScrollbarFn: function() {
				var e = this;
				var n = false;
				this.scroll = new i($(".scroller", this.el).eq(1), {
					draggerMinLength: 30
				});
				this.scroll.bind("scroll:end", function() {
					if (n) return;
					n = true;
					setTimeout(function() {
						n = false
					}, 3e3);
					var i = $("#bspoolBox").data("mat");
					if ( !! i) e.getpoolFn(i, function(i) {
						var n = $.extend({
							type: "all",
							uid: e.options.uid,
							isdz: e.options.isdz
						}, i, e.labeldata);
						var a = t.compile(u)(n);
						$("#bsp-alllist-wrap1").append(a);
						$("#bspoolBox").data("mat", i.Varnext);
						e.$el.trigger("list:update1")
					})
				})
			}
		});
		return p
	});
	define("page/find/play/model/interaction/dramaModel", ["tui/event", "tui/net", "module/login/login"], function(e, t, i) {
		var n = e.extend({
			initialize: function() {
				var e = this;
				n.superClass.initialize.call(e);
				this.domain = PageConfig.homeHost;
				e.op = {
					callbackName: "callback",
					charset: "utf-8"
				}
			},
			getPageData: function(e, i) {
				var n = this;
				t.getJSON(this.domain + e + "?beta", i, function(e) {
					if (1 == e.error) n.trigger("getPageData:success", [e])
				}, n.op)
			},
			getEpisodeRelations: function(e) {
				var i = this;
				t.getJSON(this.domain + "page/relate" + "?beta", e, function(e) {
					if (1 == e.error) i.trigger("getEpisodeRelations:success", [e])
				}, i.op)
			},
			getTVPoint: function(e) {
				var i = this;
				t.getJSON(this.domain + "page/tvpoint" + "?beta", e, function(e) {
					if (1 == e.error) i.trigger("getTVPoint:success", [e])
				}, i.op)
			},
			checkInteract: function(e) {
				var i = this;
				t.getJSON(this.domain + "action/checkInteract?beta", e, function(e) {
					if (1 == e.error) i.trigger("checkInteract:sucess", [e.data])
				}, i.op)
			}
		});
		return n
	});
	define("page/find/play/interac", ["tui/event", "page/find/play/interaction/dramaTab", "page/find/play/model/interaction/dramaModel"], function(e, t, i) {
		var n = e.extend({
			initialize: function() {
				this.mod = new i;
				this.mod.bind("checkInteract:sucess", this.init.bind(this));
				this.mod.checkInteract({
					showid: PageConfig.showid,
					vid: PageConfig.videoId
				})
			},
			init: function(e) {
				var t = this;
				if (e.interact) {
					var i = {
						1: "103",
						2: "101",
						3: "100",
						4: "104",
						5: "102"
					};
					this.log = {
						pvid: PageConfig.videoId,
						showId: PageConfig.showid,
						pageType: i[PageConfig.playmode]
					};
					require.async(["playerPlugins"], function(i) {
						if (1 == PageConfig.playmode) t.initCard(i);
						else {
							t.initTimeLine(i);
							var n = new Date;
							var a = n.getTime();
							if (a > 1476979203141 && a < 1478793563275) if (e.first) $("li[_to=timeline]").trigger("click")
						}
					})
				}
			},
			initTimeLine: function(e) {
				var i = e(PageConfig.videoId, "timeline", $("#timeline"), $("#movie_player")[0], this.log, function() {
					t.addTab("timeline", "互动", false);
					ykPlyr.bind("player:timelineFadeStart", function(e) {
						t.addTab("timeline", "互动", true, function() {
							i.showPlugin(e.id)
						})
					})
				});
				var n = e(PageConfig.videoId, "pk", $("#actionInfo"), $("#movie_player")[0], this.log, function() {
					t.addTab("actionInfo", "PK榜", false)
				})
			},
			initCard: function(e) {
				var t = $("#module_basic_interact");
				var i = e(PageConfig.videoId, "cards", t, $("#movie_player")[0], this.log, function() {
					t.css({
						"margin-bottom": "20px"
					});
					ykPlyr.bind("player:timelineFadeStart", function(e) {
						i.showPlugin(e.id)
					})
				})
			}
		});
		return n
	});
	define("tui/switchTab", ["tui/event"], function(e) {
		var t = function(t) {
				this.op = t || {};
				this.op.slide = t.slide || false;
				this.op.linktab = t.linktab || false;
				this.op.clicktab = t.clicktab || false;
				if (!t.box) return;
				var a = this;
				var r = this.box = $(t.box);
				var o = this.tab = $(t.tab || ".tab li", r);
				var s = this.panel = $(t.panel || ".c", r);
				this.event = new e;
				this.size = o.length || s.length;
				this.loop = t.loop || 0;
				this.current = i(o.filter(".current")[0]);
				if (t.slide) {
					this.scroll = s.parent().parent();
					this.scroll.scrollLeft(0);
					s.eq(this.current).find(".lazyImg").loadImgSrc();
					s.parent().append(s.eq(0).clone());
					this.panel = $(t.panel || ".c", r);
					this.width = s.width();
					this.delay = t.delay || 700;
					this.loop = (this.loop || 5e3) + this.delay;
					this.anilock = false
				}
				if (this.size < 2) return;
				if (t.clicktab) o.click(function(e) {
					e.preventDefault();
					a.go(i(this))
				});
				else {
					if (!t.linktab) o.click(function(e) {
						e.preventDefault()
					});
					o.mouseenter(function() {
						n(a.timer, a.looptimer);
						var e = this;
						a.timer = setTimeout(function() {
							a.go(i(e))
						}, 200)
					}).mouseleave(function() {
						n(a.timer, a.looptimer);
						a.start()
					})
				}
				if (a.loop) {
					a.check(t.clicktab ? o : null);
					a.start()
				}
			};
		t.prototype = {
			on: function(e, t) {
				this.box.eventProxy(e, t);
				return this
			},
			bind: function(e, t) {
				this.event.bind(e, t);
				return this
			},
			go: function(e, t) {
				e = t ? e : Math.min(Math.max(e, 0), this.size - 1);
				this.event.fire("before", [this.current, e, this]);
				if (this.op.slide) {
					if (this.anilock) {
						this.nextstep = function() {
							this.animate(e, t)
						};
						return
					}
					this.animate(e, t)
				} else {
					this.current = e % this.size;
					this.event.fire("change", [this.current, this]);
					this.tab.removeClass("current").eq(this.current).addClass("current");
					this.panel.hide().eq(this.current)[this.op.fade ? "fadeIn" : "show"](this.op.duration ? this.op.duration : 0);
					this.event.fire("after", [this.current, this])
				}
			},
			prev: function(e) {
				this.go(this.current - 1, e)
			},
			next: function(e) {
				this.go(this.current + 1, e)
			},
			start: function(e) {
				var t = this;
				if (t.loop) {
					n(t.looptimer);
					if (e) t.start();
					t.looptimer = setTimeout(function() {
						t.start();
						t.next(true)
					}, t.loop)
				}
			},
			stop: function() {
				n(this.looptimer)
			},
			check: function(e) {
				var t = this;
				(e || t.panel).mouseenter(function() {
					n(t.looptimer)
				}).mouseleave(function() {
					n(t.looptimer);
					t.start()
				})
			},
			animate: function(e, t) {
				var i = this;
				var a = i.current;
				if (i.anilock || a == e) return;
				n(i.looptimer);
				var r = i.size,
					o = i.width,
					s = i.panel,
					l = i.scroll;
				var d = a > e ? 0 : o;
				var c = a > e ? o : 0;
				e %= t ? r + 1 : r;
				s.eq(e).show().find(".lazyImg").loadImgSrc();
				l.scrollLeft(c);
				i.tab.removeClass("current").eq(e % r).addClass("current");
				l.animate({
					scrollLeft: d
				}, i.delay, "easeInOutQuad", function() {
					s.eq(a).hide();
					if (t && e == r) {
						e %= r;
						s.eq(0).show().find(".lazyImg").loadImgSrc();
						s.eq(r).hide()
					}
					l.scrollLeft(0);
					i.current = e;
					i.anilock = false;
					i.event.fire("after", [i.current, i]);
					if (i.nextstep) {
						i.nextstep();
						i.nextstep = null
					}
					if (t) i.start()
				});
				i.anilock = true
			}
		};

		function i(e) {
			if (e && e.tagName) {
				var t = "a" == e.tagName.toLowerCase() ? $(e) : $(e).find("a");
				t = t.length ? t : $(e);
				return (t.attr("rel") || t.attr("href").replace(/.*#(\d+)$/, "$1") || 1) - 1
			} else return 0
		}
		function n(e) {
			var t = arguments;
			for (var i = 0, n = t.length; i < n; i++) {
				var e = t[i];
				if (e) clearTimeout(e)
			}
			return null
		}
		return t
	});
	define("page/find/play/model/listall", ["tui/event", "tui/net", "tui/cookie", "module/login/login"], function(e, t, i, n) {
		var a = e.extend({
			initialize: function() {
				var e = this;
				a.superClass.initialize.call(e);
				this.domain = PageConfig.homeHost;
				e.op = {
					callbackName: "callback",
					charset: "utf-8"
				}
			},
			getStatRank: function(e) {
				var i = this;
				t.getJSON(this.domain + "related/statRank" + "?beta" + "&t=" + (new Date).getTime(), e, function(e) {
					if (1 == e.error) i.trigger("getStatRank:success", [e])
				}, i.op)
			},
			getSubRank: function(e) {
				var t = this;
				$.ajax({
					type: "get",
					url: this.domain + "related/subRank" + "?beta" + "&t=" + (new Date).getTime(),
					data: e,
					dataType: "jsonp",
					success: function(e) {
						if (0 == e.error) t.trigger("getSubRank:success", [e]);
						else t.trigger("getSubRank:fail", ["module_basic_subrank"])
					},
					error: function(e) {
						t.trigger("getSubRank:fail", ["module_basic_subrank"])
					}
				})
			},
			getInfo: function(e) {
				var t = this;
				$.ajax({
					type: "get",
					url: this.domain + "related/info" + "?beta" + "&t=" + (new Date).getTime(),
					data: e,
					dataType: "jsonp",
					success: function(e) {
						if (0 == e.error) t.trigger("getInfo:success", [e]);
						else t.trigger("getInfo:fail", ["module_basic_info"])
					},
					error: function(e) {
						t.trigger("getInfo:fail", ["module_basic_info"])
					}
				})
			},
			getStar: function(e) {
				var i = this;
				t.getJSON(this.domain + "related/star" + "?beta" + "&t=" + (new Date).getTime(), e, function(e) {
					if (0 == e.error) i.trigger("getStar:success", [e.data]);
					else i.trigger("getStar:fail", ["module_basic_star"])
				}, i.op)
			},
			getSubInfo: function(e) {
				var t = this;
				$.ajax({
					type: "get",
					url: this.domain + "action/sub" + "?beta",
					data: e,
					dataType: "jsonp",
					beforeSend: function(e) {
						var t = $.trim(i("_zpdtk"));
						if (t) return e.setRequestHeader("X-CSRF-TOKEN", t)
					},
					success: function(e) {
						if (0 == e.error) t.trigger("getSubInfo:success", [e.data]);
						else t.trigger("getSubInfo:fail", ["module_basic_sub"])
					}
				})
			},
			createSub: function(e) {
				var t = this;
				$.ajax({
					type: "get",
					url: this.domain + "action/createSub" + "?beta",
					data: e,
					beforeSend: function(e) {
						var t = $.trim(i("_zpdtk"));
						if (t) return e.setRequestHeader("X-CSRF-TOKEN", t)
					},
					success: function(e) {
						if (e.data) t.trigger("createSub:success", []);
						else t.trigger("sub:error", [])
					}
				})
			},
			destroySub: function(e) {
				var t = this;
				$.ajax({
					type: "get",
					url: this.domain + "action/destroySub" + "?beta",
					data: e,
					beforeSend: function(e) {
						var t = $.trim(i("_zpdtk"));
						if (t) return e.setRequestHeader("X-CSRF-TOKEN", t)
					},
					success: function(e) {
						if (e.data) t.trigger("destroySub:success", []);
						else t.trigger("sub:error", [])
					}
				})
			},
			getChannels: function(e) {
				var t = this;
				$.ajax({
					type: "get",
					url: "//x.youku.com/api/channel/getChannels",
					data: e,
					dataType: "jsonp",
					success: function(e) {
						if (0 == e.error_code) {
							var i = [];
							for (var n in e.data) i.push(e.data[n]);
							t.trigger("getChannels:success", [i])
						} else t.trigger("getChannels:error", [i])
					},
					error: function(e) {
						t.trigger("getChannels:fail", [])
					}
				})
			},
			getTopic: function(e) {
				var t = this;
				$.ajax({
					type: "get",
					url: "//gh.youku.com/community/getTopicIds",
					data: e,
					dataType: "jsonp",
					success: function(e) {
						if (0 == e.errno) t.trigger("getTopic:success", [e.data]);
						else t.trigger("getTopic:fail", [])
					}
				})
			},
			getInfoM: function(e) {
				var t = this;
				$.ajax({
					type: "get",
					url: this.domain + "related/videoinfo?t=" + (new Date).getTime(),
					data: e,
					dataType: "jsonp",
					success: function(e) {
						if (1 == e.error) t.trigger("getInfoM:success", [e.data]);
						else t.trigger("getInfoM:fail", ["module_basic_infom"])
					},
					error: function(e) {
						t.trigger("getInfoM:fail", ["module_basic_infom"])
					}
				})
			}
		});
		return a
	});
	define("page/find/play/relationlist/interest", ["tui/view", "tui/art", "tui/net", "tui/browser", "module/login/login", "module/global", "page/find/play/model/listall", "tui/switchTab", "tui/slide2", "tui/lazyImageLoader", "tui/util/num"], function(e, t, i, n, a, r, o, s, l, d, c) {
		t.helper("$Num", function(e) {
			return c.field(e)
		});
		var u = e.extend({
			initialize: function() {
				var e = this;
				this.$wrap = $("#module_basic_interest");
				this.mod = new o;
				this.modelEvents(this.mod);
				if (this.$wrap.length > 0) this.mod.getChannels({
					vcate_id: PageConfig.catId
				})
			},
			"{mod} getChannels:success": function(e) {
				var i, n, a;
				i = '<div class="play_wrapper modSwitch ">\n<div class="play_header clearfix">\n<h2>兴趣频道</h2>\n<ul class="t_tab">\n<% data.forEach(function(t, i){ %>           \n<li class="<%if(i==0){%> current <%}%>">\n<a href="<%=t[0].channel_url%>" rel="<%=i+1%>"  target="_blank"><img src="<%=t[0].icon_url%>"><%=t[0].channel_name%></a>\n</li>\n<% }); %>  	\n</ul>\n</div>\n<div class="play_content">\n<% data.forEach(function(t, i){ %> \n<div class="tab-c" <%if(i!=0){%> style="display:none;" <%}%>>\n<%if(i!=0){%>  \n<textarea class="lazyContent">\n<%}%>\n<div class="modPSlide mod_pslide " id="mdinst<%=i%>">\n<div class="mbtn prev" style="display: none;">\n<a href="#" class="iconfont" title="上一组"></a>\n</div>\n<div class="mbtn next" style="display: block;">\n<a href="#" class="iconfont" title="下一组"></a>\n</div>\n<ul class="panel">\n<% t.forEach(function(m, n){ %> \n<li class="yk-col4">\n<div class="yk-pack p-list ">\n<div class="p-thumb">\n<a href="<%=m.video_url%>" title="<%=m.video_title%>"  target="video"></a>\n<i class="bg"></i>\n<img class="quic"  src="<%=m.video_icon_url%>">\n</div>\n<ul class="p-info pos-bottom">\n<li class="status hover-hide">\n<span class="p-time">\n<i class="ibg"></i>\n<span><%=m.video_seconds%></span>\n</span>\n</li>\n</ul>\n<ul class="info-list">\n<li class="title short-title">\n<a href="<%=m.video_url%>" title="<%=m.video_title%>"  target="video"><%=m.video_title%></a>\n</li>\n<li>\n<span><%=$Num(m.video_vv)%>次播放</span>\n</li>\n</ul>\n</div>\n</li>	\n<% }); %> \n</ul>\n</div>\n<%if(i!=0){%>  \n</textarea>\n<%}%>	\n</div>\n<% }); %> 	\n</div>\n</div>';
				n = t.compile(i)({
					data: e
				});
				this.$wrap.html(n);
				a = new s({
					box: this.$wrap,
					tab: ".t_tab li",
					panel: ".tab-c",
					linktab: true
				});
				a.bind("change", function(e) {
					var t = a.panel.eq(e);
					var i = t.children().eq(0);
					if (i.hasClass("lazyContent")) {
						t.html(i.val());
						l(t)
					}
				});
				l(this.$wrap)
			},
			"{mod} getChannels:error": function() {
				this.$wrap.remove()
			}
		});
		return u
	});
	define("page/find/play/sub", ["tui/view", "tui/art", "module/login/login", "page/find/play/model/listall", "module/subscribe/curvefly", "tui/util/num"], function(e, t, i, n, a, r) {
		var o = e.extend({
			el: $("#module_basic_sub"),
			initialize: function(e) {
				var t = this;
				if (!this.$el.length) return;
				this.mod = new n;
				this.mod.bind("getSubInfo:success", this.render.bind(this));
				this.mod.bind("sub:error", this.subError.bind(this));
				this.mod.bind("createSub:success", this.subedcb.bind(this));
				this.mod.bind("destroySub:success", this.unSubedcb.bind(this));
				t.locked = false;
				window.ykPlyr.bind("player:onPlayerStartUpdate", function() {
					t.status()
				});
				$(document).bind("logchange", function() {
					if (t.locked) return;
					setTimeout(function() {
						t.status()
					}, 200)
				});
				this.status()
			},
			events: {
				"click .v-sub-action": "subed",
				"click .v-sub-done": "unsub",
				"mouseenter .v-sub-done": "enter",
				"mouseleave .v-sub-done": "leave"
			},
			status: function() {
				this.mod.getSubInfo({
					vid: PageConfig.videoId,
					ownerid: PageConfig.videoOwner_en,
					showid: 0,
					addtion: "1_1",
					pm: PageConfig.playmode
				})
			},
			subed: function(e) {
				var t = this;
				var n = '<a class="create-center" target="_blank" href="//i.youku.com/u/creative_center">创作中心</a>';
				if (t.locked) return;
				t.$subBtn = $(e.currentTarget);
				t.avatar = t.$subBtn.attr("data-img");
				i.login(function() {
					t.locked = true;
					i.checkLogin(function() {
						if (i.uid() == PageConfig.videoOwner) t.$subBtn.replaceWith(n);
						else t.mod.createSub({
							follow: PageConfig.videoOwner_en,
							addtion: "1_1"
						})
					})
				})
			},
			unsub: function() {
				var e = this;
				if (e.locked) return;
				i.login(function() {
					e.locked = true;
					e.mod.destroySub({
						follow: PageConfig.videoOwner_en,
						addtion: "1_1"
					})
				})
			},
			subedcb: function() {
				var e = this.$el.find(".sub-num");
				e.html(r.field(++this.subcount));
				this.animate(this.avatar, this.$subBtn);
				this.locked = false;
				this.$sub.removeClass("v-sub-action").addClass("v-sub-done").html("已订阅");
				window.YK_CPA && YK_CPA.trackReg()
			},
			unSubedcb: function() {
				var e = this.$el.find(".sub-num");
				this.locked = false;
				e.html(r.field(--this.subcount));
				this.$sub.removeClass("v-sub-done").addClass("v-sub-action").html("订阅")
			},
			subError: function() {
				this.locked = false
			},
			enter: function() {
				this.$sub.html("取消订阅")
			},
			leave: function() {
				this.$sub.html("已订阅")
			},
			render: function(e) {
				e.subnum = r.field(e.subcount);
				var n = this,
					a;
				var o = '<%data.thumb=data.thumb||\'//static.youku.com/v1.0.153/user/img/head/64/999.jpg\'%>\n<dl id="subscription_wrap">\n<dt><a href="<%=data.url%>" target="_blank"><img src="<%=data.thumb%>"></a></dt>\n<dd>\n<a href="<%=data.url%>" class="sub-name" target="_blank" ><%=data.title%>\n<%if(data.verified==1&&data.disable){%>\n<img  class="dyh-icon" width="16" height="16" title="大鱼号" src="<%=data.icon%>"/>\n<%}%>\n</a>\n<%if(data.ischannel==1){%>\n<%if(!data.disable){%>\n<span class="channel-label">来自频道：\n<a target="_blank" href="<%=data.channelurl%>"><%=data.channelname%>\n<%if(data.verified==1){%>				\n<img width="14" class="dyh-icon" height="14" title="大鱼号" src="<%=data.icon%>"/>\n<%}%>	\n</a>\n</span>\n<%}%>\n<%}%>\n</dd>	\n<%if(!data.description){%>\n<dd title="该频道虽然没有简介，但内容说不定特别精彩哦~">\n该频道虽然没有简介，但内容说不定特别精彩哦~\n</dd>\n<%}else{%>\n<dd title="<%=data.description%>">\n<%=data.description%>\n</dd>\n<%}%>\n<dd class="sub-des">\n<%if(data.subcount!=\'0\'){%>\n<span class="sub-num-wrap"><span data-num="<%=data.subcount%>" class="sub-num"><%=data.subnum%></span>粉丝</span>\n<%}%>\n<%if(data.isSelf){%>\n<a class="create-center" target="_blank" href="//i.youku.com/u/creative_center">创作中心</a>\n<%}else{%>\n<%if(data.subscribed){%>\n<a class="v-sub-btn v-sub-done"  data-img="<%=data.thumb%>"  href="javascript:void(0);">已订阅</a>\n<%}else{%>\n<a class="v-sub-btn v-sub-action" data-img="<%=data.thumb%>" href="javascript:void(0);">订阅</a>\n<%}%>\n<%}%>\n</dd>\n</dl>\n';
				e.isSelf = false;
				if (i.uid() == PageConfig.videoOwner) e.isSelf = true;
				e.disable = 2 == PageConfig.playmode || 1 == PageConfig.playmode;
				a = t.compile(o)({
					data: e
				});
				this.$el.html(a);
				n.subcount = e.subcount;
				this.$sub = this.$el.find(".v-sub-btn")
			},
			animate: function(e, t) {
				var i = $("#qheader_sub_num").parent().offset();
				var n = i.left + 8;
				var r = i.top;
				var o = t.offset();
				var s = o.left + 8;
				var l = o.top - 4;
				a.create(s, l, n, r, e, 18).start()
			}
		});
		return o
	});
	define("module/stat/log", [], function() {
		var e = {};
		e.logCookieKey = "logCookieKey";
		e._addScript = function(e) {
			var t = document.createElement("script");
			t.type = "text/javascript";
			t.src = e;
			document.getElementsByTagName("head")[0].appendChild(t)
		};
		e.addScript = function(t) {
			var i = new RegExp("@" + 3 + "@", "g");
			var n = new RegExp("@" + 4 + "@", "g");
			var a = new RegExp("@" + 5 + "@", "g");
			var r = new RegExp("@" + 6 + "@", "g");
			var o = new RegExp("@" + 7 + "@", "g");
			var s = new RegExp("@" + 8 + "@", "g");
			t = t.replace(i, "//lstat.youku.com/nstay.php").replace(n, "//e.stat.youku.com/hot/click").replace(a, "//r.l.youku.com/recclick").replace(r, "//p.l.youku.com/ugctagclick").replace(o, "//r.l.youku.com/rec_at_click").replace(s, "//r.l.youku.com/recpclick");
			t += "&=" + Math.floor(1e6 * Math.random());
			e._addScript(t)
		};
		e.log = function(t, i, n) {
			if ("number" != typeof t) return;
			var a = n ? n : 0;
			var r = "";
			if (0 == a) {
				var o = document.cookie;
				var s = o.split("; ");
				for (var l = 0; l < s.length; l++) {
					var d = s[l].split("=");
					if (e.logCookieKey == d[0]) {
						if ("invalid" != d[1]) r = unescape(s[l].substring(e.logCookieKey.length + 1, s[l].length));
						break
					}
				}
			}
			r += "@" + t + "@";
			if ("object" == typeof i) {
				argUrl = "";
				for (arg in i) argUrl += "&" + arg + "=" + i[arg];
				if (4 == t) document.cookie = "__utmarea=" + i.charset + ";path=/;domain=youku.com";
				r += "?" + argUrl.substring(1, argUrl.length) + "^"
			} else {
				if (4 == t) document.cookie = "__utmarea=" + i.substring(8, i.length) + ";path=/;domain=youku.com";
				r += "?" + i + "^"
			}
			if (0 == a) document.cookie = e.logCookieKey + "=" + escape(r) + ";path=/;domain=youku.com";
			else e.addScript(r)
		};
		e.readLogCookie = function() {
			var t = document.cookie;
			var i = t.split("; ");
			var n = "";
			found = 0;
			for (var a = 0; a < i.length; a++) {
				var r = i[a].split("=");
				if (e.logCookieKey == r[0]) {
					found = 1;
					if ("invalid" == r[1]) break;
					n = unescape(i[a].substring(e.logCookieKey.length + 1, i[a].length));
					requestUrl = n.substring(0, n.length - 1).split("^");
					for (var a = 0; a < requestUrl.length; a++) e.addScript(requestUrl[a]);
					document.cookie = e.logCookieKey + "=invalid" + ";path=/;domain=youku.com";
					break
				}
			}
		};
		return e
	});
	define("page/find/play/model/interaction/interactionBottom", ["tui/event", "tui/net", "tui/cookie", "module/login/login"], function(e, t, i, n) {
		var a = e.extend({
			initialize: function() {
				var e = this;
				a.superClass.initialize.call(e);
				this.domain = PageConfig.homeHost;
				e.op = {
					callbackName: "callback",
					charset: "utf-8"
				}
			},
			getVideoPlayInfo: function(e) {
				var i = this;
				t.getJSON(this.domain + "action/getVideoPlayInfo" + "?beta" + "&timestamp=" + (new Date).getTime(), e, function(e) {
					if (1 == e.error) i.trigger("getVideoPlayInfo:success", [e])
				}, i.op)
			},
			updown: function(e) {
				var t = this;
				e.timestamp = +new Date;
				$.ajax({
					type: "post",
					url: this.domain + "action/updown?beta",
					data: e,
					beforeSend: function(e) {
						var t = $.trim(i("_zpdtk"));
						if (t) return e.setRequestHeader("X-CSRF-TOKEN", t)
					},
					success: function(e) {
						if (0 == e.error || e.error == -1 || 2 == e.error) t.trigger("updown:success", [e.data]);
						else t.trigger("updown:error", [])
					}
				})
			},
			addFav: function(e) {
				var t = this;
				e.timestamp = +new Date;
				$.ajax({
					type: "post",
					url: this.domain + "action/addFav?beta",
					data: e,
					beforeSend: function(e) {
						var t = $.trim(i("_zpdtk"));
						if (t) return e.setRequestHeader("X-CSRF-TOKEN", t)
					},
					success: function(e) {
						if (0 == e.error || e.error == -1 || 2 == e.error) t.trigger("addFav:success", [e.error]);
						else t.trigger("addFav:error", [])
					}
				})
			}
		});
		return a
	});
	define("page/find/play/interaction/iku", ["tui/class", "tui/cookie"], function(e, t) {
		var i = "";
		var n = PageConfig.homeHost;

		function a() {
			$.ajax({
				url: n + "user/authCode",
				dataType: "jsonp",
				success: function(e) {
					if (!e.error && e.data && e.data.authCode) i = e.data.authCode + "|"
				}
			})
		}
		setTimeout(function() {
			a()
		}, 1e3);
		$(document).on("logchange", function() {
			a()
		});
		var r = e.extend({
			initialize: function() {
				this.loadIkuJs("auto")
			},
			loadIkuJs: function(e, t) {
				if ("undefined" == typeof window.ikuNewExecute || "undefined" == typeof window.getP2PStateFromIku) $.getScript("//js.ykimg.com/youku/dist/js/lib/ikuAdapterNew.js", function() {
					t && t();
					setTimeout(function() {
						if ("function" == typeof window.getP2PStateFromIku) getP2PStateFromIku()
					}, 500)
				});
				return true
			},
			ikuExecuteFrompc: function(e) {
				var n = true;
				if (!e.from || !e.action || "video" != e.from && "video" == e.action && !e.sid || "video" != e.from && "show" != e.from && "show" == e.action && !e.sid) {
					n = 0;
					if ("function" === typeof callback) {
						callback(n);
						return false
					} else return n
				}
				if ("undefined" == typeof window.ikuNewExecute) this.loadIkuJs("click");
				setTimeout(function() {
					var n = 0;
					var a = !e.callback ? "" : e.callback;
					var r = !e.secne ? "" : e.secne;
					var o = e.from;
					var s = e.action;
					var l = "";
					var d = !t("ykss") ? "" : t("ykss");
					if ("video" == s) {
						var c = "";
						var u = "";
						if ("video" == o) {
							if (window.ykPlyr && "function" == typeof window.ykPlyr.PlayerInfo) {
								var f = window.ykPlyr.PlayerInfo();
								if (f) {
									c = null != f.langVid ? f.langVid : f.vidEncoded;
									u = !f.quality ? "mp4" : f.quality
								}
							}
							c = "" != c ? c : window.videoId2
						}
						if (!c && e.sid) c = e.sid;
						if (c) {
							u = !u ? "mp4" : u;
							var p = "//v.youku.com/v_show/id_" + c + ".html";
							l = "iku://|video|" + p + "|quality=" + u + "|ykss=" + d + "|" + i
						} else n = 0
					} else if ("show" == s) {
						var m = "";
						var u = "";
						if ("video" == o) {
							if (window.ykPlyr && "function" == typeof window.ykPlyr.PlayerInfo) {
								var f = window.ykPlyr.PlayerInfo();
								if (f) u = !f.quality ? "mp4" : f.quality
							}
							m = "undefined" != typeof PageConfig.showid_en ? "z" + PageConfig.showid_en : ""
						} else if ("show" == o) m = "undefined" != typeof window.g_config.id ? window.g_config.id : "";
						if (e.sid) m = e.sid;
						if (m) {
							u = !u ? "mp4" : u;
							l = "iku://|vshow|download|" + m + "|quality=" + u + "|ykss=" + d + "|" + i
						} else n = 0
					} else if ("play" == s) {
						var c = "";
						if ("video" == o) {
							if (window.ykPlyr && "function" == typeof window.ykPlyr.PlayerInfo) {
								var f = window.ykPlyr.PlayerInfo();
								if (f) c = null != f.langVid ? f.langVid : f.vidEncoded
							}
							c = "" != c ? c : window.videoId2
						}
						if (e.sid) c = e.sid;
						if (c) l = "iku://|play|web|videoid|playerror|" + c + "|ykss=" + d + "|" + i;
						else n = 0
					} else if ("adddesktop" == s) {
						var m = "";
						var u = "";
						if ("video" == o) {
							if (window.ykPlyr && "function" == typeof window.ykPlyr.PlayerInfo) {
								var f = window.ykPlyr.PlayerInfo();
								if (f) u = !f.quality ? "mp4" : f.quality
							}
							m = "undefined" != typeof PageConfig.showid_en ? "z" + PageConfig.showid_en : ""
						}
						if (e.sid) m = e.sid;
						if (m) {
							u = !u ? "mp4" : u;
							l = "iku://|vshow|shortcut|" + m + "|quality=" + u + "|ykss=" + d + "|" + i
						} else n = 0
					}
					var h = function(e) {
							n = -1;
							var t = "//iku.youku.com/pc/index?tp=v&ori=ykplay&id=" + window.videoId2;
							if (u) t += "&q=" + u;
							var i = "";
							if ("undefined" == typeof e || false == e || "" == e || e.indexOf("//iku.youku.com") == -1) i = t;
							else i = e;
							var a = document.createElement("iframe");
							a.width = 0;
							a.height = 0;
							a.src = i;
							document.body.appendChild(a);
							setTimeout(function() {
								document.body.removeChild(a)
							}, 1e4)
						};
					var v = function(e) {
							n = 1
						};
					if ("Microsoft Internet Explorer" == window.navigator.appName && ("MSIE 6." == navigator.appVersion.match(/MSIE 6./i) || "MSIE 7." == navigator.appVersion.match(/MSIE 7./i))) ikuNewExecute(l, r, v, h);
					else {
						var g = ikuNewExecute(l, r);
						if ("ok" != g) h(g);
						else v(g)
					}
					if ("function" === typeof a) a(n);
					else return n
				}, 200)
			}
		});
		var o = new r;
		return o
	});
	define("tui/common", [], function() {
		var e = {
			speed: 400,
			init: function(e) {
				if (jQuery) {
					var t = this;
					var i = jQuery(".scroll-" + e);
					var n = parseInt(i.offset().top) - 65;
					if (i.length) jQuery("html, body").stop().animate({
						scrollTop: n
					}, t.speed, function() {
						location.hash = e
					})
				}
			}
		};
		var t = function() {
				var e = document.createElement("div");
				return function(t) {
					var i = t.charAt(0).toUpperCase() + t.slice(1),
						n = "Webkit Moz O ms",
						a = n.split(" "),
						r = (t + " " + a.join(i + " ") + i).split(" ");
					for (var o in r) {
						var t = r[o];
						if ( !! !~ ("" + t).indexOf("-") && void 0 !== e.style[t]) return true
					}
					return false
				}
			}();

		function i(e) {
			switch (typeof e) {
			case "undefined":
				return true;
			case "string":
				if (0 == $.trim(e).length) return true;
				break;
			case "boolean":
				if (!e) return true;
				break;
			case "number":
				if (0 === e) return true;
				break;
			case "object":
				if (null === e) return true;
				if (void 0 !== e.length && 0 == e.length) return true;
				for (var t in e) return false;
				return true
			}
			return false
		}
		var n = {
			init: function() {
				var e = "vv";
				if (1 == window.paid) e += ",permission";
				nova_request(getVideoPageInfoCallback, "/QVideo/~ajax/getVideoPlayInfo", {
					id: videoId,
					sid: showid,
					type: e,
					catid: catId
				})
			},
			callback: function() {
				if (null == info) return;
				try {
					if ("object" != typeof info) info = JSON.parse(info)
				} catch (e) {
					return
				}
				if (1 == window.paid && info.permission) if (info.permission == -1) Interact.disableUpDowned();
				else Interact.initUpDowned();
				else Interact.initUpDowned()
			}
		};
		var a = function(e) {
				num = e.toString();
				var t = Math.abs(num).toString();
				if (t.length < 4) return num;
				var i = "";
				if (num.indexOf(".") != -1) var i = "." + num.split(".")[1];
				var n = t.length;
				var a = n % 3;
				var r = [];
				var o = 0 == a ? 3 : a;
				r[0] = t.slice(0, o);
				var s = 1;
				while (o + 3 <= n) {
					r[s++] = t.slice(o, o + 3);
					o += 3
				}
				r = r.join(",");
				if (0 === num.indexOf("-")) r = "-" + r;
				return r + i
			};
		var r = {
			url: "Bad url, watch browser console error.",
			Local: window.Local,
			err: function(e) {
				if (!window["console"]) window["console"] = {
					log: function() {},
					clear: function() {},
					debug: function() {},
					error: function() {},
					info: function() {},
					count: function() {},
					time: function() {},
					trace: function() {},
					warn: function() {}
				};
				if (window.console && window.console.error) window.console.error("[cdn function error] " + e + ".")
			},
			cdn: function(e, t) {
				if ("/" != e.charAt(0)) {
					this.err("@param path: relative to root start by /");
					return this.url
				}
				if (!this.Local) {
					this.err("@see BETA-18932: template funciton {nova->globaJS}");
					return this.url
				}
				var i = "RELEASE_TAG",
					n = this.Local[i];
				if (!n) {
					this.err("@see local: " + i + " not defined");
					return this.url
				}
				i = t.toUpperCase() + "SERVER", server = this.Local[i];
				if (!server) {
					this.err("@see local: " + i + " not defined.");
					return this.url
				}
				if (!server.match(/^(http|https)/)) {
					this.err("@see local: " + i + " is server, add protocol");
					return this.url
				}
				if (server.match(/\/$/)) {
					this.err("@see local: " + i + " is server, not ending by /");
					return this.url
				}
				this.url = server + "/" + n + e;
				return this.url
			},
			cdn_jsurl: function(e) {
				return this.cdn(e, "js")
			},
			cdn_cssurl: function(e) {
				return this.cdn(e, "css")
			},
			cdn_imgurl: function(e) {
				return this.cdn(e, "img")
			}
		};
		var o = function(e) {
				if ("undefined" == typeof e || null == e || "null" == e || 0 == e.length) return "";
				return e.replace(/[<>&"]/g, function(e) {
					return {
						"<": "&lt;",
						">": "&gt;",
						"&": "&amp;",
						'"': "&quot;"
					}[e]
				})
			};
		var s = function(e) {
				var t, i, n;
				var a, r;
				var o = [];
				i = e.length;
				t = 0;
				while (t < i) {
					n = e.charCodeAt(t++);
					switch (n >> 4) {
					case 0:
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
					case 6:
					case 7:
						o.push(e.charAt(t - 1));
						break;
					case 12:
					case 13:
						a = e.charCodeAt(t++);
						o.push(String.fromCharCode((31 & n) << 6 | 63 & a));
						break;
					case 14:
						a = e.charCodeAt(t++);
						r = e.charCodeAt(t++);
						o.push(String.fromCharCode((15 & n) << 12 | (63 & a) << 6 | (63 & r) << 0))
					}
				}
				return o.join("")
			};
		var l = function(e) {
				if (!e) return "";
				var t = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
				var i = "";
				var n, a, r;
				var o, l, d, c;
				var u = 0;
				e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
				do {
					o = t.indexOf(e.charAt(u++));
					l = t.indexOf(e.charAt(u++));
					d = t.indexOf(e.charAt(u++));
					c = t.indexOf(e.charAt(u++));
					n = o << 2 | l >> 4;
					a = (15 & l) << 4 | d >> 2;
					r = (3 & d) << 6 | c;
					i += String.fromCharCode(n);
					if (64 != d) i += String.fromCharCode(a);
					if (64 != c) i += String.fromCharCode(r)
				} while (u < e.length);
				return s(i)
			};
		var d = function(e) {
				if (!e) return "";
				e = e.toString();
				var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
				var i = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
				var n, a, r;
				var o, s, l;
				r = e.length;
				a = 0;
				n = "";
				while (a < r) {
					o = 255 & e.charCodeAt(a++);
					if (a == r) {
						n += t.charAt(o >> 2);
						n += t.charAt((3 & o) << 4);
						n += "==";
						break
					}
					s = e.charCodeAt(a++);
					if (a == r) {
						n += t.charAt(o >> 2);
						n += t.charAt((3 & o) << 4 | (240 & s) >> 4);
						n += t.charAt((15 & s) << 2);
						n += "=";
						break
					}
					l = e.charCodeAt(a++);
					n += t.charAt(o >> 2);
					n += t.charAt((3 & o) << 4 | (240 & s) >> 4);
					n += t.charAt((15 & s) << 2 | (192 & l) >> 6);
					n += t.charAt(63 & l)
				}
				return n
			};
		var c = function(e) {
				if (!e) return "";
				if (e << 2 > 0) var t = "U" + d(e << 2);
				else var t = "U" + d(4 * e);
				return t
			};
		var u = function() {
				var e = "";
				var t = document.cookie.split(";");
				var i = arguments.length;
				for (var n = 0; n < t.length; n++) {
					var a = t[n];
					while (" " == a.charAt(0)) a = a.substring(1, a.length);
					if (0 == a.indexOf("u=") || 0 == a.indexOf("k=")) var r = a;
					if (0 == a.indexOf("_l_lgi=")) var o = a;
					if (0 == a.indexOf("yktk=")) {
						var s = l(decodeURIComponent(a).split("|")[3]);
						if (s.indexOf(",") > -1 && s.indexOf("nn:") > -1 && s.indexOf("id:") > -1) {
							var e = s.split(",")[1].split(":")[1];
							var d = s.split(",")[0].split(":")[1];
							if ("" != e) break
						}
					}
				}
				if ("" == e || "" == d) {
					if (r) {
						var e = r.substring(2, r.length);
						if ("__LOGOUT__" == e) e = "";
						else e = decodeURIComponent(e)
					}
					if (o) var d = o.substring(7, o.length)
				}
				if (0 == i) return "" == e ? "" : e;
				else if (1 == i && "all" == arguments[0]) return {
					username: e,
					userid: d
				}
			};
		var f = function() {
				var e = $("#div_login");
				if (e.length > 0) e[0].innerHTML = "";
				var t = $("#login_div");
				if (t.length > 0) t.hide();
				if ("undefined" != typeof PageConfig.paid && "1" == PageConfig.paid) window.top.location.reload()
			};
		var p = function(e, t) {
				var i = $("#" + e)[0];
				i.select();
				try {
					therange = void 0;
					if (1 == PageConfig.copytoclip) {
						if (i.createTextRange) therange = i.createTextRange();
						therange = therange ? therange : document;
						if (therange.execCommand("Copy")) {
							if (false != t) alert("复制成功。现在您可以粘贴（Ctrl+v）到Blog 或BBS中了。");
							return
						}
					}
				} catch (n) {}
				alert("您使用的浏览器不支持此复制功能，请使用Ctrl+C或鼠标右键。")
			};
		var m = function(e) {
				return t(e);

				function t(e) {
					var t = "";
					var n = "";
					n = i(e);
					return n
				}
				function i(e) {
					var t = false;
					var i = "";
					while (!t) {
						i = n(20);
						hstr = e + i;
						hashcash = a(hstr);
						if ("00" == hashcash.substring(0, 2)) t = true
					}
					return i
				}
				function n(e) {
					var t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
					var i = "";
					for (var n = 0; n < e; n++) {
						var a = Math.floor(Math.random() * t.length);
						i += t.substring(a, a + 1)
					}
					return i
				}
				function a(e) {
					function t(e, t) {
						var i = e << t | e >>> 32 - t;
						return i
					}
					function i(e) {
						var t = "";
						var i;
						var n;
						var a;
						for (i = 0; i <= 6; i += 2) {
							n = 15 & e >>> 4 * i + 4;
							a = 15 & e >>> 4 * i;
							t += n.toString(16) + a.toString(16)
						}
						return t
					}
					function n(e) {
						var t = "";
						var i;
						var n;
						for (i = 7; i >= 0; i--) {
							n = 15 & e >>> 4 * i;
							t += n.toString(16)
						}
						return t
					}
					function a(e) {
						e = e.replace(/\r\n/g, "\n");
						var t = "";
						for (var i = 0; i < e.length; i++) {
							var n = e.charCodeAt(i);
							if (n < 128) t += String.fromCharCode(n);
							else if (n > 127 && n < 2048) {
								t += String.fromCharCode(192 | n >> 6);
								t += String.fromCharCode(128 | 63 & n)
							} else {
								t += String.fromCharCode(224 | n >> 12);
								t += String.fromCharCode(128 | 63 & n >> 6);
								t += String.fromCharCode(128 | 63 & n)
							}
						}
						return t
					}
					var r;
					var o, s;
					var l = new Array(80);
					var d = 1732584193;
					var c = 4023233417;
					var u = 2562383102;
					var f = 271733878;
					var p = 3285377520;
					var m, h, v, g, y;
					var _;
					e = a(e);
					var b = e.length;
					var w = new Array;
					for (o = 0; o < b - 3; o += 4) {
						s = e.charCodeAt(o) << 24 | e.charCodeAt(o + 1) << 16 | e.charCodeAt(o + 2) << 8 | e.charCodeAt(o + 3);
						w.push(s)
					}
					switch (b % 4) {
					case 0:
						o = 2147483648;
						break;
					case 1:
						o = 8388608 | e.charCodeAt(b - 1) << 24;
						break;
					case 2:
						o = 32768 | (e.charCodeAt(b - 2) << 24 | e.charCodeAt(b - 1) << 16);
						break;
					case 3:
						o = 128 | (e.charCodeAt(b - 3) << 24 | e.charCodeAt(b - 2) << 16 | e.charCodeAt(b - 1) << 8)
					}
					w.push(o);
					while (14 != w.length % 16) w.push(0);
					w.push(b >>> 29);
					w.push(4294967295 & b << 3);
					for (r = 0; r < w.length; r += 16) {
						for (o = 0; o < 16; o++) l[o] = w[r + o];
						for (o = 16; o <= 79; o++) l[o] = t(l[o - 3] ^ l[o - 8] ^ l[o - 14] ^ l[o - 16], 1);
						m = d;
						h = c;
						v = u;
						g = f;
						y = p;
						for (o = 0; o <= 19; o++) {
							_ = 4294967295 & t(m, 5) + (h & v | ~h & g) + y + l[o] + 1518500249;
							y = g;
							g = v;
							v = t(h, 30);
							h = m;
							m = _
						}
						for (o = 20; o <= 39; o++) {
							_ = 4294967295 & t(m, 5) + (h ^ v ^ g) + y + l[o] + 1859775393;
							y = g;
							g = v;
							v = t(h, 30);
							h = m;
							m = _
						}
						for (o = 40; o <= 59; o++) {
							_ = 4294967295 & t(m, 5) + (h & v | h & g | v & g) + y + l[o] + 2400959708;
							y = g;
							g = v;
							v = t(h, 30);
							h = m;
							m = _
						}
						for (o = 60; o <= 79; o++) {
							_ = 4294967295 & t(m, 5) + (h ^ v ^ g) + y + l[o] + 3395469782;
							y = g;
							g = v;
							v = t(h, 30);
							h = m;
							m = _
						}
						d = 4294967295 & d + m;
						c = 4294967295 & c + h;
						u = 4294967295 & u + v;
						f = 4294967295 & f + g;
						p = 4294967295 & p + y
					}
					var _ = n(d) + n(c) + n(u) + n(f) + n(p);
					return _.toLowerCase()
				}
			};
		return {
			smoothScroll: e,
			getVideoPageInfo: n,
			numberFormat: a,
			cdn: r,
			html2Escape: o,
			supportStyle: t,
			get_username: u,
			decode64: l,
			encodeUid: c,
			videoLogin: f,
			hcbt: m,
			empty: i,
			copyToClipboard: p
		}
	});
	define("page/find/play/interaction/interactionBottom", ["tui/view", "tui/event", "tui/common", "page/find/play/interaction/iku", "tui/cookie", "module/login/login", "page/find/play/model/interaction/interactionBottom", "module/stat/log"], function(e, t, i, n, a, r, o, s) {
		var l = e.extend({
			faved: false,
			fav_process: false,
			curpanel: "",
			updowntimeischange: false,
			tcode: "",
			scode: "",
			fn: {
				updown: "fn_updown",
				up: "fn_up",
				down: "fn_down",
				share: "fn_share",
				share2: "fn_share2",
				download: "fn_download",
				phone_see: "fn_phone_see",
				download_disable: "fn_download_disabled",
				pcdown: "fn_pc_download",
				pcdown_show: "fn_pc_show_download",
				favorite: "fn_favorite",
				favo: "fn_favo",
				jump_allcomment: "fn_comment"
			},
			panel: {
				share: "panel_share",
				down: "panel_down",
				phone_see: "panel_phone_see",
				favorite: "panel_favorite",
				favo: "panel_favo",
				handle_share: "handle_share",
				handle_stat: "handle_stat",
				handle_down: "handle_down",
				handle_phone: "handle_phone",
				handle_favorite: "handle_favorite"
			},
			el: $("#vpactionv5_wrap"),
			self: this,
			initialize: function() {
				this._model = new o;
				this.modelEvents(this._model, "model");
				this._model.bind("getVideoPlayInfo:success", this.getVideoPageInfoCallback.bind(this));
				this._model.bind("updown:success", this.updownCallback.bind(this));
				this._model.bind("addFav:success", this.addFavCallBack.bind(this));
				window.ykPlyr.bind("player:onPlayerStartUpdate", this._update.bind(this));
				this._cached = !! (3 == PageConfig.playmode && !$(".download-app-bg").length > 0 && 0 == PageConfig.page.compeleted && ["85", "100", "97"].indexOf(PageConfig.catId) > -1);
				this.bind();
				this.initMoudle()
			},
			events: {},
			_update: function() {
				this._updateUpdownvv();
				this._updateShareUrl()
			},
			_updateShareUrl: function() {},
			_updateUpdownvv: function() {
				var e = {
					vid: PageConfig.videoId,
					showid: PageConfig.showid,
					param: []
				};
				$("#module-interact").find("div[id^='module_basic_']").each(function(t) {
					var i = $(this).attr("id").replace("module_basic_", "");
					e["param"][t] = i
				});
				this._model.getVideoPlayInfo(e)
			},
			initMoudle: function() {
				this._updateUpdownvv();
				setTimeout(function() {
					this._setQRCode()
				}.bind(this), 500);
				if (this._cached) this._cacheStatus();
				this._addQQShareParam()
			},
			_addQQShareParam: function() {
				var e = i.get_username("all");
				var t = e.userid > 0 ? e.userid : 0;
				var n = "//mini.cron.youku.com/web/www/qq_share/qq_cback.php?userId=" + t;
				var a = $("#s_qq_haoyou1").attr("href");
				$("#s_qq_haoyou1").attr("href", a + "&callback=" + n)
			},
			_setQRCode: function() {
				$("#panel_phone_see .panel-con .ps-title").eq(0).after('<div class="ps-twocode" id="phone_dimcode_pic"><i class="ico_play_dimcode"></i><img id="phone_qrcode_img" src="' + this._getQRCodeURL() + '"></div>');
				$("#dimcode_pic .ico_play_dimcode ").eq(0).after('<img id="qrcode_img" src="' + this._getQRCodeURL() + '">')
			},
			_cacheStatus: function() {
				var e = $("#panel_phone_see .column-left");
				var t = $("#panel_down .column-right");
				var i = '扫码用手机看，还可以预约缓存<i class="ico-fn-cache" title="新推出预约缓存功能，随时随地抢先观看！快来体验吧！"></i>';
				var n = '用<a href="//mobile.youku.com/index/wireless" target="_blank">优酷APP</a>或微信扫码在手机上继续观看或预约缓存，随时随地抢先看';
				$("#fn_phone_see").attr("title", "扫码手机看，还可预约缓存哦！");
				$(" .ps-ps", e).remove();
				e.append('<p class="ps-ps-cache">' + n + "</p>");
				$(".ps-title", e).addClass("ps-title-cache").html(i);
				$(" .dl-ps", t).remove();
				t.append('<p class="dl-ps dl-ps-cache">' + n + "</p>");
				$(".dl-title", t).addClass("ps-title-cache").html(i);
				$("#fn_download").attr("title", "新推出预约缓存功能，随时随地抢先观看！快来体验吧！")
			},
			_getQRCodeURL: function() {
				var e = this._cached ? "cache" : "open";
				var t = this._cached ? ",source:'pcweb'" : "";
				return "//qr.youku.com/qr?sc=video_play&ac=" + e + "&ps={vid:'" + PageConfig.videoId2 + "',spot:" + this.getWatchTime() + t + ",tp:1,cp:0,cpp:100049}&size=123"
			},
			getVideoPageInfoCallback: function(e) {
				var t = e.data;
				var n = $("#fn_favorite");
				if (1 == PageConfig.paid && t.permission || 1 == t.disableUpDown) if (t.permission == -1) this.disableUpDowned();
				else {
					this.initUpDowned();
					if ($("#upVideoTimes").length > 0) $("#upVideoTimes").html(t.updown.up);
					if ($("#downVideoTimes").length > 0) $("#downVideoTimes").html(t.updown.down)
				} else {
					this.initUpDowned();
					if ($("#upVideoTimes").length > 0) $("#upVideoTimes").html(t.updown.up);
					if ($("#downVideoTimes").length > 0) $("#downVideoTimes").html(t.updown.down)
				}
				if (n.length && t.favo) {
					n.addClass("fn").addClass("fn-return");
					n.find(".label").html("已收藏")
				}
				if ($("#videoTotalPV").length > 0) $("#videoTotalPV").html('<em class="num">' + t.stat.vv + "</em>");
				this.tcode = t.ss;
				this.scode = i.hcbt(this.tcode)
			},
			bind: function() {
				var e = this;
				if ($("#" + this.fn.favo).length > 0) $("#" + this.fn.favo).click(function() {
					s.log(1, "tp=1&cp=4007354&cpp=1000217");
					if (e.faved || e.fav_process) return;
					var t = "1_1";
					switch (PageConfig.playmode) {
					case 1:
						t = "1_1";
						break;
					case 2:
						t = "1_3";
						break;
					case 3:
						t = "1_2";
						break;
					case 4:
						t = "1_5";
						break;
					case 5:
						t = "1_4"
					}
					var i = "";
					if ("undefined" != typeof PageConfig.folderId) i = PageConfig.folderId;
					var n = "1";
					var a = "";
					if ("undefined" != typeof PageConfig.catId) a = PageConfig.catId;
					var r = 0;
					if ("undefined" != typeof showid) r = showid;
					e.favParams = {
						vid: PageConfig.videoId,
						fid: i,
						showid: PageConfig.showid,
						deviceid: n,
						addition: t,
						channelId: a
					};
					e._model.addFav(e.favParams);
					e.fav_process = true
				});
				if ($(".form_btnsub_s").length > 0) $(".form_btnsub_s").each(function(e) {
					$(this).click(function() {
						var t = $($(".panel-share input")[e]).attr("id");
						i.copyToClipboard(t)
					})
				});
				if ($("#" + this.fn.share2).length > 0) $("#" + this.fn.share2).click(function() {
					s.log(1, "tp=1&cp=4004713&cpp=1000217");
					if ("" == e.curpanel) {
						e.showSharePanel();
						i.smoothScroll.init("paction")
					} else if ("share" == e.curpanel) e.hideSharePanel();
					else if ("down" == e.curpanel) {
						e.hideDownloadPanel();
						e.showSharePanel();
						i.smoothScroll.init("paction")
					} else if ("phone" == e.curpanel) {
						e.hidePhoneSeePanel();
						e.showSharePanel();
						i.smoothScroll.init("paction")
					}
					if ($("#" + e.panel.handle_share)) $("#" + e.panel.handle_share).click(function() {
						e.hideSharePanel()
					})
				});
				var t = $("#" + this.fn.download);
				if (t.length > 0) {
					var a = navigator.userAgent;
					var r = "";
					if (a.indexOf("iPad") != -1) {
						r = "iPad";
						t[0].onclick = function() {
							window.open("//mobile.youku.com/index/wireless", "target=_blank");
							return false
						}
					} else if (a.indexOf("iPhone") != -1) {
						r = "iPhone";
						t[0].onclick = function() {
							window.open("//mobile.youku.com/index/wireless", "target=_blank");
							return false
						}
					} else if (a.indexOf("Android") != -1) {
						r = "Android";
						t[0].onclick = function() {
							window.open("//mobile.youku.com/index/wireless", "target=_blank");
							return false
						}
					}
					if ("" == r) {
						t.click(function() {
							s.log(1, "tp=1&cp=4009345&cpp=1000217");
							if ("" == e.curpanel) {
								e._checkDownState();
								e.showDownloadPanel();
								i.smoothScroll.init("paction")
							} else if ("share" == e.curpanel) {
								e.hideSharePanel();
								e.showDownloadPanel();
								i.smoothScroll.init("paction")
							} else if ("down" == e.curpanel) e.hideDownloadPanel();
							else if ("phone" == e.curpanel) {
								e.hidePhoneSeePanel();
								e.showDownloadPanel();
								i.smoothScroll.init("paction")
							}
						});
						if ($("#" + e.panel.handle_down).length > 0) $("#" + e.panel.handle_down).click(function() {
							e.hideDownloadPanel()
						});
						var o = true;
						if ($("#" + e.fn.pcdown).length > 0) $("#" + e.fn.pcdown).click(function() {
							e._downPCLoading();
							var t = {
								from: "video",
								action: "video",
								secne: "ywebplayerbottom",
								callback: e._downPCCallback
							};
							n.ikuExecuteFrompc(t)
						});
						if ($("#" + e.fn.pcdown_show)) $("#" + e.fn.pcdown_show).click(function() {
							e._downPCLoading();
							var t = {
								from: "video",
								action: "show",
								secne: "ywebplayerbottom",
								callback: e._downPCCallback
							};
							n.ikuExecuteFrompc(t)
						})
					}
				}
				if ($("#" + this.fn.jump_allcomment).length > 0) $("#" + this.fn.jump_allcomment).click(function() {
					if ("ico-fn-new-comment" == $("#video_comment_number .ico i").attr("class")) alert("starComming.redPointClick()");
					else alert("Common.smoothScroll.init('comment');loadCommentNew(true);")
				});
				if ($("#" + this.fn.phone_see).length > 0) $("#" + this.fn.phone_see).click(function() {
					if ("" == e.curpanel) {
						e.showPhoneSeePanel();
						i.smoothScroll.init("paction")
					} else if ("phone" == e.curpanel) e.hidePhoneSeePanel();
					else if ("share" == e.curpanel) {
						e.hideSharePanel();
						e.showPhoneSeePanel();
						i.smoothScroll.init("paction")
					} else if ("down" == e.curpanel) {
						e.hideDownloadPanel();
						e.showPhoneSeePanel();
						i.smoothScroll.init("paction")
					}
				});
				if ($("#" + this.panel.phone_see).length > 0) if ($("#" + e.panel.handle_phone)) $("#" + e.panel.handle_phone).click(function() {
					e.hidePhoneSeePanel()
				})
			},
			updown: function() {
				var e = $("#" + this.fn.updown).attr("disable");
				if ("true" == e) return false;
				var t = "1_1";
				switch (PageConfig.playmode) {
				case "1":
					t = "1_1";
					break;
				case "2":
					t = "3_1";
					break;
				case "3":
					t = "2_1";
					break;
				default:
					t = "1_1"
				}
				var i = "1_2";
				switch (PageConfig.playmode) {
				case "1":
					i = "1_2";
					break;
				case "2":
					i = "3_2";
					break;
				case "3":
					i = "2_2";
					break;
				default:
					i = "1_2"
				}
				if ("up" == this.updownType) var n = t;
				else var n = i;
				if ("" != this.tcode && "" != this.scode) this._model.updown({
					vid: PageConfig.videoId,
					type: this.updownType,
					t: this.tcode,
					s: this.scode,
					addtion: n
				});
				else this._model.updown({
					vid: PageConfig.videoId,
					type: this.updownType,
					addtion: n
				})
			},
			updownCallback: function(e, t) {
				var i = this;
				var n = "顶";
				if ("down" == i.updownType) n = "踩";
				var r = 0;
				if (e == -1) r = 0;
				else if ("down" == i.updownType) r = -1;
				else r = 1;
				if (i.updowntimeischange) a("updown_" + PageConfig.videoId2, r, {
					expires: 1
				});
				else i.showUpDowned(r)
			},
			disableUpDowned: function(e, t) {
				$("#fn_updown").addClass("fn-disabled");
				$("#fn_updown").attr("disabled", true);
				$("#fn_updown").html('<div class="fn-up disableup" disabled="true">\n<div>\n<span class="icon">\n<i class="ico-fn-up"></i>\n</span>\n</div>\n<div class="updown-forbid-tips">该视频暂不支持顶踩</div>\n</div>\n<div class="fn-up disabledown" disabled="true">\n<div>\n<span class="icon">\n<i class="ico-fn-down"></i>\n</span>\n</div>\n<div class="updown-forbid-tips">该视频暂不支持顶踩</div>\n</div>\n')
			},
			initUpDowned: function() {
				var e = this;
				if (false !== (act = a("updown_" + PageConfig.videoId2)) && null != act) return e.showUpDowned(act);
				else {
					var t = $("#fn_updown");
					var i = $("#fn_up");
					var n = $("#fn_down");
					if (i.length > 0 && n.length > 0) {
						var o = "";
						var l = "";
						if (r.isLogin()) {
							o = "tp=1&cp=4009818&cpp=1000217";
							l = "tp=1&cp=4009820&cpp=1000217"
						} else {
							o = "tp=1&cp=4009817&cpp=1000217";
							l = "tp=1&cp=4009819&cpp=1000217"
						}
						i.click(function() {
							s.log(1, o);
							e.updownType = "up";
							e.showUpDownedNoResult(1, e);
							e.updown(e)
						});
						n.click(function() {
							s.log(1, l);
							e.updownType = "down";
							e.showUpDownedNoResult(-1, e);
							e.updown(e)
						})
					}
				}
			},
			showUpDowned: function(e) {
				if (0 == e || e == -1 || 1 == e) {
					var t = $("#" + this.fn.updown);
					var n = 0;
					if ($("#upVideoTimes")) n = parseInt($("#upVideoTimes")[0].innerHTML.replace(/\,/g, ""));
					var r = 0;
					if ($("#downVideoTimes")) r = parseInt($("#downVideoTimes")[0].innerHTML.replace(/\,/g, ""));
					if (e == -1) {
						r = i.numberFormat(r + 1).substring(0, 10);
						t[0].innerHTML = '<div class="fn-up" id="fn_up"><div title="顶:' + n + '"><span class="ico" data-stat-role="ck"><i class="ico-fn-up"></i></span><span class="num" id="upVideoTimes" data-stat-role="ck">' + n + "</span></div></div>" + '<div class="fn-down fn-return" id="fn_down"><div title="踩:' + r + '"><span class="ico" data-stat-role="ck"><i class="ico-fn-down"></i></span><span class="num" id="downVideoTimes" data-stat-role="ck">' + r + "</span></div></div>"
					} else if (1 == e) {
						n = i.numberFormat(n + 1).substring(0, 10);
						t[0].innerHTML = '<div class="fn-up fn-return" id="fn_up"><div title="顶:' + n + '"><span class="ico" data-stat-role="ck"><i class="ico-fn-up"></i></span><span class="num" id="upVideoTimes" data-stat-role="ck">' + n + "</span></div></div>" + '<div class="fn-down" id="fn_down"><div title="踩:' + r + '"><span class="ico" data-stat-role="ck"><i class="ico-fn-down"></i></span><span class="num" id="downVideoTimes" data-stat-role="ck">' + r + "</span></div></div>"
					}
					$("#" + this.fn.updown).attr("disabled", "true");
					a("updown_" + PageConfig.videoId2, e, {
						expires: 1
					})
				}
			},
			showUpDownedNoResult: function(e, t) {
				if ((0 == e || e == -1 || 1 == e) && !$("#" + this.fn.updown).hasClass("fn-return")) {
					var n = $("#" + this.fn.updown);
					var a = 0;
					if ($("#upVideoTimes").length > 0) a = parseInt($("#upVideoTimes")[0].innerHTML.replace(/\,/g, ""));
					var r = 0;
					if ($("#downVideoTimes")) r = parseInt($("#downVideoTimes")[0].innerHTML.replace(/\,/g, ""));
					if (e == -1) {
						r = i.numberFormat(r + 1).substring(0, 10);
						n[0].innerHTML = '<div class="fn-up" id="fn_up"><div title="顶:' + a + '"><span class="ico" data-stat-role="ck"><i class="ico-fn-up"></i></span><span class="num" id="upVideoTimes" data-stat-role="ck">' + a + "</span></div></div>" + '<div class="fn-down fn-return" id="fn_down"><div title="踩:' + r + '"><span class="ico" data-stat-role="ck"><i class="ico-fn-down"></i></span><span class="num" id="downVideoTimes" data-stat-role="ck">' + r + "</span></div></div>"
					} else if (1 == e) {
						a = i.numberFormat(a + 1).substring(0, 10);
						n[0].innerHTML = '<div class="fn-up fn-return" id="fn_up"><div title="顶:' + a + '"><span class="ico" data-stat-role="ck"><i class="ico-fn-up"></i></span><span class="num" id="upVideoTimes" data-stat-role="ck">' + a + "</span></div></div>" + '<div class="fn-down" id="fn_down"><div title="踩:' + r + '"><span class="ico" data-stat-role="ck"><i class="ico-fn-down"></i></span><span class="num" id="downVideoTimes" data-stat-role="ck">' + r + "</span></div></div>"
					}
					t.updowntimeischange = true
				}
			},
			addFavCallBack: function(e, t) {
				var n = this;
				n.fav_process = false;
				favoriteHtml = '<a href="//faxian.youku.com/favorite" target="_blank" charset="hz-4007613-1000217"><span class="ico"><i class="ico-fn-collect"></i></span><span class="label">已收藏</span></a>';
				var a = $("#" + n.fn.favo);
				if (e == -1) {
					r.login(function() {
						n._model.addFav(n.favParams);
						i.videoLogin()
					});
					return
				}
				if ("down" == n.curpanel) n.hideDownloadPanel();
				if (e == -2) {
					n.faved = true;
					$("#" + n.fn.favorite)[0].className += " fn-return";
					a[0].innerHTML = favoriteHtml;
					return
				} else if (e == -3) return;
				else if (e == -4) return;
				n.faved = true;
				$("#" + n.fn.favorite)[0].className += " fn-return";
				a[0].innerHTML = favoriteHtml;
				var o = [4000477, 4000491, 4000484, 4007645, 4007644];
				var l = parseInt(PageConfig.playmode);
				if (l > 0 && l <= o.length) s.log(1, "tp=1&cp=" + o[l - 1] + "&cpp=1000217")
			},
			showSharePanel: function() {
				this.addExpand(this.fn.share);
				if ($("#share_dimcode_pic").length > 0) $("#share_dimcode_pic").html('<img id="share_qrcode_img" src="' + this._getQRCodeURL() + '">');
				$("#" + this.panel.share).css("display", "block");
				this.curpanel = "share"
			},
			hideSharePanel: function() {
				$("#" + this.fn.share).removeClass("fn-expand");
				$("#" + this.panel.share).css("display", "none");
				this.curpanel = ""
			},
			showDownloadPanel: function() {
				$("#" + this.fn.download).addClass("fn-expand");
				$("#" + this.fn.download).addClass("fn-return");
				$("#" + this.panel.down).css("display", "block");
				this.curpanel = "down";
				this.showDimcode(4007653, 1000217, "pc-qr-1");
				$("#qrcode_img").attr("src", this._getQRCodeURL())
			},
			hideDownloadPanel: function() {
				$("#" + this.fn.download).removeClass("fn-expand");
				$("#" + this.fn.download).removeClass("fn-return");
				$("#" + this.panel.down).css("display", "none");
				this.curpanel = ""
			},
			showPhoneSeePanel: function() {
				this.curpanel = "phone";
				this.showDimcode(4010588, 1000957, "pc-qr-1", "phone");
				if ($("#phone_dimcode_pic").length > 0) $("#phone_dimcode_pic").html('<img id="phone_qrcode_img" src="' + this._getQRCodeURL() + '">');
				$("#" + this.fn.phone_see).addClass("fn-expand");
				$(".panel-phone-see").css("display", "block")
			},
			hidePhoneSeePanel: function() {
				$("#" + this.fn.phone_see).removeClass("fn-expand");
				this.curpanel = "";
				$(".panel-phone-see").css("display", "none")
			},
			addHover: function(e) {
				if (e.className.indexOf("fn-hover") == -1) e.className += " fn-hover";
				return this
			},
			removeHover: function(e) {
				e.className = e.className.replace(/ fn-hover/, "");
				return this
			},
			addExpand: function(e) {
				return $("#" + e).addClass("fn-expand")
			},
			removeExpand: function(e) {
				e.className = e.className.replace(/ fn-expand/, "");
				return this
			},
			_addEvent: function(e, t, i) {
				if (window.addEventListener) if ("mouseenter" == t || "mouseleave" == t) {
					function n(e) {
						var t = e.currentTarget,
							n = e.relatedTarget;
						if (!a(t, n) && t != n) i.call(e.currentTarget, e)
					}
					function a(e, t) {
						try {
							return e.contains ? e != t && e.contains(t) : !! (16 & e.compareDocumentPosition(t))
						} catch (i) {}
					}
					if ("mouseenter" == t) e.addEventListener("mouseover", n, false);
					else e.addEventListener("mouseout", n, false)
				} else e.addEventListener(t, i, false);
				else if (window.attachEvent) e.attachEvent("on" + t, i)
			},
			_delEvent: function(e, t, i) {
				if (window.addEventListener) e.removeEventListener(t, i, true);
				else if (window.attachEvent) e.detachEvent("on" + t, i)
			},
			moduleId: "",
			ModuleShowVR: function(e) {
				if (!e) return false;
				this.moduleId = e;
				var t = "//index.youku.com/dataapi/getData?num=100006&sid=" + window.showid_en + "&jsoncallback=Interact.ModuleShowVRCallback";
				Nova.addScript(t)
			},
			ModuleShowVRCallback: function(e) {
				if (e && e.result && Interact.moduleId && e.result.index) document.getElementById(Interact.moduleId).innerHTML = '<span class="ico__VR"></span><span class="num" >' + numberFormat(e.result.index) + "</span>";
				else {
					document.getElementById(Interact.moduleId).parentNode.innerHTML += '<span class="vr"><span class="ico__VR"></span>暂无</span>';
					document.getElementById(Interact.moduleId).parentNode.removeChild(document.getElementById(Interact.moduleId))
				}
			},
			showDimcode: function(e, t, i, n) {
				var a = this.getWatchTime();
				this.parseWatchTime(a)
			},
			getWatchTime: function() {
				var e = 0;
				try {
					var t = window.ykPlyr.PlayerInfo();
					e = t["time"] ? parseInt(t["time"]) : 0
				} catch (i) {}
				return e
			},
			parseWatchTime: function(e) {
				if (!e) return;
				var t = parseInt(e / 3600);
				e %= 3600;
				var i = parseInt(e / 60);
				var n = e % 60;
				var a = "";
				if (t) a += t + "小时";
				if (i) a += i + "分";
				a += n + "秒";
				document.getElementById("dimcode_watch_time").innerHTML = "已观看到 " + a;
				document.getElementById("phone_dimcode_watch_time").innerHTML = "已观看到 " + a
			},
			genPhoneQRCodeToPage: function(e) {
				document.getElementById("phone_dimcode_pic").innerHTML = '<i class="ico_play_dimcode"></i><img id="phone_qrcode_img" src="">';
				var t = $("phone_qrcode_img");
				t.onload = function() {};
				t.src = "//qrcode.ykimg.com/qr?t=" + e + "&size=135"
			},
			genShareQRCodeToPage: function(e) {
				document.getElementById("share_dimcode_pic").innerHTML = '<i class="ico_play_dimcode"></i><img id="share_qrcode_img" src="">';
				var t = $("share_qrcode_img");
				t.onload = function() {};
				t.src = "//qrcode.ykimg.com/qr?t=" + e + "&size=135"
			},
			_downPCLoading: function() {
				var e = document.getElementById("panel_down_notice");
				e.innerHTML = '<i class="download-app-loading"></i>';
				var t = document.getElementById("panel_down_btns");
				t.style.visibility = "hidden";
				if (null == document.getElementById("loading_notice")) {
					var i = document.createElement("span");
					i.setAttribute("id", "loading_notice");
					i.innerHTML = "正在检测客户端..."
				}
				e.parentNode.insertBefore(i, t)
			},
			_downPCCallback: function(e) {
				var t = document.getElementById("panel_down_notice");
				var i = document.getElementById("loading_notice");
				if (e >= 0) t.innerHTML = '<i class="download-app-pc"></i>';
				else document.getElementById("panel_down_notice").innerHTML = "<div><p>您尚未安装客户端，我们正在为您下载</p><p>请您成功安装后，再点击下方按钮下载视频</p></div>";
				document.getElementById("panel_down_btns").style.visibility = "visible";
				t.parentNode.removeChild(i)
			},
			_checkDownState: function() {
				if ("undefined" != typeof isshowacess && "undefined" != typeof isdownload) if (isshowacess || !isdownload) {
					var e = document.getElementById("panel_down_notice");
					if (null != e) {
						e.innerHTML = '<i class=" download-app-bq"></i>';
						var t = document.getElementById("panel_down_btns");
						if (null == document.getElementById("disable_notice")) {
							var i = document.createElement("span");
							i.setAttribute("id", "disable_notice");
							i.innerHTML = "本视频因版权问题，很抱歉无法提供下载";
							i.setAttribute("class", "grey");
							e.parentNode.removeChild(t);
							e.parentNode.appendChild(i)
						}
					}
				}
			},
			_scrollToDown: function() {
				var e = document.getElementById("vpactionv5");
				if (null != e) if ("block" == $(this.panel.down).style.display) e.scrollIntoView(false)
			}
		});
		return l
	});
	define("page/find/play/model/cms/cms", ["tui/event", "tui/net", "module/domain"], function(e, t, i) {
		var n = e.extend({
			initialize: function() {
				var e = this;
				n.superClass.initialize.call(e);
				this.domain = "//cmstool.youku.com/";
				e.op = {
					callbackName: "callback",
					charset: "utf-8"
				}
			},
			getCmstool: function(e) {
				var i = this;
				t.getJSON(this.domain + "cms/tool/pub/get_putdata.json?securemode=2", e, function(e) {
					i.trigger("getCmstool:success", [e])
				}, i.op)
			}
		});
		return n
	});
	define("page/find/play/cms/cms", ["tui/view", "tui/common", "tui/cookie", "module/login/login", "page/find/play/model/cms/cms", "tui/net", "tui/slide2", "module/stat/common"], function(e, t, i, n, a, r, o, s) {
		var l = e.extend({
			initialize: function() {
				var e = this;
				e._model = new a;
				e.modelEvents(e._model, "cmsmodel");
				window.cmsModuleHtmlCallback = function(t, i) {
					e.cmsModuleHtmlCallback(t, i)
				};
				e.init();
				window.Nova = {
					Cookie: {
						get: i,
						set: function(e, t, n) {
							i(e, t)
						}
					}
				}
			},
			cmsVote: {
				questionID: 0,
				request: 0,
				seq: 0,
				position: null
			},
			CMSDataStore: {
				set: function(e) {
					if (this.CMSDataIsEmpty()) {
						this.Storage = e;
						return 1
					}
					return 0
				},
				get: function() {
					return this.Storage
				},
				CMSDataIsEmpty: function() {
					return $.isEmptyObject(this.Storage)
				},
				CMSURLHaveAsked: false,
				Storage: {}
			},
			cmsModuleHtmlCallback: function(e, t) {
				var i = this;
				if (t) {
					var n = $("#module_cms_" + e);
					if (n.length > 0) try {
						t = t.replace(/http:/, "");
						n.html(t);
						n.trigger("cms:loaded");
						this.initCms(n)
					} catch (a) {
						n.html("")
					}
				}
			},
			initCms: function(e) {
				if (e.find(".cms-slider").length) o(e)
			},
			operateCallback: function(e) {
				if (e) {
					CMSDataStore.set(e);
					CMSOperation.doEachOperation()
				}
			},
			doEachOperation: function() {
				var e = this.CMSDataStore.get();
				if (!e.data) return -1;
				$(document).bind("show:broadcast", this.officiallistOperation.bind(this));
				$(document).trigger("show:broadcast");
				if (e.data.question.hasOwnProperty("link")) $(document).trigger("show:question", [e.data.question]);
				this.diswindowOperation()
			},
			leftOperation: function() {
				$("div[id^='module_cms_']").each(function() {
					var e = $(this).attr("id").replace("module_cms_", "");
					var t = "//module.youku.com/" + e + ".html";
					r.getScript(t)
				})
			},
			diswindowOperation: function() {
				var e = this.CMSDataStore.get();
				if ("undefined" == typeof e || "undefined" == typeof e.data || !e.data.diswindow) return -1;
				var t = e.data.diswindow;
				if (t.show && t.topic && t.video) {
					if (t.show.createtime >= t.topic.createtime && t.show.createtime >= t.video.createtime) t = t.show;
					else if (t.video.createtime >= t.topic.createtime && t.video.createtime > t.show.createtime) t = t.video;
					else if (t.topic.createtime > t.video.createtime && t.topic.createtime > t.show.createtime) t = t.topic
				} else if (t.show && t.topic) if (t.show.createtime >= t.topic.createtime) t = t.show;
				else t = t.topic;
				else if (t.show && t.video) if (t.show.createtime >= t.video.createtime) t = t.show;
				else t = t.video;
				else if (t.topic && t.video) if (t.video.createtime >= t.topic.createtime) t = t.video;
				else t = t.topic;
				else if (t.show) t = t.show;
				else if (t.topic) t = t.topic;
				else if (t.video) t = t.video;
				var i = (new Date).valueOf();
				var n = 1e3 * t.begintime;
				var a = 1e3 * t.expiretime;
				var r = window.screen.width || document.body.clientWidth;
				if (i >= n && i <= a && $("#yk-player-curtain").length > 0) {
					$("#yk-player-curtain").html('<img src="' + t.windowicon + '">');
					if (r < 1366 && r > 1240 || r < 1200) $("#yk-player-curtain").hide();
					else $("#yk-player-curtain").show();
					if (t.buttonicon) window.ykPlyr.bind("player:loaded", function() {
						if ("function" == typeof window.ykPlyr.setPlayHeadSkin) window.ykPlyr.setPlayHeadSkin({
							url: t.buttonicon
						})
					})
				} else $("#yk-player-curtain").hide()
			},
			officiallistOperation: function() {
				var e = this.CMSDataStore.get();
				if ("undefined" == typeof e || "undefined" == typeof e.data || !e.data.broadcast) return -1;
				var i = e.data.broadcast;
				var n = $("#show_vv_broadcast");
				if (!n.length || !i.content) return;
				var a = i.content;
				i.content = t.html2Escape(i.content);
				var r = "";
				if (97 == PageConfig.catId) {
					if (a.length > 9) a = a.substring(0, 9) + "...";
					r = '<a class="sn drama_operation" target="_blank" title="' + i.content + '"  href="' + i.link + '">' + '<span class="sn_num">' + a + "</span></a>"
				} else {
					if (a.length > 15) a = a.substring(0, 15) + "...";
					r = '<div class="inner">' + '<div class="program">' + '<a class="A" title="' + i.content + '" target="_blank" href="' + i.link + '">' + '<div class="serial"><span class="drama_recommend"></span></div>' + '<div class="headline">' + "<span>推荐：</span>" + a + "</div>" + "</a></div></div>"
				}
				n.html(r).show();
				n.parents("#Drama").trigger("list:update")
			},
			init: function() {
				this.leftOperation();
				if (this.CMSDataStore.CMSDataIsEmpty()) {
					var e = "//cmstool.youku.com/cms/tool/pub/get_putdata.json";
					this.CMSDataStore.CMSURLHaveAsked = true;
					this._model.getCmstool({
						showid: PageConfig.showid,
						videoid: PageConfig.videoId,
						folderid: PageConfig.folderId,
						topicid: PageConfig.catId,
						client: "pc"
					})
				} else this.doEachOperation()
			},
			"{cmsmodel} getCmstool:success": function(e) {
				if (e) {
					this.CMSDataStore.set(e);
					this.doEachOperation()
				}
			}
		});
		return l
	});
	define("page/find/play/relationlist/stars", ["tui/view", "tui/art", "tui/common", "tui/lazyImageLoader", "page/find/play/model/listall", "tui/slide2", "tui/util/str"], function(e, t, i, n, a, r, o) {
		"use strict";
		return e.extend({
			initialize: function(e) {
				this._model = new a;
				this.modelEvents(this._model, "model");
				this._model.getStar({
					vid: PageConfig.videoId,
					showid: PageConfig.showid,
					cid: PageConfig.catId
				})
			},
			events: {
				"mouseenter .head_tab>li": "switchTab",
				"click .tab-h ul>li": "switchTab2"
			},
			switchTab2: function(e) {
				var t = $(e.currentTarget);
				if (t.hasClass("current")) return;
				t.addClass("current").siblings("li").removeClass("current");
				this.toggleTabc(t.attr("personid"), t.attr("index"))
			},
			switchTab: function(e) {
				var t = this;
				var i = $(e.currentTarget);
				if (i.hasClass("current")) return;
				var n = i.attr("personid");
				i.addClass("current").siblings("li").removeClass("current");
				var a = t.find('.tab-h ul[personid="' + n + '"]');
				a.show().siblings(".tab-h ul").hide();
				a.find("li").removeClass("current").eq(0).addClass("current");
				t.toggleTabc(n)
			},
			toggleTabc: function(e, t) {
				var i = this.find('.tab-c[personid="' + e + '"]');
				i.eq(t || 0).show().siblings(".tab-c").hide();
				i.find(".modPSlide").trigger("slider:show")
			},
			"{model} getStar:success": function(e) {
				var a = this;
				var s = '\n<div class="mod modSwitch mod-new">\n<div class="h">\n<!-- 演员 -->\n<ul class="head_tab">\n<% data.forEach(function(t, i){%> \n<li class="<%=(i=== 0 ? \'current\': \'\')%>" personid="<%=t.personid%>">\n<div class="pic">\n<a href="<%=t.starUrl%>" target="_blank"><img class="lazyImg" alt="<%=t.thumburl.replace(/^http:\\/\\//,\'//\')%>" src="//static.youku.com/v1.0.1098/index/img/sprite.gif"></a>\n</div>\n<ul class="info">\n<li class="name">\n<a href="<%=t.starUrl%>" target="_blank"><%=t.personname%></a>\n</li>            \n<li class="area">\n<span><%=t.character%></span>\n</li>\n</ul>\n</li>\n<%})%>  \n</ul>\n<div class="clear"></div>\n</div>\n<div class="c">\n<div class="tab-h">\n<% data.forEach(function(t, i){ %> \n<ul personid="<%=t.personid%>" style="<%=(i == 0 ? \'\' : \'display:none\')%>">\n<% t.cates.forEach(function(value,index){ %> \n<li personid="<%=t.personid%>" index="<%=index%>" class="<%=(index== 0 ? \'current\': \'\')%>">\n<a><%=value.category%></a>\n</li>\n<%})%>  \n</ul>\n<%})%>  \n<div class="clear"></div>\n</div>\n<% data.forEach(function(star,i1){ %> \n<% star.showes.forEach(function(ul, i2){ %> \n<%if(i1==0 && i2==0) {%>\n<div class="tab-c" style="display: block;"  personid="<%=star.personid%>">\n<%}else {%>\n<div class="tab-c" style="display: none;"  personid="<%=star.personid%>">\n<%}%>\n<div name="m_pos" id="m_star<%=i1%><%=i2%>" modshow="1">\n<div class="yk-row yk-row-sm">\n<div class="modPSlide mod_pslide " id="mdstar<%=i1%><%=i2%>">\n<div class="mbtn prev" style="display: none;">\n<a href="#" class="iconfont" title="上一组"></a>\n</div>\n<div class="mbtn next" style="display: block;">\n<a href="#" class="iconfont" title="下一组"></a>\n</div>\n<ul class="panel" style="left: 0px;">   \n<% ul.forEach(function(t, i){ %> \n<li class="yk-col4 mr1">\n<div class="yk-pack pack-film">\n<div class="p-thumb">\n<a href="<%=t.url%>"  title="<%=t.name%>"  target="_blank"></a>\n<i class="bg"></i>\n<%if(i< 6){%>\n<img class="lazyImg" alt="<%=t.thumburl.replace(/^http:\\/\\//,\'//\')%>" src="//static.youku.com/v1.0.1098/index/img/sprite.gif">\n<%}else{%>\n<img class="lazyLoad" alt="<%=t.thumburl.replace(/^http:\\/\\//,\'//\')%>" src="//static.youku.com/v1.0.1098/index/img/sprite.gif">\n<%}%>\n<!-- 会员用券 -->\n<%if ((t.paid == "1" || t.paid == "2" ) && t.showid != \'60327\') {%>\n<%var rttext = t.paid == "1" ? "会员免费" : "会员用券";%>\n<div class="p-thumb-tagrt">\n<span class="vip-free"><%=rttext%></span>\n</div>\n<%}%>\n</div>  \n<!-- 标题 -->\n<ul class="info-list">\n<li class="title short-title">\n<%  var title = t.name;\nif (title.length > 17) \ntitle = title.substring(0, 17) + \'...\';%>\n<a href="<%=t.url%>" target="_blank" ><%=title%></a>\n</li>\n<% if (t.desc){ %>                \n<li class="subtitle">\n<%  var subtitle = t.desc;\nif (subtitle.length > 17) \nsubtitle = subtitle.substring(0, 17) + \'...\';%>\n<span><%=subtitle%></span>\n</li>\n<%}%>\n</ul>\n</div>\n</li>\n<%})%> \n</ul>\n</div>\n</div>\n</div>\n</div>\n<%})%> \n<%})%> \n</div>\n</div>';
				var l = t.compile(s)({
					data: e.stars,
					searchDomain: a.searchDomain,
					youku_homeurl: PageConfig.youku_homeurl,
					encodeUid: i.encodeUid,
					str: o,
					encodeURI: encodeURI,
					numberFormat: i.numberFormat
				});
				if (l) {
					a.$el.html(l);
					r(a.$el);
					setTimeout(function() {
						n({
							imgs: a.find(".lazyImg"),
							size: 150
						})
					}, 500)
				}
			},
			"{model} getStar:fail": function() {
				this.trigger("getStar:fail")
			}
		})
	});
	define("page/find/play/relationlist/infom", ["tui/view", "tui/art", "page/find/play/model/listall"], function(e, t, i) {
		return e.extend({
			initialize: function() {
				var e = this;
				this.$wrap = $("#module_basic_infom");
				this.mod = new i;
				this.modelEvents(this.mod);
				if (this.$wrap.length > 0) this.mod.getInfoM({
					vid: PageConfig.videoId
				})
			},
			"{mod} getInfoM:success": function(e) {
				var i = this;
				tpl = '<div class="play_wrapper">\n<div class="ykplay_modulebasic_infom_wrapper">\n<div class="play_header">\n<h2>视频信息</h2>\n</div>\n<div class="play_content">\n<ul>\n<li class="cut" title="<%=data.title%>">标题：\n<%if(data.title){%>\n<%=data.title%>\n<%}else{%>\n--\n<%}%>\n</li>\n<li>分类：<a class="blue" target="_blank" href="<%=data.channelUrl%>">\n<%if(data.channelName){%>\n<%=data.channelName%>\n<%}else{%>\n--\n<%}%>\n</a></li>\n<li class="cut">标签：\n<%if(data.tags.length == 1){%>\n<%if(data.tags[0]){%>\n<%data.tags.forEach(function(item,index){%> \n<%if(index < 3){%>\n<span class="round" title="<%=item%>"> <%=item%> </span>\n<%}%>\n<%})%>\n<%}else{%>\n--\n<%}%>\n<%}else{%>\n<%data.tags.forEach(function(item,index){%> \n<%if(index < 3){%>\n<span class="round" title="<%=item%>"> <%=item%> </span>\n<%}%>\n<%})%>\n<%}%>\n</li>\n<li title="<%=data.description%>">简介：\n<%if(des){%>\n<%=des%>\n<%}else{%>\n--\n<%}%>\n</li>\n</ul>\n</div>\n</div>\n</div>';
				var n = i.titleformate(e.description, 80);
				html = t.compile(tpl)({
					data: e,
					des: n
				});
				this.$wrap.html(html)
			},
			titleformate: function(e, t) {
				var i = 0;
				var n = 0;
				for (var a = 0; a < e.length; a++) {
					if (e.charCodeAt(a) < 0 || e.charCodeAt(a) > 255) i += 2;
					else i += 1;
					if (i >= t) {
						n = a;
						break
					}
				}
				if (0 != n) e = e.substring(0, n) + "...";
				return e
			}
		})
	});
	define("page/find/play/relationlist/topic", ["tui/view", "tui/art", "page/find/play/model/listall", "tui/slide2"], function(e, t, i, n) {
		return e.extend({
			initialize: function() {
				var e = this;
				this.$wrap = $("#module_basic_topic");
				this.mod = new i;
				this.modelEvents(this.mod);
				if (this.$wrap.length > 0) this.mod.getTopic({
					type: "pc",
					vids: "[" + PageConfig.videoId + "]"
				})
			},
			"{mod} getTopic:success": function(e) {
				var i, a, r;
				var o = PageConfig.videoId,
					s = [];
				if (e[o]) $.each(e[o], function(e, t) {
					s.push(t)
				});
				s = s.splice(0, 10);
				if (s.length) {
					i = '<div class="play_wrapper">\n<div class="topic-wrapper">\n<h2><i></i>话题</h2>\n<%var k=0;%>\n<div class="modPSlide mod_pslide " id="mdtopic">\n<div class="mbtn prev" style="display: none;">\n<a href="#" class="iconfont" title="上一组"><i></i></a>\n</div>\n<div class="mbtn next" style="display: block;">\n<a href="#" class="iconfont" title="下一组"><i></i></a>\n</div>\n<ul class="panel">\n<% data.forEach(function(t, i){ %> \n<%k=i%> \n<li>\n<div class="topic-item clearfix">\n<a href="//gh.youku.com/topic_page/detail?id=<%=t.topicId%>" target="_blank" class="banner"><img src="<%=t.banner%>"></a>\n<h3><a href="//gh.youku.com/topic_page/detail?id=<%=t.topicId%>"  target="_blank"  class="title">#<%=t.topicName%>#</a></h3>\n<p title="<%=t.desc%>"><%=t.desc%></p>\n</div>\n</li>\n<% }); %> \n<%if (k%2==0){%> \n<li>\n<div class="topic-item topic-guid clearfix">\n更多<a href="//gh.youku.com/topic_page/topic_list"  target="_blank" >话题</a>等你发现...\n</div>\n</li>\n<%}%>\n</ul>\n</div>			\n</div>\n</div>';
					a = t.compile(i)({
						data: s
					});
					this.$wrap.html(a);
					n(this.$wrap, {
						patchWidth: 25
					})
				} else this.mod.trigger("getTopic:fail")
			},
			"{mod} getTopic:fail": function(e) {
				this.$wrap.remove()
			}
		})
	});
	define("page/find/play/relationlist/listall", ["tui/view", "tui/art", "tui/common", "tui/cookie", "module/login/login", "tui/net", "page/find/play/interaction/iku", "tui/lazyImageLoader", "page/find/play/model/listall", "tui/slide2", "tui/util/num", "page/find/play/relationlist/topic", "page/find/play/relationlist/infom", "page/find/play/relationlist/stars"], function(e, t, i, n, r, o, s, l, d, c, u, f, p, m) {
		var h = e.extend({
			initialize: function() {
				var e = this;
				window.userSubRankCallback = function(t) {
					e.userSubRankCallback(t, e)
				};
				this._model = new d;
				this.modelEvents(this._model, "model");
				this._model.bind("getStatRank:success", this.statRankCallback.bind(this));
				this._model.bind("getInfo:success", this.infoCallback.bind(this));
				this._model.bind("getStar:success", this.starShowCallback.bind(this));
				this._model.bind("getInfo:fail", this.listCallbackFail.bind(this));
				this._model.bind("getStar:fail", this.listCallbackFail.bind(this));
				new p;
				$("#module_basic_topic").length && new f({
					el: "#module_basic_topic"
				});
				if ($("#module_basic_relation").length > 0) r.one("checklogin", function() {
					if (1 == PageConfig.playmode || 2 == PageConfig.playmode) e.video();
					else e.show()
				});
				if ($("#module_basic_relationleft").length > 0) r.one("checklogin", function() {
					e.likeShow()
				});
				$("#module_basic_star").length && new m({
					el: "#module_basic_star"
				});
				if ($("#module_basic_info").length > 0) this.infoShow()
			},
			searchDomain: "//www.soku.com",
			landscapeDault: "/index/img/2013/video/video_default_145x80.png",
			portraitDefault: "/index/img/2013/video/video_default_200x300.png",
			clickLogSender: function(e, t) {
				$(e).on("mousedown", "a", function() {
					var e = $(this);
					var i = [e.attr("_ck"), e.attr("_reck")];
					if (1 == t && e.attr("_recFeedbackLogUrlbfy")) i.push(e.attr("_recFeedbackLogUrlbfy") + "&type=7");
					i.forEach(function(e) {
						if (e) o.getRequest(e)
					})
				})
			},
			statRank: function() {
				this._model.getStatRank({
					cid: PageConfig.catId
				})
			},
			statRankCallback: function(e) {
				if ("undefined" != typeof e.html) $("#vpofficialrankingv5").html(e.html);
				this.statRankbind()
			},
			statRankbind: function() {
				var e = $("#vpofficialrankingv5 ul li").length;
				$("#vpofficialrankingv5 ul li").each(function(t) {
					$(this).mouseenter(function() {
						for (var i = 0; i < e; i++) {
							if ($("#rkLst" + i).length > 0) $("#rkLst" + i).hide();
							if ($("#thrkLst" + i).length > 0) $("#thrkLst" + i).removeClass("current")
						}
						if ($("#rkLst" + t).length > 0) $("#rkLst" + t).show();
						if ($("#thrkLst" + t).length > 0) $("#thrkLst" + t).addClass("current")
					})
				})
			},
			listCallbackFail: function(e) {
				$("#" + e).remove()
			},
			show: function() {
				var e = this;
				var t = "//ykrec.youku.com/show/packed/list.json?guid=" + n("__ysuid") + "&utdid=" + n("cna") + "&vid=" + PageConfig.videoId + "&sid=" + PageConfig.showid + "&cate=" + PageConfig.catId + "&t=" + (new Date).getTime();
				t += "&picSize=2&apptype=1&pg=3&module=9&pl=18&needTags=1&atrEnable=true&callback=?";
				var i = r.uid();
				if (i) t += "&uid=" + i;
				$.getJSON(t + "&t=" + Math.random(), function(t) {
					e.showCallback(t)
				})
			},
			showCallback: function(e) {
				var n = this;
				if (0 != e.e) {
					n.listCallbackFail("module_basic_relation");
					return
				}
				n.createShowData(e);
				var a = '<!-- 相关推荐列表 -->\n<div class="play_wrapper">\n<div class="play_header">\n<h2 class="moduletitle">相关推荐</h2> \n</div>\n<div class="play_content">\n<div class="rows" style="display: block;">\n<div class="row tuiguang" id="ab_v_1430192600"></div>\n<div class="row tuiguang" id="ab_v_1430192617"></div>\n<% data.forEach(function(t, i){ %>   \n<%if (t.mm == 1 && typeof(t.thirdDisplayUrl) !== "undefined" && typeof(t.thirdClickUrl) !== "undefined"){%> \n<div class="row tuiguang"  thirdDisplayUrl="<%=t.thirdDisplayUrl%>" thirdClickUrl="<%=t.thirdClickUrl%>">\n<%}else{%>\n<div class="row">\n<%}%>\n<div class="left-part">\n<!-- 图片地址和跳转地址 -->\n<div class="p-thumb">\n<a href="<%=t.videoUrl%>" _ck="<%=t.clickLogUrl%>" _reck="<%=t.recClickLogUrl%>" target="_blank" title="<%=t.title%>"></a>\n<i class="bg"></i>\n<img  alt="<%=t.picUrl.replace(/^http:\\/\\//,\'//\')%>" class="lazyImg" src="//static.youku.com/v1.0.1098/index/img/sprite.gif">\n</div>\n<!-- 播放时长 -->\n<ul class="p-info">\n<%if (t.type == 1){%> \n<%if (t.videoTime){%>\n<li class="status hover-hide">\n<span class="p-time">\n<i class="ibg"></i>\n<span><%=t.videoTime%></span>\n</span>\n</li>\n<%}%>\n<%}%>\n<!--  推广角标 -->\n<%if (t.mm == 1 && typeof(t.thirdDisplayUrl) !== "undefined" && typeof(t.thirdClickUrl) !== "undefined"){%> \n<li class="status hover-hide big">\n<span class="p-time">\n<i class="ibg"></i>\n<span>广告</span>\n</span>\n</li>\n<%}%>\n</ul>\n<!-- 高清超清角标 -->\n<%if ( !((t.mm == 1 && t.type == 8) || (t.type == 9)) ){%> \n<% if(t.streamtypes == 1) {%>\n<div class="streamtype"><span class="icon-SHD" title="超清">超清</span></div>\n<%}%>\n<% if(t.streamtypes == 2) {%>\n<div class="streamtype"><span class="icon-SHD" title="高清">高清</span></div>\n<%}%>\n<%}%>\n<!--  来疯角标 -->\n<%if (t.mm == 1 && t.type == 8){%> \n<div class="laifeng">\n<span>来疯</span>\n</div>\n<%}%>\n</div>\n<div class="right-part ">\n<ul class="info">\n<!-- 标题 -->\n<li class="title">\n<% var tt = t.title || \'优酷推荐视频\';%>\n<a href="<%=t.videoUrl%>" target="_blank" title="<%=tt%>" _ck="<%=t.clickLogUrl%>" _reck="<%=t.recClickLogUrl%>"><%=titleformate(tt)%></a>\n</li>\n<!-- 演员 -->\n<li class="subtitle">\n<%if (t.type !== 9){%> \n<%if (t.performer && t.performer.length) {%>\n<span>主演:</span>\n<%t.performer.forEach(function(v, index){%>\n<%if (index < 2){%> \n<%if (typeof (v) == \'object\') {%> \n<%if (v.id && v.name) {%>\n<% var uid =  encodeUid(v.id)%>\n<a href="<%=youku_homeurl%>star_page/uid_<%=uid%>.html" target="_blank"><%=v.name%></a>\n<%}%> \n<%} else {%>\n<%if (v) {%> \n<% var uri = encodeURI(v)%>\n<a href="<%=searchDomain%>/search_video/q_<%=uri%>.html" target="_blank"><%=v%></a>\n<%}%> \n<%}%>\n<%if (index == 0 && t.performer.length >= 2) {%>\n<span class="break">/</span>\n<%}%>\n<%}%>\n<%})%>\n<%} else if (t.dct == 100) {%>\n<%if (t.dubbing) {\nvar actorTitle = t.area == \'日本\' ? \'声优\' : \'配音\';%>\n<span><%=actorTitle%>:</span>\n<%for (var a = 0; a < 2; a++) {\nif (typeof (t.dubbing[a]) != \'undefined\') {\nif (typeof (t.dubbing[a]) == \'object\') {\nvar uri = encodeURI(t.dubbing[a].name);%>\n<a href="<%=searchDomain%>/search_video/q_<%=uri%>"  target="_blank"><%=t.dubbing[a].name%></a>\n<%} else {%>\n<% var uri = encodeURI(t.dubbing[a]);%>\n<a href="<%=searchDomain%>/search_video/q_<%=uri%>"  target="_blank"><%=t.dubbing[a]%></a>\n<%}%>\n<%if (a == 0 && t.dubbing[1]) {%>\n<span class="break">/</span>\n<%}%>\n<%}%>\n<%}%>\n<%}%>\n<%} else if ((t.dct == 85 || t.dct == 91) && t.userName) {%>\n<span>播出:<%=t.userName%></span>\n<%}%>\n<%}%>\n</li>\n<!-- 播放量评论量 -->\n<li  class="subtitle vvrate">\n<%if (t.mm == 1 && t.type == 8) {\nif (t.liveHouse == \'false\') {\nvar onlineAmount = t.onlineAmount || 0;%>\n<span><%=onlineAmount%>人正在看</span>\n<%}\n} else {\nif (t.type !== 9) {\nvar playAmount = t.playAmount || 0;\nvar commentCount = t.commentCount || 0;\n%>\n<span><%=num(playAmount)%>次播放</span>\n<span><%=num(commentCount)%>次评论</span>\n<%}%>\n<%}%>\n</li>\n</ul>\n</div>\n</div>\n<% }); %> \n<div class="row tuiguang" id="ab_v_1464781393"></div>\n<div class="row tuiguang" id="ab_v_1464781428"></div>\n<div class="row tuiguang" id="ab_v_1464781466"></div>\n<div class="clear"></div>		\n</div>\n</div>\n</div>';
				var r = t.compile(a)({
					data: e.data,
					titleformate: n.titleformate,
					num: u.field,
					searchDomain: n.searchDomain,
					youku_homeurl: PageConfig.youku_homeurl,
					encodeUid: i.encodeUid,
					encodeURI: encodeURI,
					numberFormat: i.numberFormat
				});
				if (r) {
					$("#module_basic_relation").html(r);
					l({
						imgs: $("#module_basic_relation").find(".lazyImg"),
						size: 150
					});
					n.clickLogSender("#module_basic_relation", 0);
					$(".tuiguang").each(function() {
						$(this).click(function() {
							var e = $(this).attr("thirdClickUrl");
							var t = new Image;
							t.src = e
						})
					})
				}
				n.trigger("relationlist:loaded");
				setTimeout(function() {
					n.adStat(e.req_id)
				}, 1e4)
			},
			video: function() {
				var e = this;
				var t = 2 == PageConfig.playmode ? 4 : 1;
				var i = 1 == PageConfig.playmode ? 23 : 15;
				var a = 2 == PageConfig.playmode ? 0 : 1;
				var o = "//ykrec.youku.com/video/packed/list.json?guid=" + n("__ysuid") + "&utdid=" + n("cna") + "&vid=" + PageConfig.videoId + "&sid=" + PageConfig.showid + "&cate=" + PageConfig.catId + "&apptype=1&pg=" + t + "&module=1&pl=" + i + "&needTags=" + a + "&atrEnable=true&callback=?" + "&t=" + (new Date).getTime();
				var s = r.uid();
				if (s) o += "&uid=" + s;
				$.getJSON(o + "&t=" + Math.random(), function(t) {
					e.videoCallback(t)
				})
			},
			videoCallback: function(e) {
				var n = this;
				if (0 != e.e) {
					n.listCallbackFail("module_basic_relation");
					return
				}
				n.createVideoData(e);
				var a = '<!-- 相关推荐列表 -->\n<div class="wrapper">\n<div class="header">\n<h2 class="moduletitle">相关推荐</h2> \n</div>\n<div class="content">\n<div class="rows" style="display: block;">\n<div class="row tuiguang" id="ab_v_1430192600"></div>\n<div class="row tuiguang" id="ab_v_1430192617"></div>\n<% data.forEach(function(t, i){ \nvar tt = t.title || \'优酷推荐视频\';\n%> \n<%if (t.mm == 1 && typeof(t.thirdDisplayUrl) !== "undefined" && typeof(t.thirdClickUrl) !== "undefined"){%> \n<div class="row tuiguang"  thirdDisplayUrl="<%=t.thirdDisplayUrl%>" thirdClickUrl="<%=t.thirdClickUrl%>">\n<%}else{%>\n<div class="row">\n<%}%>\n<div class="left-part">\n<div class="p-thumb">\n<a href="<%=t.videoUrl%>" _ck="<%=t.clickLogUrl%>" _reck="<%=t.recClickLogUrl%>" target="_blank" title="<%=tt%>"></a>\n<i class="bg"></i>\n<img  alt="<%=t.picUrl%>" class="lazyImg" src="//static.youku.com/v1.0.1098/index/img/sprite.gif">\n</div>\n<%if (!(t.mm == 1 && t.type == 8)){%> \n<ul class="p-info">\n<li class="status hover-hide">\n<span class="p-time">\n<i class="ibg"></i>\n<span><%=t.videoTime%></span>\n</span>\n</li>\n<!--  推广角标 -->\n<%if (t.mm == 1 && typeof(t.thirdDisplayUrl) !== "undefined" && typeof(t.thirdClickUrl) !== "undefined"){%> \n<li class="status hover-hide big">\n<span class="p-time">\n<i class="ibg"></i>\n<span>广告</span>\n</span>\n</li>\n<%}%>\n</ul>\n<%}%>\n<!-- 高清超清角标 -->\n<%if ( !((t.mm == 1 && t.type == 8) || (t.type == 9)) ){%> \n<% if(t.streamtypes == 1) {%>\n<div class="streamtype"><span class="icon-SHD" title="超清">超清</span></div>\n<%}%>\n<% if(t.streamtypes == 2) {%>\n<div class="streamtype"><span class="icon-SHD" title="高清">高清</span></div>\n<%}%>\n<%}%>\n<!-- 来疯直播与会员用券 -->\n<%if (t.mm == 1 && t.type == 8){%> \n<div class="laifeng"><span>来疯</span></div>\n<%} else if (t.pay_state == "1" || t.pay_state == "2") { %>\n<% var rttag = t.pay_state == "1" ? "会员免费" : "会员用券";%>\n<div class="streamtype"><span class="icon-SHD" title="超清"><%=rttag%></span></div>\n<%}%>		\n</div>\n<div class="right-part ">\n<% if (t.type != 9) {%>\n<ul class="info">\n<!-- 标题 -->\n<li class="title">\n<a href="<%=t.videoUrl%>" target="_blank" title="<%=tt%>" _ck="<%=t.clickLogUrl%>" _reck="<%=t.recClickLogUrl%>"><%=titleformate(tt)%></a>\n</li>\n<!-- 上传者 -->\n<%if ((playmode == 1 && t.type == 1) && !((t.mm !== 1 || t.type !== 8) && (t.pay_state == "1" || t.pay_state == "2"))) {%>\n<li  class="uploader">\n<% var uid = encodeUid(t.userId); %>\n<span><a href="//i.youku.com/i/<%=uid%>" target="_blank" title="<%=userName%>"><%=t.userName%></a></span>\n</li>\n<%}%>\n<!-- 播放量与评分 -->\n<li class="vvrate">\n<%if (t.mm == 1 && t.type == 8){%>\n<span><%=t.onlineAmount%>人正在看</span>\n<%} else {\nif (t.pay_state == "1" || t.pay_state == "2") { \nif (t.subTitle) { %>\n<span><%=t.subTitle%></span>\n<%}\nif (t.score) {%>\n<span>评分:\n<% var upCount = numberFormat(t.upCount)%>\n<% var downCount = numberFormat(t.downCount)%>\n<span class="score" title="有<%=upCount%>人顶过 有<%=downCount%>人踩过"><%==t.score%></span>\n</span>\n<%}%>\n<%} else {%>\n<% \nvar playAmount = t.playAmount || 0;\nvar commentCount = t.commentCount || 0;\n%>\n<span><%=num(playAmount)%>次播放</span>\n<span><%=num(commentCount)%>次评论</span>\n<%}%>\n<%}%>\n</li>\n</ul>\n<%} else {%> \n<ul class="info">\n<!-- 标题 -->\n<li class="title">\n<a href="<%=t.videoUrl%>" target="_blank" title="<%=tt%>"><%=titleformate(tt)%></a>\n</li>\n</ul>\n<%}%>\n</div> \n</div>\n<% }); %> \n<div class="row tuiguang" id="ab_v_1464781393"></div>\n<div class="row tuiguang" id="ab_v_1464781428"></div>\n<div class="row tuiguang" id="ab_v_1464781466"></div>\n<div class="clear"></div>\n</div>\n</div>\n</div>\n';
				var r = t.compile(a)({
					data: e.data,
					titleformate: n.titleformate,
					num: u.field,
					searchDomain: n.searchDomain,
					youku_homeurl: PageConfig.youku_homeurl,
					encodeUid: i.encodeUid,
					encodeURI: encodeURI,
					numberFormat: i.numberFormat,
					playmode: PageConfig.playmode,
					floor: Math.floor
				});
				if (r) {
					$("#module_basic_relation").html(r);
					l({
						imgs: $("#module_basic_relation").find(".lazyImg"),
						size: 150
					});
					n.clickLogSender("#module_basic_relation", 0);
					$(".tuiguang").each(function() {
						$(this).click(function() {
							var e = $(this).attr("thirdClickUrl");
							var t = new Image;
							t.src = e
						})
					})
				}
				n.trigger("relationlist:loaded");
				setTimeout(function() {
					n.adStat(e.req_id)
				}, 1e4)
			},
			clickLog: function(e) {
				if ("" != e) RelationAsync._addScript(e, null, true)
			},
			createVideoData: function(e) {
				var t = this;
				var i = e.data;
				if (i) for (var n = 0, a = i.length; n < a; n++) {
					var r = "";
					var o = "";
					var s = "";
					var l = "";
					var d = "";
					if ("undefined" == typeof i[n].playLink) {
						if (1 == i[n].type) r = PageConfig.homeHost + "v_show/id_" + i[n].codeId + ".html";
						else if (2 == i[n].type) r = PageConfig.youku_homeurl + "show_page/id_" + i[n].codeId + ".html"
					} else r = i[n].playLink;
					if (197141899 == i[n].id) r = "//yikan.youku.com/u/home?from=y1.2.0.1";
					if (i[n].totalTime) o = t.time_format(i[n].totalTime);
					var s = i[n].mm || 0;
					l = 9 == i[n].type ? "" : t.streamtypes2(i[n].streamtypes);
					if (i[n].score) d = t.score(i[n].score);
					i[n].videoUrl = r;
					if (i[n].totalTime) i[n].videoTime = o;
					i[n].mm = s;
					i[n].streamtypes = l;
					if (i[n].score) i[n].score = d;
					if (void 0 != i[n].thirdDisplayUrl && void 0 != i[n].thirdClickUrl) {
						var c = i[n].thirdDisplayUrl;
						var u = new Image;
						u.src = c
					}
				}
			},
			createShowData: function(e) {
				var t = this;
				var i = e.data;
				if (i) for (var n = 0, a = i.length; n < a; n++) {
					var r = "";
					var o = "";
					var s = "";
					var l = "";
					if ("undefined" == typeof i[n].playLink) {
						if (1 == i[n].type) r = PageConfig.homeHost + "v_show/id_" + i[n].codeId + ".html";
						else if (2 == i[n].type) r = PageConfig.youku_homeurl + "show_page/id_" + i[n].codeId + ".html"
					} else r = i[n].playLink;
					if (197141899 == i[n].id) r = "//yikan.youku.com/u/home?from=y1.2.0.1";
					if (i[n].totalTime) o = t.time_format(i[n].totalTime);
					var s = i[n].mm || 0;
					l = 9 == i[n].type ? "" : t.streamtypes2(i[n].streamtypes);
					i[n].videoUrl = r;
					if (i[n].totalTime) i[n].videoTime = o;
					i[n].mm = s;
					i[n].streamtypes = l;
					if (void 0 != i[n].thirdDisplayUrl && void 0 != i[n].thirdClickUrl) {
						var d = i[n].thirdDisplayUrl;
						var c = new Image;
						c.src = d
					}
				}
			},
			titleformate: function(e) {
				var t = 0;
				var i = 0;
				for (var n = 0; n < e.length; n++) {
					if (e.charCodeAt(n) < 0 || e.charCodeAt(n) > 255) t += 2;
					else t += 1;
					if (t >= 42) {
						i = n;
						break
					}
				}
				if (0 != i) e = e.substring(0, i) + "...";
				return e
			},
			score: function(e) {
				var t = "";
				if (e) {
					var i = Math.floor(e / 2);
					var n = 0 != e % 2 ? 1 : 0;
					var a = 5 - i - n;
					for (var r = 0; r < i; r++) t += '<i class="ico-ratefull"></i>';
					for (var o = 0; o < n; o++) t += '<i class="ico-ratepart"></i>';
					for (var s = 0; s < a; s++) t += '<i class="ico-ratenull"></i>';
					t += e
				}
				return t
			},
			splitTag: function(e) {
				var t = "";
				if (e) {
					var i = e.split("/");
					for (var n = 0, a = i.length; n < a; n++) {
						if (n >= 2) break;
						t += "<span>" + i[n] + "</span>";
						if (0 == n && a >= 2) t += '<span class="break">/</span>'
					}
				}
				return t
			},
			getActor: function(e) {
				var t = "";
				if (e && e.length) {
					t = "<label>主演:</label>";
					for (var i = 0; i < 2; i++) {
						if ("object" == typeof e[0]) t += "<span>" + e[i].name + "</span>";
						else t += "<span>" + e[i] + "</span>";
						if (0 == i && e.length >= 2) t += '<span class="break">/</span>'
					}
				}
				return t
			},
			streamtypes: function(e) {
				var t = "";
				var i = new Array;
				i = e.split(",");
				for (var n = 0, a = i.length; n < a; n++) if ("hd2" == i[n]) {
					t = '<div class="v-thumb-tagrt"><i class="ico-SD" title="超清"></i></div>';
					break
				} else if ("hd" == i[n]) {
					t = '<div class="v-thumb-tagrt"><i class="ico-HD" title="高清"></i></div>';
					break
				}
				return t
			},
			streamtypes2: function(e) {
				if (e) {
					var t = "";
					var i = new Array;
					i = e.split(",");
					for (var n = 0, a = i.length; n < a; n++) if ("hd2" == i[n]) {
						t = 1;
						break
					} else if ("hd" == i[n]) {
						t = 2;
						break
					}
					return t
				} else return 0
			},
			time_format: function(e) {
				var t = 0;
				var i = e % 60;
				var t = Math.floor(e / 60);
				if (t <= 9) t = "0" + t;
				if (i <= 9) i = "0" + i;
				return t + ":" + i
			},
			in_array: function(e, t) {
				if ("string" == typeof e || "number" == typeof e) for (var i in t) if (t[i] == e) return true;
				return false
			},
			arraySort: function(e) {
				return e.sort(function() {
					return .5 - Math.random()
				})
			},
			adStat: function(e) {
				var t = this;
				var i = 1;
				if (1 == PageConfig.playmode || 3 == PageConfig.playmode) i = PageConfig.playmode;
				else if (2 == PageConfig.playmode) i = 4;
				var a = 0;
				if ($("#ab_v_1430192600").length > 0 && $("#ab_v_1430192617").length > 0 && "" != $("#ab_v_1430192600")[0].innerHTML && "" != $("#ab_v_1430192617")[0].innerHTML) a = 2;
				else if (($("#ab_v_1430192600").length > 0 && "" != $("#ab_v_1430192600").innerHTML).length > 0 || $("#ab_v_1430192617").length > 0 && "" != $("#ab_v_1430192617")[0].innerHTML) a = 1;
				else a = 0;
				var o = "";
				var s = "";
				if ($("#ad_1430192600").length > 0 && $("#ad_1430192600")[0].getAttribute("vid")) o = $("#ad_1430192600")[0].getAttribute("vid");
				if ($("#ad_1430192617").length > 0 && $("#ad_1430192617")[0].getAttribute("vid")) s = $("#ad_1430192617")[0].getAttribute("vid");
				var l = "logVersion=1&visitTime=" + (new Date).valueOf() + "&ip=0&cookieid=" + n("__ysuid") + "&uid=" + r.uid() + "&ua=" + navigator.userAgent.toLowerCase() + "&req_id=" + e + "&vid=" + window.videoId + "&apt=1&pg=" + i + "&md=1&adnum=" + a + "&advid1=" + o + "&advid2=" + s;
				var d = "//r.l.youku.com/rec_ad_show?" + l;
				var c = new Image;
				c.src = d
			},
			userSubRank: function() {
				var e = "";
				var t = "";
				var i = e.split("|");
				var n = t.split("|");
				var a = true;
				var r = true;
				for (var s = 0, l = i.length; s < l; s++) if (i[s] == window.catId) {
					a = true;
					break
				}
				for (var d = 0, l = n.length; d < l; d++) if (n[d] == window.playmode) {
					r = true;
					break
				}
				if (true == a && true == r) {
					var c = this;
					var u = 20;
					var f = window.catId;
					var p = 1;
					var m = 1;
					var h = 6;
					var v = "jsonp";
					var g = "userSubRankCallback";
					var y = "//uo.youku.com/channelstore/rank/getRankData?rank_id=" + u + "&channel_id=" + f + "&user_detail=" + p + "&pn=" + m + "&pz=" + h + "&format=" + v + "&callback=" + g;
					o.getScript(y)
				}
			},
			userSubRankCallback: function(e, t) {
				if (0 == e.error_code && e.result) {
					var i = e.result;
					var n = "undefined" != typeof window.catName ? decodeURIComponent(window.catName) + "原创榜" : "相关原创排行";
					var a = ["99", "85", "100", "95", "87", "84", "91", "86", "98", "104", "105", "103", "89", "88", "90", "94", "171", "172"];
					var r = "undefined" != typeof window.catId && a.indexOf(window.catId) > -1 ? "//www.youku.com/u/originalRanking/channel/" + window.catId : "//www.youku.com/u/originalRanking/channel/0";
					var o = '<div class="subscirbe-rank"><div class="hd"><span>' + n + '</span><span><a class="more" href="' + r + '" target="_blank">更多</a></span></div><div class="bd" id="usersubrank">';
					var s = i.length;
					for (var l = 0; l < s; l++) {
						var d = l + 1;
						o += '<div class="item" name="usersubranklist" seq="' + d + '" style="background: rgb(255, 255, 255);">';
						if (d <= 3) o += '<label class="hot">' + d + "</label>";
						else o += "<label>" + d + "</label>";
						var c = t._cutStr(i[l]["description"], 40, "...");
						o += '<img class="lazyImg" src="' + i[l]["profile_image_url"]["big"] + '" alt="' + i[l]["screen_name"] + '"><div class="userinfo">' + '<h3><a target="_blank" href="' + i[l]["home_page"] + '">' + i[l]["screen_name"] + "</a>";
						if (1 == i[l]["verified"]) o += '<img src="//r1.ykimg.com/051000005464214D6737B35561064942" alt="认证图标"></h3>';
						else o += "</h3>";
						o += "<p>" + c + '</p></div><a class="sub-btn" target="_blank" href="' + i[l]["home_page"] + '?subscribe" style="display: none;" id="ranklist' + d + '">订阅</a></div>'
					}
					o += "</div></div>";
					$("#userSubRankBox")[0].innerHTML = o;
					var u = t._getElementsByName($("#usersubrank")[0], "div", "usersubranklist");
					if (u) {
						var f = u.length;
						for (var l = 0; l < f; l++)!
						function(e) {
							var i = e.getAttribute("seq");
							t._addEvent(e, "mouseenter", function() {
								if ($("#ranklist" + i).length > 0) $("#ranklist" + i)[0].style.display = "block"
							});
							t._addEvent(e, "mouseleave", function() {
								if ($("#ranklist" + i).length > 0) $("#ranklist" + i)[0].style.display = "none"
							})
						}(u[l])
					}
				}
			},
			recUser: function() {},
			creatReluserHtml: function(e) {
				var t = e.data;
				if (t) {
					var n = "";
					n = '<div class="box nBox">' + '<div class="head">' + '<div class="caption"><h3 class="title">相关视频上传者</h3></div>' + '<div class="extend" id="changeNext" value="1"><a href="javascript:void(0);">换一换</a></div>' + "</div>" + '<div class="body">' + '<div class="uRelated">' + '<div class="items">';
					for (var a = 0, r = t.length; a < r; a++) {
						var o = 1 == t[a].verified ? '<a target="_blank" title="认证用户" href="//i.youku.com/u/rz"><span class="ico_cert"></span></a>' : "";
						var s = a > 2 ? 'style="display:none;"' : "";
						var l = t[a].desc;
						if (!l) l = "还未添加频道介绍";
						if (l.length > 20) l = l.substring(0, 20) + "...";
						if (a < 3) var d = 1;
						else if (a > 2 && a < 6) var d = 2;
						else var d = 3;
						var c = this.clickParam + "&pos=" + a + "&dma=" + t[a].dma + "&algInfo=" + t[a].algInfo;
						n += '<div value="' + d + '" class="u" ' + s + ">" + '<div class="u-thumb" cardplace="lr" uid="' + t[a].id + '">' + '<a title="' + t[a].username + '" href="//i.youku.com/i/' + i.encodeUid(t[a].id) + '" target="_blank" charset="' + c + '"><img src="' + t[a].picUrl + '"></a>' + "</div>" + '<div class="u-meta">' + '<div class="u-name" uid="' + t[a].id + '"><a target="_blank" href="//i.youku.com/i/' + i.encodeUid(t[a].id) + '" target="_blank" charset="' + c + '">' + t[a].username + "</a>&nbsp;" + o + "</div>" + '<div class="u-entry">' + "<div><label>简介:</label>" + l + "</div>" + "</div>" + '<div class="u-meta-tagrt">' + '<div class="form_btn form_btn_m form_btnmaj_m"><a href="//i.youku.com/i/' + i.encodeUid(t[a].id) + '?subscribe" target="_blank" charset="' + c + '"><span class="form_btn_text"><i class="ico_subscription"></i>订阅</span></a></div>' + "</div>" + "</div>" + "</div>"
					}
					n += "</div></div></div></div>";
					var u = this.creatReluserCardHtml(t);
					n += u;
					return n
				}
			},
			creatReluserCardHtml: function(e) {
				var t = "";
				if (e) {
					t += '<div class="cardBox">';
					for (var n = 0, a = e.length; n < a; n++) {
						var r = 1 == e[n].verified ? '<a target="_blank" title="认证用户" href="//i.youku.com/u/rz"><span class="ico_cert"></span></a>' : "";
						var o = "";
						if (e[n].videos) {
							var s = e[n].videos;
							for (var l = 0, d = s.length; l < d; l++) {
								var c = s[l].title;
								if (c.length > 20) c = c.substring(0, 20) + "...";
								var u = this.clickParam + "&pos=" + n + "&dma=" + s[l].dma + "&algInfo=" + s[l].algInfo + "&dvid=" + s[l].id + "&dct=" + s[l].dct;
								o += '<div class="v v-small">' + '<div class="v-thumb">' + '<img src="' + s[l].picUrl + '" alt="" />' + "</div>" + '<div class="v-link">' + '<a href="' + s[l].playLink + '" target="_blank" title="' + c + '" charset="' + u + '"></a>' + "</div>" + '<div class="v-meta">' + '<div class="v-meta-info">' + '<a href="' + s[l].playLink + '" target="_blank" charset="' + u + '">' + c + "</a>" + "</div>" + "</div>" + "</div>"
							}
							o += '<div class="clear"></div>'
						}
						var f = e[n].desc;
						if (!f) f = "还未添加频道介绍";
						if (f.length > 15) f = f.substring(0, 15) + "...";
						var p = this.clickParam + "&pos=" + n + "&dma=" + e[n].dma + "&algInfo=" + e[n].algInfo;
						t += '<div class="card-container" style="display:none;" uid="' + e[n].id + '">' + '<div class="u-detail">' + '<div class="name-vip">' + '<a href="//i.youku.com/i/' + i.encodeUid(e[n].id) + '" target="_blank" charset="' + p + '"><span>' + e[n].username + "</span></a>&nbsp;" + r + "</div>" + "</div>" + '<div class="u-profile">' + '<img src="' + e[n].picUrl + '" />' + "</div>" + '<div class="fans-videos">' + "<span>粉丝 " + i.numberFormat(e[n].followersCount) + "</span>" + "</div>" + '<div class="card-cont">' + "<span>" + f + "</span>" + "</div>" + '<div class="u-meta-tagrt btn-subscribe">' + '<div class="form_btn form_btn_m form_btnmaj_m"><a href="//i.youku.com/i/' + i.encodeUid(e[n].id) + '?subscribe" target="_blank" charset="' + p + '"><span class="form_btn_text"><i class="ico_subscription"></i>订阅</span></a></div>' + "</div>" + '<div class="video-items">' + o + "</div>" + "</div>"
					}
					t += "</div>"
				}
				return t
			},
			changeNext: function(e) {
				e("#changeNext").click(function() {
					var t = e(this).attr("value");
					t++;
					t = t > 3 ? 1 : t;
					e(this).attr("value", t);
					e(".uRelated .items .u[value=" + t + "]").show();
					e(".uRelated .items .u[value!=" + t + "]").hide()
				})
			},
			userCardAction: function(e) {
				var t = null;
				var i = null;
				var n = 400;
				var a = null;
				var r = e(".u-thumb, .u-name");
				var o = [];
				e.each(r, function() {
					o.push(e(this).attr("cardplace", "lr"))
				});
				e.each(o, function() {
					e(this).mouseenter(function(r) {
						var o = e(this);
						var s = e(this).attr("uid");
						clearTimeout(a);
						a = setTimeout(function() {
							e(".card-container[uid=" + s + "]").show();
							e(".card-container[uid!=" + s + "]").hide();
							if (!t) {
								t = new Qcard;
								i = e(t.getNode());
								i.mouseenter(function() {
									clearTimeout(a)
								}).mouseleave(function() {
									a = setTimeout(function() {
										t.hide()
									}, n)
								})
							}
							t.setContent("element", e(".cardBox").show().get(0)).setRefer(o.get(0)).setType(o.attr("cardtype") ? o.attr("cardtype") : 0).setPos(o.attr("cardplace")).show(null, r)
						}, n)
					}).mouseleave(function(e) {
						clearTimeout(a);
						a = setTimeout(function() {
							t.hide()
						}, n)
					})
				})
			},
			clickParam: null,
			createClickParam: function(e) {
				var t = get_username("all");
				if (t.userid) var i = "&uid=" + t.userid;
				else var i = "";
				this.clickParam = "vc-cookie_id =" + Nova.Cookie.get("__ysuid") + i + "&vid=" + window.videoId + "&sid=" + window.showid + "&sct=" + window.catId + "&apt=1&pg=1&md=1&abver=" + e.ver + "&ord=" + e.ord + "&req_id=" + e.req_id + "&rand=" + Math.random()
			},
			loadJS: function(e, t, i) {},
			_getElementsByName: function(e, t, i) {
				var n = window.document.getElementsByName(i);
				if (n.length > 0) return n;
				n = new Array;
				var a = e || window.document;
				var r = a.getElementsByTagName(t);
				for (var o = 0; o < r.length; o++) if (r[o].getAttribute("name") == i) n[n.length] = r[o];
				return n
			},
			_addEvent: function(e, t, i) {
				if (window.addEventListener) if ("mouseenter" == t || "mouseleave" == t) {
					function n(e) {
						var t = e.currentTarget,
							n = e.relatedTarget;
						if (!a(t, n) && t != n) i.call(e.currentTarget, e)
					}
					function a(e, t) {
						try {
							return e.contains ? e != t && e.contains(t) : !! (16 & e.compareDocumentPosition(t))
						} catch (i) {}
					}
					if ("mouseenter" == t) e.addEventListener("mouseover", n, false);
					else e.addEventListener("mouseout", n, false)
				} else e.addEventListener(t, i, false);
				else if (window.attachEvent) e.attachEvent("on" + t, i)
			},
			_addScript: function(e, t, i) {
				if ("string" != typeof arguments[0]) return;
				var t = "function" == typeof arguments[1] ? t : function() {};
				var i = "boolean" == typeof arguments[2] ? i : false;
				var n = document.getElementsByTagName("HEAD")[0];
				var a = document.createElement("SCRIPT");
				a.type = "text/javascript";
				a.src = e;
				n.appendChild(a);
				if (!0) a.onerror = a.onload = function() {
					t();
					if (i) a.parentNode.removeChild(this)
				};
				else a.onreadystatechange = function() {
					if ("loaded" == this.readyState || "complete" == this.readyState) {
						t();
						if (i) this.parentNode.removeChild(this)
					}
				}
			},
			_cutStr: function(e, t, i) {
				if (!e) return "";
				var n = 0;
				var r = 0;
				str_cut = new String;
				r = e.length;
				for (var o = 0; o < r; o++) {
					n++;
					a = e.charAt(o);
					if (escape(a).length > 4) n++;
					if (n > t) {
						if (i) str_cut = str_cut.concat(i);
						return str_cut
					}
					str_cut = str_cut.concat(a)
				}
				if (n <= t) return e
			},
			starShow: function() {
				this._model.getStar({
					vid: PageConfig.videoId,
					showid: PageConfig.showid,
					cid: PageConfig.catId
				})
			},
			starShowCallback: function(e) {
				var n = this;
				var a = '\n<div class="mod modSwitch mod-new">\n<div class="h">\n<!-- 演员 -->\n<ul class="head_tab">\n<% data.forEach(function(t, i){%> \n<li class="<%=(i=== 0 ? \'current\': \'\')%>" personid="<%=t.personid%>">\n<div class="pic">\n<a href="<%=t.starUrl%>" target="_blank"><img class="lazyImg" alt="<%=t.thumburl.replace(/^http:\\/\\//,\'//\')%>" src="//static.youku.com/v1.0.1098/index/img/sprite.gif"></a>\n</div>\n<ul class="info">\n<li class="name">\n<a href="<%=t.starUrl%>" target="_blank"><%=t.personname%></a>\n</li>            \n<li class="area">\n<span><%=t.character%></span>\n</li>\n</ul>\n</li>\n<%})%>  \n</ul>\n<div class="clear"></div>\n</div>\n<div class="c">\n<div class="tab-h">\n<% data.forEach(function(t, i){ %> \n<ul personid="<%=t.personid%>" style="<%=(i == 0 ? \'\' : \'display:none\')%>">\n<% t.cates.forEach(function(value,index){ %> \n<li personid="<%=t.personid%>" index="<%=index%>" class="<%=(index== 0 ? \'current\': \'\')%>">\n<a><%=value.category%></a>\n</li>\n<%})%>  \n</ul>\n<%})%>  \n<div class="clear"></div>\n</div>\n<% data.forEach(function(star,i1){ %> \n<% star.showes.forEach(function(ul, i2){ %> \n<%if(i1==0 && i2==0) {%>\n<div class="tab-c" style="display: block;"  personid="<%=star.personid%>">\n<%}else {%>\n<div class="tab-c" style="display: none;"  personid="<%=star.personid%>">\n<%}%>\n<div name="m_pos" id="m_star<%=i1%><%=i2%>" modshow="1">\n<div class="yk-row yk-row-sm">\n<div class="modPSlide mod_pslide " id="mdstar<%=i1%><%=i2%>">\n<div class="mbtn prev" style="display: none;">\n<a href="#" class="iconfont" title="上一组"></a>\n</div>\n<div class="mbtn next" style="display: block;">\n<a href="#" class="iconfont" title="下一组"></a>\n</div>\n<ul class="panel" style="left: 0px;">   \n<% ul.forEach(function(t, i){ %> \n<li class="yk-col4 mr1">\n<div class="yk-pack pack-film">\n<div class="p-thumb">\n<a href="<%=t.url%>"  title="<%=t.name%>"  target="_blank"></a>\n<i class="bg"></i>\n<%if(i< 6){%>\n<img class="lazyImg" alt="<%=t.thumburl.replace(/^http:\\/\\//,\'//\')%>" src="//static.youku.com/v1.0.1098/index/img/sprite.gif">\n<%}else{%>\n<img class="lazyLoad" alt="<%=t.thumburl.replace(/^http:\\/\\//,\'//\')%>" src="//static.youku.com/v1.0.1098/index/img/sprite.gif">\n<%}%>\n<!-- 会员用券 -->\n<%if ((t.paid == "1" || t.paid == "2" ) && t.showid != \'60327\') {%>\n<%var rttext = t.paid == "1" ? "会员免费" : "会员用券";%>\n<div class="p-thumb-tagrt">\n<span class="vip-free"><%=rttext%></span>\n</div>\n<%}%>\n</div>  \n<!-- 标题 -->\n<ul class="info-list">\n<li class="title short-title">\n<%  var title = t.name;\nif (title.length > 17) \ntitle = title.substring(0, 17) + \'...\';%>\n<a href="<%=t.url%>" target="_blank" ><%=title%></a>\n</li>\n<% if (t.desc){ %>                \n<li class="subtitle">\n<%  var subtitle = t.desc;\nif (subtitle.length > 17) \nsubtitle = subtitle.substring(0, 17) + \'...\';%>\n<span><%=subtitle%></span>\n</li>\n<%}%>\n</ul>\n</div>\n</li>\n<%})%> \n</ul>\n</div>\n</div>\n</div>\n</div>\n<%})%> \n<%})%> \n</div>\n</div>';
				var r = t.compile(a)({
					data: e.stars,
					searchDomain: n.searchDomain,
					youku_homeurl: PageConfig.youku_homeurl,
					encodeUid: i.encodeUid,
					encodeURI: encodeURI,
					numberFormat: i.numberFormat
				});
				if (r) {
					var o = $("#module_basic_star");
					o.html(r);
					c(o);
					n.bindStar("module_basic_star");
					setTimeout(function() {
						l({
							imgs: $("#module_basic_star").find(".lazyImg"),
							size: 150
						})
					}, 500)
				}
			},
			bindStar: function(e) {
				$("#" + e + " .head_tab>li").mouseenter(function() {
					$("#" + e + " .head_tab>li").each(function() {
						$(this).removeClass("current")
					});
					$(this).addClass("current");
					var t = $(this).attr("personid");
					$("#" + e + " .tab-h ul").each(function() {
						$(this).hide()
					});
					$("#" + e + " .tab-h ul[personid='" + t + "']").show();
					$("#" + e + " .tab-h ul[personid='" + t + "'] li").each(function(e) {
						if (0 == e) $(this).addClass("current");
						else $(this).removeClass("current")
					});
					$("#" + e + " .c .tab-c").each(function() {
						$(this).hide()
					});
					var i = $("#" + e + " .c .tab-c[personid='" + t + "']:first");
					i.show();
					i.find(".modPSlide").trigger("slider:show")
				});
				$("#" + e + " .tab-h ul").each(function() {
					$(this).children().each(function(t) {
						$(this).click(function() {
							var i;
							$(this).parent().children().each(function() {
								$(this).removeClass("current")
							});
							$(this).addClass("current");
							var n = $(this).attr("personid");
							$("#" + e + " .c .tab-c").each(function() {
								$(this).hide()
							});
							i = $($("#" + e + " .c .tab-c[personid='" + n + "']")[t]);
							i.show();
							i.find(".modPSlide").trigger("slider:show")
						})
					})
				})
			},
			infoShow: function() {
				this._model.getInfo({
					vid: PageConfig.videoId,
					fid: PageConfig.folderId,
					pm: PageConfig.playmode
				})
			},
			infoCallback: function(e) {
				if (2 == PageConfig.playmode) this.bodanCallback(e);
				if (5 == PageConfig.playmode) this.mvCallback(e)
			},
			bodanCallback: function(e) {
				var n = this;
				var a = '<!-- 播单信息 -->\n<div class="wrapper">\n<div class="header">\n<h2 class="moduletitle">播单信息</h2> \n<span><a href="<%=data.folderUrl%>" target="_blank">播单详情</a></span> \n</div>\n<div class="content">\n<div class="rows" style="display: block;"> \n<div class="row">\n<div class="left-part">\n<!-- 图片地址和跳转地址 -->\n<div class="p-thumb">\n<a href="<%=data.folderUrl%>" target="_blank"></a>\n<i class="bg"></i>\n<img class="" src="<%=data.thumbUrl%>">\n</div>\n</div>\n<div class="right-part ">\n<ul class="info">\n<!-- 标题 -->\n<li class="title oneline">\n<%=titleformate(data.title)%>\n</li>\n<li class="subtitle oneline">\n<span>创建者：<a target="_blank" href="<%=data.ownerUrl%>"><%=data.ownerName%></a></span>\n</li>\n<li class="subtitle">\n<% var viewCount = numberFormat(data.viewCount);%>\n<span>播放数：<%=viewCount%></span>\n</li>\n<li class="subtitle">\n<span>最近更新：<%=data.update%></span>\n</li>\n</ul>\n</div>\n</div> \n<div class="clear"></div>		\n</div>\n</div>\n</div>';
				var r = t.compile(a)({
					data: e.data,
					numberFormat: i.numberFormat,
					titleformate: n.titleformate
				});
				if (r) {
					var o = $("#module_basic_info");
					o.addClass("bodan");
					o.html(r)
				}
				setTimeout(function() {}, 1e4)
			},
			mvCallback: function(e) {
				var n = this;
				var a = '<!-- 播单信息 -->\n<div class="wrapper">\n<div class="header">\n<h2 class="moduletitle">MV信息</h2> \n</div>\n<div class="content">\n<div class="rows" style="display: block;"> \n<div class="row">\n<div class="left-part">\n<!-- 图片地址和跳转地址 -->\n<div class="p-thumb">\n<a target="_blank" href="<%=data.ownerUrl%>"></a>\n<i class="bg"></i>\n<img src="<%=data.thumbUrl%>">\n</div>\n</div>\n<div class="right-part ">\n<ul class="info">\n<!-- 标题 -->\n<li class="title oneline">\n<%=titleformate(data.ownerName)%>\n</li>\n<li class="subtitle">\n<span><a target="_blank" href="//music.youku.com/">音乐MV</a> / <%=data.releaseDate%></span>\n</li>\n<li class="subtitle">\n<span>演唱：<a target="_blank" href="<%=data.ownerUrl%>"><%=data.ownerName%></a></span>\n</li>\n<li class="subtitle">\n<%if(data.lyricsWriter.id == 0){%>\n<span>词 / 曲：<%=data.lyricsWriter.name%>\n<%} else {%>\n<span>词 / 曲：<a target="_blank" href="<%=data.lyricsWriter.url%>"><%=data.lyricsWriter.name%></a>\n<%}%>\n/ \n<%if(data.composer.id == 0){%>\n<span><%=data.composer.name%>\n<%} else {%>\n<span><a target="_blank" href="<%=data.composer.url%>"><%=data.composer.name%></a>\n<%}%>\n</li>\n<%if (!!(data.alias)){%>\n<li class="subtitle">\n<span>别名：<%=data.alias%></span>\n</li>\n<%}%>\n</ul>\n</div>\n</div> \n<div class="clear"></div>		\n</div>\n</div>\n</div>';
				var r = t.compile(a)({
					data: e.data,
					numberFormat: i.numberFormat,
					titleformate: n.titleformate
				});
				if (r) {
					var o = $("#module_basic_info");
					o.addClass("mv");
					o.html(r)
				}
				setTimeout(function() {}, 1e4)
			},
			likeShow: function() {
				var e = this;
				var t = "//ykrec.youku.com/show/packed/list.json?1111&guid=" + n("__ysuid") + "&utdid=" + n("cna") + "&vid=" + PageConfig.videoId + "&sid=" + PageConfig.showid + "&cate=" + PageConfig.catId + "&apptype=1&pg=3&module=1&pl=20&needTags=0&picSize=2&atrEnable=true&callback=?" + "&t=" + (new Date).getTime();
				var i = r.uid();
				if (i) t += "&uid=" + i;
				$.getJSON(t + "&t=" + Math.random(), function(t) {
					e.likeShowCallback(t)
				})
			},
			likeShowCallback: function(e) {
				var n = this;
				var a = $("#module_basic_relationleft");
				if (!e.data || !e.data.length) {
					a.hide();
					return
				}
				n.createLikeShowData(e);
				var r = '<div class="mod modSwitch mod-new">\n<div class="h">\n<h2 class="moduletitle">大家都在看</h2>\n</div>\n<div class="c">\n<div class="tab-c" style="display: block;">\n<div name="m_pos" id="m_likeshow" modshow="1">\n<div class="yk-row yk-row-sm">\n<div class="modPSlide mod_pslide " id="mdlikeshow">\n<div class="mbtn prev" style="display: none;">\n<a href="#" class="iconfont" title="上一组"></a>\n</div>\n<div class="mbtn next" style="display: block;">\n<a href="#" class="iconfont" title="下一组"></a>\n</div>\n<ul class="panel" style="width: 2413px; left: 0px;">\n<% data.forEach(function(t, i){ %> \n<li class="yk-col4 mr1">\n<div class="yk-pack pack-film">\n<div class="p-thumb">\n<a href="<%=t.videoUrl%>" target="_blank" title="<%=t.title%>" _ck="<%=t.clickLogUrl%>" _reck="<%=t.recClickLogUrl%>" ></a>\n<i class="bg"></i>\n<%if(i< 6){%>\n<img src="<%=t.picUrl.replace(/^http:\\/\\//,\'//\')%>">\n<%}else{%>\n<img class="lazyLoad" alt="<%=t.picUrl%>" src="//static.youku.com/v1.0.1098/index/img/sprite.gif">\n<%}%>\n<!-- 精选角标 -->\n<%if (t.mm == 1){%>\n<div class="p-thumb-taglt">\n<i class="ico-ischoice"></i>\n</div>\n<%}%>\n<!-- 会员用券 -->\n<%if (t.pay_state == "1" || t.pay_state == "2") {%>\n<%var rttext = t.pay_state == "1" ? "会员免费" : "会员用券";%>\n<div class="p-thumb-tagrt">\n<span class="vip-free"><%=rttext%></span>\n</div>\n<%}%>\n</div>\n<!-- 标题 -->\n<ul class="info-list">\n<li class="title short-title">\n<a href="<%=t.videoUrl%>" target="_blank" _ck="<%=t.clickLogUrl%>" _reck="<%=t.recClickLogUrl%>"><%=t.title%></a>\n</li>\n<% if (t.subTitle){ %>                \n<li class="subtitle">\n<span><%=t.subTitle%></span>\n</li>\n<% }  %>\n</ul>\n</div>\n</li>\n<%})%>  \n</ul>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>';
				var o = t.compile(r)({
					data: e.data,
					searchDomain: n.searchDomain,
					youku_homeurl: PageConfig.youku_homeurl,
					encodeUid: i.encodeUid,
					encodeURI: encodeURI,
					numberFormat: i.numberFormat
				});
				if (o) {
					a.html(o);
					n.clickLogSender("#module_basic_relationleft", 0);
					c(a)
				}
				setTimeout(function() {
					n.adStat(e.req_id)
				}, 1e4)
			},
			likeShowBind: function() {
				if (null != document.getElementById("module_basic_relationleft"));
				jQuery(".p").hover(function() {
					jQuery(this).addClass("p-hover")
				}, function() {
					jQuery(this).removeClass("p-hover")
				});
				jQuery(".ico_download").click(function() {
					var e = jQuery(this).attr("data-id");
					var t = {
						from: "video",
						action: "show",
						secne: "ywebposter",
						sid: e
					};
					s.ikuExecuteFrompc(t)
				})
			},
			createStarShowData: function(e) {
				var t = this;
				var i = e.data;
				if (i) for (var n = 0, a = i.length; n < a; n++) {
					var r = "";
					var o = "";
					var s = "";
					var l = "";
					var d = "";
					var c = "";
					var u = "";
					if ("undefined" == typeof i[n].playLink) {
						if (1 == i[n].type) r = PageConfig.homeHost + "v_show/id_" + i[n].codeId + ".html";
						else if (2 == i[n].type) r = PageConfig.youku_homeurl + "show_page/id_" + i[n].codeId + ".html"
					} else r = i[n].playLink;
					if (197141899 == i[n].id) r = "//yikan.youku.com/u/home?from=y1.2.0.1";
					if ("undefined" != typeof i[n].mm && 1 == i[n].mm && "undefined" != typeof i[n].clickLogUrl) {
						var f = "undefined" != typeof i[n].clickRecordType && 2 == i[n].clickRecordType ? 0 : 1;
						var p = i[n].clickLogUrl.replace("//r.l.youku.com/rec_at_click?", "");
						o = "at" + f + "-" + p
					}
					s = i[n].title;
					if (9 == i[n].type) {
						if (s.length > 15) s = s.substring(0, 15) + "..."
					} else if (s.length > 7) s = s.substring(0, 7) + "...";
					var l = t.charset(e, n, 1);
					var d = i[n].mm || 0;
					var c = t.datafrom(e, n, d);
					if ("undefined" == typeof i[n].vPicUrl) u = i[n].picUrl;
					else u = i[n].vPicUrl;
					i[n].videoUrl = r;
					i[n].mmClickCharset = o;
					i[n].title = s;
					i[n].charset = l;
					i[n].mm = d;
					i[n].datafrom = c;
					i[n].picUrl = u
				}
			},
			createLikeShowData: function(e) {
				var t = this;
				var i = e.data;
				if (i) for (var n = 0, a = i.length; n < a; n++) {
					var r = "";
					var o = "";
					var s = "";
					var l = "";
					if ("undefined" == typeof i[n].playLink) {
						if (1 == i[n].type) r = PageConfig.homeHost + "v_show/id_" + i[n].codeId + ".html";
						else if (2 == i[n].type) r = PageConfig.youku_homeurl + "show_page/id_" + i[n].codeId + ".html"
					} else r = i[n].playLink;
					if (197141899 == i[n].id) r = "//yikan.youku.com/u/home?from=y1.2.0.1";
					o = i[n].title;
					if (9 == i[n].type) {
						if (o.length > 19) o = o.substring(0, 19) + "..."
					} else if (o.length > 19) o = o.substring(0, 19) + "...";
					var s = i[n].mm || 0;
					if ("undefined" == typeof i[n].vPicUrl) l = i[n].picUrl;
					else l = i[n].vPicUrl;
					i[n].videoUrl = r;
					i[n].title = o;
					i[n].mm = s;
					i[n].picUrl = l
				}
			},
			isCheckingCanceled: false,
			ikuCheckingCallback: function(e) {
				var t = $("iku-qwindow");
				var i = "";
				if (!Boolean(t) || RelationAsync.isCheckingCanceled) return;
				if (e >= 0) i = '<div class="iku-qwindow" id="iku-qwindow"><div class="iku-tip-content"><i class="ico-iku-success"></i><p>已为您开启客户端</p></div><h3>您已安装最新无广告版优酷客户端</h3><p class="iku-bottom-text">启动优酷客户端后，点击该视频使用客户端观看</p></div>';
				else i = '<div class="iku-qwindow" id="iku-qwindow"><div class="iku-tip-content"><i class="ico-loading-64"></i><p>正在为您下载...</p></div><h3>新版优酷客户端，免费去广告</h3><p class="iku-bottom-text">启动优酷客户端后，点击该视频使用客户端观看</p></div>';
				window.popwin.setContent("html", i);
				setTimeout(function() {
					window.popwin.config.onhide = function() {
						if (_player()) {
							_player().style.height = "100%";
							_player().style.width = "100%"
						}
					};
					window.popwin.hide();
					RelationAsync.isCheckingCanceled = false
				}, 3e3)
			},
			commendVideo: function() {
				if ($("commendvideos_async")) {
					var e = "/v_vpcommendvideosv5/cid_" + catId + "_rid_" + Math.floor(1e3 * Math.random() % 30);
					nova_update("commendvideos_async", e)
				}
			}
		});
		return h
	});
	define("page/find/play/advertisement", ["tui/view", "module/stat/common", "module/ad/util"], function(e, t, i) {
		return e.extend({
			list: [{
				id: "module_ad_320",
				number: "320",
				time: 1e3 * 9 * 60
			}, {
				id: "module_ad_321",
				number: "321",
				time: 1e3 * 5 * 60
			}, {
				id: "module_ad_322",
				number: "322",
				time: 1e3 * 25 * 60
			}, {
				id: "module_ad_323",
				number: "323",
				time: 1e3 * 15 * 60
			}, {
				id: "ab_v_324",
				number: "324",
				videoSeconds: true
			}, {
				id: "module_ad_325",
				number: "325",
				time: 1e3 * 9 * 60
			}, {
				id: "module_ad_327",
				number: "327"
			}, {
				id: "module_ad_1436945825",
				number: "1436945825"
			}, {
				id: "module_ad_1435125689",
				number: "1435125689"
			}, {
				id: "module_ad_000000",
				number: "000000",
				videoSeconds: true
			}],
			relationList: [{
				id: "ab_v_1430192600",
				number: "1430192600"
			}, {
				id: "ab_v_1430192617",
				number: "1430192617"
			}, {
				id: "ab_v_1464781393",
				number: "1464781393"
			}, {
				id: "ab_v_1464781428",
				number: "1464781428"
			}, {
				id: "ab_v_1464781466",
				number: "1464781466"
			}],
			url: "//v2html.atm.youku.com/vhtml?t=" + (new Date).getTime() + "&rst=" + i.getAdRst() + PageConfig.adsParams + "&pu=" + encodeURIComponent(window.location.href) + "&ref=" + encodeURIComponent(document.referrer) + "&sid=" + t.pvid() + "&p=",
			initialize: function() {
				for (var e in this.list) this.addAD(this.list[e])
			},
			addrelationListAd: function() {
				for (var e in this.relationList) this.addAD(this.relationList[e])
			},
			addAD: function(e) {
				if ($("#" + e.id).length > 0) {
					var t = this.url + e.number;
					if (e.videoSeconds) t += "&vl=" + PageConfig.seconds;
					if (e.time) {
						$.getScript(t);
						setInterval(function() {
							$.getScript(t)
						}, e.time)
					} else $.getScript(t)
				}
			}
		})
	});
	define("module/stat/jserror", ["tui/net", "module/global"], function(e, t, i, n) {
		var a = encodeURIComponent;
		var r = a(location.href);
		var o = a(navigator.userAgent);
		var s = window.ERROR_RAND || .01;
		var l = {};
		var d = function(i, n, d) {
				if (!d) i = "custom: " + i;
				n = n || s;
				if (Math.random() < n) {
					if (l[i]) return;
					e.getRequest("//stats.tudou.com/e/page/js/fail/?v=1&s=" + [a(i), r, t.juid + "_" + t.uid, o].join("|"));
					l[i] = true
				}
			};
		d.addVersion = function(e) {
			r = a(e + ":" + location.href)
		};
		if (Math.random() < s) window.onerror = function(e) {
			setTimeout(function() {
				d(e, 1, true)
			}, 0)
		};
		return d
	});
	define("tui/model", ["tui/event"], function(e) {
		function t(e) {
			if (Array.isArray(e)) return $.extend(true, {}, {
				list: e
			}).list;
			return $.extend(true, {}, e)
		}
		function i(e) {
			var t = e instanceof r ? [] : {};
			e.each(function(e, n) {
				if (n instanceof r || n instanceof a) t[e] = i(n);
				else t[e] = n
			});
			return t
		}
		function n(e, t, i) {
			var a = Array.isArray(e) ? new i(e) : new t(e);
			a.each(function(e, r) {
				if (Array.isArray(r) || $.isPlainObject(r)) {
					r = n(r, t, i);
					a._data[e] = r;
					if (r instanceof i || r instanceof t) r._parent = a
				}
			});
			return a
		}
		var a = e.extend({
			model: null,
			list: null,
			initialize: function(e) {
				var i = this;
				a.superClass.initialize.call(i);
				i._parent = null;
				e = e ? t(e) : {};
				i._data = i.defaults ? $.extend({}, i.defaults, e) : e;
				null == i.model && (i.model = a);
				null == i.list && (i.list = r)
			},
			each: function(e) {
				var t = this;
				$.each(t._data, e);
				return t
			},
			key: function(e) {
				var t;
				this.each(function(i, n) {
					if (n === e) {
						t = i;
						return false
					}
				});
				return t
			},
			get: function(e) {
				if (void 0 === e) return this._data;
				return this._data[e]
			},
			toJSON: function() {
				return i(this)
			},
			set: function(e, t) {
				var i = this;
				if ("object" == typeof e) $.each(e, function(e, t) {
					i._set(e, t)
				});
				else i._set(e, t);
				return i._bindChangeEvent()
			},
			replace: function(e) {
				return this._replace(e)
			},
			remove: function(e) {
				var t = this;
				if (void 0 === e) {
					if (t._parent) t._parent.remove(t._parent.key(t));
					t._data = Array.isArray(t._data) ? [] : {};
					if (t._parent) t.trigger("change", []);
					else t._bindChangeEvent();
					return t
				}
				var i = t.get(e);
				if (Array.isArray(t._data)) t._data.splice(e, 1);
				else delete t._data[e];
				t._bindEvent("remove", e, i);
				return t._bindChangeEvent()
			},
			toModel: function(e) {
				return this._toModel(e)
			},
			_set: function(e, t) {
				var i = this;
				var n = void 0 === i.get(e) ? "add" : "update";
				var a = i.get(e);
				var t = i._toModel(t);
				if (t === a) return;
				i._data[e] = t;
				return i._bindEvent(n, e, t, a)
			},
			_replace: function(e, t) {
				var i = this;
				var n, a;
				var r = [];
				if (t) {
					n = i.size();
					a = "concat"
				} else {
					n = 0;
					a = "replace";
					i._data = Array.isArray(i._data) ? [] : {}
				}
				$.each(e, function(e, t) {
					r.push(i._data[n + e] = i._toModel(t))
				});
				setTimeout(function() {
					i.trigger(a, [e, r])
				}, 0);
				return i._bindChangeEvent()
			},
			_toModel: function(e) {
				var t = this;
				if (Array.isArray(e) || $.isPlainObject(e)) e = n(e, t.model, t.list);
				if (e instanceof r || e instanceof a) e._parent = t;
				return e
			},
			_bindChangeEvent: function() {
				var e = this;
				e.trigger("change", []);
				if (e._parent) e._parent._bindChangeEvent();
				return e
			},
			_bindUpdateEvent: function(e) {
				var t = this;
				t.trigger("update", [t.key(e), e]);
				if (t._parent) t._parent._bindUpdateEvent(t);
				return t
			},
			_bindEvent: function(e, t) {
				var i = this;
				var n = $.makeArray(arguments).slice(2);
				i.trigger(e + ":" + t, n);
				i.trigger("change:" + t, n);
				i.trigger(e, [t].concat(n));
				if (i._parent) i._parent._bindUpdateEvent(i);
				return i
			}
		});
		var r = a.extend({
			initialize: function(e) {
				var i = this;
				r.superClass.initialize.call(i);
				i._data = e ? t(e) : []
			},
			size: function() {
				return this._data.length
			},
			first: function() {
				return this._data[0]
			},
			last: function() {
				return this._data[this.size() - 1]
			},
			where: function(e, t) {
				var i = this;
				var n = [];
				i.each(function(i, a) {
					var r = 0;
					var o = 0;
					$.each(e, function(e, i) {
						if (t && a.get(e) === i || !t && a.get(e) == i) r++;
						o++
					});
					if (r === o) n.push(a)
				});
				return n
			},
			push: function(e) {
				return this._insert(this.size(), e, "push")
			},
			unshift: function(e) {
				return this._insert(0, e, "unshift")
			},
			insert: function(e, t) {
				return this._insert(e, t, "insert")
			},
			concat: function(e) {
				return this._replace(e, true)
			},
			pop: function() {
				return this.remove(this.size() - 1)
			},
			shift: function() {
				return this.remove(0)
			},
			sort: function(e) {
				this._data.sort(e);
				return this._bindChangeEvent()
			},
			_insert: function(e, t, i) {
				var n = this;
				n._data.splice(e, 0, void 0);
				n._set(e, t);
				n.trigger(i, [e, t]);
				return n._bindChangeEvent()
			}
		});
		a.List = r;
		return a
	});
	define("tui/ajaxModel", ["tui/model", "module/stat/jserror"], function(e, t) {
		var i = {};

		function n(e) {
			var t = {
				type: "get",
				url: "",
				cache: true,
				scriptCharset: "utf-8",
				dataType: "json",
				data: {},
				timeout: 1e4
			};
			if (!("post" == e.type) && (!e.dataType || "jsonp" == e.dataType)) $.extend(e, {
				dataType: "jsonp",
				jsonp: e.jsonp || "jsoncallback"
			});
			e = $.extend(t, e || {});
			return $.ajax(e)
		}
		function a(e) {
			$.each(e, function(t, n) {
				var a = n;
				if ("object" != $.type(n) || !n.url) return;
				e[t] = function() {
					var e = this;
					var n = arguments;
					var o = $.extend(true, {}, a || {}, {
						data: n[0] || {}
					});
					var s = Array.isArray(e._data);
					var l;
					var d = (new Date).getTime();
					var c;
					var u = true;
					if (!o.jsonpCallback) o.jsonpCallback = (s ? e.model.__mid + "List" : e.constructor.__mid).replace(/[^\w]+/g, "_") + "__" + t;
					l = o.jsonpCallback;
					c = i[l];
					if (c && d - c < 1e3) u = false;
					if (false === o.requestGap) u = true;
					i[l] = d;
					if (u || "retry" == n[n.length - 1]) r.call(this, o, t, n)
				}
			})
		}
		function r(e, i, a) {
			var r = this;
			var o = e.url;
			if ("object" !== $.type(e.data)) return;
			var s = $.param(e.data);
			var l;
			var d = e.jsonpCallback;
			var c = function(e) {
					return [true, e]
				};
			a = $.makeArray(a);
			n(e).done(function(n) {
				n = e.convert ? e.convert.call(r, n, a[0]) : c(n);
				if (true === n[0]) {
					n[1] = n[1] || {};
					l = r._toModel(n[1]);
					if (e.toModel) r._data = l._data;
					r.fire(i + ":success", [n[1]].concat(a))
				} else {
					r.fire(i + ":error", [n[1]].concat(a));
					t("ConditionException::" + d + "::" + n)
				}
			}).fail(function(e, n, o) {
				var l = n || o;
				var c = "retry" != a[a.length - 1];
				if (c) {
					t("FirstAutoRetry::" + d + "::" + l + "::" + s);
					r[i].apply(r, a.concat(["retry"]))
				} else t("retryError::" + d + "::" + l + "::" + s);
				r.fire(i + ":error", [{
					status: l,
					msg: l
				},
				s])
			})
		}
		var o = e.extend({});
		o.List = e.List.extend({
			getIndex: function(e) {
				var t = this;
				var i;
				t.each(function(t, n) {
					$.each(e, function(e, a) {
						if (n.get(e) === a) i = t
					})
				});
				return i
			}
		});
		var s = function(t, i) {
				a(t);
				var n = e.extend.call(this, t, i);
				return n
			};
		o.extend = s;
		o.List.extend = s;
		return o
	});
	define("page/find/play/model/interaction/feePaymentPro", ["tui/ajaxModel"], function(e) {
		var t = PageConfig.homeHost;
		var i = "//nc.youku.com/";
		var n = "https://account.youku.com/";
		var a = e.extend({
			initialize: function(e) {
				var t = this;
				a.superClass.initialize.call(t)
			},
			getFeeInfo: {
				url: t + "fee/feeinfo" + "?beta" + "&timestamp=" + (new Date).getTime(),
				jsonp: "callback",
				convert: r
			},
			getFeeVip: {
				url: t + "fee/feevip" + "?beta" + "&timestamp=" + (new Date).getTime(),
				jsonp: "callback",
				convert: r
			},
			getFeeQrcode: {
				url: t + "fee/payqrcode" + "?beta" + "&timestamp=" + (new Date).getTime(),
				jsonp: "callback",
				convert: r
			},
			getFeeShow: {
				url: t + "fee/feeshow" + "?beta" + "&timestamp=" + (new Date).getTime(),
				jsonp: "callback",
				convert: r
			},
			getConsumeTicket: {
				url: t + "fee/consumeticket" + "?beta" + "&timestamp=" + (new Date).getTime(),
				jsonp: "callback",
				convert: r
			},
			getStatusLogin: {
				url: n + "qrcode/loginByCode.json?buid=youku" + "&template=&pid=" + PageConfig.pid + "&timestamp=" + (new Date).getTime(),
				jsonp: "jsonpCallback",
				convert: o
			}
		});

		function r(e) {
			var t = e && 1 == e.error ? true : e.error;
			return [t, e]
		}
		function o(e) {
			return [true, e]
		}
		return a
	});
	define("page/find/play/interaction/sideControl", ["tui/view", "tui/cookie", "page/find/play/interaction/iku", "tui/common"], function(e, t, i, n) {
		var a = e.extend({
			el: $("#player_sidebar"),
			barCookie: "__list__",
			needCookie: true,
			status: 0,
			changing: false,
			playmodekey: "P_L_M",
			initialize: function(e) {
				a.superClass.initialize.call(this);
				var t = this;
				this.playBox = $("#playerBox");
				this.listArea = $(".listArea", this.el);
				this.listCtrl = $(".listcontrol", this.el);
				this.expandCont = $(".expandCont", this.el);
				this.expandLink = $(".expandCont .expandlink", this.el);
				if (!this.el) return false;
				if (4 == PageConfig.playmode) this.playmodekey = "W_P_L_M";
				this._sideShowControl()
			},
			events: {
				"click .expandCont,.listcontrol_side, .btn__showlist": "expandSideList",
				"click #playlistIkuAD": "playlistClickAD"
			},
			turn: function() {
				if (true == this.changing) return false;
				var e = $(".list_tips", this.el);
				e.hide();
				this.changing = true;
				if (1 == this.status) this._fadeRight();
				else this._fadeLeft()
			},
			open: function() {
				if (0 == this.status) this.turn()
			},
			close: function() {
				if (1 == this.status) this.turn()
			},
			_sideShowControl: function() {
				var e = t(this.barCookie);
				var i = this.$el;
				var n = this.listArea;
				var a = this.expandCont;
				var r = this.expandLink;
				var o = this.playBox;
				if (!n.length || !a.length) return false;
				if (1 == e || !e) {
					this.status = 1;
					n.show();
					a.hide();
					o.removeClass("playBox_thx");
					i[0].style.width = "";
					i.removeClass("expandBox");
					this.$el.addClass("slider-open")
				} else {
					this.status = 0;
					o.addClass("playBox_thx");
					i.addClass("expandBox");
					n.hide();
					a.show();
					r.addClass("hover");
					var s = t(this.playmodekey);
					var l = t("P_F");
					this.$el.addClass("slider-close")
				}
			},
			_fadeLeft: function() {
				var e = this,
					i;
				e.status = 1;
				if (this.needCookie) t(this.barCookie, 1, 360);
				var a = this.$el;
				var r = this.playBox;
				var o = this.listArea;
				var s = this.expandCont;
				var l = $(".listmask", a);
				l[0].style.display = "block";
				a[0].style.overflow = "hidden";
				this.$el.removeClass("slider-close").addClass("slider-open");

				function d() {
					a.removeClass("expandBox");
					a[0].style.overflow = "";
					l[0].style.display = "none";
					r.removeClass("playBox_thx");
					e.changing = false;
					e.trigger("SideControl:open", [])
				}
				if (n.supportStyle("animation")) {
					a.addClass("moveleft");
					setTimeout(function() {
						o.show();
						s.hide()
					}, 100);
					setTimeout(function() {
						d();
						a.removeClass("moveleft")
					}, 500);
					return false
				}
				o.show();
				s.hide();
				a.animate({
					width: "380px"
				}, "100", "linear", function() {
					d()
				})
			},
			_fadeRight: function() {
				var e = this,
					i;
				var a = this.$el;
				var r = this.listArea;
				var o = this.expandCont;
				var s = this.expandLink;
				var l = this.playBox;
				var d = $(".listmask", a);
				e.status = 0;
				if (this.needCookie) t(this.barCookie, 0, 360);
				d.show();
				a.css("overflow", "hidden");
				l.addClass("playBox_thx");
				e.$el.removeClass("slider-open").addClass("slider-close");
				e.listCtrl.hide();

				function c() {
					a.addClass("expandBox");
					e.listCtrl.show();
					r.hide();
					o.show();
					s.addClass("hover");
					a[0].style.overflow = "";
					d[0].style.display = "none";
					e.changing = false
				}
				if (n.supportStyle("animation")) {
					a.addClass("moveright");
					setTimeout(function() {
						a.removeClass("moveright");
						c()
					}, 500);
					return false
				}
				a.animate({
					width: "30px"
				}, "100", "linear", function() {
					c()
				})
			},
			playlistClickAD: function(e) {
				var t = $(e.currentTarget).attr("vid");
				if (!t) t = PageConfig.videoId2;
				var n = {
					from: "video",
					sid: t,
					action: "play",
					secne: "ywebrecommend",
					callback: function() {}
				};
				i.ikuExecuteFrompc(n)
			},
			expandSideList: function() {
				this.turn()
			}
		});
		return new a
	});
	define("page/find/play/interaction/feePaymentPro", ["tui/net", "tui/view", "tui/art", "module/login/login", "page/find/play/interaction/sideControl", "page/find/play/interaction/dramaTab", "page/find/play/model/interaction/feePaymentPro"], function(e, t, i, n, a, r, o) {
		var s = t.extend({
			el: $("#feeInfo"),
			qPayRoundTime: 1e4,
			buymovieiId: "",
			buymovloginiId: "",
			buymemiId: "",
			buymemloginiId: "",
			freshTime: 18e4,
			initialize: function() {
				var e = this;
				s.superClass.initialize.call(this);
				this.mod = new o;
				this.modelEvents(this.mod);
				this.feeInfo();
				$(document).bind("login", function() {
					e.feeInfo()
				})
			},
			feeInfo: function() {
				if ($("#feeInfo").length || $("#welfareInfo").length) this.mod.getFeeInfo({
					vid: PageConfig.videoId,
					showid: PageConfig.showid,
					t: Math.random()
				})
			},
			events: {
				"click #ticketPay": "ticketPay",
				"click #gobacktopay": "gobacktopay",
				"click #buymemqrcoderefresh": "rcoderefresh"
			},
			"{mod} getFeeInfo:success": function(t) {
				var i = this;
				var n = t.data;
				var o = "//gm.mmstat.com/yt/show.index.module";
				var s = "//gm.mmstat.com/yt/click.index.module";
				if ("" !== n) {
					a.open();
					if (n["feeData"]) {
						r.addTab("feeInfo", "付费信息", true);
						$("#feeInfo").html(t["html"]);
						$("#feeInfo").show();
						if ($("#feeInfo").is(":visible")) {
							o += "?mid=buytab1&mname=付费&spm=a2h0j.8191423&etime=" + (new Date).getTime();
							e.getRequest(o);
							$("#feepayinfo .form_btn_big a.form_btn_btext").click(function() {
								s += "?mid=buytab1&mname=付费&spm=a2h0j.8191423&etime=" + (new Date).getTime();
								e.getRequest(s)
							})
						}
						setTimeout(function() {
							i.addInterval("all")
						}, 400)
					}
					if (n["welfareData"]) {
						r.addTab("welfareInfo", "会员福利", true);
						$("#welfareInfo").show();
						var l = '<div id="welfaressinfo">\n<div class="pmovie-closei" id="nonmempayclose">\n<a><i></i></a>\n</div>\n<div class="clear"></div>\n<div class="pmovie-content">\n<iframe frameborder=0 scrolling="no" src="//svip.youku.com/viptab/index" style="width:100%;height:443px;border:0;"></iframe>\n</div>\n</div> ';
						$("#welfareInfo").html(l)
					}
				}
			},
			"{mod} getConsumeTicket:success": function(e) {
				if (true == e.data) $("#feepayinfo").html('<div class="pmovie-content"><div class="success-icon"><i></i></div><div class="success-tips">' + '支付成功！刷新页面<br>即可观看</div><div class="clear"></div></div>');
				else {
					if ($("#payinfo").length) $("#payinfo").hide();
					var t = '<div class="pmovie-content"><div class="failed-icon"><i></i></div><div class="failed-tips">支付失败！' + '</div><div class="clear"></div><div class="back-pay">请 <a id="gobacktopay">返回重新支付</a> 或 ';
					var i = "//cps.youku.com/redirect.html?id=0000a247&url=" + encodeURIComponent("//pay.youku.com/buy/redirect.html?pstype=1&psid=" + PageConfig.showid);
					t += '<a href="' + i + '">去收银台支付</a></div></div>';
					$("#feepayinfo").html($("#feepayinfo").html() + t)
				}
			},
			"{mod} getFeeShow:success": function(e) {
				if (true == e.data) {
					this.delInterval("all");
					window.location.reload(true)
				}
			},
			"{mod} getFeeVip:success": function(e) {
				if (true == e.data) {
					this.delInterval("all");
					window.location.reload(true)
				}
			},
			"{mod} getStatusLogin:success": function(e) {
				var t = this;
				if ("success" == e.result) {
					if ($("#qrcodetobuymov").length) t.addInterval("mov");
					if ($("#qrcodetobuymem").length) t.addInterval("mem");
					clearTimeout(t.timeout);
					window.location.reload(true)
				} else if ("QR_CODE_NOT_EXIST" == e.errorCode) this.delInterval("login")
			},
			"{mod} getFeeQrcode:success": function(e) {
				var t = this;
				if ($("#qrcodetobuymov").length) var i = $("#qrcodetobuymov");
				if ($("#qrcodetobuymem").length) var i = $("#qrcodetobuymem");
				if (e && e.data.shorturl && e.data.qrcode && i.length) {
					i.attr("lcode", e.data.qrcode);
					i.html('<img style="border: 2px solid #fff;" src="//qr.youku.com/qr?tiny=' + e.data.shorturl + '&logosize=0">' + '<div class="two-dimension-mask-hide" id="buymemqrcodetimeout"><div class="two-dimension-mask"></div>' + '<div class="two-dimension-refresh" id="buymemqrcoderefresh"><a><i></i></a></div></div>');
					setTimeout(function() {
						t.addInterval("login")
					}, 50)
				}
			},
			ticketPay: function() {
				this.mod.getConsumeTicket({
					showid: PageConfig.showid,
					t: Math.random()
				})
			},
			gobacktopay: function() {
				$("#feepayinfo>.pmovie-content", this.el).remove();
				$("#payinfo").show()
			},
			rcoderefresh: function() {
				this.mod.getFeeQrcode({
					vid: PageConfig.videoId
				})
			},
			_setInterval: function(e, t) {
				$.isFunction(e) && e();
				return setInterval(e, t)
			},
			addInterval: function(e) {
				var t = this;
				t.delInterval("all");
				if ("all" == e) {
					if ($("#qrcodetobuymov").length) t.buymovieiId = this._setInterval(function() {
						t.getStatusBuyMov()
					}, t.qPayRoundTime);
					if ($("#qrcodetobuymem").length) t.buymemiId = this._setInterval(function() {
						t.getStatusBuyMem()
					}, t.qPayRoundTime)
				} else if ("mov" == e) {
					if ($("#qrcodetobuymov").length) t.buymovieiId = this._setInterval(function() {
						t.getStatusBuyMov()
					}, t.qPayRoundTime)
				} else if ("mem" == e) {
					if ($("#qrcodetobuymem").length) t.buymemiId = this._setInterval(function() {
						t.getStatusBuyMem()
					}, t.qPayRoundTime)
				} else if ("login" == e) if ($("#qrcodetobuymem").length) {
					t.buymemloginiId = this._setInterval(function() {
						t.getStatusLogin("#qrcodetobuymem")
					}, t.qPayRoundTime);
					t.timeout = setTimeout(function() {
						t.delInterval("all");
						t.showRefresh()
					}, t.freshTime)
				} else if ($("#qrcodetobuymov").length) {
					t.buymovloginiId = this._setInterval(function() {
						t.getStatusLogin("#qrcodetobuymov")
					}, t.qPayRoundTime);
					t.timeout = setTimeout(function() {
						t.delInterval("all");
						t.showRefresh()
					}, t.freshTime)
				}
			},
			showRefresh: function() {
				if ($("#buymemqrcodetimeout").length && $("#buymemqrcoderefresh").length) $("#buymemqrcodetimeout").removeClass("two-dimension-mask-hide")
			},
			delInterval: function(e) {
				if ("all" == e) {
					if (this.buymovieiId) clearInterval(this.buymovieiId);
					if (this.buymemiId) clearInterval(this.buymemiId);
					if (this.buymemloginiId) clearInterval(this.buymemloginiId)
				} else if ("mov" == e) {
					if (this.buymovieiId) clearInterval(this.buymovieiId)
				} else if ("mem" == e) {
					if (this.buymemiId) clearInterval(this.buymemiId)
				} else if ("login" == e) if (this.buymemloginiId) clearInterval(this.buymemloginiId);
				else if (this.buymovloginiId) clearInterval(this.buymovloginiId)
			},
			getStatusBuyMov: function() {
				if (!n.isLogin()) this.addInterval("login");
				else this.mod.getFeeShow({
					vid: PageConfig.videoId2,
					showid: PageConfig.showid,
					t: Math.random()
				})
			},
			getStatusBuyMem: function() {
				if (!n.isLogin()) this.addInterval("login");
				else this.mod.getFeeVip({
					vid: PageConfig.videoId,
					showid: PageConfig.showid,
					t: Math.random()
				})
			},
			getStatusLogin: function(e) {
				var t = $(e).attr("lcode");
				if (!n.isLogin() && $(e).length && t) this.mod.getStatusLogin({
					code: t,
					t: Math.random()
				})
			}
		});
		return s
	});
	define("page/find/play/interaction/pagesScroll", ["tui/event", "tui/cookie", "page/find/play/model/interaction/dramaModel"], function(e, t, i) {
		var n = e.extend({
			listContentId: "#playlist_content",
			playmodekey: "P_L_M",
			playlistMode: "#playlist_mode",
			initialize: function(e) {
				n.superClass.initialize.call(this);
				var t = this;
				this.listContent = $(this.listContentId);
				if (e.scroll) this.scroll = e.scroll;
				this.pageNum = PageConfig.page.numTypePageNum || 1;
				this.pageRange = [this.pageNum, this.pageNum];
				this._initScroll();
				this.$load = $('<div class="loading_item" ><img src="//static.youku.com/v/img/loading_32.gif"><span class="info">正在加载，请稍候...</span></div>');
				this.bindEvent();
				this.mod = new i;
				this.mod.bind("getPageData:success", this.rendPageDate.bind(this));
				"next" == this.pageFlag;
				t.genListContent(this.pageNum)
			},
			genListContent: function(e) {
				if (true == this.loading) return false;
				this.loading = true;
				var t = this.listContent;
				this.pageNum = e || 1;
				var i = [];
				i.push("pm_" + PageConfig.playmode);
				i.push("_vid_" + PageConfig.videoId);
				i.push("_page_" + this.pageNum);
				if (2 == PageConfig.playmode) {
					i.push("_fid_" + PageConfig.folderId);
					i.push("_o_" + PageConfig.forder)
				}
				if (5 == PageConfig.playmode) i.push("_sid_" + PageConfig.singerId);
				if ("pre" == this.pageFlag) t.prepend(this.$load);
				else t.append(this.$load);
				var n = "page/playlist/" + i.join("");
				this.mod.getPageData(n, {})
			},
			rendPageDate: function(e) {
				var t = $(e.html);
				var i = t.find(".current");
				var n = this;
				if ("" == e.html) {
					this.backStop = true;
					n.scrolling = false;
					n.loading = false;
					this.$load.remove();
					return
				}
				if ("pre" == this.pageFlag) n.$load.after(t);
				else {
					i = i.length ? i : this.listContent.find(".m_component").last();
					this.listContent.append(t)
				}
				this.$load.remove();
				setTimeout(function() {
					n.trigger("pages:show");
					if ("pre" == n.pageFlag) n.scroll.scrollTo(10, false);
					else n.scroll.scrollToElement(i);
					n.scrolling = false;
					n.loading = false
				}, 1e3);
				this._initPlaylistMode()
			},
			_initScroll: function() {
				var e = this;
				this.backStop = false;
				this.scroll.bind("scroll:head", function(t) {
					if (1 == e.pageRange[0]) {
						e.scrolling = false;
						return
					}
					if (1 != e.pageRange[0] && !e.loading && !e.scrolling) {
						e.scrolling = true;
						e.pageFlag = "pre";
						e.pageRange[0]--;
						e.genListContent(e.pageRange[0])
					}
				});
				this.scroll.bind("scroll:end", function(t) {
					if (e.backStop) return;
					if (!e.loading && !e.scrolling) {
						e.scrolling = true;
						e.pageFlag = "next";
						e.pageRange[1]++;
						e.genListContent(e.pageRange[1])
					}
				})
			},
			_initPlaylistMode: function() {
				var e = $(this.playlistMode);
				var i = $(">li", e);
				if (!e.length) return false;
				e.show();
				var n = t(this.playmodekey);
				var a = t("P_F");
				if (!n && 1 == a) {
					n = 2;
					t(this.playmodekey, n, 30)
				}
				i.removeClass("current");
				if (n && 1 == a) i.eq(3 - n).addClass("current");
				var r = $(this.listContentId);
				var o = "";
				o = r.find(".program");
				var s = [];
				var l = null;
				var d = PageConfig.videoId2;
				var c = 0;
				var u = null;
				for (var f = 0; f < o.length; f++) {
					var p = o.eq(f);
					var m = "item_";
					var h = p.attr("item-id").replace(m, "");
					if (h == d) c = f;
					s.push(h)
				}
				if (1 == n) {
					l = d;
					u = true
				} else if (2 == n) {
					var v = c + 1;
					v = v >= s.length ? 0 : v;
					l = s[v];
					u = false
				} else if (3 == n) {
					var g = Math.floor(Math.random() * s.length);
					if (g == c) g = Math.floor(Math.random() * s.length);
					l = s[g];
					u = false
				}
				setTimeout(function() {
					ykPlyr.setPlayerLoop(u)
				}, 6e3);
				window["playlistVids"] = s;
				window["playerNextVid"] = l
			},
			bindEvent: function() {
				$("#playlist_mode>li").bind("click", this.setPlaylistMode.bind(this))
			},
			setPlaylistMode: function(e) {
				var i, n, a;
				var r = $(e.currentTarget);
				var o = 3 - 1 * r.index();
				if (r.hasClass("current")) return false;
				n = t(this.playmodekey);
				if (n == o) return false;
				t("P_F", 1, 30);
				ykPlyr.PlayerContinuous(1);
				i = $(this.playlistMode);
				i.find(".current").removeClass("current");
				r.addClass("current");
				t(this.playmodekey, o, 30);
				a = window["playlistVids"] || [];
				var s = 0;
				for (var l = 0; l < a.length; l++) if (a[l] == PageConfig.videoId2) {
					s = l;
					break
				}
				if (1 == o) playerNextVid = PageConfig.videoId2;
				else if (2 == o) {
					var d = s + 1;
					if (d == a.length) playerNextVid = a[0];
					else if (a[d]) playerNextVid = a[d]
				} else if (3 == o) {
					var c = Math.floor(Math.random() * a.length);
					if (c == s) c = Math.floor(Math.random() * a.length);
					playerNextVid = a[c]
				}
				window["playerNextVid"] = playerNextVid;
				if (1 == o) ykPlyr.setPlayerLoop(true);
				else ykPlyr.setPlayerLoop(false)
			}
		});
		return n
	});
	define("page/find/play/interaction/pageSelect", ["tui/view", "tui/art", "tui/util/num"], function(e, t, n) {
		var a = e.extend({
			el: $("#pageList"),
			initialize: function(e) {
				a.superClass.initialize.call(this);
				var t = this;
				this.render(e)
			},
			events: {
				"click .list-dropdown>a": "clickItem",
				mouseenter: "enter",
				mouseleave: "leave"
			},
			render: function(e) {
				var i, n, a;
				this.type = e.type;
				if ("Date" == e.type) {
					if (0 == e.lastMon - e.firstMon) return;
					i = this.getDateList(e);
					a = '<i class="dropdown-icon"></i>\n<a class="current" href="javascript:void(0);" from="<%=cur[0]%><%=cur[1]%>01" to="<%=cur[3]%>" count="<%=cur[1]%>" >\n<%=cur[0]%>年<%=cur[1]%>月\n</a>\n<div class="list-dropdown">\n<% list.forEach(function(t, i){ %>\n<a class="<%if(cur[1]==t[1]){%>active<%}%>" from="<%=t[0]%><%=t[1]%>01" href="javascript:void(0);"   to="<%=t[3]%>" count="<%=t[1]%>"><%=t[0]%>年<%=t[1]%>月</a>          \n<% }); %>  \n</div>'
				} else if ("Num" == e.type) {
					if (e.totalepisodes <= 100) return;
					i = this.getNumList(e);
					a = '<i class="dropdown-icon"></i>\n<a class="current" href="javascript:void(0);" page="<%=cur[2]%>">\n<%=cur[0]%>-<%=cur[1]%>\n</a>\n<div class="list-dropdown">\n<% list.forEach(function(t, i){ %>\n<a class="<%if(cur[1]==t[1]){%>active<%}%>" href="javascript:void(0);" page="<%=t[2]%>">\n<%=t[0]%>-<%=t[1]%>\n</a>        \n<% }); %>  \n</div>'
				} else return;
				var r = t.compile(a)(i);
				this.$el.html(r).show();
				this.$list = $(".list-dropdown", this.$el)
			},
			getDateList: function(e) {
				var t = [];
				var a = [];
				var r = null;
				for (i = 1 * e.firstMon; i <= 1 * e.lastMon; i++) {
					var o = [];
					o.push(e.year);
					o.push(n.format(i, "00"));
					o.push(n.format(this.dayNumOfMonth(e.year, i), "00"));
					o.push(o.join(""));
					t.push(o);
					if (i == 1 * e.currMon) a = o
				}
				return {
					list: t,
					cur: a
				}
			},
			getNumList: function(e) {
				var t = 100;
				var a = [];
				var r = [];
				var o = Math.ceil(e.totalepisodes / t);
				for (i = 1; i <= o; i++) {
					var s = [];
					s.push(n.format((i - 1) * t + 1, "000"));
					if (i == o) s.push(n.format(e.totalepisodes, "000"));
					else s.push(n.format(i * t, "000"));
					s.push(i);
					a.push(s);
					if (i == e.numTypePageNum) r = s
				}
				return {
					list: a,
					cur: r
				}
			},
			enter: function() {
				this.$list.show()
			},
			leave: function() {
				this.$list.hide()
			},
			dayNumOfMonth: function(e, t) {
				t--;
				var i = new Date(e, t, 1);
				i.setDate(i.getDate() + 32 - i.getDate());
				return 32 - i.getDate()
			},
			clickItem: function(e) {
				var t = $(".current", this.$el);
				var i = $(e.currentTarget);
				var n = i.clone().addClass("current");
				var a;
				this.$list.find(".active").removeClass("active");
				i.addClass("active");
				t.replaceWith(n);
				this.$list.hide();
				if ("Date" == this.type) a = {
					from: n.attr("from"),
					to: n.attr("to"),
					count: n.attr("count")
				};
				else if ("Num" == this.type) a = {
					page: n.attr("page")
				};
				this.trigger("PageSelect:change", [a])
			}
		});
		return a
	});
	define("page/find/play/interaction/pages", ["tui/event", "page/find/play/interaction/pageSelect", "page/find/play/model/interaction/dramaModel"], function(e, t, i) {
		var n = e.extend({
			initialize: function(e) {
				n.superClass.initialize.call(this);
				this.$listWrapDiv = $("#Dramalist_wrap");
				this.tabId = "Drama";
				this.clickStatStr = "tp=1&cp=4008024&cpp=1000705";
				this.loading = false;
				var a = this;
				var r = new t(e);
				r.bind("PageSelect:change", function(t) {
					if ("Num" == e.type) a.addListContents("page" + t.page);
					else if ("Date" == e.type) a.addListContents("from_" + t.from + "_to_" + t.to + "_count_" + t.count)
				});
				this.mod = new i;
				this.mod.bind("getPageData:success", this.rendPageDate.bind(this))
			},
			addListContents: function(e, t) {
				var i = "listitem_";
				if (this.loading) return;
				if (this.$listWrapDiv.length) {
					this.$listWrapDiv.hide();
					this.divId = i + e;
					var n = $("#" + this.divId);
					if (n.length) {
						this.$listWrapDiv.find(">div").hide();
						n.show();
						this.$listWrapDiv.show();
						this.trigger("pages:show", [])
					} else {
						var a = this;
						var r = "";
						if (0 == e.indexOf("page")) {
							this.page = e.replace("page", "");
							a.loading = true;
							r = "page/playlist/pm_" + PageConfig.playmode + "_vid_" + PageConfig.videoId + "_showid_" + PageConfig.showid + "_page_" + this.page;
							if (PageConfig.parentvideoid) r += "_v_" + PageConfig.parentvideoid;
							this.mod.getPageData(r, {})
						} else if (0 == e.indexOf("from")) {
							var o = e.split("_");
							if (6 == o.length) {
								var s = o[1];
								var l = o[3];
								this.page = o[5];
								a.loading = true;
								var r = "page/playlist/pm_" + PageConfig.playmode + "_vid_" + PageConfig.videoId + "_showid_" + PageConfig.showid + "_datefrom_" + s + "_dateto_" + l + "_lastmon_" + PageConfig.page.lastMon + "_page_" + this.page + "_pid_" + PageConfig.page.pid;
								if (PageConfig.parentvideoid) r += "_v_" + PageConfig.parentvideoid;
								this.mod.getPageData(r, {})
							}
						}
					}
				}
			},
			rendPageDate: function(e) {
				var t = $("<div>").attr("id", this.divId);
				$("#vpofficiallistv5_wrap").remove();
				t.html(e.html);
				this.$listWrapDiv.find(">div").hide();
				this.$listWrapDiv.append(t);
				t.show();
				this.$listWrapDiv.show();
				if (t.find("#show_vv_broadcast").length) $(document).trigger("show:broadcast");
				this.loading = false;
				this.trigger("pages:show", [this.page])
			}
		});
		return n
	});
	define("page/find/play/interaction/playlist", ["tui/view", "tui/cookie", "tui/scrollbar2", "tui/util/num", "page/find/play/interaction/pages", "page/find/play/interaction/pagesScroll", "page/find/play/model/interaction/dramaModel"], function(e, t, i, n, a, r, o) {
		var s = e.extend({
			initialize: function() {
				var e = this;
				this._initScroll();
				this._pageInit();
				this.mod = new o;
				ykPlyr.bind("player:onPlayerStart", this.initOnPlayerStart.bind(this));
				this.$el.bind("list:update", function() {
					e.scroll.update()
				})
			},
			events: {
				"click #score_db": "douban_grade",
				"click #db_close": "douban_grade_close",
				'mouseover .item[name="tvlist"] .sn': "tvPopEnter",
				'mouseleave .item[name="tvlist"] .sn': "tvPopOut"
			},
			initOnPlayerStart: function(e) {
				if (e.isFullScreen) {
					this.upTitle();
					try {
						if ("replaceState" in history) {
							var i = "/v_show/id_" + PageConfig.videoId2 + ".html";
							if (PageConfig.folderId) if (0 == PageConfig.folderId) i = i;
							else i += "?f=" + PageConfig.folderId;
							var n = {
								url: i
							};
							history.replaceState(n, "", i)
						}
					} catch (a) {}
				} else {
					var r = t("u");
					if ("__LOGOUT__" == r && (0 == PageConfig.DuboLoginLimitTime || !PageConfig.DuboLoginLimitTime) && (0 == PageConfig.SubscribeLoginLimitTime || !PageConfig.SubscribeLoginLimitTime)) {
						var o = 3;
						var s = t("view") || 0;
						if (s >= o || s < 0) {
							setTimeout(function() {
								try {
									ykPlyr.pauseVideo(true);
									ykPlyr.zoomOut()
								} catch (e) {}
							}, 2e3);
							t("view", 0, {
								expires: 1
							});
							PageConfig.login_player8 = true;
							$("#qheader_login").trigger("click")
						} else t("view", ++s, {
							expires: 1
						})
					}
				}
			},
			upTitle: function() {
				var e = PageConfig.videoId2;
				var t = "item_";
				var i = $('[item-id="' + t + e + '"]');
				var n = i.attr("title");
				var a = $("#subtitle");
				$(".lists .current", this.el).removeClass("current");
				i.addClass("current");
				if (a.length && "" != n && a.html() != n) {
					a.html(n);
					a.parent().attr("title", n);
					document.title = n
				}
			},
			douban_grade: function(e) {
				var t = $("#score_db_panel"),
					i = $("span", $(e.currentTarget));
				t.toggle();
				if (i.hasClass("db_expand")) i.removeClass("db_expand");
				else i.addClass("db_expand")
			},
			douban_grade_close: function(e) {
				$("#score_db_panel").hide();
				$("#score_db span").removeClass("db_expand")
			},
			tvPopEnter: function(e) {
				var t = $(e.currentTarget).parent();
				var i = t.attr("flag");
				var n = $("#vcard" + i);
				var a = this;
				t.addClass("iHover");
				a._toPopLayer(n, i)
			},
			tvPopOut: function(e) {
				$(e.currentTarget).parent().removeClass("iHover")
			},
			_toPopLayer: function(e, t) {
				var i = t % 5;
				var n = e.attr("vid");
				var a = this.$el.find("#mvPlayList");
				var r = a.height();
				var o = e.parent().position().top;
				var s = a.scrollTop();
				i = 0 == i ? 5 : i;
				var l = "vcard" + i + "n";
				e.removeClass("vcard3n").addClass("vcard").addClass(l).removeClass("vcard_top");
				if (o - s > r / 2) e.addClass("vcard_top")
			},
			_initScroll: function() {
				this.scroll = new i($(".scroller", this.el));
				var e = $(".lists .current", this.el);
				if (e.length) this.scroll.scrollToElement(e, {
					pos: 120
				});
				this.loadScrollImage()
			},
			loadScrollImage: function() {
				var e = this;
				var t = $(".scroller", this.el);
				var i = t.find("img[_src]");
				var n = [];
				var a = t.height();
				setTimeout(function() {
					r(0)
				}, 50);
				if (i.length) $.each(i, function(e, t) {
					n.push([$(t).closest("li.item").position().top, i.eq(e)])
				});
				this.scroll.bind("scroll", function(e) {
					setTimeout(function() {
						r(e)
					}, 100)
				});

				function r(e) {
					var t = 0;
					while (n.length) {
						if (n[0][0] < e + a) {
							var i = n[0][1];
							i.attr("src", i.attr("_src"));
							n.shift()
						} else break;
						t++
					}
				}
			},
			_pageInit: function() {
				var e = null;
				var t = this;
				if (PageConfig.page) {
					var i = PageConfig.page;
					i.scroll = t.scroll;
					if ("Date" == i.type) e = new a(i);
					else if ("Num" == i.type) e = new a(i);
					else if ("Scroll" == i.type) e = new r(i)
				}
				if (e) {
					this.pages = e;
					this.pages.bind("pages:clickTab", function() {
						t.scroll.update()
					});
					this.pages.bind("pages:show", function() {
						t.scroll.update();
						t.loadScrollImage()
					})
				}
			}
		});
		return s
	});
	define("page/find/play/interaction/main", ["tui/view", "tui/cookie", "tui/art", "module/responsive", "page/find/play/interaction/sideControl", "page/find/play/interaction/dramaTab", "page/find/play/interaction/playlist", "page/find/play/interaction/feePaymentPro"], function(e, t, i, n, a, r, o, s) {
		var l = e.extend({
			initialize: function(e) {
				l.superClass.initialize.call(this);
				var t = this;
				if ($("#module_basic_playlist").length) {
					this.Playlist = new o({
						el: "#Drama"
					});
					n.bind("player:responsive", function() {
						if ("Drama" == r.current) t.Playlist.scroll.update()
					});
					r.bind("tab:show", function(e) {
						t.Playlist.scroll.update()
					});
					a.bind("SideControl:open", function() {
						t.Playlist.scroll.update()
					});
					if (PageConfig.tabs) this.tabsInit()
				}
			},
			tabsInit: function() {
				var e = PageConfig.tabs.split(",");
				$.each(e, function(e, t) {
					if ("feeinfo" == t) new s
				})
			}
		});
		return l
	});
	define("page/find/play/sideTool", ["tui/view", "tui/art", "tui/cookie", "tui/net", "module/login/login", "module/stat/log"], function(View, Art, Cookie, Net, Login, Log) {
		var SideTool = View.extend({
			tool: "sideTool",
			appQrcodeisshow: true,
			initialize: function() {
				var e = this;
				var t = '<div id="sideTool" class="right-sideBar">\n<ul class="yk-toolbar-service js-toolbar" id="toolbarservice" data-stat-role="ck">\n<li class="bigImg yk-toolbar-draw js-draw" id="lotteryToolbarBig"  style="display: none;"></li>\n<li class="yk-toolbar-draw js-draw" id="lotteryToolbar"  style="display: none;"></li>\n<li class="yk-toolbar-group">\n<a class="toolbar icon-5" id="icongroupqrcode" title="二维码">\n<div class="yk-toolbar-group-item js-dest-qrcode" id="iconitemqrcode"></div>\n<div class="qrcode-popup yk-toolbar-group-panel-li" id="showAppQrcode" style="display: none;">\n<div class="qrcode-arrow"></div>\n<p>下载手机客户端</p>\n<img src="//r1.ykimg.com/0510000058D0FEA1ADC0AE058F099020" width="100"/>\n<span>微信扫一扫</span><span>视频随时看</span>\n</div>\n</a>			\n</li>\n<li class="yk-toolbar-group" id="icongroupquestion" style="display: none;">\n<a class="toolbar icon-6" id="ToolbarQuestionLink" href="#" target="_blank" title="问卷"><div class="yk-toolbar-group-item js-dest-question" id="iconitemquestion" data-stat-role="ck"></div></a>\n</li>		\n<li class="yk-toolbar-group" id="icongroupgotop" style="display: none;">\n<a class="toolbar icon-2"><div class="yk-toolbar-group-item js-dest-goTop" data-stat-role="ck" id="iconitemgotop"></div></a>\n</li>\n<li class="yk-toolbar-group" id="lightoff">\n<a class="toolbar icon-4"><div class="yk-toolbar-group-item js-dest-lightOn" id="iconitemlighton" data-stat-role="ck" title="关灯"></div></a>\n</li>\n<li class="yk-toolbar-group" id="icongroupfeedback">\n<a class="toolbar icon-3" href="//csc.youku.com/feedback-web/web/subtype_16" target="_blank" title="反馈"><div class="yk-toolbar-group-item js-dest-feedback" id="iconitemfeedback" data-stat-role="ck"></div></a>\n</li>\n</ul>\n</div>\n<div id="light_switch" style="display: none;">\n<div id="playshow_mask" style="display: block;"></div>\n<div class="sideTool sideTool_dark" id="sideToolDark" style="display: block;">\n<div class="handle" id="lighton"><a class="icon-light-off" href="javascript:;" title="开灯"></a></div>\n</div>\n</div>';
				$("body").append($(t));
				this.$el = $("#sideTool");
				$("#sideBar").remove();
				$(document).bind("show:question", this.goQuestion.bind(this));
				this.$goTop = $("#icongroupgotop");
				this.$btnQrcode = $("#icongroupqrcode");
				this.QrStatus = 1;
				this._bindEvent();
				this.goTopStatus()
			},
			goTop: function() {
				$("body,html").animate({
					scrollTop: 0
				}, 800);
				return false
			},
			goQuestion: function(e, t) {
				var i = this.$el.find("#icongroupquestion");
				$("#ToolbarQuestionLink").attr({
					href: t.link,
					title: t.name
				});
				i.show()
			},
			goTopStatus: function() {
				var e = $(window).scrollTop();
				if (e > 300) this.$goTop.show();
				else this.$goTop.hide()
			},
			showQrcode: function(e) {
				var t = this,
					i, n;
				var a = $("#showAppQrcode");
				var r = [{
					right: "0px",
					opacity: 0
				}, {
					right: "50px",
					opacity: 1
				}];
				if (1 == this.QrStatus) {
					if ("close" == e) return;
					i = r[0];
					n = r[1]
				} else {
					i = r[1];
					n = r[0]
				}
				a.css(i);
				a.show().animate(n, 300, function() {
					if (t.QrStatus == -1) a.hide();
					t.QrStatus = t.QrStatus * -1
				});
				return false
			},
			_bindEvent: function() {
				var e = $(window);
				var t = this;
				var i = true;
				e.bind("scroll", function() {
					if (i) {
						setTimeout(function() {
							t.goTopStatus();
							i = true
						}, 200);
						i = false
					}
				});
				this.$goTop.bind("click", this.goTop.bind(this));
				this.$btnQrcode.bind("click", this.showQrcode.bind(this));
				$(document).bind("click", function() {
					t.showQrcode.call(t, "close")
				})
			},
			showRunIcon: function() {
				if (!PageConfig.lottery_open_sidetool || "" == PageConfig.lottery_open_sidetool || !$("#lotteryToolbarBig").length || !$("#lotteryToolbar").length) return false;
				var e = Login.uid();
				var t = this;
				var i = "//ykatr.youku.com/atr/related/packed_list.json",
					n = 1,
					a = Cookie("__ysuid"),
					r = 1,
					o = 16,
					s = 1,
					l = "ykqz_toolbar";
				var d;
				i += "?site=" + n + "&guid=" + a + "&apptype=" + r + "&module=" + o + "&pl=" + s + "&oc=" + l;
				i += "&uid=" + Login.uid();
				if ("undefined" != typeof PageConfig.playmode) {
					d = 1;
					if (0 != PageConfig.videoId) {
						var c = PageConfig.videoId;
						i += "&vid=" + c
					}
					if (0 != PageConfig.showid) {
						var u = PageConfig.showid;
						i += "&sid=" + u
					}
					if ("undefined" != typeof PageConfig.catId) {
						var f = PageConfig.catId;
						i += "&cate=" + f
					}
				} else {
					d = 30;
					if ("object" == typeof svargs) if ("undefined" != typeof svargs.catid && 0 != svargs.catid) {
						var f = svargs.catid;
						i += "&cate=" + f
					}
					if (1 == window.youku_show_page && "object" == typeof g_config) {
						if ("undefined" != typeof g_config.pk_odshow) {
							var u = g_config.pk_odshow;
							i += "&sid=" + g_config.pk_odshow
						}
						if ("undefined" != typeof g_config.cat_id && 0 != typeof g_config.cat_id) {
							var f = g_config.cat_id;
							i += "&cate=" + f
						}
					}
				}
				i += "&pg=" + d;
				i += "&callback=?";
				$.getJSON(i, function(e) {
					t.showRunIconCallback(e)
				})
			},
			showRunIconCallback: function(e) {
				if (0 == e.e) {
					var t = e.data[0];
					var i = t.clickLogUrl;
					$("#lotteryToolbar").show();
					var n = '<div id="lotteryLeft" class="ykDraw-panel ykDraw-panel-reward" style="position:relative;width:100%;height:100%;"><a href="' + t.playLink + '" target="_blank" style="cursor:pointer;position:absolute;width:100%;height:100%;background:url(' + t.picUrl + ') no-repeat;background-position:0 -40px;margin-top:10px;"></a><span id="lotteryHand" class="ykDraw-p-itemykDraw-p-item-close" style="cursor:pointer;position:absolute;width:13px;height:13px;left:0px;top:0px;background:url(' + t.picUrl + ') no-repeat;background-position:-42px 0;"></span></div></div></div>';
					var a = '<div class="yk-toolbar-draw js-draw"><div class="yk-toolbar-group yk-toolbar-group-draw"><div class="ykDraw-mark" id="lotteryRight"><a href="' + t.playLink + '" target="_blank" style="position:relative;display:block;height:38px;"><span class="ykDraw-m-item ykDraw-m-item-bag" style="background:url(' + t.picUrl + ') no-repeat;width:100%;height:100%;background-position:0 0;z-index:1;display:block;margin:0 auto;"></span></a></div>';
					$("#lotteryToolbarBig").html(n);
					$("#lotteryToolbar").html(a);
					$("#lotteryToolbar").show();
					if ("yes" != Cookie("runIcon_day") && window.screen.width >= 1440) $("#lotteryToolbarBig").show();
					if (null == Cookie("runIcon_day") || "undefined" == Cookie("runIcon_day")) this.appQrcodeisshow = false;
					this.showRunIconLog(i)
				}
			},
			showRunIconLog: function(e) {
				var t = e;
				if (t) var i;

				function n(e) {
					if (t) {
						var i = new Image;
						i.src = t + "&optype=" + e
					}
				}
				$("#lotteryLeft").bind("click", function() {
					i = 6;
					Log.log(1, "tp=1&cp=4010337&cpp=1000940");
					n(i)
				});
				$("#lotteryRight").bind("click", function() {
					i = 8;
					Log.log(1, "tp=1&cp=4010338&cpp=1000940");
					n(i)
				});
				$("#lotteryHand").bind("click", function(e) {
					$("#lotteryToolbarBig").hide();
					$("#lotteryToolbar").show();
					Cookie("runIcon_day", "yes", 1);
					i = 9;
					Log.log(1, "tp=1&cp=4009622&cpp=1000217");
					n(i);
					return false
				})
			},
			lottery: function() {
				if (!PageConfig.lottery_open_sidetool || "" == PageConfig.lottery_open_sidetool || !$("#lotteryToolbarBig").length || !$("#lotteryToolbar").length) return false;
				var lotteryCon = eval(PageConfig.lottery_sidetool);
				if (!lotteryCon || "object" != typeof lotteryCon) return false;
				var lotterystart = "";
				var lotteryend = "";
				var lottery_small_start = "";
				var lottery_small_end = "";
				var lotterybackground = "";
				var lotterytype = "";
				var lotteryurl = "";
				var lotteryLayerW = "";
				var lotteryLayerH = "";
				for (var i = 0; i < lotteryCon.length; i++) {
					if ("object" != typeof lotteryCon[i] || !lotteryCon[i].start || !lotteryCon[i].end || !lotteryCon[i].type || !lotteryCon[i].background) continue;
					lotterystart = lotteryCon[i].start;
					lotteryend = lotteryCon[i].end;
					lottery_small_start = lotteryCon[i].small_start;
					lottery_small_end = lotteryCon[i].small_end;
					lotterybackground = lotteryCon[i].background + "?t=" + Math.random();
					lotterytype = lotteryCon[i].type;
					lotteryurl = lotteryCon[i].url;
					if (2 == lotterytype) {
						lotteryLayerW = !lotteryCon[i].layerw ? 485 : lotteryCon[i].layerw;
						lotteryLayerH = !lotteryCon[i].layerh ? 426 : lotteryCon[i].layerh
					}
					var starttime = new Date(lotterystart).valueOf();
					var endtime = new Date(lotteryend).valueOf();
					var small_starttime = new Date(lottery_small_start).valueOf();
					var small_endtime = new Date(lottery_small_end).valueOf();
					var nowDate = new Date;
					var nowtime = nowDate.valueOf();
					var nowDay = nowDate.getDate().toString();
					var nowMonth = nowDate.getMonth().toString();
					var nowYear = nowDate.getFullYear().toString();
					var clolseCookieValueNow = nowYear + nowMonth + nowDay;
					var lotteryToolbarInner = "";
					var lotteryToolbarBigInner = "";
					if (nowtime > starttime && nowtime < endtime || nowtime > small_starttime && nowtime < small_endtime) {
						$("lotteryToolbar").style.display = "block";
						lotteryToolbarInner = '<div class="yk-toolbar-draw js-draw"><div class="yk-toolbar-group yk-toolbar-group-draw">' + '<div class="ykDraw-mark" id="lotteryRight">';
						if (1 == lotterytype) lotteryToolbarInner += '<a href="' + lotteryurl + '" target="_blank" onclick="Log.log(1, \'tp=1&cp=4010338&cpp=1000940\');" style="position:relative;display:block;height:38px;">' + '<span class="ykDraw-m-item ykDraw-m-item-bag" style="background:url(' + lotterybackground + ") no-repeat;width:100%;height:100%;background-position:0 0;" + 'z-index:1;display:block;margin:0 auto;"></span></a>';
						else if (2 == lotterytype) lotteryToolbarInner += "<span onclick=\"SideTool.lotteryLayer('" + lotteryurl + "','" + lotteryLayerW + "','" + lotteryLayerH + "');Log.log(1, 'tp=1&cp=4010338&cpp=1000940');\" style=\"cursor:pointer;position:relative;display:block;height:38px;\">" + '<span class="ykDraw-m-item ykDraw-m-item-bag" style="background:url(' + lotterybackground + ") no-repeat;width:100%;height:100%;background-position:0 0;" + 'z-index:1;display:block;margin:0 auto;"></span></span>';
						else lotteryToolbarInner += '<span style="cursor:pointer;position:relative;display:block;height:38px;">' + '<span class="ykDraw-m-item ykDraw-m-item-bag" style="background:url(' + lotterybackground + ") no-repeat;width:100%;height:100%;background-position:0 0;" + 'z-index:1;display:block;margin:0 auto;"></span></span>';
						lotteryToolbarInner += "</div>";
						lotteryToolbarBigInner += '<div id="lotteryLeft" class="ykDraw-panel ykDraw-panel-reward" style="position:relative;width:100%;height:100%;">';
						if (1 == lotterytype) lotteryToolbarBigInner += '<a href="' + lotteryurl + '" target="_blank" onclick="Log.log(1, \'tp=1&cp=4010337&cpp=1000940\');" ' + 'style="cursor:pointer;position:absolute;width:100%;height:100%;background:url(' + lotterybackground + ') no-repeat;background-position:0 -40px;margin-top:10px;"></a>';
						else if (2 == lotterytype) lotteryToolbarBigInner += "<span onclick=\"SideTool.lotteryLayer('" + lotteryurl + "','" + lotteryLayerW + "','" + lotteryLayerH + "');Log.log(1, 'tp=1&cp=4010337&cpp=1000940');\" " + 'style="cursor:pointer;position:absolute;width:100%;height:100%;background:url(' + lotterybackground + ') no-repeat;background-position:0 -40px;margin-top:10px;"></span>';
						else lotteryToolbarBigInner += '<span style="cursor:pointer;position:absolute;width:100%;height:100%;background:url(' + lotterybackground + ') no-repeat;background-position:0 -40px;margin-top:10px"></span>';
						lotteryToolbarBigInner += '<span id="lotteryHand" class="ykDraw-p-itemykDraw-p-item-close" style="cursor:pointer;position:absolute;width:13px;' + "height:13px;left:0px;top:0px;background:url(" + lotterybackground + ') no-repeat;background-position:-42px 0;"></span>' + "</div></div></div>";
						$("lotteryToolbarBig").innerHTML = lotteryToolbarBigInner;
						if (nowtime > starttime && nowtime < endtime) $("lotteryToolbarBig").style.display = "block";
						$("lotteryToolbar").innerHTML = lotteryToolbarInner;
						if (clolseCookieValueNow == Nova.Cookie.get("lottery_day")) {
							$("lotteryToolbarBig").style.display = "none";
							$("lotteryToolbar").style.display = "block"
						}
						if ($("lotteryHand")) $("lotteryHand").onclick = function(e) {
							$("lotteryToolbarBig").style.display = "none";
							$("lotteryToolbar").style.display = "block";
							Log.log(1, "tp=1&cp=4009622&cpp=1000217");
							var t = new Date;
							var i = t.getDate().toString();
							var n = t.getMonth().toString();
							var a = t.getFullYear().toString();
							var r = a + n + i;
							Nova.Cookie.set("lottery_day", r, 1);
							var o = e || window.event;
							if (o.stopPropagation) o.stopPropagation();
							return false
						}
					}
				}
			},
			lotteryLayer: function(e, t, i) {
				if (!e || !t || !i) return false;
				if ("function" == typeof PlayerPause) PlayerPause(1);
				if (window.popwin) popwin.hide();
				window.popwinLottery = new Qwindow;
				window.popwinLottery.setSize(t, i).setContent("iframe", e).setHideCallback(function() {
					if ("function" == typeof PlayerPause) PlayerPause(0)
				}).show();
				Log.log(1, "tp=1&cp=4009623&cpp=1000217")
			}
		});
		return SideTool
	});
	define("page/find/play/player/liveGuide", ["tui/art", "tui/view", "tui/net", "tui/cookie"], function(e, t, i, n) {
		var a = t.extend({
			initialize: function(e) {
				a.superClass.initialize.call(this);
				var t = this;
				if (n("livePopClose")) return;
				t.getLiveGuide();
				this.timerHandle = setInterval(function() {
					t.getLiveGuide()
				}, 12e4)
			},
			render: function(t) {
				var i = this;
				if ($("#LiveGuide").length) return;
				var n = '<div id="LiveGuide" style="display:none;"><div class="frame-cover"><iframe style="border:0;" width="100%" height="100%" src="<%=data.streamUrl%>"></iframe></div><a target="_blank" class="live-cover" data-spm-click="gostr=/yt/click.index.module;locaid=dliveguide;mid=1009&mname=web_pop;" href="<%=data.clickUrl%>" > <div class="live-title"><span style="margin-left:10px;"><%=data.title%></span><i data-spm-click="gostr=/yt/click.index.module;locaid=dliveguideclose;mid=1010&mname=pop_close;" class="close"></i></div></a><div class="exit-cover"><p>精彩马上到，再看一会吧</p><div><a target="_blank" data-spm-click="gostr=/yt/click.index.module;locaid=dgolive;mid=1011&mname=golive;" class="btn_continue" href="<%=data.clickUrl%>"></a><a href="javascript:void(0);"  data-spm-click="gostr=/yt/click.index.module;locaid=dcloseall;mid=1011&mname=closeall;" class="btn_close"></a></div></div></div>';
				var a = e.compile(n)({
					data: t
				});
				$("body").append(a);
				setTimeout(function() {
					$("#LiveGuide").show();
					$("#LiveGuide .close").bind("click", i.close);
					$("#LiveGuide .btn_close").bind("click", i.confirmClose);
					$("#LiveGuide .btn_continue").bind("click", i.confirmCancle);
					i.log("show", {
						mid: "1009",
						mname: "web_pop"
					})
				}, 5e3)
			},
			getLiveGuide: function() {
				var e = this;
				var t = 1 * new Date;
				i.getJSON("//hudong.alicdn.com/api/data/v2/c8bd94ff14504fee93fbf16a74c94d95.js?t=" + 1 * new Date, {}, function(i) {
					if (i.isShow || "57700" == PageConfig.showid || "774932586" == PageConfig.videoId) if (t > i.start && t < i.end && r(i.deliveryType)) {
						e.render(i);
						clearInterval(e.timerHandle)
					}
				}, {
					callbackName: "callback",
					charset: "utf-8",
					callback: "smallWinPlayCallback"
				})
			},
			confirmClose: function(e) {
				n("livePopClose", 1, {
					expires: 1
				});
				$("#LiveGuide").remove();
				return false
			},
			close: function() {
				$("#LiveGuide .frame-cover").hide();
				$("#LiveGuide .live-cover").hide();
				$("#LiveGuide .exit-cover").show();
				return false
			},
			confirmCancle: function() {
				$("#LiveGuide .exit-cover").hide();
				$("#LiveGuide .frame-cover").show();
				$("#LiveGuide .live-cover").show()
			},
			log: function(e, t) {
				if ("show" == e) window.goldlog && window.goldlog.record("/yt/show.index.module", "EXP", $.param(t), "H1505507054");
				else window.goldlog && window.goldlog.record("/yt/click.index.module", "CLK", $.param(t), "H1505507054")
			}
		});
		var r = function(e) {
				var t = false;
				for (var i in e) if (e[i].length > 0 && e[i].split(",").indexOf(PageConfig[i]) >= 0) {
					t = true;
					break
				}
				return t
			};
		return a
	});
	define("page/find/play/model/chest", ["tui/event", "tui/net", "tui/util/num"], function(e, t, i) {
		var n = e.extend({
			initialize: function() {
				var e = this;
				n.superClass.initialize.call(e);
				e.op = {
					callbackName: "callback",
					charset: "utf-8"
				};
				e.pickedNum = null;
				e.feimuNum = 0
			},
			getFeiMu: function() {
				var e = this;
				var i = 1 * new Date;
				t.getJSON("//hudong.alicdn.com/api/data/v2/8d1cc55926754b5996cda4c1e7ebbc5a.js?t=" + 1 * new Date, {}, function(t) {
					if (t.isShow || "57700" == PageConfig.showid || "774932586" == PageConfig.videoId) if (i > t.actStart && i < t.actEnd) {
						e.trigger("getFeiMu:success", [t.data]);
						if (0 == e.feimuNum) {
							e.feimuNum++;
							e.trigger("feiMuEnterance:render", [t])
						}
					}
				}, {
					callbackName: "callback",
					charset: "utf-8",
					callback: "feimuCallback"
				})
			},
			getChestStaus: function(e) {
				var i = this;
				t.getJSON("//hudong.alicdn.com/api/data/v2/e6d5d8a751874a48bb887e80ea9637e7.js?t=" + 1 * new Date, {}, function(e) {
					if (e.isShow) i.trigger("getChestStaus:success", [e.data[0]])
				}, {
					callbackName: "callback",
					charset: "utf-8",
					callback: "boxShowCallback"
				})
			},
			getGoldBoxList: function(e) {
				var i = this;
				var n = _getUA && _getUA();
				t.mtopRequest({
					api: "mtop.youku.feed.service.promotion.getGoldBoxListPcweb",
					type: "post",
					v: "1.0",
					data: {
						asac: "1A17A20TQX3PBND6YEPS7X",
						ua: n
					},
					appKey: "23536927"
				}).then(function(e) {
					if (null == i.pickedNum) {
						i.pickedNum = e.data.pickedNum;
						if (1 == e.data.pickedNum && 0 == e.data.openNum) i.trigger("getGoldBox:success", [e.data]);
						else i.trigger("getNotice:success", [e.data])
					} else if (i.pickedNum != e.data.pickedNum) {
						i.pickedNum = e.data.pickedNum;
						i.trigger("getGoldBox:success", [e.data])
					} else i.trigger("getNotice:success", [e.data])
				}, function(e) {
					i.trigger("getGoldBox:fail", [])
				})
			}
		});
		return n
	});
	define("page/find/play/player/chest", ["tui/art", "tui/view", "tui/net", "tui/cookie", "module/login/login", "page/find/play/model/chest"], function(e, t, i, n, a, r) {
		var o = {};
		var s = new r;
		var l = t.extend({
			initialize: function(e) {
				l.superClass.initialize.call(this);
				var t = this;
				this.$el = $("#playBox");
				this.layerContent = $(".h5-layer-conatiner", this.$el);
				this.rightCtlPlane = $(".h5-control-wrap .control-right-grid", this.$el);
				this.cacheFeimu = [];
				this.hasFeimu = false;
				s.bind("getFeiMu:success", this.initFeiMuPop.bind(this));
				s.bind("feiMuEnterance:render", this.initFeiMu.bind(this));
				s.bind("getChestStaus:success", this.initChestStatus.bind(this));
				setTimeout(function() {
					s.getFeiMu()
				}, 1e3);
				setInterval(function() {
					s.getFeiMu()
				}, 6e4);
				if (1 != PageConfig.playmode) setTimeout(function() {
					if (t.hasFeimu) return;
					s.getChestStaus()
				}, 1500);
				window.GoldBoxLogin = function(e) {
					if (window.YKLoginLoader && YKLoginLoader.getInstance) {
						var i = YKLoginLoader.getInstance();
						i.updateConfig({
							configId: "038af5d332901a43"
						})
					}
					a.login(function() {
						t.log("show", {
							mid: "1008",
							mname: "globboxlogin"
						});
						e && e()
					})
				};
				window.GoldBoxLayerClose = function() {
					t.closeChestLayer()
				};
				$("body").bind("responsive", function(e, i) {
					if ($("#chestLayer").length) t.openChestLayer("response=" + i)
				})
			},
			events: {
				"click .control-chest-icon": "clickChest",
				"click .control-feimu-icon": "clickFeimu",
				"click .h5-layer-conatiner .chest-poplayer": "clickPopChest",
				"click .h5-layer-conatiner .feimu-poplayer": "clickPopFeiMu",
				"mouseenter .h5-layer-conatiner .chest-poplayer,.h5-layer-conatiner .feimu-poplayer": "enterPop",
				"mouseleave .h5-layer-conatiner .chest-poplayer,.h5-layer-conatiner .feimu-poplayer": "leavePop",
				"click .chestLayerClose": "closeChestLayer"
			},
			initChestStatus: function(e) {
				var t = 1 * new Date;
				if (d(e.deliveryType)) if (t >= e.start && t <= e.end) {
					o.cms = e;
					this.initChest()
				}
			},
			initChest: function() {
				var t = this;
				t.popNoticeNum = 0;
				s.bind("getNotice:success", this.getNotice.bind(this));
				s.bind("getGoldBox:success", this.getGoldBox.bind(this));
				s.bind("getGoldBox:fail", this.getGoldBoxFail.bind(this));
				if (!$(".control-chest-icon", this.$el).length) {
					var i = '<button data-tip="<%=data.name%>"  class="control-icon control-chest-icon"><img src="<%=data.image%>" width=38 height=38 /></button>';
					var n = e.compile(i)({
						data: o.cms
					});
					this.log("show", {
						mid: "1006",
						mname: "magicbox"
					});
					this.rightCtlPlane.prepend(n);
					this.$chestBtn = $(".control-chest-icon", this.$el)
				}
				s.getGoldBoxList()
			},
			initFeiMu: function(t) {
				var i = '<a target="_blank" href="<%=data.actUrl%>" data-tip="<%=data.actTitle%>"  class="control-icon control-feimu-icon"><img src="<%=data.actIcon%>" width=38 height=38 /></a>';
				var n = e.compile(i)({
					data: t
				});
				this.hasFeimu = true;
				this.log("show", {
					mid: "1008",
					mname: "rtpushopen"
				});
				this.rightCtlPlane.prepend(n)
			},
			initFeiMuPop: function(e) {
				var t = this;
				var i = 1 * new Date;
				if (e.length) $.each(e, function(e, n) {
					if (i < n.end && i > n.start && n.isShow) if (t.cacheFeimu.indexOf(n.id) < 0) {
						t.cacheFeimu.push(n.id);
						t.showFeimuPop(n);
						return false
					}
				})
			},
			getNotice: function(e) {
				o.mtop = e;
				if (e.nextCallTime > 0) {
					o.popType = "yugao";
					this.showPop(e)
				}
			},
			getGoldBoxFail: function() {
				this.$chestBtn.remove()
			},
			getGoldBox: function(e) {
				if (!n("ChestStatus") || e.pickedNum > 1) {
					if (1 == e.pickedNum) this.popNoticeNum++;
					o.mtop = e;
					o.popType = "lingqu";
					n("ChestStatus", 1, {
						expires: this.getCookieTime()
					});
					this.showPop(e)
				} else this.getNotice(e)
			},
			log: function(e, t) {
				if ("show" == e) goldlog && goldlog.record("/yt/show.index.module", "EXP", $.param(t), "H1505507054");
				else goldlog && goldlog.record("/yt/click.index.module", "CLK", $.param(t), "H1505507054")
			},
			clickPopChest: function(e) {
				if ($(e.currentTarget).hasClass("lingqu")) this.log("click", {
					mid: "1005",
					mname: "win"
				});
				else this.log("click", {
					mid: "1004",
					mname: "magic_tips"
				});
				this.openChestLayer();
				this.hidePop(1e3)
			},
			clickPopFeiMu: function() {
				this.log("click", {
					mid: "1007",
					mname: "rtpush"
				});
				this.hidePop(1e3)
			},
			clickChest: function(e) {
				this.log("click", {
					mid: "1006",
					mname: "magicbox"
				});
				this.openChestLayer()
			},
			clickFeimu: function(e) {
				this.log("click", {
					mid: "1008",
					mname: "rtpushopen"
				})
			},
			openChestLayer: function(e) {
				var e, t;
				var i = ykPlyr.h5Player.getPlayerState() || {};
				if (i.fullscreen) ykPlyr.h5Player.exitFullscreen();
				if ($("#playerBox").hasClass("playBox_thx")) $("#expandlink").trigger("click");
				e = e || ($("body").hasClass("w1080") ? "response=1080" : "");
				t = o.cms.url + "?" + e;
				if ($("#chestLayer").length) $("#chestFrame").attr("src", t);
				else {
					var n = '<div  id="chestLayer"><iframe  id="chestFrame" src="' + t + '"></iframe><a class="chestLayerClose" href="javascript:void(0);">关闭</a></div>';
					$("#module_basic_playlist").append(n)
				}
			},
			closeChestLayer: function() {
				$("#chestLayer").remove()
			},
			showFeimuPop: function(t) {
				var i = this;
				var n = '<a href="<%=data.url%>" target="_blank" style="display:none;" class="feimu-poplayer"> \n<%=data.content%>\n<%if(data.image){%>\n<img src="<%=data.image%>" width=38 height=38 />\n<%}%>\n</a>';
				this.$pop = $(e.compile(n)({
					data: t
				}));
				if ($(".chest-poplayer ", this.$el).length) $(".chest-poplayer ", this.$el).remove();
				if ($(".feimu-poplayer ", this.$el).length) return;
				i.popNoticeNum++;
				this.layerContent.append(this.$pop);
				this.log("show", {
					mid: "1007",
					mname: "rtpush"
				});
				this.$pop.fadeIn("slow", function() {
					i.hidePop(1e3 * t.showTime || 8e3)
				})
			},
			showPop: function(t) {
				var i = this,
					n;
				if (o.mtop.nextCallTime) i.countdown = setTimeout(function() {
					s.getGoldBoxList()
				}, 1e3 * 60 * o.mtop.nextCallTime);
				if ($(".feimu-poplayer ", this.$el).length) return;
				if ($(".chest-poplayer ", this.$el).length) $(".chest-poplayer ", this.$el).remove();
				if ("yugao" == o.popType) {
					if (i.popNoticeNum > 0 || 0 == t.openNum) return;
					i.popNoticeNum++;
					this.log("show", {
						mid: "1004",
						mname: "magic_tips"
					})
				} else this.log("show", {
					mid: "1005",
					mname: "win"
				});
				n = '<a href="javascript:void(0);" style="display:none;" class="chest-poplayer <%=data.popType%>"> \n<%if(data.popType==\'yugao\'){%>\n<%=data.cms.noticeBubble.text1%><%=data.mtop.nextCallTime%>分钟<%=data.cms.noticeBubble.text2%>\n<%}else{%>\n<%if(data.mtop.pickedNum==1){%>\n已获得1个宝箱，点击开启\n<%}else{%>\n<%=data.cms.receiveBubble%>\n<%}%>\n<%}%>\n<img src="<%=data.cms.image%>" width=38 height=38 />\n</a>';
				this.$pop = $(e.compile(n)({
					data: o
				}));
				this.layerContent.append(this.$pop);
				this.$pop.fadeIn("slow", function() {
					i.hidePop()
				})
			},
			hidePop: function(e) {
				var t = this;
				this.handle = setTimeout(function() {
					t.$pop.fadeOut("slow", function(e) {
						t.$pop.remove()
					})
				}, e || 1e4)
			},
			enterPop: function() {
				clearTimeout(this.handle)
			},
			leavePop: function() {
				this.hidePop()
			},
			getCookieTime: function() {
				var e = 1 * new Date;
				var e = e - e % (24 * 60 * 1e3 * 60) + 24 * 60 * 1e3 * 60;
				return new Date(e)
			}
		});
		var d = function(e) {
				var t = false;
				for (var i in e) if (e[i].length > 0 && e[i].split(",").indexOf(PageConfig[i]) >= 0) {
					t = true;
					break
				}
				return t
			};
		return l
	});
	define("page/find/play/player/h5playerdanmu", ["module/login/login"], function(e) {
		var t = function(t) {
				if ("undefined" == typeof ykDanmu) return false;
				var i = new ykDanmu({
					el: "#player",
					video: t,
					className: "#ykPlayer",
					starbox: "#ykPlayer",
					dmSwitchbox: ".control-right-grid",
					iid: PageConfig.videoId,
					aid: PageConfig.showid,
					cid: PageConfig.catId,
					vcode: PageConfig.videoId2,
					ouid: PageConfig.videoOwner
				});
				t.on("PlayerPlayNext", function(e) {
					i.Playernext(e)
				});
				t.on("onPlayerStart", function(e) {
					i.PlayerStart(e)
				});
				t.on("onFullscreen", function(e) {
					i.fullscreen(e)
				});
				t.on("onTimeUpdate", function(e) {
					if (i.updatetime && (i.updatetime - e.currentTime < -30 || i.updatetime - e.currentTime > 30)) i.PlayerUpdata();
					i.updatetime = e.currentTime
				});
				t.on("dashboardStateChange", function(e) {
					if (e) i.control("hide");
					else i.control("show")
				});
				$("body").bind("scrollPlayer", function(e, t) {
					if ("narrow" == t.status) i.control("hide", "scrollPlayer");
					else i.control("show", "scrollPlayer")
				});
				i.login.loginFunc = function() {
					e.login()
				};
				e.bind("login:success", function() {
					i.login.emit("login:success")
				})
			};
		return t
	});
	define("page/find/play/player/pipAd", ["tui/event", "tui/net", "tui/art", "module/ad/util"], function(e, t, i, n) {
		var a = null;
		var r = 1e3 * 10 * 60;
		var o = false;
		var s = false;
		var l;

		function d(e) {
			return e && "" != e && null != e && "null" != e && "undefined" != e
		}
		var c = e.extend({
			initialize: function() {
				this.prePip = $("#ab_pip_pre")
			},
			adInit: function(e, t) {
				if (!e) return;
				if (e && e[t]) this.analyzeContent(e[t]);
				t += 1;
				for (; t < e.length; t++) if (e[t]) {
					var i = e[t];
					if (d(i.F1) && d(i.CU)) {
						o = true;
						break
					}
				}
				if (o) {
					this.show_pip();
					this.ab_v_ad1()
				}
			},
			midAdInit: function(e, t) {
				var i = this;
				if (e && e[t]) {
					this.analyzeContent(e[t]);
					if (o) {
						this.show_pip();
						this.ab_v_ad1()
					}
				}
			},
			analyzeContent: function(e) {
				var n = e.F1;
				var a = e.CU;
				var r = /\.swf$/i.test(n);
				var s = /<\/script>$/.test(n);
				var l = '<div id="f1_ideaid" class="mod">\n<%if(isSwf){%>\n<object type="application/x-shockwave-flash" data="<%=data.flash%>" width="300" height="<%=data.F3%>">\n<param name="wmode" value="transparent">\n<param name="movie" value="<%=data.flash%>" width="300" height="<%=data.F3%>" />\n<embed src="<%=data.flash%>" width="300" height="<%=data.F3%>" border="0" align="center" wmode="transparent"/>\n</object>\n<%}else{%>\n<a href="<%=data.CU%>" target="_blank">\n<img src="<%=data.F1%>" border="0" id="bas_ideaid"/>\n</a>\n<%}%>\n</div>';
				var c = s ? "script" : "html";
				var u = Math.random();
				t.getRequest("//count.atm.youku.com/msg?s=yth&k=6&msg=expose|" + c);
				if (r) e.flash = e.F1 + "?url=" + escape(e.CU);
				if (s) {
					$(document.body).append(n);
					t.getRequest("//count.atm.youku.com/msg?s=yth&k=6&msg=script");
					return
				}
				if (d(n) && d(a)) {
					e.F3 = 50;
					this.prePip.html(i.compile(l)({
						data: e,
						isSwf: r
					}));
					t.getRequest("//count.atm.youku.com/msg?s=yth&k=6&msg=html");
					o = true
				}
			},
			show_pip: function() {
				this.prePip.show();
				$("#ab_863").hide();
				$("#ab_v_324").hide()
			},
			ab_v_ad1: function() {
				var e = this;
				if (l) clearTimeout(l);
				l = setTimeout(function() {
					t.getRequest("//v2html.atm.youku.com/vhtml?p=324" + "&rst=" + n.getAdRst() + PageConfig.adsParams + "&t=" + (new Date).getTime() + "&vl=" + PageConfig.seconds + "&pu=" + window.location.href + "&ref=" + document.referrer);
					e.prePip.hide();
					$("#ab_v_324").show()
				}, r)
			}
		});
		c.getInstance = function() {
			if (a) return a;
			else return a = new c
		};
		return c.getInstance()
	});
	define("page/find/play/player/light", ["tui/event"], function(e) {
		return e.extend({
			status: "on",
			auto_off: false,
			changing: false,
			lightswitch: "#light_switch",
			lightoff: "lightoff",
			lighton: "lighton",
			initialize: function() {
				var e = this;
				if (/_l_off/.test(location.href)) this.auto_off = true;
				window.setTimeout(function() {
					$("#lighton,#lightoff").on("click", function() {
						e.turn()
					});
					ykPlyr.bind("player:onLight", function() {
						e.on()
					})
				}, 200)
			},
			turn: function() {
				if (true == this.changing) return false;
				if ("on" == this.status) this.off();
				else this.on()
			},
			on: function() {
				if (true == this.changing) return false;
				this.changing = true;
				this.auto_off = false;
				this.status = "on";
				var e = this;
				this.doAlpha("on", function() {
					var t = $("#sideTool");
					if (t.length) t.show();
					$("#lightoff").removeClass("icon-light-off").addClass("icon-light-on");
					e.changing = false;
					var i = $("#playBox");
					i[0].style.zIndex = "";
					i[0].className = "play_area";
					document.body.style.cssText = "min-width:1002px;";
					ykPlyr.setLight("on");
					ykPlyr.PlayerColor("FFFFFF", "DEDEDE", 100)
				})
			},
			off: function() {
				if (true == this.changing) return false;
				this.changing = true;
				var e = this;
				var t = document.documentElement.clientHeight;
				var i = $("#playerBox");
				var n = t - i.height();
				n = n > 0 ? n / 2 : 0;
				n = $("#playerBox").offset().top - n;
				window.scrollTo(0, n);
				var a = document.body.clientHeight || document.documentElement.clientHeight;
				document.body.style.cssText = "height: " + a + "px; overflow: hidden; min-height: 768px;";
				$("#lighton>a").removeClass("icon-light-on").addClass("icon-light-off");
				this.status = "off";
				this.auto_off = false;
				this.doAlpha("off", function() {
					var t = $("#playBox");
					t[0].style.zIndex = 20100;
					t[0].className = "play_area play_dark";
					e.changing = false;
					ykPlyr.setLight("off");
					ykPlyr.PlayerColor("000000", "000000", 40)
				})
			},
			setOpacity: function(e, t) {
				if (!e) return;
				if (e.filters && e.filters.alpha) e.filters.alpha.opacity = t;
				else e.style.opacity = t / 100
			},
			doAlpha: function(e, t) {
				var i = this;
				var n = $(this.lightswitch);
				var a = 100;
				var r = null;
				var o = 0;
				var s = -1;
				if ("off" == e && n.length) {
					a = 0;
					this.setOpacity(n[0], 0);
					s = -s;
					setTimeout(function() {
						n.show();
						document.getElementById("player").style.zIndex = 1400;
						document.getElementById("playBox").style.zIndex = 1400
					}, 100)
				}
				r = setInterval(function() {
					o += s;
					a += o;
					i.setOpacity(n[0], a);
					if (a <= 0 || a >= 100) {
						if (a < 0) a = 0;
						else if (a > 100) a = 100;
						clearInterval(r);
						if ("on" == e) n.hide();
						if ("function" == typeof t) t()
					}
				}, 25)
			},
			getStatus: function() {
				return this.status
			}
		})
	});
	define("page/find/play/player/playerCallbacks", ["tui/cookie", "tui/common", "tui/net", "module/login/login", "module/responsive", "page/find/play/player/light", "page/find/play/player/pipAd", "page/find/play/interaction/iku", "tui/encrypt/macmd5"], function(e, t, i, n, a, r, o, s, l, d, c) {
		var u = t.empty;
		var f = window;
		var p;
		var m = new r;
		var h = {
			func_referrer: g,
			playerLogin: y,
			setDanmuStatus: _,
			onPlayerStart: w,
			PlayerPlayNext: k,
			PlayerPlayPre: x,
			onTrialEnd: C,
			onPlayerSet: T,
			onPlayerStageVideo: E,
			onPlayerComplete: I,
			onAddScriptContent: P,
			getPlayerCNA: A,
			onPlayerPreAdInit: D,
			onPlayerLastAdInit: D,
			onPlayerMidAdInit: R,
			PlayerInteract: O,
			playerSubscribe: M,
			playerToIku: N,
			jumpToRegister: b
		};
		var v = {
			setDanmuStatus: _,
			onPlayerStart: w,
			PlayerPlayNext: k,
			onTrialEnd: C,
			onPlayerSet: T,
			onPlayerComplete: I,
			onAddScriptContent: P,
			onPlayerPreAdInit: D,
			onPlayerLastAdInit: D,
			onPlayerMidAdInit: R,
			PlayerInteract: O,
			playerSubscribe: M,
			playerToIku: N
		};

		function g() {
			return document.referrer
		}
		function y() {
			n.login()
		}
		function _(e) {
			if ( !! e) {
				$("body").addClass("danmuon");
				$("body").removeClass("danmuoff");
				a.trigger("player:responsive")
			} else {
				$("body").addClass("danmuoff");
				$("body").removeClass("danmuon");
				a.trigger("player:responsive")
			}
		}
		function b(e) {
			var e = e || {};
			window.ykPlyr.trigger("authenPhone", ["authenFromPlayer",
			{
				url: e.message || "https://id.youku.com/bindMobileView.htm",
				wrap: $("#module_basic_playbox"),
				cancleCb: function() {},
				authenCb: function() {
					ykPlyr.regComplete()
				}
			}])
		}
		function w(e) {
			var t = this;
			t.playerStart = true;
			e.isFullScreen = e.vid && e.vidEncoded && "undefined" != e.vid && "undefined" != e.vidEncoded && e.vid != PageConfig.videoId && PageConfig.videoId2 != e.vidEncoded;
			if (e.isFullScreen) {
				PageConfig.preVideId2 = PageConfig.videoId2;
				PageConfig.videoId = e.vid;
				PageConfig.videoId2 = e.vidEncoded;
				t.trigger("player:onPlayerStartUpdate");
				goldlog && goldlog.record("/yt/youkuplayer.fdl.ykplayer_pv", "EXP", "", "H1506430579");
				if (f.cateStr) cateStr = cateStr.replace(/\d+$/, PageConfig.videoId);
				try {
					if ("replaceState" in history) {
						var i = "/v_show/id_" + PageConfig.videoId2 + ".html";
						if (PageConfig.folderId) if (0 == PageConfig.folderId) i = i;
						else i += "?f=" + PageConfig.folderId;
						var n = {
							url: i
						};
						history.replaceState(n, "", i)
					}
				} catch (a) {}
			}
			t.trigger("player:onPlayerStart", [e]);
			$("body").trigger("appearBspool");
			if (m.auto_off) m.off();
			o.playstart && o.playstart();
			if (e.next) T({
				continuous: e.next ? 1 : 0
			})
		}
		function k(e) {
			if (e.isFullScreen) return true;
			var t, i = "";
			try {
				t = m.getStatus()
			} catch (n) {}
			if ("off" == t) i = "_l_off";
			var a = parseInt(PageConfig.playmode);
			var r = {};
			var o = e.playNextType && "auto" == e.playNextType;
			var s = "/v_show/id_";
			switch (a) {
			case 2:
				r.from = o ? "y1.2-3.2" : "y1.2-3.1";
				break;
			case 3:
				r.from = o ? "y1.2-2.2" : "y1.2-2.1";
				break;
			default:
				r.from = o ? "y1.2-1.2" : "y1.2-1.1"
			}
			if (2 == a) {
				if (u(e.vidEncoded) || u(e.Fid)) return false;
				if (0 == PageConfig.forder) r.o = 0;
				r.f = e.Fid;
				s += e.vidEncoded + i + ".html"
			} else {
				var l = e.vidEncoded;
				if (!l) return false;
				if (4 == a) s += l + "_type_99" + i + ".html";
				else {
					s += l + i + ".html";
					if ( !! PageConfig.singerId && "0" != PageConfig.singerId) r.s = PageConfig.singerId
				}
			}
			f.location.href = s + "?" + $.param(r);
			return true
		}
		function x(e) {
			if (e.isFullScreen) return true;
			var t = "",
				i = "";
			try {
				t = m.getStatus()
			} catch (n) {}
			if ("off" == t) i = "_l_off";
			var a = parseInt(PageConfig.playmode);
			if (2 == a) {
				if (u(e.vidEncoded) || u(e.Fid)) return false;
				var r = "";
				if (0 == PageConfig.forder) r = "&o=0";
				f.location.href = "/v_show/id_" + e.vidEncoded + i + ".html?f=" + e.Fid + r
			} else {
				if (e.vidEncoded) preId = e.vidEncoded;
				if ("" == preId) return false;
				if (4 == a) f.location = "/v_show/id_" + preId + "_type_99" + i + ".html";
				else f.location = "/v_show/id_" + preId + i + ".html"
			}
			return true
		}
		function C() {
			f.trialEnd = true
		}
		function T(t) {
			e("P_F", t.continuous);
			var i = parseInt((new Date).getTime() / 1e3) + 3600 * 2;
			e("P_T", i)
		}
		function E(t) {
			if (true == t) e("stgvd", 1, 7);
			else e("stgvd", 1, -1);
			setTimeout(function() {
				f.location.reload()
			}, 100)
		}
		function I(t) {
			var t = t || {};
			var i = this;
			if (f.trialEnd || t && t.loop) return false;
			var n = parseInt(PageConfig.playmode);
			var a = 4 == n ? "W_P_L_M" : "P_L_M";
			var r = e(a);
			var o = e("P_F");
			var s = false;
			if (2 == n && void 0 !== t.Pt) PageConfig.fpos = t.Pt;
			var l = parseInt((new Date).getTime() / 1e3);
			t.playNextType = "auto";
			if (1 == o) {
				var d = f.playerNextVid;
				if (d) if (t.isFullScreen) {
					p.playVideoByID && p.playVideoByID(d);
					return false
				} else {
					if (1 == r) {
						setTimeout(function() {
							i.PlayerSeek(0)
						}, 500);
						return false
					}
					t.vidEncoded = d;
					k(t);
					return false
				}
			}
			if (1 == o) s = k(t);
			if (false == s) i.trigger("player:onLight", [t]);
			i.trigger("player:onPlayerComplete", [t])
		}
		function S(e) {
			var t = this;
			t.trigger("player:playerState", [e])
		}
		function P(e) {
			var t = unescape(e);
			var i = document.createElement("script");
			i.type = "text/javascript";
			i.text = t;
			document.getElementsByTagName("head")[0].appendChild(i)
		}
		function A() {
			return e("cna") || ""
		}
		function L(e) {}
		function D(e, t) {
			o.adInit(e, t)
		}
		function R(e, t) {
			o.midAdInit(e, t)
		}
		function O(e) {
			var t = this;
			if (!e || !e.type) return false;
			switch (e.type) {
			case "timeline":
			case "timelineFadeStart":
				t.trigger("player:timelineFadeStart", [e]);
				break;
			case "timelineFadeEnd":
				t.trigger("player:timelineFadeEnd", [e]);
				break;
			case "actionInfoGuess":
				t.trigger("player:actionInfoGuess", [e])
			}
		}
		function M(e, t, a) {
			function r(e) {
				var t, i = {},
					n = [];
				for (t in e) e.hasOwnProperty(t) && n.push(t);
				for (n.sort(), t = 0; t < n.length; t++) i[n[t]] = e[n[t]];
				return i
			}
			function o(e) {
				var t = "6T7;!dATxQNnVz1R",
					i = r(e),
					n = [],
					a = "";
				for (var o in i) i.hasOwnProperty(o) && "undefined" != typeof i[o] && null !== i[o] && "" !== i[o] && n.push(o + "=" + i[o]);
				var s = n.join("&");
				return a = l(String(s), t)
			}
			var s = this;
			var d = {
				friend_uid: t,
				user_type: 0,
				addtion: a.stype || "9-2"
			};
			var c = o(d);
			d.sign = c;
			n.login(function() {
				i.getJSON("//ding.youku.com/u/friendshipsCreateV2", d, function(e) {
					if (0 == e.error_code || e.error_code == -302) s.callPlayerFunction("playerSubscribed", {
						followd: true
					});
					else {
						alert("订阅失败");
						return false
					}
				}, {
					callbackName: "callback",
					charset: "utf-8"
				})
			})
		}
		function N(e) {
			e = !e ? "ywebplayererror" : e;
			var t = "ywebadddesktop" == e ? "adddesktop" : "play";
			try {
				var i = {
					from: "video",
					action: t,
					secne: e
				};
				s.ikuExecuteFrompc(i)
			} catch (n) {}
		}
		return {
			h5Bind: function(e, t) {
				p = e;
				$.each(v, function(i, n) {
					e.on(i, n.bind(t))
				})
			},
			swfBind: function(e) {
				var t = e;
				p = document.getElementById("movie_player");
				for (var i in h) {
					var n = h[i];
					n && (f[i] = n.bind(t))
				}
			}
		}
	});
	define("page/find/play/player/playerFixed", ["tui/event", "tui/net", "tui/cookie", "tui/browser"], function(e, t, i, n) {
		var a = $(window);
		var r = function(e, t) {
				var i = e;
				var n;
				var a = true;
				return function() {
					var e = arguments;
					var r = this;
					if (a) {
						i.apply(r, e);
						return a = false
					}
					if (n) return false;
					n = setTimeout(function() {
						clearTimeout(n);
						n = null;
						i.apply(r, e)
					}, t || 500)
				}
			};
		return e.extend({
			initialize: function(e) {
				this.ID = e.ID || "#player";
				this.dom = $(this.ID);
				this.player = document.getElementById("player");
				if (!this.dom.length || n.isMobile) return;
				this.domparent = this.dom.parent();
				this.domgrandparent = this.dom.closest(".play_area");
				if (!this.domparent.length || !this.domgrandparent.length) return;
				this.status = 0;
				this.isdrag = 0;
				this.sfw = 310;
				this.sfh = 175;
				$("#qheader").removeClass("g-header-fixed");
				this.bind()
			},
			bind: function() {
				var e = this;
				var t = 20,
					i = this.dom.offset().top + this.dom.height() + t,
					n = 0;
				this.createDOM();

				function o() {
					var t = null;
					n = a.scrollTop();
					if (n > i && 0 == e.status) {
						if ("fixed" == this.playerWin) return;
						if (window.ykPlyr) if (ykPlyr.check("showControlBar")) e.narrowPlayer();
						else ykPlyr.bind("player:loaded", function() {
							e.narrowPlayer()
						});
						$("#qheader").addClass("g-header-fixed");
						this.playerWin = "fixed"
					}
					if (n < i && 1 == e.status) {
						if ("static" == this.playerWin) return;
						$("#qheader").removeClass("g-header-fixed");
						e.revertPlayer(e.dom);
						this.playerWin = "static"
					}
					return false
				}
				o();
				a.bind("scroll", r(o, 300))
			},
			createDOM: function() {
				this.playerDiv = $("<div>").addClass("player");
				this.$dragDiv = $("<div>").attr("id", "dragDIV")
			},
			animatePlayer: function() {
				var e = this;
				var t = 0,
					i = 100,
					n = 800;
				for (var a = 0; a <= n; a++)!
				function(a) {
					window.setTimeout(function() {
						var r = i * a / n - t;
						e.dom[0].style.opacity = r / 100;
						e.dom[0].style.filter = "alpha(opacity=" + r + ")"
					}, a)
				}(a)
			},
			revertPlayer: function() {
				this.status = 0;
				$("body").trigger("scrollPlayer", {
					status: "revert"
				});
				this.dom[0].style.cssText = "";
				ykPlyr.showControlBar(true);
				this.domparent[0].removeChild(this.playerDiv[0]);
				this.$dragDiv.remove();
				this.domgrandparent[0].style.cssText = "";
				this.dragDestroy(this.dom);
				this.dom.removeClass("player-fixed")
			},
			narrowPlayer: function() {
				var e = this;
				this.status = 1;
				this.domparent.append(this.playerDiv);
				ykPlyr.showControlBar(false);
				$("body").trigger("scrollPlayer", {
					status: "narrow"
				});
				e.getInitPos();
				this.dom.css({
					position: "fixed",
					width: this.sfw + "px",
					height: this.sfh + "px",
					left: this.left + "px",
					top: "auto",
					bottom: this.bottom + "px",
					"z-index": "1002",
					background: "#fff",
					padding: "10px 10px 25px"
				});
				this.domgrandparent[0].style.cssText = "z-index:1280;";
				this.dom.addClass("player-fixed");
				var t = '<div id="dragHead" style="cursor:move;z-index:2;position:absolute;top:50%;margin-top:-12px;text-align:center;left:0;padding:0 10px;width:290px;height:24px;line-height:24px;background:#222;opacity:0.9;filter:alpha(opacity=90);color:#909090;font-size:16px;font-family:Microsoft YaHei,微软雅黑,helvetica,arial,verdana,tahoma,sans-serif;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;">点击按住视频可拖动</div>',
					i = '<div id="dragHand" style="cursor:move;position:absolute;top:0;left:0;width:100%;height:100%;background:#222;"></div>';
				this.$dragDiv.attr("style", "z-index:2;position:absolute;top:0;left:0;width:310px;height:" + this.sfh + "px;margin:10px;display:none");
				this.$dragDiv.html(t + i);
				this.dom.append(this.$dragDiv);
				this.dragDIV(this.dom)
			},
			getPlayerInitLeftValue: function() {
				var e = this._getClientWidth();
				var t = e > 1281 ? 1190 : 970,
					i = (e - t) / 2 + t - 310 - 10;
				return i
			},
			getInitPos: function() {
				var e = i("v_pos");
				var t = i("player_pos") || "";
				if (t.indexOf("%7C") > -1) i("player_pos", "");
				if (e) {
					e = e.split("|");
					if (e.length > 0) {
						this.left = e[0];
						this.bottom = e[1]
					}
				} else {
					this.left = this.getPlayerInitLeftValue();
					this.bottom = 50
				}
			},
			dragDIV: function(e) {
				if (!e.length) return false;
				var t = this,
					i = false,
					n = false,
					a, r, e = e[0],
					o = document.getElementById("dragDIV");
				e.onmouseover = function(e) {
					if (o) o.style.display = "block";
					ykPlyr.hide()
				};
				e.onmouseout = function(e) {
					if (o) o.style.display = "none";
					ykPlyr.show();
					if (false === n) i = false
				};
				e.onmousedown = function(e) {
					var e = e || window.event;
					i = true;
					n = true;
					if (e.screenX) {
						a = e.screenX;
						r = e.screenY
					} else if (e.screenLeft) {
						a = e.screenLeft;
						r = e.screenTop
					}
					document.onmousemove = s
				};
				document.onmouseup = function(e) {
					var e = e || window.event;
					i = false;
					n = false;
					t._setPosition();
					document.onmousemove = null
				};

				function s(e) {
					var e = e || window.event;
					if (false == i) return true;
					var n, o;
					if (e.screenX) {
						n = e.screenX;
						o = e.screenY
					} else if (e.screenLeft) {
						n = e.screenLeft;
						o = e.screenTop
					}
					var s = n - a,
						l = o - r;
					a = n;
					r = o;
					var d = parseInt(t.player.style.left) + s,
						c = parseInt(t.player.style.bottom) - l;
					t.left = d;
					t.bottom = c;
					t.moveElement(t.dom, d, c);
					t.isdrag = 1;
					return false
				}
			},
			dragDestroy: function(e) {
				var e = e[0];
				e.onmouseover = e.onmouseout = e.onmousedown = null;
				ykPlyr.show()
			},
			moveElement: function(e, t, i) {
				var n = this._getClientWidth() - this.sfw - 20,
					a = this._getClientHeight() - this.sfh - 20 - 80;
				if (t < 0) t = 0;
				if (t > n) t = n;
				if (i < 0) i = 0;
				if (i > a) i = a;
				e[0].style.left = t + "px";
				e[0].style.bottom = i + "px"
			},
			_getOffsetTop: function(e) {
				var t = 0;
				while (e != document.getElementsByTagName("body")[0]) {
					t = e.offsetTop;
					e = e.offsetParent
				}
				return t
			},
			_getScrollTop: function() {
				return document.documentElement.scrollTop || document.body.scrollTop
			},
			_getClientWidth: function() {
				var e;
				if (window.innerWidth) e = window.innerWidth;
				else if (document.body && document.body.clientWidth) e = document.body.clientWidth;
				if (document.documentElement && document.documentElement.clientWidth) e = document.documentElement.clientWidth;
				return e
			},
			_getClientHeight: function() {
				var e;
				if (window.innerHeight) e = window.innerHeight;
				else if (document.body && document.body.clientHeight) e = document.body.clientHeight;
				if (document.documentElement && document.documentElement.clientHeight) e = document.documentElement.clientHeight;
				return e
			},
			_setPosition: function() {
				if (isNaN(this.left) || isNaN(this.bottom)) return false;
				var e = this.left + "|" + this.bottom;
				i("v_pos", e, 60)
			},
			_isMobile: function() {
				var e = window.navigator.userAgent,
					t = ["iPad", "Android", "iPhone", "iPod"],
					i = false;
				for (var n = 0, a = t.length; n < a; n++) if (e.indexOf(t[n]) !== -1) {
					i = true;
					break
				}
				return i
			}
		})
	});
	define("YoukuPlayer", [], function() {});
	define("page/find/play/player/h5player", ["tui/view", "tui/cookie", "tui/net", "tui/util/url", "module/login/login", "tui/util/codec", "module/responsive"], function(e, t, i, n, a, r, o) {
		var s = null;
		var l = e.extend({
			events: {
				"click .switch-flash": "switchToFlash"
			},
			initialize: function(e) {
				l.superClass.initialize.call(this);
				var t = 'spvdiv,spvli,spvul{display:block;margin:0;padding:0}spvli,spvul{list-style:none}spvdiv.spv_load_first{width:100%;height:100%;position:absolute;left:0;top:0;z-index:2000;display:flex;background:#000;align-items:center;justify-content:center}spvdiv.spv_load_img{display:inline-block;width:44px;-webkit-animation-name:loadingAnimations;-webkit-animation-duration:.8s;-webkit-animation-iteration-count:infinite;-webkit-animation-timing-function:linear}spvdiv.spv_video_container{height:100%;display:flex;align-items:center}spvdiv.spv_player{position:absolute;width:100%;height:100%;left:0;top:0}spvdiv.spv_player :not(input),spvidv{-moz-user-select:-moz-none;-khtml-user-select:none;-webkit-user-select:none}spvdiv.spv_background{position:absolute;width:100%;height:100%;left:0;top:0}spvdiv.spv_background:before{top:0;height:75pt;background-image:linear-gradient(to bottom,rgba(0,0,0,.75),hsla(0,0%,100%,0))}spvdiv.spv_background:after,spvdiv.spv_background:before{position:absolute;left:0;right:0;display:block;content:"";width:100%}spvdiv.spv_background:after{bottom:0;height:125px;background-image:linear-gradient(to top,rgba(0,0,0,.75),hsla(0,0%,100%,0))}spvdiv.spv_poster{width:100%;height:100%;background-position:center center;background-repeat:no-repeat;background-size:cover}spvdiv.spv_header{position:absolute;top:0;left:0;display:flex;justify-content:space-between;width:100%;padding:20px;z-index:109;box-sizing:border-box;color:#fff;display:none}spvdiv.spv_percent{cursor:pointer}spvdiv.spv_100percent,spvdiv.spv_50percent,spvdiv.spv_75percent{position:relative;display:inline-block;margin:0 10px;font-size:14px}spvdiv.spv_scale_current{color:#2fb3ff}spvdiv.spv_dashboard{position:absolute;bottom:0;left:0;width:100%;z-index:110;display:none}spvdiv.spv_progress{position:relative;display:flex;align-items:center;height:20px;margin:0 10px;cursor:pointer;padding-bottom:4px}spvdiv.spv_progress_container{position:relative;width:100%;height:3px;background:hsla(0,0%,52%,.5);border-radius:3px}spvdiv.spv_progress_hover .spv_progress_container{height:5px}spvdiv.spv_progress_hover input.spv_progress_range{display:block}spvdiv.spv_progress_load{position:absolute;z-index:10;height:100%;background:#858585;border-radius:3px}spvdiv.spv_progress_play{position:absolute;z-index:11;height:100%;background:red;border-radius:3px}input.spv_progress_range{display:none;position:absolute;-webkit-appearance:none;width:100%;height:100%;margin:0;padding:0;background:0 0;z-index:12}input.spv_progress_range:focus{outline:0}input.spv_progress_range::-webkit-slider-runnable-track{background:0 0}input.spv_progress_range::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;background:red;border-radius:100%;border:7px solid #fff;cursor:pointer}input.spv_progress_range::-moz-focus-outer{border:0}input.spv_progress_range::-moz-range-track{background:0 0}input.spv_progress_range::-moz-range-thumb{width:6px;height:6px;background:red;border-radius:100%;border:7px solid #fff;cursor:pointer}input.spv_progress_range::-ms-track{background:0 0}input.spv_progress_range::-ms-thumb{width:6px;height:6px;background:red;border-radius:100%;border:7px solid #fff;cursor:pointer}spvdiv.spv_icon_panel:hover{color:#2692ff}spvdiv.spv_controls{display:flex;justify-content:space-between;height:30px;padding:0 10px 10px}spvdiv.spv_icon,spvdiv.spv_left_controls,spvdiv.spv_right_controls{display:flex;align-items:center}spvdiv.spv_icon{cursor:pointer;float:left}spvdiv.spv_icon_pause,spvdiv.spv_icon_play{width:30px;height:30px;margin-right:20px}spvdiv.spv_icon_pause{display:none}spvdiv.spv_icon_next{width:1pc;height:30px;margin-right:20px}spvdiv.spv_next_disabled{display:none}spvdiv.spv_icon_full,spvdiv.spv_icon_half,spvdiv.spv_icon_set{width:17px;height:30px;margin-left:20px}spvdiv.spv_icon_half{display:none}spvdiv.spv_icon_mute,spvdiv.spv_icon_volume{width:25px;height:17px;margin-left:20px}spvdiv.spv_icon_mute{display:none}spvdiv.spv_icon_language,spvdiv.spv_icon_quality,spvdiv.spv_icon_select,spvdiv.spv_icon_tv{height:30px;line-height:30px;margin-left:20px;color:#fff;font-size:14px}spvdiv.spv_icon_language,spvdiv.spv_icon_tv{display:none}spvdiv.spv_time{font-size:9pt}spvdiv.spv_time_current{display:inline;color:#dedede}spvdiv.spv_time_duration,spvdiv.spv_time_split{display:inline;color:hsla(0,0%,87%,.4)}spvdiv.spv_volume{position:relative;display:flex;align-items:center;height:7px;width:70px;margin-left:10px;cursor:pointer}spvdiv.spv_volume_slider{position:absolute;width:100%;height:2px;background:hsla(0,0%,100%,.3)}spvdiv.spv_volume_slider_hover input.spv_volume_range{display:block}spvdiv.spv_volume_current{position:absolute;height:2px;background:#4cb7ff}input.spv_volume_range{display:none;position:absolute;-webkit-appearance:none;width:100%;height:100%;margin:0;padding:0;background:0 0;z-index:12}input.spv_volume_range:focus{outline:0}input.spv_volume_range::-webkit-slider-runnable-track{background:0 0}input.spv_volume_range::-webkit-slider-thumb{-webkit-appearance:none;width:10px;height:10px;background:#fff;border-radius:100%;cursor:pointer}input.spv_volume_range::-moz-focus-outer{border:0}input.spv_volume_range::-moz-range-track{background:0 0}input.spv_volume_range::-moz-range-thumb{width:10px;height:10px;background:#fff;border-radius:100%;cursor:pointer}input.spv_volume_range::-ms-track{background:0 0}input.spv_volume_range::-ms-thumb{width:10px;height:10px;background:#fff;border-radius:100%;cursor:pointer}spvdiv.spv_setting_1080,spvdiv.spv_setting_panel{padding:10px;background:rgba(0,0,0,.8);color:#fff;font-size:9pt;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:261px;height:248px;z-index:112;display:none}spvdiv.spv_setting_1080{display:none}spvdiv.spv_1080_title,spvdiv.spv_setting_title{position:relative;padding-bottom:10px;margin-bottom:5px;border-bottom:1px solid hsla(0,0%,100%,.4)}spvdiv.spv_1080_title{border-bottom:none}spvdiv.spv_1080_close,spvdiv.spv_setting_close{position:absolute;top:0;right:0;line-height:17px;font-size:20px;cursor:pointer}spvdiv.spv_1080_close{width:20px}spvdiv.spv_setting_box{display:flex}spvdiv.spv_setting_continue,spvdiv.spv_setting_jump,spvdiv.spv_setting_language,spvdiv.spv_setting_quality_current,spvdiv.spv_setting_quality_default{display:flex;justify-content:flex-start;padding:5px 0}spvdiv.spv_setting_tit{padding:2px 0;margin-right:5px}spvdiv.spv_setting_con{padding:2px 10px;border-radius:3px;cursor:pointer}spvdiv.spv_setting_con_current{background:#00aae5;color:#000}spvdiv.spv_setting_con_disable{color:#5e5e5e;cursor:not-allowed}spvdiv.spv_1080_confirm,spvdiv.spv_setting_confirm{display:flex;justify-content:center;padding-top:10px}spvspan.spv_1080_vip{color:#00aae5}spvdiv.spv_1080_confirm{padding-bottom:20px}spvdiv.spv_1080_submit,spvdiv.spv_setting_submit{margin:0 10px;padding:5px 15px;background:#00aae5;color:#000;font-size:14px;border-radius:3px;cursor:pointer}spvdiv.spv_1080_cancel,spvdiv.spv_setting_cancel{margin:0 15px;padding:5px 15px;background:#fff;color:#606060;font-size:14px;border-radius:3px;cursor:pointer}spvdiv.spv_1080_content{font-size:1pc;line-height:30px;padding:20px}spvdiv.spv_tips{position:absolute;bottom:65px;left:0;width:100%;padding:0 10px;z-index:109;display:flex;justify-content:space-between;box-sizing:border-box;color:#fff;font-size:15px;display:none}a.spv_tips_link,spvdiv.spv_tips_des{display:inline-block;color:#00aae5;cursor:pointer}spvdiv.spv_tips_des{color:#fff}spvdiv.spv_tips_close{font-size:20px;line-height:20px;cursor:pointer}spvdiv.spv_tips2{bottom:10px}spvdiv.spv_tips_top{z-index:900;bottom:0;line-height:2;padding:0 10px;background:rgba(0,0,0,.6)}spvdiv.spv_ad{width:100%;height:100%;position:absolute;left:0;bottom:0;display:none;z-index:800}spvdiv.spv_ad spvspan{color:red}spvdiv.spv_ad_box{height:100%;position:relative}spvdiv.spv_ad_tip{position:absolute;height:40px;font-size:1pc;line-height:40px;color:#454545;right:0;background:rgba(0,0,0,.6);color:#fff;width:90pt;z-index:801;text-align:center}spvdiv.spv_ad svg{float:left}spvdiv.ad_mute,spvdiv.ad_nomute{width:25px;height:17px;right:105px;top:0;padding:9pt 20px 11px}spvdiv.ad_nomute{display:none}spvdiv.spv_ad_count{padding:0 10px;right:175px;top:0}spvdiv.spv_ad_skip{width:75pt;cursor:pointer;top:0}spvdiv.spv_ad_more{bottom:60px;width:75pt;cursor:pointer}spvdiv.spv_ad_big{width:100%;height:100%;position:absolute;left:0;top:0}spvdiv.spv_tv_box{width:25pc;height:270px;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:none;background:rgba(0,0,0,.8);z-index:900}spvdiv.spv_tv_box .spv_relative{height:40px;background:#333}spvdiv.spv_tv_div{overflow:auto;background:#333;height:200px;padding:0 30px 30px;position:relative}spvspan.spv_tv_close{width:40px;right:0;color:#fff;text-align:center;font-size:9pt}spvspan.spv_tv_close,spvspan.spv_tv_sel{height:40px;position:absolute;top:0;display:block;line-height:40px}spvspan.spv_tv_sel{width:60px;left:30px;color:#bbb;font-size:14px}spvdiv.spv_tv_div spvul{background:#000;height:200px;color:#fff;list-style:none;overflow:auto}spvdiv.spv_tv_div spvli{line-height:26px;height:26px;border-bottom:1px solid #d4d4d4;list-style:none;padding:0 10px;font-size:14px;cursor:pointer}spvdiv.spv_tv_div .spv_tv_li_current{background:#00aae5}spvdiv.spv_relative{position:relative}spvdiv.spv_code{height:100%;position:absolute;left:0;bottom:0;z-index:102;width:100%;display:none}spvdiv.spv_code .spv_relative{height:100%}spvdiv.spv_code_base{width:300px;height:40px;line-height:40px;position:absolute;right:40px;text-align:right;color:#fff;font-size:1pc}spvdiv.spv_code_tip{top:5pc}spvdiv.spv_code_des{bottom:5pc}spvdiv.spv_shadow{position:absolute;left:0;bottom:0;width:100%;height:100%;-webkit-tap-highlight-color:transparent;z-index:105}spvdiv.spv_exclusive,spvdiv.spv_logo{position:absolute;width:150px;height:45px;max-height:54px;max-width:196px;right:3%;top:1%;display:none}spvdiv.spv_little{display:none;border-radius:5px;width:100%;height:40px;position:absolute;bottom:75pt;line-height:40px;text-align:center;color:#fff;left:0;z-index:100}spvdiv.spv_little_tip{display:inline-block;padding:0 10px;text-align:center;background:rgba(0,0,0,.7);border-radius:5px}spvdiv.spv_block{display:none;z-index:109}spvdiv.spv_block,spvdiv.spv_limit_info{position:absolute;top:0;left:0;align-items:center;justify-content:center;width:100%;height:100%;background:#000}spvdiv.spv_limit_info{display:flex;z-index:80}spvdiv.spv_limit_panel{padding:10px;text-align:center;color:#fff;font-size:14px;z-index:19}spvdiv.spv_limit_tit{padding:10px 0;font-size:1pc;line-height:1.7}spvdiv.spv_limit_desc{padding:20px 0;line-height:1.7;text-align:center}spvdiv.spv_limit_span{display:inline-block;vertical-align:top;text-align:left}spvdiv.spv_limit_type{margin:0 5px;display:inline-block;color:#f60}spvdiv.spv_limit_option{padding:10px 0}a.spv_limit_action{background:#f60;color:#fff;text-decoration:none}a.spv_limit_action,spvdiv.spv_limit_submit{display:inline-block;padding:5px 15px;border-radius:3px;cursor:pointer}spvdiv.spv_limit_submit{background:#00aae5}a.spv_limit_conact{display:inline-block;background:#f60;padding:5px 15px;border-radius:3px;cursor:pointer;color:#fff;text-decoration:none}a.spv_limit_link{padding:0 10px;color:#999}input.spv_limit_password{width:75pt;height:28px;margin:0;padding:0;text-align:center;border:1px solid #333}spvdiv.spv_error{position:absolute;top:0;left:0;display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#000}spvdiv.spv_error_panel{padding:10px;text-align:center;color:#fff;font-size:14px;z-index:19}spvdiv.spv_error_tit{padding:10px 0;font-size:18px}spvdiv.spv_error_option{padding:10px 0}spvdiv.spv_error_action{display:inline-block;background:#19355c;color:#cde4ff;border:1px solid #2d5275;padding:5px 10px;margin-left:10px;border-radius:3px;cursor:pointer}spvdiv.spv_error_action_red{color:#f60}spvdiv.spv_error_other{padding:10px 0;color:#ccc}a.spv_error_contact,spvdiv.spv_error_download{display:inline-block;margin:0 5px;color:#fff;cursor:pointer}spvdiv.spv_vip_info{left:0;top:0;height:100%;z-index:1000;background:#000;text-align:center;line-height:1.5}spvdiv.spv_tipbar,spvdiv.spv_vip_info{width:100%;position:absolute;display:none;font-size:13px;color:#bababa}spvdiv.spv_tipbar{bottom:50px;background:rgba(0,0,0,.5);text-align:left;text-indent:20px;z-index:1001}spvdiv.spv_subcribe{width:100%;left:0;top:0;height:100%;z-index:1000;background:#000;font-size:13px;color:#bababa;line-height:1.5}spvdiv.spv_prompt,spvdiv.spv_subcribe{position:absolute;display:none;text-align:center}spvdiv.spv_prompt{width:5pc;height:45px;bottom:44%;left:50%;margin-left:-50px;z-index:20;color:#bbb;line-height:22px;padding:5px 10px;background:rgba(0,0,0,.8)}spvdiv.spv_prompt_time{color:#bbb;line-height:22px;font-size:14px}spvdiv.spv_prompt_arrow{text-align:right;font-size:14px;z-index:20}spvdiv.spv_password{position:absolute;left:0;bottom:0;width:100%;height:100%;z-index:600;display:none;border:none}spvdiv.spv_password_c{position:relative;height:100%;text-align:center}spvdiv.spv_password_tip{display:inline-block;font-size:1pc;vertical-align:middle;padding-top:75pt;color:#a8a8a8}spvdiv.spv_password_input{display:inline-block;width:300px;vertical-align:middle;margin-top:5px}spvdiv.spv_password_txt{width:200px}spvdiv.spv_password_btn,spvdiv.spv_password_txt{height:30px;line-height:30px;vertical-align:middle}spvdiv.spv_password_btn{width:80;border-radius:5px;color:#000;background:#fff;color:#666;background-color:#eee;border-color:#eee;font-weight:300;font-size:1pc;text-decoration:none;text-align:center;padding:0 5px;display:inline-block;appearance:none;cursor:pointer;border:none;box-sizing:border-box;margin-left:10px}-webkit-user-select:none;-webkit-touch-callout:none;-webkit-backface-visibility:hidden;video::-webkit-media-controls,video::-webkit-media-controls-panel,video::-webkit-media-controls-play-button,video::-webkit-media-controls-volume-slider-container{display:none}video::-webkit-media-controls-current-time-display,video::-webkit-media-controls-mute-button,video::-webkit-media-controls-timeline,video::-webkit-media-controls-volume-slider{display:none}video::-webkit-full-page-media::-webkit-media-controls-panel,video::-webkit-media-controls-seek-back-button,video::-webkit-media-controls-time-remaining-display,video::-webkit-media-controls-timeline-container{display:none}video::-webkit-media-controls-fullscreen-button,video::-webkit-media-controls-return-to-realtime-button,video::-webkit-media-controls-rewind-button,video::-webkit-media-controls-seek-forward-button{display:none}video::-webkit-media-controls-start-playback-button,video::-webkit-media-controls-toggle-closed-captions-button{display:none}video::-webkit-slider-thumb{display:none}spvdiv.spv_recommend_replay{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABVCAIAAAAkH4qvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyM0YzNDgwODNFRDkxMUUzQUE4NkUyOUY3Nzk4MzdCRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyM0YzNDgwOTNFRDkxMUUzQUE4NkUyOUY3Nzk4MzdCRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI2QkMxQ0UxM0VENzExRTNBQTg2RTI5Rjc3OTgzN0JFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI2QkMxQ0UyM0VENzExRTNBQTg2RTI5Rjc3OTgzN0JFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+viL3agAAB1VJREFUeNrsm2lIFG8cx1s7xG7QLUhNig5EUekwqegAiw4oIrIgLTSlwwIriigo0gi7oCgyQrqDIntRvVA70EIsrxCPDjaI1DLBLDe3MqP+X3rg+T/Mzq6zHbvu9v2+WJ55Zp7Znefz/K6ZWVN8fHwvypvlxykgQooIKSIkQooIKSKkiJAIKSKkiJAiQiKkiJAiQooIiZAiQooIKSIkQooIKSKkiJAIKSKkPKA+Hvxuk8kUHR0dGxs7fvz4kJCQgQMH+vn52Wy25uZmi8VSVVVVXl7e1dVFSN1Mo0f+U+Hv779w4cKlS5cOGzbMyWEdHR23bt26fv16e3s7UfUghLC8LVu2jBgxwuDxVqs1Jyfn7t27pKWr3qNHj3bn9y1fvnz79u2DBw92yWSnT59uNpsrKiq+f/9OZp6MhampqUCo6Xz//j3YPH/+vK2tDYSGDBkybty4uLi4oKAg9bD58+cD/L59+759+0ZsnnGkiHzr1q1Te968eXPu3Ln79+/b25bIdFJSUsLDw9X+wsLCw4cPE5tbHWlAQAAIjR07dteuXUg4ZX9+fv7u3btfvHjx48cP3YFv374tKCjo7OyMiYkBUdE5ZswYgH/58qVHJgvfnpCQ8OHDBziMf8iRZmdnDxgwAJz69Pn/uy5evHjhwoVux2LU1atXwXLnzp0S//r168vKypCsGplxex8zfPhwhFVN58iRI7HU3r17t2LFCicnDA0NhS+Bz8fKCwwMjIqKEv0oiuQxo0aNwvWKc8LBHDlyxOsRYmrCwsLUHuSWRvhJYSIw72lpaWITwRLzeP78+W4HYqIzMjLUHphvS0uLcM7FxcWyH3XLL1waFhY+P3/+3NDQIEA2NjailhV7Hz169PTpUx8s7ZGM5Obmujrq2rVrSEplXFy0aNHly5eN5DUbN26074yMjMTnqVOnfudCYLI7duxITk7es2cP2ui5c+cOvEtRURHaiPpwudjrgwjhTo8fP47LtlgsxkfBo545c+bQoUNiE6nppEmTsMydDJk4caKjGYSLw+eJEyd09+K0ly5d0nQmJiYiSe7fvz/aSUlJcAM4DOEcPWfPnt27d29VVZU8GFeHBQc/IdD6GkKoq6vry5cvro6qrq5+/fp1cHCw2OwWYXt7e11dne4uUa442otvMW6I27ZtAz+1EzESsRbr48aNGz5SVJw+fRoRXrQRNq5cuZKXl/f169dfONWGDRuWLFki2vX19Zo4pys16ZCCGYmUStNfU1Pj3G5mz56N+Ld//354S0BSsxhHQu6j68y9zwrhCZE+IPz8TjqO9ES2Q0JCjAwBP5F0OEpGVAk2Bn8M/Ke8xyTWBPJVpEULFiyAU33w4IHYZbVavd6RIkmD58Sa/f30DAWZbIvE3aDmzJmjboooqDEOJCPGTwhzFLBh5TgPPDPcKcon2ByqndWrVyNGHjx40EdiYVZWlseLX81dIRELNZ3GtXbtWpAT5pWeno5PNZ1BKoRounnzZpgpyiFERNV5+Eg688saOnSobNtsNjffl1m8ePHMmTPR/vTpE4LCrFmz5s2b9/jxY2ltMEHBFQaKsArrxAGTJ08G5r9qjt6EEPMo201NTcYHakpA3boQdYKTM6SlpU2YMAEkAgICkAchMUbMQ4yAP1cz0uSfUu8YgOvfdqfehBArWje16VaaEtB5Xair0tLSgoICmQTBW6IoFPBkcYJFUFJS0tLSIjZhpsIifaQu7Nev39y5c/v27YtLUrMS44qJiVGz0MrKSuNjNSWgbl3ovEIQRR6yGLUoFCeR1gyESEQlM2HrvlPaY/FOmzYNjWXLlqWmpiKcuFa9mkwpKSly8+PHjwYRIibZlwq6jhQeDwe7el0wNRWVuHEjbd3R3QOvRBgXFycaZrN506ZNBw4ccGk4wKsPDm/evGnwwa/wdZo458iR4jBXy/DW1lbJCXb86tUr6Ug1j6y9HuGzZ88iIiJEOz4+Hmm3/X1IR5oxY8aaNWvUO2fGHyzo2oHzG2wu6R9ypDk5OUePHpWPDFH8whxPnjzZ2dnp3H8mJCTAharPinEqOFIj6WtoaCjco/2u2NhY4Tl1a3bkmcZzJXBS60usNhlTfc0KMV+5ubnq1SIpR4bi6osXt2/fvnfvnpFvhK07rxMc3XiDidsjxC8HLUEFjFWDltaGazT/lNgUjzXcILe+hIjqClal6WxraysvL7dYLPL1JxjQ1KlT7Vfxw4cPMzMzPfL6k3jYJO7DyUcQW7duReRzFBGc7/VWhNDKlStXrVqlOkaDKiwshCvm62v2cvd7pLW1tUgB4HwGDRpkcIjVaj127BiWM18i7REIe/18NS0/Px9gwsLCnD9wsNlsiEzZ2dlPnjwhqp7iSO1zlilTpiCLCw4Ohl3CwXZ0dDQ3NyOhQPHOv8X0dITUHxH/X0iEFBFSREiEFBFSREgRIRFSREgRIUWEREgRIUWEFBESIUWEFBFSREiEFBFSREgRIRFSREh5Qib3/y2G+rP6T4ABAAVLXwkPNOfgAAAAAElFTkSuQmCC);background-repeat:no-repeat}spvdiv.spv_recommend{position:absolute;left:0;top:0;width:100%;height:100%;background:#222;overflow:hidden;display:-moz-box;display:-webkit-box;display:box;-webkit-box-align:center;-moz-box-align:center;-webkit-box-pack:center;-moz-box-pack:center;z-index:1000;display:none}spvdiv.spv_recommend_parent{display:table;height:100%;width:100%}spvdiv.spv_recommend_page{width:auto;height:auto;text-align:center;padding:30px;display:table-cell}spvdiv.spv_recommend_item,spvdiv.spv_recommend_page{overflow:hidden;position:relative;vertical-align:middle}spvdiv.spv_recommend_item{z-index:10;width:150px;height:85px;margin:0 9pt 9pt 0;display:inline-block;padding:0}spvdiv.spv_recommend_img{list-style:none;height:100%;display:block}spvdiv.spv_recommend_title{z-index:10;position:absolute;left:0;bottom:0;width:100%;height:40px;overflow:hidden;text-align:left;padding:0 1px;font-size:14px;font-weight:400;color:#fff;text-shadow:1px 1px 1px #000}spvdiv.spv_recommend_bg{z-index:1}spvdiv.spv_private,spvdiv.spv_recommend_bg{position:absolute;left:0;bottom:0;height:100%;width:100%}spvdiv.spv_private{z-index:600;display:none;background:#000}spvdiv.spv_private_c{position:relative;height:100%}spvdiv.spv_private_tip{width:300px;margin:0 auto;padding-top:75pt;font-size:1pc;vertical-align:middle;text-align:center;color:#a8a8a8}spvdiv.spv_playload{position:absolute;left:50%;top:50%;width:44px;height:44px;margin-left:-22px;margin-top:-22px;-webkit-animation-name:loadingAnimations;-webkit-animation-duration:.8s;-webkit-animation-iteration-count:infinite;-webkit-animation-timing-function:linear;display:none}spvdiv.spv_load_img,spvdiv.spvimg{height:44px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAAAABAAAAAQE4IvRAAAAAJHpUWHRDcmVhdG9yAAAImXNMyU9KVXBMK0ktUnBNS0tNLikGAEF6Bs5qehXFAAAFkElEQVRYhe2ZW4hVVRjHf9+3tuPYJE1WikwqJXjBSksxaFKHisoUg3oIoR4qKsy0ZDLwJYouECWEWikVEXQhfIksrYiYisxCM7tZVmrmVKYVXrBxZq/19XDOHvfZZ5+ZsebM6aE/LDZ7n8Vav/3f3/rW5cD/qq7kRCq3LA8KnAEE4EBbq1pVqHpQn4FnLvcTVPQOzM6lALwRWN3Wqj9VjS5HvQKPW2mDG4NdPiRmrcDgzM+7gEvaWnV3VehypL1VcGYLNPB0DizAWcDiluUh6n+0fFXsaNwKOxVhmQpLI99jqDYDTcCP/Q2Xp8rOCMtEWSC9R7krlgFRGfC4FVaPcLsoS8VBUPBdEIWKbXwP/FpNyLTKYliEmaK0StE3c9AxpKLNwYSn2lr1aFUpUyr5lONX2TAcr4pjjDgQBXEQ6iDUCWogAqZgju1BbeH7S9yGgYKFVEiMX2WKcqsoY1GgCJuUzkEQnyQ4w9R4K+qyezqCfjWQsCXAOKaKcIso4EphE6fNYV551CsPb56nBwcatgRYhLkoY8iCFl+Awv16lIe2zZNDtYCF4kw3YY2dJMIuHMOzriaDTxwfIdywbZ78UCtYKDosSjNahE3Fb8pZEFaJsLOWsADRxGdNEa5JPn86djnu9CaUlz6bc0KLu+oAizAMYXx6sOEouFyADSgv/BdgASIcZ4pwZomzpU7vRNhYa9BEkSiNKI2Jq2QGG0q7CO21xTyuSBxDUYZqTv4twreLsL/WoIkiUQajDCYD2u20cmDLpTLgW6FKiiRCECSdf3Ggx7NEV60h01JRgjhCkn/JpjSlscaMJVIch0Q5JJn4TXIyESOnb7KGWoMmUlEOi+MwadDUTCeOkeIYWWvQRJE42lHaxTGqwkw3TpTzKOwsqqbZK20CcDUwA+gA3gDWb1gk+9L1FOU3cbRnFzupma4Bx9wqw44CXgYeAuYA1wJPAE/MXmkl2zjdeqUcE2V9XvwmRSOub95uk6oE2wA8BkyhdAc0pAh+5+yV1r0uKOzpHG+Lw+fNdMXsMQil9eLv7OT+Bg7KWIPJPVRpAboHvQJsaZG9oqzNZgotdXq+RNw1c4/12ypoyjrj8CnMDY6xPVQbAtSVAANIxFpxhfRGKienskc9SqsoV836+d9DT1lnWOCyjnqWeFf5fCTAfqB7h3N8m18Ii9eS+NX8mG4Ux/MiLJm11/KOrvoKW2eBRQRe7ILTj9RDngUe+B3aNiySuAz442lyBOVxHJ2Zma7EaYTTLHC/BR6YsdtOOD9Ped1GmHEfgQfNMxwPRwfBwXrwKehO4AB0HjJKjhHK3qt5uy1DuVeU+vTg0wIs5kvK7xbzmMW0medLCxzZdH5pk1PfMSzQYJ5JBFqC5248Z2TawTwQQ9QFIUBnoAPjkR2L5b50e+WxozwnykXimJvZ02GhrJPTLPCgGe0W+MI830zfZJ9b4E9iLHhOJWaSGRMxJlugiUCUB5uUY0bh9Nl4F1iTxcsdPDN22rBiTF8giogWYeOcTnKe4SHExWvxvqf6meeGsRW4YsdiOVDuZ44+OFv+EMdCUT7rhs0AdV9D4Zou5gsuWRa2Qkm3h7ENWJgHW9HhRC37bIR5XjLPxRZTV8mZtJPd17gCbGWHOzE+BObvWFy6fujV4URtI2SfeW4yz5PmMfIcyXO9F2dz2zFWAzf2BNurw2k1f2tzzHOneVrMMygZ1Vln+xinSYnxtJmxYsciWdcXjj7/N2Ge9QQ+xXMdnpvxnJPEb5mj5dkkz9mvCTxjxisYv/SV4x9NsRd+YhJirsQzxzzTzdNknhHmcRXcDRbzm3n24tlsgXXmefPbhVL5XL8/gRNNe88Uz+gQaCJmTPCMtpgm8zRYDAT+Cp52Anusix8tsNc8e765Tfw/7fNv2cjcLHR9l5wAAAAASUVORK5CYII=);background-repeat:no-repeat}@-webkit-keyframes loadingAnimations{12.5%{-webkit-transform:rotate(45deg);transform:rotate(45deg)}25%{-webkit-transform:rotate(90deg);transform:rotate(90deg)}37.5%{-webkit-transform:rotate(135deg);transform:rotate(135deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}62.5%{-webkit-transform:rotate(225deg);transform:rotate(225deg)}75%{-webkit-transform:rotate(270deg);transform:rotate(270deg)}87.5%{-webkit-transform:rotate(315deg);transform:rotate(315deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}';
				this.$el.append('<style style="type/css">' + t + '</style><a class="switch-flash" href="javascript:;">切回旧版播放器</a><div class="h5-wrap"><div id="ykPlayer"></div></div>');
				var n = this,
					a;
				a = this.getCfg();
				i.getScript("//g.alicdn.com/ku/youkuplayer/0.4.14/youku-player.min.js", function() {
					require("YoukuPlayer", function(e) {
						var t = $.extend(a, {
							vid: PageConfig.videoId2,
							ccode: "0502",
							autoplay: true,
							events: {
								onReady: function() {
									n.trigger("loadedH5:sucess", [s])
								}
							}
						});
						n.h5Player = s = new e($("#ykPlayer")[0], t)
					})
				})
			},
			getCfg: function() {
				var e = {},
					i = {},
					a = n.params() || {};
				if (void 0 != a.adext) e.adext = a.adext;
				if (window.PageConfig) {
					e.playmode = PageConfig.playmode;
					if (PageConfig.folderId) {
						e.Fid = PageConfig.folderId;
						e.Pt = PageConfig.fpos;
						e.Ob = PageConfig.forder;
						i.plchid = PageConfig.folderCateWord || ""
					}
					var o = document.referrer;
					if ("" == o) o = document.URL;
					var s = document.createElement("A");
					s.href = o;
					var l = ["", PageConfig.videoId, s.hostname, s.pathname];
					embedid = r.encode64(l.join(""));
					i.embedid = embedid;
					i.frame = PageConfig.logFrame;
					if (5 == PageConfig.playmode || 4 == PageConfig.playmode) {
						var d = 4 == PageConfig.playmode ? "W_P_L_M" : "P_L_M";
						var c = t(d);
						var u = t("P_F");
						if (1 == u) {
							switch (c) {
							case "1":
								var f = 12;
								break;
							case "2":
								var f = 10;
								break;
							case "3":
								var f = 11
							}
							if (f) i.pb = f
						}
					}
					e.vvlogconfig = i
				}
				return e
			},
			switchToFlash: function() {
				var e = n.params();
				e.debug = "flv";
				goldlog && goldlog.record("/yt/youkuplayer.fdl.page_error", "CLK", "degradetype=2&vid=" + PageConfig.videoId, "H1505507054");
				location.href = "//" + location.host + location.pathname + "?" + $.param(e)
			},
			callPlayerFunction: function() {},
			show: function() {
				s.selector.style.cssText = "width:100%;height:100%"
			},
			hide: function() {
				s.selector.style.cssText = "position:relative;top:-999999px;width:100%;height:100%"
			},
			check: function(e) {
				var e = e || "pauseVideo";
				return "function" == typeof s[e]
			},
			PlayerSeek: function(e) {
				e = isNaN(parseInt(e)) ? 0 : parseInt(e);
				if (this.playerStart && s) s.seek(parseInt(e))
			},
			PlayerContinuous: function(e) {
				s && s.setPlayerConfig({
					continuePlay: e
				})
			},
			PlayerColor: function(e, t, i) {
				return s.PlayerColor && s.PlayerColor(e, t, i)
			},
			showControlBar: function(e) {
				if (e) s.UIControl.controlShow();
				else s.UIControl.controlHide(true)
			},
			setLight: function(e) {},
			setPlayHeadSkin: function(e) {},
			setPlayerLoop: function(e) {
				s && s.setPlayerLoop(e)
			},
			PlayerPause: function(e) {
				if (s) s[e ? "play" : "pause"]()
			},
			PlayerInfo: function() {
				return s.getPlayerInfo()
			},
			getPlayerState: function() {
				return s.getPlayerState()
			}
		});
		return l
	});
	define("page/find/play/util/swfobject", function() {
		var e = "undefined",
			t = "object",
			i = "Shockwave Flash",
			n = "ShockwaveFlash.ShockwaveFlash",
			a = "application/x-shockwave-flash",
			r = window,
			o = document,
			s = navigator,
			l = function() {
				var t = typeof o.getElementById != e && typeof o.getElementsByTagName != e && typeof o.createElement != e,
					i = s.userAgent.toLowerCase(),
					n = s.platform.toLowerCase(),
					a = n ? /win/.test(n) : /win/.test(i),
					r = n ? /mac/.test(n) : /mac/.test(i),
					l = /webkit/.test(i) ? parseFloat(i.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
					d = [0, 0, 0],
					c = false,
					u = false,
					f = false,
					p = false,
					m = false,
					h = null;
				var v;
				(v = i.match(/msie ([\d.]+)/)) ? c = v[1] : (v = i.match(/firefox\/([\d.]+)/)) ? u = v[1] : (v = i.match(/chrome\/([\d.]+)/)) ? f = v[1] : (v = i.match(/opera.([\d.]+)/)) ? p = v[1] : (v = i.match(/version\/([\d.]+).*safari/)) ? m = v[1] : 0;
				return {
					ie: c,
					win: a,
					mac: r,
					safari: m,
					chrome: f
				}
			}();

		function d(t, i, n, a) {
			var r = document.getElementById(n);
			if (r) {
				if (typeof t.id == e) t.id = n;
				var o = "";
				for (var s in t) if (t[s] != Object.prototype[s]) if ("data" == s.toLowerCase()) i.movie = t[s];
				else if ("styleclass" == s.toLowerCase()) o += ' class="' + t[s] + '"';
				else if ("classid" != s.toLowerCase()) o += " " + s + '="' + t[s] + '"';
				var d = "";
				for (var c in i) if (i[c] != Object.prototype[c]) d += '<param name="' + c + '" value="' + i[c] + '" />';
				var u = "";
				if (l.ie && l.win) {
					u = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ' + o + ">" + d;
					if (a) u += '<div class="player_html5"><div class="picture"style="height:100%"><div style="line-height:460px;"><span style="font-size:18px">您还没有安装flash播放器,请点击<a href="https://get.adobe.com/flashplayer/" target="_blank">这里</a>安装</span></div></div></div>';
					u += "</object>"
				} else {
					u = '<object type="application/x-shockwave-flash" data="' + i.movie + '" ' + o + ">" + d;
					if (a) u += '<div class="player_html5"><div class="picture"style="height:100%"><div style="line-height:460px;"><span style="font-size:18px">您还没有安装flash播放器,请点击<a href="https://get.adobe.com/flashplayer/" target="_blank">这里</a>安装</span></div></div></div>';
					u += "</object>"
				}
				r.innerHTML = u;
				return
			}
		}
		return {
			ua: l,
			createSWF: function(i, n, a, r, o, s) {
				var l = {};
				if (n && typeof n === t) for (var c in n) l[c] = n[c];
				if (a && typeof a === t) for (var u in a) if (typeof l.flashvars != e) l.flashvars += "&" + u + "=" + a[u];
				else l.flashvars = u + "=" + a[u];
				return d(i, l, r, s)
			}
		}
	}());
	define("page/find/play/player/flashplayer", ["tui/view", "tui/cookie", "tui/net", "tui/util/url", "tui/util/codec", "tui/browser", "module/login/login", "page/find/play/util/swfobject"], function(e, t, i, n, a, r, o, s) {
		var l = null;
		var d = e.extend({
			playlistVids: [],
			playerNextVid: "",
			initialize: function(e) {
				d.superClass.initialize.call(this);
				var t = this,
					i;
				this.playerId = "movie_player";
				$("#qheader .g-header-container").prepend('<iframe class="mask" frameborder="0" scrolling="no" style="width:100%;height:81px;"></iframe>');
				$("#uerCenter .panel,.g-view .panel").prepend('<iframe class="mask" frameborder="0" scrolling="no" style="width:100%;height:100%;"></iframe>');
				this._loadflash();
				this.playerStart = false;
				l = document.getElementById("movie_player");
				i = setInterval(function() {
					if (t.check()) {
						t.trigger("player:loaded");
						clearInterval(i)
					}
				}, 50);
				$(document).bind("logchange", function() {
					o.checkLogin(function() {
						l.setLoginState && l.setLoginState(true, o.uid())
					})
				})
			},
			show: function() {
				l.style.cssText = "width:100%;height:100%"
			},
			hide: function() {
				l.style.cssText = "position:relative;top:-999999px;width:100%;height:100%"
			},
			check: function(e) {
				var e = e || "pauseVideo";
				return "function" == typeof l[e]
			},
			PlayerSeek: function(e) {
				e = isNaN(parseInt(e)) ? 0 : parseInt(e);
				if (this.playerStart) l.nsseek(parseInt(e))
			},
			recordPosition: function() {
				l.recordPosition()
			},
			PlayerContinuous: function(e) {
				l.setContinuous(e)
			},
			regComplete: function() {
				l.regComplete()
			},
			PlayerSeekMin: function(e, t) {
				t = isNaN(parseInt(t)) ? 0 : parseInt(t);
				e = isNaN(parseInt(e)) ? 0 : parseInt(e);
				var i = 60 * e + t;
				i = i - 4 > 0 ? i - 4 : i;
				l.PlayerSeek(i)
			},
			PlayerColor: function(e, t, i) {
				return l.setSkinColor(e, t, i)
			},
			setTHX: function(e) {
				if (l) l.setTHX(e)
			},
			showControlBar: function(e) {
				l.showControlBar(e)
			},
			setLight: function(e) {
				l.setLight(e)
			},
			setPlayHeadSkin: function(e) {
				l.setPlayHeadSkin(e)
			},
			setPlayerLoop: function(e) {
				l.setLoop(e)
			},
			PlayerPause: function(e) {
				try {
					l.pauseVideo(e)
				} catch (t) {}
			},
			playModeSet: function(e) {
				return l.playModeSet(e)
			},
			PlayerShowType: function(e) {
				e = void 0 == e ? 2 : e;
				return l.setShowType(e)
			},
			setFrameSeletor: function(e) {
				l.setFrameSeletor(e)
			},
			setFrameData: function(e) {
				l.setFrameData(e)
			},
			PlayerInfo: function() {
				return l.getNsData()
			},
			PlayerResume: function() {
				$("#ad_crazy").hide();
				l.PlayerResume()
			},
			PlayerPause4ad: function() {
				l.PlayerPause4ad()
			},
			AddInteract: function(e) {
				l.addInteract(e)
			},
			getPlayerState: function() {
				return l.getPlayerState()
			},
			sendMsg: function(e, t) {
				l.sendMsg && l.sendMsg(e, t)
			},
			callPlayerFunction: function(e, t) {
				l.pauseVideo(false);
				switch (e) {
				case "doInteract":
					l.doInteract(t);
					break;
				case "playerSubscribed":
					l.playerSubscribed(t);
					break;
				case "danmu":
					o.checkLogin(function(e) {
						e && l.setLoginState(true, o.uid())
					});
					break;
				default:
					l.doInteract(t)
				}
			},
			_bindCNAEvent: function() {
				var e = window.goldlog_queue || (window.goldlog_queue = []);
				var t = this;
				e.push({
					action: "goldlog.aplus_pubsub.subscribe",
					arguments: ["sendPV", function(e, i, n) {
						if ("complete" === e) if (t.check()) l.setPlayerCNA && l.setPlayerCNA(n.cna);
						else t.bind("player:loaded", function() {
							l.setPlayerCNA && l.setPlayerCNA(n.cna)
						})
					}]
				})
			},
			_getckey: function() {
				var e = "",
					t = "";
				if (window._getUA) e = _getUA();
				if (window.UA_Opt) {
					t = (UA_Opt.Token || "").split(":")[0];
					t = (new Date).getTime() - 1 * t;
					t = "#" + t
				}
				return e + t
			},
			_loadflash: function() {
				var e = {};
				var i = {};
				var o = window.navigator.userAgent.toLowerCase().indexOf("android") !== -1;
				e.allowFullScreen = true;
				e.allowscriptaccess = "always";
				e.allowFullScreenInteractive = "true";
				if (s.ua.safari) e.wmode = "opaque";
				i.skincolor1 = "ffffff";
				i.skincolor2 = "ffffff";
				i.VideoIDS = PageConfig.videoId2;
				i.ShowId = PageConfig.showid;
				i.category = PageConfig.catId;
				i.Cp = PageConfig.cp;
				if (location.href.indexOf("_sthd3") != -1) {
					i.quality = "1080p";
					i.sv = "true";
					e.wmode = "direct";
					e.bgcolor = "#000000"
				}
				if (PageConfig.playerUrl.indexOf("PanelDanmuYouku.swf") !== -1) {
					e.wmode = "direct";
					e.bgcolor = "#000000";
					i.sv = "true"
				}
				if (PageConfig.catId && "95" == PageConfig.catId && 5 != PageConfig.playmode) i.showloop = true;
				try {
					var d = n.params();
					if (d.firsttime) i.firsttime = d.firsttime;
					if (d.ev) i.ev = d.ev;
					if (d.lang) i.lang = d.lang;
					if (void 0 != d.adext) i.adext = d.adext
				} catch (c) {}
				i.unCookie = navigator.cookieEnabled ? 0 : 1;
				i.frame = PageConfig.logFrame;
				try {
					i.pvid = window.UrchinAplus.pvid
				} catch (c) {}
				i.uepflag = PageConfig.uepflag || 0;
				i.Tid = 0;
				i.VideoIDS = PageConfig.videoId2;
				i.isAutoPlay = true;
				i.playmode = PageConfig.playmode;
				if (PageConfig.removePlayerSideControl) i.show_ce = 0;
				else i.show_ce = 1;
				i.winType = o ? "touch" : "interior";
				if (PageConfig.folderId) {
					i.Fid = PageConfig.folderId;
					i.Pt = PageConfig.fpos;
					i.Ob = PageConfig.forder;
					i.plchid = PageConfig.folderCateWord || ""
				}
				var u = document.referrer;
				if ("" == u) u = document.URL;
				var f = document.createElement("A");
				f.href = u;
				var p = ["", PageConfig.videoId, f.hostname, f.pathname];
				embedid = a.encode64(p.join(""));
				i.embedid = embedid;
				if (navigator.userAgent.indexOf("MSIE") != -1) i.ikuison = "1";
				i.ysuid = t("__ysuid") || "";
				var m;
				var h = t("_bc") || "";
				m = "bc=" + h + "&pid=" + PageConfig.logPvid + "&unCookie=" + PageConfig.logUnCookie + "&frame=" + PageConfig.logFrame;
				if (PageConfig.folderId) m += "&type=1&fob=" + PageConfig.forder + "&fpo=" + PageConfig.fpos;
				else m += "&type=0";
				if ("正片" == PageConfig.showtype) m += "&svt=1&stg=" + PageConfig.stage;
				else if (PageConfig.showid) m += "&svt=0";
				var v = encodeURIComponent(t("cna") || "");
				m += "&cna=" + v;
				if ("" == v) this._bindCNAEvent();
				m += "&emb=" + embedid + "&dn=网页&hwc=1";
				if (navigator.userAgent.indexOf("Android") !== -1) m += "&mtype=adr";
				else m += "&mtype=oth";
				i.vext = encodeURIComponent(m);
				i.cna = v;
				i.ckey = encodeURIComponent(this._getckey());
				if (5 == PageConfig.playmode || 4 == PageConfig.playmode) {
					var g = 4 == PageConfig.playmode ? "W_P_L_M" : "P_L_M";
					var y = t(g);
					var _ = t("P_F");
					if (1 == _) {
						switch (y) {
						case "1":
							var b = 12;
							break;
						case "2":
							var b = 10;
							break;
						case "3":
							var b = 11
						}
						if (b) i.pb = b
					}
				}
				i.pageStartTime = window.logPageStartTime || (new Date).getTime();
				if (r.mac && r.chrome >= 54 && r.chrome < 55) var w = {
					data: PageConfig.playerUrl,
					width: "1",
					height: "1",
					id: this.playerId
				};
				else var w = {
					data: PageConfig.playerUrl,
					width: "100%",
					height: "100%",
					id: this.playerId
				};
				s.createSWF(w, e, i, "player", "6.0", true);
				if (r.mac && r.chrome >= 54 && r.chrome < 55) setTimeout(function() {
					l.style.width = "100%";
					l.style.height = "100%"
				}, 1e3)
			}
		});
		return d
	});
	define("page/find/play/player/load", ["page/find/play/player/flashplayer", "page/find/play/player/h5player", "tui/browser", "tui/cookie", "tui/art", "tui/event", "tui/util/url", "page/find/play/player/playerFixed", "page/find/play/player/playerCallbacks", "page/find/play/player/h5playerdanmu", "page/find/play/player/chest", "page/find/play/player/liveGuide", "page/find/play/interaction/iku"], function(e, t, i, n, a, r, o, s, l, d, c, u, f, p, m) {
		m.load = function() {
			(window.goldlog_queue || (window.goldlog_queue = [])).push({
				action: "goldlog.record",
				arguments: ["/yt/youkuplayer.fdl.ykplayer_pv", "EXP", "", "H1506430579"]
			});
			var i, n;
			var a = location.href;
			var r = o.params();
			var f = !! document.createElement("video").canPlayType;
			var n = "flv" === r.debug;
			if ("undefined" != typeof window.ActiveXObject) i = !! new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			else i = !! navigator.plugins["Shockwave Flash"];
			if (!n && f || !i) {
				window.ykPlyr = new t({
					el: "#player"
				});
				if (!i) $(".switch-flash").hide();
				ykPlyr.one("loadedH5:sucess", function(e) {
					l.h5Bind(e, ykPlyr);
					window.H5player = e;
					d(e);
					ykPlyr.bind("player:onPlayerStart", function() {
						new c
					})
				});
				$("#module_basic_playarea").addClass("spv-player");
				if (window.MediaSource && window.fetch) new u
			} else {
				window.ykPlyr = new e;
				l.swfBind(ykPlyr);
				new s({});
				if (!f) goldlog && goldlog.record("/yt/youkuplayer.fdl.page_error", "EXP", "degradetype=1&errortype=1&vid=" + PageConfig.videoId, "H1505507054")
			}
		}
	});
	require(["page/find/g", "tui/cookie", "module/responsive", "module/login/login", "page/find/play/player/load", "page/find/play/sideTool", "page/find/play/interaction/main", "page/find/play/advertisement", "page/find/play/relationlist/listall", "page/find/play/cms/cms", "page/find/play/interaction/interactionBottom", "page/find/play/sub", "page/find/play/relationlist/interest", "page/find/play/interac", "page/find/play/dmpool/dmpool", "page/find/play/authenPhone", "page/find/play/statistics"], function(e, t, i, n, a, r, o, s, l, d, c, u, f, p, m, h, v) {
		e.init();
		window.getVvlogextplay = function() {
			try {
				var e = encodeURIComponent($.param(window["UrchinAplus"]._yVvlogInfo()))
			} catch (t) {}
			return e
		};
		a.load();
		window.ykPlyr.bind("authenPhone", function(e, t) {
			h(e, t)
		});
		n.one("checklogin", function() {
			new m({
				iid: PageConfig.videoId,
				cid: PageConfig.catId,
				ouid: PageConfig.videoOwner,
				lid: PageConfig.folderId,
				aid: PageConfig.showid,
				ct: "1001",
				el: $("#bspoolBox")
			});
			new u
		});
		new r;
		var g = new s;
		var y = new l;
		new d;
		new c;
		new f;
		new p;
		y.bind("relationlist:loaded", function() {
			g.addrelationListAd()
		});
		!
		function() {
			var e = $("#module_cms_250496");
			if (!e.length) return;
			e.bind("cms:loaded", function() {
				var e = $("#db11AdBanner"),
					t, i;
				if (!e.length) return;
				i = (new Date).getHours();
				t = e.data("src").split("||");
				i = t.length >= i ? i : 0;
				t = t[i].split("##");
				height = e.data("height") || 100;
				e.html("<a target='_blank'  style='display:block;margin-bottom:20px;height:" + height + "px;background: url(" + t[0] + ") no-repeat center top;' href='" + t[1] + "'></a>")
			})
		}();
		window.catId = PageConfig.catId;
		if (window.cateStr) {
			var _ = 1 * PageConfig.folderId || 1 * PageConfig.showid;
			cateStr = cateStr + "-" + _ + "-" + PageConfig.videoId
		}
		var b = $(document.body);
		b.addClass("danmuoff");
		if (2 == PageConfig.playmode) b.addClass("page_list");
		if (1 == PageConfig.playmode) b.addClass("page_ugc");
		else new o;
		$("#oriLabelBox").bind("mouseenter", function() {
			$("#oriFrom").show()
		}).bind("mouseleave", function() {
			$("#oriFrom").hide()
		});
		var w = function(e) {
				if (e >= 1300) b.removeClass("yk-w970").addClass("page_thx yk-w1190");
				else b.removeClass("page_thx yk-w1190").addClass("yk-w970")
			};
		i.bind("responsed", function(e) {
			w(e);
			i.trigger("player:responsive", [e]);
			$("body").trigger("responsive", [e])
		});
		w(i.getCurWidth());
		v.init();
		$(function() {
			var e = "hidden" in document ? "hidden" : "webkitHidden" in document ? "webkitHidden" : "mozHidden" in document ? "mozHidden" : null;
			if (e && ykPlyr.sendMsg) {
				var t = e.replace(/hidden/i, "visibilitychange");
				var i = function() {
						setTimeout(function() {
							if (document[e]) ykPlyr.sendMsg("pageVisibilty", false);
							else ykPlyr.sendMsg("pageVisibilty", true)
						}, 100)
					};
				document.addEventListener(t, i)
			}
		});

		function k() {
			var e = true;

			function t() {
				var e = localStorage.getItem("PAGE_QUIT");
				if (!e) return [];
				e = JSON.parse(e);
				return e
			}
			function i(e) {
				return [e.getFullYear(), e.getMonth() + 1, e.getDate(), e.getHours()].join("")
			}
			var n = function() {
					var i = t();
					if (!e) i = 1;
					for (var n = 0; n < i.length; n++) if ("undefined" !== typeof goldlog) goldlog.record("/yt/youkuplayer.fdl.page_error", "EXP", "degradetype=4&errortype=2&vid=" + PageConfig.videoId + "&timestr=" + i[n].time + "&date=" + i[n].date, "H1505507054");
					localStorage.setItem("PAGE_QUIT", "");
					return null
				};
			try {
				n();
				$(window).bind("beforeunload", function(a) {
					if (!e) {
						n();
						return
					}
					var r = t();
					var o = new Date;
					r.push({
						time: o.getTime(),
						date: i(o)
					});
					r = JSON.stringify(r);
					localStorage.setItem("PAGE_QUIT", r)
				})
			} catch (a) {}
		}
		k();
		$(window).bind("beforeunload", function() {
			if (n.isLogin()) return;
			var e = t("u_l_v_t");
			try {
				var i = ykPlyr.PlayerInfo() || 0;
				if (i) i = i.time;
				if (e) i = parseInt(e) + parseInt(i);
				if (i > 0) {
					if (i > 60 * 6 * 60) i = 60 * 6 * 60;
					t("u_l_v_t", parseInt(i), 1)
				}
			} catch (a) {}
		})
	})
}(window.jQuery, window.oz.require, window.oz.define);;