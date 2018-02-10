'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chart = function (_wepy$page) {
  _inherits(Chart, _wepy$page);

  function Chart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Chart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Chart.__proto__ || Object.getPrototypeOf(Chart)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '',
      navigationBarBackgroundColor: '#333333',
      navigationBarTextStyle: 'white'
    }, _this.components = {}, _this.mixins = [], _this.data = {
      starTime: new Date(new Date().setHours(9, 30, 0, 0)) / 1000,
      endTime: new Date(new Date().setHours(15, 0, 0, 0)) / 1000,
      tsData: [],
      sharesData: '', // 股票价格数据
      timeShareData: null, // 股票均价涨幅数据
      ts1: null, // 分时价格走势图对象
      ts2: null, // 分时买卖走势图对象
      kLine: null,
      kLineB: null,
      chartType: 'ts', // K线图类型
      getDataTime: null // 获取行情数据定时器
    }, _this.computed = {}, _this.watch = {}, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chart, [{
    key: 'onLoad',
    value: function onLoad(options) {}
  }, {
    key: 'onUnload',
    value: function onUnload() {}
  }]);

  return Chart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Chart , 'pages/chart'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXJ0LmpzIl0sIm5hbWVzIjpbIkNoYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJzdGFyVGltZSIsIkRhdGUiLCJzZXRIb3VycyIsImVuZFRpbWUiLCJ0c0RhdGEiLCJzaGFyZXNEYXRhIiwidGltZVNoYXJlRGF0YSIsInRzMSIsInRzMiIsImtMaW5lIiwia0xpbmVCIiwiY2hhcnRUeXBlIiwiZ2V0RGF0YVRpbWUiLCJjb21wdXRlZCIsIndhdGNoIiwibWV0aG9kcyIsImV2ZW50cyIsIm9wdGlvbnMiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0IsRUFEakI7QUFFUEMsb0NBQThCLFNBRnZCO0FBR1BDLDhCQUF3QjtBQUhqQixLLFFBTVRDLFUsR0FBYSxFLFFBSWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxnQkFBVSxJQUFJQyxJQUFKLENBQVMsSUFBSUEsSUFBSixHQUFXQyxRQUFYLENBQW9CLENBQXBCLEVBQXVCLEVBQXZCLEVBQTJCLENBQTNCLEVBQThCLENBQTlCLENBQVQsSUFBNkMsSUFEbEQ7QUFFTEMsZUFBUyxJQUFJRixJQUFKLENBQVMsSUFBSUEsSUFBSixHQUFXQyxRQUFYLENBQW9CLEVBQXBCLEVBQXdCLENBQXhCLEVBQTJCLENBQTNCLEVBQThCLENBQTlCLENBQVQsSUFBNkMsSUFGakQ7QUFHTEUsY0FBUSxFQUhIO0FBSUxDLGtCQUFZLEVBSlAsRUFJVztBQUNoQkMscUJBQWUsSUFMVixFQUtnQjtBQUNyQkMsV0FBSyxJQU5BLEVBTU07QUFDWEMsV0FBSyxJQVBBLEVBT007QUFDWEMsYUFBTyxJQVJGO0FBU0xDLGNBQVEsSUFUSDtBQVVMQyxpQkFBVyxJQVZOLEVBVVk7QUFDakJDLG1CQUFhLElBWFIsQ0FXYTtBQVhiLEssUUFjUEMsUSxHQUFXLEUsUUFJWEMsSyxHQUFRLEUsUUFJUkMsTyxHQUFVLEUsUUFJVkMsTSxHQUFTLEU7Ozs7OzJCQUVGQyxPLEVBQVMsQ0FFZjs7OytCQUVXLENBRVg7Ozs7RUEvQ2dDLGVBQUtDLEk7O2tCQUFuQjFCLEsiLCJmaWxlIjoiY2hhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJycsXG4gICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzMzMzMzMycsXG4gICAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXG4gICAgfVxuXG4gICAgY29tcG9uZW50cyA9IHtcblxuICAgIH1cblxuICAgIG1peGlucyA9IFtdXG5cbiAgICBkYXRhID0ge1xuICAgICAgc3RhclRpbWU6IG5ldyBEYXRlKG5ldyBEYXRlKCkuc2V0SG91cnMoOSwgMzAsIDAsIDApKSAvIDEwMDAsXG4gICAgICBlbmRUaW1lOiBuZXcgRGF0ZShuZXcgRGF0ZSgpLnNldEhvdXJzKDE1LCAwLCAwLCAwKSkgLyAxMDAwLFxuICAgICAgdHNEYXRhOiBbXSxcbiAgICAgIHNoYXJlc0RhdGE6ICcnLCAvLyDogqHnpajku7fmoLzmlbDmja5cbiAgICAgIHRpbWVTaGFyZURhdGE6IG51bGwsIC8vIOiCoeelqOWdh+S7t+a2qOW5heaVsOaNrlxuICAgICAgdHMxOiBudWxsLCAvLyDliIbml7bku7fmoLzotbDlir/lm77lr7nosaFcbiAgICAgIHRzMjogbnVsbCwgLy8g5YiG5pe25Lmw5Y2W6LWw5Yq/5Zu+5a+56LGhXG4gICAgICBrTGluZTogbnVsbCxcbiAgICAgIGtMaW5lQjogbnVsbCxcbiAgICAgIGNoYXJ0VHlwZTogJ3RzJywgLy8gS+e6v+Wbvuexu+Wei1xuICAgICAgZ2V0RGF0YVRpbWU6IG51bGwgLy8g6I635Y+W6KGM5oOF5pWw5o2u5a6a5pe25ZmoXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG5cbiAgICB9XG5cbiAgICB3YXRjaCA9IHtcblxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG5cbiAgICB9XG5cbiAgICBldmVudHMgPSB7fVxuXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcblxuICAgIH1cblxuICAgIG9uVW5sb2FkICgpIHtcblxuICAgIH1cbiAgfVxuIl19