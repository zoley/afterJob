<?php
    $urls = array(
        'http://zoley.me',
	    'http://zoley.me/blog.php',
	    'http://zoley.me/article/1',
	    'http://zoley.me/article/2',
	    'http://zoley.me/article/3',
	    'http://zoley.me/article/4',
	    'http://zoley.me/article/5',
	    'http://zoley.me/article/6',
	    'http://zoley.me/article/7',
	    'http://zoley.me/article/8',
	    'http://zoley.me/2/2048',
	    'http://zoley.me/2/mplayer',
	    'http://zoley.me/2/canvasbg',
	    'http://zoley.me/2/egg',
	    'http://zoley.me/2/fish',
	    'http://zoley.me/2/jsonp',
	    'http://zoley.me/2/lottery',
	    'http://zoley.me/2/niudan',
	    'http://zoley.me/2/picbomb',
	    'http://zoley.me/2/rich',
	    'http://zoley.me/2/taobao',
	    'http://zoley.me/2/xinbahou',
	    'http://zoley.me/2/yaojiang'
    );
    $api = 'http://data.zz.baidu.com/urls?site=zoley.me&token=CL1XA4UPNqYfG0fO';
    $ch = curl_init();
    $options =  array(
        CURLOPT_URL => $api,
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => implode("\n", $urls),
        CURLOPT_HTTPHEADER => array('Content-Type: text/plain'),
    );
    curl_setopt_array($ch, $options);
    $result = curl_exec($ch);
    echo $result;
?>