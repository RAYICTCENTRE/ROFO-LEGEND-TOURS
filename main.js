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

// Hero Gallery Slider
const heroSlidesContainer = document.querySelector(".hero-slider .slides");
const totalHeroImages = 23;
let heroCurrent = 1;
let loadedCount = 0;

if (heroSlidesContainer) {
    heroSlidesContainer.innerHTML = '';
}

function createImageElement(i) {
    return new Promise((resolve) => {
        const img = document.createElement("img");
        img.style.display = "none";
        
        const extensions = ['jpg', 'jpeg', 'JPG', 'JPEG'];
        let testIndex = 0;
        
        function testNext() {
            if (testIndex >= extensions.length) {
                img.src = `images/${i}.jpg`;
                img.alt = `Slide ${i}`;
                resolve(img);
                return;
            }
            
            const testImg = new Image();
            testImg.onload = function() {
                img.src = `images/${i}.${extensions[testIndex]}`;
                resolve(img);
            };
            testImg.onerror = function() {
                testIndex++;
                testNext();
            };
            testImg.src = `images/${i}.${extensions[testIndex]}`;
        }
        
        testNext();
    });
}

async function loadAllImages() {
    for (let i = 1; i <= totalHeroImages; i++) {
        const img = await createImageElement(i);
        if (i === 1) {
            img.classList.add("active");
            img.style.display = "block";
        }
        heroSlidesContainer.appendChild(img);
    }
    
    // Start slideshow after all images loaded
    const heroImages = document.querySelectorAll(".hero-slider .slides img");
    
    function nextHeroSlide() {
        if (heroImages.length === 0) return;
        heroImages[heroCurrent - 1].style.display = "none";
        heroImages[heroCurrent - 1].classList.remove("active");
        heroCurrent = heroCurrent === totalHeroImages ? 1 : heroCurrent + 1;
        heroImages[heroCurrent - 1].style.display = "block";
        heroImages[heroCurrent - 1].classList.add("active");
    }
    
    setInterval(nextHeroSlide, 4000);
}

loadAllImages();