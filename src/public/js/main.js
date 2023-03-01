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