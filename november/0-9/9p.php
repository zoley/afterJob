<?php
    header('Content-type:text/json'); 
    $id=$_GET["id"];
    $name=$_GET["name"];
    $json="{$id},{$name}";
    echo $json;
?>