'use strict';

/**
 * Created by ChenChao on 2017/1/11.
 */

module.exports = function (canvasId) {
    return {
        canvasId: canvasId,
        ctx: null,
        unit: 60,
        canvasWidth: 0,
        canvasHeight: 0,
        lineWidth: 1,
        color: 'white',
        showVLine: true,
        showHLine: true,
        lastX: 0,
        lastY: 0,
        init: function init(options) {
            this.ctx = wx.createCanvasContext(this.canvasId);
            this.initConfig(options);
            return this;
        },
        initConfig: function initConfig(options) {
            var that = this;
            var w = options.width;
            var h = options.height;
            if (w === 'auto') {
                wx.getSystemInfo({
                    success: function success(result) {
                        w = that.canvasWidth = result.windowWidth;
                    }
                });
            }
            if (h === 'auto') {
                h = 225;
            }
            this.canvasWidth = w;
            this.canvasHeight = h;
            this.unit = options.unit || this.unit;
            this.color = options.color;
            this.lineWidth = options.lineWidth;
        },
        clear: function clear() {
            var ctx = this.ctx;
            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            ctx.draw();
        },
        vLine: function vLine(option) {
            //console.log('v line:', option);
            var ctx = this.ctx;
            var x = option.x;
            var step = this.canvasWidth / this.unit;
            x = Math.round(x / step);
            x = x * step - step / 2;
            //if(x != this.lastX){
            //this.clear();
            ctx.beginPath();
            ctx.setLineWidth(this.lineWidth);
            ctx.moveTo(x + 0.5, 0);
            ctx.lineTo(x + 0.5, this.canvasHeight);
            ctx.setStrokeStyle('white');
            ctx.stroke();
            this.lastX = x;
            //}
        },
        hLine: function hLine(option) {
            //console.log('h line:', option);
        },
        draw: function draw(opt) {
            this.clear();
            if (this.showVLine) {
                this.vLine(opt);
            }
            if (this.showHLine) {
                this.hLine(opt);
            }
            this.ctx.draw();
        }
    };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImstbW92ZS5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiY2FudmFzSWQiLCJjdHgiLCJ1bml0IiwiY2FudmFzV2lkdGgiLCJjYW52YXNIZWlnaHQiLCJsaW5lV2lkdGgiLCJjb2xvciIsInNob3dWTGluZSIsInNob3dITGluZSIsImxhc3RYIiwibGFzdFkiLCJpbml0Iiwib3B0aW9ucyIsInd4IiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsImluaXRDb25maWciLCJ0aGF0IiwidyIsIndpZHRoIiwiaCIsImhlaWdodCIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzdWx0Iiwid2luZG93V2lkdGgiLCJjbGVhciIsImNsZWFyUmVjdCIsImRyYXciLCJ2TGluZSIsIm9wdGlvbiIsIngiLCJzdGVwIiwiTWF0aCIsInJvdW5kIiwiYmVnaW5QYXRoIiwic2V0TGluZVdpZHRoIiwibW92ZVRvIiwibGluZVRvIiwic2V0U3Ryb2tlU3R5bGUiLCJzdHJva2UiLCJoTGluZSIsIm9wdCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUlBQSxPQUFPQyxPQUFQLEdBQWlCLFVBQVVDLFFBQVYsRUFBb0I7QUFDakMsV0FBTztBQUNIQSxrQkFBVUEsUUFEUDtBQUVIQyxhQUFLLElBRkY7QUFHSEMsY0FBTSxFQUhIO0FBSUhDLHFCQUFhLENBSlY7QUFLSEMsc0JBQWMsQ0FMWDtBQU1IQyxtQkFBVyxDQU5SO0FBT0hDLGVBQU8sT0FQSjtBQVFIQyxtQkFBVyxJQVJSO0FBU0hDLG1CQUFXLElBVFI7QUFVSEMsZUFBTyxDQVZKO0FBV0hDLGVBQU8sQ0FYSjtBQVlIQyxjQUFNLGNBQVVDLE9BQVYsRUFBbUI7QUFDckIsaUJBQUtYLEdBQUwsR0FBV1ksR0FBR0MsbUJBQUgsQ0FBdUIsS0FBS2QsUUFBNUIsQ0FBWDtBQUNBLGlCQUFLZSxVQUFMLENBQWdCSCxPQUFoQjtBQUNBLG1CQUFPLElBQVA7QUFDSCxTQWhCRTtBQWlCSEcsb0JBQVksb0JBQVVILE9BQVYsRUFBbUI7QUFDM0IsZ0JBQUlJLE9BQU8sSUFBWDtBQUNBLGdCQUFJQyxJQUFJTCxRQUFRTSxLQUFoQjtBQUNBLGdCQUFJQyxJQUFJUCxRQUFRUSxNQUFoQjtBQUNBLGdCQUFHSCxNQUFNLE1BQVQsRUFBaUI7QUFDYkosbUJBQUdRLGFBQUgsQ0FBaUI7QUFDYkMsNkJBQVMsaUJBQVVDLE1BQVYsRUFBa0I7QUFDdkJOLDRCQUFJRCxLQUFLYixXQUFMLEdBQW1Cb0IsT0FBT0MsV0FBOUI7QUFDSDtBQUhZLGlCQUFqQjtBQUtIO0FBQ0QsZ0JBQUdMLE1BQU0sTUFBVCxFQUFnQjtBQUNaQSxvQkFBSSxHQUFKO0FBQ0g7QUFDRCxpQkFBS2hCLFdBQUwsR0FBbUJjLENBQW5CO0FBQ0EsaUJBQUtiLFlBQUwsR0FBb0JlLENBQXBCO0FBQ0EsaUJBQUtqQixJQUFMLEdBQVlVLFFBQVFWLElBQVIsSUFBZ0IsS0FBS0EsSUFBakM7QUFDQSxpQkFBS0ksS0FBTCxHQUFhTSxRQUFRTixLQUFyQjtBQUNBLGlCQUFLRCxTQUFMLEdBQWlCTyxRQUFRUCxTQUF6QjtBQUNILFNBcENFO0FBcUNIb0IsZUFBTyxpQkFBWTtBQUNmLGdCQUFJeEIsTUFBTSxLQUFLQSxHQUFmO0FBQ0FBLGdCQUFJeUIsU0FBSixDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0IsS0FBS3ZCLFdBQXpCLEVBQXNDLEtBQUtDLFlBQTNDO0FBQ0FILGdCQUFJMEIsSUFBSjtBQUNILFNBekNFO0FBMENIQyxlQUFPLGVBQVVDLE1BQVYsRUFBa0I7QUFDckI7QUFDQSxnQkFBSTVCLE1BQU0sS0FBS0EsR0FBZjtBQUNBLGdCQUFJNkIsSUFBSUQsT0FBT0MsQ0FBZjtBQUNBLGdCQUFJQyxPQUFPLEtBQUs1QixXQUFMLEdBQW1CLEtBQUtELElBQW5DO0FBQ0E0QixnQkFBSUUsS0FBS0MsS0FBTCxDQUFXSCxJQUFJQyxJQUFmLENBQUo7QUFDQUQsZ0JBQUlBLElBQUlDLElBQUosR0FBV0EsT0FBSyxDQUFwQjtBQUNBO0FBQ0k7QUFDQTlCLGdCQUFJaUMsU0FBSjtBQUNBakMsZ0JBQUlrQyxZQUFKLENBQWlCLEtBQUs5QixTQUF0QjtBQUNBSixnQkFBSW1DLE1BQUosQ0FBV04sSUFBSSxHQUFmLEVBQW9CLENBQXBCO0FBQ0E3QixnQkFBSW9DLE1BQUosQ0FBV1AsSUFBSSxHQUFmLEVBQW9CLEtBQUsxQixZQUF6QjtBQUNBSCxnQkFBSXFDLGNBQUosQ0FBbUIsT0FBbkI7QUFDQXJDLGdCQUFJc0MsTUFBSjtBQUNBLGlCQUFLOUIsS0FBTCxHQUFhcUIsQ0FBYjtBQUNKO0FBQ0gsU0EzREU7QUE0REhVLGVBQU8sZUFBVVgsTUFBVixFQUFrQjtBQUNyQjtBQUNILFNBOURFO0FBK0RIRixjQUFNLGNBQVVjLEdBQVYsRUFBZTtBQUNqQixpQkFBS2hCLEtBQUw7QUFDQSxnQkFBRyxLQUFLbEIsU0FBUixFQUFrQjtBQUNkLHFCQUFLcUIsS0FBTCxDQUFXYSxHQUFYO0FBQ0g7QUFDRCxnQkFBRyxLQUFLakMsU0FBUixFQUFrQjtBQUNkLHFCQUFLZ0MsS0FBTCxDQUFXQyxHQUFYO0FBQ0g7QUFDRCxpQkFBS3hDLEdBQUwsQ0FBUzBCLElBQVQ7QUFDSDtBQXhFRSxLQUFQO0FBMEVILENBM0VEIiwiZmlsZSI6ImstbW92ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBDaGVuQ2hhbyBvbiAyMDE3LzEvMTEuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY2FudmFzSWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjYW52YXNJZDogY2FudmFzSWQsXG4gICAgICAgIGN0eDogbnVsbCxcbiAgICAgICAgdW5pdDogNjAsXG4gICAgICAgIGNhbnZhc1dpZHRoOiAwLFxuICAgICAgICBjYW52YXNIZWlnaHQ6IDAsXG4gICAgICAgIGxpbmVXaWR0aDogMSxcbiAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgIHNob3dWTGluZTogdHJ1ZSxcbiAgICAgICAgc2hvd0hMaW5lOiB0cnVlLFxuICAgICAgICBsYXN0WDogMCxcbiAgICAgICAgbGFzdFk6IDAsXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmN0eCA9IHd4LmNyZWF0ZUNhbnZhc0NvbnRleHQodGhpcy5jYW52YXNJZCk7XG4gICAgICAgICAgICB0aGlzLmluaXRDb25maWcob3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgaW5pdENvbmZpZzogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIHZhciB3ID0gb3B0aW9ucy53aWR0aDtcbiAgICAgICAgICAgIHZhciBoID0gb3B0aW9ucy5oZWlnaHQ7XG4gICAgICAgICAgICBpZih3ID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdyA9IHRoYXQuY2FudmFzV2lkdGggPSByZXN1bHQud2luZG93V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGggPT09ICdhdXRvJyl7XG4gICAgICAgICAgICAgICAgaCA9IDIyNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2FudmFzV2lkdGggPSB3O1xuICAgICAgICAgICAgdGhpcy5jYW52YXNIZWlnaHQgPSBoO1xuICAgICAgICAgICAgdGhpcy51bml0ID0gb3B0aW9ucy51bml0IHx8IHRoaXMudW5pdDtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSBvcHRpb25zLmNvbG9yO1xuICAgICAgICAgICAgdGhpcy5saW5lV2lkdGggPSBvcHRpb25zLmxpbmVXaWR0aDtcbiAgICAgICAgfSxcbiAgICAgICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjdHggPSB0aGlzLmN0eDtcbiAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNXaWR0aCwgdGhpcy5jYW52YXNIZWlnaHQpO1xuICAgICAgICAgICAgY3R4LmRyYXcoKTtcbiAgICAgICAgfSxcbiAgICAgICAgdkxpbmU6IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3YgbGluZTonLCBvcHRpb24pO1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuY3R4O1xuICAgICAgICAgICAgdmFyIHggPSBvcHRpb24ueDtcbiAgICAgICAgICAgIHZhciBzdGVwID0gdGhpcy5jYW52YXNXaWR0aCAvIHRoaXMudW5pdDtcbiAgICAgICAgICAgIHggPSBNYXRoLnJvdW5kKHggLyBzdGVwKTtcbiAgICAgICAgICAgIHggPSB4ICogc3RlcCAtIHN0ZXAvMjtcbiAgICAgICAgICAgIC8vaWYoeCAhPSB0aGlzLmxhc3RYKXtcbiAgICAgICAgICAgICAgICAvL3RoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LnNldExpbmVXaWR0aCh0aGlzLmxpbmVXaWR0aCk7XG4gICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyh4ICsgMC41LCAwKTtcbiAgICAgICAgICAgICAgICBjdHgubGluZVRvKHggKyAwLjUsIHRoaXMuY2FudmFzSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBjdHguc2V0U3Ryb2tlU3R5bGUoJ3doaXRlJyk7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFggPSB4O1xuICAgICAgICAgICAgLy99XG4gICAgICAgIH0sXG4gICAgICAgIGhMaW5lOiBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdoIGxpbmU6Jywgb3B0aW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgZHJhdzogZnVuY3Rpb24gKG9wdCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgaWYodGhpcy5zaG93VkxpbmUpe1xuICAgICAgICAgICAgICAgIHRoaXMudkxpbmUob3B0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMuc2hvd0hMaW5lKXtcbiAgICAgICAgICAgICAgICB0aGlzLmhMaW5lKG9wdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3KCk7XG4gICAgICAgIH1cbiAgICB9O1xufTsiXX0=