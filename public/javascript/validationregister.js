// const { validator } = require("sequelize/types/lib/utils/validator-extras")

window.addEventListener("load", function () {
    const form = document.getElementById('form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('passwordRepeat');
    const reveal = document.getElementById('reveal')
    const revealPasswordRepeat = document.querySelector('reveal2')
    const name = document.getElementById('name')
    const profile = document.getElementById('profile')

    // Validación - Blur

    name.addEventListener('blur', e => {
        validarName();
    })

    email.addEventListener('blur', e => {
        validarEmail();
    })

    password.addEventListener('blur', e => {
        validarPassword();
    })

    passwordRepeat.addEventListener('blur', e => {
        validarPasswordRepeat();
    })

    profile.addEventListener('blur', e => {
        validarProfile();
    })

    //Ver password

    reveal.addEventListener('click', function() {
        password.type = password.type == 'password' ? 'text' : 'password';
    })

    revealPasswordRepeat.addEventListener('click',function(){
        passwordRepeat.type = passwordRepeat.type == 'password' ? 'text' : 'password'
        
    })

    // Funciones auxiliares (Helpers)

    function validarName() {
       if (name.value === '') {
            setError(name, 'Este campo es obligatorio');
            return false;
        } else 
        if (validator.isAlpha(name.value) && validator.isLength(name.value, {min:2, max:20})) {
            setSuccess(name);
            return true;
        } else {
            setError(name, 'El nombre y apellido ingresado no es válido');
            return false;  
        }

    }


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
            setError(password, 'La contraseña debe tener mas de 8 caracteres');
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


     function validarProfile() {
        if (profile.value === '') {
            setError(profile, 'Este campo es obligatorio');
            return false;
        } else {
        
            setSuccess(profile);
            return true;
        }
            }
       
        

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

})






