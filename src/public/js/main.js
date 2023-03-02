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