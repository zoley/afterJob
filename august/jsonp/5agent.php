<?php
	header('Content-type:text/html; charset="utf-8"');
	$url="http://music.163.com/api/playlist/detail?id=";
	if(!empty($_GET["id"])){
		$url .= $_GET["id"];//.=连续定义变量 $a='abc'; $a.='def'; 此时$a=‘abcdef'
	}
	echo file_get_contents($url);

?>
