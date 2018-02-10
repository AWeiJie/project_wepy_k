'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _storage = require('./../utils/storage.js');

var _storage2 = _interopRequireDefault(_storage);

var _timeSharing = require('./../utils/wxChart/time-sharing.js');

var _timeSharing2 = _interopRequireDefault(_timeSharing);

var _kLine = require('./../utils/wxChart/k-line.js');

var _kLine2 = _interopRequireDefault(_kLine);

var _common = require('./../utils/common.js');

var _common2 = _interopRequireDefault(_common);

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
    }, _this.computed = {}, _this.watch = {}, _this.methods = {
      // tab切换分时图&日K图
      tab: function tab(type) {
        this.chartType = type;
        if (this.chartType === 'ts') {
          this.paint();
        } else {
          this.paintDataK();
        }
        this.$apply();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chart, [{
    key: 'renderTs1',


    // 调用ts1的方法进行绘制分时走势图
    value: function renderTs1(data, canvasWidth) {
      this.ts1.metaData1(data, _common2.default.getOptionTimeSharing1('', canvasWidth));
      this.ts1.draw();
    }

    // 调用ts2的方法进行绘制分时成交量条形图

  }, {
    key: 'renderTs2',
    value: function renderTs2(data, canvasWidth) {
      this.ts2.metaData2(data, _common2.default.getOptionTimeSharing2('', canvasWidth));
      this.ts2.draw();
    }

    // 开始绘制分时图

  }, {
    key: 'paint',
    value: function paint() {
      // 设置canvas的宽度
      var canvasWidth = 0;
      _wepy2.default.getSystemInfo({
        success: function success(result) {
          canvasWidth = result.windowWidth;
        }
      });
      this.getTsData = _storage2.default.getTsData(); // 调用模拟数据
      this.ts1 = (0, _timeSharing2.default)('time-sharing').init(_common2.default.getOptionTimeSharing1('', canvasWidth)); // 获得关于分时走势图的对象
      this.renderTs1(this.getTsData, canvasWidth); // 调用方法进行绘制分时走势图
      this.ts2 = (0, _timeSharing2.default)('time-sharing-b').init(_common2.default.getOptionTimeSharing2('', canvasWidth)); // 获得关于分时条形图的对象
      this.renderTs2(this.getTsData, canvasWidth); // 调用方法进行绘制分时条形图
      this.$apply();
    }

    // 绘制日K线图

  }, {
    key: 'paintDataK',
    value: function paintDataK() {
      var data = _storage2.default.getDkData();
      this.kLine = (0, _kLine2.default)('k-line').init(_common2.default.getOptionKline1('dk'));
      this.kLine.metaData1(data, _common2.default.getOptionKline1('dk'));
      this.kLine.draw();

      this.kLineB = (0, _kLine2.default)('k-line-b').init(_common2.default.getOptionKline2('dk'));
      this.kLineB.metaData2(data, _common2.default.getOptionKline2('dk'));
      this.kLineB.draw();
    }
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      this.paint();
      this.paintDataK();
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {}
  }]);

  return Chart;
}(_wepy2.default.page);

