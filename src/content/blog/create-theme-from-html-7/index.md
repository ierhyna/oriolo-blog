---
path: "/create-theme-from-html-7"
title: "Как создать тему для WordPress. Часть 7: страница archive.php"
date: "2014-03-31"
excerpt: "Этот урок - седьмой из серии, посвященной разработке темы для WordPress. Из него вы узнаете, как создать шаблон для страницы архивов archive.php."
category: "wordpress"
tags: ""
series: "create-wp-theme-from-html"
---

Этот урок - седьмой из серии, посвященной разработке темы для WordPress. Из него вы узнаете, как создать шаблон для страницы архивов archive.php.

Разобраться в том, для чего будет использоваться файл archive.php, поможет [схема иерархии шаблонов](http://codex.wordpress.org/images/1/18/Template_Hierarchy.png). Из этой схемы следует, что шаблон архивов в теме для WordPress выводит эти страницы:

- рубрики
- метки
- архивы по датам
- архивы по авторам
- пользовательские таксономии
- архивы пользовательских типов записей

В этом руководстве я создам только один шаблон - archive.php, и все перечисленные страницы будут загружаться с его помощью. Но если вам необходимо, то можете сделать отдельные шаблоны для вывода разных типов архивов.

## Шаг 1 Создаем файл archive.php

В нашей теме страница архивов будет выглядеть почти также, как главная, но вверху будет добавлено название и описание рубрики, имя автора, дата или метка. То есть, этот шаблон будет основываться на файле index.php, но с некоторыми изменениями.

Поэтому первое, что нужно сделать, это создать в папке темы копию index.php, и переименовать ее в archive.php.

## Шаг 2 Добавляем заголовок и описание для рубрик

Теперь добавим на странице заголовок для рубрик. В самом начале файла archive.php, сразу после `get_header` и перед `while ( have_posts() )`, нужно добавить проверку, открыта ли сейчас страница рубрики. В начале файла код должен быть таким:

```php
<?php get_header(); ?>
<?php while ( have_posts() ) : the_post(); ?>
```

А сейчас между первой и второй строкой, то есть до цикла вывода записей, добавим:

```php
<h1 class="page-title">
	<?php
		if ( is_category() ) :
			single_cat_title();
		endif;
	?>
</h1>
```

Строка 3 - это условие, если открыта страница рубрик, а строка 4 - это вывод названия текущей рубрики.

В файле стилей /css/style.css пропишем стили для заголовка страницы. Нужно будет добавить `h1` и `h1 a` к строкам 48 и 55, и добавить где-нибудь снизу новый стиль для `.page-title`.

```php{1,8,14-18}
h1,h2,h3,h4,h5,h6
{
	font-family: 'Open Sans Condensed', sans-serif;
	font-weight: 700;
	color: #1b252a;
}
<div></div>
h1 a, h2 a, h4 a, h5 a, h6 a
{
	text-decoration: none;
	color: inherit;
}
<div></div>
.page-title 
{
        font-size: 3.5em;
        line-height: 1.25em;
}
```

Теперь выведем описание для рубрики:

```php{8-15}
<h1 class="page-title">
   <?php
      if ( is_category() ) :
         single_cat_title();
      endif;
   ?>
</h1>
<?php
   if ( is_category() ) : // выводим описание только на странице рубрики
       if (category_description() !== '') : // если есть описание, выведем его
            echo '<p>' . category_description() . '</p>';
       endif;
   endif;
?>
```

Аналогичным образом добавим заголовки для других типов архивов.

## Шаг 3 Заголовок для архивов по датам

Модифицируем код, и добавим к нему проверку, не открыта ли страница архива по годам:

```php{5-8}
<h1 class="page-title">
<?php
if (is_category()):
    single_cat_title();
elseif (is_year()):
    printf(__('Year: %s', 'striped'), '<span>' . get_the_date(_x('Y', 'yearly archives date format', 'striped')) . '</span>');
endif;
?>
</h1>
```

А потом по месяцам и по дням:

```php{7-11}

<h1 class="page-title">
   <?php
if (is_category()):
    single_cat_title();
elseif (is_year()):
    printf(__('Year: %s', 'striped'), '<span>' . get_the_date(_x('Y', 'yearly archives date format', 'striped')) . '</span>');
elseif (is_month()):
    printf(__('Month: %s', 'striped'), '<span>' . get_the_date(_x('F Y', 'monthly archives date format', 'striped')) . '</span>');
elseif (is_day()):
    printf(__('Day: %s', 'striped'), '<span>' . get_the_date() . '</span>');
endif;
?>
</h1>
```

## Шаг 4 Заголовок для страницы меток

Добавить заголовок на страницу меток очень легко:

```php{5-6}
<h1 class="page-title">
   <?php
if (is_category()):
    single_cat_title();
elseif ( is_tag() ) :
	single_tag_title();
elseif (is_year()):
    printf(__('Year: %s', 'striped'), '<span>' . get_the_date(_x('Y', 'yearly archives date format', 'striped')) . '</span>');
elseif (is_month()):
    printf(__('Month: %s', 'striped'), '<span>' . get_the_date(_x('F Y', 'monthly archives date format', 'striped')) . '</span>');
elseif (is_day()):
    printf(__('Day: %s', 'striped'), '<span>' . get_the_date() . '</span>');
endif;
?>
</h1>
```

## Шаг 5 Заголовок для страниц автора и других

Также нужно добавить заголовок для страницы автора (это строка 14), и страниц других видов архивов, которые могут добавить пользователи (это строка 16, и эта страница будет называться просто "Архивы"):

```php{13-17}
<h1 class="page-title">
   <?php
if (is_category()):
    single_cat_title();
elseif ( is_tag() ) :
	single_tag_title();
elseif (is_year()):
    printf(__('Year: %s', 'striped'), '<span>' . get_the_date(_x('Y', 'yearly archives date format', 'striped')) . '</span>');
elseif (is_month()):
    printf(__('Month: %s', 'striped'), '<span>' . get_the_date(_x('F Y', 'monthly archives date format', 'striped')) . '</span>');
elseif (is_day()):
    printf(__('Day: %s', 'striped'), '<span>' . get_the_date() . '</span>');
elseif (is_author()):
    printf( __( 'Author: %s', 'striped' ), '<span class="vcard"><a class="url fn n" href="' . esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ) . '" title="' . esc_attr( get_the_author() ) . '" rel="me">' . get_the_author() . '</a></span>' );
else :
	_e( 'Archives', 'striped' );
endif;
?>
</h1>
```

## Итоги Мы создали шаблон архивов!

Конечно, в процессе разработки темы для WordPress очень важно не забыть про шаблон архивов. Другой, не менее важный шаблон, это single.php - именно он выводит одиночную запись в блоге. Также, на этой странице добавляются комментарии к записям. Поэтому следующий урок будет связан с созданием файла single.php. Чтобы его не пропустить, подписывайтесь на обновления блога!
