!function(e) {
    var t = {};
    function a(o) {
        if (t[o])
            return t[o].exports;
        var c = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(c.exports, c, c.exports, a),
        c.l = !0,
        c.exports
    }
    a.m = e,
    a.c = t,
    a.d = function(e, t, o) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
        })
    }
    ,
    a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    a.t = function(e, t) {
        if (1 & t && (e = a(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var o = Object.create(null);
        if (a.r(o),
        Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var c in e)
                a.d(o, c, function(t) {
                    return e[t]
                }
                .bind(null, c));
        return o
    }
    ,
    a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return a.d(t, "a", t),
        t
    }
    ,
    a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    a.p = "",
    a(a.s = 0)
}([function(e, t, a) {
    a(1),
    e.exports = a(2)
}
, function(e, t) {
    document.body.addEventListener("click", (function(e) {
        let t = document.querySelectorAll(".buy_product")
          , a = Array.prototype.indexOf.call(t, e.target.parentNode.parentNode.parentNode);
        if ("IMG" === e.target.tagName && e.target.parentNode.classList.contains("show-title-row")) {
            let o = t[a].querySelectorAll(".show-title img");
            [].forEach.call(o, (function(o, c) {
                parseInt(e.target.getAttribute("data-open")) === c && (o.classList.toggle("active"),
                t[a].querySelectorAll(".buy_product-show-case")[c].classList.toggle("open-case"))
            }
            ))
        }
    }
    ));
    let a = document.querySelectorAll(".license-list");
    [].forEach.call(a, (function(e) {
        e.querySelector("input").onchange = function() {
            if (e.querySelector(".buy_product-show-case").classList.contains("open-case"))
                e.querySelector(".buy_product-show-case").classList.toggle("open-case"),
                setTimeout((function() {
                    let t = e.querySelectorAll(".show-title .show-title-row");
                    [].forEach.call(t, (function(e) {
                        e.classList.toggle("show-title-row-active")
                    }
                    )),
                    e.querySelector(".buy_product-show-case").classList.toggle("open-case-active"),
                    e.classList.toggle("license-list-active")
                }
                ), 500);
            else {
                let t = e.querySelectorAll(".show-title .show-title-row");
                [].forEach.call(t, (function(e) {
                    e.classList.toggle("show-title-row-active")
                }
                )),
                e.querySelector(".buy_product-show-case").classList.toggle("open-case-active"),
                e.classList.toggle("license-list-active")
            }
        }
    }
    )),
    document.body.addEventListener("click", (function(e) {
        if (e.target.classList.contains("control"))
            if (e.target.getAttribute("data-open") === e.target.innerHTML ? e.target.innerHTML = e.target.getAttribute("data-close") : e.target.innerHTML = e.target.getAttribute("data-open"),
            e.target.parentNode.classList.contains("basket_container-check")) {
                e.target.parentNode.classList.toggle("basket_container-check-active");
                let t = e.target.parentNode.querySelectorAll(".basket_container-check-show-list");
                [].forEach.call(t, (function(e) {
                    e.classList.toggle("basket_container-check-show-list-active")
                }
                ))
            } else if (e.target.parentNode.classList.contains("basket-mobile-check")) {
                let t = e.target.parentNode.querySelectorAll(".basket-mobile-check-show-container");
                [].forEach.call(t, (function(e) {
                    e.classList.toggle("basket-mobile-check-show-container-active")
                }
                ))
            }
    }
    )),
    document.querySelector(".headerNew-nav-icons-basket") && document.querySelector(".headerNew-nav-icons-basket").addEventListener("click", (function() {
        document.querySelector(".headerNew-basket-mask").style.display = "block",
        document.querySelector(".header-margin-inner") ? document.querySelector(".headerNew-basket-mask").style.minHeight = document.body.clientHeight + 300 + "px" : document.querySelector(".headerNew-basket-mask").style.minHeight = document.body.clientHeight + "px",
        document.querySelector(".headerNew-basket").style.display = "block",
        setTimeout((function() {
            document.querySelector(".headerNew-basket-mask").classList.add("headerNew-basket-mask-active"),
            document.querySelector(".headerNew-basket").classList.add("headerNew-basket-active")
        }
        ), 0)
    }
    )),
    document.querySelector(".headerNew-basket-mask").addEventListener("click", (function() {
        document.querySelector(".headerNew-basket-mask").classList.remove("headerNew-basket-mask-active"),
        document.querySelector(".headerNew-basket").classList.remove("headerNew-basket-active"),
        setTimeout((function() {
            document.querySelector(".headerNew-basket-mask").style.display = "none",
            document.querySelector(".headerNew-basket").style.display = "none"
        }
        ), 500)
    }
    )),
    document.querySelector(".headerNew-mobile-toggle") && document.querySelector(".headerNew-mobile-toggle").addEventListener("click", (function() {
        document.querySelector(".new-mobile-menu").style.display = "flex",
        setTimeout((function() {
            document.querySelector(".new-mobile-menu").classList.add("new-mobile-menu-active")
        }
        ), 0),
        setTimeout((function() {
            if (document.querySelector(".main-container")) {
                document.querySelector(".main-container").classList.add("lock-position")
            }
            if (document.querySelector(".footer")) {
                document.querySelector(".footer").classList.add("footer-block")
            }
        }
        ), 600)
    }
    )),
    document.querySelector(".new-mobile-menu_toggle") && document.querySelector(".new-mobile-menu_toggle").addEventListener("click", (function() {
        document.querySelector(".new-mobile-menu").classList.remove("new-mobile-menu-active"),
        setTimeout((function() {
            document.querySelector(".new-mobile-menu").style.display = "none";
            if (document.querySelector(".main-container")) {
                document.querySelector(".main-container").classList.remove("lock-position")
            }
                if (document.querySelector(".footer")) {
                    document.querySelector(".footer").classList.remove("footer-block")
                }
        }
        ), 600)
    }
    )),
    document.body.addEventListener("click", (function() {
        event.target.parentNode.classList.contains("buy_product-row-container-wrapper-options") && (event.target.onkeyup = function() {
            parseInt(event.target.value) > parseInt(event.target.getAttribute("max")) && (event.target.value = event.target.getAttribute("max")),
            parseInt(event.target.value) < parseInt(event.target.getAttribute("min")) && (event.target.value = event.target.getAttribute("min"))
        }
        )
    }
    )),
    document.addEventListener("click", (function(e) {
        e.target.hasAttribute("data-open-case") && function(e) {
            let t = document.querySelectorAll(`[data-open-case='${e.getAttribute("data-open-case")}']`)
              , a = document.querySelector(`[data-case-name="${e.getAttribute("data-open-case")}"]`);
            t.forEach(e=>{
                "button" === e.getAttribute("type") && (e.style.display = "none")
            }
            ),
            a.classList.add("hidden-case_active"),
            a.style.opacity = "1",
            a.style.maxHeight = "1750px"
        }(e.target),
        e.target.hasAttribute("data-close-case") && function(e) {
            let t = document.querySelector(`[data-case-name="${e.getAttribute("data-close-case")}"]`);
            document.querySelectorAll(`[data-open-case="${e.getAttribute("data-close-case")}"]`).forEach(e=>{
                "button" === e.getAttribute("type") && (e.style.display = "block")
            }
            ),
            t.classList.remove("hidden-case_active"),
            t.style.maxHeight = "0px",
            t.style.opacity = "0",
            t.querySelector("[data-submodule-toggle]") && t.querySelectorAll("[data-submodule-toggle]").forEach(e=>{
                let t, a = document.querySelector(`[data-submodule-name="${e.getAttribute("data-submodule-toggle")}"]`);
                window.innerWidth > 767 ? (t = document.querySelectorAll(`[data-submodule-toggle="${e.getAttribute("data-submodule-toggle")}"]`)[1],
                t.classList.remove("active")) : (t = document.querySelectorAll(`[data-submodule-toggle="${e.getAttribute("data-submodule-toggle")}"]`)[2],
                t.classList.remove("active"),
                t.classList.remove("hidden-case__close-mobile-active")),
                window.innerWidth > 767 && "button" === t.getAttribute("type") && (t.innerHTML = t.dataset.open),
                a.classList.remove("hidden-case_active"),
                a.style.maxHeight = "0px"
            }
            )
        }(e.target),
        e.target.hasAttribute("data-submodule-toggle") && function(e) {
            let t = document.querySelectorAll(`[data-submodule-toggle="${e.getAttribute("data-submodule-toggle")}"]`)[0]
              , a = document.querySelectorAll(`[data-submodule-toggle="${e.getAttribute("data-submodule-toggle")}"]`)[1]
              , o = document.querySelectorAll(`[data-submodule-toggle="${e.getAttribute("data-submodule-toggle")}"]`)[2]
              , c = document.querySelector(`[data-submodule-name="${e.getAttribute("data-submodule-toggle")}"]`)
              , n = e.dataset.open
              , l = e.dataset.close;
            t.classList.toggle("active"),
            o.classList.toggle("active"),
            o.classList.toggle("hidden-case__close-mobile-active"),
            a.classList.contains("active") || o.classList.contains("active") || t.classList.contains("active") ? (a.innerHTML = l,
            c.classList.add("hidden-case_active"),
            c.style.maxHeight = "1500px",
            c.style.opacity = "1",
            function(t) {
                let a = e.getAttribute("data-submodule-toggle")
                  , o = document.querySelector(`[data-case-name="${a.split(".")[0]}"]`)
                  , c = o.querySelector(".hidden-case__container").clientHeight;
                o.style.maxHeight = c + t + 32 + "px"
            }(1500)) : (a.innerHTML = n,
            c.classList.remove("hidden-case_active"),
            c.style.maxHeight = "0px",
            c.style.opacity = "0",
            function(t) {
                let a = e.getAttribute("data-submodule-toggle");
                document.querySelector(`[data-case-name="${a.split(".")[0]}"]`).style.maxHeight = 1500 + t + 32 + "px"
            }(1500))
        }(e.target)
    }
    ))
}
, function(e, t, a) {}
]);