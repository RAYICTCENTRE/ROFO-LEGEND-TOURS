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
let imagesLoadedCount = 0;

// Clear any existing content
if (heroSlidesContainer) {
    heroSlidesContainer.innerHTML = '';
}

// Function to try loading image with multiple extensions
function loadImageWithFallback(imgElement, i) {
    const extensions = ['JPG', 'JPEG', 'jpg', 'jpeg'];
    let currentExtIndex = 0;
    
    function tryNextExtension() {
        if (currentExtIndex >= extensions.length) {
            // All extensions failed - show placeholder
            imgElement.src = 'images/placeholder.jpg';
            imgElement.alt = `Image ${i} not found`;
            imagesLoadedCount++;
            checkAllImagesLoaded();
            return;
        }
        
        const ext = extensions[currentExtIndex];
        imgElement.src = `images/${i}.${ext}`;
        
        imgElement.onload = function() {
            // Image loaded successfully
            imagesLoadedCount++;
            checkAllImagesLoaded();
        };
        
        imgElement.onerror = function() {
            // Try next extension
            currentExtIndex++;
            tryNextExtension();
        };
    }
    
    tryNextExtension();
}

// Function to check when all images are loaded
function checkAllImagesLoaded() {
    if (imagesLoadedCount === totalHeroImages) {
        // All images loaded, start slideshow
        startSlideshow();
    }
}

// Function to start the slideshow
function startSlideshow() {
    const heroImages = document.querySelectorAll(".hero-slider .slides img");
    
    if (heroImages.length === 0) return;
    
    // Ensure first image is active
    heroImages.forEach((img, idx) => {
        if (idx === 0) {
            img.classList.add("active");
            img.style.display = "block";
        } else {
            img.classList.remove("active");
            img.style.display = "none";
        }
    });
    
    // Function to rotate slides
    function nextHeroSlide() {
        const currentImages = document.querySelectorAll(".hero-slider .slides img");
        if (currentImages.length === 0) return;
        
        // Hide current
        currentImages[heroCurrent - 1].classList.remove("active");
        currentImages[heroCurrent - 1].style.display = "none";
        
        // Move to next
        heroCurrent = heroCurrent === totalHeroImages ? 1 : heroCurrent + 1;
        
        // Show next
        currentImages[heroCurrent - 1].classList.add("active");
        currentImages[heroCurrent - 1].style.display = "block";
    }
    
    // Auto-slide every 4 seconds
    setInterval(nextHeroSlide, 4000);
}

// Dynamically create and load images
for (let i = 1; i <= totalHeroImages; i++) {
    const img = document.createElement("img");
    img.style.display = "none"; // Hide all initially
    loadImageWithFallback(img, i);
    heroSlidesContainer.appendChild(img);
}