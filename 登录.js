Page({

  /**
   * 页面的初始数据
   */
  data: {
    //数字键盘
    numericKeyboard: [
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 4 },
      { number: 5 },
      { number: 6 },
      { number: 7 },
      { number: 8 },
      { number: 9 },
      { number: '*' },
      { number: 0 },
      { number: '#' },
    ],
    key:"",
    pwdArr: [],
    showInputKeyboard: false,
  },

  //保存输入的密码
  savePwd: function (e) {
    let that = this;
    let value = e.currentTarget.dataset.num;
    let pwdArr = that.data.pwdArr;
    pwdArr.push(value);
    that.setData({
      pwdArr: pwdArr,
    })
    if(pwdArr=="5,1,0")
    {
      wx.navigateTo({
        url: '../index/index',
      })
    }
  },

  //点击
  ljly: function (e) {
    let that = this;
    that.setData({
      showInputKeyboard: true
    })
  },

  //删除 移除密码数组最后一个元素
  delLast: function (e) {
    let that = this;
    let pwdArr = that.data.pwdArr;
    pwdArr.pop();
    that.setData({
      pwdArr: pwdArr
    })
  },

  //取消 置空密码数组，关闭遮罩
  cancel: function (e) {
    let that = this;
    that.setData({
      showInputKeyboard: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})