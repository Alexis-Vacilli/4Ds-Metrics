const component1 = document.getElementById("component-one");
const component2 = document.getElementById("component-two");
const goToTopics = document.getElementById("next");
const back = document.getElementById("back");
const cards = document.querySelectorAll(".card");
const readMoreBtn = document.querySelector(".read-more-button");
const text = document.querySelector(".text-paragraph")


// Navigating to topics
goToTopics.onclick = () => {
  component1.style.left = "-180%";
  component2.style.left = "50%";
};
back.onclick = () => {
  component1.style.left = "50%";
  component2.style.left = "180%";
};

// Cards
cards.forEach( el => {
  el.addEventListener("click", () => {
    document.getElementById("component-one").style.display = "none";
    document.getElementById("component-two").style.display = "none";
    document.querySelector(".slideshow-container").style.display = "block";
  })
} )

// Slider

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Read more button

readMoreBtn.addEventListener("click", () => {
  text.classList.toggle('show-more');
  if(readMoreBtn.innerText === "Read more"){
    readMoreBtn.innerText = "Read less";
  } else {
    readMoreBtn.innerText = "Read more"
  }
})