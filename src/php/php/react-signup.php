<?php
  define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
  header( "Content-type: application/json" );

  include_once( ROOT_PATH.'/php/cors.php' );
  print json_encode( array( "ok" => true ) );

?>
