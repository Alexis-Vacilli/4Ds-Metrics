const component1 = document.getElementById("component-one");
const component2 = document.getElementById("component-two");
const goToTopics = document.getElementById("next");
const back = document.getElementById("back");
const cards = document.querySelectorAll(".card");
const readMoreBtn = document.querySelector(".read-more-button");
const text = document.querySelector(".text-paragraph")
const prev_btn = document.querySelector(".prev");
const next_btn = document.querySelector(".next");

let section = 1;

const availableSteps = () => {
  if (section === 1) {
    document.querySelector(".back").style.display = "none";
    document.querySelector(".finish").style.display = "none";
  } else if (section === 3) {
    document.querySelector(".forward").style.display = "none";
    document.querySelector(".finish").style.display = "inline";
    prev_btn.style.display = "none";
    next_btn.style.display = "none";
  } else {
    document.querySelector(".finish").style.display = "none";
    document.querySelector(".back").style.display = "inline";
    document.querySelector(".forward").style.display = "inline";
    prev_btn.style.display = "block";
    next_btn.style.display = "block";
  }
}
next_btn.addEventListener("click", () => {
  document.querySelector(`.text-${section}`).style.display = "none";
  document.querySelector(`.more-text-${section}`).style.display = "block";
})
prev_btn.addEventListener("click", () => {
  document.querySelector(`.text-${section}`).style.display = "block";
  document.querySelector(`.more-text-${section}`).style.display = "none";
})

availableSteps();


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
cards.forEach(el => {
  el.addEventListener("click", () => {
    document.getElementById("component-one").style.display = "none";
    document.getElementById("component-two").style.display = "none";
    document.querySelector(".slideshow-container").style.display = "block";
  })
})

// Slider

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  section += n;
  availableSteps();
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
  if (readMoreBtn.innerText === "Read more") {
    readMoreBtn.innerText = "Read less";
  } else {
    readMoreBtn.innerText = "Read more"
  }
})


