/*** accordion.js: script for collapsing divs in #experience ***/


$(document).ready(function($) {
    $('#accordion').find('.accordion-toggle').click(function(){

      //Expand or collapse this panel
      $(this).next().slideToggle('fast');

      //Hide the other panels
      $(".accordion-content").not($(this).next()).slideUp('fast');

	  var el = $(this);
	  if (el.text() == el.data("text-swap")) {
	    el.text(el.data("text-original"));
	  } else {
	    el.data("text-original", el.text());
	    el.text(el.data("text-swap"));
	  }

    });
  });