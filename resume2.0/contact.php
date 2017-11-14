
<?php
	$dbh = new PDO('mysql:host=bdm259768226.my3w.com;dbname=bdm259768226_db', 'bdm259768226', '123222qwer');  
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
	$dbh->exec('set names utf8'); 
	if($_POST['zan']){
		$sql = "UPDATE `message` SET `zan`=:zan WHERE `id`=:id";  
		$stmt = $dbh->prepare($sql);  
		$stmt->execute(array(':zan'=>$_POST['zan'], ':id'=>$_POST['id']));  
		echo $stmt->rowCount(); 
	}
	if($_POST['view']){
		$sql = "UPDATE `message` SET `view`=:view WHERE `id`=:id";  
		$stmt = $dbh->prepare($sql);  
		$stmt->execute(array(':view'=>$_POST['view'], ':id'=>$_POST['id']));  
		echo $stmt->rowCount(); 
	}
?>


