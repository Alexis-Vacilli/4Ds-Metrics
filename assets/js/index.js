// Global varibles 
const failure = document.querySelector("#failure");
const success = document.querySelector("#success");


// Navigation bar
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  // Toggle navvar
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
  });
  navLinks.forEach((el) => {
    el.addEventListener("click", () => {
      nav.classList.remove("nav-active");
    });
  });
  // Animate Links
  navLinks.forEach((link, index) => {
    if (link.getElementsByClassName.animation) {
      link.getElementsByClassName.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
      // console.log(index / 7);
    }
  });
};

navSlide();

// active links
const links = document.querySelectorAll(".links");

links.forEach((el) => {
  el.addEventListener("click", () => {
    document.querySelector(".active-link").classList.remove("active-link");
    el.classList.toggle("active-link");
  });
});

document.querySelector(".active-link");

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

const setActive = (id) => {
  const links = document.querySelectorAll(".active-link");

  links.forEach((link) => {
    link.classList.remove("active-link");
  });
  const active = document.getElementById(`nav-${id}`);
  active.classList.add("active-link");
};
function reveal() {
  const reveals = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll(".section");
  let y = 0;
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
      // console.log(i)
      setActive(sections[i].id);
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", () => {
  reveal();
});

//   Form data & validations

// Contact us
const scriptURL =
  "https://script.google.com/macros/s/AKfycbyzHU2NuPBIHCCiLnZfHsaKNsgjKxhEG-8D_AFOIMymmr9O4RQnlyua4jKowJ4DHSOoCg/exec";

const form = document.forms["google-sheet"];


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(!validation()){
    return false;
  }
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Success!", response);
      success.style.display = "block";  
      setTimeout(() => {
        success.style.display = "none";  
      }, 3000);
      clearFields();
    })
    .catch((error) => console.error("Error!", error.message));
});


const validation = () => {
  const name = document.querySelector("#name");
  const email = document.querySelector("#contact-email")
  const message = document.querySelector("#message");
  const failure = document.querySelector("#failure");


  // Validating name
  if(name.value === ""){
    failure.style.display = "block";
    failure.innerHTML = `Name is required! <i class="fas fa-times-circle"></i>`;
    return false
  }
  // Validating email
  if(!emailValidation(email.value, failure)){
    return false;
  }
  // Validating message
  if(message.value === "") {
    failure.style.display = "block";
    failure.innerHTML = `Message is required! <i class="fas fa-times-circle"></i>`;
    return false
  } 
 
  failure.style.display = "none";
  failure.innerText = "";
  return true
}

// Clear fields 
const clearFields = () => {
  const name = document.querySelector("#name");
  const email = document.querySelector("#contact-email")
  const message = document.querySelector("#message");


  name.value = "";
  email.value = "";
  message.value = ""
}


// Email validation
const emailValidation = (email, failure) => {
  const regx = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
  // Email validations
  if(regx.test(email)){
    return true
  }else if(email === "") {
    failure.style.display = "block";
    failure.innerHTML = `Email is required! <i class="fas fa-times-circle"></i>`;
    return false
  }
  else{
    failure.style.display = "block";
    failure.innerHTML = `Invalid email ID! <i class="fas fa-times-circle"></i>`;
    return false
  }
 
};

// Sign in form

const scriptURLTwo =
  "https://script.google.com/macros/s/AKfycbxRzMpURbs2EN3tRDCS9A91VvQNaiyXToPzUcdSOUGYpQwCdiTx-K4gM5DCvArZCTpB/exec";

const signInForm = document.getElementById("sign-in-form");

signInForm.addEventListener("submit", (e) => {
  const email = document.querySelector("#email-signin");
  const failure = document.querySelector("#error-signin-email");
  const success = document.querySelector("#success-signin-email");
  const subscribeBtn = document.querySelector(".subscribe-btn");
  e.preventDefault();
  subscribeBtn.classList.add("button-loading");
  if(!emailValidation(email.value, failure)){
    subscribeBtn.classList.remove("button-loading");
    return false;
  } 
  fetch(scriptURLTwo, { method: "POST", body: new FormData(signInForm) })
    .then((response) => {
      console.log("Success!", response);
      failure.style.display = "none";
      failure.innerText = "";
      success.style.display = "block";
      subscribeBtn.style.display = "none"
      subscribeBtn.classList.remove("button-loading");
      clearFields();
      setTimeout(() => {
        removeActive();
        removeBlur();
        success.style.display = "none";
      }, 1000);
      setTimeout(() => {
        subscribeBtn.style.display = "block"
      }, 2000);
    })
    .catch((error) => console.error("Error!", error.message));
});

