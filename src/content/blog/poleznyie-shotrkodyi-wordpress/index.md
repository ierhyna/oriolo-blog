---
path: "/poleznyie-shotrkodyi-wordpress"
title: "Top-10 полезных шорткодов WordPress"
date: "2012-02-05"
excerpt: ""
category: "wordpress"
tags: ""
series: ""
---

Привет! Сегодня я расскажу об одной очень интересной возможности WordPress, о которой многие не знают, и не все пользуются. Речь идёт о **шорткодах** (shortcode). Также я приведу примеры десяти полезных шорткодов, которые можно использовать вместо плагинов.

### Что такое шорткоды?

**Шорткоды** поддерживаются всеми версиями вордпресса, начиная с 2.5. Они представляют собой кодовое слово, написав которое в редакторе поста, вы вызовете специальную функцию. Намного проще это показать на примере, чем объяснить. Один из стандартных шорткодов это `&#91;gallery&#93;`. Он выводит галерею из изображений, загруженных при написании поста.

### Как использовать шорткоды?

Дополнительные шорткоды, не входящие в вордпресс "из коробки", написаны вручную и вызываются из файла functions.php. Самый простой пример такого шорткода - вывод текущего года внутри текста поста:

В файле functions.php в удобном месте (например внизу) дописываем код:

```php
function show_current_year(){
	return date('Y');
}
add_shortcode('show_current_year', 'show_current_year');
```

Теперь, вставив в тексте поста `&#91;show_current_year&#93;`, мы получим значение текущего года.

С шорткодами возможно использовать атрибуты. Например `&#91;gallery exclude="32"&#93;` выведет все картинки из галереи, за исключением картинки с ID=32

Если же вы хотите **использовать шорткоды вне текста поста**, например, в текстовых виджетах, то в functions.php необходимо прописать следующее (один раз, не надо писать для каждой функции шорткода отдельно):

```php
add_filter('widget_text', 'do_shortcode');
```

Чтобы разрешить шорткоды в анонсах, надо дополнительно дописать:

```php
add_filter('the_excerpt', 'do_shortcode');
```

Если вы хотя бы немного знаете php, то написать простой шорткод самостоятельно не составит большого труда :)

Ниже я предлагаю небольшую коллекцию **шорткодов wordpress**. Чтобы их использовать, необходимо дописать внизу файла functions.php новую функцию, а в тексте записи или виджета вставить нужный шорткод.

### 1\. Отображать текст только в RSS

Если выводить часть записи только в RSS ленте, это будет стимулировать рост количества подписчиков. Шорткод является отличной заменой для плагина FeedOnly.

```php
function feedonly_shortcode( $atts, $content = null) {
    if (!is_feed()) return "";
    return $content;
}
add_shortcode('feedonly', 'feedonly_shortcode');
```

Для использования пишем нужный текст внутри шорткода: \[feedonly\]текст для подписчиков \[/feedonly\].

### 2\. Показывать часть поста только зарегистрированным пользователям

То же самое, только с той лишь разницей, что скрытый текст будут видеть зарегистрированные посетители.

```php
function member_check_shortcode( $atts, $content = null ) {  
     if ( is_user_logged_in() && !is_null( $content ) && !is_feed() )  
        return $content;  
    return '';  
}  
add_shortcode( 'member', 'member_check_shortcode' );
```

Используем так: `&#91;member]Скрытый текст для пользователей.&#91;/member]`

### 3\. Скрытые заметки к посту

Если вы ведете блог не в одиночку, то возможно, захотите, чтобы какую-то часть поста видели только пользователи, которые могут редактировать и писать записи. Используйте этот шорткод. Также может быть полезен, как "записки для себя".

```php
function sc_note( $atts, $content = null ) {  
     if ( current_user_can( 'publish_posts' ) )  
        return '<div class="note">'.$content.'</div>';  
    return '';  
}  
add_shortcode( 'note', 'sc_note' );
```

Использование: `&#91;note]тут текст&#91;/note]`. Дополнительно можно прописать стили для `div class="note"`, чтобы он визуально отличался.

### 4\. Кодируем email

