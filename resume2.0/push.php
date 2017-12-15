<?php 
	$urls = array(
	    'http://www.zoley.me',
	    'http://www.zoley.me/blog.php',
	    'http://www.zoley.me/article/1',
	    'http://www.zoley.me/article/2',
	    'http://www.zoley.me/article/3',
	    'http://www.zoley.me/article/4',
	    'http://www.zoley.me/article/5',
	    'http://www.zoley.me/article/6',
	    'http://www.zoley.me/article/7',
	    'http://www.zoley.me/article/8',
	    'http://www.zoley.me/2/2048',
	    'http://www.zoley.me/2/mplayer',
	    'http://www.zoley.me/2/canvasbg',
	    'http://www.zoley.me/2/egg',
	    'http://www.zoley.me/2/fish',
	    'http://www.zoley.me/2/jsonp',
	    'http://www.zoley.me/2/lottery',
	    'http://www.zoley.me/2/niudan',
	    'http://www.zoley.me/2/picbomb',
	    'http://www.zoley.me/2/rich',
	    'http://www.zoley.me/2/taobao',
	    'http://www.zoley.me/2/xinbahou',
	    'http://www.zoley.me/2/yaojiang'
	);
	$api = 'http://data.zz.baidu.com/urls?site=www.zoley.me&token=CL1XA4UPNqYfG0fO';
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