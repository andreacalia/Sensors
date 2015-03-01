define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/topic',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',

  'esri/map',
  'esri/InfoTemplate',
  'esri/layers/FeatureLayer',
  'esri/dijit/Scalebar',
  'esri/layers/WebTiledLayer',
  'esri/dijit/HomeButton',
  'esri/dijit/LocateButton',
  'esri/dijit/Geocoder',
  'esri/arcgis/utils',
  'esri/dijit/Legend',

  'bootstrap-map-js/js/bootstrapmap',

  'dojo/text!./tpl/map-widget.html'
], function(
  declare, array, lang, domClass, topic,
  _WidgetBase, _TemplatedMixin,
  Map, InfoTemplate, FeatureLayer, Scalebar, WebTiledLayer, HomeButton, LocateButton, Geocoder, arcgisUtils, Legend,
  BootstrapMap,
  template) {

  return declare([_WidgetBase, _TemplatedMixin], {

    templateString: template,

    postCreate: function() {

      this.inherited(arguments);
      // NOTE: BootstrapMap needs to work off an id
      this.mapNode.id = this.id + 'Map';
      this._initMap();
    },

    // initalize map from configuration parameters
    _initMap: function() {

      if (!this.options) {
        this.options = {};
      }

      this.map = BootstrapMap.create(this.mapNode.id, {
            basemap:"gray",
            center:[-0.0693919, 39.994471],
            zoom:17,
            scrollWheelZoom: false
          });
      this._initLayers();
      //this._initWidgets();
    },

    // init map layers from options instead of a web map
    _initLayers: function() {
      
      var infoTemplate = new InfoTemplate(
        '<a href="${Link}">${LONGNAME}</a>', 
        '<img src="${PhotoLink}" class="img-thumbnail">'
      );

      this.layer = new FeatureLayer('http://smart.uji.es/adaptor/rest/services/SmartCampus/BuildingsNew/MapServer/0', {
        infoTemplate: infoTemplate,
        outFields: ['FACILITYKEY', 'LONGNAME', 'PhotoLink', 'Link'],
        opacity: 0.9
      });

      this.map.addLayer(this.layer);

    },

    setRenderer: function(newRenderer) {

      this.layer.setRenderer(newRenderer);

    }
/*
    // init map widgets if they are in config
    _initWidgets: function() {
      var self = this;
      if (!this.widgets) {
        return;
      }

      // scalebar
      if (this.widgets.scalebar) {
        this.scalebar = new Scalebar(lang.mixin({
          map: this.map,
          scalebarUnit: 'dual'
        }, this.widgets.scalebar));
      }

      // home button
      if (this.widgets.homeButton) {
        this.homeButton = new HomeButton(lang.mixin({
          map: this.map
        }, this.widgets.homeButton), this.homeNode);
        this.homeButton.startup();
      }

      // locate button
      if (this.widgets.locateButton) {
        this.locateButton = new LocateButton(lang.mixin({
          map: this.map,
          'class': 'locate-button'
        }, this.widgets.locateButton), this.locateNode);
        this.locateButton.startup();
      }

      // geocoder
      if (this.widgets.geocoder) {
        this.geocoder = new Geocoder(lang.mixin({
          map: this.map,
          'class': 'geocoder'
        }, this.widgets.geocoder), this.searchNode);
        this.geocoder.startup();
        this.own(this.geocoder.on('select', function(e) {
          domClass.remove(self.geocoder.domNode, 'shown');
        }));
      }
    },
/*
    getMapHeight: function() {
      if(this.map)
        return this.map.height;

      return 0;
    }
*/
  });
});