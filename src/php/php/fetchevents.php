<?php
  define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
  header( "Content-type: application/json" );

  include_once( ROOT_PATH.'/php/cors.php' );
  include_once( ROOT_PATH.'/utils.php' );

  $jsonString = getFileContents( "fetchevents.json" );
  echo $jsonString;
?>
