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

const slides = document.querySelectorAll('.slide');
const buttons = document.querySelectorAll('.slider-button');
const title = document.getElementById('event-title');
const desc = document.getElementById('event-desc');

const slideData = [
  {
    title: "Orientation Day",
    desc: "Welcoming new members with an insight into ACM's vision and past achievements."
  },
  {
    title: "Hackathon 3.0",
    desc: "An intense 24-hour coding event to foster creativity and innovation."
  },
  {
    title: "TechTalks",
    desc: "Inviting industry experts to share insights on the future of AI and tech."
  },
  {
    title: "Project Showcase",
    desc: "Members presented their projects in front of a live audience and jury."
  },
  {
    title: "Valorant Tournament",
    desc: "A fun and competitive gaming evening for all tech enthusiasts."
  }
];

buttons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    slides.forEach(s => s.classList.remove('active'));
    buttons.forEach(b => b.classList.remove('active'));

    slides[index].classList.add('active');
    btn.classList.add('active');
    title.textContent = slideData[index].title;
    desc.textContent = slideData[index].desc;
  });
});

//
document.addEventListener("DOMContentLoaded", function () {
    const fadeSections = document.querySelectorAll("section");

    fadeSections.forEach(section => {
      section.classList.add("fade-in-section");
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible"); // fade out on scroll up
        }
      });
    }, {
      threshold: 0.1
    });

    fadeSections.forEach(section => observer.observe(section));
  });