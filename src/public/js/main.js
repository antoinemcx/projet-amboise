// MOBILE HAMBURGER MENU
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav__links");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


// SCROLL DOWN
$(function() {
    $('a[href*=#]').on('click', function(e) {
        e.preventDefault();
        if(['#projects', '#contact'].includes(e.currentTarget.hash) && e.currentTarget.baseURI.split('/').pop('/').length > 1) {
            console.log('e')
            window.location.href = window.location.origin + e.currentTarget.hash
        } else {
            if($($(this).attr('href')).offset() === undefined) { return }
            $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear').catch(() => {});
        }
    });
});


// REVEAL EFFECT
const handleIntersect = function(entries, observer) {
    entries.forEach(function(entry) {
        if(entry.intersectionRatio > .1) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
        }
    })
}
const observer = new IntersectionObserver(handleIntersect, { root: null, rootMargin: '0px', threshold: .1 });
document.querySelectorAll('[class*="reveal"]').forEach(function(r) { observer.observe(r) });


// BACK TO TOP
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
});


// MEDIA SLIDER
const img_slider = document.getElementsByClassName('slider-img');
let stage = 0; let img_amount = img_slider.length;
const slider_previous = document.querySelector('.previous');
const slider_next = document.querySelector('.next');
const slider_pagination = document.querySelectorAll('.slider_pagination_bubbles span')

function removeSliderActiveImages() {
    for(let i=0; i<img_amount ; i++) {
        img_slider[i].classList.remove('active');
        slider_pagination.forEach(pag => pag.classList.remove('active'));
    }
}

function showNextSliderImage() {
    stage++;
    if(stage >= img_amount) { stage = 0; }

    removeSliderActiveImages();
    img_slider[stage].classList.add('active');
    slider_pagination[stage].classList.add('active');
}
slider_next.addEventListener('click', function() { showNextSliderImage() });

slider_previous.addEventListener('click', function() {
    stage--;
    if(stage < 0) { stage = img_amount - 1; }

    removeSliderActiveImages();
    img_slider[stage].classList.add('active');
    slider_pagination[stage].classList.add('active');
});

for(let i=0; i<slider_pagination.length ; i++) {
    slider_pagination[i].addEventListener('click', () => {
        showNextSliderImage();
    })
}
// setInterval(function() { showNextSliderImage(); }, 4000)


// MODAL OPENING MEDIA SLIDE
const modal = document.querySelector('#modal');
const closeModalButtons = document.querySelector('[data-modal-close]');

function openSlider(position) {
    stage = position;
    removeSliderActiveImages()
    img_slider[position].classList.add('active');
    slider_pagination[position].classList.add('active');

    if(modal === null) { return }
    modal.classList.add('active');
 
    $('body').addClass('no-scroll')
}

function closeSlider(modal) {
    if(modal === null) { return }
    stage = 0;
    modal.classList.remove('active');
    
    $('body').removeClass('no-scroll');
    window.location.href = window.location.origin + '#medias'
};

closeModalButtons.addEventListener('click', () => { closeSlider(modal); })