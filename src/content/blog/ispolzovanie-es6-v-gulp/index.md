---
path: "/ispolzovanie-es6-v-gulp"
title: "Использование ES6 в Gulp"
date: "2016-04-30"
excerpt: ""
category: "front-end"
tags: ""
series: ""
---

Относительно недавно я начала использовать в своих проектах новый стандарт JavaScript, ES6. В этой записи я расскажу, как настроить Gulp, чтобы внутри gulpfile тоже можно было писать на ES6.

### Способ 1, с использованием Babel

Так как я занимаюсь в основном фронтендом, то для того, чтобы код, написанный на ES6, запускался в браузере, я использую [Babel](https://babeljs.io/). Сборку проекта я делаю при помощи [Gulp](http://gulpjs.com/). Поэтому, можно обработать gulpfile при помощи Babel.

Для нового проекта установка будет выглядеть так:

1. Инициализировать npm в папке проекта: `npm init`

3. Установить для проекта Gulp: `npm install --save-dev gulp` и Babel: `npm install --save-dev babel-core babel-preset-es2015`

5. В файле package.json (он появится после выполнения инициализации npm) добавить в раздел со скриптами команду для запуска Gulp:
    
    ```
    
    "scripts": {
      "gulp": "./node_modules/gulp/bin/gulp.js"
    }
    
    ```
    
    Благодаря этому, сборка запускается командой `npm run gulp`.
6. Теперь надо создать в папке проекта файл `.babelrc` со следующим содержимым:
    
    ```
    {
      "presets": ["es2015"]
    }
    ```
    

После этого можно создать gulpfile с названием `gulpfile.babel.js`, и написать в нем необходимые такси, например:

```
'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';

const dirs = {
  src: 'src',
  dest: 'build'
};

const sassPaths = {
  src: `${dirs.src}/app.scss`,
  dest: `${dirs.dest}/styles/`
};

gulp.task('styles', () => {
  return gulp.src(paths.src)
    .pipe(sass.sync().on('error', plugins.sass.logError))
    .pipe(gulp.dest(paths.dest));
});
```

Babel позволяет использовать внутри gulpfile все новинки, появившиеся в ES6, в том числе модули.

### Способ 2, с использованием новой версии Node.js

В Node.js версии 6, которая вышла всего несколько дней назад, 27 апреля, [реализовано 93% возможностей](https://kangax.github.io/compat-table/es6/) ES6, что больше, чем в Babel. Это позволяет использовать новые возможности языка внутри gulpfile без дополнительных инструментов, что, как мне кажется, должно работать быстрее.

К сожалению, использование новых версий возможно не всегда, так как могут возникать конфликты с уже используемыми в проекте пакетами. Например, node-sass, и соответственно gulp-sass, пока не работают на nodejs 6.
