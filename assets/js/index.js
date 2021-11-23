const tabs = document.querySelector(".tabs");
const card = document.querySelector(".card");
const cardContent = document.querySelector(".card-content");



const menuIcon = document.querySelector(".menu-icon");
menuIcon.addEventListener("mouseover", () => {
  tabs.style.display = "block";
  cardContent.style.margin = "21px 15px";
});

tabs.addEventListener("mouseleave", () => {
  tabs.style.display = "none";
  cardContent.style.margin = "10px 15px";
});

window.addEventListener("click", (e) => {
      if(e.target !== tabs) {
          tabs.style.display = "none";
          cardContent.style.margin = "10px 15px"; 
      }
});