// Get started

const scriptURLSix =
  "https://script.google.com/macros/s/AKfycby-tx3T8k5Vel9SylbhlnRMK0ZxYmcLy5Am_qJNFy6JEB9xPl5Sje3GQ6UgMBMUvxbOmA/exec";

const getStartedForm = document.getElementById("get-started-form");
getStartedForm.addEventListener("submit", (e) => {
  const email = document.querySelector("#email-get-started");
  const failure = document.querySelector("#error-get-started");
  const success = document.querySelector("#success-get-started");
  const subscribeBtn = document.querySelector(".subscribe-btn-get-started");
  e.preventDefault();
  subscribeBtn.classList.add("button-loading");
  if(!emailValidation(email.value, failure)){
    subscribeBtn.classList.remove("button-loading");
    return false;
  } 
  fetch(scriptURLSix, { method: "POST", body: new FormData(getStartedForm) })
    .then((response) => {
      console.log("Success!", response);
      failure.style.display = "none";
      failure.innerText = "";
      success.style.display = "block";
      subscribeBtn.style.display = "none"
      subscribeBtn.classList.remove("button-loading");
      clearFields();
      // setTimeout(() => {
      //   removeActive();
      //   removeBlur();
      //   success.style.display = "none";
      // }, 1000);
      // setTimeout(() => {
      //   subscribeBtn.style.display = "block"
      // }, 2000);
    })
    .catch((error) => console.error("Error!", error.message));
});

// Free plan form
const scriptURLThree =
  "https://script.google.com/macros/s/AKfycbzk9Acpze9JSLcZ3rvok2kvXjwbLyoXHv-ZLmHskK3iibWrdayuALdQHYeSQTcGtdf6Vw/exec";

const freePlanForm = document.getElementById("free-plan-form");

freePlanForm.addEventListener("submit", (e) => {
  const email = document.querySelector("#free-email");
  const failure = document.querySelector("#error-free-plan");
  const success = document.querySelector("#success-free-plan");
  const subscribeBtn = document.querySelector(".subscribe-btn-free-plan");
  e.preventDefault();
  subscribeBtn.classList.add("button-loading");
  if(!emailValidation(email.value, failure)){
    subscribeBtn.classList.remove("button-loading");
    return false;
  } 
  fetch(scriptURLThree, { method: "POST", body: new FormData(freePlanForm) })
    .then((response) => {
      console.log("Success!", response);
      failure.style.display = "none";
      failure.innerText = "";
      success.style.display = "block";
      subscribeBtn.style.display = "none"
      subscribeBtn.classList.remove("button-loading");
      clearFields();
      setTimeout(() => {
        removeActive();
        removeBlur();
        success.style.display = "none";
      }, 1000);
      setTimeout(() => {
        subscribeBtn.style.display = "block"
      }, 2000);
    })
    .catch((error) => console.error("Error!", error.message));
});

// Standard plan form

const scriptURLFour =
  "https://script.google.com/macros/s/AKfycbx0G30dRgr3-db9LYrT5CckIiDMJxlsWeEnbOb7d75NxEcLp71fXQGh-R71tNPDal-n/exec";

const standardPlanForm = document.getElementById("standard-plan-form");
standardPlanForm.addEventListener("submit", (e) => {
  const email = document.querySelector("#standard-email");
  const failure = document.querySelector("#error-standard-plan");
  const success = document.querySelector("#success-standard-plan");
  const subscribeBtn = document.querySelector(".subscribe-btn-standard-plan");
  e.preventDefault();
  subscribeBtn.classList.add("button-loading");
  if(!emailValidation(email.value, failure)){
    subscribeBtn.classList.remove("button-loading");
    return false;
  } 
  fetch(scriptURLFour, { method: "POST", body: new FormData(standardPlanForm) })
    .then((response) => {
      console.log("Success!", response);
      failure.style.display = "none";
      failure.innerText = "";
      success.style.display = "block";
      subscribeBtn.style.display = "none"
      subscribeBtn.classList.remove("button-loading");
      clearFields();
      setTimeout(() => {
        removeActive();
        removeBlur();
        success.style.display = "none";
      }, 1000);
      setTimeout(() => {
        subscribeBtn.style.display = "block"
      }, 2000);
    })
    .catch((error) => console.error("Error!", error.message));
});

// Standard plan form

