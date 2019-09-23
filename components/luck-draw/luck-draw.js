var t = require("../../api/wxaUserService.js"), a = require("../../utils/auth.js"), e = (require("../../utils/utils.js"), 
require("../../utils/navPage.js")), i = getApp();

Component({
    behaviors: [],
    properties: {
        myProperty: {
            type: String,
            value: "",
            observer: function(t, a, e) {}
        },
        status: {
            type: String,
            value: "UNSTART",
            observer: function(t, a, e) {
                this._statusChange(t, a);
            }
        },
        isSameTime: {
            type: Boolean,
            value: !1
        },
        endTime: {
            type: Number,
            value: 5
        },
        luckDrawText: {
            type: String,
            value: "./image/text.png"
        },
        hasUserInfo: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        rate: 1,
        defaultStyle: "",
        disabled: !1,
        showDefault: !0,
        animationData1: {},
        animationData2: {},
        animationData3: {},
        animationData4: {},
        animationData5: {},
        animationData6: {},
        btnAnimation: {},
        hasResult: !1,
        isWinPrice: !1,
        resultPrice: 0
    },
    lifetimes: {
        attached: function() {
            console.log("抽奖 attached");
            var t = wx.getSystemInfoSync().windowWidth / 375;
            this.setData({
                rate: t
            });
        },
        moved: function() {},
        detached: function() {}
    },
    attached: function() {
        var t = wx.getSystemInfoSync().windowWidth / 375;
        this.setData({
            rate: t
        });
    },
    pageLifetimes: {
        show: function() {},
        hide: function() {},
        resize: function() {}
    },
    methods: {
        onMyButtonTap: function() {
            this.setData({});
        },
        _myPrivateMethod: function() {
            this.setData({
                "A[0].B": "myPrivateData"
            });
        },
        _propertyChange: function(t, a) {
            console.log(t, a);
        },
        _statusChange: function(t, a) {
            console.log(t, a), "TRUE" === t ? setTimeout(function() {
                this._setResult(!0);
            }.bind(this), 2e3) : "FALSE" === t ? setTimeout(function() {
                this._setResult(!1);
            }.bind(this), 2e3) : "END" === t && setTimeout(function() {
                this._setResult(!1);
            }.bind(this), 2e3);
        },
        _handleTouchStart: function() {
            this.setData({
                bottom: "80rpx"
            });
        },
        _handleTouchEnd: function() {
            this.setData({
                bottom: "86rpx"
            });
        },
        _initData: function() {
            this.setData({
                showDefault: !1,
                disabled: !0,
                resultPrice: 0,
                hasResult: !1,
                defaultStyle: "transform:translateY(0px)!important;"
            });
        },
        _handleClick: function() {
            this._userhandleClick(!0);
            var t = 0, a = 0, e = 0;
            this.data.isSameTime ? (t = 0, a = 0, e = 0) : (t = parseInt(1e3 * Math.random()), 
            a = parseInt(1e3 * Math.random()), e = parseInt(1e3 * Math.random())), this._initData(), 
            setTimeout(function() {
                this._handleAnimate(1);
            }.bind(this), t), setTimeout(function() {
                this._handleAnimate(2);
            }.bind(this), a), setTimeout(function() {
                this._handleAnimate(3);
            }.bind(this), e);
        },
        _handleAnimate: function(t, a) {
            var e = a || 400, i = e / 4 * 3, n = 85 * this.data.rate, s = wx.createAnimation({
                duration: e,
                timingFunction: "linear"
            });
            s.translateY(4 * n).step().translateY(0).step({
                duration: 0
            }), 1 === t ? this.setData({
                animationData1: s
            }) : 2 === t ? this.setData({
                animationData3: s
            }) : 3 === t && this.setData({
                animationData5: s
            });
            var o = 1, r = setInterval(function() {
                this.data.hasResult ? (clearInterval(r), this._handleAnimateEnd(n, t, o)) : (s.translateY(4 * n).step().translateY(0).step({
                    duration: 0
                }), this._handleSetData(s, o, t)), o++;
            }.bind(this), i);
        },
        _setResult: function(t) {
            var a = parseInt(30 * Math.random()), e = 1;
            e = a >= 0 && a < 10 ? 1 : a >= 10 && a < 20 ? 2 : 3, this.setData({
                hasResult: !0,
                isWinPrice: t,
                resultPrice: t ? e : 0
            });
        },
        _handleAnimateEnd: function(t, a, e) {
            var i = wx.createAnimation({
                duration: 2e3,
                timingFunction: "linear"
            });
            if (this.data.isWinPrice) {
                var n = this.data.resultPrice, s = [ [ 3, 2, 1 ], [ 2, 1, 3 ], [ 1, 3, 2 ] ][a - 1][n - 1];
                i.translateY(t * s).step({
                    duration: 0
                }), this._handleSetData(i, e, a);
            } else i.translateY(t).step({
                duration: 0
            }), this._handleSetData(i, e, a);
            this.setData({
                disabled: !1
            });
        },
        _handleSetData: function(t, a, e) {
            a % 2 == 0 && (1 === e ? this.setData({
                animationData1: t
            }) : 2 === e ? this.setData({
                animationData3: t
            }) : 3 === e && this.setData({
                animationData5: t
            })), a % 2 == 1 && (1 === e ? this.setData({
                animationData2: t
            }) : 2 === e ? this.setData({
                animationData4: t
            }) : 3 === e && this.setData({
                animationData6: t
            }));
        },
        _userhandleClick: function(t) {
            var a = {
                userDraw: t
            }, e = {};
            this.triggerEvent("draw", a, e);
        },
        handleClick: function() {
            i.globalData.userInfo ? this._handleClick() : this.queryIsFans(!1);
        },
        queryIsFans: function(t) {
            var a = this;
            a.setData({
                isActive: !1
            });
            var t = {
                isFans: t
            }, e = {};
            a.triggerEvent("fans", t, e);
        },
        getUserInfo: function(n) {
            var s = this, o = this;
            n && wx.setStorage({
                key: "wj_userInfo",
                data: n.detail.userInfo
            }), t.login().then(function(t) {
                a.setUser(t), i.globalData.userInfo = t, o.setData({
                    hasUserInfo: !0
                }), t.member ? (o.handleClick(), wx.setStorage({
                    key: "wj_member",
                    data: t.member
                }), s.queryIsFans(!0)) : (wx.showToast({
                    title: "你还不是会员，请先注册~",
                    icon: "none",
                    mask: !0,
                    duration: 1500
                }), setTimeout(function() {
                    e.toAuthorize();
                }, 1500));
            }).catch(function(t) {
                o.setData({
                    hasUserInfo: !1
                }), t.message.indexOf("auth deny") >= 0 ? wx.showToast({
                    title: "您拒绝了授权~",
                    icon: "none",
                    duration: 2e3
                }) : wx.showToast({
                    title: t.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        }
    }
});