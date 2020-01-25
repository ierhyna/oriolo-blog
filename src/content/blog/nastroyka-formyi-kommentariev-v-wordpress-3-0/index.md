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

```php

<!--?php $args = array(
  'id_form'           =--> 'commentform',
  'id_submit'         => 'submit',
  'title_reply'       => __( 'Leave a Reply' ),
  'title_reply_to'    => __( 'Leave a Reply to %s' ),
  'cancel_reply_link' => __( 'Cancel Reply' ),
  'label_submit'      => __( 'Post Comment' ),
<div></div>
  'comment_field' =>  '<p class="comment-form-comment"><label for="comment">' . _x( 'Comment', 'noun' ) .
    '</label><textarea id="comment" name="comment" cols="45" rows="8" aria-required="true">' .
    '</textarea></p>',
<div></div>
  'must_log_in' => '<p class="must-log-in">' .
    sprintf(
      __( 'You must be <a href="%s">logged in</a> to post a comment.' ),
      wp_login_url( apply_filters( 'the_permalink', get_permalink() ) )
    ) . '</p>',
<div></div>
  'logged_in_as' => '<p class="logged-in-as">' .
    sprintf(
    __( 'Logged in as <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out?</a>' ),
      admin_url( 'profile.php' ),
      $user_identity,
      wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) )
    ) . '</p>',
<div></div>
  'comment_notes_before' => '<p class="comment-notes">' .
    __( 'Your email address will not be published.' ) . ( $req ? $required_text : '' ) .
    '</p>',
<div></div>
  'comment_notes_after' => '<p class="form-allowed-tags">' .
    sprintf(
      __( 'You may use these <abbr title="HyperText Markup Language">HTML</abbr> tags and attributes: %s' ),
      ' <code>' . allowed_tags() . '</code>'
    ) . '</p>',
<div></div>
  'fields' => apply_filters( 'comment_form_default_fields', array(
<div></div>
    'author' =>
      '<p class="comment-form-author">' .
      '<label for="author">' . __( 'Name', 'domainreference' ) . '</label> ' .
      ( $req ? '<span class="required">*</span>' : '' ) .
      '<input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) .
      '" size="30" '="" .="" $aria_req=""></p>',
<div></div>
    'email' =>
      '<p class="comment-form-email"><label for="email">' . __( 'Email', 'domainreference' ) . '</label> ' .
      ( $req ? '<span class="required">*</span>' : '' ) .
      '<input id="email" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) .
      '" size="30" '="" .="" $aria_req=""></p>',
<div></div>
    'url' =>
      '<p class="comment-form-url"><label for="url">' .
      __( 'Website', 'domainreference' ) . '</label>' .
      '<input id="url" name="url" type="text" value="' . esc_attr( $commenter['comment_author_url'] ) .
      '" size="30"></p>'
    )
  ),
); ?>

```

То есть, если оставить $args пустым или пропустить его, то будут загружены эти строки.

Настроить $args можно также и через фильтр `comment_form_default_fields`. Например, если вам нужно **скрыть поле Сайт в форме комментирования в Wordpress 3.0+**, то в файл functions.php необходимо добавить следующий код:

```php

add_filter('comment_form_default_fields', 'mytheme_remove_url');
<div></div>
function mytheme_remove_url($arg) {
    $arg['url'] = '';
    return $arg;
}
```

### Использование comment\_form\_default\_fields

Давайте настроим вывод основных полей формы с помощью `comment_form_default_fields`: автор, email, сайт. Эти поля расположены в массиве:

```php

array(
	'author' => '<p class="comment-form-author">...',
	'email'  => '</p><p class="comment-form-email">...',
	'url'    => '</p>
```
