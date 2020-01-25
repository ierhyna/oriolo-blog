---
path: "/perehod-s-scss-na-postcss-moj-opyt"
title: "Переход с SCSS на PostCSS: мой опыт"
date: "2016-05-01"
excerpt: ""
category: "front-end"
tags: ""
series: ""
---

Прямо сейчас я начинаю верстать новый проект. Я решила, что это хороший повод познакомиться с новой для себя технологией, поэтому выбрала в качестве препроцессора [PostCSS](http://postcss.org). Меня привлекает в нем скорость работы и модульность, однако до сих пор не было случая попробовать его на реальном проекте. Сейчас в основном я использую Sass, и невозможность (хоть и временная) использовать node-sass с шестой версией Node.js, и то, как из-за этого у меня поломались стили в проекте, тоже послужило причиной поиска альтернатив.

Для начала расскажу, как сейчас у меня выглядит работа со стилями.

### Как я сейчас работаю со стилями

Есть основной файл, main.scss, в который подключаются все остальные файлы стилей, разделенные по папкам. Я использую систему папок, похожую на [модель 7-1](http://sass-guidelin.es/#the-7-1-pattern), с некоторыми отличиями: у меня почти никогда нет папки `vendors/` (вместо нее я подключаю сторонние библиотеки через npm), а также папки `themes/` (даже в больших проектах у меня не было необходимости выделять отдельные темы). В папке `components/` я создаю отдельный файл для каждого нового класса компонентов.

Сборку делаю через Gulp. Для импорта стилей использую [gulp-sass-glob](https://www.npmjs.com/package/gulp-sass-glob), чтобы можно было импортировать папки со стилями целиком, например: `@import "../components/**/*.scss";`.

В больших проектах использую миксины [Bourbon](http://bourbon.io). К собранным стилям применяю [автопрефиксер](https://github.com/postcss/autoprefixer).

Единообразие написания стилей и отсутствие в них ошибок проверяется при помощи [Stylelint](http://stylelint.io) или [SCSS-lint](https://github.com/brigade/scss-lint) в виде [плагина](https://atom.io/packages/linter-scss-lint) для редактора Atom (вот мой [конфиг .scss-lint.yml](https://gist.github.com/ierhyna/5f20a8265dac281ab1113d43b159d398), основанный на Sass Guidelines). При помощи [CSSComb](http://csscomb.com/) (и [этого плагина](https://atom.io/packages/atom-css-comb) для редактора) я автоматически сортирую CSS свойства ([конфиг](https://gist.github.com/ierhyna/5fc7ccd4331acf1c4845352707a8d228) настроен в соответствии с линтером).

Готовый файл минифицируется через [CSS Nano](http://cssnano.co/) в виде [плагина для Gulp](https://www.npmjs.com/package/gulp-cssnano).

В идеале, мне бы хотелось получить такую конфигурацию, которая будет работать с уже написанными стилями с SCSS-синтаксисом, и чтобы не не нужно было менять привычки написания стилей. Потом, возможно, я подумаю над другими вариантами, но моя задача сейчас - сделать подобие SCSS, но через PostCSS. То есть, мне нужно:

- объявление переменных как `$`,
- вложенность стилей, возможность использовать конструкции вида `&__elem`,
- миксины, желательно с синтаксисом как в SCSS (`@include mixin-name`),
- импорт папок целиком, а не по отдельным файлам
- не критично, но было бы приятно, найти аналоги того, что я делаю через Bourbon; но в крайнем случае можно написать функции самостоятельно

И еще, чтобы был линтер, и все это собиралось бы через Gulp, и быстрее, чем SCSS. В будущем я рассматриваю возможность перехода на NPM-скрипты.

### Переход к PostCSS

Как выяснилось, я уже использую два, а в некоторых случаях три инструмента из экосистемы PostCSS: это **Автопрефиксер**, **CSS Nano**, и иногда **Stylelint**. Отлично. Осталось найти что-то, что позволит заменить SCSS.

Как я уже писала, одно из преимуществ PostCSS это модульность, то есть для решения каждой отдельной проблемы существует свой плагин, а если не существует, то его можно написать самостоятельно. Большое количество плагинов размещено [здесь](http://postcss.parts/).

#### Синтаксис

Среди плагинов я нашла Precss, который позволяет использовать синтаксис из Scss. Однако его возможности мне показались избыточными, из Scss мне нужны только импорт, переменные, вложенность и миксины. Поэтому я решила взять по отдельности плагины **postcss-partial-import**, **postcss-simple-vars**, **postcss-nested**, **postcss-mixins**.

К сожалению, мне пока не удалось найти плагин, который бы мог импортировать содержимое директории целиком.

Приятно порадовал плагин stylefmt, который является заменой для CSS Comb и может форматировать стили в соответствии с конфигом от Stylelint. Кроме того, он есть в виде плагина для Атома.

#### Установка

Вроде бы все нашлось. Теперь можно установить плагины и настроить таск для сборщика Gulp. Я начну с установки плагинов, которые позволят использовать привычный синтаксис, а потом добавлю остальное.

```sh
npm i -D gulp gulp-postcss gulp-sourcemaps autoprefixer postcss-partial-import postcss-simple-vars postcss-nested postcss-mixins
```

Потестировала, все работает. Значит, можно добавить CSSNano для минификации.

```sh
npm i -D gulp-cssnano
```

В итоге, таск у меня получился такой:

```php
'use strict';
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
gulp.task('css', function () {
  const postcss = require('gulp-postcss');
  const nano = require('gulp-cssnano');
  return gulp.src('src/css/*.css')
    .pipe( sourcemaps.init() )
    .pipe( postcss([
      require('autoprefixer'),
      require('postcss-partial-import'),
      require('postcss-simple-vars'),
      require('postcss-nested'),
      require('postcss-mixins')
    ]) )
    .pipe(nano())
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('build/') );
});
```

Теперь надо добавить линтер и инструмент для форматирования кода. Я хочу, чтобы ошибки в стилях выводились в консоли и в редакторе, поэтому надо установить [плагин Stylelint для Атома](https://atom.io/packages/linter-stylelint), настроить таск для Gulp, и создать файл конфига .stylelintrc. Устанавливается все просто.

```sh
npm i -D gulp-stylelint && apm install linter-stylelint
```

А вот с конфигом придется помучиться. Все возможные правила перечислены [тут](http://stylelint.io/user-guide/rules/), но создавать их придется вручную. Я для начала установила [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard), `npm install -D stylelint-config-standard` и прописала в файле .stylelintrc его использование:

```php
{
  "extends": "/absolute/path/to/stylelint-config-standard"
}
```

Когда будет время, проверю его соответсвтие со своим конфигом для SCSS-lint.

Таск для линтера стилей получился такой:

```php
gulp.task('lint-css', function () {
  const stylelint = require('gulp-stylelint');
  return gulp.src('src/**/*.css')
    .pipe(stylelint({
      failAfterError: false, // disable fail after error
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }));
});
```

Добавим инструмент для форматирования кода. Тут, на самом деле, я не до конца разобралась, может ли плагин для Атома работать без установленного npm-пакета.

```sh
npm install -D stylefmt && apm install stylefmt
```

Вроде бы, все работает. Для удобства, вот в виде отдельной команды все пакеты, которые я поставила:

```sh
npm i -D gulp gulp-postcss gulp-sourcemaps autoprefixer postcss-partial-import postcss-simple-vars postcss-nested postcss-mixins gulp-cssnano gulp-stylelint stylefmt
```

И плагины для Атома:

```sh
apm install linter-stylelint stylefmt
```

Все это позволило мне начать проект с привычным мне подходом, но используя PostCSS вместо SCSS. Пока что тестирую, и присматриваюсь. Не исключаю, что во всех новых проектах буду использовать эти инструменты.
