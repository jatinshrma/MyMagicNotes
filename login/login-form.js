console.log('Welcome to Magic Notes log-in page Java script');

// code goes here
let userInput= document.getElementById('username');
let password= document.getElementById('password').value;
userInput.addEventListener('blur', ()=> {
    let username= document.getElementById('username').value;
    let usernameInvalid= document.getElementById('usernameInvalid');
    let regEx= /^\w{3,30}$/;
    // let regEx= /^\d{10}$/;
    // let regEx= /^\d?[\.-\w]+@[a-zA-Z-\_\.]+.com$/;

    console.log(regEx.test(username));
    if (regEx.test(username)) {
        console.log('Valid');
        userInput. classList.remove('is-invalid');
        usernameInvalid.style.display= 'none';
        userInput.style.borderColor= "black";
    }
    else{
        usernameInvalid.style.display= 'block';
        userInput.style.borderColor= "red";
        console.log('InValid');
        userInput. classList.add('is-invalid');
    }
});