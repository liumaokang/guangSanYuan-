var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (e[s] = a[s]);
    }
    return e;
}, t = require("../../../../api/feedbackService.js"), a = require("../../../../api/request.js"), s = getApp();

Page({
    data: {
        wordCount: 0,
        feedbackImages: [],
        feedback: "",
        type: "normal",
        focus: !1,
        disabled: !1
    },
    onLoad: function(e) {
        this.count = 3, this.systemInfo = null, Object.keys(s.globalData.systemInfo).length > 0 && s.globalData.systemInfo.model && null != s.globalData.systemInfo.model && "" !== s.globalData.systemInfo.model ? (this.systemInfo = s.globalData.systemInfo, 
        console.log(this.systemInfo)) : this.getSystemInfoSync();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getSystemInfoSync: function() {
        try {
            var e = wx.getSystemInfoSync();
            s.globalData.systemInfo = e, this.systemInfo = e;
        } catch (e) {}
    },
    handelTextArea: function(e) {
        e.detail.cursor <= 50 ? (this.setData({
            feedback: e.detail.value,
            wordCount: e.detail.cursor
        }), 50 == e.detail.cursor && wx.showToast({
            title: "反馈信息最多不超过50个字符哦~",
            icon: "none",
            duration: 2e3
        })) : wx.showToast({
            title: "反馈信息最多不超过50个字符哦~",
            icon: "none",
            duration: 2e3
        });
    },
    chooseImage: function() {
        var e = this, t = e.count - e.data.feedbackImages.length;
        t > 0 ? wx.chooseImage({
            count: t,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var s = t.tempFilePaths;
                wx.showToast({
                    title: "正在上传...",
                    icon: "loading",
                    mask: !0,
                    duration: 2e5
                }), console.log(s);
                var o = e.data.feedbackImages;
                s.forEach(function(t) {
                    wx.uploadFile({
                        url: a.BASE_URL + "/newretail/api/dfs/upload",
                        filePath: t,
                        name: "file",
                        formData: {
                            user: "test"
                        },
                        success: function(t) {
                            try {
                                var a = t.data, s = JSON.parse(a);
                                console.log(s), o.push(s.data), e.setData({
                                    feedbackImages: o
                                }), wx.hideToast();
                            } catch (e) {
                                console.log(e), wx.showToast({
                                    title: e.message,
                                    icon: "none",
                                    duration: 2e3
                                });
                            }
                        },
                        fail: function(e) {
                            console.log(e.message);
                        }
                    });
                });
            }
        }) : wx.showToast({
            title: "最多只能上传" + e.count + "张哦~",
            icon: "none",
            duration: 2e3
        });
    },
    deleteImg: function(e) {
        Array.prototype.del = function(e) {
            if (isNaN(e) || e >= this.length) return !1;
            for (var t = 0, a = 0; t < this.length; t++) this[t] != this[e] && (this[a++] = this[t]);
            this.length -= 1;
        };
        var t = e.currentTarget.dataset.id, a = this.data.feedbackImages;
        a.del(t), this.setData({
            feedbackImages: a
        });
    },
    formSubmit: function(s) {
        var o = this, n = this;
        if (this.setData({
            disabled: !0
        }), "" !== this.data.feedback) {
            var i = this.data.feedback, c = [];
            this.data.feedbackImages.forEach(function(e) {
                c.push(e.url);
            });
            var r = {
                advice: i,
                appVersion: a.APP_VERSION,
                source: "WX_XCX"
            };
            if (null == this.systemInfo && this.getSystemInfoSync(), this.systemInfo.version && null != this.systemInfo.version && "" !== this.systemInfo.version) {
                var l = this.systemInfo.version + "-" + a.APP_VERSION;
                r = e({}, r, {
                    appVersion: l
                });
            }
            this.systemInfo.model && null != this.systemInfo.model && "" !== this.systemInfo.model && (r = e({}, r, {
                phoneBrand: n.systemInfo.model
            })), c.length > 0 && (r = e({}, r, {
                imageUrls: c
            })), t.create(r).then(function(e) {
                o.setData({
                    type: "success",
                    disabled: !1
                });
            }).catch(function(e) {
                wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                }), o.setData({
                    disabled: !1
                });
            });
        } else wx.showToast({
            title: "反馈信息不能为空哦~",
            icon: "none",
            duration: 2e3
        }), this.setData({
            focus: !0,
            disabled: !1
        });
    },
    backPrePage: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    previewImage: function(e) {
        var t = [];
        this.data.feedbackImages.forEach(function(e) {
            t.push(e.url);
        });
        var a = e.currentTarget.dataset.id;
        wx.previewImage({
            current: t[a],
            urls: t
        });
    }
});