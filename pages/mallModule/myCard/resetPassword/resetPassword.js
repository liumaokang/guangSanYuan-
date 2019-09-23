function a(a, e, o) {
    return e in a ? Object.defineProperty(a, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = o, a;
}

var e = require("../../../../api/memberService.js"), o = getApp();

Page({
    data: {
        newPassword: "",
        newPasswordFocus: !0,
        confirmPassword: "",
        confirmPasswordFocus: !1,
        oldPassword: "",
        canModify: !1
    },
    handleNewPassword: function(a) {
        var e = this.data, o = (e.newPassword, e.confirmPassword);
        a.detail.value.length <= 6 && (this.setData({
            newPassword: a.detail.value
        }), 6 == a.detail.value.length && 6 == o.length ? this.setData({
            canModify: !0
        }) : this.setData({
            canModify: !1
        }));
    },
    handleConfirmPassword: function(a) {
        var e = this.data, o = e.newPassword;
        e.confirmPassword;
        console.log(a), a.detail.value.length <= 6 && (this.setData({
            confirmPassword: a.detail.value
        }), 6 == o.length && 6 == a.detail.value.length ? this.setData({
            canModify: !0
        }) : this.setData({
            canModify: !1
        }));
    },
    getFocus: function(e) {
        var o = e.currentTarget.dataset.name;
        console.log(o), this.setData(a({}, o, !0));
    },
    handleConfirm: function() {
        var a = this, o = a.checkAuth(), n = new RegExp(/^[0-9A-Za-z]+$/);
        if (o) if (a.data.newPassword) if (a.data.confirmPassword) if (n.test(a.data.newPassword) && n.test(a.data.confirmPassword)) if (a.data.newPassword.length > 3 && a.data.confirmPassword.length > 3) if (a.data.newPassword === a.data.confirmPassword) {
            var t = {
                newPassword: this.data.newPassword,
                oldPassword: this.data.oldPassword
            };
            e.resetCardPassword(t).then(function(a) {
                console.log(a), wx.showToast({
                    title: "修改成功",
                    icon: "none",
                    duration: 1500
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 2
                    });
                }, 2e3);
            }).catch(function(a) {
                wx.showToast({
                    title: a.message,
                    icon: "none",
                    duration: 1500
                }), console.log(a.message);
            });
        } else wx.showToast({
            title: "两次输入的密码不一致",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "密码长度应大于3位小于10位~",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请输入数字，长度大于3位小于10位~",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请再次输入确认",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请输入新密码",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请登录后再设置密码~",
            icon: "none",
            duration: 2e3
        });
    },
    checkAuth: function() {
        return !!o.globalData.userInfo;
    },
    onLoad: function(a) {
        wx.hideShareMenu();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});