const scriptURLFive =
  "https://script.google.com/macros/s/AKfycbxVoK53l3koSHLzC5K6loggIiC0OCfde1CQYw-ZOQnltIbHYPRGTO6DqO6U1SUKYqxZ/exec";

const premiumPlanForm = document.getElementById("premium-plan-form");
premiumPlanForm.addEventListener("submit", (e) => {
  const email = document.querySelector("#premium-email");
  const failure = document.querySelector("#error-premium-plan");
  const success = document.querySelector("#success-premium-plan");
  const subscribeBtn = document.querySelector(".subscribe-btn-premium-plan");
  e.preventDefault();
  subscribeBtn.classList.add("button-loading");
  if(!emailValidation(email.value, failure)){
    subscribeBtn.classList.remove("button-loading");
    return false;
  } 
  fetch(scriptURLFive, { method: "POST", body: new FormData(premiumPlanForm) })
    .then((response) => {
      console.log("Success!", response);
      failure.style.display = "none";
      failure.innerText = "";
      success.style.display = "block";
      subscribeBtn.style.display = "none"
      subscribeBtn.classList.remove("button-loading");
      clearFields();
      setTimeout(() => {
        removeActive();
        removeBlur();
        success.style.display = "none";
      }, 1000);
      setTimeout(() => {
        subscribeBtn.style.display = "block"
      }, 2000);
    })
    .catch((error) => console.error("Error!", error.message));
});


// Pop ups

const serviceCard = document.querySelectorAll(".service-card");
const box = document.querySelectorAll(".box");
const signIn = document.querySelector("#signin-button");
const getStartedButton = document.querySelector("#get-started");
const readMore = document.querySelector(".read-more");
const freeStart = document.querySelector(".free");
const standardStart = document.querySelector(".standard");
const premiumStart = document.querySelector(".premium");
const subscribeBtn = document.querySelectorAll(".subscribe-btn");

freeStart.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#start-popup-free").classList.add("active-popup");
  document.querySelector(".page-content").style.filter = "blur(10px)";
});

standardStart.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#start-popup-standard").classList.add("active-popup");
  document.querySelector(".page-content").style.filter = "blur(10px)";
});

premiumStart.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#start-popup-premium").classList.add("active-popup");
  document.querySelector(".page-content").style.filter = "blur(10px)";
});

getStartedButton.addEventListener("click", () => {
  document.querySelector("#get-started-popup").classList.add("active-popup");
  document.querySelector(".page-content").style.filter = "blur(10px)";
});

signIn.addEventListener("click", () => {
  document.querySelector("#sign-in-popup").classList.add("active-popup");
  document.querySelector(".page-content").style.filter = "blur(10px)";
});

Array.from(serviceCard).forEach((el) => {
  el.addEventListener("click", (e) => {
    const id = e.target.id;
    document.querySelector(".page-content").style.filter = "blur(10px)";
    document.querySelector(`#${id}-popup`).classList.add("active-popup");
  });
});

Array.from(box).forEach((el) => {
  el.addEventListener("click", (e) => {
    const id = e.target.parentNode.id;
    document.querySelector(".page-content").style.filter = "blur(10px)";
    document.querySelector(`#${id}-popup`).classList.add("active-popup");
  });
});

Array.from(serviceCard).forEach((el) => {
  el.addEventListener("click", (e) => {
    const id = e.target.parentNode.parentNode.id;
    document.querySelector(".page-content").style.filter = "blur(10px)";
    document.querySelector(`#${id}-popup`).classList.add("active-popup");
  });
});

const buttonClose = document.querySelectorAll(".close-btn");
Array.from(buttonClose).forEach((el) => {
  el.addEventListener("click", () => {
    removeActive();
    removeBlur();
  });
});

const removeBlur = () => {
  const section = document.querySelector(".max-width");
  const navBar = document.querySelector(".nav-bar");
  section.style.filter = "blur(0)";
  navBar.style.filter = "blur(0)";
  document.querySelector(".page-content").style.filter = "blur(0)";
  document.querySelector(".page-content").style.display = "block";
};

const removeActive = () => {
  const a = document.querySelectorAll(".active-popup");

  Array.from(a).forEach((el) => {
    el.classList.remove("active-popup");
  });
};

// Header text animations script

const typed = new Typed(".auto-input", {
  strings: [
    "Define",
    "Design",
    "Develop",
    "and Deploy",
    "Define, Design, Develop and Deploy",
  ],
  typeSpeed: 100,
  backSpeed: 50,
  loop: true,
});
