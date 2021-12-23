let currentStep = 0;
let innerStep = 0;

const fromValidation = () => {
  let isValid = true;
  let count = 0;
  const stepQueries = document.querySelectorAll(".step-query");
  const innerNodes = stepQueries[currentStep].querySelectorAll(":scope > .inner-form");
  const inputsNumber = innerNodes[innerStep] ? innerNodes[innerStep].querySelectorAll('input[type=number]') : [];
  const inputsRadio = innerNodes[innerStep] ? innerNodes[innerStep].querySelectorAll('input[type=radio]') : [];
  const errors = innerNodes[innerStep] ? innerNodes[innerStep].querySelectorAll('span.error') : [];
  
  for (let i = 0; i < inputsNumber.length; i++) {
    inputsNumber[i].onchange = () => {
      errors[i].style.visibility = "hidden";
      errors[i].innerHTML = '';
      inputsNumber[i].style.border = 'none';
    }
    if (inputsNumber[i].value === '') {
      errors[i].style.visibility = "visible";
      errors[i].innerHTML = 'This field is required';
      inputsNumber[i].style.border = '1px solid red';
      isValid = false;
    } else if (inputsNumber[i].value < 0) {
      errors[i].style.visibility = "visible";
      isValid = false;
      errors[i].innerHTML = "Negative values are not allowed.";
      inputsNumber[i].style.border = '1px solid red';
    }
    count += i;
  }

  let isSelected = false;
  for (let i = 0; i < inputsRadio.length; i++) {
    if (inputsRadio[i].checked) {
      isSelected = true;
    }
    if ((i === inputsRadio.length -1) && !isSelected) {
      count += 1;
      isValid = false;
      errors[count].innerHTML = 'Select status, please.';
      errors[count].style.visibility = "visible";
    } else if ((i === inputsRadio.length -1) && isSelected) {
      count += 1;
      errors[count].innerHTML = ''
      errors[count].style.visibility = "hidden";
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
    document.querySelector("#btn-prev").style.visibility = "hidden";
  } else {
    document.querySelector("#btn-prev").style.visibility = "visible";
  }

  const rate = ((innerStep+1) * 180) / innerNodes.length;
  document.querySelectorAll('.mask.full').forEach(element => element.style.transform = `rotate(${rate}deg)`)
  document.querySelectorAll('.circle .fill').forEach(element => element.style.transform = `rotate(${rate}deg)`);

  document.querySelector("#progress").innerHTML = `${innerStep+1}/${innerNodes.length}`

  if (currentStep === (stepQueries.length - 1)) {
    document.querySelector("#btn-next").innerHTML = "Submit";
    document.querySelector("#btn-prev").style.visibility = "hidden";
    document.querySelector("#btn-exit").style.visibility = "hidden";
  } else {
    document.querySelector("#btn-next").innerHTML = "Next";
  }
  fixStepIndicator();
}

export const nextOrPrevious = step => {
  const stepQueries = document.querySelectorAll(".step-query");
  if (stepQueries[currentStep] === undefined) {
    document.querySelector("#step-indicator").style.display = "none";
    document.querySelector("#form-container").style.display = "none";
    document.querySelector("#thank-you").style.display = "block";
    return false;
  }
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
    alert('Submitting...')
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

const btnEdit = document.querySelector('#btn-edit');

if (btnEdit != null) {
  btnEdit.onclick = () => {
    document.querySelector("#step-indicator").style.display = "flex";
    document.querySelector("#form-container").style.display = "block";
    document.querySelector("#thank-you").style.display = "none";
    currentStep = 1;
    showStep();
  }
}
