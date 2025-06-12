

// Enhanced CSS animations and interactions
class EnhancedAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.addScrollEffects();
        this.addParallaxEffects();
        this.addTextAnimations();
        this.addResponsiveDetection();
    }
    
    addScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Update water flow based on scroll
            document.documentElement.style.setProperty('--scroll-y', scrollY);
            
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }
    
    addParallaxEffects() {
        const glassPanels = document.querySelectorAll('.glass-panel');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            glassPanels.forEach((panel, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                
                panel.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
            });
        });
    }
    
    addTextAnimations() {
        const mainText = document.querySelector('.main-text');
        
        if (mainText) {
            // Add wave effect to text on hover
            mainText.addEventListener('mouseenter', () => {
                mainText.style.animation = 'textWaterFlow 3s ease-in-out infinite, textWave 2s ease-in-out';
            });
            
            mainText.addEventListener('mouseleave', () => {
                mainText.style.animation = 'textWaterFlow 12s ease-in-out infinite';
            });
        }
    }
    
    addResponsiveDetection() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Disable cursor effects on mobile
            document.body.style.cursor = 'auto';
            const cursor = document.getElementById('cursor');
            if (cursor) cursor.style.display = 'none';
            
            // Add touch ripple effects
            document.addEventListener('touchstart', (e) => {
                if (e.touches.length > 0) {
                    const touch = e.touches[0];
                    this.createTouchRipple(touch.clientX, touch.clientY);
                }
            });
        }
    }
    
    createTouchRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(173, 216, 230, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x - 50}px;
            top: ${y - 50}px;
            animation: touchRipple 1s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
    }
}

