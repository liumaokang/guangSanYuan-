var server = require('../../../../utils/server');
var app = getApp();
var url = app.globalData.url;
Page({
  data: {
    list: [],
    url: url
  },


  
  go_pingtuan: function (e) { //去拼团
    var id = e.currentTarget.dataset.id;
    var goodsid=e.currentTarget.dataset.goodsid;
    // console.log(goodsid)
    wx.navigateTo({
      url: '../../goods/goodsDetail/goodsDetail?goodsid=' + goodsid + '&goods_type=1'+'&team_id='+id,
    })
  },



  myday: function (endtime, startime) {
    return parseInt((Math.abs(endtime - startime)) / 3600 / 24 / 1000)
  },
  onLoad: function (e) {

    var t = this;
    var arra = [];
    var newDateS = new Date();
    var newDateE = new Date();
    var localtimer = new Date().getTime();
    // var days = t.myday(startime,endtime);
    server.getJSON("/LoginApi/group_list", function (res) {
      var list = res.data.list;
      // var start_time=res.data
      for (let i = 0; i < list.length; i++) {
        var start_time = list[i].start_time;
        var end_time = list[i].end_time;
        newDateS.setTime(start_time * 1000);
        newDateE.setTime(end_time * 1000);
        var start_times = newDateS.toLocaleDateString();
        var end_times = newDateE.toLocaleDateString();
        var start = start_times.replace(/\//g, '-')
        var end = end_times.replace(/\//g, '-')
        var d = (list[i].end_time - localtimer) / 3600 / 24;
        // var days = d.toFixed(1)
        // list[i]['days'] = days;
        list[i].start_time = start;
        list[i].end_time = end
        arra.push(list[i])
      }
      t.setData({
        list: arra
      })
      console.log(arra)
    })

    
  },
});