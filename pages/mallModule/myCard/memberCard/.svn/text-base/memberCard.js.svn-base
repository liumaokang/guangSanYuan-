function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
    }
    return e;
}, a = require("../../../../api/redPacketService.js"), o = require("../../../../api/memberService.js"), n = require("../../../../utils/self.js"), i = require("../../../../utils/utils.js"), s = require("../../../../utils/navPage.js"), r = require("../../../../utils/authorize.js"), c = getApp();

Page({
    data: {
        memberId: "3232232323236569",
        codeWidth: 586,
        codeHeight: 174,
        hasUserInfo: !1,
        isMember: !1,
        time: "",
        codeType: "BARCODE",
        show: {
            middle: !1,
            top: !1,
            bottom: !1,
            right: !1,
            right2: !1
        },
        redPacket: !0,
        animationData: {},
        animationRotate: {},
        moneyAmount: "0.00",
        homeBack: !1,
        popupTop: !0,
        phone: !1,
        systemOptions: {}
    },
    toHome: function() {
        s.toHome();
    },
    refreshMbrCode: function() {
        c.globalData.userInfo && c.globalData.userInfo.member ? "BARCODE" !== this.data.codeType && this.getMbrCode() : (console.log(), 
        wx.showToast({
            title: "您还没有登陆哦~",
            icon: "none",
            duration: 2e3
        }));
    },
    getMbrCode: function() {
        var e = this, t = this;
        clearTimeout(this.data.time), o.getMbrCode().then(function(a) {
            if (console.log(a), a.codeType, e.setData({
                memberId: a.code,
                codeType: a.codeType
            }), "BARCODE" === a.codeType ? (e.ctxCanvas || (e.ctxCanvas = wx.createCanvasContext("barcode")), 
            n.barcode(e.ctxCanvas, e.data.memberId, e.data.codeWidth, e.data.codeHeight)) : n.qrcode("qrcode", a.code, 280, 280), 
            e.setData({
                memberId: e.phoneSeparated(a.code)
            }), "BARCODE" !== e.data.codeType && a.integer) {
                var o = 1e3 * a.integer, i = setTimeout(function() {
                    e.getMbrCode(), console.log("刷新了");
                }, o);
                t.setData({
                    time: i
                });
            }
            return a;
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    onLoad: function(e) {
        wx.hideShareMenu();
        var t = this, o = {
            hasRedPacket: !1
        };
        if (c.globalData.configureInfo.forEach(function(e) {
            "hasRedPacket" === e.key && null != e.value && (o.hasRedPacket = e.value);
        }), this.setData({
            systemOptions: o
        }), 1 === getCurrentPages().length && this.setData({
            homeBack: !0
        }), c.globalData.userInfo && c.globalData.userInfo.member) {
            t.getMbrCode(), t.setData({
                hasUserInfo: !0
            }), a.checkCanJoin().then(function(e) {
                console.log(e), e.canJoin && (t.setData({
                    acyivityId: e.acyivityId
                }), t.toggleMiddlePopup());
            }).catch(function(e) {
                console.log(e.message), "您还没有登录哦~" !== e.message && wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                });
            });
            var n = wx.createAnimation({
                duration: 1e3
            });
            this.animation = n;
        } else this.setData({
            hasUserInfo: !1
        });
        this.getSharePictures();
    },
    codeTextPartition: function(e) {
        return e = e.replace(/\s/g, "").replace(/(\w{4})(?=\w)/g, "$1 ");
    },
    phoneSeparated: function(e) {
        function t(e, t) {
            var a;
            return a = e.replace(/(^\s+)|(\s+$)/g, ""), t && "g" == t.toLowerCase() && (a = a.replace(/\s/g, "")), 
            a;
        }
        var a = t(e, "g");
        return a = function(e) {
            return /^1(3|4|5|7|8)\d{9}$/.test(t(e, "g"));
        }(a) ? a.substring(0, 3) + " " + a.substring(3, 7) + " " + a.substring(7, 11) : this.codeTextPartition(a);
    },
    checkAuth: function(e) {
        return console.log(e), !!c.globalData.userInfo;
    },
    toWeixinPay: function() {
        o.getOfflinePaySign().then(function(e) {
            var t = JSON.parse(e);
            console.log(t), wx.openOfflinePayView({
                appId: t.appId,
                timeStamp: t.timeStamp,
                nonceStr: t.nonceStr,
                package: t.packageValue,
                signType: "MD5",
                paySign: t.paySign,
                success: function(e) {
                    console.log(e.data);
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    tobalancePay: function() {
        c.globalData.userInfo ? c.globalData.userInfo.member ? s.toBalancePay() : (wx.showToast({
            title: "您还不是会员，请绑定手机号成为会员~",
            icon: "none",
            duration: 2e3
        }), setTimeout(function() {
            s.toAuthorize();
        }, 2e3)) : wx.showToast({
            title: "您还没有登录哦~",
            icon: "icon",
            duration: 2e3
        });
    },
    onReady: function() {},
    onShow: function() {
        this.checkUserInfo();
    },
    onHide: function() {},
    onUnload: function() {
        clearTimeout(this.data.time);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "现金红包大派送",
            path: "/pages/mallModule/myCard/memberCard/memberCard",
            imageUrl: this.data.sharePictures,
            success: function(e) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            }
        };
    },
    getSharePictures: function() {
        var e = this;
        i.getSharePictures("RED_PACKATE").then(function(t) {
            e.setData({
                sharePictures: t
            });
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toggleMiddlePopup: function() {
        this.toggle("middle");
    },
    toggle: function(t) {
        var a = this;
        this.data.show[t] ? (this.setData(e({}, "show." + t, !this.data.show[t])), setTimeout(function() {
            a.setData({
                canvasHidden: !1
            });
        }, 100)) : (setTimeout(function() {
            a.setData({
                canvasHidden: !0
            });
        }, 100), this.setData(e({}, "show." + t, !this.data.show[t])));
    },
    toggleNextStep: function() {
        this.setData({
            step: "second"
        });
    },
    openRedPacket: function() {
        var e = this;
        a.openRedPacket(this.data.acyivityId).then(function(t) {
            e.setData({
                moneyAmount: t
            }), e.animation.rotate3d(0, 180, 0, 360).step({
                duration: 1e3
            }), e.setData({
                animationRotate: e.animation.export()
            }), setTimeout(function() {
                e.setData({
                    redPacket: !1
                }), setTimeout(function() {
                    e.setData({
                        popupTop: !1
                    }), e.animation.currentTransform = [];
                    var t = 382 / 750 * wx.getSystemInfoSync().windowWidth;
                    e.animation.translate(0, -t).step({
                        duration: 1e3
                    }), e.setData({
                        animationData: e.animation.export()
                    });
                }, 100);
            }, 1e3);
        }).catch(function(t) {
            "38003" == t.code ? (e.toggleMiddlePopup("middle"), wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            })) : wx.showToast({
                title: t.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toRedPacket: function() {
        s.toRedPacket();
    },
    handleUserLogin: function() {
        console.log(c.globalData.userInfo);
        var e = this;
        if (c.globalData.userInfo) {
            var a = c.globalData.userInfo;
            this.setData({
                userInfo: t({}, a.wxaUser)
            }), c.globalData.userInfo.member ? (e.setData({
                hasUserInfo: !0
            }), e.getMbrCode()) : (e.setData({
                hasUserInfo: !1
            }), e.handlePopupPhone());
        }
    },
    handlePopupPhone: function() {
        c.globalData.userInfo.member ? (this.setData({
            phone: !1,
            hasUserInfo: !0
        }), this.getMbrCode()) : this.setData({
            phone: !0
        });
    },
    handleBindPhone: function(e) {
        console.log(e.detail), !0 === e.detail.bindMobile && this.handlePopupPhone();
    },
    checkUserInfo: function() {
        c.globalData.userInfo && (this.setData({
            hasUserInfo: !0
        }), c.globalData.userInfo.member && this.setData({
            isMember: !0
        }));
    },
    getUserInfo: function(e) {
        var t = this;
        r.login(e).then(function(e) {
            t.setData({
                hasUserInfo: !0
            }), e.member ? t.setData({
                isMember: !0
            }) : s.toAuthorize();
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    toAuthorize: function() {
        s.toAuthorize();
    }
});