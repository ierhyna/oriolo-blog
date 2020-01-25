---
path: "/paginatsiya"
title: "Постраничная навигация для Wordpress блога"
date: "2013-03-16"
excerpt: ""
category: "wordpress"
tags: ""
series: ""
---

Предложенный код добавит на главной странице номера страниц, вместо стандартного "предыдущая" и "следующая". Согласитесь, постраничная навигация намного удобнее, особенно, если записей в блоге много. Скрипт не мой, и я уже не помню, где его взяла. Смысл его в том, чтобы **добавить постраничную навигацию** для главной страницы блога, а также для страниц рубрик и тегов. Пусть будет тут, чтобы не потерялся.

Конечно, для реализации пагинации для блога можно использовать плагин, но я предпочитаю использовать их как можно меньше.

Сначала, добавляем несколько строк кода в конец файла функций используемой темы:

```php
// pagination
function oriolo_pagination($pages = '', $range = 2)
{
     $showitems = ($range * 2)+1;
     global $paged;
     if(empty($paged)) $paged = 1;
     if($pages == '')
     {
         global $wp_query;
         $pages = $wp_query->max_num_pages;
         if(!$pages)
         {
             $pages = 1;
         }
     }
     if(1 != $pages)
     { 
         echo "<div class='clearfix navigation-top'><div class='pagination'><span> ". __('Pages:', 'existentia') ." </span>";
         if($paged > 2 && $paged > $range+1 && $showitems < $pages) echo "<a href='".get_pagenum_link(1)."'>«</a>";
         if($paged > 1 && $showitems < $pages) echo "<a href='".get_pagenum_link($paged - 1)."'>‹</a>";
         for ($i=1; $i <= $pages; $i++)
         {
             if (1 != $pages &&( !($i >= $paged+$range+1 || $i <= $paged-$range-1) || $pages <= $showitems ))
             {
                 echo ($paged == $i)? "<span class='current'>".$i."</span>":"<a href='".get_pagenum_link($i)."' class='inactive' >".$i."</a>";
             }
         }
         if ($paged < $pages && $showitems < $pages) echo "<a href='".get_pagenum_link($paged + 1)."'>›</a>";
         if ($paged < $pages-1 &&  $paged+$range-1 < $pages && $showitems < $pages) echo "<a href='".get_pagenum_link($pages)."'>»</a>";
         echo "</div></div>\n";
     }
}
```

Теперь в то место шаблона, где нужно высвести постраничную навигацию, вставляем код для вызова функции:

```php
if (function_exists('oriolo_pagination')) oriolo_pagination(); 
else posts_nav_link();
```

После этого, на главной странице блога, при наличии достаточного количества записей, должны появиться цифры с номерами страниц. Теперь давайте оформим созданную постраничную навигацию при помощи стилей:

```css
/* pagination */
.pagination
{
	clear: both;
	font-size: 11px;
	line-height: 13px;
	padding: 0;
	position: relative;
}
.pagination span, .pagination a
{
	background: #666;
	color: #FFF;
	display: block;
	float: left;
	font-weight: normal;
	margin: 2px 2px 2px 0;
	padding: 6px 9px 5px 9px;
	text-decoration: none;
	width: auto;
}
.pagination a:hover
{
	background: #365DA1;
	color: #FFF;
}
.pagination .current
{
	background: #365DA1;
	color: #FFF;
	padding: 6px 9px 5px 9px;
}
```

На этом все. Посмотреть пример использования **пагинации для wordpress** вы можете на главной странице моего блога.
