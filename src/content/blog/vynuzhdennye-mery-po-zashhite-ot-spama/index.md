---
path: "/vynuzhdennye-mery-po-zashhite-ot-spama"
title: "Защита от спама WordPress"
date: "2014-08-11"
excerpt: ""
category: "blogging"
tags: ""
series: ""
---

В связи с тем, что в последнее время на мой блог буквально посыпалось огромное количество спам-комментариев, я временно ограничила публикацию комментариев без Referrer-ссылки. Поэтому в некоторых случаях ваши комментарии могут не быть опубликованными (например, если ваш браузер запрещает передачу refferer-информации). Чтобы такое не происходило, попробуйте обновить страницу.

Если вы столкнулись с аналогичной проблемой - большим количеством спама в последнее время, то решить ее можно, дописав в файл .htaccess следующий код:

```php
RewriteEngine On
RewriteCond %{REQUEST_METHOD} POST
RewriteCond %{REQUEST_URI} .wp-comments-post\.php*
RewriteCond %{HTTP_REFERER} !.*yourdomain.com.* [OR]
RewriteCond %{HTTP_USER_AGENT} ^$
RewriteRule (.*) http://%{REMOTE_ADDR}/$ [R=301,L]
```

Где yourdomain.com надо заменить на адрес вашего сайта.

Второе, что я сделала, это дописала следующий код в файле функций темы:

```php
//------------------------------------------------------------------------------------------------
//      Spam Comments Checker
//------------------------------------------------------------------------------------------------
function get_the_user_ip() {
    if ( ! empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
    //check ip from share internet
    $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif ( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
    //to check ip is pass from proxy
    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
    $ip = $_SERVER['REMOTE_ADDR'];
    }
    return apply_filters( 'dm_get_ip', $ip );
}
function preprocess_new_comment($commentdata) {
    $userIdesntity = md5( get_the_user_ip().time() );
    if( !isset( $_POST['is_valid_comment'] ) && trim( $_POST['is_valid_comment'] )== $userIdesntity ) {
        die( 'You are bullshit' );
    }
    return $commentdata;
}
if( function_exists( 'add_action' ) ) {
    add_action( 'preprocess_comment', 'preprocess_new_comment' );
    add_action( 'comment_form_after', 'comment_spam_prevention', 20 );
    
}
function comment_spam_prevention(){
    $userIdesntity = md5(get_the_user_ip().time());
    ?>
    
    var cForm = jQuery('.comment-form');
    
    cForm.find('input[type=submit]').on('click', function(e){
        e.preventDefault();
        jQuery.ajax({
            url: cForm.attr('action') + '?' + cForm.serialize() + '&is_valid_comment=',
            method: 'post'
        }).done(function( data ) {
        })
        .fail(function() {
            alert( "error" );
        });
    });
    
    <?php
}

//------------------------------------------------------------------------------------------------
//      EOF Spam Comments Checker
//------------------------------------------------------------------------------------------------
```

При помощи jQuery назначается динамический ключ, и произ
