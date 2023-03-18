new fullpage('#fullpage', {
    //options here
    autoScrolling: true,
    scrollBar: false
});
document.querySelectorAll("a").forEach((el) => {
    if (el.href == "https://alvarotrigo.com/fullPage/") {
        el.remove();
    }
});
particlesJS.load('c1', 'dist/assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
});