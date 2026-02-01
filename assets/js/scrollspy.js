
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#navbar-example2',
  offset: 100
})





//timer
const countdownEl = document.getElementById('countdown');
// Set the timer for 1 hour, 30 minutes, and 20 seconds (in seconds)
let timeLeft = 1 * 60 * 60 + 30 * 60 + 20;

// Update the countdown every second
const timer = setInterval(() => {
  // Calculate the hours, minutes, and seconds left
  const hoursLeft = Math.floor(timeLeft / 3600);
  const minutesLeft = Math.floor((timeLeft % 3600) / 60);
  const secondsLeft = timeLeft % 60;

  // Display the countdown
  countdownEl.textContent = `${hoursLeft.toString()}h : ${minutesLeft.toString().padStart(2, '0')}m : ${secondsLeft.toString().padStart(2, '0')}s`;

  // Decrement the time left
  timeLeft--;

  // Stop the timer when the countdown reaches 0
  if (timeLeft < 0) {
    clearInterval(timer);
    countdownEl.textContent = "Time's up!";
  }
}, 1000);




//sliders

//training
$(window).on("load", function () {
  $('.prdtslider').owlCarousel({   
    nav: true,
    navText : ["<i class='fas fa-arrow-left'></i>","<i class='fas fa-arrow-right'></i>"],
    dots: false,
    autoplay: false,
    loop: true,      
    margin: 30,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoHeight: true,
    smartSpeed: 2000,   
   responsive: {
    0: {
      items: 1
    },
    520: {
      items: 1
    },
    768: {
      items: 1
    },
    1200: {
      items: 3
    },
    1400: {
      items: 3
    },
    1600: {
      items: 3
    },
  }
});
});


//review
$(window).on("load", function () {
  $('.review-row-trnn').owlCarousel({   
    nav: false,   
    dots: true,
    autoplay: false,
    loop: true,      
    margin: 30,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoHeight: true,
    smartSpeed: 2000,   
    responsive: {
    0: {
      items: 1
    },
    520: {
      items: 1
    },
    768: {
      items: 1
    },
    1200: {
      items: 3
    },
    1400: {
      items: 3
    },
    1600: {
      items: 3
    },
  }
});
});

