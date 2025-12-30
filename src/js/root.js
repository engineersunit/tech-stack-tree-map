/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/**
 * Application entry module (AMD/RequireJS).
 * Builds an oj-treemap from CSV data using Knockout bindings.
 *
 * Notes:
 * - This file intentionally contains verbose comments and debug statements
 *   to aid future maintenance and troubleshooting.
 * - Debug prints are controlled by window.debug (see src/js/main.js):
 *     - Enable via URL: ?debug=1 (or ?debug=true)
 *     - Or via localStorage: localStorage.setItem('debug','1')
 *   When disabled, all debug.* calls are effectively no-ops.
 */
require(
  [
    // Bootstrap & context for signaling application readiness
    'ojs/ojbootstrap',
    'ojs/ojcontext',

    // Knockout (binding provider registered by ojs/ojknockout)
    'knockout',
    'ojs/ojknockout', // registers KO binding provider

    // JET component(s) used by this app
    'ojs/ojtreemap',  // registers oj-treemap custom element

    // DataProvider utility
    'ojs/ojarraytreedataprovider',

    // CSV text (loaded by the require text! plugin at serve/build time)
    'text!../data/tech_2025.csv'
  ],
  function (Bootstrap, Context, ko, ojknockout, ojtreemap, ArrayTreeDataProvider, csvText) {
    Bootstrap.whenDocumentReady().then(function () {
      // At this point the DOM is parsed. We prepare our ViewModel and bindings.
      if (window.debug && window.debug.enabled) {
        window.debug.group('[root] Bootstrap.whenDocumentReady');
        window.debug.log('[root] Document ready; initializing ViewModel/bindings');
      }

      /**
       * Top-level application ViewModel.
       * Responsibilities:
       * 1) Parse CSV text into a two-level hierarchical structure grouped by "Area"
       * 2) Produce a TreeDataProvider with keyAttributes "id" and childrenAttribute "nodes"
       * 3) Expose it via a plain property "dataProvider" for KO bindings
       */
      function AppViewModel() {
        if (window.debug && window.debug.enabled) {
          window.debug.log('[root] AppViewModel: constructing');
        }

        var self = this;

        // dataProvider is a plain property; KO bindings will read it via [[dataProvider]]
        self.dataProvider = null;

        /**
         * parseCsv
         * Converts a CSV string into a hierarchical structure suitable for oj-treemap:
         *
         * Output shape:
         * [
         *   {
         *     id: 'area:<Area>',
         *     label: <Area>,
        *      color: <stable color per Area>,
         *     shortDesc: 'Area: <Area>',
         *     nodes: [
         *       {
         *         id: 'tech:<technology>',
         *         label: <technology>,
         *         value: <impact>,
         *         area: <Area>,
         *         icon: <icon filename>,
         *         color: <Area color>,
         *         shortDesc: '<technology> (<Area>) - Impact: <impact>'
         *       }, ...
         *     ]
         *   }, ...
         * ]
         *
         * Parsing approach (simple and robust for well-formed CSV):
         * - splits on newlines,
         * - infers column indices from header row (Area, technology, impact, id),
         * - groups rows by Area,
         * - assigns a stable color per Area,
         * - attaches icon filename from a map (default fallback).
         */
        function parseCsv(text) {
          if (window.debug && window.debug.enabled) {
            window.debug.time('[root] parseCsv');
            window.debug.log('[root] parseCsv: input length = ' + (text ? text.length : 0));
          }

          var trimmed = (text || '').trim();
          if (!trimmed) return [];

          var lines = trimmed.split(/\r?\n/);

          // Header row provides column names and order
          var headerLine = lines.shift() || '';
          var headers = headerLine.split(',').map(function (h) { return h.trim(); });

          function idx(name) { return headers.indexOf(name); }
          var iArea = idx('Area');
          var iTech = idx('technology');
          var iImp  = idx('impact');
          // var iId   = idx('id'); // optional; not required for keys

          // Fixed color palette; we cycle through this per Area and keep stable mappings
          var palette20 = [
            "#1F77B4", "#FF7F0E", "#2CA02C", "#D62728", "#9467BD",
            "#8C564B", "#E377C2", "#7F7F7F", "#BCBD22", "#17BECF",
            "#393B79", "#637939", "#8C6D31", "#843C39", "#7B4173",
            "#5254A3", "#9C9EDE", "#D6616B", "#CE6DBD", "#E7BA52"
          ];

          // Technology → icon filename map.
          // Icons are open-source SVGs placed under src/css/images/tech/ (see README).
          var iconMap = {
            "APEX": "oracle.svg",
            "Visual Builder": "oracle.svg",
            "Helidon Microservices": "helidon.svg",
            "Oracle Cloud Infra": "oracle.svg",
            "Java": "openjdk.svg",
            "JavaScript": "javascript.svg",
            "HTML": "html5.svg",
            "Oracle ADB": "oracle.svg",
            "Oracle JET": "ojet.png",
            "Figma": "figma.svg",
            "MCP": "openai.svg",
            "Oracle AI Agent Studio": "oracle.svg",
            "Terraform": "terraform.svg",
            "Oracle Linux": "linux.svg"
          };
          var defaultIcon = "oracle.svg";

          // Group accumulator structures
          var groups = [];
          var areaGroupMap = Object.create(null); // Area → group object
          var areaColorMap = Object.create(null); // Area → color
          var nextColorIdx = 0;

          // Walk each CSV row and populate groups/leaves
          lines.forEach(function (line) {
            if (!line || !line.trim()) return;

            // Simple CSV split (assumes no commas inside fields)
            var cols = line.split(',');

            var area = (cols[iArea] || '').trim();
            var tech = (cols[iTech] || '').trim();
            if (!tech) return; // skip rows without a technology name

            // Size value for leaf node
            var rawVal = (cols[iImp] || '').trim();
            var value = parseFloat(rawVal);
            if (isNaN(value)) value = 0;

            // Assign a stable color per Area (first occurrence wins)
            if (area && areaColorMap[area] == null) {
              areaColorMap[area] = palette20[nextColorIdx % palette20.length];
              nextColorIdx++;
            }
            var areaColor = area ? areaColorMap[area] : palette20[0];

            // Ensure the Area group exists
            var group = areaGroupMap[area];
            if (!group) {
              group = {
                id: 'area:' + area,
                label: area || 'Uncategorized',
                color: areaColor,
                value: 0,
                shortDesc: 'Area: ' + (area || 'Uncategorized'),
                nodes: []
              };
              areaGroupMap[area] = group;
              groups.push(group);
            }

            // Create leaf node for this technology
            var iconFile = iconMap[tech] || defaultIcon;
            group.nodes.push({
              id: 'tech:' + tech,
              label: tech,
              value: value,
              area: area,
              icon: iconFile,
              color: areaColor,
              shortDesc: tech + ' (' + (area || 'Uncategorized') + ') - Impact: ' + value
            });
            group.value = group.value + value;
          });

          // Debug summary statistics
          if (window.debug && window.debug.enabled) {
            var areaCount = groups.length;
            var leafCount = groups.reduce(function (acc, g) { return acc + (g.nodes ? g.nodes.length : 0); }, 0);
            window.debug.log('[root] parseCsv: groups=' + areaCount + ', leaves=' + leafCount);
            window.debug.timeEnd('[root] parseCsv');
          }

          return groups;
        }

        // Parse the CSV into hierarchical nodes
        var nodes = parseCsv(csvText);
        if (window.debug && window.debug.enabled) {
          window.debug.log('[root] Parsed root groups (areas): ' + (nodes ? nodes.length : 0));
        }

        // DataProvider constructor: handle both AMD export shapes
        var DP =
          (ArrayTreeDataProvider && (ArrayTreeDataProvider.ArrayTreeDataProvider || ArrayTreeDataProvider)) ||
          (window.oj && window.oj.ArrayTreeDataProvider);

        if (window.debug && window.debug.enabled) {
          window.debug.log('[root] DataProvider available:', !!DP);
        }

        if (DP) {
          self.dataProvider = new DP(nodes, { keyAttributes: 'id', childrenAttribute: 'nodes' });
          if (window.debug && window.debug.enabled) {
            window.debug.log('[root] DataProvider constructed with', nodes.length, 'root group(s)');
            window.debug.log('Data Provider constructed: ', self.dataProvider, 'from node: ', nodes);
          }
        } else {
          // Fallback: leave empty to avoid binding errors
          self.dataProvider = null;
          if (window.debug && window.debug.enabled) {
            window.debug.warn('[root] DataProvider ctor not found – dataProvider left as null');
          }
        }
      }

      /**
       * init
       * Entry point: constructs the AppViewModel and applies KO bindings to #app.
       */
      function init() {
        if (window.debug && window.debug.enabled) {
          window.debug.group('[root] init');
          window.debug.log('[root] init: creating ViewModel instance');
        }

        var vm = new AppViewModel();

        // Apply bindings to the root application node
        ko.applyBindings(vm, document.getElementById('app'));

        if (window.debug && window.debug.enabled) {
          window.debug.log('[root] init: KO bindings applied');
          window.debug.groupEnd();
        }
      }

      // If running in a hybrid (e.g. Cordova) environment, wait for deviceready.
      // Otherwise initialize immediately in web contexts.
      if (document.body.classList.contains('oj-hybrid')) {
        if (window.debug && window.debug.enabled) {
          window.debug.log('[root] Hybrid environment detected; waiting for deviceready');
        }
        document.addEventListener('deviceready', function () {
          if (window.debug && window.debug.enabled) {
            window.debug.log('[root] deviceready fired; proceeding with init');
          }
          init();
        });
      } else {
        if (window.debug && window.debug.enabled) {
          window.debug.log('[root] Web environment detected; initializing immediately');
        }
        init();
      }

      // Release the application bootstrap busy state – signals to JET that startup is complete.
      if (window.debug && window.debug.enabled) {
        window.debug.log('[root] Signaling applicationBootstrapComplete');
      }
      Context.getPageContext().getBusyContext().applicationBootstrapComplete();

      if (window.debug && window.debug.enabled) {
        window.debug.groupEnd && window.debug.groupEnd();
      }
    });
  }
);
