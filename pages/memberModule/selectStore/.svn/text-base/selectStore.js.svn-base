var t, e = require("../../../utils/utils.js"), a = require("../../../api/storeService.js"), s = getApp(), o = require("../../../libs/qqmap-wx-jssdk.min.js");

Page({
    data: {
        searchLabelShow: !1,
        searchText: "搜索门店",
        currentAddress: "",
        storeList: [],
        allStoreList: [],
        page: 0,
        loading: !0,
        noStoreData: !1,
        refresh: !1
    },
    handleFocus: function(t) {
        this.setData({
            searchLabelShow: !0
        });
    },
    handleBlur: function(t) {
        t.detail.value ? this.setData({
            searchLabelShow: !0
        }) : this.setData({
            searchLabelShow: !1
        });
    },
    hadleStoreOrder: function(t, a) {
        try {
            var o = wx.getStorageSync("_allStores_"), n = [], i = [];
            o.forEach(function(s) {
                var o = e.distance(t, a, s.latitude, s.longitude);
                n.push({
                    distance: o,
                    id: s.id
                });
            }), (i = [].concat(n)).sort(function(t) {
                return function(e, a) {
                    return e[t] - a[t];
                };
            }("distance"));
            for (var r = [], l = 0; l < i.length; l++) for (var d = 0; d < n.length; d++) i[l].id == n[d].id && (o[d].distance = i[l].distance, 
            r.push(o[d]));
            try {
                wx.setStorageSync("wj_allStores", r);
            } catch (t) {
                console.log(t);
            }
            for (var c = [], u = 0; u < r.length; u++) s.globalData.storeInfo && s.globalData.storeInfo.id == r[u].id ? c.push({
                id: r[u].id,
                name: r[u].name,
                address: r[u].address,
                distance: i[u].distance.toFixed(2),
                latitude: r[u].latitude,
                longitude: r[u].longitude,
                storeHours: r[u].storeHours,
                shipmentTypes: r[u].shipmentTypes,
                active: !0
            }) : c.push({
                id: r[u].id,
                name: r[u].name,
                address: r[u].address,
                distance: i[u].distance.toFixed(2),
                latitude: r[u].latitude,
                longitude: r[u].longitude,
                storeHours: r[u].storeHours,
                shipmentTypes: r[u].shipmentTypes,
                active: !1
            });
            var h = [];
            if (c.length > 10) for (var g = 0; g < 10; g++) h.push(c[g]); else for (var f = 0; f < c.length; f++) h.push(c[f]);
            console.log(h), this.setData({
                storeList: h,
                allStoreList: c,
                noStoreData: !1,
                refresh: !1
            });
        } catch (t) {
            console.log(t);
        }
    },
    danleStoreListInfo: function(e, a, s) {
        t.reverseGeocoder({
            location: {
                latitude: a,
                longitude: s
            },
            success: function(t) {
                console.log(t), e.setData({
                    currentAddress: t.result.formatted_addresses.recommend
                });
            },
            fail: function(t) {
                console.log(t);
            }
        }), e.hadleStoreOrder(a, s);
    },
    onLoad: function(e) {
        var a = this, n = "", i = "";
        t = new o({
            key: "M4TBZ-4KSRI-DQPGJ-54BUF-UUJX5-YKFH3"
        }), e.name && e.lat && e.lng ? (s.globalData.addressInfo = e, n = e.lat, i = e.lng, 
        this.setData({
            currentAddress: e.name
        }), a.danleStoreListInfo(a, n, i)) : !e.name && s.globalData.addressInfo ? (n = s.globalData.addressInfo.lat, 
        i = s.globalData.addressInfo.lng, this.setData({
            currentAddress: s.globalData.addressInfo.name
        }), a.danleStoreListInfo(a, n, i)) : wx.getLocation({
            type: "gcj02",
            success: function(t) {
                n = t.latitude, i = t.longitude, a.danleStoreListInfo(a, n, i);
            }
        });
    },
    clickStore: function(t) {
        console.log(t), this.data.storeList.forEach(function(e, a) {
            t.currentTarget.dataset.key == a ? (e.active = !0, s.globalData.storeInfo = e) : e.active = !1;
        }), this.setData({
            storeList: this.data.storeList
        }), wx.navigateBack({
            url: "../coupon/couponCenter/couponCenter"
        });
    },
    handleInput: function(t) {
        if (!t.detail.value) {
            for (var e = [], a = wx.getStorageSync("wj_allStores"), s = 0; s < 10; s++) e.push({
                id: a[s].id,
                name: a[s].name,
                address: a[s].address,
                distance: a[s].distance.toFixed(2),
                latitude: a[s].latitude,
                longitude: a[s].longitude,
                storeHours: a[s].storeHours,
                shipmentTypes: a[s].shipmentTypes,
                active: !1
            });
            this.setData({
                storeList: e
            });
        }
    },
    handleConfirm: function(t) {
        if (console.log(t), t.detail.value) {
            this.setData({
                searchLabelShow: !0
            }), console.log(t.detail.value);
            var e = [], a = wx.getStorageSync("wj_allStores"), s = new RegExp(t.detail.value);
            a.forEach(function(t) {
                s.test(t.name) && (console.log(t), e.push({
                    id: t.id,
                    name: t.name,
                    address: t.address,
                    distance: t.distance.toFixed(2),
                    latitude: t.latitude,
                    longitude: t.longitude,
                    storeHours: t.storeHours,
                    shipmentTypes: t.shipmentTypes,
                    active: !1
                }));
            }), this.setData({
                storeList: e
            });
        } else {
            this.setData({
                searchLabelShow: !1
            });
            for (var e = [], a = wx.getStorageSync("wj_allStores"), o = 0; o < 10; o++) e.push({
                id: a[o].id,
                name: a[o].name,
                address: a[o].address,
                distance: a[o].distance.toFixed(2),
                latitude: item.latitude,
                longitude: item.longitude,
                storeHours: a[o].storeHours,
                shipmentTypes: a[o].shipmentTypes,
                active: !1
            });
            this.setData({
                storeList: e
            });
        }
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            noStoreData: !0,
            refresh: !0
        }), this.getAllStoreList();
        var t = this.data.allStoreList, e = [];
        if (t.length > 0) for (var a = 0; a < 10; a++) e.push(t[a]); else e = [], console.log("1");
        this.setData({
            storeList: e,
            page: 0
        }), console.log(e), wx.stopPullDownRefresh();
    },
    getAllStoreList: function() {
        var t = this, e = this, o = "", n = "";
        e.data.allStoreList;
        this.setData({
            storeList: [],
            allStoreList: [],
            page: 0
        }), a.queryList().then(function(a) {
            console.log(a);
            var i = [];
            a.forEach(function(t) {
                "OPEN" === t.status && i.push(t);
            });
            try {
                wx.removeStorageSync("wj_allStores"), wx.setStorageSync("wj_allStores", i), e.options.name && e.options.lat && e.options.lng ? (s.globalData.addressInfo = e.options, 
                o = e.options.lat, n = e.options.lng, t.setData({
                    currentAddress: e.options.name
                }), e.danleStoreListInfo(e, o, n)) : !e.options.name && s.globalData.addressInfo ? (o = s.globalData.addressInfo.lat, 
                n = s.globalData.addressInfo.lng, t.setData({
                    currentAddress: s.globalData.addressInfo.name
                }), e.danleStoreListInfo(e, o, n)) : wx.getLocation({
                    type: "gcj02",
                    success: function(t) {
                        o = t.latitude, n = t.longitude, e.danleStoreListInfo(e, o, n);
                    }
                });
            } catch (t) {
                console.log(t), wx.showToast({
                    title: t.message,
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    onReachBottom: function() {},
    loadList: function() {
        var t = this;
        t.setData({
            loading: !0
        });
        var e = [], a = this.data.allStoreList, s = this.data.storeList, o = [], n = this.data.page, i = Math.ceil(a.length / 10);
        if (n === i) wx.showToast({
            title: "已经加载到底了~",
            icon: "none",
            duration: 2e3
        }); else {
            for (var r = 0; r < a.length; r += 10) e.push(a.slice(r, r + 10));
            n++, o = s.concat(e[n]), console.log(o), setTimeout(function() {
                t.setData({
                    storeList: o,
                    page: n
                });
            }, 500), t.setData({
                loading: !1
            });
        }
    },
    onShareAppMessage: function() {},
    toSelectAddress: function() {
        var t = this;
        wx.chooseLocation({
            success: function(e) {
                console.log(e), t.setData({
                    currentAddress: e.name
                }), t.hadleStoreOrder(e.latitude, e.longitude);
            },
            fail: function() {},
            complete: function() {}
        });
    }
});