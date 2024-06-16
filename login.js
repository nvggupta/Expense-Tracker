const login = document.getElementById("login");
const LPassword = document.getElementById("Lpassword");
const Lemail = document.getElementById("Lemail");

login.addEventListener("click" , ()=>{
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
              alert("login Successfully");
          }    
      }    
})