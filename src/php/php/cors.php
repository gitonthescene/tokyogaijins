<?php
  define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT']);

  // See https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  function getRequestHeaders() {
    $headers = array();
    foreach($_SERVER as $key => $value) {
      if (substr($key, 0, 5) <> 'HTTP_') {
        continue;
      }
      $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
      $headers[$header] = $value;
    }
    return $headers;
  }

  $headers = getRequestHeaders();
  header( "Access-Control-Allow-Origin: ".$headers['Origin'] );
  header( "Access-Control-Allow-Credentials: true" );
  header( "Access-Control-Allow-Headers: x-requested-with, content-type" );
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') exit;
?>