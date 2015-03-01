define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'esri/symbols/SimpleFillSymbol', 
  'esri/renderers/ClassBreaksRenderer',
  'esri/Color'
], function(
  declare, array, SimpleFillSymbol, ClassBreaksRenderer, Color) {

  return {

    sensorColorMap: {
      temperature: [new Color([254,229,217]), new Color([252,174,145]), new Color([251,106,74]), new Color([222,45,38]), new Color([165,15,21])],
      light: [new Color([247,247,247]), new Color([204,204,204]), new Color([150,150,150]), new Color([99,99,99]), new Color([37,37,37])],
      humidity: [new Color([240,249,232]), new Color([186,228,188]), new Color([123,204,196]), new Color([67,162,202]), new Color([8,104,172])]
    },


    createClassBreaksRenderer: function(data, colorMap) {
      /* EXPECTED:
        [
        {
          id: building1
          sensorValue: x
        },
      */  
      var classes = 5;

      var min = _.min(data, function(v) { return v.sensorValue; }).sensorValue;
      var max = _.max(data, function(v) { return v.sensorValue; }).sensorValue;

      var delta = (max - min) / classes;


      var func = function(feature) {
        return _.find(data, function(v) { return v.building == feature.attributes.LONGNAME; }).sensorValue;
      };

      var renderer = new ClassBreaksRenderer(null, func);
      renderer.addBreak({
        minValue: min,
        maxValue: min + delta * 1,
        symbol: new SimpleFillSymbol().setColor(colorMap[0]),
        label: 'Very Low'
      });
      renderer.addBreak({
        minValue: min + delta * 1,
        maxValue: min + delta * 2,
        symbol: new SimpleFillSymbol().setColor(colorMap[1]),
        label: 'Low'
      });
      renderer.addBreak({
        minValue: min + delta * 2,
        maxValue: min + delta * 3,
        symbol: new SimpleFillSymbol().setColor(colorMap[2]),
        label: 'Medium'
      });
      renderer.addBreak({
        minValue: min + delta * 3,
        maxValue: min + delta * 4,
        symbol: new SimpleFillSymbol().setColor(colorMap[3]),
        label: 'High'
      });
      renderer.addBreak({
        minValue: min + delta * 4,
        maxValue: max,
        symbol: new SimpleFillSymbol().setColor(colorMap[4]),
        label: 'Very High'
      });

      return renderer;
      
    }

  };
});