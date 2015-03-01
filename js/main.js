define([
  'dojo/query',
  'dojo/dom',
  'dojo/dom-class',
  'dojo/dom-style',
  'dojo/topic',
  'dojo/on',
  'dojo/Deferred',
  'dojo/request',

  'app/map-widget',
  'app/settings-widget',
  'app/renderer-factory',

  'esri/dijit/Legend',

  'dojo/domReady!'],
function(
  query, dom, domClass, domStyle, topic, on, Deferred, request,
  MapWidget, SettingsWidget, RendererFactory, Legend
) {
  'use strict';

  var app = {};

  app._showSidebar = function() {

    domClass.toggle(window.document.body, 'sidebar-open');

  };

  app._loadRemoteData = function(opt) {

    return request.get('http://inti.init.uji.es:8080/Sensors/ws/?from='+opt.isoDateFrom+'&to='+opt.isoDateTo, {
      handleAs: 'json',
      headers: {
          "X-Requested-With": null
      }
    });

  };

  app._fixDateParameter = function(newSettings) {

    var dateFrom = newSettings.date + 'T00:00:00Z';
    var dateTo = newSettings.date + 'T23:59:59Z';

    return {
      isoDateFrom: dateFrom,
      isoDateTo: dateTo
    };

  };

  // Sidebar button
  on(dom.byId('sidebar-toggle'), 'click', app._showSidebar);


  app.mapWidget = new MapWidget({}, 'mapControls');
  app.settingsWidget = new SettingsWidget({}, 'controls');

  // Legend
  app.legend = new Legend({

    map: app.mapWidget.map

  },"legend");

  app.legend.startup();


  // app topics
  topic.subscribe('settings/update', function(settings) {

    var remoteParameters = app._fixDateParameter(settings);

    app._loadRemoteData(remoteParameters).then(function(buildings){

      var data = [];

      // Aggregate the values depending on the sensor
      _.each(buildings, function(building) {

        var sensorSamplesSum = _.reduce(building.samples, function(memo, sample) { return memo + sample[settings.sensor];}, 0);
        var sensorSampleLength = _.size(building.samples);

        var sensorValue = sensorSamplesSum / sensorSampleLength;

        console.log(sensorValue);

        data.push({
          building: building.id,
          sensorValue: sensorValue
        });

      });

      var colorMap = RendererFactory.sensorColorMap[settings.sensor];

      // Create renderer
      var renderer = RendererFactory.createClassBreaksRenderer(data, colorMap);

      // Set the renderer
      app.mapWidget.setRenderer(renderer);

      app.legend.refresh();

    }, function(error) {

      console.error(error);

    });

  });

  return app;
});