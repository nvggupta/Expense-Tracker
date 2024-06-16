const id = document.getElementById("email");
const password = document.getElementById("password");
const confirm = document.getElementById("cnf");
const submit = document.getElementById("submit");



const saveDetails = (UEmail , UPassword)=>
{
    if(!localStorage.getItem(UEmail))
        {
        localStorage.setItem(UEmail , UPassword);
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