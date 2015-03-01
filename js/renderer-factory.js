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
        {
          id: building1
          q
        }
      var classes = 5;

      var min = _.min(data);
      var max = _.max(data);

      var delta = (max - min) / classes;

      BUILDINGID
      var func = function(feature) {
        var acres = (value.hasOwnProperty("attributes")) ? value.attributes.M163_07 : value;
        return number.format(acres / 640, { places: 2 });
      };

      var renderer = new ClassBreaksRenderer(null, "POP07_SQMI");
      renderer.addBreak(min, min + delta * 1,             new SimpleFillSymbol().setColor(new Color([56, 168, 0, 0.5])));
      renderer.addBreak(min + delta * 1, min + delta * 2, new SimpleFillSymbol().setColor(new Color([139, 209, 0, 0.5])));
      renderer.addBreak(min + delta * 2, min + delta * 3, new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.5])));
      renderer.addBreak(min + delta * 3, min + delta * 4, new SimpleFillSymbol().setColor(new Color([255, 128, 0, 0.5])));
      renderer.addBreak(min + delta * 4, max,             new SimpleFillSymbol().setColor(new Color([255, 0, 0, 0.5])));

      return renderer;
      */
    }

  };
});