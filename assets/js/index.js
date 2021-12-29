const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    // Toggle navvar
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });
    navLinks.forEach(el => {
      el.addEventListener("click", () => {
        nav.classList.remove('nav-active');
      })
    })
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.getElementsByClassName.animation){
            link.getElementsByClassName.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + .3}s`;
            // console.log(index / 7);
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
    // console.log(id)
    
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
        // console.log(i)
        setActive(sections[i].id)
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  window.addEventListener("scroll", () =>{
      reveal()
  });

//   Form data & validations

const scriptURL = 'https://script.google.com/macros/s/AKfycbyzHU2NuPBIHCCiLnZfHsaKNsgjKxhEG-8D_AFOIMymmr9O4RQnlyua4jKowJ4DHSOoCg/exec';

const form = document.forms['google-sheet'];
const success = document.querySelector(".success");

form.addEventListener('submit', e => {
    e.preventDefault();
    formValidations();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })

const formValidations = () => {
    const name = document.querySelector("#name");
    const email = document.querySelector("#contact-email");
    const message = document.querySelector("#message");
    const failure = document.querySelector(".failure")

    if(name.value == "") {
        failure.innerHTML = "Invalid input!"
    }

}

// const submitForm = (event) => {
    
//     event.preventDefault();
//     // Get input values
//     console.log('2332242')
//     const email = document.querySelector("#contact-email").value;
//     const message = document.querySelector("#message").value;
// }

// const contactForm = document.querySelector("#contact-form").addEventListener("submit", submitForm);



// Pop ups

const serviceCard = document.querySelectorAll(".service-card");
const box = document.querySelectorAll(".box");
const signIn = document.querySelector("#signin-button");
const getStartedButton = document.querySelector("#get-started");
const readMore = document.querySelector(".read-more");
const startButtons = document.querySelectorAll(".start");


startButtons.forEach(el => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#get-started-popup").classList.add("active-popup");
    document.querySelector('.page-content').style.filter = "blur(10px)";
  })
})

getStartedButton.addEventListener("click", () => {
  document.querySelector("#get-started-popup").classList.add("active-popup");
  document.querySelector('.page-content').style.filter = "blur(10px)";

});

signIn.addEventListener("click", () => {
  document.querySelector("#sign-in-popup").classList.add("active-popup");
  document.querySelector('.page-content').style.filter = "blur(10px)";

});

Array.from(serviceCard).forEach(el => {
  el.addEventListener("click", (e) => {
    const id = e.target.id;
    document.querySelector('.page-content').style.filter = "blur(10px)";
    document.querySelector(`#${id}-popup`).classList.add("active-popup");
  })
})

Array.from(box).forEach(el => {
  el.addEventListener("click", (e) => {
    const id = e.target.parentNode.id;
    document.querySelector('.page-content').style.filter = "blur(10px)";
    document.querySelector(`#${id}-popup`).classList.add("active-popup");
  })
})

Array.from(serviceCard).forEach(el => {
  el.addEventListener("click", (e) => {
    const id = e.target.parentNode.parentNode.id;
    document.querySelector('.page-content').style.filter = "blur(10px)";
    document.querySelector(`#${id}-popup`).classList.add("active-popup");
  })
})




const buttonClose = document.querySelectorAll(".close-btn");
Array.from(buttonClose).forEach(el => {
  el.addEventListener("click", () => {
    removeActive();
    const section = document.querySelector(".max-width");
    const navBar = document.querySelector(".nav-bar");
    section.style.filter = "blur(0)";
    navBar.style.filter = "blur(0)";
    document.querySelector('.page-content').style.filter = "blur(0)";
    document.querySelector('.page-content').style.display = "block";

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