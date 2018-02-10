'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _modal = require('./../components/modal.js');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '经传软件股事汇'
    }, _this.components = {
      Modal: _modal2.default
    }, _this.mixins = [], _this.data = {
      list: [],
      modalFlag: true,
      roomId: '', // 房间ID
      roomPassword: '', // 房间密码
      keyword: '', // 搜索关键词
      showPrompt: false,
      liveType: ''
    }, _this.computed = {}, _this.methods = {
      // 取消搜索
      out: function out() {
        _wepy2.default.navigateBack();
      },


      // 获取搜索框的值
      getKeyword: function getKeyword(e) {
        this.keyword = e.detail.value;
        this.$apply();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad(options) {}
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/search'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwiTW9kYWwiLCJtaXhpbnMiLCJkYXRhIiwibGlzdCIsIm1vZGFsRmxhZyIsInJvb21JZCIsInJvb21QYXNzd29yZCIsImtleXdvcmQiLCJzaG93UHJvbXB0IiwibGl2ZVR5cGUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJvdXQiLCJuYXZpZ2F0ZUJhY2siLCJnZXRLZXl3b3JkIiwiZSIsImRldGFpbCIsInZhbHVlIiwiJGFwcGx5IiwiZXZlbnRzIiwib3B0aW9ucyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhO0FBQ1hDO0FBRFcsSyxRQUliQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsWUFBTSxFQUREO0FBRUxDLGlCQUFXLElBRk47QUFHTEMsY0FBUSxFQUhILEVBR087QUFDWkMsb0JBQWMsRUFKVCxFQUlhO0FBQ2xCQyxlQUFTLEVBTEosRUFLUTtBQUNiQyxrQkFBWSxLQU5QO0FBT0xDLGdCQUFVO0FBUEwsSyxRQVVQQyxRLEdBQVcsRSxRQUdYQyxPLEdBQVU7QUFDUjtBQUNBQyxTQUZRLGlCQUVGO0FBQ0osdUJBQUtDLFlBQUw7QUFDRCxPQUpPOzs7QUFNUjtBQUNBQyxnQkFQUSxzQkFPR0MsQ0FQSCxFQU9NO0FBQ1osYUFBS1IsT0FBTCxHQUFlUSxFQUFFQyxNQUFGLENBQVNDLEtBQXhCO0FBQ0EsYUFBS0MsTUFBTDtBQUNEO0FBVk8sSyxRQWFWQyxNLEdBQVMsRTs7Ozs7MkJBRUZDLE8sRUFBUyxDQUVmOzs7O0VBeENnQyxlQUFLQyxJOztrQkFBbkJ6QixLIiwiZmlsZSI6InNlYXJjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgTW9kYWwgZnJvbSAnLi4vY29tcG9uZW50cy9tb2RhbCdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+e7j+S8oOi9r+S7tuiCoeS6i+axhydcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIE1vZGFsXG4gICAgfVxuXG4gICAgbWl4aW5zID0gW11cblxuICAgIGRhdGEgPSB7XG4gICAgICBsaXN0OiBbXSxcbiAgICAgIG1vZGFsRmxhZzogdHJ1ZSxcbiAgICAgIHJvb21JZDogJycsIC8vIOaIv+mXtElEXG4gICAgICByb29tUGFzc3dvcmQ6ICcnLCAvLyDmiL/pl7Tlr4bnoIFcbiAgICAgIGtleXdvcmQ6ICcnLCAvLyDmkJzntKLlhbPplK7or41cbiAgICAgIHNob3dQcm9tcHQ6IGZhbHNlLFxuICAgICAgbGl2ZVR5cGU6ICcnXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8vIOWPlua2iOaQnOe0olxuICAgICAgb3V0KCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlQmFjaygpXG4gICAgICB9LFxuXG4gICAgICAvLyDojrflj5bmkJzntKLmoYbnmoTlgLxcbiAgICAgIGdldEtleXdvcmQoZSkge1xuICAgICAgICB0aGlzLmtleXdvcmQgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge31cblxuICAgIG9uTG9hZChvcHRpb25zKSB7XG5cbiAgICB9XG4gIH1cbiJdfQ==