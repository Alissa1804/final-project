/* ===== Mobile menu ===== */

const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');

if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('is-open');
        mobileMenu.classList.toggle('is-open');

        const expanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', String(!expanded));
    });

    mobileMenuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            menuButton.classList.remove('is-open');
            mobileMenu.classList.remove('is-open');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });
}


/* ===== Portfolio slider ===== */

const portfolioSlider = document.querySelector('.portfolio__slider');
const portfolioPrev = document.querySelector('.portfolio__arrow--prev');
const portfolioNext = document.querySelector('.portfolio__arrow--next');
const portfolioProgress = document.querySelector('.portfolio__progress');

const portfolioNumberFirst = document.querySelector('.portfolio__number--first');
const portfolioNumberSecond = document.querySelector('.portfolio__number--second');

if (portfolioSlider && portfolioPrev && portfolioNext) {

    let portfolioPage = 0;
    const portfolioTotalPages = 2;

    function updatePortfolioSlider() {
        const card = portfolioSlider.querySelector('.project-card');
        if (!card) return;

        const gap = parseInt(getComputedStyle(portfolioSlider).gap) || 0;
        const cardWidth = card.offsetWidth + gap;

        portfolioSlider.scrollTo({
            left: portfolioPage * cardWidth * 3,
            behavior: 'smooth',
        });

        if (portfolioNumberFirst && portfolioNumberSecond) {
            portfolioNumberFirst.classList.toggle('is-active', portfolioPage === 0);
            portfolioNumberSecond.classList.toggle('is-active', portfolioPage === 1);
        }

        if (portfolioProgress) {
            portfolioProgress.classList.toggle('is-second', portfolioPage === 1);
        }

        portfolioPrev.classList.toggle('is-disabled', portfolioPage === 0);
        portfolioNext.classList.toggle('is-disabled', portfolioPage === portfolioTotalPages - 1);
    }

    portfolioNext.addEventListener('click', () => {
        if (portfolioPage < portfolioTotalPages - 1) {
            portfolioPage++;
            updatePortfolioSlider();
        }
    });

    portfolioPrev.addEventListener('click', () => {
        if (portfolioPage > 0) {
            portfolioPage--;
            updatePortfolioSlider();
        }
    });

    window.addEventListener('resize', updatePortfolioSlider);

    updatePortfolioSlider();
}

/* ===== Partners slider ===== */

const partnersSlider = document.querySelector('.partners__slider');
const partnersPrev = document.querySelector('.partners__arrow--prev');
const partnersNext = document.querySelector('.partners__arrow--next');

const partnersCurrent = document.querySelector('.partners__number--current');
const partnersTotal = document.querySelector('.partners__number--total');
const partnersProgress = document.querySelector('.partners__progress');

if (partnersSlider && partnersPrev && partnersNext) {

    const slides = partnersSlider.querySelectorAll('.partner-card');
    const total = slides.length;

    let current = 0;

    if (partnersTotal) {
        partnersTotal.textContent = String(total).padStart(2, '0');
    }

    function updatePartnersSlider() {
        const sliderWidth = partnersSlider.offsetWidth;

        partnersSlider.scrollTo({
            left: current * sliderWidth,
            behavior: 'smooth'
        });

        if (partnersCurrent) {
            partnersCurrent.textContent = String(current + 1).padStart(2, '0');
        }

        if (partnersProgress) {
            const step = 100 / total;
            partnersProgress.style.width = `${step}%`;
            partnersProgress.style.transform = `translateX(${current * 100}%)`;
        }

        partnersPrev.classList.toggle('is-disabled', current === 0);
        partnersNext.classList.toggle('is-disabled', current === total - 1);
    }

    partnersNext.addEventListener('click', () => {
        if (current < total - 1) {
            current++;
            updatePartnersSlider();
        }
    });

    partnersPrev.addEventListener('click', () => {
        if (current > 0) {
            current--;
            updatePartnersSlider();
        }
    });

    window.addEventListener('resize', updatePartnersSlider);

    updatePartnersSlider();

}

/* ===== FAQ ===== */

const faqItems = document.querySelectorAll('.faq__item');

faqItems.forEach((item) => {
    const button = item.querySelector('.faq__question');
    const answer = item.querySelector('.faq__answer');

    if (!button || !answer) {
        return;
    }

    answer.style.height = '0px';
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        faqItems.forEach((currentItem) => {
            const currentButton = currentItem.querySelector('.faq__question');
            const currentAnswer = currentItem.querySelector('.faq__answer');

            currentItem.classList.remove('is-open');

            if (currentButton) {
                currentButton.setAttribute('aria-expanded', 'false');
            }

            if (currentAnswer) {
                currentAnswer.style.height = '0px';
            }
        });

        if (!isOpen) {
            item.classList.add('is-open');
            button.setAttribute('aria-expanded', 'true');
            answer.style.height = `${answer.scrollHeight}px`;
        }
    });
});

/* ===== Reveal ===== */

if (window.matchMedia('(min-width: 1024px)').matches) {
    const sections = document.querySelectorAll(`
        .about,
        .portfolio,
        .certificates,
        .partners,
        .faq,
        .project-cta
    `);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    sections.forEach((section) => {
        section.classList.add('reveal-section');
        observer.observe(section);
    });
}

/* ===== Scroll Top ===== */

const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('is-visible');
    } else {
        scrollTopBtn.classList.remove('is-visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});