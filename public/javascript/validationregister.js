// const { validator } = require("sequelize/types/lib/utils/validator-extras")





let emailInput = document.querySelector('input[name = email]')
let nameInput = document.querySelector('input[name = name]')

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