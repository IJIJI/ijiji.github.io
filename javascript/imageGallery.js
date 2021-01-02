$('.galleryRow').each(function() { // the containers for all your galleries
  $(this).magnificPopup({
      // Delay in milliseconds before popup is removed
      removalDelay: 200,

      // Class that is added to popup wrapper and background
      // make it unique to apply your CSS animations just to this exact popup
      mainClass: 'mfp-fade',

      delegate: 'a', // the selector for gallery item
      type: 'image',
      gallery: {
        tPrev: 'Previous (Left arrow key)', // title for left button
        tNext: 'Next (Right arrow key)', // title for right button
        tCounter: '<span class="mfp-counter">%curr% of %total%</span>', // markup of counter
        enabled:true
      },
      zoom: {
        enabled: false, // By default it's false, so don't forget to enable it
        duration: 200, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function
      },
      type: 'image'
  });
});