function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particlesContainer.appendChild(particle);
            }
        }
        
        // Scroll progress bar
        function updateScrollProgress() {
            const scrollProgress = document.getElementById('scrollProgress');
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
        
        // Navbar scroll effect
        function handleNavbarScroll() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Intersection Observer for animations
        function observeElements() {
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
            
            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        }
        
        // Smooth scrolling for navigation links
        function initSmoothScrolling() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    } else {
                        console.warn('Target not found for', this.getAttribute('href'));
                    }
                });
            });
        }
        
        // Form submission handler
        function initFormHandler() {
            const form = document.querySelector('.contact-form form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Get form data
                    const formData = new FormData(this);
                    const name = this.querySelector('input[type="text"]').value;
                    const email = this.querySelector('input[type="email"]').value;
                    const message = this.querySelector('textarea').value;
                    
                    // Simple validation
                    if (!name || !email || !message) {
                        alert('Vui lòng điền đầy đủ thông tin!');
                        return;
                    }
                    
                    // Simulate form submission
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '⏳ Đang gửi...';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        alert('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.');
                        this.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                });
            }
        }
        
        // Project link handlers
        function initProjectLinks() {
            document.querySelectorAll('.project-link[href*="github.com"]').forEach(link => {
                link.addEventListener('click', function(e) {
                    console.log('GitHub project opened:', this.href);
                });
            });
        }
        
        // Contact link handlers
        function initContactLinks() {
            document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(link => {
                link.addEventListener('click', function() {
                    console.log('Contact initiated:', this.href);
                });
            });
        }
        
        // Skill tag interactions
        function initSkillTags() {
            document.querySelectorAll('.skill-tag').forEach(tag => {
                tag.addEventListener('click', function() {
                    console.log('Skill selected:', this.textContent);
                    // Add visual feedback
                    this.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                });
            });
        }
        
        // Parallax effect for hero section
        function initParallax() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const heroCard = document.querySelector('.hero-card');
                if (heroCard) {
                    heroCard.style.transform = `translateY(${scrolled * 0.1}px)`;
                }
            }, { passive: true });
        }
        
        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            observeElements();
            initSmoothScrolling();
            initFormHandler();
            initProjectLinks();
            initContactLinks();
            initSkillTags();
            initParallax();
            
            // Add scroll event listeners
            window.addEventListener('scroll', () => {
                updateScrollProgress();
                handleNavbarScroll();
            }, { passive: true });
            
            // Add loaded class for initial animations
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 100);
        });
        
        // Performance optimization: Debounce scroll events
        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
        
        // Add some interactive hover effects
        document.addEventListener('mousemove', debounce((e) => {
            const cards = document.querySelectorAll('.skill-card, .project-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                } else {
                    card.style.transform = '';
                }
            });
        }, 10));