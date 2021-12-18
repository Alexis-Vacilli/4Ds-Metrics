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
    console.log(id)
    
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

const setActive = (id) =>{
    const links = document.querySelectorAll(".active-link")
    
    links.forEach(link =>{
        link.classList.remove("active-link");
    })
    const active = document.getElementById(`nav-${id}`);
    active.classList.add("active-link")
}
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll(".section");
    let y = 0
    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const elementTop = reveals[i].getBoundingClientRect().top;
      const elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
        console.log(i)
        setActive(sections[i+1].id)
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", () =>{
      reveal()
  });

//   Form validation

// const form = document.querySelector("#form");
// const firstName = document.querySelector("#firstname");
// const lastName = document.querySelector("#lastname");
// const email = document.querySelector("#email");

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     checkInputs();
// })

// const checkInputs = () => {
//     const firstNameValue = firstName.value.trim();
//     const lastNameValue = lastName.value.trim();
//     const emailValue = email.value.trim();

//     if(firstNameValue === "") {
//         setErrorFor(firstName, "First name cannot be blank!")
//     } else {
//         setSuccessFor(firstName)
//     }
// }

// const setError = (input, message) => {
   
// }


const btnLearn = document.querySelectorAll(".show-pop-up");
const signIn = document.querySelector("#signin-button");
const getStartedButton = document.querySelector("#get-started");
const readMore = document.querySelector(".read-more");

readMore.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#sign-in-popup").classList.add("active-popup");
  document.querySelector('.page-content').style.display = 'none';

});

getStartedButton.addEventListener("click", () => {

  document.querySelector("#sign-in-popup").classList.add("active-popup");
  document.querySelector('.page-content').style.display = 'none';

});

signIn.addEventListener("click", () => {
  document.querySelector("#sign-in-popup").classList.add("active-popup");
  document.querySelector('.page-content').style.display = 'none';

});

Array.from(btnLearn).forEach(el => {
  el.addEventListener("click", (e) => {
    const id = e.target.parentNode.parentNode.id;
    document.querySelector(`#${id}-popup`).classList.add("active-popup");
    document.querySelector('.page-content').style.display = "none";
    // document.querySelector(".blurry-body").style.display = "block";

  })
})


const buttonClose = document.querySelectorAll(".close-btn");
console.log(buttonClose);
Array.from(buttonClose).forEach(el => {
  el.addEventListener("click", () => {
    removeActive();
    document.querySelector('.page-content').style.display = "block";
    // document.querySelector(".blurry-body").style.display = "none";
  })
})


const removeActive = () => {
  const a = document.querySelectorAll('.active-popup');

  Array.from(a).forEach(el => {
    el.classList.remove("active-popup");
  })
}


// Header text animations script

const typed = new Typed(".auto-input", {
  strings: ["Define", "Design", "Develop", "and Deploy", "Define, Design, Develop and Deploy"],
  typeSpeed: 100,
  backSpeed: 50,
  loop: true
})