const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    // Toggle navvar
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.getElementsByClassName.animation){
            link.getElementsByClassName.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .3}s`;
            console.log(index / 7);
        }
    })
}

navSlide();

// active links
const links = document.querySelectorAll('.links');


links.forEach(el => {el.addEventListener("click", () => {
    document.querySelector('.active-link').classList.remove('active-link');
    el.classList.toggle('active-link');
})})

document.querySelector('.active-link');


// Onscroll animation

let section = document.querySelectorAll("section-");
let menu = document.querySelectorAll("header nav a");

window.onscroll = () => {
  section.forEach((i) => {
    let top = window.scrollY;
    let offset = i.offsetTop - 150;
    let height = i.offsetHeight;
    let id = i.getAttribute("id");

    if (top >= offset && top < offset + height) {
      menu.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

function reveal() {
    const reveals = document.querySelectorAll(".reveal");
  
    for (let i = 0; i < reveals.length; i++) {
    //   console.log(reveals[i].getBoundingClientRect());
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      console.log(windowHeight);
      const elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", reveal);

//   Form validation

// const formValidation = () => {

// }

