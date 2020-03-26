<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
<link rel="icon" href="/favicon.ico" type="image/x-icon">
<meta name="description" content="Tokyo Gaijins - Ski Snowboard Outdoor Sports Leisure Recreation Parties Social International Club - Japan. Join the international community! Meet people from Japan and all over the world.">
<meta name="keywords" content="tokyo, ski, snowboard, outdoor, sports, leisure, recreation, parties, social, international, club, group, events, japan, snow, activities">
<meta name="google-site-verification" content="pWOFtgbfKny6NrFyFWgSP6s6pp8shpkwitYZfzcxR1A" />
<?php
  define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
  include(ROOT_PATH.'/variables/variables.php');
 ?>
<title><?php echo $heading ?> | Skiing Snowboarding Outdoor Sports Travel Leisure Recreation and Party Events</title>
<link rel="profile" href="https://gmpg.org/xfn/11" />
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<link href="/css/bootstrap.css" rel="stylesheet">
<link href="/css/font-awesome.css" rel="stylesheet">
<script src="/js/bootstrap.min.js"></script>
<link href="/style.css" rel="stylesheet">
<!-- script src="main-slider/js/modernizr.js"></script -->
<script src="lib/jquery.js"></script>
<script src="lib/jquery.scrollbar.js"></script>
<style type="text/css" id="css-common">
            /*************** SCROLLBAR BASE CSS ***************/
            .scroll-wrapper {
                overflow: hidden !important;
                padding: 0 !important;
                position: relative;
            }
            .scroll-wrapper > .scroll-content {
                border: none !important;
                box-sizing: content-box !important;
                height: auto;
                left: 0;
                margin: 0;
                max-height: none !important;
                max-width: none !important;
                overflow: scroll !important;
                padding: 0;
                position: relative !important;
                top: 0;
                width: auto !important;
            }
            .scroll-wrapper > .scroll-content::-webkit-scrollbar {
                height: 0;
                width: 0;
            }
            .scroll-element {
                display: none;
            }
            .scroll-element, .scroll-element div {
                box-sizing: content-box;
            }
            .scroll-element.scroll-x.scroll-scrollx_visible,
            .scroll-element.scroll-y.scroll-scrolly_visible {
                display: block;
            }
            .scroll-element .scroll-bar,
            .scroll-element .scroll-arrow {
                cursor: default;
            }
            .scroll-textarea {
                border: 1px solid #cccccc;
                border-top-color: #999999;
            }
            .scroll-textarea > .scroll-content {
                overflow: hidden !important;
            }
        </style>
<script>
		jQuery(document).ready(function($) {
			$(window).scroll(function(){
  var sticky = $('.sticky'),
      scroll = $(window).scrollTop();
  if (scroll >= 135) sticky.addClass('fixed');
  else sticky.removeClass('fixed');
});
});
	
</script>
<script type="text/javascript">
		jQuery(document).ready(function($) {
			var $scrolltotop = $("#scrolltotop");
			$scrolltotop.css('display', 'none');
			$(function () {
				$(window).scroll(function () {
					if ($(this).scrollTop() > 100) {
						$scrolltotop.slideDown('fast');
					} else {
						$scrolltotop.slideUp('slow');
					}
				});
		
				$scrolltotop.click(function () {
					$('body,html').animate({
						scrollTop: 0
					}, 'fast');
					return false;
				});
			});
		});
	</script>
<script type="text/javascript">
   $(document).ready(function() {
            $('img').css('opacity', 1);
            // when hover over the selected image change the opacity to 1
            $('li').hover(
               function(){
                  $(this).find('img').stop().fadeTo('slow', 0.5);
               },
               function(){
                  $(this).find('img').stop().fadeTo('slow', 1);
               });
            });
</script>
<script type="text/javascript" src="js/carousels.js"></script>

</head>
<body>

 <div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.11&appId=695744920586548';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<?php
  //  THIS IS WHERE THE REACT ELEMENT LIVES!!
  define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
  include(ROOT_PATH.'/header.php');
  
  $doc = new DOMDocument();
  $doc->loadHTMLFile( 'index.html' );
//  $body = $doc->getElementsByTagName( 'body' );
//  foreach ( $body[0]->childNodes as $child ) {
//     echo $doc->saveHTML( $child );
//  }
  $body = $doc->getElementsByTagName( 'body' );
  $chldrn = $body->item(0)->childNodes;
  for ( $i = 0; $i < $chldrn->length; $i++ ) {
     echo $doc->saveHTML( $chldrn->item($i) );
  }
  include(ROOT_PATH.'/footer.php');  
 ?>
</body>
</html>
