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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiZ2V0T3B0aW9uVGltZVNoYXJpbmcxIiwidHlwZSIsIndpZHRoIiwibmFtZSIsImhlaWdodCIsImF4aXMiLCJyb3ciLCJjb2wiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwiY29sb3IiLCJ4QXhpcyIsImRhdGEiLCJ5QXhpcyIsImxpbmVDb2xvciIsImJhY2tncm91bmQiLCJjYWxsYmFjayIsInRpbWUiLCJjb25zb2xlIiwibG9nIiwiZ2V0T3B0aW9uVGltZVNoYXJpbmcyIiwic2hvd0VkZyIsInNob3dYIiwic2hvd1kiLCJ0aW1lcyIsInNob3dNYXgiLCJnZXRPcHRpb25LbGluZTEiLCJhdmVyYWdlIiwiYXZlcmFnZUxhYmVsIiwiZ2V0T3B0aW9uS2xpbmUyIl0sIm1hcHBpbmdzIjoiOztBQUFBQSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2Y7QUFDQUMseUJBQXVCLCtCQUFVQyxJQUFWLEVBQWdCQyxLQUFoQixFQUF1QjtBQUM1QyxXQUFPO0FBQ0xDLFlBQU1GLFFBQVEsY0FEVDtBQUVMQyxhQUFPQSxTQUFTLE1BRlg7QUFHTEUsY0FBUSxHQUhIO0FBSUxDLFlBQU07QUFDSkMsYUFBSyxDQUREO0FBRUpDLGFBQUssQ0FGRDtBQUdKQyxvQkFBWSxDQUhSO0FBSUpDLHVCQUFlLENBSlg7QUFLSkMscUJBQWEsQ0FMVDtBQU1KQyxzQkFBYyxDQU5WO0FBT0pDLGVBQU87QUFQSCxPQUpEO0FBYUxDLGFBQU87QUFDTEMsY0FBTTtBQURELE9BYkY7QUFnQkxDLGFBQU8sQ0FDTDtBQUNFZCxjQUFNLE1BRFI7QUFFRWUsbUJBQVcsU0FGYjtBQUdFQyxvQkFBWSxzQkFIZDtBQUlFSCxjQUFNO0FBSlIsT0FESyxFQU9MO0FBQ0ViLGNBQU0sTUFEUjtBQUVFZSxtQkFBVyxTQUZiO0FBR0VGLGNBQU07QUFIUixPQVBLLENBaEJGO0FBNkJMSSxnQkFBVSxrQkFBVUMsSUFBVixFQUFnQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FDLGdCQUFRQyxHQUFSLENBQVksMkJBQVo7QUFDRDtBQXBDSSxLQUFQO0FBc0NELEdBekNjOztBQTJDZjtBQUNBQyx5QkFBdUIsK0JBQVVyQixJQUFWLEVBQWdCQyxLQUFoQixFQUF1QjtBQUM1QyxXQUFPO0FBQ0xDLFlBQU1GLFFBQVEsZ0JBRFQ7QUFFTEMsYUFBT0EsU0FBUyxNQUZYO0FBR0xFLGNBQVEsRUFISDtBQUlMQyxZQUFNO0FBQ0pDLGFBQUssQ0FERDtBQUVKQyxhQUFLLENBRkQ7QUFHSmdCLGlCQUFTLElBSEw7QUFJSkMsZUFBTyxJQUpIO0FBS0pDLGVBQU8sSUFMSDtBQU1KakIsb0JBQVksQ0FOUjtBQU9KQyx1QkFBZSxFQVBYO0FBUUpDLHFCQUFhLENBUlQ7QUFTSkMsc0JBQWMsQ0FUVjtBQVVKQyxlQUFPO0FBVkgsT0FKRDtBQWdCTEMsYUFBTztBQUNMYSxlQUFPLENBQUMsT0FBRCxFQUFVLE9BQVYsQ0FERjtBQUVMWixjQUFNO0FBRkQsT0FoQkY7QUFvQkxDLGFBQU8sQ0FDTDtBQUNFZCxjQUFNLEtBRFI7QUFFRVcsZUFBTyxFQUZUO0FBR0VFLGNBQU0sRUFIUjtBQUlFYSxpQkFBUztBQUpYLE9BREssQ0FwQkY7QUE0QkxULGdCQUFVLGtCQUFVQyxJQUFWLEVBQWdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsZ0JBQVFDLEdBQVIsQ0FBWSw0QkFBWjtBQUNEO0FBbkNJLEtBQVA7QUFxQ0QsR0FsRmM7O0FBb0ZmO0FBQ0FPLG1CQUFpQix5QkFBVTNCLElBQVYsRUFBZ0I7QUFDL0IsV0FBTztBQUNMRSxZQUFNRixRQUFRLElBRFQ7QUFFTEMsYUFBTyxNQUZGO0FBR0xFLGNBQVEsR0FISDtBQUlMeUIsZUFBUyxDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixDQUpKO0FBS0x4QixZQUFNO0FBQ0pDLGFBQUssQ0FERDtBQUVKQyxhQUFLLENBRkQ7QUFHSmlCLGVBQU8sS0FISDtBQUlKQyxlQUFPLElBSkg7QUFLSkYsaUJBQVMsSUFMTDtBQU1KZixvQkFBWSxDQU5SO0FBT0pDLHVCQUFlLEVBUFg7QUFRSkMscUJBQWEsQ0FSVDtBQVNKQyxzQkFBYyxDQVRWO0FBVUpDLGVBQU87QUFWSCxPQUxEO0FBaUJMQyxhQUFPO0FBQ0xDLGNBQU0sRUFERDtBQUVMZ0Isc0JBQWM7QUFGVCxPQWpCRjtBQXFCTGYsYUFBTyxFQXJCRjtBQXNCTEcsZ0JBQVUsa0JBQVVDLElBQVYsRUFBZ0IsQ0FFekI7QUF4QkksS0FBUDtBQTBCRCxHQWhIYzs7QUFrSGY7QUFDQVksbUJBQWlCLHlCQUFVOUIsSUFBVixFQUFnQjtBQUMvQixXQUFPO0FBQ0xFLFlBQU1GLFFBQVEsSUFEVDtBQUVMQyxhQUFPLE1BRkY7QUFHTEUsY0FBUSxFQUhIO0FBSUx5QixlQUFTLENBQUMsQ0FBRCxFQUFJLEVBQUosRUFBUSxFQUFSLENBSko7QUFLTHhCLFlBQU07QUFDSkMsYUFBSyxDQUREO0FBRUpDLGFBQUssQ0FGRDtBQUdKaUIsZUFBTyxLQUhIO0FBSUpDLGVBQU8sSUFKSDtBQUtKRixpQkFBUyxJQUxMO0FBTUpmLG9CQUFZLENBTlI7QUFPSkMsdUJBQWUsRUFQWDtBQVFKQyxxQkFBYSxDQVJUO0FBU0pDLHNCQUFjLENBVFY7QUFVSkMsZUFBTztBQVZILE9BTEQ7QUFpQkxDLGFBQU87QUFDTGEsZUFBTyxFQURGO0FBRUxaLGNBQU0sRUFGRDtBQUdMZ0Isc0JBQWM7QUFIVCxPQWpCRjtBQXNCTGYsYUFBTyxFQXRCRjtBQXVCTEcsZ0JBQVUsa0JBQVVDLElBQVYsRUFBZ0IsQ0FFekI7QUF6QkksS0FBUDtBQTJCRDtBQS9JYyxDQUFqQiIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8g6L+U5Zue5LiA5Liq5YiG5pe26LWw5Yq/5Zu+57uY55S76KeE5YiZ55qE5a+56LGhXG4gIGdldE9wdGlvblRpbWVTaGFyaW5nMTogZnVuY3Rpb24gKHR5cGUsIHdpZHRoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IHR5cGUgfHwgJ3RpbWUtc2hhcmluZycsXG4gICAgICB3aWR0aDogd2lkdGggfHwgJ2F1dG8nLFxuICAgICAgaGVpZ2h0OiAyMDAsXG4gICAgICBheGlzOiB7XG4gICAgICAgIHJvdzogNCxcbiAgICAgICAgY29sOiA0LFxuICAgICAgICBwYWRkaW5nVG9wOiAwLFxuICAgICAgICBwYWRkaW5nQm90dG9tOiAwLFxuICAgICAgICBwYWRkaW5nTGVmdDogMCxcbiAgICAgICAgcGFkZGluZ1JpZ2h0OiAwLFxuICAgICAgICBjb2xvcjogJyNjZGNkY2QnXG4gICAgICB9LFxuICAgICAgeEF4aXM6IHtcbiAgICAgICAgZGF0YTogW11cbiAgICAgIH0sXG4gICAgICB5QXhpczogW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgIGxpbmVDb2xvcjogJyMyRjYwOTgnLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDUzLDEyNSwyMjIsMC4xKScsXG4gICAgICAgICAgZGF0YTogW11cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgICBsaW5lQ29sb3I6ICcjQTk2RjNFJyxcbiAgICAgICAgICBkYXRhOiBbXVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgIC8vIHZhciBwYWdlID0gZ2V0Q3VycmVudFBhZ2VzKClcbiAgICAgICAgLy8gcGFnZSA9IHBhZ2VbcGFnZS5sZW5ndGggLSAxXVxuICAgICAgICAvLyBwYWdlLnNldERhdGEoe1xuICAgICAgICAvLyAgIHRzMVJlbmRlclRpbWU6IHRpbWVcbiAgICAgICAgLy8gfSlcbiAgICAgICAgY29uc29sZS5sb2coJ2dldE9wdGlvblRpbWVTaGFyaW5nMeWbnuiwg+WHveaVsCcpXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIOi/lOWbnuS4gOS4quWIhuaXtuWbvuaIkOS6pOmHj+e7mOeUu+inhOWImeeahOWvueixoVxuICBnZXRPcHRpb25UaW1lU2hhcmluZzI6IGZ1bmN0aW9uICh0eXBlLCB3aWR0aCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0eXBlIHx8ICd0aW1lLXNoYXJpbmctYicsXG4gICAgICB3aWR0aDogd2lkdGggfHwgJ2F1dG8nLFxuICAgICAgaGVpZ2h0OiA4MCxcbiAgICAgIGF4aXM6IHtcbiAgICAgICAgcm93OiAyLFxuICAgICAgICBjb2w6IDQsXG4gICAgICAgIHNob3dFZGc6IHRydWUsXG4gICAgICAgIHNob3dYOiB0cnVlLFxuICAgICAgICBzaG93WTogdHJ1ZSxcbiAgICAgICAgcGFkZGluZ1RvcDogNSxcbiAgICAgICAgcGFkZGluZ0JvdHRvbTogMTQsXG4gICAgICAgIHBhZGRpbmdMZWZ0OiAwLFxuICAgICAgICBwYWRkaW5nUmlnaHQ6IDAsXG4gICAgICAgIGNvbG9yOiAnI2NkY2RjZCdcbiAgICAgIH0sXG4gICAgICB4QXhpczoge1xuICAgICAgICB0aW1lczogWycwOTozMCcsICcxNTowMCddLFxuICAgICAgICBkYXRhOiBbXVxuICAgICAgfSxcbiAgICAgIHlBeGlzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnYmFyJyxcbiAgICAgICAgICBjb2xvcjogW10sXG4gICAgICAgICAgZGF0YTogW10sXG4gICAgICAgICAgc2hvd01heDogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uICh0aW1lKSB7XG4gICAgICAgIC8vIHZhciBwYWdlID0gZ2V0Q3VycmVudFBhZ2VzKClcbiAgICAgICAgLy8gcGFnZSA9IHBhZ2VbcGFnZS5sZW5ndGggLSAxXVxuICAgICAgICAvLyBwYWdlLnNldERhdGEoe1xuICAgICAgICAvLyAgIHRzMlJlbmRlclRpbWU6IHRpbWVcbiAgICAgICAgLy8gfSlcbiAgICAgICAgY29uc29sZS5sb2coJ2dldE9wdGlvblRpbWVTaGFyaW5nMueahOWbnuiwg+WHveaVsCcpXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIOiOt+W+l+e7mOWItuaXpUvku7fmoLzotbDlir/lm77op4TliJnlr7nosaFcbiAgZ2V0T3B0aW9uS2xpbmUxOiBmdW5jdGlvbiAodHlwZSkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiB0eXBlIHx8ICdkaycsXG4gICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgaGVpZ2h0OiAxNjAsXG4gICAgICBhdmVyYWdlOiBbNSwgMTAsIDIwXSxcbiAgICAgIGF4aXM6IHtcbiAgICAgICAgcm93OiA0LFxuICAgICAgICBjb2w6IDUsXG4gICAgICAgIHNob3dYOiBmYWxzZSxcbiAgICAgICAgc2hvd1k6IHRydWUsXG4gICAgICAgIHNob3dFZGc6IHRydWUsXG4gICAgICAgIHBhZGRpbmdUb3A6IDAsXG4gICAgICAgIHBhZGRpbmdCb3R0b206IDEwLFxuICAgICAgICBwYWRkaW5nTGVmdDogMCxcbiAgICAgICAgcGFkZGluZ1JpZ2h0OiAwLFxuICAgICAgICBjb2xvcjogJyNjZGNkY2QnXG4gICAgICB9LFxuICAgICAgeEF4aXM6IHtcbiAgICAgICAgZGF0YTogW10sXG4gICAgICAgIGF2ZXJhZ2VMYWJlbDogW11cbiAgICAgIH0sXG4gICAgICB5QXhpczogW10sXG4gICAgICBjYWxsYmFjazogZnVuY3Rpb24gKHRpbWUpIHtcblxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICAvLyDojrflvpfnu5jliLbml6VL5Lmw5Y2W6LWw5Yq/5Zu+6KeE5YiZ5a+56LGhXG4gIGdldE9wdGlvbktsaW5lMjogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogdHlwZSB8fCAnZGsnLFxuICAgICAgd2lkdGg6ICdhdXRvJyxcbiAgICAgIGhlaWdodDogODAsXG4gICAgICBhdmVyYWdlOiBbNSwgMTAsIDIwXSxcbiAgICAgIGF4aXM6IHtcbiAgICAgICAgcm93OiAxLFxuICAgICAgICBjb2w6IDUsXG4gICAgICAgIHNob3dYOiBmYWxzZSxcbiAgICAgICAgc2hvd1k6IHRydWUsXG4gICAgICAgIHNob3dFZGc6IHRydWUsXG4gICAgICAgIHBhZGRpbmdUb3A6IDAsXG4gICAgICAgIHBhZGRpbmdCb3R0b206IDE0LFxuICAgICAgICBwYWRkaW5nTGVmdDogMCxcbiAgICAgICAgcGFkZGluZ1JpZ2h0OiAwLFxuICAgICAgICBjb2xvcjogJyNjZGNkY2QnXG4gICAgICB9LFxuICAgICAgeEF4aXM6IHtcbiAgICAgICAgdGltZXM6IFtdLFxuICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgYXZlcmFnZUxhYmVsOiBbXVxuICAgICAgfSxcbiAgICAgIHlBeGlzOiBbXSxcbiAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAodGltZSkge1xuXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=