---
path: "/create-theme-from-html-5"
title: "Как создать тему для WordPress. Часть 5: создание сайдбара"
date: "2014-03-14"
excerpt: ""
category: "wordpress"
tags: ""
series: "create-wp-theme-from-html"
---

Из этого урока вы узнаете, как добавить в тему для WordPress поддержку виджетов, и выводить их в сайдбаре.

## Функция добавления сайдбара

Чтобы **добавить к теме поддержку виджетов**, необходимо зарегистрироват боковую колонку при помощи функции `register_sidebar()`. Давайте добавим сайдбар со всеми возможными параметрами в начало файла functions.php:

```php
// Register Sidebar
function striped_sidebar() {
<div></div>
	$args = array(
		'id'            => 'sidebar-left',
		'name'          => __( 'Sidebar', 'striped' ),
		'description'   => __( 'Left Sidebar', 'striped' ),
		'class'         => 'striped-widget',
		'before_title'  => '<h2 class="widgettitle">',
		'after_title'   => '</h2>',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
	);
	register_sidebar( $args );
<div></div>
}
<div></div>
// Hook into the 'widgets_init' action
add_action( 'widgets_init', 'striped_sidebar' );

```

Немного о возможных аргументах:

- `'id' => 'sidebar-left'` - задает ID сайдбара, по которому мы в дальнейшем будем выводить его в теме
- `'name'` - название сайдбара, которое будет выводиться в консоли при добавлении в него виджетов
- `'before_title'`, `'after_title'`, `'before_widget'`, `'after_widget'` - задают теги, которые будут до и после заголовка виджета и до и после самого виджета

Теперь для того, чтобы отобразить сайдбар в теме, необходимо в файл sidebar.php добавить вызов. Обратите внимание, что обязательно нужно указать ID сайдбара, его мы задали в функции вверху:

```php
<?php if ( ! dynamic_sidebar('sidebar-left') ) : ?>
<!-- тут будет содержимое сайдбара, которое выведется, если в него не поместили виджеты -->
<?php endif; ?>
```

Добавьте первую строку после вывода логотипа:

```php
<!-- Logo -->
<div id="logo">
<h1>STRIPED</h1>
</div>
<?php if ( ! dynamic_sidebar('sidebar-left') ) : ?>
```

А вторую строку перед копирайтом:

```php
<?php endif; ?>
```

Теперь мы можем заметить в Консоли, что у нашей темы появилась поддержка виджетов, и мы уже можем их добавить и посмотреть на результат.

Следующим шагом будет настройка оформления виджетов, чтобы они были такими же, как в верстке.

## Оформление виджетов в сайдбаре

В сайдбаре у нас должны выводиться следующие виджеты:

- меню со страницами
- поиск
- текстовый виджет в рамке
- последние записи
- последние комментарии
- календарь

Сначала посмотрим, как выводятся виджеты в верстке. Они обернуты в тег `section`, а заголовки виджетов - в `header`. Сделаем также в нашей теме, внесем измерения в `'before_title'` и `'after_title'`, `'before_widget'` и `'after_widget'`:

```php
	$args = array(
		'id'            => 'sidebar-left',
		'name'          => __( 'Sidebar', 'striped' ),
		'description'   => __( 'Left Sidebar', 'striped' ),
		'class'         => 'striped-widget',
		'before_title'  => '<header><h2 class="widgettitle">',
		'after_title'   => '</h2></header>',
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
	);
	register_sidebar( $args );
```

Точно также сопоставим, какому классу вордпресс соответствуют классы виджетов в верстке. Здесь нам поможет расширение FireBug для Firefox, или, если используете Chrome, нажмите F12:

- `is-search` в верстке это `widget_search`
- `is-text-style1` в верстке это `widget_text`
- `is-recent-comments` в верстке это `widget_recent_comments`
- `is-recent-posts` в верстке это `widget_recent_entries`
- `is-calendar` в верстке это `widget_calendar`
- виджет с навигационным меню будем настраивать отдельно

Теперь заменим в CSS стили на те, которые использует вордпресс.

Обратите внимание, в текстовом виджете вложенный `div` имеет класс `inner`, а в вордпресс - класс `textwidget`, это в CSS тоже нужно заменить. То же самое касается и виджета календаря, только там вместо `.inner` - `#calendar_wrap`.

