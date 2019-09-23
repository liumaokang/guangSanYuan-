Page({
    data: {
        remark: "",
        wordCount: 0
    },



    handelTextArea: function(t) {
        console.log(t)
        t.detail.cursor <= 50 ? (this.setData({
            remark: t.detail.value,
            wordCount: t.detail.cursor
        }), 50 == t.detail.cursor && wx.showToast({
            title: "备注信息最多不超过50个字符哦~",
            icon: "none",
            duration: 2e3
        })) : wx.showToast({
            title: "备注信息最多不超过50个字符哦~",
            icon: "none",
            duration: 2e3
        });
    },
    sure: function(t) {
      wx.navigateTo({
              url:'../../order/perfectOrder/perfectOrder?user_note='+this.data.remark+'&type='+this.data.type
        })
    },
    onLoad: function(t) {
      console.log(t)
      this.setData({
        type: t.type
      })
        wx.hideShareMenu();
    },
    onReady: function() {},
    onShow: function() {
        try {
            var t = wx.getStorageSync("wj_addRemarks");
            t && this.setData({
                remark: t
            });
        } catch (t) {}
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});