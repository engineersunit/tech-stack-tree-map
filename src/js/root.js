/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/**
 * A top-level require call executed by the Application.
 * Build a Treemap using CSV data and Knockout bindings.
 */
require(
  [
    'ojs/ojbootstrap',
    'ojs/ojcontext',
    'knockout',
    'ojs/ojknockout', // registers KO binding provider
    'ojs/ojtreemap',  // registers oj-treemap custom element
    'ojs/ojarraytreedataprovider',
    'text!../data/tech_2025.csv' // load CSV text at build/serve time
  ],
  function (Bootstrap, Context, ko, ojknockout, ojtreemap, ArrayTreeDataProvider, csvText) {
    Bootstrap.whenDocumentReady().then(function () {
      function AppViewModel() {
        var self = this;
        // dataProvider is a plain property; KO bindings will read it via [[dataProvider]]
        self.dataProvider = null;

        function parseCsv(text) {
          var trimmed = (text || '').trim();
          if (!trimmed) return [];

          var lines = trimmed.split(/\r?\n/);
          var headerLine = lines.shift() || '';
          var headers = headerLine.split(',').map(function (h) { return h.trim(); });

          function idx(name) { return headers.indexOf(name); }
          var iTech  = idx('technology');
          var iImp   = idx('impact');

          var items = [];
          const palette20 = [
  "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD",
  "#8C564B", "#E377C2", "#7F7F7F", "#BCBD22", "#17BECF",
  "#393B79", "#637939", "#8C6D31", "#843C39", "#7B4173",
  "#5254A3", "#9C9EDE", "#D6616B", "#CE6DBD", "#E7BA52"
];
          color_num = 0;
          lines.forEach(function (line) {
            if (!line || !line.trim()) return;
            var cols = line.split(',');
            var label = (cols[iTech] || '').trim();
            if (!label) return;

            var rawVal = (cols[iImp] || '').trim();
            var value = parseFloat(rawVal);
            if (isNaN(value)) value = 0;
            
            items.push({
              id: label,
              label: label,
              value: value,
              shortDesc: label + ' - Impact: ' + value,
              color: palette20[color_num++]
            });
          });
          console.log(items);
          return items;
        }

        var nodes = parseCsv(csvText);
        // Handle both AMD namespace export and direct constructor export
        var DP =
          (ArrayTreeDataProvider && (ArrayTreeDataProvider.ArrayTreeDataProvider || ArrayTreeDataProvider)) ||
          (window.oj && window.oj.ArrayTreeDataProvider);
        if (DP) {
          self.dataProvider = new DP(nodes, { keyAttributes: 'technology' });
        } else {
          // Fallback: leave empty to avoid binding errors
          self.dataProvider = null;
        }
      }

      function init() {
        var vm = new AppViewModel();
        ko.applyBindings(vm, document.getElementById('app'));
      }

      // If running in a hybrid (e.g. Cordova) environment, wait for deviceready
      if (document.body.classList.contains('oj-hybrid')) {
        document.addEventListener('deviceready', init);
      } else {
        init();
      }
      // release the application bootstrap busy state
      Context.getPageContext().getBusyContext().applicationBootstrapComplete();
    });
  }
);
