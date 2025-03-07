document.addEventListener("DOMContentLoaded", function () {
    const codigo = document.getElementById("codigo");

    const nombre = document.getElementById("nombre");

    const form = document.getElementById("formulario");
    const descripcion = document.getElementById("descripcion");


    function validarCodigo() {
        let valor = codigo.value.trim();

        if (valor === "") {
            alert(" El código del producto no puede estar en blanco.");
            codigo.style.borderColor = "red";
            return false;
        }

        if (valor.length < 5 || valor.length > 15) {
            alert(" El código debe tener entre 5 y 15 caracteres.");
            codigo.style.borderColor = "red";
            return false;
        }


        let formatoValido = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
        if (!formatoValido.test(valor)) {
            alert(" El código debe contener al menos una letra y un número.");
            codigo.style.borderColor = "red";
            return false;
        }
        


        codigo.style.borderColor = "green";
        return true;

    }
    function validarDescripcion() {
        const valor = descripcion.value.trim();

        if (valor === "") {
            alert("La descripción del producto no puede estar en blanco.");
            return false;
        }

        if (valor.length < 10 || valor.length > 1000) {
            alert("La descripción del producto debe tener entre 10 y 1000 caracteres.");
            return false;
        }

        return true;
    }

    form.addEventListener("submit", function (event) {
        if (!validarDescripcion()) {
            event.preventDefault();
        }
    });

    codigo.addEventListener("blur", validarCodigo);

    function validarNombre() {
        let valor = nombre.value.trim();

        if (valor === "") {
            alert(" El nombre del producto no puede estar en blanco.");
            nombre.style.borderColor = "red";
            return false;
        }

        if (valor.length < 2 || valor.length > 50) {
            alert(" El nombre del producto debe tener entre 2 y 50 caracteres.");
            nombre.style.borderColor = "red";
            return false;
        }

        nombre.style.borderColor = "green";
        return true;
    }
    nombre.addEventListener("blur", validarNombre);

    function validarPrecio() {
        let precio = document.getElementById("precio").value.trim();
        let regex = /^\d+(\.\d{1,2})?$/;

        if (precio === "") {
            alert(" El precio del producto no puede estar en blanco.");
            document.getElementById("precio").style.borderColor = "red";
            return false;
        }

        if (!regex.test(precio)) {
            alert(" El precio del producto debe ser un número positivo con hasta dos decimales.");
            document.getElementById("precio").style.borderColor = "red";
            return false;
        }

        document.getElementById("precio").style.borderColor = "green";
        return true;
    }

    document.getElementById("precio").addEventListener("blur", validarPrecio);


    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("formulario");


    });


    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validarCodigo() || !validarNombre() || !validarDescripcion()) {
            alert(" Corrige los errores antes de enviar el formulario.");
            return;
        }
        const formData = new FormData(form);
        fetch("agregar_producto.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log("🔍 Respuesta recibida:", data);
                if (data.success) {
                    alert(" Producto agregado correctamente.");
                    form.reset();
                } else {
                    alert(" Error: " + data.error);
                }
            })
            .catch(error => console.error(" Error en la solicitud:", error));
    });


    function cargarSelects() {
        fetch("obtener_datos.php")
            .then(response => response.json())
            .then(data => {
                console.log(" Datos recibidos:", data);
                if (data.bodegas && data.sucursales && data.monedas) {
                    llenarSelect("bodega", data.bodegas);
                    llenarSelect("sucursal", data.sucursales);
                    llenarSelect("moneda", data.monedas);
                }
            })
            .catch(error => console.error(" Error al obtener datos:", error));
    }

    function llenarSelect(id, datos) {
        let select = document.getElementById(id);
        if (!select) {
            console.error(` No se encontró el select con ID: ${id}`);
            return;
        }

        select.innerHTML = "<option value=''></option>";
        datos.forEach(item => {
            let option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            select.appendChild(option);
        });
    }

    cargarSelects();
});
