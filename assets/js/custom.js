  //Sticky Header 
  function updateScroll() {
    if ($(window).scrollTop() >= 80) {
      $(".sw-header").addClass('sticky');
    } else {
      $(".sw-header").removeClass("sticky");
    }
  }
  $(function () {
    $(window).scroll(updateScroll);
    updateScroll();
  });

//Header mega menu
  var $nav = $('li.megamenu');
  $nav.hover(
    function () {
      $(this).addClass('hover');
    },
    function () {
      $(this).removeClass('hover');
    }
);



 //Video magnificPopup
 $('.video-play').magnificPopup({
  type: 'iframe',
  mainClass: 'mfp-fade',
  removalDelay: 160,
});



//Background image ------------------
$("[data-background]").each(function () {
  $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
})



//back to top
var progressPath = document.querySelector('.progress-wrap path');
var pathLength = progressPath.getTotalLength();
progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
progressPath.style.strokeDashoffset = pathLength;
progressPath.getBoundingClientRect();
progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
var updateProgress = function () {
  var scroll = $(window).scrollTop();
  var height = $(document).height() - $(window).height();
  var progress = pathLength - (scroll * pathLength / height);
  progressPath.style.strokeDashoffset = progress;
}
updateProgress();
$(window).scroll(updateProgress);	
var offset = 50;
var duration = 550;
jQuery(window).on('scroll', function() {
  if (jQuery(this).scrollTop() > offset) {
    jQuery('.progress-wrap').addClass('active-progress');
  } else {
    jQuery('.progress-wrap').removeClass('active-progress');
  }
});				
jQuery('.progress-wrap').on('click', function(event) {
  event.preventDefault();
  jQuery('html, body').animate({scrollTop: 0}, duration);
  return false;
})	




      
      