# gulp-lazy-i18n

懒人专用的国际化方案，适合中文项目后期快速国际化。

模板和JS里面直接使用中文，后期国际化再根据资源文件替换生成不同的语言文件

## sample code

```js
var properties = require ("properties")

gulp.task('i18n', function() {
  var dict = {
    cn: _.invert(properties.parse(fs.readFileSync('src/resource/cn.properties', 'utf8'))),
    en: properties.parse(fs.readFileSync('src/resource/en.properties', 'utf8')),
    tw: properties.parse(fs.readFileSync('src/resource/tw.properties', 'utf8'))
  }

  var i18nConfig = {
    locales: ['en', 'tw'],
    translate: function(content, lang) {
      return content.replace(/([\u3400-\u9FBF]+)/g, function(str, match) {
        return dict[lang][dict.cn[match]] || match
      })
    }
  }

  return gulp.src('assets-build/js/app*.js')
    .pipe(i18n(i18nConfig))
    .pipe(gulp.dest('assets-build/js/'))
})

```

## License

The MIT License (MIT)

Copyright (c) simon <simon@dataeye.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
