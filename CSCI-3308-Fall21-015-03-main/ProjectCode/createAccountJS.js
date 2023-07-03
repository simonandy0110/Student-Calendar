function checkPassword(){
    const psw = document.getElementById("password");
    let letter = document.getElementById("passwordLetter");
    let capital = document.getElementById("passwordCapital");
    let number = document.getElementById("passwordNumber");
    let length = document.getElementById("passwordLength");
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0123456789]/g;
    const minLength = 8;
    if(psw.value.match(lowerCaseLetters)){
        letter.style.display="none";
    }
    else{
        letter.style.display="block";
    }
    if(psw.value.match(upperCaseLetters)){
        capital.style.display="none";
    }
    else{
        capital.style.display="block";
    }
    if(psw.value.match(numbers)){
        number.style.display="none";
    }
    else{
        number.style.display="block";
    }
    if(psw.value.length >= minLength){
        length.style.display="none";
    }
    else{
        length.style.display="block";
    }
    updateButton();
}

function checkConfirmPassword(){
    const psw = document.getElementById("password");
    const cpsw = document.getElementById("confirmPassword");
    if(psw.value != cpsw.value){
        document.getElementById("confirmPasswordMessage").style.display = "block";
    }
    else{
        document.getElementById("confirmPasswordMessage").style.display = "none";
    }
    updateButton();
}

function checkEmail(){
    const address = document.getElementById("email");
    if(address.value.includes(".edu")){
        document.getElementById("validEmailMsg").style.display = "none";
    }
    else{
        document.getElementById("validEmailMsg").style.display = "block";
    }
    updateButton();
}

function updateButton(){
    const cpsw = document.getElementById("confirmPasswordMessage");
    if(
        document.getElementById("passwordLetter").style.display=="none" &&
        document.getElementById("passwordCapital").style.display=="none" &&
        document.getElementById("passwordNumber").style.display=="none" &&
        document.getElementById("passwordLength").style.display=="none" &&
        document.getElementById("confirmPasswordMessage").style.display=="none" &&
        document.getElementById("validEmailMsg").style.display=="none" &&
        document.getElementById("confirmPassword").value.length != 0
    ){
        document.getElementById("button").disabled = false;
    }
    else{
        document.getElementById("button").disabled = true;
    }
}