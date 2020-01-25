---
path: "/kak-sdelat-izobrazheniya-adaptivnymi"
title: "Как сделать изображения адаптивными"
date: "2014-03-12"
excerpt: ""
category: "wordpress"
tags: ""
series: ""
---

При создании адаптивной темы для WordPress нужно сделать так, чтобы все изображения, которые пользователь будет добавлять в записи или на страницы, тоже были адаптивными. В этом посте я привожу небольшой код, который поможет **добавить к изображениям в WordPress собственный класс**, и **сделать изображения адаптивными**.

[![adaptive-layout](images/adaptive-layout.png)](http://oriolo.ru/wp-content/uploads/2014/03/adaptive-layout.png)

Сначала создадим в файле стилей класс `.img-responsive`:

```
.img-responsive {
	display: block;
	height: auto;
	max-width: 100%;
}
```

Затем в файл functions.php добавим код, который добавит новый класс к изображениям:

```
// images auto class
function add_image_responsive_class($content) {
   global $post;
   $pattern ="/<img(.*?)class=\"(.*?)\"(.*?)>/i";
   $replacement = '<img$1class="$2 img-responsive"$3>';
   $content = preg_replace($pattern, $replacement, $content);
   return $content;
}
add_filter('the_content', 'add_image_responsive_class');
```

После этого ко всем изображениям, которые были добавлены в блог раньше, и тем, которые будут загружены в будущем, добавится класс img-responsive, и изображения станут адаптивными.

Кстати, точно также можно добавить к изображениям любой другой собственный класс.
