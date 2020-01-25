---
path: "/vyivod-kolichestva-zaregistrirovannyih-polzovateley-wordpress"
title: "Вывод количества зарегистрированных пользователей Wordpress"
date: "2012-09-19"
excerpt: ""
category: "wordpress"
tags: ""
series: ""
---

Привет всем! Вы когда-нибудь создавали на WordPress многопользовательский сайт, на котором открыта регистрация пользователей? Если да, то вам наверняка захочется **вывести количество зарегистрированных пользователей**. Из этой статьи вы узнаете, как это сделать.

[![](images/User-Driven-Innovation.png "Вывод количества пользователей WordPress")](http://oriolo.ru/wp-content/uploads/2012/09/User-Driven-Innovation.png)

Фактически, это делается очень просто. В нужном месте файла темы необходимо вставить такой код:

```php
<?php
function get_reg_users() {
  global $wpdb;
  return $wpdb->get_var("select count(*) from $wpdb->users");
}
print("Число зарегистрированных участников: ".get_reg_users());
?>
```

После чего появится сообщение "Число зарегистрированных участников: X".
