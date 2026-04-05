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

// Hero Gallery Slider for 1 to 23 (supports both .JPG, .JPEG, .jpg, .jpeg)
const heroSlidesContainer = document.querySelector(".hero-slider .slides");
const totalHeroImages = 23; // load 1 to 23
let heroCurrent = 1;

// Helper function to check if image exists
function imageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
}

// Dynamically load images with extension detection
async function loadHeroImages() {
    for (let i = 1; i <= totalHeroImages; i++) {
        const img = document.createElement("img");
        
        // Try both extensions in order: JPG, JPEG, jpg, jpeg
        const extensions = ['JPG', 'JPEG', 'jpg', 'jpeg'];
        let loaded = false;
        
        for (let ext of extensions) {
            const testPath = `images/${i}.${ext}`;
            const exists = await imageExists(testPath);
            if (exists) {
                img.src = testPath;
                loaded = true;
                break;
            }
        }
        
        // Fallback if no image found
        if (!loaded) {
            img.src = `images/${i}.jpg`; // default fallback
            console.warn(`Image ${i} not found as JPG or JPEG`);
        }
        
        if (i === 1) img.classList.add("active");
        heroSlidesContainer.appendChild(img);
    }
    
    // After loading all images, start the slideshow
    const heroImages = document.querySelectorAll(".hero-slider .slides img");
    
    function nextHeroSlide() {
        if (heroImages.length === 0) return;
        heroImages[heroCurrent - 1].classList.remove("active");
        heroCurrent = heroCurrent === totalHeroImages ? 1 : heroCurrent + 1;
        heroImages[heroCurrent - 1].classList.add("active");
    }
    
    // Auto-slide every 4 seconds
    setInterval(nextHeroSlide, 4000);
}

// Start loading images
loadHeroImages();