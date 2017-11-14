<?php
		$dbh = new PDO('mysql:host=bdm259768226.my3w.com;dbname=bdm259768226_db', 'bdm259768226', '123222qwer');  
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
		$dbh->exec('set names utf8'); 


		// $sql = "SELECT * FROM `message` WHERE `view`=:view ";  
		// $stmt = $dbh->prepare($sql);  
		// $stmt->execute(array(':view'=>$view));
		// $arr=array();
		// while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
		// 	$arr[]=$row; 
		// }
		// echo "<pre>";
		// print_r ($arr);
		// echo "</pre>";
		

		$id = $_REQUEST['id'];

		$sql="SELECT * FROM message where id = " . $id; 
		$arr=Array(); 
		foreach($dbh->query($sql) as $row){  
			$arr[]=$row['view'];  
		}
		
		header("Content-type: text/json");
		echo json_encode($arr);
?>