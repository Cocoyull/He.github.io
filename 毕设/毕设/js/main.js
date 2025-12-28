document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.card');
    const contactQR = document.querySelector('.qr-placeholder');
    const langSwitch = document.querySelector('.lang-switch');
    const userActions = document.querySelector('.user-actions');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
        
        link.addEventListener('mouseenter', function() {
            this.style.color = '#009CFF';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '#000000';
            }
        });
    });
    
    cards.forEach((card, index) => {
        const cardImage = card.querySelector('.card-image');
        
        cardImage.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
        });
        
        cardImage.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        cardImage.addEventListener('click', function() {
            console.log(`Card ${index + 1} clicked`);
        });
    });
    
    if (contactQR) {
        contactQR.addEventListener('click', function() {
            console.log('QR Code clicked');
        });
    }
    
    let isEnglish = false;
    
    if (langSwitch) {
        langSwitch.addEventListener('click', function() {
            isEnglish = !isEnglish;
            const langText = this.querySelector('.lang-text');
            const rectangle = this.querySelector('.rectangle');
            
            if (isEnglish) {
                langText.textContent = '中';
                rectangle.style.backgroundColor = '#009CFF';
                updateLanguage('en');
            } else {
                langText.textContent = 'EN';
                rectangle.style.backgroundColor = '#D9D9D9';
                updateLanguage('zh');
            }
        });
    }
    
    function updateLanguage(lang) {
        const navItems = document.querySelectorAll('.nav-link');
        const loginText = document.querySelector('.login-text');
        const contactTitle = document.querySelector('.contact-title');
        const contactMission = document.querySelector('.contact-mission');
        const contactText = document.querySelector('.contact-text');
        const contactCta = document.querySelector('.contact-cta');
        
        if (lang === 'en') {
            if (navItems[0]) navItems[0].textContent = 'Home';
            if (navItems[1]) navItems[1].textContent = 'Parametric Modeling';
            if (navItems[2]) navItems[2].textContent = 'Case Library';
            if (navItems[3]) navItems[3].textContent = 'Lab & Resources';
            if (navItems[4]) navItems[4].textContent = 'About Us';
            if (loginText) loginText.textContent = 'Login';
            if (contactTitle) contactTitle.textContent = 'Contact Us';
            if (contactMission) contactMission.textContent = 'Sophicar looks forward to partnering with global innovators to advance intelligent transportation and future urban integration.';
            if (contactText) contactText.textContent = 'Interested in Sophicar or our smart mobility products? Feel free to connect with us anytime.';
            if (contactCta) contactCta.textContent = 'Get more product information:';
        } else {
            if (navItems[0]) navItems[0].textContent = '首页';
            if (navItems[1]) navItems[1].textContent = '参数化建模';
            if (navItems[2]) navItems[2].textContent = '案例库';
            if (navItems[3]) navItems[3].textContent = '实验与资源中心';
            if (navItems[4]) navItems[4].textContent = '关于我们';
            if (loginText) loginText.textContent = '登陆';
            if (contactTitle) contactTitle.textContent = '联系我们';
            if (contactMission) contactMission.textContent = 'sophicar 期待与全球各领域的伙伴、创新者携手，共同推动智能交通与未来城市的融合进化。';
            if (contactText) contactText.textContent = '对 sophicar 或我们的智能出行产品感兴趣？欢迎随时与我们联结。';
            if (contactCta) contactCta.textContent = '获得更多关于产品的信息：';
        }
    }
    
    if (userActions) {
        userActions.addEventListener('click', function() {
            console.log('User actions clicked');
        });
        
        userActions.addEventListener('mouseenter', function() {
            this.style.opacity = '0.7';
        });
        
        userActions.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    }
    
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const mainTitle = document.querySelector('.main-title');
    
    if (heroTitle && heroSubtitle && mainTitle) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.1 });
        
        [heroTitle, heroSubtitle, mainTitle].forEach(el => {
            if (el) observer.observe(el);
        });
    }
    
    const cardImages = document.querySelectorAll('.card-image');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    cardImages.forEach((image, index) => {
        image.style.opacity = '0';
        image.style.transform = 'translateY(20px)';
        image.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        cardObserver.observe(image);
    });
    
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.navigation');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.backgroundColor = 'transparent';
            nav.style.boxShadow = 'none';
        }
    });
    
    console.log('Sophicar Landing Page initialized');
    console.log('Navigation items:', navLinks.length);
    console.log('Cards:', cards.length);
});