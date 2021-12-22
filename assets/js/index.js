let currentStep = 0;
let innerStep = 0;

const fromValidation = () => {
  let isValid = true;
  const stepQueries = document.querySelectorAll(".step-query");
  const innerNodes = stepQueries[currentStep].querySelectorAll(":scope > .inner-form");
  const inputs = innerNodes[innerStep] ? innerNodes[innerStep].getElementsByTagName("input") : [];
  const errors = innerNodes[innerStep] ? innerNodes[innerStep].querySelectorAll("span.error") : [];
  const errorSelectors = innerNodes[innerStep] ? innerNodes[innerStep].querySelectorAll("h6.error") : [];
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      inputs[i].className += " invalid";
      isValid = false;
      if (errors[i]) {
        errors[i].innerHTML = "*This field can not be empty"
        errors[i].style.display = "block"
      }
    }
    // if (errorSelectors[i] && errorSelectors[i].innerHTML.toLowerCase().includes("select")) {
    //   errorSelectors[i].innerHTML = "*Hover to select an option"
    //   errorSelectors[i].style.display = "block"
    // }
  }

  if (isValid && stepQueries[currentStep] && (innerStep === innerNodes.length-1)) {
    document.querySelectorAll(".step-indicator")[currentStep].className += " finish";
  }
  return isValid;
}

const showStep = () => {
  const stepQueries = document.querySelectorAll(".step-query");
  stepQueries[currentStep].style.display = "block";
  const innerNodes = stepQueries[currentStep].querySelectorAll(":scope > .inner-form");

  for (let i = 0; i < innerNodes.length; i+=1) {
    if (i === innerStep) {
      innerNodes[i].style.display = "block"
    } else {
      innerNodes[i].style.display = "none"
    }
  }

  if (currentStep === 0 && innerStep === 0) {
    document.querySelector("#btn-prev").style.visibility = "hidden";
  } else {
    document.querySelector("#btn-prev").style.visibility = "visible";
  }

  if (currentStep === (stepQueries.length - 1)) {
    document.querySelector("#btn-next").innerHTML = "Submit";
    document.querySelector("#btn-prev").style.visibility = "hidden";
    document.querySelector("#btn-exit").style.visibility = "hidden";
  } else {
    document.querySelector("#btn-next").innerHTML = "Next";
  }
  fixStepIndicator();
  document.querySelector("#progress").innerHTML = `${innerStep+1}/${innerNodes.length}`
}

export const nextOrPrevious = step => {
  const stepQueries = document.querySelectorAll(".step-query");
  if (step === 1 && !fromValidation()) {
    return false;
  }

  innerStep += step;
  const innerNodes = stepQueries[currentStep].querySelectorAll(":scope > .inner-form");
  if (stepQueries[currentStep] && (innerStep >= innerNodes.length || innerStep < 0)) {
    if (currentStep === -1) {
      const stepIndicators = document.querySelectorAll(".step-indicator");
      stepIndicators[currentStep-1].className = stepIndicators[currentStep].className.replace(" finish", "");
    } 
    stepQueries[currentStep].style.display = "none";
    currentStep += step;
    innerStep = 0;
  }
  
  if (currentStep >= stepQueries.length) {
    // submitting here
    return false;
  }
  showStep();
}

const fixStepIndicator = () => {
  const stepIndicators = document.querySelectorAll(".step-indicator");
  for (const stepIndicator of stepIndicators) {
    stepIndicator.className = stepIndicator.className.replace(" active", "");
  }
  stepIndicators[currentStep].className += " active";
}

showStep();

document.querySelector("#btn-next").addEventListener("click", (event) => {
  event.preventDefault();
  nextOrPrevious(1);
});

document.addEventListener("keyup", (event) => {
  if (event.key === 'Enter') {
    document.querySelector("#btn-next").click()
  } 
});

document.querySelector("#btn-prev").addEventListener("click", nextOrPrevious.bind(this, -1));

const sliders = document.querySelectorAll('input[type="range"]');
for (const slider of sliders) {
  slider.addEventListener("input", event => {
    if (slider.nextElementSibling) {
      slider.nextElementSibling.innerHTML = `${event.target.value}%`
    }
  });
}


// dropdown
const dropdowns = document.querySelectorAll(".dropdown");
const titles = document.querySelectorAll(".title");
let selectedTitleIndex = -1;

titles.forEach((element, key) => {
  element.addEventListener("mouseover", (event) => {
    if (event.target === element) {
      selectedTitleIndex = key;
      dropdowns[key].style.display = "block";
    }
  });
});

window.addEventListener("click", (event) => {
  dropdowns.forEach((element, key) => {
    if (event.target !== dropdowns[selectedTitleIndex] && event.target !== titles[selectedTitleIndex]) {
      element.style.display = "none"
    }
  })
});

const options = document.querySelectorAll(".option");
options.forEach((element, key) => {
  element.addEventListener("click", (event) => {
  titles[selectedTitleIndex].innerHTML = event.target.innerHTML;
  });
})



