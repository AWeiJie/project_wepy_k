'use strict';

module.exports = {
  // 返回一个分时走势图绘画规则的对象
  getOptionTimeSharing1: function getOptionTimeSharing1(type, width) {
    return {
      name: type || 'time-sharing',
      width: width || 'auto',
      height: 200,
      axis: {
        row: 4,
        col: 4,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        color: '#cdcdcd'
      },
      xAxis: {
        data: []
      },
      yAxis: [{
        type: 'line',
        lineColor: '#2F6098',
        background: 'rgba(53,125,222,0.1)',
        data: []
      }, {
        type: 'line',
        lineColor: '#A96F3E',
        data: []
      }],
      callback: function callback(time) {
        // var page = getCurrentPages()
        // page = page[page.length - 1]
        // page.setData({
        //   ts1RenderTime: time
        // })
        console.log('getOptionTimeSharing1回调函数');
      }
    };
  },

  // 返回一个分时图成交量绘画规则的对象
  getOptionTimeSharing2: function getOptionTimeSharing2(type, width) {
    return {
      name: type || 'time-sharing-b',
      width: width || 'auto',
      height: 80,
      axis: {
        row: 2,
        col: 4,
        showEdg: true,
        showX: true,
        showY: true,
        paddingTop: 5,
        paddingBottom: 14,
        paddingLeft: 0,
        paddingRight: 0,
        color: '#cdcdcd'
      },
      xAxis: {
        times: ['09:30', '15:00'],
        data: []
      },
      yAxis: [{
        type: 'bar',
        color: [],
        data: [],
        showMax: true
      }],
      callback: function callback(time) {
        // var page = getCurrentPages()
        // page = page[page.length - 1]
        // page.setData({
        //   ts2RenderTime: time
        // })
        console.log('getOptionTimeSharing2的回调函数');
      }
    };
  },

  // 获得绘制日K价格走势图规则对象
  getOptionKline1: function getOptionKline1(type) {
    return {
      name: type || 'dk',
      width: 'auto',
      height: 160,
      average: [5, 10, 20],
      axis: {
        row: 4,
        col: 5,
        showX: false,
        showY: true,
        showEdg: true,
        paddingTop: 0,
        paddingBottom: 10,
        paddingLeft: 0,
        paddingRight: 0,
        color: '#cdcdcd'
      },
      xAxis: {
        data: [],
        averageLabel: []
      },
      yAxis: [],
      callback: function callback(time) {}
    };
  },

  // 获得绘制日K买卖走势图规则对象
  getOptionKline2: function getOptionKline2(type) {
    return {
      name: type || 'dk',
      width: 'auto',
      height: 80,
      average: [5, 10, 20],
      axis: {
        row: 1,
        col: 5,
        showX: false,
        showY: true,
        showEdg: true,
        paddingTop: 0,
        paddingBottom: 14,
        paddingLeft: 0,
        paddingRight: 0,
        color: '#cdcdcd'
      },
      xAxis: {
        times: [],
        data: [],
        averageLabel: []
      },
      yAxis: [],
      callback: function callback(time) {}
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsImdldE9wdGlvblRpbWVTaGFyaW5nMSIsInR5cGUiLCJ3aWR0aCIsIm5hbWUiLCJoZWlnaHQiLCJheGlzIiwicm93IiwiY29sIiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImNvbG9yIiwieEF4aXMiLCJkYXRhIiwieUF4aXMiLCJsaW5lQ29sb3IiLCJiYWNrZ3JvdW5kIiwiY2FsbGJhY2siLCJ0aW1lIiwiY29uc29sZSIsImxvZyIsImdldE9wdGlvblRpbWVTaGFyaW5nMiIsInNob3dFZGciLCJzaG93WCIsInNob3dZIiwidGltZXMiLCJzaG93TWF4IiwiZ2V0T3B0aW9uS2xpbmUxIiwiYXZlcmFnZSIsImF2ZXJhZ2VMYWJlbCIsImdldE9wdGlvbktsaW5lMiJdLCJtYXBwaW5ncyI6Ijs7QUFBQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNmO0FBQ0FDLHlCQUF1QiwrQkFBVUMsSUFBVixFQUFnQkMsS0FBaEIsRUFBdUI7QUFDNUMsV0FBTztBQUNMQyxZQUFNRixRQUFRLGNBRFQ7QUFFTEMsYUFBT0EsU0FBUyxNQUZYO0FBR0xFLGNBQVEsR0FISDtBQUlMQyxZQUFNO0FBQ0pDLGFBQUssQ0FERDtBQUVKQyxhQUFLLENBRkQ7QUFHSkMsb0JBQVksQ0FIUjtBQUlKQyx1QkFBZSxDQUpYO0FBS0pDLHFCQUFhLENBTFQ7QUFNSkMsc0JBQWMsQ0FOVjtBQU9KQyxlQUFPO0FBUEgsT0FKRDtBQWFMQyxhQUFPO0FBQ0xDLGNBQU07QUFERCxPQWJGO0FBZ0JMQyxhQUFPLENBQ0w7QUFDRWQsY0FBTSxNQURSO0FBRUVlLG1CQUFXLFNBRmI7QUFHRUMsb0JBQVksc0JBSGQ7QUFJRUgsY0FBTTtBQUpSLE9BREssRUFPTDtBQUNFYixjQUFNLE1BRFI7QUFFRWUsbUJBQVcsU0FGYjtBQUdFRixjQUFNO0FBSFIsT0FQSyxDQWhCRjtBQTZCTEksZ0JBQVUsa0JBQVVDLElBQVYsRUFBZ0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQyxnQkFBUUMsR0FBUixDQUFZLDJCQUFaO0FBQ0Q7QUFwQ0ksS0FBUDtBQXNDRCxHQXpDYzs7QUEyQ2Y7QUFDQUMseUJBQXVCLCtCQUFVckIsSUFBVixFQUFnQkMsS0FBaEIsRUFBdUI7QUFDNUMsV0FBTztBQUNMQyxZQUFNRixRQUFRLGdCQURUO0FBRUxDLGFBQU9BLFNBQVMsTUFGWDtBQUdMRSxjQUFRLEVBSEg7QUFJTEMsWUFBTTtBQUNKQyxhQUFLLENBREQ7QUFFSkMsYUFBSyxDQUZEO0FBR0pnQixpQkFBUyxJQUhMO0FBSUpDLGVBQU8sSUFKSDtBQUtKQyxlQUFPLElBTEg7QUFNSmpCLG9CQUFZLENBTlI7QUFPSkMsdUJBQWUsRUFQWDtBQVFKQyxxQkFBYSxDQVJUO0FBU0pDLHNCQUFjLENBVFY7QUFVSkMsZUFBTztBQVZILE9BSkQ7QUFnQkxDLGFBQU87QUFDTGEsZUFBTyxDQUFDLE9BQUQsRUFBVSxPQUFWLENBREY7QUFFTFosY0FBTTtBQUZELE9BaEJGO0FBb0JMQyxhQUFPLENBQ0w7QUFDRWQsY0FBTSxLQURSO0FBRUVXLGVBQU8sRUFGVDtBQUdFRSxjQUFNLEVBSFI7QUFJRWEsaUJBQVM7QUFKWCxPQURLLENBcEJGO0FBNEJMVCxnQkFBVSxrQkFBVUMsSUFBVixFQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksNEJBQVo7QUFDRDtBQW5DSSxLQUFQO0FBcUNELEdBbEZjOztBQW9GZjtBQUNBTyxtQkFBaUIseUJBQVUzQixJQUFWLEVBQWdCO0FBQy9CLFdBQU87QUFDTEUsWUFBTUYsUUFBUSxJQURUO0FBRUxDLGFBQU8sTUFGRjtBQUdMRSxjQUFRLEdBSEg7QUFJTHlCLGVBQVMsQ0FBQyxDQUFELEVBQUksRUFBSixFQUFRLEVBQVIsQ0FKSjtBQUtMeEIsWUFBTTtBQUNKQyxhQUFLLENBREQ7QUFFSkMsYUFBSyxDQUZEO0FBR0ppQixlQUFPLEtBSEg7QUFJSkMsZUFBTyxJQUpIO0FBS0pGLGlCQUFTLElBTEw7QUFNSmYsb0JBQVksQ0FOUjtBQU9KQyx1QkFBZSxFQVBYO0FBUUpDLHFCQUFhLENBUlQ7QUFTSkMsc0JBQWMsQ0FUVjtBQVVKQyxlQUFPO0FBVkgsT0FMRDtBQWlCTEMsYUFBTztBQUNMQyxjQUFNLEVBREQ7QUFFTGdCLHNCQUFjO0FBRlQsT0FqQkY7QUFxQkxmLGFBQU8sRUFyQkY7QUFzQkxHLGdCQUFVLGtCQUFVQyxJQUFWLEVBQWdCLENBRXpCO0FBeEJJLEtBQVA7QUEwQkQsR0FoSGM7O0FBa0hmO0FBQ0FZLG1CQUFpQix5QkFBVTlCLElBQVYsRUFBZ0I7QUFDL0IsV0FBTztBQUNMRSxZQUFNRixRQUFRLElBRFQ7QUFFTEMsYUFBTyxNQUZGO0FBR0xFLGNBQVEsRUFISDtBQUlMeUIsZUFBUyxDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixDQUpKO0FBS0x4QixZQUFNO0FBQ0pDLGFBQUssQ0FERDtBQUVKQyxhQUFLLENBRkQ7QUFHSmlCLGVBQU8sS0FISDtBQUlKQyxlQUFPLElBSkg7QUFLSkYsaUJBQVMsSUFMTDtBQU1KZixvQkFBWSxDQU5SO0FBT0pDLHVCQUFlLEVBUFg7QUFRSkMscUJBQWEsQ0FSVDtBQVNKQyxzQkFBYyxDQVRWO0FBVUpDLGVBQU87QUFWSCxPQUxEO0FBaUJMQyxhQUFPO0FBQ0xhLGVBQU8sRUFERjtBQUVMWixjQUFNLEVBRkQ7QUFHTGdCLHNCQUFjO0FBSFQsT0FqQkY7QUFzQkxmLGFBQU8sRUF0QkY7QUF1QkxHLGdCQUFVLGtCQUFVQyxJQUFWLEVBQWdCLENBRXpCO0FBekJJLEtBQVA7QUEyQkQ7QUEvSWMsQ0FBakIiLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyDov5Tlm57kuIDkuKrliIbml7botbDlir/lm77nu5jnlLvop4TliJnnmoTlr7nosaFcbiAgZ2V0T3B0aW9uVGltZVNoYXJpbmcxOiBmdW5jdGlvbiAodHlwZSwgd2lkdGgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdHlwZSB8fCAndGltZS1zaGFyaW5nJyxcbiAgICAgIHdpZHRoOiB3aWR0aCB8fCAnYXV0bycsXG4gICAgICBoZWlnaHQ6IDIwMCxcbiAgICAgIGF4aXM6IHtcbiAgICAgICAgcm93OiA0LFxuICAgICAgICBjb2w6IDQsXG4gICAgICAgIHBhZGRpbmdUb3A6IDAsXG4gICAgICAgIHBhZGRpbmdCb3R0b206IDAsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAwLFxuICAgICAgICBwYWRkaW5nUmlnaHQ6IDAsXG4gICAgICAgIGNvbG9yOiAnI2NkY2RjZCdcbiAgICAgIH0sXG4gICAgICB4QXhpczoge1xuICAgICAgICBkYXRhOiBbXVxuICAgICAgfSxcbiAgICAgIHlBeGlzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgbGluZUNvbG9yOiAnIzJGNjA5OCcsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoNTMsMTI1LDIyMiwwLjEpJyxcbiAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgIGxpbmVDb2xvcjogJyNBOTZGM0UnLFxuICAgICAgICAgIGRhdGE6IFtdXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgICAgLy8gdmFyIHBhZ2UgPSBnZXRDdXJyZW50UGFnZXMoKVxuICAgICAgICAvLyBwYWdlID0gcGFnZVtwYWdlLmxlbmd0aCAtIDFdXG4gICAgICAgIC8vIHBhZ2Uuc2V0RGF0YSh7XG4gICAgICAgIC8vICAgdHMxUmVuZGVyVGltZTogdGltZVxuICAgICAgICAvLyB9KVxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0T3B0aW9uVGltZVNoYXJpbmcx5Zue6LCD5Ye95pWwJylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8g6L+U5Zue5LiA5Liq5YiG5pe25Zu+5oiQ5Lqk6YeP57uY55S76KeE5YiZ55qE5a+56LGhXG4gIGdldE9wdGlvblRpbWVTaGFyaW5nMjogZnVuY3Rpb24gKHR5cGUsIHdpZHRoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHR5cGUgfHwgJ3RpbWUtc2hhcmluZy1iJyxcbiAgICAgIHdpZHRoOiB3aWR0aCB8fCAnYXV0bycsXG4gICAgICBoZWlnaHQ6IDgwLFxuICAgICAgYXhpczoge1xuICAgICAgICByb3c6IDIsXG4gICAgICAgIGNvbDogNCxcbiAgICAgICAgc2hvd0VkZzogdHJ1ZSxcbiAgICAgICAgc2hvd1g6IHRydWUsXG4gICAgICAgIHNob3dZOiB0cnVlLFxuICAgICAgICBwYWRkaW5nVG9wOiA1LFxuICAgICAgICBwYWRkaW5nQm90dG9tOiAxNCxcbiAgICAgICAgcGFkZGluZ0xlZnQ6IDAsXG4gICAgICAgIHBhZGRpbmdSaWdodDogMCxcbiAgICAgICAgY29sb3I6ICcjY2RjZGNkJ1xuICAgICAgfSxcbiAgICAgIHhBeGlzOiB7XG4gICAgICAgIHRpbWVzOiBbJzA5OjMwJywgJzE1OjAwJ10sXG4gICAgICAgIGRhdGE6IFtdXG4gICAgICB9LFxuICAgICAgeUF4aXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdiYXInLFxuICAgICAgICAgIGNvbG9yOiBbXSxcbiAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICBzaG93TWF4OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgICAgLy8gdmFyIHBhZ2UgPSBnZXRDdXJyZW50UGFnZXMoKVxuICAgICAgICAvLyBwYWdlID0gcGFnZVtwYWdlLmxlbmd0aCAtIDFdXG4gICAgICAgIC8vIHBhZ2Uuc2V0RGF0YSh7XG4gICAgICAgIC8vICAgdHMyUmVuZGVyVGltZTogdGltZVxuICAgICAgICAvLyB9KVxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0T3B0aW9uVGltZVNoYXJpbmcy55qE5Zue6LCD5Ye95pWwJylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8g6I635b6X57uY5Yi25pelS+S7t+agvOi1sOWKv+WbvuinhOWImeWvueixoVxuICBnZXRPcHRpb25LbGluZTE6IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHR5cGUgfHwgJ2RrJyxcbiAgICAgIHdpZHRoOiAnYXV0bycsXG4gICAgICBoZWlnaHQ6IDE2MCxcbiAgICAgIGF2ZXJhZ2U6IFs1LCAxMCwgMjBdLFxuICAgICAgYXhpczoge1xuICAgICAgICByb3c6IDQsXG4gICAgICAgIGNvbDogNSxcbiAgICAgICAgc2hvd1g6IGZhbHNlLFxuICAgICAgICBzaG93WTogdHJ1ZSxcbiAgICAgICAgc2hvd0VkZzogdHJ1ZSxcbiAgICAgICAgcGFkZGluZ1RvcDogMCxcbiAgICAgICAgcGFkZGluZ0JvdHRvbTogMTAsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAwLFxuICAgICAgICBwYWRkaW5nUmlnaHQ6IDAsXG4gICAgICAgIGNvbG9yOiAnI2NkY2RjZCdcbiAgICAgIH0sXG4gICAgICB4QXhpczoge1xuICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgYXZlcmFnZUxhYmVsOiBbXVxuICAgICAgfSxcbiAgICAgIHlBeGlzOiBbXSxcbiAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAodGltZSkge1xuXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIOiOt+W+l+e7mOWItuaXpUvkubDljZbotbDlir/lm77op4TliJnlr7nosaFcbiAgZ2V0T3B0aW9uS2xpbmUyOiBmdW5jdGlvbiAodHlwZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0eXBlIHx8ICdkaycsXG4gICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgaGVpZ2h0OiA4MCxcbiAgICAgIGF2ZXJhZ2U6IFs1LCAxMCwgMjBdLFxuICAgICAgYXhpczoge1xuICAgICAgICByb3c6IDEsXG4gICAgICAgIGNvbDogNSxcbiAgICAgICAgc2hvd1g6IGZhbHNlLFxuICAgICAgICBzaG93WTogdHJ1ZSxcbiAgICAgICAgc2hvd0VkZzogdHJ1ZSxcbiAgICAgICAgcGFkZGluZ1RvcDogMCxcbiAgICAgICAgcGFkZGluZ0JvdHRvbTogMTQsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAwLFxuICAgICAgICBwYWRkaW5nUmlnaHQ6IDAsXG4gICAgICAgIGNvbG9yOiAnI2NkY2RjZCdcbiAgICAgIH0sXG4gICAgICB4QXhpczoge1xuICAgICAgICB0aW1lczogW10sXG4gICAgICAgIGRhdGE6IFtdLFxuICAgICAgICBhdmVyYWdlTGFiZWw6IFtdXG4gICAgICB9LFxuICAgICAgeUF4aXM6IFtdLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICh0aW1lKSB7XG5cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==