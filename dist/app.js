'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _default.__proto__ || Object.getPrototypeOf(_default)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      pages: ['pages/k', 'pages/ts'],
      window: {
        navigationBarBackgroundColor: '#262834',
        navigationBarTitleText: '股票K线图',
        backgroundColor: '#1C1F27',
        navigationBarTextStyle: 'white'
      },
      tabBar: {
        list: [{
          pagePath: 'pages/ts',
          text: '分时图'
        }, {
          pagePath: 'pages/k',
          text: 'K线'
        }],
        color: '#c2c4d0',
        selectedColor: '#3483e9',
        backgroundColor: '#252934'
      },
      debug: true
    }, _this.globalData = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_default, [{
    key: 'onHide',
    value: function onHide() {}
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onUnload',
    value: function onUnload() {}
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJwYWdlcyIsIndpbmRvdyIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiYmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsInRhYkJhciIsImxpc3QiLCJwYWdlUGF0aCIsInRleHQiLCJjb2xvciIsInNlbGVjdGVkQ29sb3IiLCJkZWJ1ZyIsImdsb2JhbERhdGEiLCJhcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswTEFHRUEsTSxHQUFTO0FBQ1BDLGFBQU8sQ0FDTCxTQURLLEVBRUwsVUFGSyxDQURBO0FBS1BDLGNBQVE7QUFDTkMsc0NBQThCLFNBRHhCO0FBRU5DLGdDQUF3QixPQUZsQjtBQUdOQyx5QkFBaUIsU0FIWDtBQUlOQyxnQ0FBd0I7QUFKbEIsT0FMRDtBQVdQQyxjQUFRO0FBQ05DLGNBQU0sQ0FDSjtBQUNFQyxvQkFBVSxVQURaO0FBRUVDLGdCQUFNO0FBRlIsU0FESSxFQUtKO0FBQ0VELG9CQUFVLFNBRFo7QUFFRUMsZ0JBQU07QUFGUixTQUxJLENBREE7QUFXTkMsZUFBTyxTQVhEO0FBWU5DLHVCQUFlLFNBWlQ7QUFhTlAseUJBQWlCO0FBYlgsT0FYRDtBQTBCUFEsYUFBTztBQTFCQSxLLFFBNkJUQyxVLEdBQWEsRTs7Ozs7NkJBSUgsQ0FFVDs7OzZCQUVTLENBRVQ7OzsrQkFFVSxDQUVWOzs7O0VBNUMwQixlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgd2VweS5hcHAge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIHBhZ2VzOiBbXG4gICAgICAgICdwYWdlcy9rJyxcbiAgICAgICAgJ3BhZ2VzL3RzJ1xuICAgICAgXSxcbiAgICAgIHdpbmRvdzoge1xuICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiAnIzI2MjgzNCcsXG4gICAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfogqHnpahL57q/5Zu+JyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzFDMUYyNycsXG4gICAgICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgICAgIH0sXG4gICAgICB0YWJCYXI6IHtcbiAgICAgICAgbGlzdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvdHMnLFxuICAgICAgICAgICAgdGV4dDogJ+WIhuaXtuWbvidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhZ2VQYXRoOiAncGFnZXMvaycsXG4gICAgICAgICAgICB0ZXh0OiAnS+e6vydcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIGNvbG9yOiAnI2MyYzRkMCcsXG4gICAgICAgIHNlbGVjdGVkQ29sb3I6ICcjMzQ4M2U5JyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzI1MjkzNCdcbiAgICAgIH0sXG4gICAgICBkZWJ1ZzogdHJ1ZVxuICAgIH1cblxuICAgIGdsb2JhbERhdGEgPSB7XG5cbiAgICB9XG5cbiAgICBvbkhpZGUgKCkge1xuXG4gICAgfVxuXG4gICAgb25TaG93ICgpIHtcblxuICAgIH1cblxuICAgIG9uVW5sb2FkKCkge1xuXG4gICAgfVxuICB9XG4iXX0=