// Testimonials Slider
let testimonials = document.querySelectorAll(".testimonial");
let index = 0;
function rotateTestimonials(){
  if(testimonials.length === 0) return;
  testimonials.forEach(t => t.style.display="none");
  testimonials[index].style.display="block";
  index = (index+1)%testimonials.length;
}
setInterval(rotateTestimonials, 5000);

// Hero Gallery Slider for 1-17.JPG
const heroSlidesContainer = document.querySelector(".hero-slider .slides");
const totalHeroImages = 17; // load 1.JPG → 17.JPG
let heroCurrent = 1;

// Dynamically load images
for (let i = 1; i <= totalHeroImages; i++) {
  const img = document.createElement("img");
  img.src = `{i}.JPG`; // match uppercase extension
  if (i === 1) img.classList.add("active");
  heroSlidesContainer.appendChild(img);
}

const heroImages = document.querySelectorAll(".hero-slider .slides img");

function nextHeroSlide() {
  heroImages[heroCurrent - 1].classList.remove("active");
  heroCurrent = heroCurrent === totalHeroImages ? 1 : heroCurrent + 1;
  heroImages[heroCurrent - 1].classList.add("active");
}

// Auto-slide every 4 seconds

setInterval(nextHeroSlide, 4000);
