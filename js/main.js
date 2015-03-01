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

  'dojo/domReady!'],
function(
  query, dom, domClass, domStyle, topic, on, Deferred, request,
  MapWidget, SettingsWidget, RendererFactory
) {
  'use strict';

  var app = {};

  app._showSidebar = function() {

    domClass.toggle(window.document.body, 'sidebar-open');

  };

  app._loadRemoteData = function(opt) {

    return request.get('http://inti.init.uji.es:8080/Sensors/ws/?from='+opt.isoDateFrom+'&to='+opt.isoDateTo, {
      handleAs: 'json'
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
  app.settingsWidget = new SettingsWidget({}, 'sidebar');



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

      // Create renderer
      var renderer = RendererFactory.createClassBreaksRenderer(data);

      // Set the renderer
      app.mapWidget.setRenderer(renderer);

    }, function(error) {

      console.error(error);

    });

  });

  return app;
});