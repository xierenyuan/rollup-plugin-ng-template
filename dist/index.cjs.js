'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rollupPluginutils = require('rollup-pluginutils');
var jsesc = _interopDefault(require('jsesc'));
var htmlMinifier = require('html-minifier');

function htmlPlugin(options) {
  if ( options === void 0 ) options = {};

  var filter = rollupPluginutils.createFilter(options.include || ['**/*.html', '**/*.htm'], options.exclude);
  var htmlMinifierOptions = {
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    conservativeCollapse: true,
    minifyJS: true
  };
  return {
    name: 'bqHtml',
    transform: function transform(code, id) {
      if (!filter(id)) {
        return null
      }
      var ngModule = options.module || 'ng';
      var html = JSON.stringify(htmlMinifier.minify(code, options.htmlMinifierOptions || htmlMinifierOptions ));
      var result = "let path = '" + (jsesc(id)) + "'; angular.module('" + ngModule + "').run(['$templateCache', c => { c.put(path, " + html + ") }]); export default path;";
      return {
        code: result,
        map: {
          mappings: ''
        }
      }
    }
  }
}

module.exports = htmlPlugin;
