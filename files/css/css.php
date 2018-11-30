<?php

//ini_set('zlib.output_compression', 1);
ob_start("ob_gzhandler");
header('Content-type: text/css');
header('ETag: "' . md5("style.css") . '"');
header('Cache-Control: max-age=3600000, must-revalidate');



echo file_get_contents("prism.css").file_get_contents("style.css");

ob_end_flush();



?>