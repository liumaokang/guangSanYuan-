function e(e, o) {
    o = o || "", wx.navigateTo({
        url: e + o
    });
}

function o(e, o) {
    o = o || "", wx.reLaunch({
        url: e + o
    });
}

var t = require("./utils.js");

module.exports = {
    toHome: function(a) {
        var r = "/pages/mallModule/index/index/index";
        t.checkIsTabBar(r) ? o(r, a) : e(r, a);
    },
    toFightGroup: function(a) {
        var r = "/pages/mallModule/fightGroup/fightGroup/fightGroup";
        t.checkIsTabBar(r) ? o(r, a) : e(r, a);
    },
    toCategory: function(a) {
        var r = "/pages/mallModule/goods/category/category";
        t.checkIsTabBar(r) ? o(r, a) : e(r, a);
    },
    toShopcart: function(a) {
        var r = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], l = "/pages/mallModule/goods/shopcart/shopcart";
        t.checkIsTabBar(l) && r ? (console.log("relaunch"), o(l, a)) : e(l, a);
    },
    toMy: function(a, r) {
        var l = "/pages/mallModule/member/my/my";
        t.checkIsTabBar(l) || r ? o(l, a) : e(l, a);
    },
    toCouponCenter: function(o) {
        e("/pages/mallModule/coupon/couponCenter/couponCenter", o);
    },
    toCouponCenterCommunity: function(o) {
        e("/pages/mallModule/coupon/couponCenterCommunity/couponCenter", o);
    },
    toGiftCardCenter: function(o) {
        e("/pages/memberModule/giftCard/giftCard/giftCard", o);
    },
    toVip: function(o) {
        e("/pages/mallModule/member/vip/index", o);
    },
    toGoodsDetails: function(o) {
        e("/pages/mallModule/goods/goodsDetail/goodsDetail", o);
    },
    toMemberCard: function(o) {
        e("/pages/mallModule/myCard/memberCard/memberCard", o);
    },
    toSelectStore: function(o) {
        e("/pages/mallModule/index/selectStore/selectStore", o);
    },
    toSelectAddress: function(o) {
        e("/pages/mallModule/index/selectAddress/selectAddress", o);
    },
    toMemberInfo: function(o) {
        e("/pages/mallModule/member/memberInfo/memberInfo", o);
    },
    toSystem: function(o) {
        e("/pages/mallModule/member/system/system", o);
    },
    toAddressList: function(o) {
        e("/pages/mallModule/member/address/addressList/addressList?cart=1", o);
    },
    toAddAddress: function(o) {
        e("/pages/mallModule/member/address/addAddress/addAddress", o);
    },
    toRedPacket: function(o) {
        e("/pages/mallModule/member/redPacket/redPacket", o);
    },
    toBindMobile: function(o) {
        e("/pages/mallModule/member/bindMobile/bindMobile", o);
    },
    toInvite: function(o) {
        e("/pages/mallModule/invite/invite", o);
    },
    toOrderList: function(o) {
        e("/pages/mallModule/order/order/order", o);
    },
    toOrderDetails: function(o) {
        e("/pages/mallModule/order/orderDetails/orderDetails", o);
    },
    toLogisticsInfo: function(o) {
        e("/pages/mallModule/order/logisticsInfo/logisticsInfo", o);
    },
    toEvaluate: function(o) {
        e("/pages/mallModule/order/evaluate/evaluate", o);
    },
    toPerfectOrder: function(o) {
        e("/pages/mallModule/order/perfectOrder/perfectOrder", o);
    },
    toAddRemarks: function(o) {
        e("/pages/mallModule/order/addRemarks/addRemarks", o);
    },
    toRefund: function(o) {
        e("/pages/mallModule/order/refund/refund", o);
    },
    toRefundDetails: function(o) {
        e("/pages/mallModule/order/refundDetails/refundDetails", o);
    },
    toOrderTrajectory: function(o) {
        e("/pages/mallModule/order/orderTrajectory/orderTrajectory", o);
    },
    toSearch: function(o) {
        e("/pages/mallModule/goods/search/search", o);
    },
    toBalancePay: function(o) {
        e("/pages/mallModule/pay/pay/pay", o);
    },
    toPayMethod: function(o) {
        e("/pages/mallModule/order/orderDetails/orderDetails", o);
    },
    toPaymentSuccess: function(o) {
        e("/pages/mallModule/pay/payment/payment", o);
    },
    toMyCoupon: function(o) {
        e("/pages/mallModule/coupon/myCoupon/myCoupon", o);
    },
    toCouponHistory: function(o) {
        e("/pages/mallModule/coupon/couponHistory/couponHistory", o);
    },
    toCouponDetails: function(o) {
        e("/pages/mallModule/coupon/couponDetails/couponDetails", o);
    },
    toChoiceCoupon: function(o) {
        e("/pages/mallModule/coupon/choiceCoupon/choiceCoupon", o);
    },
    toRecharge: function(o) {
        e("/pages/mallModule/myCard/recharge/recharge", o);
    },
    toRechargeSuccess: function(o) {
        e("/pages/mallModule/myCard/rechargeSuccess/rechargeSuccess", o);
    },
    toBalance: function(o) {
        e("/pages/mallModule/myCard/balance/balance", o);
    },
    toCheckMobile: function(o) {
        e("/pages/mallModule/myCard/checkMobile/index", o);
    },
    toResetPassword: function(o) {
        e("/pages/mallModule/myCard/resetPassword/resetPassword", o);
    },
    toGroupPurchase: function(o) {
        e("/pages/mallModule/fightGroup/groupPurchase/groupPurchase", o);
    },
    toTeamList: function(o) {
        e("/pages/mallModule/fightGroup/teamList/teamList", o);
    },
    toNewmbrActivity: function(o) {
        e("/pages/mallModule/activity/newmbrActivity/newmbrActivity", o);
    },
    toAdvanceSell: function(o) {
        e("/pages/mallModule/activity/advanceSell/advanceSell", o);
    },
    toSeckill: function(a) {
        var r = "/pages/mallModule/activity/seckill/seckill";
        t.checkIsTabBar(r) ? o(r, a) : e(r, a);
    },
    toLuckDraw: function(o) {
        e("/pages/mallModule/activity/luckDraw/luckDraw", o);
    },
    toAdvertising: function(o) {
        e("/pages/mallModule/advertising/advertising", o);
    },
    toScoreDetails: function(o) {
        e("/pages/mallModule/score/score/score", o);
    },
    toScoreMall: function(o) {
        e("/pages/mallModule/score/scoreMall/scoreMall", o);
    },
    toScoreOrder: function(o) {
        e("/pages/mallModule/score/scoreOrder/scoreOrder", o);
    },
    toStoreOrder: function(o) {
        e("/pages/mallModule/order/storeOrder/index", o);
    },
    toStoreOrderDeatil: function(o) {
        e("/pages/mallModule/order/storeOrderDetail/index", "?id=" + o);
    },
    toMyDistribution: function(o) {
        e("/pages/mallModule/distribution/myDistribution/myDistribution", o);
    },
    toRankingList: function(o) {
        e("/pages/mallModule/distribution/rankingList/rankingList", o);
    },
    toProfit: function(o) {
        e("/pages/mallModule/distribution/profit/profit", o);
    },
    toDistributionTeamList: function(o) {
        e("/pages/mallModule/distribution/teamList/teamList", o);
    },
    toMemberIndex: function(o) {
        e("/pages/memberModule/index/index", o);
    },
    toGiftCardBuy: function(o) {
        e("/pages/memberModule/giftCard/giftCardBuy/giftCardBuy", o);
    },
    toUseNeedKnow: function(o) {
        e("/pages/memberModule/giftCard/useNeedKnow/useNeedKnow", o);
    },
    toGiftCardStoreList: function(o) {
        e("/pages/memberModule/giftCard/storeList/storeList", o);
    },
    toGiftCardPayQR: function(o) {
        e("/pages/memberModule/giftCard/giftCardPayQR/giftCardPayQR", o);
    },
    toGiveState: function(o) {
        e("/pages/memberModule/giftCard/giveState/giveState", o);
    },
    toCardBuyResult: function(o) {
        e("/pages/memberModule/giftCard/cardBuyResult/cardBuyResult", o);
    },
    toGiftCardDetails: function(o) {
        e("/pages/memberModule/giftCard/giftCardDetails/giftCardDetails", o);
    },
    toBuyHistory: function(o) {
        e("/pages/memberModule/giftCard/buyHistory/buyHistory", o);
    },
    toChoiceGiftCard: function(o) {
        e("/pages/memberModule/giftCard/choiceGiftCard/choiceGiftCard", o);
    },
    toGoodsComment: function(o) {
        e("/pages/mallModule/goods/goodsComment/goodsComment", o);
    },
    toAuthorize: function(o) {
        e("/pages/mallModule/member/authorize/authorize", o);
    },
    toFeedback: function(o) {
        e("/pages/mallModule/member/feedback/feedback", o);
    }
};