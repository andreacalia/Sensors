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

  var _showSidebar = function() {

    domClass.toggle(window.document.body, 'sidebar-open');

  };

  var _loadRemoteData = function(isoDateFrom, isoDateTo) {

    return request.get('http://inti.init.uji.es:8080/Sensors/ws/?from='+isoDateFrom+'&to='+isoDateTo);

  };

  var _handleSettingsChanges = function(newSettings) {

    var sensor = newSettings.sensor;
    var year = newSettings.date.getYear();
    var month = newSettings.date.getMonth();
    var day = newSettings.date.getDate();

    var dateFrom = new Date(year, month, day, 0, 0, 0);
    var dateTo = new Date(year, month, day, 23, 59, 59);



  };

  // Sidebar button
  on(dom.byId('sidebar-toggle'), 'click', _showSidebar);


  app.mapWidget = new MapWidget({}, 'mapControls');
  app.settingsWidget = new SettingsWidget({}, 'sidebar');

  console.log(RendererFactory.createClassBreaksRenderer(_.range(1, 10)));

  // app topics
  topic.subscribe('settings/update', function(newSettings) {
    console.log(newSettings);
  });

  return app;
});