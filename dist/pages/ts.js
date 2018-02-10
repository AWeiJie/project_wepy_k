'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _storage = require('./../utils/storage.js');

var _storage2 = _interopRequireDefault(_storage);

var _timeSharing = require('./../utils/wxChart/time-sharing.js');

var _timeSharing2 = _interopRequireDefault(_timeSharing);

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
      ts1: null, // 价格走势图对象
      ts2: null, // 买卖走势图对象
      tsd51: null,
      tsd52: null,
      chartType: 'ts' // K线图类型
    }, _this.computed = {}, _this.watch = {}, _this.methods = {
      // tab切换分时图&日K图
      tab: function tab(type) {
        this.chartType = type;
        if (this.chartType === 'ts') {
          this.painTs();
        } else {
          this.iniTs5();
        }
        this.$apply();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Chart, [{
    key: 'renderTs1',


    // 调用ts1的方法进行绘制走势图
    value: function renderTs1(data, canvasWidth) {
      this.ts1.metaData1(data, _common2.default.getOptionTimeSharing1('', canvasWidth));
      this.ts1.draw();
    }

    // 调用ts2的方法进行绘制成交量条形图

  }, {
    key: 'renderTs2',
    value: function renderTs2(data, canvasWidth) {
      this.ts2.metaData2(data, _common2.default.getOptionTimeSharing2('', canvasWidth));
      this.ts2.draw();
    }

    // 开始绘制分时图

  }, {
    key: 'painTs',
    value: function painTs() {
      // 设置canvas的宽度
      var canvasWidth = 0;
      _wepy2.default.getSystemInfo({
        success: function success(result) {
          canvasWidth = result.windowWidth;
        }
      });
      var data = _storage2.default.getTsData(); // 调用模拟数据
      this.ts1 = (0, _timeSharing2.default)('time-sharing').init(_common2.default.getOptionTimeSharing1('', canvasWidth)); // 获得关于分时走势图的对象
      this.renderTs1(data, canvasWidth); // 调用方法进行绘制分时走势图
      this.ts2 = (0, _timeSharing2.default)('time-sharing-b').init(_common2.default.getOptionTimeSharing2('', canvasWidth)); // 获得关于分时条形图的对象
      this.renderTs2(data, canvasWidth); // 调用方法进行绘制分时条形图
      this.$apply();
    }

    // 开始绘制五日图

  }, {
    key: 'iniTs5',
    value: function iniTs5() {
      // 设置canvas的宽度
      var canvasWidth = 0;
      _wepy2.default.getSystemInfo({
        success: function success(result) {
          canvasWidth = result.windowWidth;
        }
      });
      var data = _storage2.default.getTs5Data(); // 调用模拟数据
      this.tsd51 = (0, _timeSharing2.default)('time-sharing-5day').init(_common2.default.getOptionTimeSharing1('time-sharing-5day', canvasWidth));
      this.tsd52 = (0, _timeSharing2.default)('time-sharing-5day-b').init(_common2.default.getOptionTimeSharing2('time-sharing-5day', canvasWidth));
      this.tsd51.metaData1(data, _common2.default.getOptionTimeSharing1('time-sharing-5day', canvasWidth));
      this.tsd51.draw();
      this.tsd52.metaData2(data, _common2.default.getOptionTimeSharing2('time-sharing-5day', canvasWidth));
      this.tsd52.draw();
    }
  }, {
    key: 'onLoad',
    value: function onLoad(options) {
      this.painTs();
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {}
  }]);

  return Chart;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Chart , 'pages/ts'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRzLmpzIl0sIm5hbWVzIjpbIkNoYXJ0IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInRzMSIsInRzMiIsInRzZDUxIiwidHNkNTIiLCJjaGFydFR5cGUiLCJjb21wdXRlZCIsIndhdGNoIiwibWV0aG9kcyIsInRhYiIsInR5cGUiLCJwYWluVHMiLCJpbmlUczUiLCIkYXBwbHkiLCJldmVudHMiLCJjYW52YXNXaWR0aCIsIm1ldGFEYXRhMSIsImdldE9wdGlvblRpbWVTaGFyaW5nMSIsImRyYXciLCJtZXRhRGF0YTIiLCJnZXRPcHRpb25UaW1lU2hhcmluZzIiLCJnZXRTeXN0ZW1JbmZvIiwic3VjY2VzcyIsInJlc3VsdCIsIndpbmRvd1dpZHRoIiwiZ2V0VHNEYXRhIiwiaW5pdCIsInJlbmRlclRzMSIsInJlbmRlclRzMiIsImdldFRzNURhdGEiLCJvcHRpb25zIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsb0NBQThCLFNBRHZCO0FBRVBDLDhCQUF3QjtBQUZqQixLLFFBS1RDLFUsR0FBYSxFLFFBSWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxXQUFLLElBREEsRUFDTTtBQUNYQyxXQUFLLElBRkEsRUFFTTtBQUNYQyxhQUFPLElBSEY7QUFJTEMsYUFBTyxJQUpGO0FBS0xDLGlCQUFXLElBTE4sQ0FLVztBQUxYLEssUUFRUEMsUSxHQUFXLEUsUUFJWEMsSyxHQUFRLEUsUUFJUkMsTyxHQUFVO0FBQ1I7QUFDQUMsU0FGUSxlQUVIQyxJQUZHLEVBRUc7QUFDVCxhQUFLTCxTQUFMLEdBQWlCSyxJQUFqQjtBQUNBLFlBQUksS0FBS0wsU0FBTCxLQUFtQixJQUF2QixFQUE2QjtBQUMzQixlQUFLTSxNQUFMO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsZUFBS0MsTUFBTDtBQUNEO0FBQ0QsYUFBS0MsTUFBTDtBQUNEO0FBVk8sSyxRQTREVkMsTSxHQUFTLEU7Ozs7Ozs7QUEvQ1Q7OEJBQ1dkLEksRUFBTWUsVyxFQUFhO0FBQzVCLFdBQUtkLEdBQUwsQ0FBU2UsU0FBVCxDQUFtQmhCLElBQW5CLEVBQXlCLGlCQUFPaUIscUJBQVAsQ0FBNkIsRUFBN0IsRUFBaUNGLFdBQWpDLENBQXpCO0FBQ0EsV0FBS2QsR0FBTCxDQUFTaUIsSUFBVDtBQUNEOztBQUVEOzs7OzhCQUNXbEIsSSxFQUFNZSxXLEVBQWE7QUFDNUIsV0FBS2IsR0FBTCxDQUFTaUIsU0FBVCxDQUFtQm5CLElBQW5CLEVBQXlCLGlCQUFPb0IscUJBQVAsQ0FBNkIsRUFBN0IsRUFBaUNMLFdBQWpDLENBQXpCO0FBQ0EsV0FBS2IsR0FBTCxDQUFTZ0IsSUFBVDtBQUNEOztBQUVEOzs7OzZCQUNVO0FBQ1I7QUFDQSxVQUFJSCxjQUFjLENBQWxCO0FBQ0EscUJBQUtNLGFBQUwsQ0FBbUI7QUFDakJDLGlCQUFTLGlCQUFVQyxNQUFWLEVBQWtCO0FBQ3pCUix3QkFBY1EsT0FBT0MsV0FBckI7QUFDRDtBQUhnQixPQUFuQjtBQUtBLFVBQU14QixPQUFPLGtCQUFReUIsU0FBUixFQUFiLENBUlEsQ0FRd0I7QUFDaEMsV0FBS3hCLEdBQUwsR0FBVywyQkFBRyxjQUFILEVBQW1CeUIsSUFBbkIsQ0FBd0IsaUJBQU9ULHFCQUFQLENBQTZCLEVBQTdCLEVBQWlDRixXQUFqQyxDQUF4QixDQUFYLENBVFEsQ0FTMEU7QUFDbEYsV0FBS1ksU0FBTCxDQUFlM0IsSUFBZixFQUFxQmUsV0FBckIsRUFWUSxDQVUwQjtBQUNsQyxXQUFLYixHQUFMLEdBQVcsMkJBQUcsZ0JBQUgsRUFBcUJ3QixJQUFyQixDQUEwQixpQkFBT04scUJBQVAsQ0FBNkIsRUFBN0IsRUFBaUNMLFdBQWpDLENBQTFCLENBQVgsQ0FYUSxDQVc0RTtBQUNwRixXQUFLYSxTQUFMLENBQWU1QixJQUFmLEVBQXFCZSxXQUFyQixFQVpRLENBWTBCO0FBQ2xDLFdBQUtGLE1BQUw7QUFDRDs7QUFFRDs7Ozs2QkFDVTtBQUNSO0FBQ0EsVUFBSUUsY0FBYyxDQUFsQjtBQUNBLHFCQUFLTSxhQUFMLENBQW1CO0FBQ2pCQyxpQkFBUyxpQkFBVUMsTUFBVixFQUFrQjtBQUN6QlIsd0JBQWNRLE9BQU9DLFdBQXJCO0FBQ0Q7QUFIZ0IsT0FBbkI7QUFLQSxVQUFNeEIsT0FBTyxrQkFBUTZCLFVBQVIsRUFBYixDQVJRLENBUXlCO0FBQ2pDLFdBQUsxQixLQUFMLEdBQWEsMkJBQUcsbUJBQUgsRUFBd0J1QixJQUF4QixDQUE2QixpQkFBT1QscUJBQVAsQ0FBNkIsbUJBQTdCLEVBQWtERixXQUFsRCxDQUE3QixDQUFiO0FBQ0EsV0FBS1gsS0FBTCxHQUFhLDJCQUFHLHFCQUFILEVBQTBCc0IsSUFBMUIsQ0FBK0IsaUJBQU9OLHFCQUFQLENBQTZCLG1CQUE3QixFQUFrREwsV0FBbEQsQ0FBL0IsQ0FBYjtBQUNBLFdBQUtaLEtBQUwsQ0FBV2EsU0FBWCxDQUFxQmhCLElBQXJCLEVBQTJCLGlCQUFPaUIscUJBQVAsQ0FBNkIsbUJBQTdCLEVBQWtERixXQUFsRCxDQUEzQjtBQUNBLFdBQUtaLEtBQUwsQ0FBV2UsSUFBWDtBQUNBLFdBQUtkLEtBQUwsQ0FBV2UsU0FBWCxDQUFxQm5CLElBQXJCLEVBQTJCLGlCQUFPb0IscUJBQVAsQ0FBNkIsbUJBQTdCLEVBQWtETCxXQUFsRCxDQUEzQjtBQUNBLFdBQUtYLEtBQUwsQ0FBV2MsSUFBWDtBQUNEOzs7MkJBSU1ZLE8sRUFBUztBQUNkLFdBQUtuQixNQUFMO0FBQ0Q7OzsrQkFFVyxDQUVYOzs7O0VBaEdnQyxlQUFLb0IsSTs7a0JBQW5CckMsSyIsImZpbGUiOiJ0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGltcG9ydCBzdG9yYWdlIGZyb20gJy4uL3V0aWxzL3N0b3JhZ2UnXG4gIGltcG9ydCB0cyBmcm9tICcuLi91dGlscy93eENoYXJ0L3RpbWUtc2hhcmluZydcbiAgaW1wb3J0IGNvbW1vbiBmcm9tICcuLi91dGlscy9jb21tb24nXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcnQgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6ICcjMzMzMzMzJyxcbiAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgICB9XG5cbiAgICBjb21wb25lbnRzID0ge1xuXG4gICAgfVxuXG4gICAgbWl4aW5zID0gW11cblxuICAgIGRhdGEgPSB7XG4gICAgICB0czE6IG51bGwsIC8vIOS7t+agvOi1sOWKv+WbvuWvueixoVxuICAgICAgdHMyOiBudWxsLCAvLyDkubDljZbotbDlir/lm77lr7nosaFcbiAgICAgIHRzZDUxOiBudWxsLFxuICAgICAgdHNkNTI6IG51bGwsXG4gICAgICBjaGFydFR5cGU6ICd0cycgLy8gS+e6v+Wbvuexu+Wei1xuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuXG4gICAgfVxuXG4gICAgd2F0Y2ggPSB7XG5cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgLy8gdGFi5YiH5o2i5YiG5pe25Zu+JuaXpUvlm75cbiAgICAgIHRhYiAodHlwZSkge1xuICAgICAgICB0aGlzLmNoYXJ0VHlwZSA9IHR5cGVcbiAgICAgICAgaWYgKHRoaXMuY2hhcnRUeXBlID09PSAndHMnKSB7XG4gICAgICAgICAgdGhpcy5wYWluVHMoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuaW5pVHM1KClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8g6LCD55SodHMx55qE5pa55rOV6L+b6KGM57uY5Yi26LWw5Yq/5Zu+XG4gICAgcmVuZGVyVHMxIChkYXRhLCBjYW52YXNXaWR0aCkge1xuICAgICAgdGhpcy50czEubWV0YURhdGExKGRhdGEsIGNvbW1vbi5nZXRPcHRpb25UaW1lU2hhcmluZzEoJycsIGNhbnZhc1dpZHRoKSlcbiAgICAgIHRoaXMudHMxLmRyYXcoKVxuICAgIH1cblxuICAgIC8vIOiwg+eUqHRzMueahOaWueazlei/m+ihjOe7mOWItuaIkOS6pOmHj+adoeW9ouWbvlxuICAgIHJlbmRlclRzMiAoZGF0YSwgY2FudmFzV2lkdGgpIHtcbiAgICAgIHRoaXMudHMyLm1ldGFEYXRhMihkYXRhLCBjb21tb24uZ2V0T3B0aW9uVGltZVNoYXJpbmcyKCcnLCBjYW52YXNXaWR0aCkpXG4gICAgICB0aGlzLnRzMi5kcmF3KClcbiAgICB9XG5cbiAgICAvLyDlvIDlp4vnu5jliLbliIbml7blm75cbiAgICBwYWluVHMgKCkge1xuICAgICAgLy8g6K6+572uY2FudmFz55qE5a695bqmXG4gICAgICBsZXQgY2FudmFzV2lkdGggPSAwXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgY2FudmFzV2lkdGggPSByZXN1bHQud2luZG93V2lkdGhcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGNvbnN0IGRhdGEgPSBzdG9yYWdlLmdldFRzRGF0YSgpLy8g6LCD55So5qih5ouf5pWw5o2uXG4gICAgICB0aGlzLnRzMSA9IHRzKCd0aW1lLXNoYXJpbmcnKS5pbml0KGNvbW1vbi5nZXRPcHRpb25UaW1lU2hhcmluZzEoJycsIGNhbnZhc1dpZHRoKSkgLy8g6I635b6X5YWz5LqO5YiG5pe26LWw5Yq/5Zu+55qE5a+56LGhXG4gICAgICB0aGlzLnJlbmRlclRzMShkYXRhLCBjYW52YXNXaWR0aCkgLy8g6LCD55So5pa55rOV6L+b6KGM57uY5Yi25YiG5pe26LWw5Yq/5Zu+XG4gICAgICB0aGlzLnRzMiA9IHRzKCd0aW1lLXNoYXJpbmctYicpLmluaXQoY29tbW9uLmdldE9wdGlvblRpbWVTaGFyaW5nMignJywgY2FudmFzV2lkdGgpKSAvLyDojrflvpflhbPkuo7liIbml7bmnaHlvaLlm77nmoTlr7nosaFcbiAgICAgIHRoaXMucmVuZGVyVHMyKGRhdGEsIGNhbnZhc1dpZHRoKSAvLyDosIPnlKjmlrnms5Xov5vooYznu5jliLbliIbml7bmnaHlvaLlm75cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG5cbiAgICAvLyDlvIDlp4vnu5jliLbkupTml6Xlm75cbiAgICBpbmlUczUgKCkge1xuICAgICAgLy8g6K6+572uY2FudmFz55qE5a695bqmXG4gICAgICBsZXQgY2FudmFzV2lkdGggPSAwXG4gICAgICB3ZXB5LmdldFN5c3RlbUluZm8oe1xuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgY2FudmFzV2lkdGggPSByZXN1bHQud2luZG93V2lkdGhcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGNvbnN0IGRhdGEgPSBzdG9yYWdlLmdldFRzNURhdGEoKS8vIOiwg+eUqOaooeaLn+aVsOaNrlxuICAgICAgdGhpcy50c2Q1MSA9IHRzKCd0aW1lLXNoYXJpbmctNWRheScpLmluaXQoY29tbW9uLmdldE9wdGlvblRpbWVTaGFyaW5nMSgndGltZS1zaGFyaW5nLTVkYXknLCBjYW52YXNXaWR0aCkpXG4gICAgICB0aGlzLnRzZDUyID0gdHMoJ3RpbWUtc2hhcmluZy01ZGF5LWInKS5pbml0KGNvbW1vbi5nZXRPcHRpb25UaW1lU2hhcmluZzIoJ3RpbWUtc2hhcmluZy01ZGF5JywgY2FudmFzV2lkdGgpKVxuICAgICAgdGhpcy50c2Q1MS5tZXRhRGF0YTEoZGF0YSwgY29tbW9uLmdldE9wdGlvblRpbWVTaGFyaW5nMSgndGltZS1zaGFyaW5nLTVkYXknLCBjYW52YXNXaWR0aCkpXG4gICAgICB0aGlzLnRzZDUxLmRyYXcoKVxuICAgICAgdGhpcy50c2Q1Mi5tZXRhRGF0YTIoZGF0YSwgY29tbW9uLmdldE9wdGlvblRpbWVTaGFyaW5nMigndGltZS1zaGFyaW5nLTVkYXknLCBjYW52YXNXaWR0aCkpXG4gICAgICB0aGlzLnRzZDUyLmRyYXcoKVxuICAgIH1cblxuICAgIGV2ZW50cyA9IHt9XG5cbiAgICBvbkxvYWQob3B0aW9ucykge1xuICAgICAgdGhpcy5wYWluVHMoKVxuICAgIH1cblxuICAgIG9uVW5sb2FkICgpIHtcblxuICAgIH1cbiAgfVxuIl19