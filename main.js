// ===============================
// Testimonials Slider
// ===============================
let testimonials = document.querySelectorAll(".testimonial");
let testimonialIndex = 0;

function rotateTestimonials() {
  if (testimonials.length === 0) return;
  testimonials.forEach(t => t.style.display = "none");
  testimonials[testimonialIndex].style.display = "block";
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
}

// Start testimonials rotation every 5 seconds
rotateTestimonials(); // show first immediately
setInterval(rotateTestimonials, 5000);


// ===============================
// Hero Gallery Slider (Images in ROOT)
// ===============================
const heroSlidesContainer = document.querySelector(".hero-slider .slides");
const totalHeroImages = 17; // images 1.jpg → 17.jpg
let heroCurrent = 1;

// Dynamically load images
for (let i = 1; i <= totalHeroImages; i++) {
    const img = document.createElement("img");
    img.src = `${i}.jpg`;  // Images are in the root
    img.alt = `Hero Image ${i}`;
    if (i === 1) img.classList.add("active"); // first image active
    heroSlidesContainer.appendChild(img);
}

const heroImages = document.querySelectorAll(".hero-slider .slides img");

// Function to go to next hero slide
function nextHeroSlide() {
    heroImages[heroCurrent - 1].classList.remove("active");
    heroCurrent = heroCurrent === totalHeroImages ? 1 : heroCurrent + 1;
    heroImages[heroCurrent - 1].classList.add("active");
}

// Auto-slide every 4 seconds
setInterval(nextHeroSlide, 4000);


// ===============================
// Optional: Make hero slider fade
// ===============================
// Make sure your CSS has:
// .hero-slider .slides img { 
//   position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity 1s; }
// .hero-slider .slides img.active { opacity:1; z-index:1; }
