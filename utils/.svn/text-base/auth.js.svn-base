module.exports.setUser = function(e) {
    wx.setStorageSync("__user__", e), this.setTokens(e);
}, module.exports.clearUserInfo = function() {
    try {
        wx.removeStorageSync("__access_tokens__"), wx.removeStorageSync("__user__");
    } catch (e) {}
    getApp().globalData.userInfo = null;
}, module.exports.getUser = function() {
    return wx.getStorageSync("__user__");
}, module.exports.setTokens = function(e) {
    if (e) try {
        wx.setStorageSync("__access_tokens__", {
            accessToken: e.accessToken,
            expiresTo: new Date().getTime() + 1e3 * parseInt(e.expiresIn),
            refreshToken: e.refreshToken,
            refreshExpiresTo: new Date().getTime() + 1e3 * parseInt(e.refreshExpiresIn)
        });
    } catch (e) {} else this.clearTokens();
}, module.exports.clearTokens = function() {
    try {
        wx.removeStorageSync("__access_tokens__");
    } catch (e) {}
}, module.exports.getTokens = function() {
    return wx.getStorageSync("__access_tokens__");
};