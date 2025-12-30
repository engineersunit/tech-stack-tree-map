/**
 * @license
 * Copyright (c) 2014, 2025, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */


(function () {
    // The "oj_whenReady" global variable enables a strategy that the busy context whenReady,
    // will implicitly add a busy state, until the application calls applicationBootstrapComplete
    // on the busy state context.
    window["oj_whenReady"] = true;

    // Debugging utility: global window.debug with flag control via ?debug=1 or localStorage 'debug'
    (function initDebug() {
      try {
        var params = new URLSearchParams(location.search);
        var q = params.get('debug');
        var ls = localStorage.getItem('debug');
        var enabled = (q != null ? (q === '1' || q === 'true') : (ls === '1' || ls === 'true'));
        var api = {
          enabled: !!enabled,
          set: function (on) {
            this.enabled = !!on;
            try { localStorage.setItem('debug', this.enabled ? '1' : '0'); } catch (e) {}
            return this.enabled;
          },
          enable: function () { return this.set(true); },
          disable: function () { return this.set(false); },
          log: function () { if (this.enabled && console && console.log) console.log.apply(console, arguments); },
          warn: function () { if (this.enabled && console && console.warn) console.warn.apply(console, arguments); },
          group: function () { if (this.enabled && console && console.group) console.group.apply(console, arguments); },
          groupEnd: function () { if (this.enabled && console && console.groupEnd) console.groupEnd.apply(console, arguments); },
          time: function (label) { if (this.enabled && console && console.time) console.time(label); },
          timeEnd: function (label) { if (this.enabled && console && console.timeEnd) console.timeEnd(label); }
        };
        window.debug = window.debug || api;
        // Initialize with computed enabled state
        window.debug.set(api.enabled);
      } catch (e) {
        // Fallback: define a no-op debug object
        window.debug = window.debug || { enabled: false, log: function(){}, warn: function(){}, group: function(){}, groupEnd: function(){}, time: function(){}, timeEnd: function(){}, enable: function(){}, disable: function(){}, set: function(){} };
      }
    }());
    if (window.debug && window.debug.enabled) { window.debug.log('[main] Bootstrapping RequireJS & JET...'); }

    requirejs.config(
    {
      baseUrl: 'js',

      paths:
      /* DO NOT MODIFY
      ** All paths are dynamicaly generated from the path_mappings.json file.
      ** Add any new library dependencies in path_mappings json file
      */
      // injector:mainReleasePaths
      {
        'ojs': 'libs/oj/19.0.0/debug',
        'ojL10n': 'libs/oj/19.0.0/ojL10n',
        'ojtranslations': 'libs/oj/19.0.0/resources',
          'knockout': 'libs/knockout/knockout-3.5.1.debug',
  'jquery': 'libs/jquery/jquery-3.7.1',
  'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.14.1',
  'text': 'libs/require/text',
  'hammerjs': 'libs/hammer/hammer-2.0.8',
  'signals': 'libs/js-signals/signals',
  'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.2',
  'css': 'libs/require-css/css.min',
  'css-builder': 'libs/require-css/css-builder',
  'normalize': 'libs/require-css/normalize',
  '@oracle/oraclejet-preact': 'libs/oraclejet-preact/amd',
  'preact': 'libs/preact/dist/preact.umd',
  'preact/hooks': 'libs/preact/hooks/dist/hooks.umd',
  'preact/compat': 'libs/preact/compat/dist/compat.umd',
  'preact/jsx-runtime': 'libs/preact/jsx-runtime/dist/jsxRuntime.umd',
  'proj4': 'libs/proj4js/dist/proj4-src',
  'touchr': 'libs/touchr/touchr'
  ,
        'persist': 'libs/persist/debug',
        'chai': 'libs/chai/chai-4.5.0'
      }
      // endinjector
    }
  );
}());

/**
 * Load the application's entry point file
 */
if (window.debug && window.debug.enabled) { window.debug.log('[main] Loading entry module: ./root'); }
require(['./root'], function () {
  if (window.debug && window.debug.enabled) { window.debug.log('[main] Entry module loaded'); }
});
