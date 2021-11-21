let currentStep = 0;
let innerStep = 0;

const fromValidation = () => {
  let isValid = true;
  const stepQueries = document.querySelectorAll(".step-query");
  const innerNodes = stepQueries[currentStep].querySelectorAll(":scope > .inner-form");
  const inputs = innerNodes[innerStep] ? innerNodes[innerStep].getElementsByTagName("input") : [];
  for (const inputField of inputs) {
    if (inputField.value === "") {
      inputField.className += " invalid";
      isValid = false;
    }
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
    document.querySelector("#btn-previous").style.visibility = "hidden";
  } else {
    document.querySelector("#btn-previous").style.visibility = "visible";
  }

  if (currentStep === (stepQueries.length - 1)) {
    document.querySelector("#btn-next").innerHTML = "Submit";
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
  console.log(innerNodes);
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

document.querySelector("#btn-next").addEventListener("click", nextOrPrevious.bind(this, 1));
document.querySelector("#btn-previous").addEventListener("click", nextOrPrevious.bind(this, -1));

const sliders = document.querySelectorAll('input[type="range"]');
for (const slider of sliders) {
  slider.addEventListener("change", event => {
    if (slider.nextElementSibling) {
      slider.nextElementSibling.innerHTML = `${event.target.value}%`
    }
  });
}



