function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

var t = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
    }
    return e;
}, a = require("../../../../api/teamBuyService.js"), o = require("../../../../utils/utils.js"), r = require("../../../../api/memberService.js"), n = require("../../../../utils/navPage.js"), i = require("../../../../utils/authorize.js"), s = getApp();

var server=require("../../../../utils/server.js");




Page(function(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}({
    data: {
        teamList: [],
        countDownList: [],
        teamBuyTimeList: [],
        groupTimeId: 0,
        balance: 0,
        timeId: 0,
        storeId: "",
        phone: !1,
        cantGroupModel: !1,
        hasUserInfo: !1,

    },
    clickBlank: function(e) {
        "goods" === e.currentTarget.dataset.type ? this.setData({
            modal: !1
        }) : "group" === e.currentTarget.dataset.type && this.setData({
            groupModal: !1
        });
    },
    clickBody: function() {},
    closeCantGroupModel: function() {
        this.setData({
            cantGroupModel: !1
        });
    },
    openTeamBuyModal: function(e) {
        var n = this, i = e.currentTarget.dataset.teambuyid, s = e.currentTarget.dataset.teamleaderrecordid;
        n.data.balance > 0 ? a.getDetails(i, s).then(function(e) {
            function a() {
                var a = t({}, e, {
                    teamLeaderPrice: e.teamLeaderPrice ? e.teamLeaderPrice : e.teamMemberPrice,
                    joinMemberCount: e.joinMemberCount,
                    teamMemberCount: e.teamMemberCount,
                    joinPeopleCount: e.joinMemberCount > 12 ? 12 : e.joinMemberCount,
                    teamPeopleCount: e.teamMemberCount > 12 ? 12 : e.teamMemberCount,
                    leaderImageUrl: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png",
                    teamMemberImageUrl: "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png",
                    teamBuyEnd: !1
                }), r = [];
                if (e.joinMbrs.length > 0) {
                    if ("THOUSAND" !== e.teamBuyingType && "匿名" !== e.mobile) {
                        var i = {
                            avatar: e.avatar ? e.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                        };
                        r.push(i);
                    }
                    e.joinMbrs.forEach(function(e) {
                        var a = t({}, e, {
                            avatar: e.avatar ? e.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                        });
                        e.mobile && r.push(a);
                    });
                } else if (1 === e.joinMemberCount) {
                    var s = {
                        avatar: e.avatar ? e.avatar : "https://app-1256684088.cos.ap-beijing.myqcloud.com/wujieImages/userImg1.png"
                    };
                    r.push(s);
                }
                a = t({}, a, {
                    joinMbrs: r
                }), n.setData({
                    groupInfo: a,
                    groupModal: !0
                });
                var u = new Date(), c = new Date().getTime(), m = 0;
                if (n.data.groupInfo.openTeamTime ? m = new Date(n.data.groupInfo.openTeamTime.replace(/-/g, "/")).getTime() : (m = c, 
                n.setData({
                    openTeamTime: o.formatTime(u).replace(/\//g, "-")
                })), (c - m) / 1e3 >= n.data.groupInfo.duration) {
                    var d = t({}, a, {
                        teamBuyEnd: !0
                    });
                    n.setData({
                        groupInfo: d
                    });
                }
                if (!1 === n.data.groupInfo.teamBuyEnd) {
                    var l = [], p = {
                        openTeamTime: n.data.groupInfo.openTeamTime,
                        duration: n.data.groupInfo.duration
                    };
                    l.push(p), n.setData({
                        teamBuyTimeList: l
                    }), function e() {
                        if (clearTimeout(n.data.groupTimeId), n.setData({
                            countDownTime: o.countDown(l)[0]
                        }), "00" == n.data.countDownTime.hou && "00" == n.data.countDownTime.min && "00" == n.data.countDownTime.sec) {
                            var r = t({}, a, {
                                teamBuyEnd: !0
                            });
                            n.setData({
                                groupInfo: r
                            });
                        }
                        var i = setTimeout(function() {
                            e(l);
                        }, 1e3);
                        n.setData({
                            groupTimeId: i
                        });
                    }();
                }
            }
            console.log(e), "OLDBELTNEW" != e.teamBuyingType ? a() : r.isNewMbr().then(function(e) {
                e ? a() : n.setData({
                    cantGroupModel: !0
                });
            }).catch(function(e) {
                n.closeCantGroupModel(), wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                });
            });
        }) : wx.showToast({
            title: "门店正在补货中，去看看别的吧~",
            icon: "none"
        });
    },
    joinGroup: function() {
        var e = this;
        if (this.checkAuth()) {
            var a = [];
            console.log(e.data.storeId), a.push(e.data.groupInfo.productDetails);
            var o = {
                allPrice: e.data.groupInfo.teamMemberPrice,
                storeId: e.data.storeId,
                storeName: e.data.storeName,
                goodsList: [],
                teamBuyId: e.data.groupInfo.id,
                teamLeaderRecordId: e.data.groupInfo.teamLeaderRecordId,
                orderType: "group",
                teamBuyInfo: {
                    endTime: e.data.groupInfo.endTime,
                    orderSelfScope: e.data.groupInfo.orderSelfScope,
                    selfStartTime: e.data.groupInfo.selfStartTime,
                    selfEndTime: e.data.groupInfo.selfEndTime
                },
                scource: "BUYNOW"
            };
            a.forEach(function(a) {
                a = t({}, a, {
                    productId: a.id,
                    productNum: 1,
                    sellPrice: e.data.sellPrice
                }), console.log(a), o.goodsList.push(a);
            }), console.log(o), wx.setStorageSync("wj_shopcart", o), e.data.teamMemberCount - e.data.joinMemberCount == 0 || (s.globalData.userInfo.member ? n.toPerfectOrder() : n.toAuthorize());
        }
    },
    toPayTeamBuying: function(e) {
        var a = this;
        if (this.checkAuth() && "" != a.data.productNum && 0 != a.data.productNum) {
            try {
                var o = {
                    allPrice: (a.data.teamBuyLeaderPrice * a.data.productNum).toFixed(2),
                    storeId: a.data.storeId,
                    goodsList: [],
                    teamBuyId: a.options.productId,
                    orderType: "group",
                    teamBuyInfo: {
                        endTime: a.data.endTime,
                        selfStartTime: a.data.selfStartTime,
                        selfEndTime: a.data.selfEndTime
                    },
                    scource: "BUYNOW"
                }, r = a.data.goodsList, i = (a.data.teamBuyLeaderPrice * a.data.productNum).toFixed(2);
                r.forEach(function(e) {
                    e = t({}, e, {
                        productId: e.id,
                        productNum: a.data.productNum,
                        sellPrice: i
                    }), o.goodsList.push(e);
                }), wx.setStorageSync("wj_shopcart", o);
            } catch (e) {
                console.log(e.message);
            }
            this.data.hasUserInfo ? n.toPerfectOrder() : wx.showModal({
                title: "提示",
                content: "您还不是会员，请绑定手机号成为会员",
                success: function(e) {
                    e.confirm ? n.toBindMobile() : e.cancel;
                }
            });
        } else "" != a.data.productNum && 0 != a.data.productNum && wx.showToast({
            title: "请输入商品数量",
            icon: "none",
            duration: 2e3
        });
    },
    checkAuthStatus: function() {
        return !!s.globalData.userInfo;
    },
    checkAuth: function() {
        var e = this;
        return !!s.globalData.userInfo || (wx.showModal({
            title: "提示",
            content: "请同意授权获取用户信息",
            success: function(t) {
                if (t.confirm) {
                    console.log("用户点击确定");
                    try {
                        var a = "../../goods/goodsDetail/goodsDetail?productId=" + e.options.productId + "&type=" + e.options.type;
                        e.options.activityId && (a = a + "&goodsList=" + e.options.goodsList + "&timeData=" + e.options.timeData + "&activityId=" + e.options.activityId), 
                        e.options.mobile && (a = a + "&mobile=" + e.options.mobile), wx.setStorageSync("wj_pageUrl", a);
                    } catch (e) {
                        console.log(e.message);
                    }
                    n.toMy();
                } else t.cancel && console.log("用户点击取消");
            }
        }), !1);
    },
    onLoad: function(r) {
      this.teamAll();
    },
    //正在开团
     teamAll:function(){
        var that=this
        server.getJSON('/LoginApi/teamAll/wxtoken/'+wx.getStorageSync('wxtoken'),function(res){
            console.log('正在开团');
            console.log(res);
            that.setData({
                teamList:res.data.teamAll
            })
        })
     },



    onReady: function() {},
    onShow: function() {
        this.checkUserInfo();
    },
    onHide: function() {},
    onUnload: function() {
        clearTimeout(this.data.groupTimeId);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var e = this.data.sharePictures;
        return s.globalData.userInfo && s.globalData.userInfo.member ? {
            title: "",
            path: "/pages/mallModule/fightGroup/teamList/teamList?mobile=" + s.globalData.userInfo.member.id,
            imageUrl: e,
            success: function(e) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            }
        } : {
            title: "",
            path: "/pages/mallModule/fightGroup/teamList/teamList",
            imageUrl: e,
            success: function(e) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            }
        };
    },
    getSharePictures: function() {
        s.globalData.sharePictures && this.setData({
            sharePictures: s.globalData.sharePictures
        });
    },
    getUserInfo: function(e) {},
    hideTel: function(e) {
        var t = /^(\d{3})\d{4}(\d{4})$/;
        return e = e.replace(t, "$1****$2");
    },
    handleToTeamBuying: function(e) {
        var t = "?teamBuyId=" + e.target.dataset.teambuyid + "&teamLeaderRecordId=" + e.target.dataset.teamleaderrecordid;
        n.toGroupPurchase(t);
    },
    handleUserLogin: function() {
        var e = this;
        if (s.globalData.userInfo) {
            var a = s.globalData.userInfo;
            this.setData({
                userInfo: t({}, a.wxaUser)
            }), s.globalData.userInfo.member ? e.setData({
                hasUserInfo: !0
            }) : e.setData({
                userInfo: a.wxaUser,
                hasUserInfo: !0
            });
        }
    },
    handlePopupPhone: function() {
        s.globalData.userInfo.member ? this.setData({
            phone: !1
        }) : this.setData({
            phone: !0
        });
    },
    handleBindPhone: function(e) {
        !0 === e.detail.bindMobile && this.handlePopupPhone();
    },
    checkUserInfo: function() {
        s.globalData.userInfo && (this.setData({
            hasUserInfo: !0
        }), s.globalData.userInfo.member && this.setData({
            isMember: !0
        }));
    }
}, "getUserInfo", function(e) {
    var t = this;
    i.login(e).then(function(e) {
        t.setData({
            hasUserInfo: !0
        }), e.member ? t.setData({
            isMember: !0
        }) : n.toAuthorize();
    }).catch(function(e) {
        wx.showToast({
            title: e.message,
            icon: "none",
            duration: 2e3
        });
    });
}));