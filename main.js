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

// Hero Gallery Slider for 1 to 23 (supports both .jpg and .jpeg)
const heroSlidesContainer = document.querySelector(".hero-slider .slides");
const totalHeroImages = 23;
let heroCurrent = 1;
let imagesLoaded = 0;
const heroImagesArray = [];

// Function to try loading image with multiple extensions
function tryLoadImage(imgElement, i, extensionIndex) {
    const extensions = ['JPG', 'JPEG', 'jpg', 'jpeg'];
    
    if (extensionIndex >= extensions.length) {
        // Fallback - no image found
        imgElement.src = `images/${i}.jpg`;
        imgElement.classList.add('error-load');
        return;
    }
    
    imgElement.src = `images/${i}.${extensions[extensionIndex]}`;
    
    imgElement.onerror = function() {
        tryLoadImage(imgElement, i, extensionIndex + 1);
    };
    
    imgElement.onload = function() {
        // Successfully loaded
    };
}

// Dynamically load images
for (let i = 1; i <= totalHeroImages; i++) {
    const img = document.createElement("img");
    tryLoadImage(img, i, 0);
    if (i === 1) img.classList.add("active");
    heroSlidesContainer.appendChild(img);
    heroImagesArray.push(img);
}

const heroImages = document.querySelectorAll(".hero-slider .slides img");

function nextHeroSlide() {
  if (heroImages.length === 0) return;
  heroImages[heroCurrent - 1].classList.remove("active");
  heroCurrent = heroCurrent === totalHeroImages ? 1 : heroCurrent + 1;
  heroImages[heroCurrent - 1].classList.add("active");
}

// Auto-slide every 4 seconds
setInterval(nextHeroSlide, 4000);