<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<meta name="keywords" content="个人博客,个人小站,主成睿" />
	<meta name="description" content="主成睿的个人小站">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<title>随笔小站</title>
	<link rel="shortcut icon" type="image/x-icon" href="img/ico.ico">
	<link rel="stylesheet" href="css/bootstrap.css">
	<link rel="stylesheet" href="css/blog.css">
</head>
<body>
	<div class="bg"></div>
	<header id="head">
		<div class="motto">
			<span>入不言兮出不辞，乘回风兮载云旗。</span>
			<span>悲莫悲兮生别离，乐莫乐兮新相知。</span>
		</div>
		<div class="line"></div>
	</header>
	<div class="btn">
		<div class="icon"></div>
	</div>
	<div id="nav">
		<div class="photo"></div>
		<ul>
			<li><a href="http://zoley.me">主页<i></i></a></li>
			<li><a class="active" href="http://zoley.me/blog.php">博客<i></i></a></li>
			<li><a href="http://cv.qiaobutang.com/r/5936c0b30cf22e28dc285c63">简历<i></i></a></li>
		</ul>
		<div class="email">zole1314@163.com</div>
	</div>
	<div class="mask"></div>
	<div class="container">
		<div class="con-left fl">
		<?php
		$dbh = new PDO('mysql:host=bdm259768226.my3w.com;dbname=bdm259768226_db', 'bdm259768226', '123222qwer');  
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
		$dbh->exec('set names utf8'); 


		$sql = "SELECT * FROM `message` order by id desc"; 
		$stmt = $dbh->prepare($sql);  
		$stmt->execute(array(':1'=>1));  
		// $arr=array();
		while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			
			// $arr[]=$row; 
		// }
		// echo "<pre>";
		// print_r ($arr);
		// echo "</pre><br>";
		?>
            <div class="article">
                <div class="pic fl">
                    <a href="<?php echo $row['url'];?>"><span><img src="<?php echo $row['img'];?>"></span></a>
                </div>
                <div class="words fr">
                    <h2><a href="<?php echo $row['url'];?>"><?php echo $row['title'];?></a></h2>
                    <p class="detail"><span><?php echo $row['content'];?></span><a href="<?php echo $row['url'];?>">[阅读全文]</a></p>
                    <p class="author">
                        <span class="skill"><a href="#"><?php echo $row['skill'];?></a></span>
                        <span class="date"><?php echo $row['date'];?></span>
                        <span class="view">浏览（<b><?php echo $row['view'];?></b>）</span>
                        <span class="zan" data-num="<?php echo $row['id'];?>"><b><?php echo $row['zan'];?></b><i>+1</i></span>
                    </p>
                </div>
            </div>  
        <?php }?> 

		</div>
		<div class="con-middle fl hidden-xs"></div>
		<div class="con-right fr hidden-xs">
			<div class="pardon">
				<div class="photo"></div>
				<h1>zole</h1>
				<div class="email">zole1314@163.com</div>
				<ul class="clearfix">
					<li><a href="http://zoley.me">主页</a></li>
					<li><a class="active" href="http://zoley.me/blog.php">博客</a></li>
					<li><a href="http://cv.qiaobutang.com/r/5936c0b30cf22e28dc285c63">简历</a></li>
				</ul>
			</div>
			<div class="clock">
				<embed src="./swf/clock.swf" wmode="transparent"/>
			</div>
			<div style="width: 140px;height: 140px;margin:0 auto;"><canvas id="cnss" width="140" height="140"></canvas></div>
		</div>
	</div>
	<div id="up"></div>
	<footer>
		<p>Copyright&copy;2017<a href="http://www.miitbeian.gov.cn/">&nbsp;苏ICP备17035373号</a>&nbsp;All Rights Reserved&nbsp;Design by zole</p>
	</footer>
	<canvas id="canvas"></canvas>
	<script src="js/jquery.min.js"></script>
	<script src="js/move.min.js"></script>
	<script src="js/canvasStar.js"></script>
	<script src="js/blog.js"></script>
	<script>
		(function(){
			var bp = document.createElement('script');
			var curProtocol = window.location.protocol.split(':')[0];
			if (curProtocol === 'https') {
				bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
			}
			else {
				bp.src = 'http://push.zhanzhang.baidu.com/push.js';
			}
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(bp, s);
		})();
	</script>
</body>
</html>