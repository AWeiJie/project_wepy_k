'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {}, _this.components = {}, _this.mixins = [], _this.props = {
      roomId: Number
    }, _this.data = {
      modalFlag: true,
      inputValue: '',
      modalClass: 'modal-hide'
    }, _this.computed = {}, _this.methods = {
      // 关闭验证弹框
      close: function close() {
        this.clearVaule();
      },


      // 验证房间号并跳转
      sendCode: function sendCode() {
        if (!this.inputValue) {
          return;
        }
        var that = this;
        var Value = this.inputValue;
        this.inputValue = '';
        this.$apply();
        _wepy2.default.request({
          url: 'https://n8sf.n8n8.cn/app/live/v1/room/check',
          data: {
            oa_uid: this.roomId,
            password: Value
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',

          success: function success(res) {
            if (res.data.code === 1) {
              _wepy2.default.navigateTo({
                url: '../pages/play?id=' + that.roomId
              });
            } else {
              _wepy2.default.showToast({
                title: res.data.msg,
                image: '../images/error.png'
              });
            }
          }
        });
        this.clearVaule();
      },


      // 获取输入框的值
      getVaule: function getVaule(e) {
        this.inputValue = e.detail.value;
        this.$apply();
      }
    }, _this.events = {
      // 显示验证弹框
      'showModal': function showModal() {
        console.log('显示验证弹框');
        _this.modalFlag = false;
        _this.modalClass = 'modal-show';
        _this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'clearVaule',


    // 关闭输入框后清除值
    value: function clearVaule() {
      this.modalFlag = true;
      this.inputValue = '';
      this.modalClass = 'modal-hide';
      this.$apply();
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      console.log('onReady');
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log('onLoad');
    }
  }]);

  return Index;
}(_wepy2.default.page);

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGFsLmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwiY29tcG9uZW50cyIsIm1peGlucyIsInByb3BzIiwicm9vbUlkIiwiTnVtYmVyIiwiZGF0YSIsIm1vZGFsRmxhZyIsImlucHV0VmFsdWUiLCJtb2RhbENsYXNzIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiY2xvc2UiLCJjbGVhclZhdWxlIiwic2VuZENvZGUiLCJ0aGF0IiwiVmFsdWUiLCIkYXBwbHkiLCJyZXF1ZXN0IiwidXJsIiwib2FfdWlkIiwicGFzc3dvcmQiLCJoZWFkZXIiLCJtZXRob2QiLCJzdWNjZXNzIiwicmVzIiwiY29kZSIsIm5hdmlnYXRlVG8iLCJzaG93VG9hc3QiLCJ0aXRsZSIsIm1zZyIsImltYWdlIiwiZ2V0VmF1bGUiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJldmVudHMiLCJjb25zb2xlIiwibG9nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVMsRSxRQUVUQyxVLEdBQWEsRSxRQUViQyxNLEdBQVMsRSxRQUVUQyxLLEdBQVE7QUFDTkMsY0FBUUM7QUFERixLLFFBSVJDLEksR0FBTztBQUNMQyxpQkFBVyxJQUROO0FBRUxDLGtCQUFZLEVBRlA7QUFHTEMsa0JBQVk7QUFIUCxLLFFBTVBDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSO0FBQ0FDLFdBRlEsbUJBRUE7QUFDTixhQUFLQyxVQUFMO0FBQ0QsT0FKTzs7O0FBTVI7QUFDQUMsY0FQUSxzQkFPRztBQUNULFlBQUksQ0FBQyxLQUFLTixVQUFWLEVBQXNCO0FBQ3BCO0FBQ0Q7QUFDRCxZQUFNTyxPQUFPLElBQWI7QUFDQSxZQUFNQyxRQUFRLEtBQUtSLFVBQW5CO0FBQ0EsYUFBS0EsVUFBTCxHQUFrQixFQUFsQjtBQUNBLGFBQUtTLE1BQUw7QUFDQSx1QkFBS0MsT0FBTCxDQUFhO0FBQ1hDLGVBQUssNkNBRE07QUFFWGIsZ0JBQU07QUFDSmMsb0JBQVEsS0FBS2hCLE1BRFQ7QUFFSmlCLHNCQUFVTDtBQUZOLFdBRks7QUFNWE0sa0JBQVE7QUFDTiw0QkFBZ0I7QUFEVixXQU5HO0FBU1hDLGtCQUFRLE1BVEc7O0FBV1hDLG1CQUFTLGlCQUFVQyxHQUFWLEVBQWU7QUFDdEIsZ0JBQUlBLElBQUluQixJQUFKLENBQVNvQixJQUFULEtBQWtCLENBQXRCLEVBQXlCO0FBQ3ZCLDZCQUFLQyxVQUFMLENBQWdCO0FBQ2RSLHFCQUFLLHNCQUFzQkosS0FBS1g7QUFEbEIsZUFBaEI7QUFHRCxhQUpELE1BSU87QUFDTCw2QkFBS3dCLFNBQUwsQ0FBZTtBQUNiQyx1QkFBT0osSUFBSW5CLElBQUosQ0FBU3dCLEdBREg7QUFFYkMsdUJBQU87QUFGTSxlQUFmO0FBSUQ7QUFDRjtBQXRCVSxTQUFiO0FBd0JBLGFBQUtsQixVQUFMO0FBQ0QsT0F4Q087OztBQTBDUjtBQUNBbUIsY0EzQ1Esb0JBMkNDQyxDQTNDRCxFQTJDSTtBQUNWLGFBQUt6QixVQUFMLEdBQWtCeUIsRUFBRUMsTUFBRixDQUFTQyxLQUEzQjtBQUNBLGFBQUtsQixNQUFMO0FBQ0Q7QUE5Q08sSyxRQWlFVm1CLE0sR0FBUztBQUNQO0FBQ0EsbUJBQWEscUJBQU07QUFDakJDLGdCQUFRQyxHQUFSLENBQVksUUFBWjtBQUNBLGNBQUsvQixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsY0FBS0UsVUFBTCxHQUFrQixZQUFsQjtBQUNBLGNBQUtRLE1BQUw7QUFDRDtBQVBNLEs7Ozs7Ozs7QUFoQlQ7aUNBQ2E7QUFDWCxXQUFLVixTQUFMLEdBQWlCLElBQWpCO0FBQ0EsV0FBS0MsVUFBTCxHQUFrQixFQUFsQjtBQUNBLFdBQUtDLFVBQUwsR0FBa0IsWUFBbEI7QUFDQSxXQUFLUSxNQUFMO0FBQ0Q7Ozs4QkFFUztBQUNSb0IsY0FBUUMsR0FBUixDQUFZLFNBQVo7QUFDRDs7OzZCQUVRO0FBQ1BELGNBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0Q7Ozs7RUFsRmdDLGVBQUtDLEk7O2tCQUFuQnhDLEsiLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge31cblxuICAgIGNvbXBvbmVudHMgPSB7fVxuXG4gICAgbWl4aW5zID0gW11cblxuICAgIHByb3BzID0ge1xuICAgICAgcm9vbUlkOiBOdW1iZXJcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgbW9kYWxGbGFnOiB0cnVlLFxuICAgICAgaW5wdXRWYWx1ZTogJycsXG4gICAgICBtb2RhbENsYXNzOiAnbW9kYWwtaGlkZSdcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHt9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgLy8g5YWz6Zet6aqM6K+B5by55qGGXG4gICAgICBjbG9zZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhclZhdWxlKClcbiAgICAgIH0sXG5cbiAgICAgIC8vIOmqjOivgeaIv+mXtOWPt+W5tui3s+i9rFxuICAgICAgc2VuZENvZGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbnB1dFZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgICAgICAgY29uc3QgVmFsdWUgPSB0aGlzLmlucHV0VmFsdWVcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gJydcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xuICAgICAgICAgIHVybDogJ2h0dHBzOi8vbjhzZi5uOG44LmNuL2FwcC9saXZlL3YxL3Jvb20vY2hlY2snLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIG9hX3VpZDogdGhpcy5yb29tSWQsXG4gICAgICAgICAgICBwYXNzd29yZDogVmFsdWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG5cbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PT0gMSkge1xuICAgICAgICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgIHVybDogJy4uL3BhZ2VzL3BsYXk/aWQ9JyArIHRoYXQucm9vbUlkXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLm1zZyxcbiAgICAgICAgICAgICAgICBpbWFnZTogJy4uL2ltYWdlcy9lcnJvci5wbmcnXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmNsZWFyVmF1bGUoKVxuICAgICAgfSxcblxuICAgICAgLy8g6I635Y+W6L6T5YWl5qGG55qE5YC8XG4gICAgICBnZXRWYXVsZShlKSB7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDlhbPpl63ovpPlhaXmoYblkI7muIXpmaTlgLxcbiAgICBjbGVhclZhdWxlKCkge1xuICAgICAgdGhpcy5tb2RhbEZsYWcgPSB0cnVlXG4gICAgICB0aGlzLmlucHV0VmFsdWUgPSAnJ1xuICAgICAgdGhpcy5tb2RhbENsYXNzID0gJ21vZGFsLWhpZGUnXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdvblJlYWR5JylcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICBjb25zb2xlLmxvZygnb25Mb2FkJylcbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgICAvLyDmmL7npLrpqozor4HlvLnmoYZcbiAgICAgICdzaG93TW9kYWwnOiAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfmmL7npLrpqozor4HlvLnmoYYnKVxuICAgICAgICB0aGlzLm1vZGFsRmxhZyA9IGZhbHNlXG4gICAgICAgIHRoaXMubW9kYWxDbGFzcyA9ICdtb2RhbC1zaG93J1xuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=