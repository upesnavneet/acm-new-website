let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.classList.add('hide');
  } else {
    // Scrolling up
    navbar.classList.remove('hide');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

//

const section = document.getElementById('robot-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const rect = entry.target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Simulate a mouse move event to the center of the section
      const fakeMouseEvent = new MouseEvent('mousemove', {
        clientX: centerX,
        clientY: centerY,
        bubbles: true
      });

      // Dispatch it to the window
      window.dispatchEvent(fakeMouseEvent);
    }
  });
}, {
  threshold: 0.6 // Adjust this if you want it to trigger sooner or later
});

// Start observing
observer.observe(section);

//

