import { createFilter } from 'rollup-pluginutils';
import jsesc from 'jsesc';
import { minify } from 'html-minifier';

function htmlPlugin(options) {
  if ( options === void 0 ) options = {};

  var filter = createFilter(options.include || ['**/*.html', '**/*.htm'], options.exclude);
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
      var html = JSON.stringify(minify(code, options.htmlMinifierOptions || htmlMinifierOptions ));
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

export default htmlPlugin;
