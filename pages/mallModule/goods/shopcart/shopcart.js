var app = getApp();
var url = app.globalData.imgurl;
var imgurl = app.globalData.url;
var server = require("../../../../utils/server.js")

Page({
  data: {
    selectedAllStatus: true,
    no_goods: false,
    carts_footer: false,
    imgurl: imgurl,
    delBtnWidth: 134,//删除按钮宽度单位（rpx）
    num: 1,
    nums: [],
    carts: [],
    id: [],
    total: '',
    addnum:0
    // minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled']
  },
  //手指刚放到屏幕触发
  touchS: function (e) {
    // console.log(e);
    //判断是否只有一个触摸点
    if (e.touches.length == 1) {
      this.setData({
        //记录触摸起始位置的X坐标
        startX: e.touches[0].clientX
      });
    }
  },
  //触摸时触发，手指在屏幕上每移动一次，触发一次
  touchM: function (e) {
    // console.log(e);
    var that = this
    if (e.touches.length == 1) {
      //记录触摸点位置的X坐标
      var moveX = e.touches[0].clientX;
      //计算手指起始点的X坐标与当前触摸点的X坐标的差值
      var disX = that.data.startX - moveX;
      //delBtnWidth 为右侧按钮区域的宽度
      var delBtnWidth = that.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0rpx";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "rpx";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "rpx";
        }
      }
      //获取手指触摸的是哪一个item
      var index = e.currentTarget.dataset.index;
      var list = that.data.carts;
      //将拼接好的样式设置到当前item中
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        carts: list
      });
    }
  },
  touchE: function (e) {
    // console.log(e);
    var that = this
    if (e.changedTouches.length == 1) {
      //手指移动结束后触摸点位置的X坐标
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = that.data.startX - endX;
      var delBtnWidth = that.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "rpx" : "left:0rpx";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var list = that.data.carts;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      that.setData({
        carts: list
      });
    }
  },
  // 删除某一条数据
  delItem: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var wxtoken = wx.getStorageSync("wxtoken");
    wx.showModal({
      title: '确认删除',
      success(res) {
        if (res.confirm) { //如果确认删除则请求删除接口
          wx.request({
            url: url + '/Cart/delete/cart_ids/' + index + '/wxtoken/' + wxtoken,
            success(res) {
              var data = res.data;
              console.log(data)

              if (data.status ==1) {
                wx.showToast({
                  title: data.msg,
                  icon: 'success',
                  duration: 1000
                });
                // that.show_carts();
                that.getCarts();
              };
              if (data.msg == '删除失败') {
                wx.showToast({
                  title: data.msg,
                  icon: 'loading',
                  duration: 1000
                })
              }
            }
          })
        }
      }
    })
  },
      bindMinus: function (e) {
        var index = parseInt(e.currentTarget.dataset.index);
        var num = this.data.carts[index].goods_num;
        // 如果只有1件了，就不允许再减了
        if (num > 1) {
            num--;
        }
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 购物车数据
        var carts = this.data.carts;
        carts[index].goods_num = num;
        // 按钮可用状态
        var minusStatuses = this.data.minusStatuses;
        minusStatuses[index] = minusStatus;
        // 将数值与状态写回
        this.setData({
            carts: carts,
            minusStatuses: minusStatuses
        });
        // update database
        //carts[index].save();

        this.saveNum(carts[index].id, num, carts[index].selected);
        this.sum();
    },





  // bindMinus: function (e) {
  //   var index = parseInt(e.currentTarget.dataset.index);//得到下标
  //   var num = this.data.carts[index].goods_num;
  //   // 如果只有1件了，就不允许再减了
  //   if (num > 1) {
  //     num--;
  //   }
  //   // 只有大于一件的时候，才能normal状态，否则disable状态
  //   // var minusStatus = num <= 1 ? 'disabled' : 'normal';
  //   // 购物车数据
  //   var carts = this.data.carts;
  //   carts[index].goods_num = num;
  //   // 按钮可用状态
  //   // var minusStatuses = this.data.minusStatuses;
  //   // minusStatuses[index] = minusStatus;
  //   // 将数值与状态写回
  //   this.setData({
  //     nums: carts[index].goods_num,
  //     carts: carts,
  //     // minusStatuses: minusStatuses
  //   });
  //   this.sum()
  // },
  bindPlus: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carts[index].goods_num;
    // 自增
    num++;

    // 只有大于一件的m时候，才能normal状态，否则disable状态
    // var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 购物车数据
    var carts = this.data.carts;
    carts[index].goods_num = num;
    // 按钮可用状态
    // var minusStatuses = this.data.minusStatuses;
    // minusStatuses[index] = minusStatus;
    // console.log(minusStatuses[index])
    // 将数值与状态写回
    this.setData({
      nums: carts[index].goods_num,
      carts: carts,
      // minusStatuses: minusStatuses
    });

    this.saveNum(carts[index].id, num, carts[index].selected);

    this.sum()
  },

   saveNum: function (id, num, selected) {
        var that = this;
        server.getJSON('/Cart/changeNum/id/' + id + "/goods_num/" + num + '/selected/' + selected + '/wxtoken/' + wx.getStorageSync('wxtoken'), function (res) {
            that.getCarts();
        });
    },


    getCarts: function () {
    var minusStatuses = [];
        var that = this;
        server.getJSON('/Cart/index/wxtoken/' + wx.getStorageSync('wxtoken'), function (res) {
            var carts = res.data.result.list
          
            var goodsList = [];
            if (carts.length != 0)
                that.setData({ empty: false });
            else {
                that.setData({ empty: true });
            }
            var selectedAllStatus = true;
            for (var i = 0; i < carts.length; i++) {
                if (carts[i].selected == 1)
                    carts[i].selected = true;
                else {
                    carts[i].selected = false;
                    selectedAllStatus = false;
                }
                minusStatuses[i] = 1;//carts[i].get('quantity') <= 1 ? 'disabled' : 'normal';
            }
            that.setData({
                carts: carts,
                selectedAllStatus: selectedAllStatus,
                minusStatuses: minusStatuses
            });
            that.sum();
        });
    },




  bindCheckbox: function (e) {
    var that = this;
    //绑定点击事件，将checkbox样式改变为选中与非选中
    //拿到下标值，以在carts作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[index].selected = !selected;
    var count = 0;
    for (var i = 0; i < carts.length; i++) {
      var selected_status = carts[i].selected;
      if (selected_status == true) {
        count++;
        if (count == carts.length) {
          var selectedAllStatus = this.data.selectedAllStatus;
          selectedAllStatus = !selectedAllStatus;

        } else {
          selectedAllStatus = false;
        }
      } else {

        count--;
      }
    };
    // 写回经点击修改后的数组
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carts: carts
    });
    this.sum()
  },
  bindSelectAll: function (e) {
    // 环境中目前已选状态 
    var selectedAllStatus = this.data.selectedAllStatus;
    // 取反操作 
    selectedAllStatus = !selectedAllStatus;
    // 购物车数据，关键是处理selected值 
    var carts = this.data.carts;
    // 遍历 
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carts: carts
    });
    this.sum()
  },
  bindCheckout: function (e) {
    // 初始化toastStr字符串
    var toastStr = 'cid:';
    // 遍历取出已勾选的cid
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].selected) {
        toastStr += this.data.carts[i].cid;
        toastStr += ' ';
      }
    }
    //存回data
    this.setData({
      toastHidden: false,
      toastStr: toastStr
    });
  },
  bindToastChange: function (e) {
    this.setData({
      toastHidden: true
    });
  },




  //总价
  sum: function (e) {
      var carts = this.data.carts;
        // 计算总金额
        var total = 0;
        for (var i = 0; i < carts.length; i++) {

            if (carts[i].selected) {
                total += carts[i].goods_num * carts[i].member_goods_price;
            }
        }
        var newValue = parseInt(total * 100);
        total = newValue / 100.0;
        // 写回经点击修改后的数组
        this.setData({
            carts: carts,
            total: total
        });
         app.show_carts();
  },




  // 去结算
  go_pay: function (e) {
    var that = this;
    // var id = that.data.id;
    // var num = that.data.nums;
    // var ids = [];
    // var nums = [];
    var goods = [];
    for (var i = 0; i < that.data.carts.length; i++) {
      if (that.data.carts[i].selected == true) {
        // ids.push(that.data.carts[i].id)
        // nums.push(that.data.carts[i].num)
        goods.push({ "id": that.data.carts[i].id, "goodsNum": that.data.carts[i].goods_num })
      }
    }
    var goodsNum = encodeURIComponent(JSON.stringify(goods));
    var addnum=that.data.addnum
    // 选中状态后再前去结算 跳转到优惠券选择页面
    if (goods.length == 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'loading',
        duration: 1500
      })
    }else if(addnum==0){
       // wx.showToast({
       //    title:'请填写收货地址'
       // })
         wx.navigateTo({
            url:"../../../mallModule/member/address/addAddress/addAddress?cart=1"
         })
    } 
    else {
      wx.navigateTo({
        url: '../../../mallModule/order/perfectOrder/perfectOrder',
      })
    }
  },
  go_shopping: function () { //去逛逛 前去商城
    wx.reLaunch({
      url: '/pages/mallModule/index/index/index',
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.sum();
  },
  //收货地址判断
  address:function(){
    var wxtoken=wx.getStorageSync('wxtoken');
    var that=this
    server.getJSON('/user/address_list/wxtoken/' + wxtoken,function(res){
        console.log('收货地址判断');
        console.log(res);
        var num=res.data.list.length
         that.setData({addnum:num})
    })
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var that = this;
     this.getCarts();
     this.address();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})


