function t(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

var e = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var o = arguments[e];
        for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
}, o = require("../../api/productService.js"), a = require("../../api/shopcartService.js");

getApp();

Component({
    properties: {
        show: {
            type: Boolean,
            value: !1,
            observer: function(t, e, o) {
                this._propertyChange(t, e);
            }
        },
        productId: String,
        storeId: String,
        onClickChoice: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        show: {
            middle: !1
        },
        name: "",
        cateringGroupProducts: [],
        productId: "",
        isAdd: !1
    },
    _data: {
        storeId: ""
    },
    attached: function() {
        console.log("123attached");
    },
    ready: function() {},
    methods: {
        _getDetailsById: function(t) {
            var e = this;
            o.getDetailsById(t, this.data.storeId).then(function(t) {
                e.setData({
                    name: t.name,
                    cateringGroupProducts: t.cateringGroupProducts,
                    productId: t.id
                }), e.toggleMiddlePopup();
            }).catch(function(t) {
                wx.showToast({
                    title: t.message,
                    icon: "none"
                });
            });
        },
        _onClickChoice: function() {
            this.triggerEvent("choice-result"), this.data.onClickChoice && this.triggerEvent("choice");
        },
        _chooseOutcome: function(t) {
            this.triggerEvent("outcome-result");
            var e = {
                outcome: t
            };
            this.data.onClickChoice && (this.data.isAdd ? (e = {
                outcome: !0
            }, this.triggerEvent("outcome", e), this.setData({
                isAdd: !1
            })) : (e = {
                outcome: !1
            }, this.triggerEvent("outcome", e))), t && this.setData({
                show: !1
            });
        },
        _emptyMethods: function() {},
        _addShopcart: function(t) {
            var e = this, o = e.data.cateringGroupProducts, i = [], r = !0, n = null, s = null;
            if (o && o.length > 0) {
                for (var c = [], d = 0; d < o.length; d++) {
                    var u = o[d];
                    if (u.mealDetails && u.mealDetails.length > 0) {
                        for (var l = 0, h = 0; h < u.mealDetails.length; h++) {
                            var p = u.mealDetails[h];
                            if (p.defalutChoose) {
                                if (1 != p.exist) {
                                    r = !1, n = p;
                                    break;
                                }
                                var g = {
                                    groupId: u.groupId,
                                    groupProductId: p.productId
                                };
                                c.push(g), l++;
                            }
                        }
                        if (!0 === u.required && 0 === l) {
                            r = !1, s = u;
                            break;
                        }
                    }
                }
                var f = {
                    count: 1,
                    lists: c,
                    productId: e.data.productId
                };
                i.push(f);
            }
            if (r) {
                var m = {
                    lists: i,
                    storeId: e.data.storeId
                };
                a.cateringAdd(m).then(function(t) {
                    wx.showToast({
                        title: "添加购物袋成功~",
                        icon: "none",
                        duration: 2e3
                    }), e.toggleMiddlePopup(), e.setData({
                        isAdd: !0
                    }), e._chooseOutcome(!0);
                }).catch(function(t) {
                    e._chooseOutcome(!1), wx.showToast({
                        title: t.message,
                        icon: "none",
                        duration: 2e3
                    });
                });
            } else n ? wx.showToast({
                title: n.productName + "已售完",
                icon: "none",
                duration: 2e3
            }) : s && wx.showToast({
                title: s.groupName + "必选",
                icon: "none",
                duration: 2e3
            });
        },
        onClickMealGroupGoods: function(t) {
            for (var o = this, a = t.currentTarget.dataset.index, i = t.currentTarget.dataset.productid, r = o.data.cateringGroupProducts, n = 0; n < r.length; n++) n == a && function() {
                var t = r[n];
                if ("SINGLE" === t.chooseType) {
                    var o = [];
                    t.mealDetails.forEach(function(t, a) {
                        t = t.productId === i ? e({}, t, {
                            defalutChoose: !t.defalutChoose
                        }) : e({}, t, {
                            defalutChoose: !1
                        }), o.push(t);
                    }), r[n].mealDetails = o;
                } else {
                    var a = [];
                    t.mealDetails.forEach(function(o, r) {
                        if (o.productId === i) {
                            for (var n = 0, s = 0; s < t.mealDetails.length; s++) t.mealDetails[s].defalutChoose && n++;
                            1 == n && o.defalutChoose || (o = e({}, o, {
                                defalutChoose: !o.defalutChoose
                            }));
                        }
                        a.push(o);
                    }), r[n].mealDetails = a;
                }
            }();
            o.setData({
                cateringGroupProducts: r
            });
        },
        _propertyChange: function(t, e) {
            !0 === t && !1 === e && this.onClickShow();
        },
        onClickShow: function() {
            this._getDetailsById(this.data.productId);
        },
        toggleMiddlePopup: function() {
            this.toggle("middle");
        },
        catchtouchmove: function() {},
        toggle: function(e) {
            this.setData(t({}, "show." + e, !this.data.show[e])), !1 === this.data.show.middle && this._chooseOutcome(!0);
        }
    }
});