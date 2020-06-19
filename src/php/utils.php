<?php

  function getFileContents( $fname ) {
    $f = fopen($fname , "r");
    if(!$f) {
       error_log("Couldn't $fname");
       return;
    }
    $contents = fread($f, filesize($fname));
    fclose($f);
    return $contents;
  }

  function getJsonFromFile( $fname ) {
    $jsonString = getFileContents( $fname );
    return json_decode( $jsonString );
  }

?>
