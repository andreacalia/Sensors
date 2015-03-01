define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/_base/lang',
  'dojo/dom-class',
  'dojo/topic',
  'dojo/query',
  'dojo/dom-attr',
  'dojo/on',
  'dojo/dom',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',

  'dojo/text!./tpl/settings-widget.html'
], function(
  declare, array, lang, domClass, topic, query, domAttr, on, dom,
  _WidgetBase, _TemplatedMixin,
  template) {

  return declare([_WidgetBase, _TemplatedMixin], {

    templateString: template,

    constructor: function() {

      this.settings = {
        sensor: null,
        date: null
      };

    },

    postCreate: function() {

      this.inherited(arguments);

      this._initComponents();
      this._setHandlers();

    },

    _initComponents: function() {

      var todayText = new Date().toISOString().substr(0, 10);

      $('#date-selector').daterangepicker({ 
        format: 'YYYY-MM-DD',
        maxDate: todayText,
        singleDatePicker: true
      });

    },

    _setHandlers: function() {
      
      // Radios
      this.own(query('input[name="sensor-type"]', this.sensorTypeContainer).on('change', lang.hitch(this, '_sensorTypeHandler')));

      // Button
      this.own(on(this.submitButton, 'click', lang.hitch(this, '_submitHandler')));

      // Calendar
      $('#date-selector').on('apply.daterangepicker', lang.hitch(this, '_datePickerHandler'));

    },

    _sensorTypeHandler: function(evt) {

      this.settings.sensor = evt.target.value;

    },

    _datePickerHandler: function(ev, picker) {

      this.settings.date = Date.parse(picker.startDate.format('YYYY-MM-DD'));

    },

    _submitHandler: function() {

      if(!this.settings.sensor || !this.settings.date)
        return;

      topic.publish('settings/update', this.settings);

    }

  });
});