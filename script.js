// Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles');
        this.particleCount = 50;
        this.init();
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.createParticle();
        }
        this.animate();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 107, 53, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(255, 107, 53, 0.5);
        `;
        
        this.container.appendChild(particle);
        
        this.particles.push({
            element: particle,
            x: parseFloat(particle.style.left),
            y: parseFloat(particle.style.top),
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: parseFloat(particle.style.width)
        });
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around
            if (particle.x < 0) particle.x = 100;
            if (particle.x > 100) particle.x = 0;
            if (particle.y < 0) particle.y = 100;
            if (particle.y > 100) particle.y = 0;

            particle.element.style.left = `${particle.x}%`;
            particle.element.style.top = `${particle.y}%`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            if (this.hero) {
                this.hero.style.transform = `translate(${x}px, ${y}px)`;
            }
        });
    }
}

// Smooth Scroll
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Card Tilt Effect
class CardTilt {
    constructor() {
        this.cards = document.querySelectorAll('.card, .detail-item');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });
        });
    }
}

// Glowing Text Enhancement
class GlowEnhancement {
    constructor() {
        this.glowElements = document.querySelectorAll('.glow-text');
        this.init();
    }

    init() {
        this.glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.animationDuration = '0.5s';
            });

            element.addEventListener('mouseleave', () => {
                element.style.animationDuration = '2s';
            });
        });
    }
}

// Typing Effect for Subtitle
class TypingEffect {
    constructor() {
        this.subtitle = document.querySelector('.subtitle');
        this.text = this.subtitle.textContent;
        this.init();
    }

    init() {
        this.subtitle.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < this.text.length) {
                this.subtitle.textContent += this.text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        };

        setTimeout(type, 1500);
    }
}

// Scroll Typing Effect
class ScrollTypingEffect {
    constructor() {
        this.elements = document.querySelectorAll('.card-text, .obsession-text, .card-title, .detail-value');
        this.init();
    }

    init() {
        // Hide all elements initially
        this.elements.forEach(element => {
            element.style.opacity = '0';
            element.style.visibility = 'hidden';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                    entry.target.classList.add('typed');
                    this.typeText(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(element => {
            observer.observe(element);
        });
    }

    typeText(element) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        element.style.visibility = 'visible';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 40);
            }
        };

        type();
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
    new ScrollAnimations();
    new ParallaxEffect();
    new SmoothScroll();
    new CardTilt();
    new GlowEnhancement();
    new TypingEffect();
    new ScrollTypingEffect();
    
    // Handle audio autoplay - try to play immediately
    const audio = document.getElementById('bg-music');
    audio.volume = 0.3; // Set volume to 30%
    
    // Try to play audio on page load
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Audio autoplay successful');
            // Initialize visualizer immediately if audio plays
            new BeatVisualizer();
        }).catch(error => {
            console.log('Autoplay prevented by browser, will play on first interaction');
            // Fallback: play on first interaction
            document.addEventListener('click', () => {
                audio.play();
                new BeatVisualizer();
            }, { once: true });
        });
    } else {
        // For older browsers
        new BeatVisualizer();
    }
});

// Beat Visualizer
class BeatVisualizer {
    constructor() {
        this.canvas = document.getElementById('beat-visualizer');
        this.ctx = this.canvas.getContext('2d');
        this.audio = document.getElementById('bg-music');
        this.audioContext = null;
        this.analyser = null;
        this.dataArray = null;
        this.bars = 60;
        this.radius = 110;
        this.init();
    }

    init() {
        this.canvas.width = 280;
        this.canvas.height = 280;
        
        // Initialize audio context on user interaction
        document.addEventListener('click', () => this.initAudio(), { once: true });
        
        // Start animation loop
        this.animate();
    }

    initAudio() {
        if (this.audioContext) return;
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        const source = this.audioContext.createMediaElementSource(this.audio);
        
        source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        
        this.analyser.fftSize = 256;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        let audioData = [];
        if (this.analyser && this.dataArray) {
            this.analyser.getByteFrequencyData(this.dataArray);
            audioData = this.dataArray;
        }
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        for (let i = 0; i < this.bars; i++) {
            const angle = (i / this.bars) * Math.PI * 2;
            
            // Get audio data for this bar
            const dataIndex = Math.floor((i / this.bars) * audioData.length);
            const audioValue = audioData[dataIndex] || 0;
            const barHeight = (audioValue / 255) * 40 + 5; // Base height + audio reaction
            
            const innerRadius = this.radius;
            const outerRadius = innerRadius + barHeight;
            
            const x1 = centerX + Math.cos(angle) * innerRadius;
            const y1 = centerY + Math.sin(angle) * innerRadius;
            const x2 = centerX + Math.cos(angle) * outerRadius;
            const y2 = centerY + Math.sin(angle) * outerRadius;
            
            // Create gradient
            const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, '#ff6b35');
            gradient.addColorStop(1, '#ffd700');
            
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 3;
            this.ctx.lineCap = 'round';
            this.ctx.stroke();
        }
    }
}