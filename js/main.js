//          Burger menu

let changeBurgerMenu = document.getElementById("changeBurgerMenu");
let collapseMenu = document.getElementById("collapse-menu");
let body = document.getElementById("body");
let collapseMenuActive = document.getElementsByClassName("collapse-menu-list");

changeBurgerMenu.addEventListener("click", ()=>{
   changeBurgerMenu.classList.toggle("burger-menu-active");
   collapseMenu.classList.toggle("collapse-menu-active");
   body.classList.toggle("overflow");
});

for (let i = 0; i < collapseMenuActive.length; i++){
   collapseMenuActive[i].addEventListener("click", ()=>{
      changeBurgerMenu.classList.remove("burger-menu-active");
      collapseMenu.classList.remove("collapse-menu-active");
      body.classList.remove("overflow");
   })
}

//          End of Burger menu

//          Tools

let iconDesktop = document.getElementsByClassName("icon-desktop-about");
let toolsAbout = document.getElementsByClassName("tools-about");

for (let i = 0; i < iconDesktop.length; i++){
   iconDesktop[i].addEventListener("click", ()=>{
      let iconActive = document.getElementsByClassName("icon-desktop-about-active");
      iconActive[0].className = iconActive[0].className.replace("icon-desktop-about-active", "");
      iconDesktop[i].className += " icon-desktop-about-active";

      let toolsAboutActive = document.getElementsByClassName("tools-about-active");
      toolsAboutActive[0].className = toolsAboutActive[0].className.replace("tools-about-active", "");
      toolsAbout[i].className += " tools-about-active";
   })
}

//          End of Tools

//          Messenger

let messenger = document.getElementById("messenger");
let iconTel = document.getElementById("icon-tel");
let iconWp = document.getElementById("icon-wp");

let requested = window.requestAnimationFrame;

function updatedValue(){
   let telIcon = getComputedStyle(iconTel).bottom;
   let wpIcon = getComputedStyle(iconWp).bottom;
   requested(updatedValue);
   

   if (telIcon == "50px" || wpIcon === "80px"){
      iconTel.style.display = "none";
      iconWp.style.display = "none";
   }

   else if (telIcon > "50px" || wpIcon > "80px"){
      iconTel.style.display = "flex";
      iconWp.style.display = "flex";

   }
}

window.addEventListener("click", (e)=>{
   if (messenger.contains(e.target)){
      if (messenger.classList.contains("messenger-active")){
         messenger.classList.remove("messenger-active");
         messenger.className += " messenger-nonactive";
         messenger.style.outline = "none";

         iconTel.classList.remove("icon-tel-active");
         iconTel.className += " icon-tel-nonactive";
         iconWp.classList.remove("icon-wp-active");
         iconWp.className += " icon-wp-nonactive";

         requested(updatedValue)
      }

      else if ((messenger.classList.length === 1) || (messenger.classList.contains("messenger-nonactive"))){
         messenger.classList.remove("messenger-nonactive");
         messenger.className += " messenger-active";

         iconTel.classList.remove("icon-tel-nonactive");
         iconTel.className += " icon-tel-active";
         iconWp.classList.remove("icon-wp-nonactive");
         iconWp.className += " icon-wp-active";

         requested(updatedValue);
      }
   }

   else if (messenger.classList.contains("messenger-active")){
         messenger.classList.remove("messenger-active");
         messenger.className += " messenger-nonactive";

         iconTel.classList.remove("icon-tel-active");
         iconTel.className += " icon-tel-nonactive";
         iconWp.classList.remove("icon-wp-active");
         iconWp.className += " icon-wp-nonactive";

         requested(updatedValue);
   }

});

//          End of Messenger

//          Product

let product = document.getElementsByClassName("product-img");
let desc = document.getElementsByClassName("product-desc");
let close = document.getElementsByClassName("close");

for (let i = 0; i < product.length; i++){
   product[i].addEventListener("click", ()=>{
      desc[i].style.display = "flex";
   });

   close[i].addEventListener("click", ()=>{
      desc[i].style.display = "none";
   })
}

//          End of Product
// Send mail

let send = document.getElementsByClassName("consult-btn")[0];
let name = document.getElementsByName("ad")[0];
let surname = document.getElementsByName("soyad")[0];
let tel = document.getElementsByName("tel")[0];
let mail = document.getElementsByName("mail")[0];
let message = document.getElementsByName("message")[0];
let p = document.createElement("p");


send.addEventListener("click", () => {

   if(name.value.length > 0 && surname.value.length > 0 && tel.value.length > 0 && mail.value.length > 0 && message.value.length > 0){
      fetch("https://datapay.herokuapp.com/", {
         method: "post",
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            from: mail.value,
            name: name.value,
            surname: surname.value,
            tel: tel.value,
            message: message.value
         })
          }).then(response => {
         return response.json().then(result => {
            if(result.send){
               p.innerText = "Mesaj müvəfəqiyyətlə göndərildi";
               p.style.color = "#138cc9";
               p.style.margin = "10px 0";
               document.querySelector(".consult-btn").before(p);
            }

            else if(result.errorMessage){
               p.innerText = result.errorMessage;
               p.style.color = "red";
               p.style.margin = "10px 0";
               document.querySelector(".consult-btn").before(p);
            }
         })
      });
   }
});