// Add additional CSS animations with darker river theme
const additionalStyles = `
    @keyframes textWave {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes touchRipple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .bubble {
        animation: floatUp linear infinite, bubbleDrift 8s ease-in-out infinite;
        background: radial-gradient(circle at 30% 30%, 
            rgba(40, 80, 120, 0.6) 0%,
            rgba(25, 50, 80, 0.4) 30%,
            rgba(15, 30, 60, 0.3) 70%,
            transparent 100%) !important;
        border: 1px solid rgba(60, 100, 140, 0.3) !important;
        box-shadow: 
            inset 0 1px 0 rgba(80, 120, 160, 0.2),
            0 4px 20px rgba(20, 40, 70, 0.3) !important;
    }
    
    @keyframes bubbleDrift {
        0%, 100% { transform: translateX(0px); }
        25% { transform: translateX(var(--drift, 0px)); }
        75% { transform: translateX(calc(var(--drift, 0px) * -0.5)); }
    }
    
    /* Override body background for darker river theme */
    body {
        background: 
            radial-gradient(ellipse at top left, rgba(15, 30, 60, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at bottom right, rgba(20, 40, 70, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at center, rgba(10, 25, 50, 0.2) 0%, transparent 70%),
            linear-gradient(135deg, 
                #000811 0%,
                #001122 20%,
                #002233 40%,
                #003344 60%,
                #004455 80%,
                #1a3d5c 100%) !important;
    }
    
    /* Darker glass panels */
    .glass-panel {
        background: linear-gradient(135deg,
            rgba(40, 80, 120, 0.08) 0%,
            rgba(25, 50, 80, 0.04) 50%,
            rgba(15, 35, 60, 0.06) 100%) !important;
        border: 1px solid rgba(60, 100, 140, 0.15) !important;
        box-shadow: 
            0 15px 35px rgba(10, 25, 50, 0.2),
            inset 0 1px 0 rgba(80, 120, 160, 0.15) !important;
    }
    
    /* Darker water overlay */
    .water-overlay {
        background: 
            radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(40, 80, 120, 0.15) 0%, 
                rgba(25, 50, 80, 0.1) 20%,
                rgba(15, 35, 60, 0.08) 40%,
                transparent 60%),
            radial-gradient(circle at calc(var(--mouse-x, 50%) + 30%) calc(var(--mouse-y, 50%) - 20%), 
                rgba(30, 60, 90, 0.12) 0%, 
                rgba(20, 40, 70, 0.08) 25%,
                transparent 50%),
            radial-gradient(circle at calc(var(--mouse-x, 50%) - 25%) calc(var(--mouse-y, 50%) + 15%), 
                rgba(35, 70, 100, 0.1) 0%, 
                rgba(15, 30, 60, 0.06) 30%,
                transparent 60%) !important;
    }
    
    .water-overlay::before {
        background: 
            linear-gradient(45deg, 
                rgba(60, 100, 140, 0.08) 0%, 
                transparent 25%, 
                transparent 75%, 
                rgba(40, 80, 120, 0.06) 100%),
            linear-gradient(-45deg, 
                transparent 0%, 
                rgba(25, 50, 80, 0.08) 25%, 
                rgba(15, 35, 60, 0.05) 75%, 
                transparent 100%) !important;
        border: 1px solid rgba(60, 100, 140, 0.1) !important;
    }
    
    /* Darker flowing water effect */
    .water-flow {
        background: 
            repeating-linear-gradient(
                90deg,
                transparent 0px,
                rgba(40, 80, 120, 0.02) 1px,
                transparent 3px
            ),
            repeating-linear-gradient(
                180deg,
                transparent 0px,
                rgba(25, 50, 80, 0.015) 2px,
                transparent 6px
            ) !important;
    }
    
    /* Enhanced navigation for dark theme */
    .navigation {
        background: rgba(20, 40, 70, 0.12) !important;
        border-bottom: 1px solid rgba(60, 100, 140, 0.15) !important;
        box-shadow: 0 8px 32px rgba(10, 25, 50, 0.25) !important;
    }
    
    .nav-links a {
        background: rgba(40, 80, 120, 0.08) !important;
        border: 1px solid rgba(60, 100, 140, 0.25) !important;
        box-shadow: 
            0 4px 20px rgba(10, 25, 50, 0.15),
            inset 0 1px 0 rgba(80, 120, 160, 0.1) !important;
    }
    
    .nav-links a:hover {
        background: rgba(40, 80, 120, 0.15) !important;
        border-color: rgba(60, 100, 140, 0.4) !important;
        box-shadow: 
            0 10px 30px rgba(10, 25, 50, 0.3),
            inset 0 1px 0 rgba(80, 120, 160, 0.2) !important;
    }
    
    /* Enhanced timestamp */
    .timestamp {
        background: rgba(40, 80, 120, 0.08) !important;
        border: 1px solid rgba(60, 100, 140, 0.15) !important;
        box-shadow: 
            0 8px 32px rgba(10, 25, 50, 0.2),
            inset 0 1px 0 rgba(80, 120, 160, 0.15) !important;
    }
    
    /* Darker gradient overlay */
    .gradient-overlay {
        background: 
            radial-gradient(ellipse at top left, 
                rgba(40, 80, 120, 0.08) 0%,
                transparent 50%),
            radial-gradient(ellipse at bottom right, 
                rgba(25, 50, 80, 0.06) 0%,
                transparent 50%),
            radial-gradient(ellipse at center, 
                rgba(15, 35, 60, 0.04) 0%,
                transparent 70%) !important;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize cursor effects on non-mobile devices
    if (window.innerWidth > 768) {
        new WaterCursor();
    }
    
    new EnhancedAnimations();
});

// Handle window resize
// Glitch text effect on scroll
const glitchElements = document.querySelectorAll('.glitch-text');

function isVisible(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
}

function handleScroll() {
  glitchElements.forEach(el => {
    if (isVisible(el)) el.classList.add('glitch-active');
    else el.classList.remove('glitch-active');
  });
}

window.addEventListener('scroll', handleScroll);
handleScroll();

let lastScrollY = window.scrollY;
const nav = document.querySelector('.navigation');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollY && currentScroll > 100) {
    nav.classList.add('nav-hidden'); // Scroll down = hide nav
  } else {
    nav.classList.remove('nav-hidden'); // Scroll up = show nav
  }

  lastScrollY = currentScroll;
});



const lazyVideos = document.querySelectorAll("video");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const video = entry.target;
      const sources = video.querySelectorAll("source");
      sources.forEach(source => {
        source.src = source.dataset.src;
      });
      video.load();
      observer.unobserve(video);
    }
  });
}, { threshold: 0.25 });

lazyVideos.forEach(video => {
  const sources = video.querySelectorAll("source");
  sources.forEach(source => {
    source.dataset.src = source.src;
    source.src = "";
  });
  observer.observe(video);
});

// --- COMMITTEES CANVAS ANIMATION ---

const committeeNames = [
  "Technical Committee",
  "Events Committee",
  "Public Relations (PR) Committee"
];

const committeeCanvas = document.getElementById("committeeCanvas");
const committeeCtx = committeeCanvas.getContext("2d");

function resizeCommitteeCanvas() {
  committeeCanvas.width = window.innerWidth;
  committeeCanvas.height = window.innerHeight;
}
resizeCommitteeCanvas();
window.addEventListener('resize', resizeCommitteeCanvas);

// Helper: get scroll progress inside committees-section (0...1)
function getCommitteeScrollProgress() {
  const section = document.querySelector('.committees-section');
  const rect = section.getBoundingClientRect();
  const totalHeight = rect.height - window.innerHeight;
  const scrolled = -rect.top;
  return Math.min(Math.max(scrolled / totalHeight, 0), 1);
}

function drawCommittees(progress) {
  committeeCtx.clearRect(0, 0, committeeCanvas.width, committeeCanvas.height);

  const perCommittee = 1 / committeeNames.length;

  for (let i = 0; i < committeeNames.length; i++) {
    const start = i * perCommittee;
    const end = (i + 1) * perCommittee;
    const relProgress = (progress - start) / perCommittee;

    // Only draw if in visible range
    if (relProgress > -0.25 && relProgress < 1.25) {
      // Animate Y position and fade
      const centerY = committeeCanvas.height / 2 + (relProgress - 0.5) * committeeCanvas.height * 0.8;
      committeeCtx.save();
      let opacity = 1 - Math.abs(relProgress - 0.5) * 2;
      opacity = Math.max(0, opacity);
      committeeCtx.globalAlpha = opacity;

      committeeCtx.font = "bold 48px Orbitron, Arial, sans-serif";
      committeeCtx.fillStyle = "white";
      committeeCtx.textAlign = "center";
      committeeCtx.shadowColor = 'rgba(0,0,0,0.6)';
      committeeCtx.shadowBlur = 18;
      committeeCtx.fillText(committeeNames[i], committeeCanvas.width / 2, centerY);
      committeeCtx.restore();
    }
  }
}

function animateCommittees() {
  // Only animate when committees-section is at least partially on screen
  const section = document.querySelector('.committees-section');
  const rect = section.getBoundingClientRect();
  if (rect.bottom > 0 && rect.top < window.innerHeight) {
    const progress = getCommitteeScrollProgress();
    drawCommittees(progress);
  } else {
    committeeCtx.clearRect(0, 0, committeeCanvas.width, committeeCanvas.height);
  }
  requestAnimationFrame(animateCommittees);
}
animateCommittees();

document.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - 200) + 'px';
    ripple.style.top = (e.clientY - 200) + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    }, 3000);
});

