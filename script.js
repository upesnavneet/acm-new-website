// Enhanced ACM Website Interactive Effects
class WaterCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.waterCanvas = document.getElementById('waterCanvas');
        this.waterOverlay = document.getElementById('waterOverlay');
        this.floatingBubbles = document.getElementById('floatingBubbles');
        
        this.mouse = { x: 0, y: 0 };
        this.cursorPos = { x: 0, y: 0 };
        this.particles = [];
        this.ripples = [];
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.bindEvents();
        this.createFloatingBubbles();
        this.animate();
        this.updateTimestamp();
        
        // Hide default cursor
        document.body.style.cursor = 'none';
    }
    
    setupCanvas() {
        this.ctx = this.waterCanvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        this.waterCanvas.width = window.innerWidth * dpr;
        this.waterCanvas.height = window.innerHeight * dpr;
        this.waterCanvas.style.width = window.innerWidth + 'px';
        this.waterCanvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(dpr, dpr);
    }
    
    bindEvents() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.updateWaterOverlay(e.clientX, e.clientY);
        });
        
        // Mouse clicks - create ripple effects
        document.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY);
            this.createParticles(e.clientX, e.clientY);
        });
        
        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .nav-links li');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursor.style.borderColor = 'rgba(173, 216, 230, 1)';
                this.cursor.style.background = 'radial-gradient(circle, rgba(173, 216, 230, 0.5) 0%, rgba(135, 206, 250, 0.2) 100%)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.borderColor = 'rgba(135, 206, 250, 0.8)';
                this.cursor.style.background = 'radial-gradient(circle, rgba(173, 216, 230, 0.3) 0%, rgba(135, 206, 250, 0.1) 100%)';
            });
        });
        
        // Touch events for mobile
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                this.createRipple(touch.clientX, touch.clientY);
            }
        });
    }
    
    updateWaterOverlay(x, y) {
        const xPercent = (x / window.innerWidth) * 100;
        const yPercent = (y / window.innerHeight) * 100;
        
        this.waterOverlay.style.setProperty('--mouse-x', `${xPercent}%`);
        this.waterOverlay.style.setProperty('--mouse-y', `${yPercent}%`);
    }
    
    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = x - 200 + 'px';
        ripple.style.top = y - 200 + 'px';
        
        document.body.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 3000);
        
        // Add to ripples array for canvas rendering
        this.ripples.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: 150,
            opacity: 1,
            speed: 2
        });
    }
    
    createParticles(x, y) {
        for (let i = 0; i < 12; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                life: 1,
                decay: 0.015,
                size: Math.random() * 3 + 1,
                color: `hsla(${200 + Math.random() * 40}, 60%, ${20 + Math.random() * 25}%, ${Math.random() * 0.4 + 0.2})`
            });
        }
    }
    
    createFloatingBubbles() {
        const createBubble = () => {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            const size = Math.random() * 80 + 20;
            const startX = Math.random() * window.innerWidth;
            const duration = Math.random() * 10 + 15;
            const delay = Math.random() * 5;
            
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = startX + 'px';
            bubble.style.animationDuration = duration + 's';
            bubble.style.animationDelay = delay + 's';
            
            // Add subtle horizontal drift
            const drift = (Math.random() - 0.5) * 100;
            bubble.style.setProperty('--drift', drift + 'px');
            
            this.floatingBubbles.appendChild(bubble);
            
            // Remove bubble after animation
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, (duration + delay) * 1000);
        };
        
        // Create initial bubbles
        for (let i = 0; i < 6; i++) {
            setTimeout(createBubble, i * 2000);
        }
        
        // Continuously create new bubbles
        setInterval(createBubble, 3000);
    }
    animate() {
    const now = Date.now();
    if (!this.lastFrameTime || now - this.lastFrameTime >= 33) { // ~30fps
        this.updateCursor();
        this.drawCanvas();
        this.lastFrameTime = now;
    }
    requestAnimationFrame(() => this.animate());
}
    
    animate() {
        this.updateCursor();
        this.drawCanvas();
        requestAnimationFrame(() => this.animate());
    }
    
    updateCursor() {
        // Smooth cursor following
        this.cursorPos.x = this.mouse.x;
        this.cursorPos.y = this.mouse.y;


        
        this.cursor.style.left = this.cursorPos.x - 17.5 + 'px';
        this.cursor.style.top = this.cursorPos.y - 17.5 + 'px';
    }
    
    drawCanvas() {
        this.ctx.clearRect(0, 0, this.waterCanvas.width, this.waterCanvas.height);
        
        // Draw flowing river pattern
        this.drawRiverFlow();
        
        // Draw ripples
        this.drawRipples();
        
        // Draw particles
        this.drawParticles();
        
        // Draw cursor trail
        this.drawCursorTrail();
    }
    
    drawRiverFlow() {
        const time = Date.now() * 0.0008;
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Create dark river base
        const darkGradient = this.ctx.createLinearGradient(0, 0, width, height);
        darkGradient.addColorStop(0, 'rgba(5, 15, 35, 0.6)');
        darkGradient.addColorStop(0.3, 'rgba(10, 25, 50, 0.4)');
        darkGradient.addColorStop(0.7, 'rgba(15, 35, 65, 0.5)');
        darkGradient.addColorStop(1, 'rgba(8, 20, 40, 0.6)');
        
        this.ctx.fillStyle = darkGradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Draw multiple layers of flowing water ripples
        this.drawWaterRipples(time, width, height);
        
        // Add depth with darker currents
        this.drawDarkCurrents(time, width, height);
        
        // Add surface reflections
        this.drawSurfaceReflections(time, width, height);
    }
    
    drawWaterRipples(time, width, height) {
        // Multiple layers of ripples for depth
        for (let layer = 0; layer < 4; layer++) {
            const layerSpeed = 0.3 + (layer * 0.2);
            const layerOpacity = 0.15 - (layer * 0.03);
            const rippleSize = 80 + (layer * 40);
            
            this.ctx.strokeStyle = `rgba(25, 60, 100, ${layerOpacity})`;
            this.ctx.lineWidth = 1 + (layer * 0.5);
            
            for (let i = 0; i < 8; i++) {
                this.ctx.beginPath();
                const baseY = (height / 9) * (i + 1);
                const phaseOffset = i * 0.5 + layer * 0.3;
                
                this.ctx.moveTo(0, baseY);
                
                for (let x = 0; x <= width; x += 8) {
                    const wave1 = Math.sin((x * 0.008) + (time * layerSpeed) + phaseOffset) * rippleSize;
                    const wave2 = Math.sin((x * 0.012) + (time * layerSpeed * 1.3) + phaseOffset) * (rippleSize * 0.6);
                    const wave3 = Math.sin((x * 0.005) + (time * layerSpeed * 0.7) + phaseOffset) * (rippleSize * 0.4);
                    
                    const finalY = baseY + wave1 + wave2 + wave3;
                    this.ctx.lineTo(x, finalY);
                }
                
                this.ctx.stroke();
            }
        }
    }
    
    drawDarkCurrents(time, width, height) {
        // Create darker flowing currents
        for (let i = 0; i < 6; i++) {
            const currentGradient = this.ctx.createLinearGradient(
                0, (height / 7) * i,
                width, (height / 7) * (i + 2)
            );
            
            const baseOpacity = 0.08 + Math.sin(time + i) * 0.03;
            currentGradient.addColorStop(0, `rgba(5, 10, 25, ${baseOpacity})`);
            currentGradient.addColorStop(0.5, `rgba(15, 30, 55, ${baseOpacity * 1.5})`);
            currentGradient.addColorStop(1, `rgba(8, 18, 35, ${baseOpacity})`);
            
            this.ctx.fillStyle = currentGradient;
            
            this.ctx.beginPath();
            const startY = (height / 7) * i;
            const endY = startY + (height / 4);
            
            this.ctx.moveTo(0, startY);
            
            for (let x = 0; x <= width; x += 10) {
                const flowOffset = Math.sin((x * 0.006) + (time * 0.5) + i) * 60;
                const turbulence = Math.sin((x * 0.015) + (time * 0.8) + i) * 20;
                this.ctx.lineTo(x, startY + flowOffset + turbulence);
            }
            
            for (let x = width; x >= 0; x -= 10) {
                const flowOffset = Math.sin((x * 0.006) + (time * 0.5) + i) * 60;
                const turbulence = Math.sin((x * 0.015) + (time * 0.8) + i) * 20;
                this.ctx.lineTo(x, endY + flowOffset + turbulence);
            }
            
            this.ctx.closePath();
            this.ctx.fill();
        }
    }
    
    drawSurfaceReflections(time, width, height) {
        // Add subtle surface light reflections
        const reflectionGradient = this.ctx.createRadialGradient(
            width * 0.3, height * 0.2, 0,
            width * 0.7, height * 0.8, width * 0.8
        );
        
        const shimmer = 0.02 + Math.sin(time * 2) * 0.015;
        reflectionGradient.addColorStop(0, `rgba(40, 80, 120, ${shimmer})`);
        reflectionGradient.addColorStop(0.4, `rgba(25, 50, 80, ${shimmer * 0.7})`);
        reflectionGradient.addColorStop(1, 'rgba(15, 30, 60, 0)');
        
        this.ctx.fillStyle = reflectionGradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Add flowing light streaks
        for (let i = 0; i < 3; i++) {
            const streakY = height * (0.2 + i * 0.3);
            const streakOpacity = 0.03 + Math.sin(time + i * 2) * 0.02;
            
            this.ctx.strokeStyle = `rgba(60, 100, 140, ${streakOpacity})`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            
            this.ctx.moveTo(0, streakY);
            for (let x = 0; x <= width; x += 15) {
                const flow = Math.sin((x * 0.004) + (time * 0.6) + i) * 40;
                this.ctx.lineTo(x, streakY + flow);
            }
            this.ctx.stroke();
        }
    }
    
    drawRipples() {
        this.ripples = this.ripples.filter(ripple => {
            ripple.radius += ripple.speed;
            ripple.opacity -= 0.012;
            
            if (ripple.opacity > 0 && ripple.radius < ripple.maxRadius) {
                // Main ripple with darker theme
                this.ctx.beginPath();
                this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(40, 80, 120, ${ripple.opacity * 0.5})`;
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                
                // Inner ripple
                this.ctx.beginPath();
                this.ctx.arc(ripple.x, ripple.y, ripple.radius * 0.6, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(25, 50, 80, ${ripple.opacity * 0.7})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
                
                // Outer fading ripple
                this.ctx.beginPath();
                this.ctx.arc(ripple.x, ripple.y, ripple.radius * 1.3, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(15, 35, 60, ${ripple.opacity * 0.3})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
                
                return true;
            }
            return false;
        });
    }
    
    drawParticles() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= particle.decay;
            particle.vy += 0.1; // Gravity
            
            if (particle.life > 0) {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size * particle.life, 0, Math.PI * 2);
                this.ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${particle.life * 0.8})`);
                this.ctx.fill();
                
                // Add glow effect
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size * particle.life * 2, 0, Math.PI * 2);
                this.ctx.fillStyle = particle.color.replace(/[\d.]+\)$/g, `${particle.life * 0.2})`);
                this.ctx.fill();
                
                return true;
            }
            return false;
        });
    }
    
    drawCursorTrail() {
        const time = Date.now() * 0.008;
        
        // Draw darker cursor influence field
        const gradient = this.ctx.createRadialGradient(
            this.cursorPos.x, this.cursorPos.y, 0,
            this.cursorPos.x, this.cursorPos.y, 120
        );
        
        gradient.addColorStop(0, `rgba(30, 60, 90, ${0.12 + Math.sin(time) * 0.04})`);
        gradient.addColorStop(0.3, `rgba(20, 40, 70, ${0.08 + Math.cos(time * 1.2) * 0.03})`);
        gradient.addColorStop(0.7, `rgba(15, 30, 50, ${0.04 + Math.sin(time * 0.8) * 0.02})`);
        gradient.addColorStop(1, 'rgba(10, 20, 35, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.cursorPos.x, this.cursorPos.y, 120, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Draw subtle ripples around cursor
        for (let i = 0; i < 3; i++) {
            const rippleRadius = 25 + i * 15 + Math.sin(time + i) * 8;
            const rippleOpacity = (0.15 - i * 0.04) + Math.sin(time + i * 2) * 0.03;
            
            this.ctx.beginPath();
            this.ctx.arc(this.cursorPos.x, this.cursorPos.y, rippleRadius, 0, Math.PI * 2);
            this.ctx.strokeStyle = `rgba(40, 80, 120, ${rippleOpacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
        
        // Draw flowing particles around cursor (darker theme)
        for (let i = 0; i < 8; i++) {
            const angle = (time * 0.3) + (i * Math.PI * 2 / 8);
            const radius = 35 + Math.sin(time * 0.7 + i) * 12;
            const x = this.cursorPos.x + Math.cos(angle) * radius;
            const y = this.cursorPos.y + Math.sin(angle) * radius;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(60, 100, 140, ${0.4 + Math.sin(time + i) * 0.3})`;
            this.ctx.fill();
            
            // Add glow
            this.ctx.beginPath();
            this.ctx.arc(x, y, 4, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(40, 80, 120, ${0.1 + Math.sin(time + i) * 0.08})`;
            this.ctx.fill();
        }
    }
    
    updateTimestamp() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).toLowerCase();
        
        document.getElementById('current-time').textContent = timeString;
        
        // Update every minute
        setTimeout(() => this.updateTimestamp(), 60000);
    }
}

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

const customCursor = document.getElementById("cursor");
const navLinks = document.querySelectorAll(".navigation, .nav-links a");

navLinks.forEach(link => {
  link.addEventListener("mouseenter", () => {
    customCursor.style.display = "none"; // hide custom cursor
    document.body.style.cursor = "default"; // show system cursor
  });
  link.addEventListener("mouseleave", () => {
    customCursor.style.display = "block"; // show custom cursor again
    document.body.style.cursor = "none";  // hide system cursor
  });
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

// Resize the committee canvas to always fill the screen
function resizeCommitteeCanvas() {
  committeeCanvas.width = window.innerWidth;
  committeeCanvas.height = window.innerHeight;
}
resizeCommitteeCanvas();
window.addEventListener('resize', resizeCommitteeCanvas);

// Get scroll progress in the committees-section (0...1)
function getCommitteeScrollProgress() {
  const section = document.querySelector('.committees-section');
  const rect = section.getBoundingClientRect();
  const totalHeight = rect.height - window.innerHeight;
  const scrolled = -rect.top;
  return Math.min(Math.max(scrolled / totalHeight, 0), 1);
}

// Draw the committee names, animating based on scroll
function drawCommittees(progress) {
  committeeCtx.clearRect(0, 0, committeeCanvas.width, committeeCanvas.height);

  const perCommittee = 1 / committeeNames.length;

  for (let i = 0; i < committeeNames.length; i++) {
    const start = i * perCommittee;
    const end = (i + 1) * perCommittee;
    const relProgress = (progress - start) / perCommittee;
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

// Animation loop for committees section
function animateCommittees() {
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