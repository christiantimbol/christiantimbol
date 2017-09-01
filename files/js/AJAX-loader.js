
/***** AJAX-loader.js = loads AJAX content for Portfolio *****/

jQuery(window).load(function($) {	
	
	var activeproject = false;
	
	jQuery("body").on("click", 'a.load-content', function() {
		
		var scrolltop = jQuery('header').height() - 1;
		var url = jQuery(this).attr('href');
		
		if (!activeproject) { 
			jQuery( ".ajax-section" ).slideDown(500); 
			loadcontent(url); 
		} else if (activeproject == url) {
			jQuery('html,body').animate({ 
				scrollTop: jQuery( ".ajax-section" ).offset().top-scrolltop
			}, 700, 'easeOutQuart');
		} else {
			var i = 0; // Safari bug fix when scrolling + callback 
			jQuery('html,body').animate({ 
				scrollTop: jQuery( ".ajax-section" ).offset().top-scrolltop
			}, 500, 'easeOutQuart', function() {
				if (i == 0) { // Safari bug fix when scrolling + callback 
					var currentheight = jQuery( ".ajax-section" ).height();
					jQuery( ".ajax-section" ).css({ 'min-height' : currentheight+'px' });
					jQuery( '.close-project' ).fadeOut(500);
					jQuery( "#portfolio-single .project-title" ).animate({ 'top': '-60px'}, 600, 'easeOutQuart');
					jQuery( "#portfolio-single .social-share li" ).animate({ top: '-30px'}, 600, 'easeOutQuart'); // reenable in CSS and input into HTMLs
					jQuery( "#portfolio-single .entry-media" ).animate({ 'top': '60px'}, 600, 'easeOutQuart');
					jQuery( "#portfolio-single .entry-content" ).animate({ 'top': '60px'}, 600, 'easeOutQuart');
					jQuery( ".ajax-content" ).fadeOut(600, function(){
						loadcontent(url);
					});
				} // END i=0
				i++;
			});
		}
						
		return false;
	});
	
	function loadcontent(url){
		var scrolltop = jQuery('header').height() - 1;
		jQuery( ".ajax-content" ).load( url + ' #portfolio-single', function(response, status) {
			
			jQuery( ".ajax-content" ).css({opacity: 1});
			
			if (status == 'success') {
				
				if (!activeproject) { 
					jQuery( ".ajax-section #ajax-loader" ).css({ top: '0'});
					var i = 0; // Safari bug fix when scrolling + callback 
					jQuery('html,body').animate({ 
							scrollTop: jQuery( ".ajax-section" ).offset().top-scrolltop
						}, 700, 'easeOutQuart', function(){
							if (i == 0) { // Safari bug fix when scrolling + callback 
								jQuery( ".ajax-section #ajax-loader" ).fadeIn(500).delay(1000).fadeOut(500,function() {
									if(jQuery().fitVids) { 
										jQuery(".ajax-section").fitVids(); 
									}
									flexInit(".ajax-section");
									portfolioPreviewHide();
									jQuery( ".ajax-content" ).slideDown(700, 'easeOutQuart', function() { 
										setTimeout(portfolioShow, 200); 
									});
								});
							} // END i==0
						i++;
					});
				} else {
					jQuery( ".ajax-section #ajax-loader" ).css({ top: '70px'});
					jQuery( ".ajax-section #ajax-loader" ).fadeIn(500).delay(1000).fadeOut(500,function() {
						if(jQuery().fitVids) { 
							jQuery(".ajax-section").fitVids(); 
						}
						flexInit(".ajax-section");
						portfolioPreviewHide();
						jQuery( ".ajax-content" ).fadeIn(400, 'easeOutQuart', function() { 
							setTimeout(portfolioShow, 200); 
							jQuery( ".ajax-section" ).animate({ 
								'min-height' : '0'
							}, 700, 'easeOutQuart');
						});
					});
				}
				
				/*if (history.pushState) {
					history.pushState({page:url}, url, url);
				}*/

				activeproject = url;
		
			} // END if status
			
		});
	}
	
	
	jQuery("body").on("click", '.close-project a', function() {
		var url = jQuery(this).attr('href');
		var scrolltop = jQuery('header').height() - 1;
		
		jQuery( '.close-project' ).fadeOut(500);
		jQuery( ".ajax-content" ).animate({ opacity: 0}, 500, function() {
			jQuery( this ).slideUp(700, 'easeOutQuart', function() {
			  jQuery( ".ajax-content" ).empty(); 
			});
			jQuery( ".ajax-section" ).slideUp(700);
			jQuery('html,body').animate({ 
				scrollTop: jQuery( "#portfolio" ).offset().top-scrolltop
			}, 700, 'easeOutQuart');
		});
		
		/*if (history.pushState) {
			history.pushState({page:url}, url, url);
		}*/

		activeproject = false;
			
		return false;
	});
	
});


// Hides content areas
function portfolioPreviewHide(){ 
	
	jQuery( "#portfolio-single .project-title" ).css({ 'top': '-60px', opacity: 0 });
	jQuery( "#portfolio-single .social-share li" ).css({ top: '-30px', opacity: 0 });
	jQuery( "#portfolio-single .entry-media" ).css({ 'top': '60px', opacity: 0 });
	jQuery( "#portfolio-single .entry-content" ).css({ 'top': '60px', opacity: 0 });
	jQuery( "#portfolio-single .project-title .single-pagination .next").css({ 'left': '60%', opacity: 0 });
	jQuery( "#portfolio-single .project-title .single-pagination .prev").css({ 'left': '40%', opacity: 0 });
			
}
	
function portfolioShow(){
			
	jQuery( "#portfolio-single .project-title" ).animate({ 
		'top': '0', opacity: 1 
	}, 500, 'easeOutQuart');
		
	jQuery( ".social-share li" ).delay(400).each(function(index, element) {
		var delay = index*80;
		jQuery( this ).delay(delay).animate({ 
			'top': '0', opacity: 1 
		}, 500, 'easeOutBack');
	});
	
	// Shows slider
	jQuery( ".entry-media" ).delay(600).animate({ 
		'top': '0', opacity: 1 
	}, 500, 'easeOutQuart');
	
	// Shows content
	jQuery( ".entry-content" ).delay(1000).animate({ 
		'top': '0', opacity: 1 
	}, 500, 'easeOutQuart');
	
	// Shows + repositions the next and prev buttons
	var projectwidth = parseInt(jQuery(".project-title").width()/2);
	var titlewidth = parseInt(jQuery(".project-title .project-name").width()/2);
	var prevposition = projectwidth - titlewidth - 90;
	var nextposition = jQuery(".project-title").width() - prevposition - jQuery('.project-title .single-pagination .next a').width();
	if (jQuery(window).width() < 760) {
		var prevposition = -10;
		var nextposition = 280;
	}
	jQuery('.project-title .single-pagination .next').delay(200).animate({ 
		left: nextposition+'px', opacity: 1
	}, 600, 'easeOutBack');
	jQuery('.project-title .single-pagination .prev').delay(200).animate({ 
		left: prevposition+'px', opacity: 1
	}, 600, 'easeOutBack');
	
	// Shows the close icon
	jQuery( ".close-project" ).delay(1200).fadeIn(500);
					
}

/*

   	     _
     .__(.)< ("Quack. Don't mind me, I'm just a duck swimming on the source code")
      \___)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*/