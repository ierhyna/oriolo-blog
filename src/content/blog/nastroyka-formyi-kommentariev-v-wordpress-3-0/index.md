---
path: "/nastroyka-formyi-kommentariev-v-wordpress-3-0"
title: "Настройка формы комментариев в WordPress 3.0+"
date: "2012-02-27"
excerpt: ""
category: "wordpress"
tags: ""
series: ""
---

Как я [писала](http://oriolo.ru/wordpress/twenty-eleven-comments-form/ "Совершенствуем форму комментариев в теме Twenty Eleven") в посте о **настройке формы комментариев в теме Twenty Eleven**, начиная с WordPress 3.0, вывод формы комментирования осуществляется с помощью функции `comment_form()`. Сейчас я расскажу, как настроить форму комментариев в WordPress версии 3.0 и выше.

### Функция comment\_form()

У функции `comment_form()` есть два параметра, которые можно изменять по своему желанию:

$args - содержит настройки полей формы, $post\_id - используется для генерации формы; если значение пустое, будет использован ID текущего поста.

### Форма комментирования по-умолчанию

По-умолчанию, $args имеет такие значения:

```

 'commentform',
  'id_submit'         => 'submit',
  'title_reply'       => __( 'Leave a Reply' ),
  'title_reply_to'    => __( 'Leave a Reply to %s' ),
  'cancel_reply_link' => __( 'Cancel Reply' ),
  'label_submit'      => __( 'Post Comment' ),

  'comment_field' =>  '' . _x( 'Comment', 'noun' ) .
    '' .
    '',

  'must_log_in' => '' .
    sprintf(
      __( 'You must be logged in to post a comment.' ),
      wp_login_url( apply_filters( 'the_permalink', get_permalink() ) )
    ) . '',

  'logged_in_as' => '' .
    sprintf(
    __( 'Logged in as %2$s. Log out?' ),
      admin_url( 'profile.php' ),
      $user_identity,
      wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) )
    ) . '',

  'comment_notes_before' => '' .
    __( 'Your email address will not be published.' ) . ( $req ? $required_text : '' ) .
    '',

  'comment_notes_after' => '' .
    sprintf(
      __( 'You may use these HTML tags and attributes: %s' ),
      ' ' . allowed_tags() . ''
    ) . '',

  'fields' => apply_filters( 'comment_form_default_fields', array(

    'author' =>
      '' .
      '' . __( 'Name', 'domainreference' ) . ' ' .
      ( $req ? '*' : '' ) .
      '',

    'email' =>
      '' . __( 'Email', 'domainreference' ) . ' ' .
      ( $req ? '*' : '' ) .
      '',

    'url' =>
      '' .
      __( 'Website', 'domainreference' ) . '' .
      ''
    )
  ),
); ?>

```

То есть, если оставить $args пустым или пропустить его, то будут загружены эти строки.

Настроить $args можно также и через фильтр `comment_form_default_fields`. Например, если вам нужно **скрыть поле Сайт в форме комментирования в Wordpress 3.0+**, то в файл functions.php необходимо добавить следующий код:

```

add_filter('comment_form_default_fields', 'mytheme_remove_url');

function mytheme_remove_url($arg) {
    $arg['url'] = '';
    return $arg;
}
```

### Использование comment\_form\_default\_fields

Давайте настроим вывод основных полей формы с помощью `comment_form_default_fields`: автор, email, сайт. Эти поля расположены в массиве:

```

array(
	'author' => '...',
	'email'  => '...',
	'url'    => '
```
