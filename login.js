const login = document.getElementById("login");
const LPassword = document.getElementById("Lpassword");
const Lemail = document.getElementById("Lemail");
const Lhide = document.getElementById("Lhide");
const Lshow = document.getElementById("Lshow");
login.addEventListener("click" , (e)=>{

    e.preventDefault();
    if(!localStorage.getItem(Lemail.value))
      {
          alert("Email is Not Registered");
      }
      else{
          let originalPassword = localStorage.getItem(Lemail.value);
          if(originalPassword !== LPassword.value)
              {
                  alert("Enter Correct Password");
              }
          else{
            console.log("logged in");
            window.location.replace("dashboard.html");
          }    
      }    
})
Lshow.addEventListener('click', () => {
    LPassword.setAttribute("type", "text");
    Lshow.classList.add("hide");
    Lhide.classList.remove("hide");
});

Lhide.addEventListener("click", () => {
    LPassword.setAttribute("type", "password");
    Lhide.classList.add("hide");
    Lshow.classList.remove("hide");
});

