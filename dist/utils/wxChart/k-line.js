'use strict';

/**
 * Created by ChenChao on 2017/1/4.
 */

var common = require('./common.js');
var _axis = require('./axis-k.js')();

module.exports = function (canvasId) {
    return {
        unit: 60, //不同K线，X轴的单位，默认60
        canvasId: canvasId,
        averageColors: ['#6A6969', '#F69A43', '#EDB2EB'],
        ctx: null,
        canvasWidth: 0,
        canvasHeight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        options: null,
        dataStore: null,
        index: 0,
        yMax: 0,
        yMin: 1000000,
        isNew: false,
        offsetX: 0,
        startTime: '',
        endTime: '',
        txtColor: 'white',
        axisObj: null,
        init: function init(options) {
            this.ctx = wx.createCanvasContext(this.canvasId);
            this.initConfig(options);
            return this;
        },
        initConfig: function initConfig(options) {
            var that = this;
            var axis = options.axis;
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
            this.paddingTop = axis.paddingTop;
            this.paddingBottom = axis.paddingBottom;
            this.paddingLeft = axis.paddingLeft;
            this.paddingRight = axis.paddingRight;
            this.dataStore = options;
        },
        metaData1: function metaData1(origin, options) {
            var dataStore = options;
            var yMax = this.yMax = 0;
            var yMin = this.yMin = 1000000;
            var xAxis = dataStore.xAxis;
            var yAxis = dataStore.yAxis;
            var average = dataStore.average;
            var averageColors = this.averageColors;
            var historyStep = Math.max.apply(null, average) || 0;
            var originData = origin.data.slice(0);
            var odl = origin.data.length;

            //处理小于 unit 条数据的情况
            dataStore.isNew = this.isNew;
            dataStore.offsetX = this.offsetX;
            if (odl < this.unit) {
                dataStore.isNew = this.isNew = true;
                dataStore.offsetX = this.offsetX = odl;
            }
            var tempArr = [];
            if (originData.length < this.unit + historyStep) {
                for (var i = 0; i < this.unit + historyStep - originData.length; i++) {
                    tempArr.push("0000-00-00,00.00,00.00,00.00,00.00,00.00,00.00,0.00%");
                }
                originData = tempArr.concat(originData);
            }
            var data = originData.slice(originData.length - this.unit);
            var historyData = originData.slice(0, originData.length - this.unit); //计算均线所需历史数据
            historyData = historyData.slice(historyData.length - historyStep);
            var totalData = historyData.concat(data);
            yAxis.push({ //创建蜡烛趋势
                type: 'candle',
                gap: 0,
                showLabel: true,
                data_h: [], //最高
                data_l: [], //最低
                data_s: [], //开盘
                data_c: [], //收盘（现价）
                yin_yang: [] //阴阳: true为阳，false为阴
            });
            /*if(odl < 20){
                average.pop();
            }
            if(odl < 10){
                average.pop();
            }
            if(odl < 5){
                average.pop();
            }*/
            average.forEach(function (val, index) {
                dataStore.xAxis.averageLabel.push('MA' + val + ':');
                yAxis.push({ //创建均线趋势
                    name: 'MA' + val,
                    type: 'line',
                    lineColor: averageColors[index],
                    data: [],
                    dataShow: [],
                    val: val,
                    isNew: dataStore.isNew,
                    odl: odl,
                    hide: odl < val
                });
            });
            //"2017-01-06,17.00,17.10,17.40,16.90,1462083,25.1亿,2.95%" [日期，开盘价，现价，最高价，最低价，成交量，成交额，振幅]
            totalData.forEach(function (item, index) {
                var d = item.split(',');
                var t = d[0]; //时间
                var s = d[1] / 1; //开盘价
                var c = d[2] / 1; //现价
                var h = d[3] / 1; //最高价
                var l = d[4] / 1; //最低价

                if (index >= historyStep) {
                    //从历史数据之后开始计算画图所需数据
                    var dataIndex = index - historyStep;
                    var candleOpt = yAxis[0];
                    yMin = Math.min(l == 0 ? yMin : l, yMin);
                    xAxis.data[dataIndex] = t;
                    candleOpt['data_h'].push(h);
                    candleOpt['data_l'].push(l);
                    candleOpt['data_s'].push(s);
                    candleOpt['data_c'].push(c);
                    candleOpt['yin_yang'].push(c >= s);
                    yMax = Math.max(h, yMax);
                    average.forEach(function (val, i) {
                        //计算均线数据
                        var dataValue = dealAverage(val, index, totalData, 2, odl); //收盘（现）价均值
                        yAxis[i + 1].data.push(dataValue);
                        yAxis[i + 1].dataShow.push(common.metaUnit(dataValue));
                    });
                }
            });

            dataStore.axis.yMax = this.yMax = yMax;
            dataStore.axis.yMin = this.yMin = yMin;
            dataStore.unit = this.unit;
            dataStore.canvasWidth = this.canvasWidth;
            dataStore.canvasHeight = this.canvasHeight;
            this.setOptions(dataStore);
        },
        metaData2: function metaData2(origin, options) {
            var dataStore = options;
            var yMax = this.yMax;
            var yMin = this.yMin;
            var startTime = this.startTime;
            var endTime = this.endTime;
            var xAxis = dataStore.xAxis;
            var yAxis = dataStore.yAxis;
            var average = dataStore.average;
            var averageColors = this.averageColors;
            var baseV = origin.info.v;
            var historyStep = Math.max.apply(null, average) || 0;
            var originData = origin.data.slice(0);
            var odl = origin.data.length;

            //处理小于 unit 条数据的情况
            dataStore.isNew = this.isNew;
            dataStore.offsetX = this.offsetX;
            if (odl < this.unit) {
                dataStore.isNew = this.isNew = true;
                dataStore.offsetX = this.offsetX = odl;
            }
            var tempArr = [];
            if (originData.length < this.unit + historyStep) {
                for (var i = 0; i < this.unit + historyStep - originData.length; i++) {
                    tempArr.push("0000-00-00,00.00,00.00,00.00,00.00,00.00,00.00,0.00%");
                }
                originData = tempArr.concat(originData);
            }
            var data = originData.slice(originData.length - this.unit);
            var historyData = originData.slice(0, originData.length - this.unit); //计算均线所需历史数据
            historyData = historyData.slice(historyData.length - historyStep);
            var totalData = historyData.concat(data);
            yAxis.push({ //创建成交量图
                type: 'bar',
                color: [],
                data: [],
                cData: [],
                gap: 1,
                isBottomBar: true,
                showMax: true
            });
            /*if(odl < 20){
                average.pop();
            }
            if(odl < 10){
                average.pop();
            }
            if(odl < 5){
                average.pop();
            }*/
            average.forEach(function (val, index) {
                dataStore.xAxis.averageLabel.push('MA' + val + ':');
                yAxis.push({ //创建均线趋势
                    name: 'MA' + val,
                    type: 'line',
                    lineColor: averageColors[index],
                    data: [],
                    dataShow: [],
                    hide: odl < val
                });
            });
            var barOpt = yAxis[0];
            totalData.forEach(function (item, index) {
                var d = item.split(',');
                var t = d[0]; //时间
                var v = d[5] / 1; //成交量
                var c = d[2] / 1; //现价
                yMax = Math.max(v, yMax);
                yMin = Math.min(v, yMin);
                if (index >= historyStep) {
                    //从历史数据之后开始计算画图所需数据
                    var dataIndex = index - historyStep;
                    xAxis.data[dataIndex] = t;
                    if (dataIndex === 0) {
                        startTime = t.split('-').join('');
                    }
                    if (dataIndex + 1 === totalData.length - historyStep) {
                        endTime = t.split('-').join('');
                    }
                    barOpt.data[dataIndex] = v;
                    barOpt.cData[dataIndex] = c;
                    average.forEach(function (val, i) {
                        //计算均线数据
                        var dataValue = dealAverage(val, index, totalData, 5, odl); //成交量均值
                        yAxis[i + 1].data.push(dataValue);
                        yAxis[i + 1].dataShow.push(common.metaUnit(dataValue));
                    });
                }
            });

            barOpt.data.forEach(function (item, index) {
                //barOpt.color[index] = '#E6DB74';
                //console.log(barOpt.cData[index], barOpt.cData[index - 1], barOpt.cData[index] - barOpt.cData[index - 1]);
                barOpt.color[index] = barOpt.cData[index] - (index === 0 ? baseV : barOpt.cData[index - 1]) < 0 ? '#4cda64' : '#ff2f2f';
            });

            dataStore.axis.yMax = this.yMax = yMax;
            dataStore.axis.yMin = this.yMin = 0;
            dataStore.metaUnit = true;
            if (odl < 60) {
                startTime = origin.data[0].split(',')[0];
                startTime = startTime.split('-').join('');
            }
            this.startTime = startTime;
            this.endTime = endTime;
            xAxis.times = [startTime, endTime];
            this.setOptions(dataStore);
        },
        setOptions: function setOptions(options) {
            this.options = options;
        },
        axis: function axis(ctx, options) {
            this.axisObj = _axis.init(ctx, options);
        },
        bezierLine: function bezierLine(option) {
            common.bezierLine.call(this, option);
        },
        line: function line(option) {
            if (option.hide) {
                return;
            }
            var that = this;
            var ctx = this.ctx;
            var canvasHeight = this.canvasHeight;
            var canvasWidth = this.canvasWidth;
            var unit = this.unit;
            var step = (canvasWidth - this.paddingLeft - this.paddingRight) / this.unit;
            var areaH = canvasHeight - this.paddingBottom - this.paddingTop;
            var max = this.yMax;
            var min = this.yMin;
            if (option.isBottomBar) {
                min = 0;
            }
            var data = [];
            option.xAxis.data.map(function (item, index) {
                var d = option.data[index];
                var value = areaH - areaH * (d - min) / (max - min) + that.paddingTop;
                data.push([index * step - that.paddingLeft + step / 2, value]);
            });
            var barW = (canvasWidth - this.paddingLeft - this.paddingRight) / this.unit;
            if (this.offsetX > 0) {
                ctx.translate(-(this.unit - this.offsetX) * barW + 1, 0);
            }
            ctx.beginPath();
            data.map(function (item, index) {
                var x0 = item[0];
                var x1 = item[1];
                if (option.isNew) {
                    var startIndex = unit - (option.odl - option.val) - 1;
                    if (index == startIndex) {
                        ctx['moveTo'](x0, x1);
                    }
                    if (index > startIndex) {
                        ctx['lineTo'](x0, x1);
                    }
                } else {
                    ctx[index === 0 ? 'moveTo' : 'lineTo'](x0, x1);
                }
            });
            ctx.setLineWidth(1);
            ctx.setLineCap('square');
            ctx.setStrokeStyle(option.lineColor);
            ctx.stroke();
            if (this.offsetX > 0) {
                ctx.translate((this.unit - this.offsetX) * barW + 1, 0);
            }
        },
        bar: function bar(option) {
            var startTime = +new Date();
            var data = option.data;
            var ctx = this.ctx;
            var canvasHeight = this.canvasHeight;
            var canvasWidth = this.canvasWidth;
            var pb = this.paddingBottom;
            var barW = (canvasWidth - this.paddingLeft - this.paddingRight) / this.unit;
            barW -= 1;
            var max = Math.max.apply(null, data);
            var step = (canvasHeight - this.paddingTop - pb) / max;
            if (this.offsetX > 0) {
                ctx.translate(-(this.unit - this.offsetX) * (barW + 1), 0);
            }
            data.forEach(function (item, index) {
                var barH = item * step;
                var color = option.color[index];
                /*if(color === 'red'){
                    ctx.setLineWidth(1);
                    ctx.setStrokeStyle(color);
                    ctx.strokeRect(index * barW - 2, canvasHeight - pb - barH, barW, barH);
                }else{*/
                ctx.beginPath();
                ctx.setLineWidth(barW);
                ctx.moveTo(index * (barW + 1) + barW / 2 + 1, canvasHeight - pb);
                ctx.lineTo(index * (barW + 1) + barW / 2 + 1, canvasHeight - pb - barH);
                ctx.setStrokeStyle(color);
                ctx.stroke();
                //}
            });
            if (this.offsetX > 0) {
                ctx.translate((this.unit - this.offsetX) * (barW + 1), 0);
            }
            if (option.complete) {
                option.complete(+new Date() - startTime);
            }
            // if(option.showMax){
            //     ctx.setFillStyle(this.txtColor);
            //     ctx.fillText(common.metaUnit(max), this.paddingLeft + 3, this.paddingTop + 30);
            // }
        },
        candle: function candle(option) {
            var that = this;
            var ctx = this.ctx;
            var canvasWidth = this.canvasWidth;
            var canvasHeight = this.canvasHeight;
            var dataX = option.xAxis.data;
            var data_h = option.data_h;
            var data_l = option.data_l;
            var data_s = option.data_s;
            var data_c = option.data_c;
            var yin_yang = option.yin_yang;

            var max = this.yMax; //Math.max.apply(null, data_h);
            var min = this.yMin; //Math.min.apply(null, data_l);
            var areaH = canvasHeight - this.paddingBottom - this.paddingTop;
            var areaUnit = areaH / (max - min);

            var barW = (canvasWidth - this.paddingLeft - this.paddingRight) / this.unit;
            var yMin = this.yMin;
            var gap = option.gap;
            if (this.offsetX > 0) {
                ctx.translate(-(this.unit - this.offsetX) * barW, 0);
            }
            ctx.translate(0, that.paddingTop);
            data_h.forEach(function (time, index) {
                var h = data_h[index];
                var l = data_l[index];
                var s = data_s[index];
                var c = data_c[index];
                var yy = yin_yang[index];
                var cx = that.paddingLeft + (gap + barW) * index;
                common.candle(ctx, cx, barW, h, l, s, c, yy, max, min, areaH);
            });
            ctx.translate(0, -that.paddingTop);
            if (this.offsetX > 0) {
                ctx.translate((this.unit - this.offsetX) * barW, 0);
            }
        },
        showAverage: function showAverage(option) {
            var ctx = this.ctx;
            var step = this.canvasWidth / 3;
            var offsetY = 26;
            var yAxis = this.options.yAxis;
            var ma5 = yAxis[1].data;
            var ma10 = yAxis[2].data;
            var ma20 = yAxis[3].data;
            var index = this.unit - 1;
            if (option) {
                index = Math.round(option.x * this.unit / this.canvasWidth);
            }
            ctx.setFontSize(14);
            ctx.setFillStyle(this.averageColors[0]);
            ctx.fillText('MA5:' + ma5[index], 4, offsetY);
            ctx.setFillStyle(this.averageColors[1]);
            ctx.fillText('MA10:' + ma10[index], step, offsetY);
            ctx.setFillStyle(this.averageColors[2]);
            ctx.fillText('MA20:' + ma20[index], 2 * step, offsetY);
        },
        changeAverage: function changeAverage(option) {
            var ctx = this.ctx;
            ctx.clearRect(0, 0, this.canvasWidth, 30);
            this.showAverage(option);
            ctx.draw();
        },
        clear: function clear() {
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        },
        draw: function draw(opt) {
            var that = this;
            var ctx = this.ctx;
            var options = this.options;
            if (!options) {
                console.log('Warn: No setting options!');
                return;
            }

            var xAxis = options.xAxis;
            var startTime = +new Date();
            this.clear();
            this.axis(ctx, options);
            options.yAxis.map(function (option, index) {
                option.xAxis = xAxis;
                that[option.type](option);
            });
            this.axisObj.drawYUnit();
            this.ctx.draw();
            options.callback && options.callback(+new Date() - startTime);
        }
    };

    function dealAverage(val, index, totalData, averageIndex, old) {
        var arr = [];
        var dataArr = totalData.slice(0).splice(Math.abs(index - val + 1), val);
        dataArr.forEach(function (item, index) {
            var d = item.split(',');
            var s = d[averageIndex] / 1;
            arr.push(s);
        });
        return averageArray(arr, old < val ? old : arr.length).toFixed(2) / 1;
    }

    function averageArray(arr, averageNum) {
        var result = 0;
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            result += arr[i];
        }
        return len === 0 ? 0 : result / averageNum;
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImstbGluZS5qcyJdLCJuYW1lcyI6WyJjb21tb24iLCJyZXF1aXJlIiwiYXhpcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJjYW52YXNJZCIsInVuaXQiLCJhdmVyYWdlQ29sb3JzIiwiY3R4IiwiY2FudmFzV2lkdGgiLCJjYW52YXNIZWlnaHQiLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0Iiwib3B0aW9ucyIsImRhdGFTdG9yZSIsImluZGV4IiwieU1heCIsInlNaW4iLCJpc05ldyIsIm9mZnNldFgiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwidHh0Q29sb3IiLCJheGlzT2JqIiwiaW5pdCIsInd4IiwiY3JlYXRlQ2FudmFzQ29udGV4dCIsImluaXRDb25maWciLCJ0aGF0IiwidyIsIndpZHRoIiwiaCIsImhlaWdodCIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwicmVzdWx0Iiwid2luZG93V2lkdGgiLCJtZXRhRGF0YTEiLCJvcmlnaW4iLCJ4QXhpcyIsInlBeGlzIiwiYXZlcmFnZSIsImhpc3RvcnlTdGVwIiwiTWF0aCIsIm1heCIsImFwcGx5Iiwib3JpZ2luRGF0YSIsImRhdGEiLCJzbGljZSIsIm9kbCIsImxlbmd0aCIsInRlbXBBcnIiLCJpIiwicHVzaCIsImNvbmNhdCIsImhpc3RvcnlEYXRhIiwidG90YWxEYXRhIiwidHlwZSIsImdhcCIsInNob3dMYWJlbCIsImRhdGFfaCIsImRhdGFfbCIsImRhdGFfcyIsImRhdGFfYyIsInlpbl95YW5nIiwiZm9yRWFjaCIsInZhbCIsImF2ZXJhZ2VMYWJlbCIsIm5hbWUiLCJsaW5lQ29sb3IiLCJkYXRhU2hvdyIsImhpZGUiLCJpdGVtIiwiZCIsInNwbGl0IiwidCIsInMiLCJjIiwibCIsImRhdGFJbmRleCIsImNhbmRsZU9wdCIsIm1pbiIsImRhdGFWYWx1ZSIsImRlYWxBdmVyYWdlIiwibWV0YVVuaXQiLCJzZXRPcHRpb25zIiwibWV0YURhdGEyIiwiYmFzZVYiLCJpbmZvIiwidiIsImNvbG9yIiwiY0RhdGEiLCJpc0JvdHRvbUJhciIsInNob3dNYXgiLCJiYXJPcHQiLCJqb2luIiwidGltZXMiLCJiZXppZXJMaW5lIiwib3B0aW9uIiwiY2FsbCIsImxpbmUiLCJzdGVwIiwiYXJlYUgiLCJtYXAiLCJ2YWx1ZSIsImJhclciLCJ0cmFuc2xhdGUiLCJiZWdpblBhdGgiLCJ4MCIsIngxIiwic3RhcnRJbmRleCIsInNldExpbmVXaWR0aCIsInNldExpbmVDYXAiLCJzZXRTdHJva2VTdHlsZSIsInN0cm9rZSIsImJhciIsIkRhdGUiLCJwYiIsImJhckgiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjb21wbGV0ZSIsImNhbmRsZSIsImRhdGFYIiwiYXJlYVVuaXQiLCJ0aW1lIiwieXkiLCJjeCIsInNob3dBdmVyYWdlIiwib2Zmc2V0WSIsIm1hNSIsIm1hMTAiLCJtYTIwIiwicm91bmQiLCJ4Iiwic2V0Rm9udFNpemUiLCJzZXRGaWxsU3R5bGUiLCJmaWxsVGV4dCIsImNoYW5nZUF2ZXJhZ2UiLCJjbGVhclJlY3QiLCJkcmF3IiwiY2xlYXIiLCJvcHQiLCJjb25zb2xlIiwibG9nIiwiZHJhd1lVbml0IiwiY2FsbGJhY2siLCJhdmVyYWdlSW5kZXgiLCJvbGQiLCJhcnIiLCJkYXRhQXJyIiwic3BsaWNlIiwiYWJzIiwiYXZlcmFnZUFycmF5IiwidG9GaXhlZCIsImF2ZXJhZ2VOdW0iLCJsZW4iXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFJQSxJQUFJQSxTQUFTQyxRQUFRLFVBQVIsQ0FBYjtBQUNBLElBQUlDLFFBQU9ELFFBQVEsVUFBUixHQUFYOztBQUVBRSxPQUFPQyxPQUFQLEdBQWlCLFVBQVVDLFFBQVYsRUFBb0I7QUFDakMsV0FBTztBQUNIQyxjQUFNLEVBREgsRUFDUTtBQUNYRCxrQkFBVUEsUUFGUDtBQUdIRSx1QkFBZSxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLENBSFo7QUFJSEMsYUFBSyxJQUpGO0FBS0hDLHFCQUFhLENBTFY7QUFNSEMs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LEdBQWIsRUFBa0JELE1BQU1sRixHQUFOLEdBQVlrRixHQUFaLEdBQWtCQyxJQUFJbkcsTUFBeEMsRUFBZ0R3RyxPQUFoRCxDQUF3RCxDQUF4RCxJQUEyRCxDQUFsRTtBQUNIOztBQUVELGFBQVNELFlBQVQsQ0FBc0JKLEdBQXRCLEVBQTJCTSxVQUEzQixFQUF1QztBQUNuQyxZQUFJeEgsU0FBUyxDQUFiO0FBQ0EsWUFBSXlILE1BQU1QLElBQUluRyxNQUFkO0FBQ0EsYUFBSSxJQUFJRSxJQUFJLENBQVosRUFBZUEsSUFBSXdHLEdBQW5CLEVBQXdCeEcsR0FBeEIsRUFBNEI7QUFDekJqQixzQkFBVWtILElBQUlqRyxDQUFKLENBQVY7QUFDRjtBQUNELGVBQU93RyxRQUFRLENBQVIsR0FBWSxDQUFaLEdBQWdCekgsU0FBT3dILFVBQTlCO0FBQ0g7QUFDSixDQWxkRCIsImZpbGUiOiJrLWxpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgQ2hlbkNoYW8gb24gMjAxNy8xLzQuXG4gKi9cblxudmFyIGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJyk7XG52YXIgYXhpcyA9IHJlcXVpcmUoJy4vYXhpcy1rJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY2FudmFzSWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB1bml0OiA2MCwgIC8v5LiN5ZCMS+e6v++8jFjovbTnmoTljZXkvY3vvIzpu5jorqQ2MFxuICAgICAgICBjYW52YXNJZDogY2FudmFzSWQsXG4gICAgICAgIGF2ZXJhZ2VDb2xvcnM6IFsnIzZBNjk2OScsICcjRjY5QTQzJywgJyNFREIyRUInXSxcbiAgICAgICAgY3R4OiBudWxsLFxuICAgICAgICBjYW52YXNXaWR0aDogMCxcbiAgICAgICAgY2FudmFzSGVpZ2h0OiAwLFxuICAgICAgICBwYWRkaW5nVG9wOiAwLFxuICAgICAgICBwYWRkaW5nQm90dG9tOiAwLFxuICAgICAgICBwYWRkaW5nTGVmdDogMCxcbiAgICAgICAgcGFkZGluZ1JpZ2h0OiAwLFxuICAgICAgICBvcHRpb25zOiBudWxsLFxuICAgICAgICBkYXRhU3RvcmU6IG51bGwsXG4gICAgICAgIGluZGV4OiAwLFxuICAgICAgICB5TWF4OiAwLFxuICAgICAgICB5TWluOiAxMDAwMDAwLFxuICAgICAgICBpc05ldzogZmFsc2UsXG4gICAgICAgIG9mZnNldFg6IDAsXG4gICAgICAgIHN0YXJ0VGltZTogJycsXG4gICAgICAgIGVuZFRpbWU6ICcnLFxuICAgICAgICB0eHRDb2xvcjogJ3doaXRlJyxcbiAgICAgICAgYXhpc09iajogbnVsbCxcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCh0aGlzLmNhbnZhc0lkKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdENvbmZpZyhvcHRpb25zKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICBpbml0Q29uZmlnOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGF4aXMgPSBvcHRpb25zLmF4aXM7XG4gICAgICAgICAgICB2YXIgdyA9IG9wdGlvbnMud2lkdGg7XG4gICAgICAgICAgICB2YXIgaCA9IG9wdGlvbnMuaGVpZ2h0O1xuICAgICAgICAgICAgaWYodyA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgd3guZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHcgPSB0aGF0LmNhbnZhc1dpZHRoID0gcmVzdWx0LndpbmRvd1dpZHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihoID09PSAnYXV0bycpe1xuICAgICAgICAgICAgICAgIGggPSAyMjU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNhbnZhc1dpZHRoID0gdztcbiAgICAgICAgICAgIHRoaXMuY2FudmFzSGVpZ2h0ID0gaDtcbiAgICAgICAgICAgIHRoaXMudW5pdCA9IG9wdGlvbnMudW5pdCB8fCB0aGlzLnVuaXQ7XG4gICAgICAgICAgICB0aGlzLnBhZGRpbmdUb3AgPSBheGlzLnBhZGRpbmdUb3A7XG4gICAgICAgICAgICB0aGlzLnBhZGRpbmdCb3R0b20gPSBheGlzLnBhZGRpbmdCb3R0b207XG4gICAgICAgICAgICB0aGlzLnBhZGRpbmdMZWZ0ID0gYXhpcy5wYWRkaW5nTGVmdDtcbiAgICAgICAgICAgIHRoaXMucGFkZGluZ1JpZ2h0ID0gYXhpcy5wYWRkaW5nUmlnaHQ7XG4gICAgICAgICAgICB0aGlzLmRhdGFTdG9yZSA9IG9wdGlvbnM7XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGFEYXRhMTogZnVuY3Rpb24gKG9yaWdpbiwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIGRhdGFTdG9yZSA9IG9wdGlvbnM7XG4gICAgICAgICAgICB2YXIgeU1heCA9IHRoaXMueU1heCA9IDA7XG4gICAgICAgICAgICB2YXIgeU1pbiA9IHRoaXMueU1pbiA9IDEwMDAwMDA7XG4gICAgICAgICAgICB2YXIgeEF4aXMgPSBkYXRhU3RvcmUueEF4aXM7XG4gICAgICAgICAgICB2YXIgeUF4aXMgPSBkYXRhU3RvcmUueUF4aXM7XG4gICAgICAgICAgICB2YXIgYXZlcmFnZSA9IGRhdGFTdG9yZS5hdmVyYWdlO1xuICAgICAgICAgICAgdmFyIGF2ZXJhZ2VDb2xvcnMgPSB0aGlzLmF2ZXJhZ2VDb2xvcnM7XG4gICAgICAgICAgICB2YXIgaGlzdG9yeVN0ZXAgPSBNYXRoLm1heC5hcHBseShudWxsLCBhdmVyYWdlKSB8fCAwO1xuICAgICAgICAgICAgdmFyIG9yaWdpbkRhdGEgPSBvcmlnaW4uZGF0YS5zbGljZSgwKTtcbiAgICAgICAgICAgIHZhciBvZGwgPSBvcmlnaW4uZGF0YS5sZW5ndGg7XG5cbiAgICAgICAgICAgIC8v5aSE55CG5bCP5LqOIHVuaXQg5p2h5pWw5o2u55qE5oOF5Ya1XG4gICAgICAgICAgICBkYXRhU3RvcmUuaXNOZXcgPSB0aGlzLmlzTmV3O1xuICAgICAgICAgICAgZGF0YVN0b3JlLm9mZnNldFggPSB0aGlzLm9mZnNldFg7XG4gICAgICAgICAgICBpZihvZGwgPCB0aGlzLnVuaXQpe1xuICAgICAgICAgICAgICAgIGRhdGFTdG9yZS5pc05ldyA9IHRoaXMuaXNOZXcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRhdGFTdG9yZS5vZmZzZXRYID0gdGhpcy5vZmZzZXRYID0gb2RsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRlbXBBcnIgPSBbXTtcbiAgICAgICAgICAgIGlmKG9yaWdpbkRhdGEubGVuZ3RoIDwgKHRoaXMudW5pdCArIGhpc3RvcnlTdGVwKSl7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMudW5pdCArIGhpc3RvcnlTdGVwIC0gb3JpZ2luRGF0YS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBBcnIucHVzaChcIjAwMDAtMDAtMDAsMDAuMDAsMDAuMDAsMDAuMDAsMDAuMDAsMDAuMDAsMDAuMDAsMC4wMCVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9yaWdpbkRhdGEgPSB0ZW1wQXJyLmNvbmNhdChvcmlnaW5EYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkYXRhID0gb3JpZ2luRGF0YS5zbGljZShvcmlnaW5EYXRhLmxlbmd0aCAtIHRoaXMudW5pdCk7XG4gICAgICAgICAgICB2YXIgaGlzdG9yeURhdGEgPSBvcmlnaW5EYXRhLnNsaWNlKDAsIG9yaWdpbkRhdGEubGVuZ3RoIC0gdGhpcy51bml0KTsgIC8v6K6h566X5Z2H57q/5omA6ZyA5Y6G5Y+y5pWw5o2uXG4gICAgICAgICAgICBoaXN0b3J5RGF0YSA9IGhpc3RvcnlEYXRhLnNsaWNlKGhpc3RvcnlEYXRhLmxlbmd0aCAtIGhpc3RvcnlTdGVwKTtcbiAgICAgICAgICAgIHZhciB0b3RhbERhdGEgPSBoaXN0b3J5RGF0YS5jb25jYXQoZGF0YSk7XG4gICAgICAgICAgICB5QXhpcy5wdXNoKHsgIC8v5Yib5bu66Jyh54Ob6LaL5Yq/XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NhbmRsZScsXG4gICAgICAgICAgICAgICAgZ2FwOiAwLFxuICAgICAgICAgICAgICAgIHNob3dMYWJlbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkYXRhX2g6IFtdLCAgLy/mnIDpq5hcbiAgICAgICAgICAgICAgICBkYXRhX2w6IFtdLCAgLy/mnIDkvY5cbiAgICAgICAgICAgICAgICBkYXRhX3M6IFtdLCAgLy/lvIDnm5hcbiAgICAgICAgICAgICAgICBkYXRhX2M6IFtdLCAgLy/mlLbnm5jvvIjnjrDku7fvvIlcbiAgICAgICAgICAgICAgICB5aW5feWFuZzogW10gLy/pmLTpmLM6IHRydWXkuLrpmLPvvIxmYWxzZeS4uumYtFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvKmlmKG9kbCA8IDIwKXtcbiAgICAgICAgICAgICAgICBhdmVyYWdlLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYob2RsIDwgMTApe1xuICAgICAgICAgICAgICAgIGF2ZXJhZ2UucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihvZGwgPCA1KXtcbiAgICAgICAgICAgICAgICBhdmVyYWdlLnBvcCgpO1xuICAgICAgICAgICAgfSovXG4gICAgICAgICAgICBhdmVyYWdlLmZvckVhY2goZnVuY3Rpb24gKHZhbCwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBkYXRhU3RvcmUueEF4aXMuYXZlcmFnZUxhYmVsLnB1c2goJ01BJyArIHZhbCArICc6Jyk7XG4gICAgICAgICAgICAgICAgeUF4aXMucHVzaCh7ICAvL+WIm+W7uuWdh+e6v+i2i+WKv1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnTUEnICsgdmFsLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVDb2xvcjogYXZlcmFnZUNvbG9yc1tpbmRleF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhU2hvdzogW10sXG4gICAgICAgICAgICAgICAgICAgIHZhbDogdmFsLFxuICAgICAgICAgICAgICAgICAgICBpc05ldzogZGF0YVN0b3JlLmlzTmV3LFxuICAgICAgICAgICAgICAgICAgICBvZGw6IG9kbCxcbiAgICAgICAgICAgICAgICAgICAgaGlkZTogb2RsIDwgdmFsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vXCIyMDE3LTAxLTA2LDE3LjAwLDE3LjEwLDE3LjQwLDE2LjkwLDE0NjIwODMsMjUuMeS6vywyLjk1JVwiIFvml6XmnJ/vvIzlvIDnm5jku7fvvIznjrDku7fvvIzmnIDpq5jku7fvvIzmnIDkvY7ku7fvvIzmiJDkuqTph4/vvIzmiJDkuqTpop3vvIzmjK/luYVdXG4gICAgICAgICAgICB0b3RhbERhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZCA9IGl0ZW0uc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IGRbMF07IC8v5pe26Ze0XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBkWzFdLzE7IC8v5byA55uY5Lu3XG4gICAgICAgICAgICAgICAgdmFyIGMgPSBkWzJdLzE7IC8v546w5Lu3XG4gICAgICAgICAgICAgICAgdmFyIGggPSBkWzNdLzE7IC8v5pyA6auY5Lu3XG4gICAgICAgICAgICAgICAgdmFyIGwgPSBkWzRdLzE7IC8v5pyA5L2O5Lu3XG5cbiAgICAgICAgICAgICAgICBpZihpbmRleCA+PSBoaXN0b3J5U3RlcCl7IC8v5LuO5Y6G5Y+y5pWw5o2u5LmL5ZCO5byA5aeL6K6h566X55S75Zu+5omA6ZyA5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhSW5kZXggPSBpbmRleCAtIGhpc3RvcnlTdGVwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2FuZGxlT3B0ID0geUF4aXNbMF07XG4gICAgICAgICAgICAgICAgICAgIHlNaW4gPSBNYXRoLm1pbihsID09IDAgPyB5TWluIDogbCwgeU1pbik7XG4gICAgICAgICAgICAgICAgICAgIHhBeGlzLmRhdGFbZGF0YUluZGV4XSA9IHQ7XG4gICAgICAgICAgICAgICAgICAgIGNhbmRsZU9wdFsnZGF0YV9oJ10ucHVzaChoKTtcbiAgICAgICAgICAgICAgICAgICAgY2FuZGxlT3B0WydkYXRhX2wnXS5wdXNoKGwpO1xuICAgICAgICAgICAgICAgICAgICBjYW5kbGVPcHRbJ2RhdGFfcyddLnB1c2gocyk7XG4gICAgICAgICAgICAgICAgICAgIGNhbmRsZU9wdFsnZGF0YV9jJ10ucHVzaChjKTtcbiAgICAgICAgICAgICAgICAgICAgY2FuZGxlT3B0Wyd5aW5feWFuZyddLnB1c2goYyA+PSBzKTtcbiAgICAgICAgICAgICAgICAgICAgeU1heCA9IE1hdGgubWF4KGgsIHlNYXgpO1xuICAgICAgICAgICAgICAgICAgICBhdmVyYWdlLmZvckVhY2goZnVuY3Rpb24gKHZhbCwgaSkgeyAvL+iuoeeul+Wdh+e6v+aVsOaNrlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFWYWx1ZSA9IGRlYWxBdmVyYWdlKHZhbCwgaW5kZXgsIHRvdGFsRGF0YSwgMiwgb2RsKTsgLy/mlLbnm5jvvIjnjrDvvInku7flnYflgLxcbiAgICAgICAgICAgICAgICAgICAgICAgIHlBeGlzW2kgKyAxXS5kYXRhLnB1c2goZGF0YVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlBeGlzW2kgKyAxXS5kYXRhU2hvdy5wdXNoKGNvbW1vbi5tZXRhVW5pdChkYXRhVmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRhdGFTdG9yZS5heGlzLnlNYXggPSB0aGlzLnlNYXggPSB5TWF4O1xuICAgICAgICAgICAgZGF0YVN0b3JlLmF4aXMueU1pbiA9IHRoaXMueU1pbiA9IHlNaW47XG4gICAgICAgICAgICBkYXRhU3RvcmUudW5pdCA9IHRoaXMudW5pdDtcbiAgICAgICAgICAgIGRhdGFTdG9yZS5jYW52YXNXaWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgICAgICAgICBkYXRhU3RvcmUuY2FudmFzSGVpZ2h0ID0gdGhpcy5jYW52YXNIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnNldE9wdGlvbnMoZGF0YVN0b3JlKTtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0YURhdGEyOiBmdW5jdGlvbiAob3JpZ2luLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgZGF0YVN0b3JlID0gb3B0aW9ucztcbiAgICAgICAgICAgIHZhciB5TWF4ID0gdGhpcy55TWF4O1xuICAgICAgICAgICAgdmFyIHlNaW4gPSB0aGlzLnlNaW47XG4gICAgICAgICAgICB2YXIgc3RhcnRUaW1lID0gdGhpcy5zdGFydFRpbWU7XG4gICAgICAgICAgICB2YXIgZW5kVGltZSA9IHRoaXMuZW5kVGltZTtcbiAgICAgICAgICAgIHZhciB4QXhpcyA9IGRhdGFTdG9yZS54QXhpcztcbiAgICAgICAgICAgIHZhciB5QXhpcyA9IGRhdGFTdG9yZS55QXhpcztcbiAgICAgICAgICAgIHZhciBhdmVyYWdlID0gZGF0YVN0b3JlLmF2ZXJhZ2U7XG4gICAgICAgICAgICB2YXIgYXZlcmFnZUNvbG9ycyA9IHRoaXMuYXZlcmFnZUNvbG9ycztcbiAgICAgICAgICAgIHZhciBiYXNlViA9IG9yaWdpbi5pbmZvLnY7XG4gICAgICAgICAgICB2YXIgaGlzdG9yeVN0ZXAgPSBNYXRoLm1heC5hcHBseShudWxsLCBhdmVyYWdlKSB8fCAwO1xuICAgICAgICAgICAgdmFyIG9yaWdpbkRhdGEgPSBvcmlnaW4uZGF0YS5zbGljZSgwKTtcbiAgICAgICAgICAgIHZhciBvZGwgPSBvcmlnaW4uZGF0YS5sZW5ndGg7XG5cbiAgICAgICAgICAgIC8v5aSE55CG5bCP5LqOIHVuaXQg5p2h5pWw5o2u55qE5oOF5Ya1XG4gICAgICAgICAgICBkYXRhU3RvcmUuaXNOZXcgPSB0aGlzLmlzTmV3O1xuICAgICAgICAgICAgZGF0YVN0b3JlLm9mZnNldFggPSB0aGlzLm9mZnNldFg7XG4gICAgICAgICAgICBpZihvZGwgPCB0aGlzLnVuaXQpe1xuICAgICAgICAgICAgICAgIGRhdGFTdG9yZS5pc05ldyA9IHRoaXMuaXNOZXcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRhdGFTdG9yZS5vZmZzZXRYID0gdGhpcy5vZmZzZXRYID0gb2RsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRlbXBBcnIgPSBbXTtcbiAgICAgICAgICAgIGlmKG9yaWdpbkRhdGEubGVuZ3RoIDwgKHRoaXMudW5pdCArIGhpc3RvcnlTdGVwKSl7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMudW5pdCArIGhpc3RvcnlTdGVwIC0gb3JpZ2luRGF0YS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBBcnIucHVzaChcIjAwMDAtMDAtMDAsMDAuMDAsMDAuMDAsMDAuMDAsMDAuMDAsMDAuMDAsMDAuMDAsMC4wMCVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG9yaWdpbkRhdGEgPSB0ZW1wQXJyLmNvbmNhdChvcmlnaW5EYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkYXRhID0gb3JpZ2luRGF0YS5zbGljZShvcmlnaW5EYXRhLmxlbmd0aCAtIHRoaXMudW5pdCk7XG4gICAgICAgICAgICB2YXIgaGlzdG9yeURhdGEgPSBvcmlnaW5EYXRhLnNsaWNlKDAsIG9yaWdpbkRhdGEubGVuZ3RoIC0gdGhpcy51bml0KTsgIC8v6K6h566X5Z2H57q/5omA6ZyA5Y6G5Y+y5pWw5o2uXG4gICAgICAgICAgICBoaXN0b3J5RGF0YSA9IGhpc3RvcnlEYXRhLnNsaWNlKGhpc3RvcnlEYXRhLmxlbmd0aCAtIGhpc3RvcnlTdGVwKTtcbiAgICAgICAgICAgIHZhciB0b3RhbERhdGEgPSBoaXN0b3J5RGF0YS5jb25jYXQoZGF0YSk7XG4gICAgICAgICAgICB5QXhpcy5wdXNoKHsgIC8v5Yib5bu65oiQ5Lqk6YeP5Zu+XG4gICAgICAgICAgICAgICAgdHlwZTogJ2JhcicsXG4gICAgICAgICAgICAgICAgY29sb3I6IFtdLFxuICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgICAgIGNEYXRhOiBbXSxcbiAgICAgICAgICAgICAgICBnYXA6IDEsXG4gICAgICAgICAgICAgICAgaXNCb3R0b21CYXI6IHRydWUsXG4gICAgICAgICAgICAgICAgc2hvd01heDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvKmlmKG9kbCA8IDIwKXtcbiAgICAgICAgICAgICAgICBhdmVyYWdlLnBvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYob2RsIDwgMTApe1xuICAgICAgICAgICAgICAgIGF2ZXJhZ2UucG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihvZGwgPCA1KXtcbiAgICAgICAgICAgICAgICBhdmVyYWdlLnBvcCgpO1xuICAgICAgICAgICAgfSovXG4gICAgICAgICAgICBhdmVyYWdlLmZvckVhY2goZnVuY3Rpb24gKHZhbCwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBkYXRhU3RvcmUueEF4aXMuYXZlcmFnZUxhYmVsLnB1c2goJ01BJyArIHZhbCArICc6Jyk7XG4gICAgICAgICAgICAgICAgeUF4aXMucHVzaCh7ICAvL+WIm+W7uuWdh+e6v+i2i+WKv1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAnTUEnICsgdmFsLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbmVDb2xvcjogYXZlcmFnZUNvbG9yc1tpbmRleF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IFtdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhU2hvdzogW10sXG4gICAgICAgICAgICAgICAgICAgIGhpZGU6IG9kbCA8IHZhbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgYmFyT3B0ID0geUF4aXNbMF07XG4gICAgICAgICAgICB0b3RhbERhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZCA9IGl0ZW0uc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IGRbMF07IC8v5pe26Ze0XG4gICAgICAgICAgICAgICAgdmFyIHYgPSBkWzVdLzE7IC8v5oiQ5Lqk6YePXG4gICAgICAgICAgICAgICAgdmFyIGMgPSBkWzJdLzE7IC8v546w5Lu3XG4gICAgICAgICAgICAgICAgeU1heCA9IE1hdGgubWF4KHYsIHlNYXgpO1xuICAgICAgICAgICAgICAgIHlNaW4gPSBNYXRoLm1pbih2LCB5TWluKTtcbiAgICAgICAgICAgICAgICBpZihpbmRleCA+PSBoaXN0b3J5U3RlcCl7IC8v5LuO5Y6G5Y+y5pWw5o2u5LmL5ZCO5byA5aeL6K6h566X55S75Zu+5omA6ZyA5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhSW5kZXggPSBpbmRleCAtIGhpc3RvcnlTdGVwO1xuICAgICAgICAgICAgICAgICAgICB4QXhpcy5kYXRhW2RhdGFJbmRleF0gPSB0O1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhSW5kZXggPT09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lID0gdC5zcGxpdCgnLScpLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFJbmRleCArIDEgPT09IHRvdGFsRGF0YS5sZW5ndGggLSBoaXN0b3J5U3RlcCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmRUaW1lID0gdC5zcGxpdCgnLScpLmpvaW4oJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJhck9wdC5kYXRhW2RhdGFJbmRleF0gPSB2O1xuICAgICAgICAgICAgICAgICAgICBiYXJPcHQuY0RhdGFbZGF0YUluZGV4XSA9IGM7XG4gICAgICAgICAgICAgICAgICAgIGF2ZXJhZ2UuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBpKSB7IC8v6K6h566X5Z2H57q/5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YVZhbHVlID0gZGVhbEF2ZXJhZ2UodmFsLCBpbmRleCwgdG90YWxEYXRhLCA1LCBvZGwpOyAvL+aIkOS6pOmHj+Wdh+WAvFxuICAgICAgICAgICAgICAgICAgICAgICAgeUF4aXNbaSArIDFdLmRhdGEucHVzaChkYXRhVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeUF4aXNbaSArIDFdLmRhdGFTaG93LnB1c2goY29tbW9uLm1ldGFVbml0KGRhdGFWYWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYmFyT3B0LmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAvL2Jhck9wdC5jb2xvcltpbmRleF0gPSAnI0U2REI3NCc7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhiYXJPcHQuY0RhdGFbaW5kZXhdLCBiYXJPcHQuY0RhdGFbaW5kZXggLSAxXSwgYmFyT3B0LmNEYXRhW2luZGV4XSAtIGJhck9wdC5jRGF0YVtpbmRleCAtIDFdKTtcbiAgICAgICAgICAgICAgICBiYXJPcHQuY29sb3JbaW5kZXhdID0gYmFyT3B0LmNEYXRhW2luZGV4XSAtIChpbmRleCA9PT0gMCA/IGJhc2VWIDogYmFyT3B0LmNEYXRhW2luZGV4IC0gMV0pIDwgMCA/ICcjNGNkYTY0JyA6ICcjZmYyZjJmJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkYXRhU3RvcmUuYXhpcy55TWF4ID0gdGhpcy55TWF4ID0geU1heDtcbiAgICAgICAgICAgIGRhdGFTdG9yZS5heGlzLnlNaW4gPSB0aGlzLnlNaW4gPSAwO1xuICAgICAgICAgICAgZGF0YVN0b3JlLm1ldGFVbml0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmKG9kbCA8IDYwKXtcbiAgICAgICAgICAgICAgICBzdGFydFRpbWUgPSBvcmlnaW4uZGF0YVswXS5zcGxpdCgnLCcpWzBdO1xuICAgICAgICAgICAgICAgIHN0YXJ0VGltZSA9IHN0YXJ0VGltZS5zcGxpdCgnLScpLmpvaW4oJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBzdGFydFRpbWU7XG4gICAgICAgICAgICB0aGlzLmVuZFRpbWUgPSBlbmRUaW1lO1xuICAgICAgICAgICAgeEF4aXMudGltZXMgPSBbc3RhcnRUaW1lLCBlbmRUaW1lXTtcbiAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9ucyhkYXRhU3RvcmUpO1xuICAgICAgICB9LFxuICAgICAgICBzZXRPcHRpb25zOiBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgfSxcbiAgICAgICAgYXhpczogZnVuY3Rpb24gKGN0eCwgb3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5heGlzT2JqID0gYXhpcy5pbml0KGN0eCwgb3B0aW9ucyk7XG4gICAgICAgIH0sXG4gICAgICAgIGJlemllckxpbmU6IGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICAgICAgICAgIGNvbW1vbi5iZXppZXJMaW5lLmNhbGwodGhpcywgb3B0aW9uKTtcbiAgICAgICAgfSxcbiAgICAgICAgbGluZTogZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgICAgICAgaWYob3B0aW9uLmhpZGUpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIHZhciBjdHggPSB0aGlzLmN0eDtcbiAgICAgICAgICAgIHZhciBjYW52YXNIZWlnaHQgPSB0aGlzLmNhbnZhc0hlaWdodDtcbiAgICAgICAgICAgIHZhciBjYW52YXNXaWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgICAgICAgICB2YXIgdW5pdCA9IHRoaXMudW5pdDtcbiAgICAgICAgICAgIHZhciBzdGVwID0gKGNhbnZhc1dpZHRoIC0gdGhpcy5wYWRkaW5nTGVmdCAtIHRoaXMucGFkZGluZ1JpZ2h0KSAvICB0aGlzLnVuaXQ7XG4gICAgICAgICAgICB2YXIgYXJlYUggPSBjYW52YXNIZWlnaHQgLSB0aGlzLnBhZGRpbmdCb3R0b20gLSB0aGlzLnBhZGRpbmdUb3A7XG4gICAgICAgICAgICB2YXIgbWF4ID0gdGhpcy55TWF4O1xuICAgICAgICAgICAgdmFyIG1pbiA9IHRoaXMueU1pbjtcbiAgICAgICAgICAgIGlmKG9wdGlvbi5pc0JvdHRvbUJhcil7XG4gICAgICAgICAgICAgICAgbWluID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkYXRhID0gW107XG4gICAgICAgICAgICBvcHRpb24ueEF4aXMuZGF0YS5tYXAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgdmFyIGQgPSBvcHRpb24uZGF0YVtpbmRleF07XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gYXJlYUggLSBhcmVhSCAqIChkIC0gbWluKSAvIChtYXggLSBtaW4pICsgdGhhdC5wYWRkaW5nVG9wO1xuICAgICAgICAgICAgICAgIGRhdGEucHVzaChbaW5kZXggKiBzdGVwIC0gdGhhdC5wYWRkaW5nTGVmdCArIHN0ZXAgLyAyLCB2YWx1ZV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgYmFyVyA9IChjYW52YXNXaWR0aCAtIHRoaXMucGFkZGluZ0xlZnQgLSB0aGlzLnBhZGRpbmdSaWdodCkgLyB0aGlzLnVuaXQ7XG4gICAgICAgICAgICBpZih0aGlzLm9mZnNldFggPiAwKXtcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKC0odGhpcy51bml0IC0gdGhpcy5vZmZzZXRYKSAqIGJhclcgKyAxLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGRhdGEubWFwKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHZhciB4MCA9IGl0ZW1bMF07XG4gICAgICAgICAgICAgICAgdmFyIHgxID0gaXRlbVsxXTtcbiAgICAgICAgICAgICAgICBpZihvcHRpb24uaXNOZXcpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRJbmRleCA9IHVuaXQgLSAob3B0aW9uLm9kbCAtIG9wdGlvbi52YWwpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPT0gc3RhcnRJbmRleCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHhbJ21vdmVUbyddKHgwLCB4MSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPiBzdGFydEluZGV4KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eFsnbGluZVRvJ10oeDAsIHgxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBjdHhbaW5kZXggPT09IDAgPyAnbW92ZVRvJyA6ICdsaW5lVG8nXSh4MCwgeDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY3R4LnNldExpbmVXaWR0aCgxKTtcbiAgICAgICAgICAgIGN0eC5zZXRMaW5lQ2FwKCdzcXVhcmUnKTtcbiAgICAgICAgICAgIGN0eC5zZXRTdHJva2VTdHlsZShvcHRpb24ubGluZUNvbG9yKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgICAgIGlmKHRoaXMub2Zmc2V0WCA+IDApe1xuICAgICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoKHRoaXMudW5pdCAtIHRoaXMub2Zmc2V0WCkgKiBiYXJXICsgMSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGJhcjogZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgICAgICAgdmFyIHN0YXJ0VGltZSA9ICtuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBvcHRpb24uZGF0YTtcbiAgICAgICAgICAgIHZhciBjdHggPSB0aGlzLmN0eDtcbiAgICAgICAgICAgIHZhciBjYW52YXNIZWlnaHQgPSB0aGlzLmNhbnZhc0hlaWdodDtcbiAgICAgICAgICAgIHZhciBjYW52YXNXaWR0aCA9IHRoaXMuY2FudmFzV2lkdGg7XG4gICAgICAgICAgICB2YXIgcGIgPSB0aGlzLnBhZGRpbmdCb3R0b207XG4gICAgICAgICAgICB2YXIgYmFyVyA9IChjYW52YXNXaWR0aCAtIHRoaXMucGFkZGluZ0xlZnQgLSB0aGlzLnBhZGRpbmdSaWdodCkgLyB0aGlzLnVuaXQ7XG4gICAgICAgICAgICBiYXJXIC09IDE7XG4gICAgICAgICAgICB2YXIgbWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgZGF0YSk7XG4gICAgICAgICAgICB2YXIgc3RlcCA9IChjYW52YXNIZWlnaHQgLSB0aGlzLnBhZGRpbmdUb3AgLSBwYikgLyBtYXg7XG4gICAgICAgICAgICBpZih0aGlzLm9mZnNldFggPiAwKXtcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKC0odGhpcy51bml0IC0gdGhpcy5vZmZzZXRYKSAqIChiYXJXICsgMSksIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHZhciBiYXJIID0gaXRlbSAqIHN0ZXA7XG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gb3B0aW9uLmNvbG9yW2luZGV4XTtcbiAgICAgICAgICAgICAgICAvKmlmKGNvbG9yID09PSAncmVkJyl7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zZXRMaW5lV2lkdGgoMSk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zZXRTdHJva2VTdHlsZShjb2xvcik7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KGluZGV4ICogYmFyVyAtIDIsIGNhbnZhc0hlaWdodCAtIHBiIC0gYmFySCwgYmFyVywgYmFySCk7XG4gICAgICAgICAgICAgICAgfWVsc2V7Ki9cbiAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICBjdHguc2V0TGluZVdpZHRoKGJhclcpO1xuICAgICAgICAgICAgICAgICAgICBjdHgubW92ZVRvKGluZGV4ICogKGJhclcgKyAxKSArIGJhclcvMiArIDEgLCBjYW52YXNIZWlnaHQgLSBwYik7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5saW5lVG8oaW5kZXggKiAoYmFyVyArIDEpICsgYmFyVy8yICsgMSwgY2FudmFzSGVpZ2h0IC0gcGIgLSBiYXJIKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnNldFN0cm9rZVN0eWxlKGNvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZih0aGlzLm9mZnNldFggPiAwKXtcbiAgICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKCh0aGlzLnVuaXQgLSB0aGlzLm9mZnNldFgpICogKGJhclcgKyAxKSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihvcHRpb24uY29tcGxldGUpe1xuICAgICAgICAgICAgICAgIG9wdGlvbi5jb21wbGV0ZSgrbmV3IERhdGUoKSAtIHN0YXJ0VGltZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZihvcHRpb24uc2hvd01heCl7XG4gICAgICAgICAgICAvLyAgICAgY3R4LnNldEZpbGxTdHlsZSh0aGlzLnR4dENvbG9yKTtcbiAgICAgICAgICAgIC8vICAgICBjdHguZmlsbFRleHQoY29tbW9uLm1ldGFVbml0KG1heCksIHRoaXMucGFkZGluZ0xlZnQgKyAzLCB0aGlzLnBhZGRpbmdUb3AgKyAzMCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH0sXG4gICAgICAgIGNhbmRsZTogZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuY3R4O1xuICAgICAgICAgICAgdmFyIGNhbnZhc1dpZHRoID0gdGhpcy5jYW52YXNXaWR0aDtcbiAgICAgICAgICAgIHZhciBjYW52YXNIZWlnaHQgPSB0aGlzLmNhbnZhc0hlaWdodDtcbiAgICAgICAgICAgIHZhciBkYXRhWCA9IG9wdGlvbi54QXhpcy5kYXRhO1xuICAgICAgICAgICAgdmFyIGRhdGFfaCA9IG9wdGlvbi5kYXRhX2g7XG4gICAgICAgICAgICB2YXIgZGF0YV9sID0gb3B0aW9uLmRhdGFfbDtcbiAgICAgICAgICAgIHZhciBkYXRhX3MgPSBvcHRpb24uZGF0YV9zO1xuICAgICAgICAgICAgdmFyIGRhdGFfYyA9IG9wdGlvbi5kYXRhX2M7XG4gICAgICAgICAgICB2YXIgeWluX3lhbmcgPSBvcHRpb24ueWluX3lhbmc7XG5cbiAgICAgICAgICAgIHZhciBtYXggPSB0aGlzLnlNYXg7Ly9NYXRoLm1heC5hcHBseShudWxsLCBkYXRhX2gpO1xuICAgICAgICAgICAgdmFyIG1pbiA9IHRoaXMueU1pbjsvL01hdGgubWluLmFwcGx5KG51bGwsIGRhdGFfbCk7XG4gICAgICAgICAgICB2YXIgYXJlYUggPSBjYW52YXNIZWlnaHQgLSB0aGlzLnBhZGRpbmdCb3R0b20gLSB0aGlzLnBhZGRpbmdUb3A7XG4gICAgICAgICAgICB2YXIgYXJlYVVuaXQgPSBhcmVhSCAvIChtYXggLSBtaW4pO1xuXG4gICAgICAgICAgICB2YXIgYmFyVyA9IChjYW52YXNXaWR0aCAtIHRoaXMucGFkZGluZ0xlZnQgLSB0aGlzLnBhZGRpbmdSaWdodCkgLyB0aGlzLnVuaXQ7XG4gICAgICAgICAgICB2YXIgeU1pbiA9IHRoaXMueU1pbjtcbiAgICAgICAgICAgIHZhciBnYXAgPSBvcHRpb24uZ2FwO1xuICAgICAgICAgICAgaWYodGhpcy5vZmZzZXRYID4gMCl7XG4gICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSgtKHRoaXMudW5pdCAtIHRoaXMub2Zmc2V0WCkgKiBiYXJXLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoMCwgdGhhdC5wYWRkaW5nVG9wKTtcbiAgICAgICAgICAgIGRhdGFfaC5mb3JFYWNoKGZ1bmN0aW9uICh0aW1lLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHZhciBoID0gZGF0YV9oW2luZGV4XTtcbiAgICAgICAgICAgICAgICB2YXIgbCA9IGRhdGFfbFtpbmRleF07XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBkYXRhX3NbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHZhciBjID0gZGF0YV9jW2luZGV4XTtcbiAgICAgICAgICAgICAgICB2YXIgeXkgPSB5aW5feWFuZ1tpbmRleF07XG4gICAgICAgICAgICAgICAgdmFyIGN4ICA9IHRoYXQucGFkZGluZ0xlZnQgKyAoZ2FwICsgYmFyVykgKiBpbmRleDtcbiAgICAgICAgICAgICAgICBjb21tb24uY2FuZGxlKGN0eCwgY3gsIGJhclcsIGgsIGwsIHMsIGMsIHl5LCBtYXgsIG1pbiwgYXJlYUgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKDAsIC10aGF0LnBhZGRpbmdUb3ApO1xuICAgICAgICAgICAgaWYodGhpcy5vZmZzZXRYID4gMCl7XG4gICAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSgodGhpcy51bml0IC0gdGhpcy5vZmZzZXRYKSAqIGJhclcsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzaG93QXZlcmFnZTogZnVuY3Rpb24gKG9wdGlvbikge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuY3R4O1xuICAgICAgICAgICAgdmFyIHN0ZXAgPSB0aGlzLmNhbnZhc1dpZHRoIC8gMztcbiAgICAgICAgICAgIHZhciBvZmZzZXRZID0gMjY7XG4gICAgICAgICAgICB2YXIgeUF4aXMgPSB0aGlzLm9wdGlvbnMueUF4aXM7XG4gICAgICAgICAgICB2YXIgbWE1ID0geUF4aXNbMV0uZGF0YTtcbiAgICAgICAgICAgIHZhciBtYTEwID0geUF4aXNbMl0uZGF0YTtcbiAgICAgICAgICAgIHZhciBtYTIwID0geUF4aXNbM10uZGF0YTtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMudW5pdCAtIDE7XG4gICAgICAgICAgICBpZihvcHRpb24pe1xuICAgICAgICAgICAgICAgIGluZGV4ID0gTWF0aC5yb3VuZChvcHRpb24ueCAqIHRoaXMudW5pdCAvIHRoaXMuY2FudmFzV2lkdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3R4LnNldEZvbnRTaXplKDE0KTtcbiAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUodGhpcy5hdmVyYWdlQ29sb3JzWzBdKTtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnTUE1OicgKyBtYTVbaW5kZXhdLCA0LCBvZmZzZXRZKTtcbiAgICAgICAgICAgIGN0eC5zZXRGaWxsU3R5bGUodGhpcy5hdmVyYWdlQ29sb3JzWzFdKTtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCgnTUExMDonICsgbWExMFtpbmRleF0sIHN0ZXAsIG9mZnNldFkpO1xuICAgICAgICAgICAgY3R4LnNldEZpbGxTdHlsZSh0aGlzLmF2ZXJhZ2VDb2xvcnNbMl0pO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KCdNQTIwOicgKyBtYTIwW2luZGV4XSwgMiAqIHN0ZXAsIG9mZnNldFkpO1xuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2VBdmVyYWdlOiBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5jdHg7XG4gICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzV2lkdGgsIDMwKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0F2ZXJhZ2Uob3B0aW9uKTtcbiAgICAgICAgICAgIGN0eC5kcmF3KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXNXaWR0aCwgdGhpcy5jYW52YXNIZWlnaHQpO1xuICAgICAgICB9LFxuICAgICAgICBkcmF3OiBmdW5jdGlvbiAob3B0KSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5jdHg7XG4gICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICAgICAgICAgIGlmKCFvcHRpb25zKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnV2FybjogTm8gc2V0dGluZyBvcHRpb25zIScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHhBeGlzID0gb3B0aW9ucy54QXhpcztcbiAgICAgICAgICAgIHZhciBzdGFydFRpbWUgPSArbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgIHRoaXMuYXhpcyhjdHgsIG9wdGlvbnMpO1xuICAgICAgICAgICAgb3B0aW9ucy55QXhpcy5tYXAoZnVuY3Rpb24gKG9wdGlvbiwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBvcHRpb24ueEF4aXMgPSB4QXhpcztcbiAgICAgICAgICAgICAgICB0aGF0W29wdGlvbi50eXBlXShvcHRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmF4aXNPYmouZHJhd1lVbml0KCk7XG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3KCk7XG4gICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrICYmIG9wdGlvbnMuY2FsbGJhY2soK25ldyBEYXRlKCkgLSBzdGFydFRpbWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGRlYWxBdmVyYWdlKHZhbCwgaW5kZXgsIHRvdGFsRGF0YSwgYXZlcmFnZUluZGV4LCBvbGQpIHtcbiAgICAgICAgdmFyIGFyciA9IFtdO1xuICAgICAgICB2YXIgZGF0YUFyciA9IHRvdGFsRGF0YS5zbGljZSgwKS5zcGxpY2UoTWF0aC5hYnMoaW5kZXggLSB2YWwgKyAxKSwgdmFsKTtcbiAgICAgICAgZGF0YUFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIGQgPSBpdGVtLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICB2YXIgcyA9IGRbYXZlcmFnZUluZGV4XS8xO1xuICAgICAgICAgICAgYXJyLnB1c2gocyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXZlcmFnZUFycmF5KGFyciwgb2xkIDwgdmFsID8gb2xkIDogYXJyLmxlbmd0aCkudG9GaXhlZCgyKS8xO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGF2ZXJhZ2VBcnJheShhcnIsIGF2ZXJhZ2VOdW0pIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgICAgIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICAgICByZXN1bHQgKz0gYXJyW2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsZW4gPT09IDAgPyAwIDogcmVzdWx0L2F2ZXJhZ2VOdW07XG4gICAgfVxufTsiXX0=