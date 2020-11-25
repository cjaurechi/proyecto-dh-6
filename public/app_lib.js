
    const btnToggle = document.querySelector('.menu-hamburguesa'); 

    console.log(btnToggle)

    btnToggle.addEventListener('click', function () {
    console.log('click')
    document.getElementById('sidebar').classList.toggle('active');
    console.log(document.getElementById('sidebar'))
    });