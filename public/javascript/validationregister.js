// const { validator } = require("sequelize/types/lib/utils/validator-extras")



let emailInput = document.querySelector('input[name = email]')
let nameInput = document.querySelector('input[name = name]')
let lastNameInput = document.querySelector('input[name = last_name]')
let passwordInput = document.querySelector('input[name = password]')
let passwordConfirmationInput = document.querySelector('input[name = passwordrepeat]')
let dateInput = document.querySelector('input[name = fecnac]')
let imageInput = document.querySelector('input[name = profile]')



emailInput.addEventListener('keyup', function(){
    if (validator.isEmail(emailInput.value)){
        emailInput.classList.remove('error')
        emailInput.classList.add('success')
    }else{
        emailInput.classList.remove('success')
        emailInput.classList.add('error')
    }
})

nameInput.addEventListener('keyup', function(){
    if (validator.isAlpha(nameInput.value) && validator.isLength(nameInput.value, {min:2, max:20})){
        nameInput.classList.remove('error')
        nameInput.classList.add('success')
    }else{
        nameInput.classList.remove('success')
        nameInput.classList.add('error')
    }
})

lastNameInput.addEventListener('keyup', function(){
    if (validator.isAlpha(lastNameInput.value) && validator.isLength(lastNameInput.value, {min:2, max:20})){
        lastNameInput.classList.remove('error')
        lastNameInput.classList.add('success')
    }else{
        lastNameInput.classList.remove('success')
        lastNameInput.classList.add('error')
    }
})


passwordInput.addEventListener('keyup', function(){
    if (validator.isLength(passwordInput.value, {min:8})  
    //Password expresion that requires one lower case letter, one upper case letter, one digit, and no spaces.
    // && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)$/.test(passwordInput.value)
    ){
        passwordInput.classList.remove('error')
        passwordInput.classList.add('success')
    }else{
        passwordInput.classList.remove('success')
        passwordInput.classList.add('error')
    }
})


passwordConfirmationInput.addEventListener('keyup', function(){
    if (validator.equals(passwordConfirmationInput.value,passwordInput.value )  
    ){
        passwordConfirmationInput.classList.remove('error')
        passwordConfirmationInput.classList.add('success')
    }else{
        passwordConfirmationInput.classList.remove('success')
        passwordConfirmationInput.classList.add('error')
    }
})


dateInput.addEventListener('keyup', function(){
    if (validator.isBefore(dateInput[01-01-2020] )  
    ){
        dateInput.classList.remove('error')
        dateInput.classList.add('success')
    }else{
        dateInput.classList.remove('success')
        dateInput.classList.add('error')
    }
})

