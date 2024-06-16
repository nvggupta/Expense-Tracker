const id = document.getElementById("email");
const password = document.getElementById("password");
const confirm = document.getElementById("cnf");
const submit = document.getElementById("submit");
const Eshow = document.getElementById("Eshow");
const Ehide = document.getElementById("Ehide");
const Cshow = document.getElementById("Cshow");
const Chide = document.getElementById("Chide");

const saveDetails = (UEmail , UPassword)=>
{
    if(!localStorage.getItem(UEmail))
        {
        localStorage.setItem(UEmail , UPassword);
        alert("Registered Successfully");
        }
        else{
            alert("Email Already Registered");
        }
}


submit.addEventListener('click' , ()=>{
    console.log("triggered");
    if(password.value === confirm.value)
        {
            saveDetails(id.value , password.value);
        }
    else 
    {
        alert("Retry Password");
    }    


})
Eshow.addEventListener('click', () => {
    password.setAttribute("type", "text");
    Eshow.classList.add("hide");
    Ehide.classList.remove("hide");
});

Ehide.addEventListener("click", () => {
    password.setAttribute("type", "password");
    Ehide.classList.add("hide");
    Eshow.classList.remove("hide");
});
Cshow.addEventListener('click', () => {
    confirm.setAttribute("type", "text");
    Cshow.classList.add("hide");
    Chide.classList.remove("hide");
});

Chide.addEventListener("click", () => {
    confirm.setAttribute("type", "password");
    Chide.classList.add("hide");
    Cshow.classList.remove("hide");
});