(function () {
    // ===== CEK SAVED PAGE =====
    const savedPage = localStorage.getItem('activePortfolioPage') || 'index';
    const pages = {
        index: document.getElementById('page-index'),
        karya: document.getElementById('page-karya'),
        kontak: document.getElementById('page-kontak')
    };

    // ===== MOUSE GLOW =====
    const glow = document.getElementById('mouse-glow');
    document.addEventListener('mousemove', function (e) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // ===== SPLASH SCREEN =====
    const splashOverlay = document.getElementById('splash-overlay');

    function createSplash(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'splash-ripple';
        const size = Math.max(window.innerWidth, window.innerHeight) * 0.5;
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        splashOverlay.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }

    // ===== HAMBURGER TOGGLE =====
    const hamburger = document.getElementById('hamburgerToggle');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 820) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            }
        });
    });

    // ===== NAVIGASI =====
    const navLinkElements = document.querySelectorAll('.nav-links a');

    function navigateTo(pageId, event, saveHistory = true) {
        if (event) {
            const rect = event.currentTarget.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            createSplash(cx, cy);
        } else {
            createSplash(window.innerWidth / 2, window.innerHeight / 2);
        }

        setTimeout(() => {
            Object.keys(pages).forEach(key => {
                pages[key].classList.remove('active');
            });

            const targetPage = pages[pageId];
            if (targetPage) {
                targetPage.style.animation = 'none';
                void targetPage.offsetWidth;
                targetPage.classList.add('active');
                targetPage.style.animation = 'fadePage 0.6s ease forwards';
            }

            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === pageId) {
                    link.classList.add('active');
                }
            });

            if (saveHistory) {
                localStorage.setItem('activePortfolioPage', pageId);
            }
        }, 400);
    }

    navLinkElements.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.dataset.page;
            if (page) navigateTo(page, e, true);
        });
    });

    const ctaBtn = document.querySelector('.cta a[data-page]');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.dataset.page;
            if (page) {
                navigateTo(page, e, true);
                navLinkElements.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.page === page) {
                        link.classList.add('active');
                    }
                });
                if (window.innerWidth <= 820) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('open');
                }
            }
        });
    }

    // ===== SET HALAMAN AWAL TANPA FLASH =====
    Object.keys(pages).forEach(key => {
        pages[key].classList.remove('active');
    });

    const targetPage = pages[savedPage];
    if (targetPage) {
        targetPage.classList.add('active');
    }

    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === savedPage) {
            link.classList.add('active');
        }
    });

    // ===== AUDIO PLAYER DENGAN ANIMASI RIPPLE =====
    const audio = document.getElementById('bgAudio');
    const audioToggleBtn = document.getElementById('audioToggleBtn');
    const audioIcon = document.getElementById('audioIcon');
    const vinylDisc = document.getElementById('vinylDisc');
    const vinylContainer = document.getElementById('vinylContainer');

    audioToggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (audio.paused) {
            audio.play().then(() => {
                vinylDisc.classList.add('playing');
                vinylContainer.classList.add('playing');
                audioIcon.className = 'fas fa-pause';
            }).catch(err => {
                console.log("Error memutar audio:", err);
            });
        } else {
            audio.pause();
            vinylDisc.classList.remove('playing');
            vinylContainer.classList.remove('playing');
            audioIcon.className = 'fas fa-play';
        }
    });

    vinylContainer.addEventListener('click', function (e) {
        if (e.target === this || e.target.closest('.vinyl-disc')) {
            audioToggleBtn.click();
        }
    });
})();


const cursor = document.getElementById('custom-cursor');
const cursorImg = document.getElementById('cursor-img');

// Menggerakkan kursor mengikuti posisi mouse
document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
});

// Mengubah gambar saat hover ke link, button, atau elemen interaktif lainnya
const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], input[type="button"], [role="button"]');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorImg.src = 'assets/cursor/cursor-hover.png'; // Gambar saat hover
        cursorImg.style.transform = 'scale(1.15)'; // Sedikit memperbesar saat hover
    });

    el.addEventListener('mouseleave', () => {
        cursorImg.src = 'assets/cursor/cursor.png'; // Kembali ke gambar normal
        cursorImg.style.transform = 'scale(1)';
    });
});