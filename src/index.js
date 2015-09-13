var through = require('through2')
var PluginError = require('gulp-util').PluginError
var File = require('vinyl')
var path = require('path')

const PLUGIN_NAME = 'gulp-lazy-i18n'

function translate(opts) {
  var self = this
  opts = opts || {}

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      self.emit('error', new PluginError(PLUGIN_NAME, "Streams aren't supported."))
      return cb()
    }

    if (file.isBuffer()) {
      if (Object.keys(opts.locales).length < 1) {
        self.emit('error', new PluginError(PLUGIN_NAME, 'Locales is not set.'))
        return cb()
      }

      if (typeof opts.translate !== 'function') {
        self.emit('error', new PluginError(PLUGIN_NAME, 'Translate is not set.'))
        return cb()
      }

      var contents = file.contents.toString(enc)
      var translate = opts.translate

      var _this = this
      opts.locales.forEach(function (lang) {
        var extname = path.extname(file.path)
        var output = translate.call(file, contents, lang)
        if (output) {
          _this.push(new File({
            cwd: file.cwd,
            base: file.base,
            path: path.dirname(file.path) + '/' + path.basename(file.path, extname) +
              '-' + lang + extname,
            contents: new Buffer(output)
          }))
        }
      })

      return cb()
    }

    cb(null, file)
  })
}

module.exports = translate
