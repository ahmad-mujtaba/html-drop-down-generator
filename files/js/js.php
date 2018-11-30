<?php

//ini_set('zlib.output_compression', 1);
ob_start("ob_gzhandler");
header('Content-type: application/javascript');
header('ETag: "' . md5("app.js") . '"');
header('Cache-Control: max-age=3600000, must-revalidate');

echo file_get_contents("jquery-3.3.1.min.js").
file_get_contents("prism.js").
file_get_contents("app.js");

ob_end_flush();



?>