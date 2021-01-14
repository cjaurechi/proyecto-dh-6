window.addEventListener("load",function() {

    let form = document.getElementById("formulario-producto")
/*     let name = document.getElementById("name")
    let supplier = document.getElementById("supplier") */

    console.log(form)
    
    const product = {
        name : "",
        supplier : "",
        price : "",
        discount : "",
        category : "",
        life_date_to : "",
        life_date_from : "",
        expiration_days : "",
        share : "",
        stock : "",
        status : "",
        description : ""
    } 

/*     let name_error = document.getElementById("name-error") */

    form.name.addEventListener("keyup",function() {
        console.log(this.value)
        if (validator.isAlpha(this.value) && validator.isLength(this.value,{min:10,max:50})){
            document.getElementById("name-error").innerHTML = ""
            product.name = this.value
        } else {
            document.getElementById("name-error").innerHTML = "El nombre del producto debe tener minimo 10 caracteres y maximo 50"
            product.name = ""
        }
    })

    form.supplier.addEventListener("click",function() {
        if (this.value == "" || validator.isEmpty(this.value)){
            document.getElementById("supplier-error").innerHTML = "El producto debe tener asignado un proveedor"
            product.supplier = ""
        } else {
            document.getElementById("supplier-error").innerHTML = ""
            product.supplier = this.value
        }
    })

    form.price.addEventListener("keyup",function() {
        if (validator.isDecimal(this.value) && this.value > 0 ){
            document.getElementById("price-error").innerHTML = ""
            product.price = this.value
        } else {
            document.getElementById("price-error").innerHTML = "El precio del producto debe ser numerico"
            product.price = ""
        }
    })

    form.discount.addEventListener("keyup",function() {
        if (validator.isDecimal(this.value) && this.value > 0 ){
            document.getElementById("discount-error").innerHTML = ""
            product.discount = this.value
        } else {
            document.getElementById("discount-error").innerHTML = "El descuento del producto debe ser numerico"
            product.discount = ""
        }
    })

    form.category.addEventListener("click",function() {
        if (this.value == "" || validator.isEmpty(this.value)){
            document.getElementById("category-error").innerHTML = "El producto debe tener asociada una categoria"
            product.category = ""
        } else {
            document.getElementById("category-error").innerHTML = ""
            product.category = this.value
        }
    })

    form.life_date_to.addEventListener("click",function() {
        if (this.value == "" /* && this.value < "hoy" */){
            document.getElementById("life_date_to-error").innerHTML = "El producto debe tener asignada una fecha de vigencia desde"
            product.life_date_to = ""
        } else {
            document.getElementById("life_date_to-error").innerHTML = ""
            product.life_date_to = this.value
        }
    })

    form.life_date_from.addEventListener("click",function() {
        if (this.value == "" || this.value > life_date_from.value){
            document.getElementById("life_date_from-error").innerHTML = "El producto debe tener asignada una fecha de vigencia hasta"
            product.life_date_from = ""
        } else {
            document.getElementById("life_date_from-error").innerHTML = ""
            product.life_date_from = this.value
        }
    })

    form.expiration_days.addEventListener("keyup",function() {
        if (validator.isDecimal(this.value) && this.value > 0){
            document.getElementById("expiration_days-error").innerHTML = ""  
            product.expiration_days = this.value
        } else {
            document.getElementById("expiration_days-error").innerHTML = "Los dias de vencimiento del producto debe mayor o igual a 0"
            product.expiration_days = ""
        }
    })

    form.share.addEventListener("click",function() {
        if (this.value == "" || validator.isEmpty(this.value)){
            document.getElementById("share-error").innerHTML = "El producto debe tener asignado si es para compartir"
            product.share = ""
        } else {
            document.getElementById("share-error").innerHTML = ""   
            product.share = this.value
        }
    })
    
    form.stock.addEventListener("keyup",function() {
        if (validator.isDecimal(this.value) && this.value > 0 ){
            document.getElementById("stock-error").innerHTML = "" 
            product.stock = this.value
        } else {
            document.getElementById("stock-error").innerHTML = "El stock del producto debe ser numerico"
            product.stock = ""
        }
    })

    form.status.addEventListener("click",function() {
        if (this.value == "" || validator.isEmpty(this.value)){
            document.getElementById("status-error").innerHTML = "El estado del producto debe tener asignado un valor"
            product.status = ""
        } else {
            document.getElementById("status-error").innerHTML = ""
            product.status = this.value
        }
    })

    form.description.addEventListener("keyup",function() {
        if (validator.isAlpha(this.value) && validator.isLength(this.value,{min:10,max:300})){
            document.getElementById("description-error").innerHTML = "" 
            product.description = this.value
        } else {
            document.getElementById("description-error").innerHTML = "La descripcion del producto debe tener minimo 10 caracteres y maximo 300"
            product.description = ""
        }
    }) 

    form.addEventListener("submit",function(event) {
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
        }

    })

})