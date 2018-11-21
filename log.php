<?php


if(isset($_POST["code"])) {


    $data = $_POST["code"];
    $fp = fopen("LOG", "a+");
    fwrite($fp, $_POST["code"] . "\r\n");

    http_response_code(201);
    header("Content-type: application/json");
    echo json_encode(array("status" => "ok"));

}

?>