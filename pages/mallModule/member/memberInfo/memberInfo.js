var e = Object.assign || function(e) {
    for (var a = 1; a < arguments.length; a++) {
        var t = arguments[a];
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
}, a = require("../../../../api/wxaUserService.js"), t = require("../../../../api/memberService.js"), n = require("../../../../utils/auth.js"), s = require("../../../../utils/utils.js"), o = require("../../../../utils/navPage.js"), i = getApp();

Page({
    data: {
        genders: [ {
            name: "先生",
            value: "MALE",
            id: 0
        }, {
            name: "女士",
            value: "FEMALE",
            id: 1
        } ],
        userGenders: -1,
        userInfo: {},
        member: {},
        picker_switch: !1,
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        date: "未填写",
        endDate: ""
    },
    onLoad: function(a) {
        wx.hideShareMenu();
        var t = this;
        if (i.globalData.userInfo) if (console.log(i.globalData.userInfo), i.globalData.userInfo.member) {
            var n = i.globalData.userInfo.member, o = i.globalData.userInfo.wxaUser;
            if (console.log(n), this.setData({
                userInfo: e({}, o, {
                    nickName: n.nickName ? n.nickName : o.nickName
                }),
                hasUserInfo: !0,
                memberTel: t.hideTel(n.mobile),
                nickName: n.nickName,
                gradeName: n.gradeName ? n.gradeName : "",
                member: n
            }), n.birthday) this.setData({
                date: n.birthday,
                picker_switch: !0
            }); else {
                var r = new Date(), l = s.formatTime(r).replace(/\//g, "-").split(" ")[0];
                this.setData({
                    endDate: l
                });
            }
            "UNKNOWN" === n.gender ? this.setData({
                userGenders: -1
            }) : "MALE" === n.gender ? this.setData({
                userGenders: 0
            }) : "FEMALE" === n.gender && this.setData({
                userGenders: 1
            });
        } else this.setData({
            hasUserInfo: !1
        });
    },
    genderClick: function(e) {
        var a = this, t = e.currentTarget.dataset.index;
        a.data.userGenders !== t ? a.setData({
            userGenders: t
        }) : a.setData({
            userGenders: -1
        });
    },
    getUserInfo: function(e) {
        var t = this;
        console.log(e), i.globalData.userInfo = e.detail.userInfo, wx.setStorage({
            key: "wj_userInfo",
            data: e.detail.userInfo
        }), this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: !0
        }), a.login().then(function(e) {
            console.log(e), n.setUser(e), i.globalData.userInfo = e, e.member ? (t.setData({
                member: e.member,
                isMember: !0
            }), wx.setStorage({
                key: "wj_member",
                data: e.member
            })) : (t.setData({
                isMember: !1
            }), o.toBindMobile());
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    hideTel: function(e) {
        var a = /^(\d{3})\d{4}(\d{4})$/;
        return e = e.replace(a, "$1****$2");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    inputNiceName: function(e) {
        console.log(e.detail), this.setData({
            nickName: e.detail.value
        }), e.detail.cursor > 10 && wx.showToast({
            title: "昵称最大不能超过10个字符哦~",
            icon: "none",
            duration: 2e3
        });
    },
    bindDateChange: function(e) {
        this.setData({
            date: e.detail.value
        });
    },
    handleSave: function(o) {
        console.log(o.detail.value);
        var r = this;
        if (o.detail.value.nickName) if (o.detail.value.date && "未填写" !== o.detail.value.date) {
            var l = i.globalData.userInfo.member, d = {
                id: l.id,
                nickName: o.detail.value.nickName,
                birthday: o.detail.value.date + " 00:00:00"
            };
            -1 === r.data.userGenders ? (l.gender = "UNKNOWN", d = e({}, d, {
                gender: "UNKNOWN"
            })) : 0 === r.data.userGenders ? (l.gender = "MALE", d = e({}, d, {
                gender: "MALE"
            })) : 1 === r.data.userGenders && (l.gender = "FEMALE", d = e({}, d, {
                gender: "FEMALE"
            })), console.log(d), null !== d.id && void 0 !== d.id ? t.update(d).then(function(e) {
                console.log(e), s.setHideLoading(!0);
            }).then(function(e) {
                a.login().then(function(e) {
                    console.log(e), s.setHideLoading(!1), n.setUser(e), i.globalData.userInfo = e, e.member && wx.setStorage({
                        key: "wj_member",
                        data: e.member
                    }), wx.navigateBack({
                        delta: 1
                    });
                }).catch(function(e) {
                    wx.showToast({
                        title: e.message,
                        icon: "none",
                        duration: 2e3
                    }), wx.navigateBack({
                        delta: 1
                    });
                });
            }).catch(function(e) {
                wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                });
            }) : wx.showToast({
                title: "您还不是会员，请绑定手机号成为会员~",
                icon: "none",
                duration: 2e3
            });
        } else wx.showToast({
            title: "请选择生日",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请填写昵称",
            icon: "none",
            duration: 2e3
        });
    }
});