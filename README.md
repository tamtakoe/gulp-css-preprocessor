# gulp-css-preprocessor [![NPM version](https://badge.fury.io/js/gulp-css-preprocessor.svg)](http://badge.fury.io/js/gulp-css-preprocessor)

> Less/Scss/Sass/Stylus plugin for gulp. It uses a suitable preprocessor for files based on their extensions

## Install with [npm](npmjs.org)

```sh
npm install gulp-css-preprocessor
```

## Usage

```js
gulp.src('styles/**/*')
    .pipe(gulpCssPreprocessor())
    .pipe(gulpConcatCss('style.css'))
    .pipe(gulp.dest('compiled/styles'));
```


## API
### gulpCssPreprocessor(params)

#### params
Object with the following parameters

##### less
Type: `Object`

Params for process `.less` files by [less-preprocessor](http://lesscss.org/#using-less-configuration)

##### scss
Type: `Object`

Params for process `.scss` files by [scss-preprocessor](https://github.com/sass/node-sass#options)


##### sass
Type: `Object`

Params for process `.sass` files by [scss-preprocessor](https://github.com/sass/node-sass#options)

Note: `.sass` process by `scss-preprocessor` with option `indentedSyntax: true`

##### stylus
Type: `Object`

Params for process `.styl` files by [stylus-preprocessor](https://github.com/jenius/accord/blob/master/docs/stylus.md)


## License

© Oleg Istomin 2015. Released under the MIT license

***