exports.default = Chart;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRzLjEuanMiXSwibmFtZXMiOlsiQ2hhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwic3RhclRpbWUiLCJEYXRlIiwic2V0SG91cnMiLCJlbmRUaW1lIiwidHNEYXRhIiwic2hhcmVzRGF0YSIsInRpbWVTaGFyZURhdGEiLCJ0czEiLCJ0czIiLCJrTGluZSIsImtMaW5lQiIsImNoYXJ0VHlwZSIsImdldERhdGFUaW1lIiwiY29tcHV0ZWQiLCJ3YXRjaCIsIm1ldGhvZHMiLCJ0YWIiLCJ0eXBlIiwicGFpbnQiLCJwYWludERhdGFLIiwiJGFwcGx5IiwiZXZlbnRzIiwiY2FudmFzV2lkdGgiLCJtZXRhRGF0YTEiLCJnZXRPcHRpb25UaW1lU2hhcmluZzEiLCJkcmF3IiwibWV0YURhdGEyIiwiZ2V0T3B0aW9uVGltZVNoYXJpbmcyIiwiZ2V0U3lzdGVtSW5mbyIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJ3aW5kb3dXaWR0aCIsImdldFRzRGF0YSIsImluaXQiLCJyZW5kZXJUczEiLCJyZW5kZXJUczIiLCJnZXREa0RhdGEiLCJnZXRPcHRpb25LbGluZTEiLCJnZXRPcHRpb25LbGluZTIiLCJvcHRpb25zIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyxvQ0FBOEIsU0FEdkI7QUFFUEMsOEJBQXdCO0FBRmpCLEssUUFLVEMsVSxHQUFhLEUsUUFJYkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPO0FBQ0xDLGdCQUFVLElBQUlDLElBQUosQ0FBUyxJQUFJQSxJQUFKLEdBQVdDLFFBQVgsQ0FBb0IsQ0FBcEIsRUFBdUIsRUFBdkIsRUFBMkIsQ0FBM0IsRUFBOEIsQ0FBOUIsQ0FB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M0IsSUFBdEIsRUFBNEIsaUJBQUt1QyxlQUFMLENBQXFCLElBQXJCLENBQTVCO0FBQ0EsV0FBSzVCLE1BQUwsQ0FBWWUsSUFBWjtBQUNEOzs7MkJBSU1jLE8sRUFBUztBQUNkLFdBQUtyQixLQUFMO0FBQ0EsV0FBS0MsVUFBTDtBQUNEOzs7K0JBRVcsQ0FFWDs7OztFQWpHZ0MsZUFBS3FCLEk7O2tCQUFuQi9DLEsiLCJmaWxlIjoidHMuMS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGltcG9ydCBzdG9yYWdlIGZyb20gJy4uL3V0aWxzL3N0b3JhZ2UnXG4gIGltcG9ydCB0cyBmcm9tICcuLi91dGlscy93eENoYXJ0L3RpbWUtc2hhcmluZydcbiAgaW1wb3J0IGtsIGZyb20gJy4uL3V0aWxzL3d4Q2hhcnQvay1saW5lJ1xuICBpbXBvcnQgdXRpbCBmcm9tICcuLi91dGlscy9jb21tb24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMzMzMzMzJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgICB9XG5cbiAgICBjb21wb25lbnRzID0ge1xuXG4gICAgfVxuXG4gICAgbWl4aW5zID0gW11cblxuICAgIGRhdGEgPSB7XG4gICAgICBzdGFyVGltZTogbmV3IERhdGUobmV3IERhdGUoKS5zZXRIb3Vycyg5LCAzMCwgMCwgMCkpIC8gMTAwMCxcbiAgICAgIGVuZFRpbWU6IG5ldyBEYXRlKG5ldyBEYXRlKCkuc2V0SG91cnMoMTUsIDAsIDAsIDApKSAvIDEwMDAsXG4gICAgICB0c0RhdGE6IFtdLFxuICAgICAgc2hhcmVzRGF0YTogJycsIC8vIOiCoeelqOS7t+agvOaVsOaNrlxuICAgICAgdGltZVNoYXJlRGF0YTogbnVsbCwgLy8g6IKh56Wo5Z2H5Lu35rao5bmF5pWw5o2uXG4gICAgICB0czE6IG51bGwsIC8vIOWIhuaXtuS7t+agvOi1sOWKv+WbvuWvueixoVxuICAgICAgdHMyOiBudWxsLCAvLyDliIbml7bkubDljZbotbDlir/lm77lr7nosaFcbiAgICAgIGtMaW5lOiBudWxsLFxuICAgICAga0xpbmVCOiBudWxsLFxuICAgICAgY2hhcnRUeXBlOiAndHMnLCAvLyBL57q/5Zu+57G75Z6LXG4gICAgICBnZXREYXRhVGltZTogbnVsbCAvLyDojrflj5booYzmg4XmlbDmja7lrprml7blmahcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcblxuICAgIH1cblxuICAgIHdhdGNoID0ge1xuXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8vIHRhYuWIh+aNouWIhuaXtuWbvibml6VL5Zu+XG4gICAgICB0YWIgKHR5cGUpIHtcbiAgICAgICAgdGhpcy5jaGFydFR5cGUgPSB0eXBlXG4gICAgICAgIGlmICh0aGlzLmNoYXJ0VHlwZSA9PT0gJ3RzJykge1xuICAgICAgICAgIHRoaXMucGFpbnQoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucGFpbnREYXRhSygpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOiwg+eUqHRzMeeahOaWueazlei/m+ihjOe7mOWItuWIhuaXtui1sOWKv+WbvlxuICAgIHJlbmRlclRzMSAoZGF0YSwgY2FudmFzV2lkdGgpIHtcbiAgICAgIHRoaXMudHMxLm1ldGFEYXRhMShkYXRhLCB1dGlsLmdldE9wdGlvblRpbWVTaGFyaW5nMSgnJywgY2FudmFzV2lkdGgpKVxuICAgICAgdGhpcy50czEuZHJhdygpXG4gICAgfVxuXG4gICAgLy8g6LCD55SodHMy55qE5pa55rOV6L+b6KGM57uY5Yi25YiG5pe25oiQ5Lqk6YeP5p2h5b2i5Zu+XG4gICAgcmVuZGVyVHMyIChkYXRhLCBjYW52YXNXaWR0aCkge1xuICAgICAgdGhpcy50czIubWV0YURhdGEyKGRhdGEsIHV0aWwuZ2V0T3B0aW9uVGltZVNoYXJpbmcyKCcnLCBjYW52YXNXaWR0aCkpXG4gICAgICB0aGlzLnRzMi5kcmF3KClcbiAgICB9XG5cbiAgICAvLyDlvIDlp4vnu5jliLbliIbml7blm75cbiAgICBwYWludCAoKSB7XG4gICAgICAvLyDorr7nva5jYW52YXPnmoTlrr3luqZcbiAgICAgIGxldCBjYW52YXNXaWR0aCA9IDBcbiAgICAgIHdlcHkuZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICBjYW52YXNXaWR0aCA9IHJlc3VsdC53aW5kb3dXaWR0aFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5nZXRUc0RhdGEgPSBzdG9yYWdlLmdldFRzRGF0YSgpLy8g6LCD55So5qih5ouf5pWw5o2uXG4gICAgICB0aGlzLnRzMSA9IHRzKCd0aW1lLXNoYXJpbmcnKS5pbml0KHV0aWwuZ2V0T3B0aW9uVGltZVNoYXJpbmcxKCcnLCBjYW52YXNXaWR0aCkpIC8vIOiOt+W+l+WFs+S6juWIhuaXtui1sOWKv+WbvueahOWvueixoVxuICAgICAgdGhpcy5yZW5kZXJUczEodGhpcy5nZXRUc0RhdGEsIGNhbnZhc1dpZHRoKSAvLyDosIPnlKjmlrnms5Xov5vooYznu5jliLbliIbml7botbDlir/lm75cbiAgICAgIHRoaXMudHMyID0gdHMoJ3RpbWUtc2hhcmluZy1iJykuaW5pdCh1dGlsLmdldE9wdGlvblRpbWVTaGFyaW5nMignJywgY2FudmFzV2lkdGgpKSAvLyDojrflvpflhbPkuo7liIbml7bmnaHlvaLlm77nmoTlr7nosaFcbiAgICAgIHRoaXMucmVuZGVyVHMyKHRoaXMuZ2V0VHNEYXRhLCBjYW52YXNXaWR0aCkgLy8g6LCD55So5pa55rOV6L+b6KGM57uY5Yi25YiG5pe25p2h5b2i5Zu+XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuXG4gICAgLy8g57uY5Yi25pelS+e6v+WbvlxuICAgIHBhaW50RGF0YUsgKCkge1xuICAgICAgY29uc3QgZGF0YSA9IHN0b3JhZ2UuZ2V0RGtEYXRhKClcbiAgICAgIHRoaXMua0xpbmUgPSBrbCgnay1saW5lJykuaW5pdCh1dGlsLmdldE9wdGlvbktsaW5lMSgnZGsnKSlcbiAgICAgIHRoaXMua0xpbmUubWV0YURhdGExKGRhdGEsIHV0aWwuZ2V0T3B0aW9uS2xpbmUxKCdkaycpKVxuICAgICAgdGhpcy5rTGluZS5kcmF3KClcblxuICAgICAgdGhpcy5rTGluZUIgPSBrbCgnay1saW5lLWInKS5pbml0KHV0aWwuZ2V0T3B0aW9uS2xpbmUyKCdkaycpKVxuICAgICAgdGhpcy5rTGluZUIubWV0YURhdGEyKGRhdGEsIHV0aWwuZ2V0T3B0aW9uS2xpbmUyKCdkaycpKVxuICAgICAgdGhpcy5rTGluZUIuZHJhdygpXG4gICAgfVxuXG4gICAgZXZlbnRzID0ge31cblxuICAgIG9uTG9hZChvcHRpb25zKSB7XG4gICAgICB0aGlzLnBhaW50KClcbiAgICAgIHRoaXMucGFpbnREYXRhSygpXG4gICAgfVxuXG4gICAgb25VbmxvYWQgKCkge1xuXG4gICAgfVxuICB9XG4iXX0=