Page({
    data: {
        storeList: []
    },
    onLoad: function(n) {
        var o = this;
        wx.getStorage({
            key: "_storeRange_",
            success: function(n) {
                if (console.log(n), n.data) {
                    var t = [];
                    n.data && (t = n.data.stores), o.setData({
                        storeList: t
                    });
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(n) {
        return console.log(n), {
            title: "鲜丰水果，新鲜才好吃！",
            path: "/pages/advertising/advertising?webUrl=" + this.data.JSONEncodeURI,
            imageUrl: "http://xianfengapp.oss-cn-hangzhou.aliyuncs.com/xianfengImages/iconCover.png",
            success: function(n) {
                wx.showShareMenu({
                    withShareTicket: !0
                });
            }
        };
    }
});