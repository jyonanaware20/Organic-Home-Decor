// document.addEventListener("DOMContentLoaded", function () {
//     const footer = document.querySelector(".footer");

//     footer.addEventListener("mouseenter", function () {
//         footer.classList.add("show");
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const heroSection = document.querySelector(".hero");
//     const heroHeader1 = document.querySelector(".hero .hero-header1");

//     heroSection.addEventListener("mouseenter", function () {
//         heroHeader1.classList.add("show"); // Add the class to make it visible
//     });
// });
// document.addEventListener("DOMContentLoaded", function () {
//     const heroSection = document.querySelector(".hero");
//     const heroHeader2 = document.querySelector(".hero .hero-header2");

//     heroSection.addEventListener("mouseenter", function () {
//         heroHeader2.classList.add("show"); // Add the class to make it visible
//     });
// });
// document.addEventListener("DOMContentLoaded", function () {
//     const hero1 = document.querySelector(".hero1");
//     const heroh1 = document.querySelector(".hero1 h1");
//     const heroslider = document.querySelector(".hero1 .hero1-slider");

//     hero1.addEventListener("mouseenter", function () {
//         heroslider.classList.add("show"); // Add the class to make it visible
//         heroh1.classList.add("show"); // Add the class to make it visible
//     });
// });
// document.addEventListener("DOMContentLoaded", function () {
//     const aboutus = document.querySelector(".about-us");
//     const h1 = document.querySelector(".h1-1");
//     const h2 = document.querySelector(".h1-2");
//     const h3 = document.querySelector(".h1-3");
//     const h4 = document.querySelector(".h1-4");

//     aboutus.addEventListener("mouseenter", function () {
//         h1.classList.add("show");
//         h2.classList.add("show");
//         h3.classList.add("show");
//         h4.classList.add("show");

//     });
// });
// document.addEventListener("DOMContentLoaded", function () {
//     const aboutus = document.querySelector(".about-us");
//     const h1 = document.querySelector(".h2-1");
//     const h2 = document.querySelector(".h2-2");
//     const h3 = document.querySelector(".h2-3");

//     aboutus.addEventListener("mouseenter", function () {
//         h1.classList.add("show");
//         h2.classList.add("show");
//         h3.classList.add("show");

//     });
// });
// document.addEventListener("DOMContentLoaded", function () {
//     const coll = document.querySelector(".collection");
//     const collh1 = document.querySelector(".collection .newcoll");
//     const collimg = document.querySelector(".collection .midimg");

//     coll.addEventListener("mouseenter", function () {
//         collh1.classList.add("show");
//         collimg.classList.add("show");
//     });
// });
document.addEventListener("DOMContentLoaded", function () {
    // Initialize ScrollReveal
    ScrollReveal().reveal('.footer', { delay: 200, distance: '50px', origin: 'bottom', duration: 800 });

    ScrollReveal().reveal('.hero .hero-header1', { delay: 300, distance: '50px', origin: 'left', duration: 800 });
    ScrollReveal().reveal('.hero .hero-header2', { delay: 400, distance: '50px', origin: 'right', duration: 800 });

    ScrollReveal().reveal('.hero1 h1', { delay: 300, distance: '50px', origin: 'top', duration: 800 });
    ScrollReveal().reveal('.hero1 .hero1-slider', { delay: 400, distance: '50px', origin: 'bottom', duration: 800 });

    // ScrollReveal().reveal('.about-us .h1-1, .about-us .h1-2, .about-us .h1-3, .about-us .h1-4', { delay: 300, distance: '50px', origin: 'left', duration: 800, interval: 200 });
    // ScrollReveal().reveal('.about-us .h2-1, .about-us .h2-2, .about-us .h2-3', { delay: 300, distance: '50px', origin: 'right', duration: 800, interval: 200 });

    ScrollReveal().reveal('.collection .newcoll h1', { delay: 300, distance: '50px', origin: 'top', duration: 800 });
    ScrollReveal().reveal('.collection .midimg', { delay: 400, distance: '50px', origin: 'bottom', duration: 800 });
    // *************************************************************************************************
    ScrollReveal().reveal('.h1-1', { 
        delay: 500, distance: '60px', origin: 'left', duration: 1200, 
        opacity: 0, reset: false, easing: 'ease-in-out'
    });
    ScrollReveal().reveal('.h1-2', { 
        delay: 1000, distance: '60px', origin: 'left', duration: 1200, 
        opacity: 0, reset: false, easing: 'ease-in-out'
    });
    ScrollReveal().reveal('.h1-3', { 
        delay: 1500, distance: '60px', origin: 'left', duration: 1200, 
        opacity: 0, reset: false, easing: 'ease-in-out'
    });
    ScrollReveal().reveal('.h1-4', { 
        delay: 2000, distance: '60px', origin: 'left', duration: 1200, 
        opacity: 0, reset: false, easing: 'ease-in-out'
    });

    // Right side animations
    ScrollReveal().reveal('.h2-1', { 
        delay: 500, distance: '60px', origin: 'right', duration: 1200, 
        opacity: 0, reset: false, easing: 'ease-in-out'
    });
    ScrollReveal().reveal('.h2-2', { 
        delay: 1400, distance: '60px', origin: 'right', duration: 1200, 
        opacity: 0, reset: false, easing: 'ease-in-out'
    });
    ScrollReveal().reveal('.h2-3', { 
        delay: 2000, distance: '60px', origin: 'right', duration: 1200, 
        opacity: 0, reset: false, easing: 'ease-in-out'
    });

    // Vertical Line Reveal
    ScrollReveal().reveal('.about-us .vertical', { 
        delay: 1000, distance: '50px', origin: 'bottom', duration: 1200, 
        opacity: 0, reset: false, easing: 'ease-in-out'
    });

    
});
