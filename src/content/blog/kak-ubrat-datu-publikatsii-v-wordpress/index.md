---
path: "/kak-ubrat-datu-publikatsii-v-wordpress"
title: "Как убрать дату публикации в Wordpress?"
date: "2012-04-04"
excerpt: ""
category: "wordpress"
tags: ""
series: ""
---

В последнее время меня очень часто стали спрашивать, как в убрать дату поста. И, хотя в посте про то, [надо ли убирать дату в блогах](http://oriolo.ru/wordpress/nado-li-ubirat-datu-v-blogah/ "Надо ли убирать дату в блогах"), я писала о том, что удаление даты оправдано не всегда, решила написать о том, как **удалить дату публикации** в Wordpress.

Для чего может быть необходимо удалить дату? Прежде всего, если вы хотите сделать статичный сайт, либо если публикуете материалы, которые будут актуальны долгое время.

В **Wordpress убрать дату**, на самом деле, очень просто. Для этого нам понадобится внести изменения в несколько файлов WordPress. В каких именно, зависит от вашей темы. Как показывает моя практика, большинство шаблонов делятся на три группы по способу вывода даты.

### Случай первый, the\_time

В большинстве старых шаблонов для того, чтобы убрать дату поста, достаточно удалить `the_time()`. Например, вы нашли вот такие строки, содержащие эту функцию, в файле index.php:

```php
<p>Posted: <?php the_time('F j, Y'); ?> at <?php the_time('g:i a'); ?></p>
```

Эту строку и нужно удалить.

Чтобы убрать дату с главной страницы - ищете и удаляете код из файла index.php, со страницы поста - удаляете код из файла single.php, и так далее.

### Случай второй, get\_the\_date

Если в index.php вашего шаблона нет функции вывода даты, посмотрите, есть ли в папке с файлами темы файлы content.php и content-single.php? Если да, то чтобы убрать дату, надо из этих файлов удалить строки, содержащие get\_the\_date(). Например:

### Случай третий, functions

Если же content.php и content-single.php не содержат ничего похожего на подобную функцию, то посмотрите в файл functions.php, весьма вероятно, что удалить дату можно будет отредактировав этот файл.

Например, в моем шаблоне вывод мета-данных поста осуществляется так:

```php
function oriolo_posted_on() {
	echo '<img alt="" src="'. get_bloginfo(">&nbsp;';
	printf( __( '<time class="entry-date" datetime="%3$s">%4$s</time>
	<span class="byline"><span class="sep"> by </span> <span class="author vcard">
	<a class="url fn n" title="%6$s" href="%5$s" rel="author">%7$s</a>
	</span></span>&nbsp;', 'oriolo' ),
		esc_url( get_permalink() ),
		esc_attr( get_the_time() ),
		esc_attr( get_the_date( 'c' ) ),
		esc_html( get_the_date() ),
		esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
		esc_attr( sprintf( __( 'View all posts by %s', 'oriolo' ), get_the_author() ) ),
		esc_html( get_the_author() )
	);
}
```

Если вы нашли в файле функций своей темы подобный код, то этом случае, чтобы **убрать дату публикации**, надо отредактировать функицю, убрав из нее все, что связано с датой. То есть, привести код к таком виду:

```php
function oriolo_posted_on() {
	printf( __( '<span class="byline"><span class="sep"> by </span> <span class="author vcard">
	<a class="url fn n" title="%6$s" href="%5$s" rel="author">%7$s</a>
	</span></span>&nbsp;', 'oriolo' ),
		esc_url( get_permalink() ),
		esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
		esc_attr( sprintf( __( 'View all posts by %s', 'oriolo' ), get_the_author() ) ),
		esc_html( get_the_author() )
	);
}
```

Найти, в каком месте functions.php происходит вывод даты, можно через поисковый запрос get\_the\_date или get\_the\_time.

### В заключение

Конечно, кроме описанных трех случаев возможны и другие варианты удаления функции вывода даты в wordpress. Все зависит от того, какую тему вы используете. Часто бывает так, что авторы премиум-тем использую нестандартные функции, которые, с одной стороны, создают преимущества настройки блога через визуальную админ-панель, а с другой стороны - дополнительную путаницу в коде.

Поэтому, если что-то непонятно, или у вас шаблон, который не подходит ни под один из случаев, обращайтесь :)
