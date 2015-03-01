define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'esri/symbols/SimpleFillSymbol', 
  'esri/renderers/ClassBreaksRenderer',
  'esri/Color'
], function(
  declare, array, SimpleFillSymbol, ClassBreaksRenderer, Color) {

  return {


    createClassBreaksRenderer: function(data) {
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
      renderer.addBreak(min, min + delta * 1,             new SimpleFillSymbol().setColor(new Color([56, 168, 0, 1])));
      renderer.addBreak(min + delta * 1, min + delta * 2, new SimpleFillSymbol().setColor(new Color([139, 209, 0, 1])));
      renderer.addBreak(min + delta * 2, min + delta * 3, new SimpleFillSymbol().setColor(new Color([255, 255, 0, 1])));
      renderer.addBreak(min + delta * 3, min + delta * 4, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 1])));
      renderer.addBreak(min + delta * 4, max,             new SimpleFillSymbol().setColor(new Color([255, 0, 0, 1])));

      return renderer;
      
    }

  };
});