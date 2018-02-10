'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _storage = require('./../utils/storage.js');

var _storage2 = _interopRequireDefault(_storage);

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
      kLine: null, // 价格走势图对象
      kLineB: null, // 买卖走势图对象
      ma5Arr: null,
      ma5bArr: null,
      ma10Arr: null,
      ma10bArr: null,
      ma20Arr: null,
      ma20bArr: null,
      ma5: '',
      ma10: '',
      ma20: '',
      ma5b: '',
      ma10b: '',
      ma20b: '',
      tabName: '',
      stock: '',
      code: '',
      time: '',
      yc: '',
      kl1RenderTime: 0,
      kl2RenderTime: 0,
      minIndex: 3,
      minArray: ['5分钟', '15分钟', '30分钟', '60分钟'],
      chartType: 'day' // K线图类型
    }, _this.computed = {}, _this.watch = {}, _this.methods = {
      // tab切换K图
      tab: function tab(type) {
        this.chartType = type;
        // if (this.chartType === 'ts') {
        //   this.painTs()
        // } else {
        //   this.iniTs5()
        // }
        this.$apply();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chart, [{
    key: 'paintDataK',


    // 绘制日K线图
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
      this.paintDataK();
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {}
  }]);

  return Chart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Chart , 'pages/k'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImsuanMiXSwibmFtZXMiOlsiQ2hhcnQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwia0xpbmUiLCJrTGluZUIiLCJtYTVBcnIiLCJtYTViQXJyIiwibWExMEFyciIsIm1hMTBiQXJyIiwibWEyMEFyciIsIm1hMjBiQXJyIiwibWE1IiwibWExMCIsIm1hMjAiLCJtYTViIiwibWExMGIiLCJtYTIwYiIsInRhYk5hbWUiLCJzdG9jayIsImNvZGUiLCJ0aW1lIiwieWMiLCJrbDFSZW5kZXJUaW1lIiwia2wyUmVuZGVyVGltZSIsIm1pbkluZGV4IiwibWluQXJyYXkiLCJjaGFydFR5cGUiLCJjb21wdXRlZCIsIndhdGNoIiwibWV0aG9kcyIsInRhYiIsInR5cGUiLCIkYXBwbHkiLCJldmVudHMiLCJnZXREa0RhdGEiLCJpbml0IiwiZ2V0T3B0aW9uS2xpbmUxIiwibWV0YURhdGExIiwiZHJhdyIsImdldE9wdGlvbktsaW5lMiIsIm1ldGFEYXRhMiIsIm9wdGlvbnMiLCJwYWludERhdGFLIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsb0NBQThCLFNBRHZCO0FBRVBDLDhCQUF3QjtBQUZqQixLLFFBS1RDLFUsR0FBYSxFLFFBSWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxhQUFPLElBREYsRUFDUTtBQUNiQyxjQUFRLElBRkgsRUFFUztBQUNkQyxjQUFRLElBSEg7QUFJTEMsZUFBUyxJQUpKO0FBS0xDLGVBQVMsSUFMSjtBQU1MQyxnQkFBVSxJQU5MO0FBT0xDLGVBQVMsSUFQSjtBQVFMQyxnQkFBVSxJQVJMO0FBU0xDLFdBQUssRUFUQTtBQVVMQyxZQUFNLEVBVkQ7QUFXTEMsWUFBTSxFQVhEO0FBWUxDLFlBQU0sRUFaRDtBQWFMQyxhQUFPLEVBYkY7QUFjTEMsYUFBTyxFQWRGO0FBZUxDLGVBQVMsRUFmSjtBQWdCTEMsYUFBTyxFQWhCRjtBQWlCTEMsWUFBTSxFQWpCRDtBQWtCTEMsWUFBTSxFQWxCRDtBQW1CTEMsVUFBSSxFQW5CQztBQW9CTEMscUJBQWUsQ0FwQlY7QUFxQkxDLHFCQUFlLENBckJWO0FBc0JMQyxnQkFBVSxDQXRCTDtBQXVCTEMsZ0JBQVUsQ0FBQyxLQUFELEVBQVEsTUFBUixFQUFnQixNQUFoQixFQUF3QixNQUF4QixDQXZCTDtBQXdCTEMsaUJBQVcsS0F4Qk4sQ0F3Qlk7QUF4QlosSyxRQTJCUEMsUSxHQUFXLEUsUUFJWEMsSyxHQUFRLEUsUUFJUkMsTyxHQUFVO0FBQ1I7QUFDQUMsU0FGUSxlQUVIQyxJQUZHLEVBRUc7QUFDVCxhQUFLTCxTQUFMLEdBQWlCSyxJQUFqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLQyxNQUFMO0FBQ0Q7QUFWTyxLLFFBeUJWQyxNLEdBQVMsRTs7Ozs7OztBQVpUO2lDQUNjO0FBQ1osVUFBTS9CLE9BQU8sa0JBQVFnQyxTQUFSLEVBQWI7QUFDQSxXQUFLL0IsS0FBTCxHQUFhLHFCQUFHLFFBQUgsRUFBYWdDLElBQWIsQ0FBa0IsaUJBQU9DLGVBQVAsQ0FBdUIsSUFBdkIsQ0FBbEIsQ0FBYjtBQUNBLFdBQUtqQyxLQUFMLENBQVdrQyxTQUFYLENBQXFCbkMsSUFBckIsRUFBMkIsaUJBQU9rQyxlQUFQLENBQXVCLElBQXZCLENBQTNCO0FBQ0EsV0FBS2pDLEtBQUwsQ0FBV21DLElBQVg7O0FBRUEsV0FBS2xDLE1BQUwsR0FBYyxxQkFBRyxVQUFILEVBQWUrQixJQUFmLENBQW9CLGlCQUFPSSxlQUFQLENBQXVCLElBQXZCLENBQXBCLENBQWQ7QUFDQSxXQUFLbkMsTUFBTCxDQUFZb0MsU0FBWixDQUFzQnRDLElBQXRCLEVBQTRCLGlCQUFPcUMsZUFBUCxDQUF1QixJQUF2QixDQUE1QjtBQUNBLFdBQUtuQyxNQUFMLENBQVlrQyxJQUFaO0FBQ0Q7OzsyQkFJTUcsTyxFQUFTO0FBQ2QsV0FBS0MsVUFBTDtBQUNEOzs7K0JBRVcsQ0FFWDs7OztFQWhGZ0MsZUFBS0MsSTs7a0JBQW5CL0MsSyIsImZpbGUiOiJrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi4vdXRpbHMvc3RvcmFnZSdcbiAgaW1wb3J0IGtsIGZyb20gJy4uL3V0aWxzL3d4Q2hhcnQvay1saW5lJ1xuICBpbXBvcnQgY29tbW9uIGZyb20gJy4uL3V0aWxzL2NvbW1vbidcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFydCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogJyMzMzMzMzMnLFxuICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xuICAgIH1cblxuICAgIGNvbXBvbmVudHMgPSB7XG5cbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGtMaW5lOiBudWxsLCAvLyDku7fmoLzotbDlir/lm77lr7nosaFcbiAgICAgIGtMaW5lQjogbnVsbCwgLy8g5Lmw5Y2W6LWw5Yq/5Zu+5a+56LGhXG4gICAgICBtYTVBcnI6IG51bGwsXG4gICAgICBtYTViQXJyOiBudWxsLFxuICAgICAgbWExMEFycjogbnVsbCxcbiAgICAgIG1hMTBiQXJyOiBudWxsLFxuICAgICAgbWEyMEFycjogbnVsbCxcbiAgICAgIG1hMjBiQXJyOiBudWxsLFxuICAgICAgbWE1OiAnJyxcbiAgICAgIG1hMTA6ICcnLFxuICAgICAgbWEyMDogJycsXG4gICAgICBtYTViOiAnJyxcbiAgICAgIG1hMTBiOiAnJyxcbiAgICAgIG1hMjBiOiAnJyxcbiAgICAgIHRhYk5hbWU6ICcnLFxuICAgICAgc3RvY2s6ICcnLFxuICAgICAgY29kZTogJycsXG4gICAgICB0aW1lOiAnJyxcbiAgICAgIHljOiAnJyxcbiAgICAgIGtsMVJlbmRlclRpbWU6IDAsXG4gICAgICBrbDJSZW5kZXJUaW1lOiAwLFxuICAgICAgbWluSW5kZXg6IDMsXG4gICAgICBtaW5BcnJheTogWyc15YiG6ZKfJywgJzE15YiG6ZKfJywgJzMw5YiG6ZKfJywgJzYw5YiG6ZKfJ10sXG4gICAgICBjaGFydFR5cGU6ICdkYXknIC8vIEvnur/lm77nsbvlnotcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcblxuICAgIH1cblxuICAgIHdhdGNoID0ge1xuXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8vIHRhYuWIh+aNokvlm75cbiAgICAgIHRhYiAodHlwZSkge1xuICAgICAgICB0aGlzLmNoYXJ0VHlwZSA9IHR5cGVcbiAgICAgICAgLy8gaWYgKHRoaXMuY2hhcnRUeXBlID09PSAndHMnKSB7XG4gICAgICAgIC8vICAgdGhpcy5wYWluVHMoKVxuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgIHRoaXMuaW5pVHM1KClcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8g57uY5Yi25pelS+e6v+WbvlxuICAgIHBhaW50RGF0YUsgKCkge1xuICAgICAgY29uc3QgZGF0YSA9IHN0b3JhZ2UuZ2V0RGtEYXRhKClcbiAgICAgIHRoaXMua0xpbmUgPSBrbCgnay1saW5lJykuaW5pdChjb21tb24uZ2V0T3B0aW9uS2xpbmUxKCdkaycpKVxuICAgICAgdGhpcy5rTGluZS5tZXRhRGF0YTEoZGF0YSwgY29tbW9uLmdldE9wdGlvbktsaW5lMSgnZGsnKSlcbiAgICAgIHRoaXMua0xpbmUuZHJhdygpXG5cbiAgICAgIHRoaXMua0xpbmVCID0ga2woJ2stbGluZS1iJykuaW5pdChjb21tb24uZ2V0T3B0aW9uS2xpbmUyKCdkaycpKVxuICAgICAgdGhpcy5rTGluZUIubWV0YURhdGEyKGRhdGEsIGNvbW1vbi5nZXRPcHRpb25LbGluZTIoJ2RrJykpXG4gICAgICB0aGlzLmtMaW5lQi5kcmF3KClcbiAgICB9XG5cbiAgICBldmVudHMgPSB7fVxuXG4gICAgb25Mb2FkKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMucGFpbnREYXRhSygpXG4gICAgfVxuXG4gICAgb25VbmxvYWQgKCkge1xuXG4gICAgfVxuICB9XG4iXX0=