function e(e, o) {
    wx.showToast({
        icon: "loading",
        title: "正在搜索...",
        duration: 2e4
    });
    var t = {
        url: "https://dev.gomoretech.com/demo/newretail-search/api/search/product/queryByVoice",
        filePath: e,
        name: "file",
        header: {
            "Content-Type": "application/json"
        },
        formData: {
            storeId: o
        },
        success: function(e) {
            console.log(e);
            var o = JSON.parse(e.data);
            if (o.data) try {
                wx.setStorageSync("wj_speechSearch", o.data), wx.navigateTo({
                    url: "/pages/mallModule/goods/search/search"
                });
            } catch (e) {} else wx.showToast({
                title: "未检测到语音",
                icon: "none",
                duration: 2e3
            });
        },
        fail: function(e) {
            console.log(e), wx.hideToast();
        }
    };
    wx.uploadFile(t);
}

var o = getApp(), t = wx.getRecorderManager();

t.onStart(function() {
    console.log("recorder start");
}), t.onPause(function() {
    console.log("recorder pause");
}), t.onStop(function(e) {
    console.log("recorder stop", e);
    e.tempFilePath;
}), t.onFrameRecorded(function(e) {
    var o = e.frameBuffer;
    console.log("frameBuffer.byteLength", o.byteLength);
}), t.onError(function(e) {
    console.log("error", e);
}), Component({
    properties: {
        tabbar: {
            type: Object,
            value: {}
        },
        popupShade: {
            type: Boolean,
            value: !0
        },
        show: Boolean
    },
    data: {
        storeId: "",
        recorderType: "normal",
        speechStart: !1
    },
    methods: {
        onPopupShade: function() {
            this.triggerEvent("popup-shade"), this.data.popupShade && this.triggerEvent("popup");
        },
        toSearch: function() {
            console.log("跳转");
        },
        popupVoice: function() {
            console.log("长按");
        },
        recorderStart: function(e) {
            this.onPopupShade(), this.setData({
                speechStart: !0,
                storeId: o.globalData.storeInfo.id
            }), console.log();
            var a = this, r = {
                duration: 1e4,
                sampleRate: 16e3,
                numberOfChannels: 1,
                encodeBitRate: 48e3,
                format: "aac",
                frameSize: 50
            };
            t.start(r), t.onStart(function() {
                a.setData({
                    recorderType: "success"
                });
            });
        },
        recorderCancel: function(e) {
            this.onPopupShade(), console.log("录音取消", e), t.stop(), that.setData({
                recorderType: "cancel",
                speechStart: !1
            });
        },
        recorderMove: function(e) {},
        recorderEnd: function(o) {
            var a = this;
            this.onPopupShade(), console.log("结束");
            var r = this;
            r.setData({
                speechStart: !1
            });
            var n = r.data.recorderType;
            t.stop(), console.log(n), "success" === n && t.onStop(function(o) {
                var t = o.tempFilePath;
                console.log(t), e(t, a.data.storeId);
            });
        }
    }
});