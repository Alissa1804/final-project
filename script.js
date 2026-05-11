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

/* ===== Universal slider ===== */

function initSlider({
    sliderSelector,
    prevSelector,
    nextSelector,
    slideSelector,
    currentSelector,
    totalSelector,
    progressSelector,
    itemsPerPage = 1,
}) {
    const slider = document.querySelector(sliderSelector);
    const prevButton = document.querySelector(prevSelector);
    const nextButton = document.querySelector(nextSelector);

    if (!slider || !prevButton || !nextButton) {
        return;
    }

    const slides = slider.querySelectorAll(slideSelector);
    const currentNumber = document.querySelector(currentSelector);
    const totalNumber = document.querySelector(totalSelector);
    const progress = document.querySelector(progressSelector);

    const totalPages = Math.ceil(slides.length / itemsPerPage);
    let currentPage = 0;

    if (totalNumber) {
        totalNumber.textContent = String(totalPages).padStart(2, '0');
    }

    function updateSlider() {
        const slide = slides[0];

        if (!slide) {
            return;
        }

        const gap = parseInt(getComputedStyle(slider).gap) || 0;
        const slideWidth = slide.offsetWidth + gap;

        slider.scrollTo({
            left: currentPage * slideWidth * itemsPerPage,
            behavior: 'smooth',
        });

        if (currentNumber) {
            currentNumber.textContent = String(currentPage + 1).padStart(2, '0');
        }

        if (progress) {
            const progressWidth = 100 / totalPages;

            progress.style.width = `${progressWidth}%`;
            progress.style.transform = `translateX(${currentPage * 100}%)`;
        }

        prevButton.classList.toggle('is-disabled', currentPage === 0);
        nextButton.classList.toggle('is-disabled', currentPage === totalPages - 1);
    }

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updateSlider();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateSlider();
        }
    });

    window.addEventListener('resize', updateSlider);

    updateSlider();
}


/* ===== Portfolio slider ===== */

initSlider({
    sliderSelector: '.portfolio__slider',
    prevSelector: '.portfolio__arrow--prev',
    nextSelector: '.portfolio__arrow--next',
    slideSelector: '.project-card',
    currentSelector: '.portfolio__number--current',
    totalSelector: '.portfolio__number--total',
    progressSelector: '.portfolio__progress',
    itemsPerPage: 3,
});


/* ===== Partners slider ===== */

initSlider({
    sliderSelector: '.partners__slider',
    prevSelector: '.partners__arrow--prev',
    nextSelector: '.partners__arrow--next',
    slideSelector: '.partner-card',
    currentSelector: '.partners__number--current',
    totalSelector: '.partners__number--total',
    progressSelector: '.partners__progress',
    itemsPerPage: 1,
});