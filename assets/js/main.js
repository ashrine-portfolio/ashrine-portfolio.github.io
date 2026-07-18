/*==================== MENU SHOW & HIDE ====================*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', function handleNavToggleClick() {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', function handleNavCloseClick() {
        navMenu.classList.remove('show-menu');
    });
}

const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(function attachNavLinkHandler(navLink) {
    navLink.addEventListener('click', function handleNavLinkClick() {
        navMenu.classList.remove('show-menu');
    });
});

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content');
const skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    const itemClass = this.parentNode.className;

    for (let index = 0; index < skillsContent.length; index += 1) {
        skillsContent[index].className = 'skills__content skills__close';
    }

    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach(function attachSkillsHeaderHandler(headerElement) {
    headerElement.addEventListener('click', toggleSkills);
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(function attachTabHandler(tabElement) {
    tabElement.addEventListener('click', function handleTabClick() {
        const target = document.querySelector(tabElement.dataset.target);

        tabContents.forEach(function resetTabContent(tabContent) {
            tabContent.classList.remove('qualification__active');
        });

        tabs.forEach(function resetTab(tab) {
            tab.classList.remove('qualification__active');
        });

        target.classList.add('qualification__active');
        tabElement.classList.add('qualification__active');
    });
});

/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal');
const modalBtns = document.querySelectorAll('.services__button');
const modalCloses = document.querySelectorAll('.services__modal-close');

function openModal(modalIndex) {
    modalViews[modalIndex].classList.add('active-modal');
}

modalBtns.forEach(function attachModalBtnHandler(modalBtn, index) {
    modalBtn.addEventListener('click', function handleModalBtnClick() {
        openModal(index);
    });
});

modalCloses.forEach(function attachModalCloseHandler(modalClose) {
    modalClose.addEventListener('click', function handleModalCloseClick() {
        modalViews.forEach(function closeModal(modalView) {
            modalView.classList.remove('active-modal');
        });
    });
});

/*==================== PORTFOLIO SWIPER ====================*/
const swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

/*==================== TESTIMONIAL SWIPER ====================*/
const swiperTestimonial = new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(function updateActiveSection(currentSection) {
        const sectionHeight = currentSection.offsetHeight;
        const sectionTop = currentSection.offsetTop - 50;
        const sectionId = currentSection.getAttribute('id');
        const selector = '.nav__menu a[href*=' + sectionId + ']';

        const linkElement = document.querySelector(selector);

        if (!linkElement) {
            return;
        }

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            linkElement.classList.add('active-link');
        } else {
            linkElement.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header');

    if (window.scrollY >= 80) {
        nav.classList.add('scroll-header');
    } else {
        nav.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUpElement = document.getElementById('scroll-up');

    if (window.scrollY >= 560) {
        scrollUpElement.classList.add('show-scroll');
    } else {
        scrollUpElement.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollUp);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun';
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

function getCurrentTheme() {
    return document.body.classList.contains(darkTheme) ? 'dark' : 'light';
}

function getCurrentIcon() {
    return themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';
}

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', function handleThemeToggle() {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*==================== CONTACT FORM (FORMCARRY) ====================*/
const FORMCARRY_ENDPOINT = 'https://formcarry.com/s/jg0E2d7wY5O';
const CONTACT_FORM_STATUS = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
};

const contactForm = document.getElementById('contact-form');
const contactFormStatus = document.getElementById('contact-form-status');
const contactFormSubmit = document.getElementById('contact-form-submit');

function setContactFormStatus(statusType, message) {
    if (!contactFormStatus) {
        return;
    }

    contactFormStatus.hidden = false;
    contactFormStatus.textContent = message;
    contactFormStatus.className = 'contact__status contact__status--' + statusType;
}

function resetContactFormStatus() {
    if (!contactFormStatus) {
        return;
    }

    contactFormStatus.hidden = true;
    contactFormStatus.textContent = '';
    contactFormStatus.className = 'contact__status';
}

function setContactFormLoading(isLoading) {
    if (!contactFormSubmit) {
        return;
    }

    contactFormSubmit.disabled = isLoading;
    contactFormSubmit.setAttribute('aria-busy', isLoading ? 'true' : 'false');
}

async function handleContactFormSubmit(event) {
    event.preventDefault();

    if (!contactForm) {
        return;
    }

    resetContactFormStatus();
    setContactFormLoading(true);
    setContactFormStatus(CONTACT_FORM_STATUS.LOADING, 'Sending your message...');

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(FORMCARRY_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
            },
        });

        const responseData = await response.json();

        if (!response.ok || responseData.code !== 200) {
            const errorMessage = responseData.message || 'Something went wrong. Please try again.';
            setContactFormStatus(CONTACT_FORM_STATUS.ERROR, errorMessage);
            return;
        }

        contactForm.reset();
        setContactFormStatus(
            CONTACT_FORM_STATUS.SUCCESS,
            'Thank you! Your message has been sent successfully.'
        );
    } catch (error) {
        setContactFormStatus(
            CONTACT_FORM_STATUS.ERROR,
            'Unable to send your message. Please check your connection and try again.'
        );
    } finally {
        setContactFormLoading(false);
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
}
