const cards = document.querySelectorAll(".card");
const tabs = document.querySelectorAll(".tabs");
const cardContent = document.querySelectorAll(".card-content");
const menuIcon = document.querySelectorAll(".menu-icon");


const cardsArr = Array.from(cards);
cardsArr.forEach(el => console.log(el.target));





Array.from(menuIcon).forEach(el => {el.addEventListener("mouseover", (e) => {
    const element = document.elementFromPoint(el.after, el.before);
    console.log(element)

    
    // Array.from(tabs).forEach(element => element.style.display = "block");
    // Array.from(cardContent).forEach(element => element.style.margin = "21px 15px");
})})

// const menuIcon = document.querySelectorAll(".menu-icon");
// menuIcon.addEventListener("mouseover", () => {
//   tabs.style.display = "block";
//   cardContent.style.margin = "21px 15px";
// });




// tabs.addEventListener("mouseleave", () => {
//   tabs.style.display = "none";
//   cardContent.style.margin = "10px 15px";
// });

// window.addEventListener("click", (e) => {
//       if(e.target !== tabs) {
//           tabs.style.display = "none";
//           cardContent.style.margin = "10px 15px"; 
//       }
// });