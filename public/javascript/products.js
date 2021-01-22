window.addEventListener("load",function() {

    let form = document.getElementById("formulario-producto")
    
    const name = document.getElementById('name');
    const supplier_id = document.getElementById('supplier_id');
    const price = document.getElementById('price');
    const discount = document.getElementById('discount');
    const category_id = document.getElementById('category_id');
    const image = document.getElementById('image');
    const life_date_from = document.getElementById('life_date_from');
    const life_date_to = document.getElementById('life_date_to');
    const expiration_days = document.getElementById('expiration_days');
    const share = document.getElementById('share');
    const stock = document.getElementById('stock');
    const status = document.getElementById('status');
    const description = document.getElementById('description');

    const product = {
        name : "",
        supplier_id : "",
        price : "",
        discount : "",
        category_id : "",
        image : "",
        life_date_to : "",
        life_date_from : "",
        expiration_days : "",
        share : "",
        stock : "",
        status : "",
        description : ""
    } 

    if (document.getElementById("name-error").innerHTML.trim() != "") {
        name.style.borderColor = "tomato"
    }
    if (document.getElementById("supplier-error").innerHTML.trim() != "") {
        supplier_id.style.borderColor = "tomato"
    }
    if (document.getElementById("price-error").innerHTML.trim() != "") {
        price.style.borderColor = "tomato"
    }
    if (document.getElementById("discount-error").innerHTML.trim() != "") {
        discount.style.borderColor = "tomato"
    }
    if (document.getElementById("category-error").innerHTML.trim() != "") {
        category_id.style.borderColor = "tomato"
    }
    if (document.getElementById("image-error").innerHTML.trim() != "") {
        image.style.borderColor = "tomato"
    }
    if (document.getElementById("life_date_from-error").innerHTML.trim() != "") {
        life_date_from.style.borderColor = "tomato"
    }
    if (document.getElementById("life_date_to-error").innerHTML.trim() != "") {
        life_date_to.style.borderColor = "tomato"
    }
    if (document.getElementById("expiration_days-error").innerHTML.trim() != "") {
        expiration_days.style.borderColor = "tomato"
    }
    if (document.getElementById("share-error").innerHTML.trim() != "") {
        share.style.borderColor = "tomato"
    }
    if (document.getElementById("stock-error").innerHTML.trim() != "") {
        stock.style.borderColor = "tomato"
    }
    if (document.getElementById("status-error").innerHTML.trim() != "") {
        status.style.borderColor = "tomato"
    }
    if (document.getElementById("description-error").innerHTML.trim() != "") {
        description.style.borderColor = "tomato"
    }


    name.addEventListener("blur",function() {
        validarName()
    })

    function validarName() {
        const valorName = name.value.trim()

        if (valorName != "" && validator.isLength(valorName,{min:10,max:50})){
            document.getElementById("name-error").innerHTML = ""
            name.style.borderColor = "teal"
            product.name = valorName
            return true
        } else {
            document.getElementById("name-error").innerHTML = "El nombre del producto debe tener minimo 10 caracteres y maximo 50"
            name.style.borderColor = "tomato"
            product.name = ""
            return false
        }

    }

    supplier_id.addEventListener("blur",function() {
        validarSupplier_id()
    })

    function validarSupplier_id() {
        const valorSupplier_id = supplier_id.value.trim()

        if (valorSupplier_id.value === "" || validator.isEmpty(valorSupplier_id)){
            document.getElementById("supplier-error").innerHTML = "El producto debe tener asignado un proveedor"
            supplier_id.style.borderColor = "tomato"
            product.supplier_id = ""
            return false
        } else {
            document.getElementById("supplier-error").innerHTML = ""
            supplier_id.style.borderColor = "teal"
            product.supplier_id = valorSupplier_id
            return true
        }
    }

    price.addEventListener("blur",function() {
        validarPrice()
    })

    function validarPrice() {
        const valorPrice = price.value.trim()

        if (validator.isDecimal(valorPrice) && price.value > 0 ){
            document.getElementById("price-error").innerHTML = ""
            price.style.borderColor = "teal"
            product.price = valorPrice
            return true
        } else {
            document.getElementById("price-error").innerHTML = "El precio del producto debe ser numerico"
            price.style.borderColor = "tomato"
            product.price = ""
            return false
        }
    }

    discount.addEventListener("blur",function() {
        validarDiscount()
    })

    function validarDiscount() {
        const valorDiscount = discount.value.trim()

        if (validator.isDecimal(valorDiscount) && valorDiscount > 0 ){
            document.getElementById("discount-error").innerHTML = ""
            discount.style.borderColor = "teal"
            product.discount = valorDiscount
            return true
        } else {
            document.getElementById("discount-error").innerHTML = "El descuento del producto debe ser numerico"
            discount.style.borderColor = "tomato"
            product.discount = ""
            return false
        }
    }

    category_id.addEventListener("blur",function() {
        validarCategory_id()
    })

    function validarCategory_id() {
        const valorCategory_id = category_id.value.trim()

        if (valorCategory_id == "" || validator.isEmpty(valorCategory_id)){
            document.getElementById("category-error").innerHTML = "El producto debe tener asociada una categoria"
            category_id.style.borderColor = "tomato"
            product.category_id = ""
            return true
        } else {
            document.getElementById("category-error").innerHTML = ""
            category_id.style.borderColor = "teal"
            product.category_id = valorCategory_id
            return true
        }
    }

    image.addEventListener("blur",function() {
        validarImage()
    })

    function validarImage() {
        const valorImage = image.value.trim()

        if (!validator.isEmpty(valorImage) && image.files.length <= 5){
            document.getElementById("image-error").innerHTML = ""
            image.style.borderColor = "teal"
            product.image = valorImage
            return true
        } else {
            document.getElementById("image-error").innerHTML = "Debe seleccionar como minimo una imagen y como maximo 5"
            image.style.borderColor = "tomato"
            product.image = ""
            return false
        }
    }

    life_date_from.addEventListener("blur",function() {
        validarLife_date_from()
    })

    function validarLife_date_from() {
        const valorLife_date_from = life_date_from.value.trim()

        let fecha_actual = new Date()

        fecha_actual = fecha_actual.getFullYear() + "-" + ("0" + (fecha_actual.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha_actual.getDate()).slice(-2)

        console.log(fecha_actual,valorLife_date_from)
        if (valorLife_date_from == "" || valorLife_date_from < fecha_actual){
            document.getElementById("life_date_from-error").innerHTML = "El producto debe tener asignada una fecha de vigencia desde correcta"
            life_date_from.style.borderColor = "tomato"
            product.life_date_from = ""
            return true
        } else {
            document.getElementById("life_date_from-error").innerHTML = ""
            life_date_from.style.borderColor = "teal"
            product.life_date_from = valorLife_date_from
            return false
        }

    }

    life_date_to.addEventListener("blur",function() {
        validarLife_date_to()
    })

    function validarLife_date_to() {
        const valorLife_date_to = life_date_to.value.trim()

        if (valorLife_date_to == "" || valorLife_date_to < life_date_from.value){
            document.getElementById("life_date_to-error").innerHTML = "El producto debe tener asignada una fecha de vigencia hasta correcta"
            life_date_to.style.borderColor = "tomato"
            product.life_date_to = ""
            return true
        } else {
            document.getElementById("life_date_to-error").innerHTML = ""
            life_date_to.style.borderColor = "teal"
            product.life_date_to = valorLife_date_to
            return false
        }
    }

    expiration_days.addEventListener("blur",function() {
        validarExpiration_days()
    })

    function validarExpiration_days() {

        const valorExpiration_days = expiration_days.value.trim()

        if (validator.isDecimal(valorExpiration_days) && valorExpiration_days > 0){
            document.getElementById("expiration_days-error").innerHTML = ""  
            expiration_days.style.borderColor = "teal"
            product.expiration_days = valorExpiration_days
            return true
        } else {
            document.getElementById("expiration_days-error").innerHTML = "Los dias de vencimiento del producto debe mayor o igual a 0"
            expiration_days.style.borderColor = "tomato"
            product.expiration_days = ""
            return false
        }
    }

    share.addEventListener("blur",function() {
        validarShare()
    })

    function validarShare() {
        const valorShare = share.value.trim()

        if (valorShare == "" || validator.isEmpty(valorShare)){
            document.getElementById("share-error").innerHTML = "El producto debe tener asignado si es para compartir"
            share.style.borderColor = "tomato"
            product.share = ""
            return false
        } else {
            document.getElementById("share-error").innerHTML = ""  
            share.style.borderColor = "teal" 
            product.share = valorShare
            return true
        }
    }
    
    stock.addEventListener("blur",function() {
        validarStock()
    })

    function validarStock() {
        const valorStock = stock.value.trim()

        if (validator.isDecimal(valorStock) && valorStock > 0 ){
            document.getElementById("stock-error").innerHTML = "" 
            stock.style.borderColor = "teal" 
            product.stock = valorStock
            return true
        } else {
            document.getElementById("stock-error").innerHTML = "El stock del producto debe ser numerico"
            stock.style.borderColor = "tomato"
            product.stock = ""
            return false
        }
    }

    status.addEventListener("blur",function() {
        validarStatus()
    })

    function validarStatus() {
        const valorStatus = status.value.trim()

        if (valorStatus == "" || validator.isEmpty(valorStatus)){
            document.getElementById("status-error").innerHTML = "El estado del producto debe tener asignado un valor"
            status.style.borderColor = "tomato"
            product.status = ""
            return false
        } else {
            document.getElementById("status-error").innerHTML = ""
            status.style.borderColor = "teal" 
            product.status = valorStatus
            return true
        }
    }

    description.addEventListener("blur",function() {
        validarDescription()
    }) 

    function validarDescription() {
        const valorDescription = description.value.trim()

        if (valorDescription != "" && validator.isLength(valorDescription,{min:10,max:300})){
            document.getElementById("description-error").innerHTML = "" 
            description.style.borderColor = "teal" 
            product.description = valorDescription
            return true
        } else {
            document.getElementById("description-error").innerHTML = "La descripcion del producto debe tener minimo 10 caracteres y maximo 300"
            description.style.borderColor = "tomato"
            product.description = ""
            return false
        }
    }

    form.addEventListener("submit",function(event) {

        validarName()
        validarSupplier_id() 
        validarPrice() 
        validarDiscount() 
        validarCategory_id() 
        validarImage() 
        validarLife_date_from() 
        validarLife_date_to() 
        validarExpiration_days() 
        validarShare() 
        validarStock() 
        validarStatus() 
        validarDescription() 

        if (product.name === "" ||
            product.supplier_id === "" ||
            product.price === "" ||
            product.discount === "" ||
            product.category_id === "" ||
            product.image === "" ||
            product.life_date_to === "" ||
            product.life_date_from === "" ||
            product.expiration_days === "" ||
            product.share === "" ||
            product.stock === "" ||
            product.status === "" ||
            product.description === "") {
            event.preventDefault()
        } 
/*      

        codigo para actualizar via API
        
        event.preventDefault()

        if (product.name === "" ||
            product.supplier === "" ||
            product.price === "" ||
            product.discount === "" ||
            product.category === "" ||
            product.life_date_to === "" ||
            product.life_date_from === "" ||
            product.expiration_days === "" ||
            product.share === "" ||
            product.stock === "" ||
            product.status === "" ||
            product.description === "") {
            console.log(product)
            document.getElementById("store-success").innerHTML = "Debe Completar los campos indicados con error"
        } else {
            console.log(product)
            fetch ('http://localhost:3001/api/productos/crear', {
            method : 'POST',
            body : JSON.stringify(product),
            headers : {'Content-Type' : 'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                form.name.value = ""
                form.supplier.value = ""
                form.price.value = ""
                form.discount.value = ""
                form.category.value = ""
                form.life_date_to.value = ""
                form.life_date_from.value = ""
                form.expiration_days.value = ""
                form.share.value = ""
                form.stock.value = ""
                form.status.value = ""
                form.description.value = ""

            })
        } */

    })

})