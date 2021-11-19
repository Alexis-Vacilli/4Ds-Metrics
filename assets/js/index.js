let currentStep = 0;

const fromValidation = () => {
  let isValid = true;
  const stepQueries = document.querySelectorAll(".step-query");
  const inputs = stepQueries[currentStep] ? stepQueries[currentStep].getElementsByTagName("input") : [];
  for (const inputField of inputs) {
    if (inputField.value === "") {
      inputField.className += " invalid";
      isValid = false;
    }
  }

  if (isValid && stepQueries[currentStep]) {
    document.querySelectorAll(".step-indicator")[currentStep].className += " finish";
  }
  return isValid;
}

const showStep = step => {
  const stepQueries = document.querySelectorAll(".step-query");
  stepQueries[step].style.display = "block";

  if (step === 0) {
    document.querySelector("#btn-previous").style.visibility = "hidden";
  } else {
    document.querySelector("#btn-previous").style.visibility = "visible";
  }

  if (step === (stepQueries.length - 1)) {
    document.querySelector("#btn-next").innerHTML = "Submit";
  } else {
    document.querySelector("#btn-next").innerHTML = "Next";
  }
  fixStepIndicator(step);
  document.querySelector("#progress").innerHTML = `${currentStep+1}/${stepQueries.length}`
}

export const nextOrPrevious = step => {
  const stepQueries = document.querySelectorAll(".step-query");
  if (step === 1 && !fromValidation()) {
    return false;
  }

  if (step === -1) {
    const stepIndicators = document.querySelectorAll(".step-indicator");
    stepIndicators[currentStep-1].className = stepIndicators[currentStep].className.replace(" finish", "");
  } 

  if (stepQueries[currentStep]) {
    stepQueries[currentStep].style.display = "none";
    currentStep += step;
  }
  
  if (currentStep >= stepQueries.length) {
    // submitting here
    return false;
  }
  showStep(currentStep);
}

//comming soom
const fixStepIndicator = step => {
  const stepIndicators = document.querySelectorAll(".step-indicator");
  for (const stepIndicator of stepIndicators) {
    stepIndicator.className = stepIndicator.className.replace(" active", "");
  }
  stepIndicators[step].className += " active";
}

showStep(currentStep);

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
