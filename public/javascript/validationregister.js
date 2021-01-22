// const { validator } = require("sequelize/types/lib/utils/validator-extras")

window.addEventListener("load", function () {
    const form = document.getElementById('form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('passwordRepeat');
    const reveal = document.getElementById('reveal')
    const revealPasswordRepeat = document.querySelector('reveal2')

    // Validación - Blur

    email.addEventListener('blur', e => {
        validarEmail();
    })

    password.addEventListener('blur', e => {
        validarPassword();
    })

    passwordRepeat.addEventListener('blur', e => {
        validarPasswordRepeat();
    })

    //Ver password

    reveal.addEventListener('click', function() {
        password.type = password.type == 'password' ? 'text' : 'password';
    })

    revealPasswordRepeat.addEventListener('click',function(){
        passwordRepeat.type = passwordRepeat.type == 'password' ? 'text' : 'password'
        
    })

    // Funciones auxiliares (Helpers)

    function validarEmail() {
        const valorEmail = email.value.trim(); // Usamos trim para sacar los espacios en blanco

        if (valorEmail === '') {
            setError(email, 'Este campo es obligatorio');
            return false;
        } else 
        if (!esEmail(valorEmail)) {
            setError(email, 'El email ingresado no es válido');
            return false;
        } else {
            setSuccess(email);
            return true;
        }
    }

    function validarPassword() {
        const valorPassword = password.value.trim().length;
        if (valorPassword <= 7) {
            setError(password, 'La contraseña debe tener al menos 8 caracteres válidos');
            return false;
        } else {
            setSuccess(password);
            return true;
        }
    }

    function validarPasswordRepeat() {
        if (validator.equals(passwordRepeat.value,password.value )  
        ){
            setSuccess(passwordRepeat);
            return true;
        }else{
           
            setError(passwordRepeat, 'Las contraseñas deben coincidir');
            return false;
        }}
       
       
     

    function setError(input, error) {
        const parentElement = input.parentElement;
        let small = parentElement.querySelector('small');
        parentElement.className = 'form-control error';
        small.innerText = error;
    }

    function setSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    function esEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }


let nameInput = document.querySelector('input[name = name]')
let lastNameInput = document.querySelector('input[name = last_name]')
let imageInput = document.querySelector('input[name = profile]')




//VAlidar nombre

nameInput.addEventListener('keyup', function(){
    if (validator.isAlpha(nameInput.value) && validator.isLength(nameInput.value, {min:2, max:20})){
        nameInput.classList.remove('error')
        nameInput.classList.add('success')
    }else{
        nameInput.classList.remove('success')
        nameInput.classList.add('error')
    }
})

//validar apellido

lastNameInput.addEventListener('keyup', function(){
    if (validator.isAlpha(lastNameInput.value) && validator.isLength(lastNameInput.value, {min:2, max:20})){
        lastNameInput.classList.remove('error')
        lastNameInput.classList.add('success')
    }else{
        lastNameInput.classList.remove('success')
        lastNameInput.classList.add('error')
    }
})




// validar la fecha sea anterior a la de hoy
dateInput.addEventListener('keyup', function(){
    if (validator.isBefore(dateInput.value)  
    ){
        dateInput.classList.remove('error')
        dateInput.classList.add('success')
    }else{
        dateInput.classList.remove('success')
        dateInput.classList.add('error')
    }
})

// dateInput.addEventListener('keyup', function(){
//     if (validator.isBefore(dateInput[01-01-2020] )  
//     ){
//         dateInput.classList.remove('error')
//         dateInput.classList.add('success')
//     }else{
//         dateInput.classList.remove('success')
//         dateInput.classList.add('error')
//     }
// })

})


