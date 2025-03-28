const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');

menuButton.addEventListener('click', function(){

    if (menu.style.display === 'none') {
        menu.style.display = 'block';
        // menuButton.textContent = ;
        menu.style.transition = '0.9s';
        
    } else {
        menu.style.display = 'none';
        // menuButton.textContent = ; 
    }
});
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    dots[i].classList.remove("active");
    if (i === index) {
      slide.classList.add("active");
      dots[i].classList.add("active");
    }
  });
}

function currentSlide(index) {
  currentSlideIndex = index;
  showSlide(index);
}

// Auto-rotate slides every 5 seconds
setInterval(() => {
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  showSlide(currentSlideIndex);
}, 5000);
// Wait for the window to load  
window.addEventListener('load', () => {  
  // Hide the preloader  
  document.getElementById('preloader').style.display = 'block';  
  // Show the main content  
  document.getElementById('content').style.display = 'none';  
});
window.addEventListener('load', () => {  
  setTimeout(() => {  
      document.getElementById('preloader').style.display = 'none';  
      document.getElementById('content').style.display = 'block';  
  }, 3000); // Adjust the time as needed  
});
document.addEventListener('DOMContentLoaded', function () {  
  const element = document.querySelector('.portfolio-about');  
  const elementPosition = element.getBoundingClientRect().top;  

  function onScroll() {  
      const viewportHeight = window.innerHeight;  
      if (elementPosition < viewportHeight) {  
          element.classList.add('active');  
      }  
  }  

  window.addEventListener('scroll', onScroll);  
  window.addEventListener('load', onScroll); // Check on page load as well  
});
function onScroll() {  
  const viewportHeight = window.innerHeight;  
  
  if (elementPosition < viewportHeight) {  
      setTimeout(() => {  
          element.classList.add('active');  
      }, 300); // Change 300 to desired milliseconds  
  }  
}
  // Smooth scrolling behavior  
  document.querySelectorAll('nav a').forEach(anchor => {  
    anchor.addEventListener('click', function (e) {  
        e.preventDefault(); // Prevent the default anchor click behavior  
        const targetId = this.getAttribute('href'); // Get the target section id  
        const targetElement = document.querySelector(targetId); // Get the target element  

        // Scroll to the element with a smooth behavior  
        targetElement.scrollIntoView({  
            behavior: 'smooth',  
            block: 'start' // Adjusts where the section aligns in the viewport  
        });  
    });  
});  
// Get all the buttons  
const buttons = document.querySelectorAll('.li');  

// Add click event listeners to each button  
buttons.forEach(button => {  
    button.addEventListener('click', () => {  
        // Remove the 'active' class from all buttons  
        buttons.forEach(btn => {  
            btn.classList.remove('active');  
        });  
        // Add the 'active' class to the clicked button  
        button.classList.add('active');  
    });  
});
let isWhiteBackground = false; // Initial state  

document.getElementById('colorButton').addEventListener('click', function() {  
  if (isWhiteBackground) {  
    // Change background to black and text to white  
    document.body.style.backgroundColor = '#141516'; // Black background  
    document.body.style.color = '#FFFFFF'; // White text  
  } else {  
    // Change background to white and text to black  
    document.body.style.backgroundColor = '#FFFFFF'; // White background  
    document.body.style.color = '#141516'; // Black text  
  }  
  
  // Toggle the state  
  isWhiteBackground = !isWhiteBackground;  
});