При помощи этого шорткода можно закодировать email [html-символами](http://oriolo.ru/vyorstka/polnyiy-spisok-html-simvolov/ "Вставка специальных символов в html + полный список"), что поможет защититься от спама.

```php
function munge_mail_shortcode( $atts , $content=null ) {  
    for ($i = 0; $i < strlen($content); $i++) $encodedmail .= "&#" . ord($content[$i]) . ';';   
    return '<a href="mailto:'.$encodedmail.'">'.$encodedmail.'</a>';  
}  
add_shortcode('mailto', 'munge_mail_shortcode');
```

Использование: `[mailto]myemail@example.com[/mailto]`.

### 5\. Вывод статистики блога

Многие любят выводить в сайдбарах статистику блога. Например, сколько постов и комментариев написано. Это можно сдеать без плагина при помощи шорткода.

```php
add_shortcode('wcs_count', 'wcs_count_shortcode_handler');
function wcs_count_shortcode_handler($atts)
{
    // extract parameters
    $parms = shortcode_atts(array(
        'type' => 'posts',
        'format' => 'true',
        'extra' => '1',
        ), $atts);
    $type = strtolower($parms['type']);
    $format = strtolower($parms['format']);
    $extra = $parms['extra'];
    // process t/f options
    $b_format = false;
    if (($format == 'yes') || ($format == 'y') ||
        ($format == 'true') || ($format == '1'))
    {$b_format = true;}
    // exit
    return wcs_get_count($type, $b_format, $extra);
}
function wcs_get_count($type='posts', $format='1', $extra='1')
{
    // TYPES:
    // posts, posts_by_author, pages, tags, categories
    // users, ms_users, blogroll, blogroll_categories, commenters
    // comments, comments_pending, comments_spam, comments_pingback
    // comments_by_user, comments_by_nicename, comments_by_email
    // comments_per_post
    // $extra is used with:
    // posts_by_author, comments_by_user, comments_by_nicename, comments_by_email
    // comments_per_post
    // init
    global $wpdb;
    $type = strtolower($type);
    $count = 0;
    // process
    switch($type)
    {
        case 'posts': // published
        $count = wp_count_posts('post');
        $count = $count->publish;
        // options: publish, future, draft, pending, private, trash, auto-draft, & inherit
        break;
        case 'posts_by_author': // use $extra for user/author id
        case 'posts_by_user':
        $query = "SELECT COUNT(*) FROM $wpdb->posts ";
        $where = "WHERE post_type='post' AND post_status='publish' AND post_author='$extra'";
        $count = $wpdb->get_var($query . $where);
        // alternative method is: count_user_posts()
        break;
        case 'pages': // published
        $count = wp_count_posts('page');
        $count = $count->publish;
        break;
        case 'tags':
        $count = wp_count_terms('post_tag');
        break;
        case 'categories':
        $count = wp_count_terms('category');
        break;
        case 'users':
        $count = count_users();
        $count = $count['total_users'];
        break;
        case 'ms_users': // multi-site
        $count = get_user_count();
        break;
        case 'blogroll':
        $query = "SELECT COUNT(*) FROM $wpdb->links ";
        $where = "WHERE link_visible='Y'";
        $count = $wpdb->get_var($query . $where);
        break;
        case 'blogroll_categories':
        $count = wp_count_terms('link_category');
        break;
        case 'commenters':
        $query = "SELECT COUNT(DISTINCT comment_author) FROM $wpdb->comments ";
        $where = "WHERE comment_approved='1' AND comment_type=''";
        $count = $wpdb->get_var($query . $where);
        break;
        case 'comments':
        $query = "SELECT COUNT(*) FROM $wpdb->comments ";
        $where = "WHERE comment_approved='1' AND comment_type=''";
        $count = $wpdb->get_var($query . $where);
        break;
        case 'comments_pending':
        $query = "SELECT COUNT(*) FROM $wpdb->comments ";
        $where = "WHERE comment_approved='0' AND comment_type=''";
        $count = $wpdb->get_var($query . $where);
        break;
        case 'comments_spam':
        $query = "SELECT COUNT(*) FROM $wpdb->comments ";
        $where = "WHERE comment_approved='spam' AND comment_type=''";
        $count = $wpdb->get_var($query . $where);
        break;
        case 'comments_pingback':
        case 'comments_pingbacks':
        case 'comments_trackback':
        case 'comments_trackbacks':
        $query = "SELECT COUNT(*) FROM $wpdb->comments ";
        $where = "WHERE comment_approved='1' AND comment_type='pingback'";
        $count = $wpdb->get_var($query . $where);
        break;
        case 'comments_by_user': // use $extra for user_id
        $query = "SELECT COUNT(*) FROM $wpdb->comments ";
        $where = "WHERE comment_approved='1' AND comment_type='' AND user_id='$extra'";
        $count = $wpdb->get_var($query . $where);
        break;
        case 'comments_by_author': // use $extra for author nicename (case INsensitive)
        case 'comments_by_nicename':
        $query = "SELECT COUNT(*) FROM $wpdb->comments ";
        $where = "WHERE comment_approved='1' AND comment_type='' AND comment_author='$extra'";
        $count = $wpdb->get_var($query . $where);
        break;
        case 'comments_by_email': // use $extra for author email (case INsensitive)
        $query = "SELECT COUNT(*) FROM $wpdb->comments ";
        $where = "WHERE comment_approved='1' AND comment_type='' AND comment_author_email='$extra'";
        $count = $wpdb->get_var($query . $where);
        break;
        case 'comments_per_post': // $extra is decimal place precision (0 for integer only)
        // posts
        $posts_count = wp_count_posts('post');
        $posts_count = $posts_count->publish;
        // comments
        $query = "SELECT COUNT(*) FROM $wpdb->comments ";
        $where = "WHERE comment_approved='1' AND comment_type=''";
        $comment_count = $wpdb->get_var($query . $where);
        // average
        return round($comment_count / $posts_count, $extra);
        default:
        $count = 0;
    }
    // exit
    if ($format) {$count = number_format_i18n($count);}
    return $count;
    /**********************************************************************
     Copyright © 2011 Gizmo Digital Fusion (http://wpCodeSnippets.info)
     you can redistribute and/or modify this code under the terms of the
     GNU GPL v2: http://www.gnu.org/licenses/gpl-2.0.html
    **********************************************************************/
}
```

Использование: `[wcs_count type="posts"]`. Полный список атрибутов доступен [на сайте разработчиков](http://wpcodesnippets.info/blog/lets-build-a-multifeatured-stats-count-shortcode.html).

### 6\. Показываем скрытый текст после определенной даты

Можно использовать при проведении конкурсов, или поздравлении с праздниками, например.

```php
function content_countdown($atts, $content = null){
  extract(shortcode_atts(array(
     'month' => '',
     'day'   => '',
     'year'  => ''
    ), $atts));
    $remain = ceil((mktime( 0,0,0,(int)$month,(int)$day,(int)$year) - time())/86400);
    if( $remain > 1 ){
        return $daysremain = "<div class=\"event\">Осталось дней до появления - <strong>($remain)</strong></div>";
    }else if($remain == 1 ){
    return $daysremain = "<div class=\"event\">Остался всего <strong>($remain)</strong> день до появления</div>";
    }else{
        return $content;
    }
}
add_shortcode('cdt', 'content_countdown');
```

Используем так: `[cdt month="01" day="01" year="2012"] Новый год! [/cdt]`. До наступления указанной даты, будет показан счетчик обратного отсчета.

### 7\. Открываем PDF через GoogleDocs

Данный шорткод перенаправляет PDF на GoogleDocs, что намного удобнее для пользователя.

```php
function pdflink($attr, $content) {
	return '<a class="pdf" href="http://docs.google.com/viewer?url=' . $attr['href'] . '">'.$content.'</a>';
}
add_shortcode('pdf', 'pdflink');
```

Использование: `[pdf href="http://yoursite.com/linktoyour/file.pdf"] Читать PDF [/pdf]`.

### 8\. Вставка видео с YuoTube

```php
function youtube($atts) {
    extract(shortcode_atts(array(
        "value" => 'http://',
        "width" => '640',
        "height" => '390',
        "name"=> 'movie',
        "allowFullScreen" => 'true',
        "allowScriptAccess"=>'always',
        "controls"=> '1',
    ), $atts));
    return '<object style="height: '.$height.'px; width: '.$width.'px"><param name="'.$name.'" value="'.$value.'"><param name="allowFullScreen" value="'.$allowFullScreen.'"><param name="allowScriptAccess" value="'.$allowScriptAccess.'"><embed src="'.$value.'" type="application/x-shockwave-flash" allowfullscreen="'.$allowFullScreen.'" allowScriptAccess="'.$allowScriptAccess.'" width="'.$width.'" height="'.$height.'"></object>';
}
add_shortcode("youtube", "youtube");
```

Чтобы использовать этот шорткод, надо знать ID нужного видео: `[youtube value="XXXXXX"]`

### 9\. Удаляем автоформатирование текста

```php
function my_formatter($content) {
	$new_content = '';
	$pattern_full = '{(\[raw\].*?\[/raw\])}is';
	$pattern_contents = '{\[raw\](.*?)\[/raw\]}is';
	$pieces = preg_split($pattern_full, $content, -1, PREG_SPLIT_DELIM_CAPTURE);
	foreach ($pieces as $piece) {
		if (preg_match($pattern_contents, $piece, $matches)) {
			$new_content .= $matches[1];
		} else {
			$new_content .= wptexturize(wpautop($piece));
		}
	}
	return $new_content;
}
remove_filter('the_content', 'wpautop');
remove_filter('the_content', 'wptexturize');
add_filter('the_content', 'my_formatter', 99);
```

Использование: `[raw]К этому тексту не будет применено форматирование wordpress.[/raw]`

### 10\. Выводим похожие посты

Конечно, можно сделать это с помощью плагина, но, используя шорткод, можно показывать похожие посты только для некоторых записей.

```php
function related_posts_shortcode( $atts ) {
	extract(shortcode_atts(array(
	    'limit' => '5',
	), $atts));
	global $wpdb, $post, $table_prefix;
	if ($post->ID) {
		$retval = '<ul>';
 		// Get tags
		$tags = wp_get_post_tags($post->ID);
		$tagsarray = array();
		foreach ($tags as $tag) {
			$tagsarray[] = $tag->term_id;
		}
		$tagslist = implode(',', $tagsarray);
		// Do the query
		$q = "SELECT p.*, count(tr.object_id) as count
			FROM $wpdb->term_taxonomy AS tt, $wpdb->term_relationships AS tr, $wpdb->posts AS p WHERE tt.taxonomy ='post_tag' AND tt.term_taxonomy_id = tr.term_taxonomy_id AND tr.object_id  = p.ID AND tt.term_id IN ($tagslist) AND p.ID != $post->ID
				AND p.post_status = 'publish'
				AND p.post_date_gmt < NOW()
 			GROUP BY tr.object_id
			ORDER BY count DESC, p.post_date_gmt DESC
			LIMIT $limit;";
		$related = $wpdb->get_results($q);
 		if ( $related ) {
			foreach($related as $r) {
				$retval .= '<li><a title="'.wptexturize($r->post_title).'" href="'.get_permalink($r->ID).'">'.wptexturize($r->post_title).'</a></li>';
			}
		} else {
			$retval .= '
	<li>No related posts found</li>';
		}
		$retval .= '</ul>';
		return $retval;
	}
	return;
}
add_shortcode('related_posts', 'related_posts_shortcode');
```

Используем так: `[related_posts]`

### Как добавить кнопку вызова шорткодов в редактор?

И последнее. Если вы часто и много используете шорткоды, то будет полезным добавить в редактор постов кнопку вызова всех шорткодов. Это можно сделать так:

```php
add_action('media_buttons','add_sc_select',11);
function add_sc_select(){
    global $shortcode_tags;
     /* ------------------------------------- */
     /* enter names of shortcode to exclude bellow */
     /* ------------------------------------- */
    $exclude = array("wp_caption", "embed");
    echo ' <select id="sc_select"><option>Shortcode</option>';
    foreach ($shortcode_tags as $key => $val){
        if(!in_array($key,$exclude)){
            $shortcodes_list .= '<option value="['.$key.'][/'.$key.']">'.$key.'</option>';
            }
        }
     echo $shortcodes_list;
     echo '</select>';
}
add_action('admin_head', 'button_js');
function button_js() {
    echo '<script type="text/javascript">
    jQuery(document).ready(function(){
       jQuery("#sc_select").change(function() {
              send_to_editor(jQuery("#sc_select :selected").val());
                  return false;
        });
    });
    </script>';
}
```

Это позволит не набирать шорткоды на клавиатуре, а просто выбрать из выпадающего списка.

Еще несколько шорткодов вы можете найти на сайтах [wp-info](http://www.wp-info.ru/shortkody-wordpress/ "wp-info шорткоды"), [n-wp](http://n-wp.ru/tag/shortcode "n-wp") (на русском) и [wp.tutsplus](http://wp.tutsplus.com/articles/general/resource-roundup-20-creative-shortcodes-to-use-in-your-projects/ "wp.tutsplus") (на английском).

Кстати, статья участвует в конкурсе «[**TOP-10**](http://shelvin.ru/konkurs-top-10)» от Сергея Шелвина с призовым фондом в **500$!** Все участники получат инвайт на [MarkDay.ru](http://markday.ru) – сообщество оптимизаторов, вебмастеров и манимейкеров.

[![MarkDay.ru – сообщество оптимизаторов, вебмастеров и манимейкеров](images/logo2.gif "MarkDay.ru – сообщество оптимизаторов, вебмастеров и манимейкеров")](http://markday.ru)
