const form = document.getElementById("form");
const password = document.getElementById("passwordone");
const passwordretype = document.getElementById("passwordtwo");
const email = document.getElementById("email");

// errors placement during client side validation
const retypeError = document.getElementById("errorPwdtwo");
const passwordError = document.getElementById("errorPwd");
const emailError = document.getElementById("emailError");
var commonpwd = ["password", "1234567", "aaaaaaa", "bbbbbbbb", "1234568", "aaaaaaaa"];

form.addEventListener("submit", (e) => {
  retypeError.innerText = "";
  emailError.innerText = "";
  passwordError.innerText = "";
  if (
    email.value == ""
  ) {
    e.preventDefault();
    emailError.innerText = "Enter please Email";
    
  }
  if(
    passwordretype.value == "")
    {
    e.preventDefault();
    retypeError.innerText = "Please retype your password";
    }
    if( password.value == "")
    {
        e.preventDefault();
        passwordError.innerText = "Password can't be empty ";
    }

    if(password.value != passwordretype.value)
    {
        e.preventDefault();
        passwordError.innerText = "Password doesn't match";
    }
    if(commonpwd.includes(password.value))
    {
        e.preventDefault();
        passwordError.innerText = "Type a strong password";
    }
});
