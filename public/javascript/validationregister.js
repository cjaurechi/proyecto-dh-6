// const { validator } = require("sequelize/types/lib/utils/validator-extras")


let emailInput = document.querySelector('input[name = email]')

emailInput.addEventListener('keyup', function(){
    if (validator.isEmail(emailInput.value)){
        emailInput.classList.remove('error')
        emailInput.classList.add('success')
    }else{
        emailInput.classList.remove('success')
        emailInput.classList.add('error')
    }
})

console.log(emailInput)