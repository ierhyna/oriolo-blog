---
path: "/kak-udalit-pole-url-v-forme-kommentariev"
title: "Как удалить поле сайт в форме комментариев"
date: "2012-10-01"
excerpt: ""
category: "wordpress"
tags: ""
series: ""
---

Привет, друзья! В последнее время мне часто задают вопрос, **как удалить поле сайт (URL) из формы комментариев**. В этом посте я приведу небольшой код, который позволит это сделать.

На самом деле, **поле ввода сайта в форме комментария удалить** достаточно просто. Для этого необходимо добавить такой код в файл functions.php:

```php
function remove_url_from_comments($fields) {
    unset($fields['url']);
    return $fields;
}
add_filter('comment_form_default_fields', 'remove_url_from_comments');
```

Все! После этого в форме комментирования поля для сайта не будет. Кстати, если вы хотите удалить другие поля, то это можно сделать аналогичным образом. Сначала смотрим [стандартные значения полей формы комментирования](http://oriolo.ru/wordpress/nastroyka-formyi-kommentariev-v-wordpress-3-0/ "Настройка формы комментариев в WordPress 3.0+"), а потом подставляем нужное значение в функцию.

Но на своем блоге я бы поле "сайт" удалять не стала. И вот почему. Основное отличие блога от обычного сайта - это возможность общения, а общение происходит как раз через комментарии. Поэтому если я вижу у себя интересный комментарий, то мне становится любопытно: а что еще интересного этот человек мог написать? И тогда я перехожу в его блог по ссылке, которую он оставил. А если мне понравится, как и о чем он пишет, то могу оставить комментарий в ответ. И тогда он посмотрит на адрес моего блога, и возможно, зайдет еще раз :)

А если у комментатора возможности оставить ссылку на свой блог нет, то это какое-то одностороннее общение получается, как с телевизором - ты его слышишь, а он тебя - нет. А спамеры - были и будут, никуда от них не деться. Только ссылки они, как правило, оставляют в тексте комментария, а вовсе не в поле "сайт".
