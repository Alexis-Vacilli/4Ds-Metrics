const steps = document.querySelectorAll(".step");


steps.forEach(el => {
  el.addEventListener("click", () => {
    el.classList.toggle("active");
  })
})