<?php


header('Content-type: text/css');
header('ETag: "' . md5("style.css") . '"');
header('Cache-Control: max-age=3600000, must-revalidate');



echo file_get_contents("prism.css").file_get_contents("style.css");



?>