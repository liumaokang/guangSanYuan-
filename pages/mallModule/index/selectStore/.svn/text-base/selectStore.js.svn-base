var e, t = require("../../../../utils/utils.js"), a = require("../../../../api/storeService.js"), s = getApp(), o = require("../../../../libs/qqmap-wx-jssdk.min.js");

Page({
    data: {
        searchLabelShow: !1,
        searchText: "搜索门店",
        currentAddress: "",
        currentAddressDetail: "-",
        storeList: [],
        allStoreList: [],
        frequencyStore: {},
        page: 0,
        loading: !0,
        noStoreData: !1,
        refresh: !1
    },
    handleFocus: function(e) {
        this.setData({
            searchLabelShow: !0
        });
    },
    handleBlur: function(e) {
        e.detail.value ? this.setData({
            searchLabelShow: !0
        }) : this.setData({
            searchLabelShow: !1
        });
    },
    getFrequencyStore: function() {
        var e = this;
        a.getFrequencyStore().then(function(a) {
            if (console.log("常去门店", a), a) {
                a.active = !1, s.globalData.storeInfo.code == a.code && (a.active = !0);
                var o = e.data, n = o.latitude, r = o.longitude;
                console.log(n, r, a.latitude, a.longitude), a.distance = t.distance(n, r, a.latitude, a.longitude).toFixed(2), 
                e.setData({
                    frequencyStore: a
                });
            }
        }).catch(function(e) {
            wx.showToast({
                title: e.message,
                icon: "none",
                duration: 2e3
            });
        });
    },
    navToStore: function(e) {
        console.log(e);
        var t = e.currentTarget.dataset.item;
        wx.openLocation({
            latitude: Number(t.latitude),
            longitude: Number(t.longitude)
        });
    },
    hadleStoreOrder: function(e, a) {
        try {
            var o = wx.getStorageSync("wj_allStores"), n = [], r = [];
            o.forEach(function(s) {
                var o = t.distance(e, a, s.latitude, s.longitude);
                n.push({
                    distance: o,
                    code: s.code
                });
            }), (r = [].concat(n)).sort(function(e) {
                return function(t, a) {
                    return t[e] - a[e];
                };
            }("distance"));
            for (var i = [], d = 0; d < r.length; d++) for (var l = 0; l < n.length; l++) r[d].code == n[l].code && (o[l].distance = r[d].distance, 
            i.push(o[l]));
            try {
                wx.setStorageSync("wj_allStores", i);
            } catch (e) {
                console.log(e);
            }
            for (var c = [], u = 0; u < i.length; u++) s.globalData.storeInfo && s.globalData.storeInfo.code == i[u].code ? c.push({
                id: i[u].id,
                code: i[u].code,
                name: i[u].name,
                address: i[u].address,
                distance: r[u].distance.toFixed(2),
                latitude: i[u].latitude,
                longitude: i[u].longitude,
                storeHours: i[u].storeHours,
                shipmentTypes: i[u].shipmentTypes,
                tel: i[u].tel,
                active: !0
            }) : c.push({
                id: i[u].id,
                code: i[u].code,
                name: i[u].name,
                address: i[u].address,
                distance: r[u].distance.toFixed(2),
                latitude: i[u].latitude,
                longitude: i[u].longitude,
                storeHours: i[u].storeHours,
                shipmentTypes: i[u].shipmentTypes,
                tel: i[u].tel,
                active: !1
            });
            var h = [];
            if (c.length > 10) for (var g = 0; g < 10; g++) h.push(c[g]); else for (var f = 0; f < c.length; f++) h.push(c[f]);
            console.log(h);
            var S = this.data.frequencyStore, D = t.distance(e, a, S.latitude, S.longitude).toFixed(2);
            this.setData({
                storeList: h,
                allStoreList: c,
                noStoreData: !1,
                "frequencyStore.distance": D,
                refresh: !1
            });
        } catch (e) {
            console.log(e);
        }
    },
    danleStoreListInfo: function(t, a, o) {
        this.setData({
            latitude: a,
            longitude: o
        }), e.reverseGeocoder({
            location: {
                latitude: a,
                longitude: o
            },
            success: function(e) {
                console.log(e), e.result && (t.options.name ? t.setData({
                    currentAddress: t.options.name,
                    currentAddressDetail: t.options.address
                }) : !t.options.name && s.globalData.addressInfo ? t.setData({
                    currentAddress: s.globalData.addressInfo.name,
                    currentAddressDetail: s.globalData.addressInfo.address
                }) : t.setData({
                    currentAddress: e.result.formatted_addresses.recommend,
                    currentAddressDetail: e.result.address
                }));
            },
            fail: function(e) {
                console.log(e), t.setData({
                    currentAddress: "位置获取错误",
                    currentAddressDetail: "-"
                });
            }
        }), t.hadleStoreOrder(a, o);
    },
    onLoad: function(t) {
        wx.hideShareMenu(), console.log(t);
        var a = this;
        e = new o({
            key: "AD5BZ-CHCKS-64OOD-6G6TX-BSOA6-IFF3V"
        }), this.handleBeforeDanleStoreListInfo(a, a.options), this.getFrequencyStore();
    },
    clickStore: function(e) {
        this.data.storeList.forEach(function(t, a) {
            e.currentTarget.dataset.key == t.code ? (t.active = !0, s.globalData.storeInfo = t) : t.active = !1;
        }), e.currentTarget.dataset.key == this.data.frequencyStore.code && (this.setData({
            "frequencyStore.active": !0
        }), s.globalData.storeInfo = this.data.frequencyStore), this.setData({
            storeList: this.data.storeList
        }), wx.navigateBack({
            delta: 1
        });
    },
    handleInput: function(e) {
        if (e.detail.value) this.setData({
            searchItem: e.detail.value
        }); else {
            for (var t = [], a = wx.getStorageSync("wj_allStores"), s = 0; s < 10; s++) t.push({
                id: a[s].id,
                code: a[s].code,
                name: a[s].name,
                address: a[s].address,
                distance: a[s].distance.toFixed(2),
                latitude: a[s].latitude,
                longitude: a[s].longitude,
                storeHours: a[s].storeHours,
                shipmentTypes: a[s].shipmentTypes,
                tel: a[s].tel,
                active: !1
            });
            this.setData({
                storeList: t
            });
        }
    },
    clearSearchKey: function() {
        this.setData({
            searchItem: "",
            searchLabelShow: !1
        }), this.handleConfirm({
            detail: {
                value: ""
            }
        });
    },
    handleConfirm: function(e) {
        if (console.log(e), e.detail.value) {
            this.setData({
                searchLabelShow: !0
            });
            var t = [], a = wx.getStorageSync("wj_allStores"), s = new RegExp(e.detail.value.trim());
            a.forEach(function(e) {
                s.test(e.name) && (e.distance || (e.distance = 999.99), t.push({
                    id: e.id,
                    code: e.code,
                    name: e.name,
                    address: e.address,
                    distance: e.distance.toFixed(2),
                    latitude: e.latitude,
                    longitude: e.longitude,
                    storeHours: e.storeHours,
                    shipmentTypes: e.shipmentTypes,
                    tel: e.tel,
                    active: !1
                }));
            }), this.setData({
                storeList: t
            });
        } else {
            this.setData({
                searchLabelShow: !1
            });
            for (var t = [], a = wx.getStorageSync("wj_allStores"), o = 0; o < 10; o++) a[o].distance || (a[o].distance = 999.99), 
            t.push({
                id: a[o].id,
                code: a[o].code,
                name: a[o].name,
                address: a[o].address,
                distance: a[o].distance.toFixed(2),
                latitude: a[o].latitude,
                longitude: a[o].longitude,
                storeHours: a[o].storeHours,
                shipmentTypes: a[o].shipmentTypes,
                tel: a[o].tel,
                active: !1
            });
            this.setData({
                storeList: t
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
        }), this.getAllStoreList(), this.getFrequencyStore();
        var e = this.data.allStoreList, t = [];
        if (e.length > 0) for (var a = 0; a < 10; a++) t.push(e[a]); else t = [];
        this.setData({
            storeList: t,
            page: 0
        }), console.log(t), wx.stopPullDownRefresh();
    },
    getAllStoreList: function() {
        var e = this;
        e.data.allStoreList;
        this.setData({
            storeList: [],
            allStoreList: [],
            page: 0
        }), a.queryList().then(function(t) {
            var a = [];
            t.forEach(function(e) {
                "OPEN" === e.status && a.push(e);
            });
            try {
                wx.removeStorageSync("wj_allStores"), wx.setStorageSync("wj_allStores", a), e.handleBeforeDanleStoreListInfo(e, e.options);
            } catch (e) {
                console.log(e), wx.showToast({
                    title: e.message,
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    handleBeforeDanleStoreListInfo: function(e, t) {
        var a = "", o = "";
        console.log("====>选择的位置：", e.options, e.options.lat, e.options.lng), t.name && t.lat && t.lng ? (s.globalData.addressInfo = t, 
        a = t.lat, o = t.lng, e.setData({
            currentAddress: t.name,
            currentAddressDetail: t.address
        }), e.danleStoreListInfo(e, a, o)) : !t.name && s.globalData.addressInfo ? (a = s.globalData.addressInfo.lat, 
        o = s.globalData.addressInfo.lng, e.setData({
            currentAddress: s.globalData.addressInfo.name,
            currentAddressDetail: s.globalData.addressInfo.address
        }), e.danleStoreListInfo(e, a, o)) : wx.getLocation({
            type: "gcj02",
            success: function(t) {
                a = t.latitude, o = t.longitude, e.danleStoreListInfo(e, a, o);
            }
        });
    },
    onReachBottom: function() {},
    loadList: function() {
        var e = this;
        e.setData({
            loading: !0
        });
        var t = [], a = this.data.allStoreList, s = this.data.storeList, o = [], n = this.data.page, r = Math.ceil(a.length / 10);
        if (n === r) wx.showToast({
            title: "已经加载到底了~",
            icon: "none",
            duration: 2e3
        }); else {
            for (var i = 0; i < a.length; i += 10) t.push(a.slice(i, i + 10));
            n++, o = s.concat(t[n]), console.log(o), setTimeout(function() {
                e.setData({
                    storeList: o,
                    page: n
                });
            }, 500), e.setData({
                loading: !1
            });
        }
    },
    onShareAppMessage: function() {},
    toSelectAddress: function() {
        var e = this;
        wx.chooseLocation({
            success: function(t) {
                console.log(t), e.setData({
                    currentAddress: t.name,
                    currentAddressDetail: t.address
                });
                var a = {
                    name: t.name,
                    address: t.address,
                    lat: t.latitude,
                    lng: t.longitude
                };
                e.options = a, s.globalData.addressInfo = a, e.hadleStoreOrder(t.latitude, t.longitude);
            },
            fail: function() {},
            complete: function() {}
        });
    }
});