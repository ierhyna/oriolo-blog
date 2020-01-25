---
path: "/create-theme-from-html-1"
title: "Как создать тему для WordPress. Часть 1: файлы темы WordPress"
date: "2014-02-27"
excerpt: ""
category: "wordpress"
tags: ""
series: "create-wp-theme-from-html"
---

Добрый день! Это первый пост из серии о том, **как создать собственную тему для WordPress** из сверстанного шаблона. В этой части вы узнаете, из чего состоит тема, создадите основные файлы темы WordPress, и узнаете основные функции, используемые при создании тем.

Запись обновлена 3 сентября 2015 года.

Нам понадобится:

1. **HTML шаблон**, из которого мы будем делать тему.
2. **Текстовый редактор**, например, Sublime Text 2, Notepad++ или любой другой по вашему желанию (только не стандартный блокнот windows!)
3. браузер
4. сайт для тестирования темы
5. немного знаний **HTML, CSS, PHP**
6. терпение :D

В качестве примера для этого урока, я сделала небольшой шаблон на бутстрапе готовый HTML-шаблон **Striped от HTML5Up** ([демо](http://html5up.net/striped)).

Обновление от 3.09.2015. По итогам обсуждения этой серии уроков в комментариях, я пришла к выводу, что лучше не брать готовый шаблон, а сделать собственный с самой базовой разметкой, чтобы сосредоточиться на вордпрессе и не отвлекаться на оформление, скрипты и стили. Поэтому сейчас я переделываю эту серию уроков с использованием более простого шаблона, который я сделала специально для этих уроков, и который вы можете [скачать здесь](https://github.com/ierhyna/wp-theme-howto/archive/Step_0.zip).

Конечно, вы можете взять его же, или скачать любой другой [CSS шаблон для сайта](http://oriolo.ru/vyorstka/gde-skachat-gotovyie-css-shablonyi/ "Где скачать готовые CSS-шаблоны?").

## Шаг 1. Структура темы для WordPress

Если вы когда-либо редактировали файлы темы для вордпресс, то, наверное, заметили, что в разных темах есть похожие файлы. В любой теме обязательно должны быть два файла, которые лежат в корне папки с темой:

- index.php -  основной шаблон страницы;
- style.css - файл стилей.

Это необходимый минимум для того, чтобы ваша тема работала. Но конечно же, кроме этих двух файлов, обычно есть и другие, такие как:

- header.php, для вывода шапки всех страниц;
- sidebar.php, для вывода боковой колонки;
- footer.php, который выводит подвал сайта;
- page.php, шаблон для статических страниц
- single.php, шаблон для страниц записей;
- archive.php, шаблон архивов и рубрик;
- comments.php, шаблон комментариев;
- functions.php, функции темы;
- и другие...

Наша основная задача при создании темы для вордпресс состоит в том, чтобы добавить необходимые функции, и содержимое одного HTML-файла разместить в нескольких PHP-файлах.

## Шаг 2. Структура страницы WordPress темы

Давайте посмотрим, из чего состоит папка с HTML-шаблоном, которую мы скачали. Там есть:

- файл index.html, это главный файл верстки, если вы откроете его в браузере, то увидите, как будет выглядеть наша тема;
- папка css, там лежат файлы стилей;
- также могут быть папка images, с картинками;
- и папка js, в которой содержатся скрипты.

Сейчас откройте index.html. Если удалить оттуда все "лишнее", для простоты понимания, структуры, то получится примерно следующее:

```php
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <header>
            <h1 class="site-title">Site Title</h1>
            <nav class="navbar-collapse">
            </nav>
        </header>
        <main>
            <article class="post">
            </article>
        </main>
        <aside class="sidebar">
            <div class="widget">
            </div>
            <div class="widget">
            </div>
            <div class="widget">
            </div>
        </aside>
        <footer>
        </footer>
    </body>
</html>
```

Примерно такая же структура будет у любой темы, с некоторыми отличиями. Как вы наверное заметили, особенность нашей темы в том, что у нее не будет футера, как такового.

## Шаг 3. Создаем файлы темы

Настало время создать файлы для темы. Создадим новую папку, и следующие пустые файлы в ней:

- style.css
- index.php
- header.php
- sidebar.php
- footer.php

В style.css добавим строки, которые помогут системе узнать, что это за тема:

```php
/*
Theme Name: My Studing Theme
Theme URI: http://oriolo.ru
Author: Irina Sokolovskaja
Author URI: http://oriolo.ru
Description: Описание вашей темы
Version: 1.0
License: CCA 3.0 license
License URI: http://creativecommons.org/licenses/by/3.0/
Tags: white, blue, left-sidebar, right-sidebar
*/ 
```

Вместо Author и Author URI можете написать свое имя и сайт, а вместо Theme Name - название темы.

Обратите внимание, в нашем примере в файле style.css будет содержаться только базовая информация о теме, а сами стили будут находится в папке css и тех файлах стилей, которые есть в этой папке.

После этого нужно разнести содержимое index.html по разным файлам.

Вставьте все до тега <main class="col-md-9"> не включительно в header.php. Это та часть, которая будет повторяться на каждой странице вверху, до записи или страницы:

```php
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">

    <title>Simple Blog Home</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- <link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css'> -->
    <link rel='stylesheet' href='css/bootstrap.min.css'>
    <link rel='stylesheet' href='css/main.css'>
  
  </head>

  <body>

  <div class="container">
  <header class="row">
    <div class="col-md-12 clearfix">
      <img class="alignleft logo img-circle" src="http://placehold.it/80x80">
      <h1 class="site-title">Site Title</h1>
    </div>
    <nav class="navbar-collapse">
      <ul class="nav navbar-nav">
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
        <li><a href="#">Link 4</a></li>
        <li><a href="#">Link 5</a></li>
      </ul>
    </nav>
  </header>
  <div class="row">
```

Затем основное содержимое вставим в файл index.php:

```php
 <!-- main and sidebar -->
    <main class="col-md-9">
      <article class="post">
        <header>
          <h2>Heading</h2>
          <span>Posted on <time datetime="2015-06-17 10:25">June 14, 2015 at 10.25</time> by Irina</span>
        </header>
        <figure>
          <img class="thumbnail" src="http://placehold.it/650x250">
        </figure>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error nesciunt eos odit nostrum nemo eveniet, qui perspiciatis, temporibus esse soluta perferendis consectetur ipsum. Maxime rem officiis, velit doloremque perferendis voluptates. Commodi
          eos esse similique veniam quasi, distinctio doloremque reprehenderit in quas culpa. Facilis blanditiis tempore veritatis hic ex ratione, repellendus voluptatum obcaecati?</p>
        <span class="morelink"><a href="single.html">More...</a></span>
      </article>
      <article class="post">
        <header>
          <h2>Heading</h2>
          <span>Posted on <time datetime="2015-06-17 11:25">June 14, 2015 at 11.25</time> by Irina</span>
        </header>
        <figure>
          <img class="thumbnail" src="http://placehold.it/650x250">
        </figure>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error nesciunt eos odit nostrum nemo eveniet, qui perspiciatis, temporibus esse soluta perferendis consectetur ipsum. Maxime rem officiis, velit doloremque perferendis voluptates. Commodi
          eos esse similique veniam quasi, distinctio doloremque reprehenderit in quas culpa. Facilis blanditiis tempore veritatis hic ex ratione, repellendus voluptatum obcaecati?</p>
        <span class="morelink"><a href="single.html">More...</a></span>
      </article>
      <nav>
        <ul class="pagination">
          <li>
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">5</a></li>
          <li>
            <a href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </main> 
```

Далее сделаем сайдбар sidebar.php:

```php
 <aside class="sidebar col-md-3">
      <div class="widget">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search for...">
          <span class="input-group-btn">
          <button class="btn btn-default" type="button">Go!</button>
        </span>
        </div>
        <!-- /input-group -->
      </div>
      <div class="widget">
        <h3>Widget</h3>
        <ul>
          <li><a href="#">Category 1</a></li>
          <li><a href="#">Category 2</a></li>
          <li><a href="#">Category 3</a></li>
        </ul>
      </div>
      <div class="widget widget_calendar">
        <h3>Calendar Widget</h3>

        <div id="calendar_wrap">
          <!-- calendar widget -->
          <table id="wp-calendar">
            <caption>June 2015</caption>
            <thead>
              <tr>
                <th scope="col" title="Monday">Mon</th>
                <th scope="col" title="Tuesday">Tue</th>
                <th scope="col" title="Wensday">Wen</th>
                <th scope="col" title="Thursday">Thu</th>
                <th scope="col" title="Friday">Fri</th>
                <th scope="col" title="Saturday">Sat</th>
                <th scope="col" title="Sunday">Sun</th>
              </tr>
            </thead>

            <tfoot>
              <tr>
                <td colspan="3" id="prev"><a href="#">&laquo; May</a></td>
                <td class="pad">&nbsp;</td>
                <td colspan="3" id="next" class="pad">&nbsp;</td>
              </tr>
            </tfoot>

            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
              </tr>
              <tr>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
              </tr>
              <tr>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
                <td>19</td>
                <td>20</td>
                <td>21</td>
              </tr>
              <tr>
                <td>22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
                <td id="today">26</td>
                <td>27</td>
                <td>28</td>
              </tr>
              <tr>
                <td>29</td>
                <td>30</td>
                <td class="pad" colspan="5">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /calendar widget -->
      </div>
      <div class="widget">
        <h3>Text Widget</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates eaque mollitia, dolore quos cum, tenetur dignissimos omnis officiis saepe veniam, fugiat odit. Nihil et eius cumque nulla excepturi molestias error.</p>
      </div>
    </aside>
  </div>
  <!-- /main and sidebar -->
```

И подвал footer.php

```php
 <footer class="row">
    <p class="col-md-12">&copy; Irina Sokolovskaya</p>
  </footer>
  </div>

  </body>
</html>
```

## Шаг 4. Добавляем базовые функции

После этого, еще немного поработаем над файлом index.php. Как я уже говорила, это самый главный файл вашей темы. Именно в этот файл мы добавим функции для вывода на странице шапки, сайдбара и подвала. В самое начало файла вставьте функцию для вывода header.php:

```php
<?php get_header(); ?>
```

И в самый конец - функции для вывода сайдбара и подвала:

```php
<?php get_sidebar(); ?>
<?php get_footer(); ?>
```

Если вы взяли другой шаблон, то важно посмотреть, в каком порядке идут в index.html сайдбар и основное содержимое страницы. Возможно, **get\_sidebar()** нужно будет вставить в начале файла, после **get\_header().**

Также нужно внести некоторые изменения в **header.php**. Давайте пропишем через **echo get\_template\_directory\_uri()** путь ко всем используемым скриптам и стилям:

```php
 <!-- <link rel='stylesheet' href='//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css'> -->
    <link rel='stylesheet' href='<?php echo get_template_directory_uri(); ?>/css/bootstrap.min.css'>
    <link rel='stylesheet' href='<?php echo get_template_directory_uri(); ?>/css/main.css'>
```

Потом, когда наша тема будет готова, нужно будет заменить путь к стилям бутстрапа на CDN, а пока что я их закоментировала.

## Итоги части 1

Итак, мы познакомились со структурой темы для вордпресс, со структурой страницы темы, и создали основные файлы для собственной темы.

Сейчас вы можете даже загрузить тему на сайт, и активировать ее. Она уже должна выглядеть красиво, однако добавить на сайт посты или страницы пока не получится, потому что мы еще не создали цикл для вывода содержимого. Как это сделать, вы узнаете из следующей части.

Вы можете скачать файлы, которые должны получиться по итогам этого урока, [по этой ссылке](https://github.com/ierhyna/wp-theme-howto/archive/Step_1.zip), или [посмотреть их на GitHub](https://github.com/ierhyna/wp-theme-howto/tree/Step_1).

Чтобы не пропустить продолжение, [подписывайтесь на RSS блога](http://feeds.feedburner.com/oriolo_ru), или присоединяйтесь в [фейсбуке](https://www.facebook.com/oriolo.ru)!