### Виджет "Поиск"

Виджет поиска придется настроить отдельно, так как он не совпадает по разметке с тем, что есть в верстке.

Существует несколько способов создать собственную форму поиска для вордпресс. Со всеми вы можете ознакомиться в [Кодексе](https://codex.wordpress.org/Function_Reference/get_search_form).

Самым простым является использование отдельного файла в теме для вывода формы. Нам нужно создать в папке темы новый файл с именем searchform.php со следующим содержанием:

```php
<form role="search" method="get" class="search-form" action="<?php echo home_url( '/' ); ?>">
	<input type="search" class="search-field" placeholder="Поиск" value="" name="s" title="Поиск:" />
</form>
```

Сохраните файл. После этого наша форма поиска будет выглядеть так же, как и в верстке. Если вы брали другой шаблон, то посмотрите, какие поля и классы есть там, и перенесите их в шаблон.

### Настройка меню

Самое трудное сегодня будет в конце. Сейчас мы настроим вывод виджета произвольного меню со списком наших страниц.

Сейчас меню выводится в верстке вот таким кодом:

```php
<!-- Nav -->
<nav id="nav">
	<ul>
	<li class="current_page_item"><a href="#">Latest Post</a></li>
	<li><a href="#">Archives</a></li>
	<li><a href="#">About Me</a></li>
	<li><a href="#">Contact Me</a></li>
	</ul>
</nav>
```

А вордпресс сгенерировал такой код для меню:

```php
<section id="nav_menu-2" class="widget widget_nav_menu">
  <div class="menu-1-container">
    <ul id="menu-1" class="menu">
      <li id="menu-item-2419" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-home menu-item-2419">
        <a href="/">
          Главная
        </a>
      </li>
      <li id="menu-item-2127" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2127">
        <a href="1">
          один
        </a>
      </li>
      <li id="menu-item-2128" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2128">
        <a href="2">
          два
        </a>
      </li>
      <li id="menu-item-2177" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2177">
        <a href="3">
          три
        </a>
      </li>
      <li id="menu-item-2179" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2179">
        <a href="4">
          четыре
        </a>
      </li>
    </ul>
  </div>
</section>
```

Для стилей в CSS сейчас используется `#nav li`. Поэтому нам нужно вместо `#nav` использовать в стилях `.widget_nav_menu`. Заменяем. Также вместо .current\_page\_item будет использовать .current-menu-item, так как в меню у нас могут быть не только страницы, но и посты, и произвольные ссылки. Тоже заменяем. Проверяем - если все сделано правильно, все должно работать.

## Заголовок блога и копирайты

Сделаем вывод названия блога в боковой колонке. Вместо статичного кода:

```php
<!-- Logo -->
<div id="logo">
  <h1>
    STRIPED
  </h1>
</div>
```

Вставьте:

```php
<!-- Logo -->
<div id="logo">
  <h1>
    <?php bloginfo('name'); ?>
  </h1>
</div>
```

И заодно сделаем вывод названия блога в копирайтах. В файле sidebar.php, вместо этого:

```php
<!-- Copyright -->
<div id="copyright">
  <p>
    &copy; 2013 An Untitled Site.
    <br />
    Images: 
    <a href="http://n33.co">
      n33
    </a>
    , 
    <a href="http://fotogrph.com">
      fotogrph
    </a>
    <br />
    Design: 
    <a href="http://html5up.net/">
      HTML5 UP
    </a>
  </p>
</div>
```

Вставьте:

```php
<!-- Copyright -->
<div id="copyright">
  <p>
    &copy; <?php echo date('Y');?>  <?php bloginfo('name'); ?>
    <br />
    Images: 
    <a href="http://n33.co">
      n33
    </a>
    , 
    <a href="http://fotogrph.com">
      fotogrph
    </a>
    <br />
    Design: 
    <a href="http://html5up.net/">
      HTML5 UP
    </a>
  </p>
</div>
```

Так как наш шаблон распространяется по лицензии Creative Commons, удалять ссылки на автора мы не будем.

## Итоги

Мы создали сайдбар, добавили в него виджеты и настроили их стили. Также мы сделали вывод названия блога в боковой колонке и в подвале.

В следующей части мы создадим постраничную навигацию.
