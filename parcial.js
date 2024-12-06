'use strict';

let productos = [
    {
        id: 1,
        nombre: 'Aros de víboras',
        descripcion: 'Aros colgantes largos de víbora de metal con piedra',
        precio: 4900,
        imagen: ['img/aros_serpiente1.webp', 'img/aros_serpiente2.webp'],
        categoría: 'Aros',
    },
    {
        id: 2,
        nombre: 'Set de aros',
        descripcion: 'Set de 3 aros con distintos formatos: argollas con papas fritas, y pasantes de helado y corazón',
        precio: 4000,
        imagen: ['img/set1.webp', 'img/set2.webp'],
        categoría: 'Aros',
    },
    {
        id: 3,
        nombre: 'Anillo con strass',
        descripcion: 'Anillo grande de metal con strass, luna y estrella. Talle:M',
        precio: 3000,
        imagen: ['img/anillo1.webp', 'img/anillo2.webp'],
        categoría: 'Anillo',
    },
    {
        id: 4,
        nombre: 'Cadena con dijes',
        descripcion: 'Cadena con dije de corazón y flor, con acrílico y nácar',
        precio: 3500,
        imagen: ['img/collar1.webp' , 'img/collar2.webp' ],
        categoría: 'Collar',
    },
    {
        id: 5,
        nombre: 'Aros de ojitos',
        descripcion: 'Aros pasantes con ojito con strass de diferentes colores',
        precio: 2200,
        imagen: ['img/ojos1.webp', 'img/ojos2.webp'],
        categoría: 'Aros',
    },
    {
        id: 6,
        nombre: 'Anillo esmaltado',
        descripcion: 'Anillo de metal con esmalte y strass. Talle: M',
        precio:  3000,
        imagen: ['img/anillo3.webp', 'img/anillo4.webp'],
        categoría: 'Anillo',
    },
];

let carrito = {
    productosIds: [],
    cantidades: [],
    total: 0,
};

//catalogo
function cargarCatalogo() {
    const catalogo = document.getElementById("catalogo");

    productos.forEach((producto) => {
        const elementoProducto = crearProductoElement(producto);
        catalogo.appendChild(elementoProducto);
    });
}

//crear la cards
function crearProductoElement(producto) {

    const elementoProducto = document.createElement("div");
    elementoProducto.classList.add("producto");
    elementoProducto.setAttribute("data-cat", producto.categoría);

    const contenedorImagen = document.createElement("div");
    contenedorImagen.classList.add("producto-imagen-container");

    const imgProducto = document.createElement("img");
    imgProducto.src = producto.imagen[0];
    imgProducto.alt = producto.nombre;
    imgProducto.classList.add("d-block", "w-100");


    contenedorImagen.appendChild(imgProducto);
    elementoProducto.appendChild(contenedorImagen);

    const precioElement = document.createElement("p");
    precioElement.textContent = `Precio: $${producto.precio}`;

   //detalles
   const detallesBtn = document.createElement("button");
    detallesBtn.classList.add("btn");
    detallesBtn.type = "button";
    detallesBtn.dataset.bsToggle = "modal";
    detallesBtn.dataset.bsTarget = `#modal${producto.id}`;
    detallesBtn.textContent = "Ver detalles";

    const descripcionDiv = document.createElement("div");
    descripcionDiv.classList.add("modal", "fade");
    descripcionDiv.id = `modal${producto.id}`
    descripcionDiv.setAttribute("tabindex", "-1");
    descripcionDiv.setAttribute("aria-labelledby", "modal${producto.id}Label");
    descripcionDiv.setAttribute("aria-hidden", "true");

    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    const modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title", "fs-1");
    modalTitle.id = `modal${producto.id}Label`;
    modalTitle.textContent = `${producto.nombre}`;

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.classList.add("btn-close");
    closeButton.dataset.bsDismiss = "modal";
    closeButton.setAttribute("aria-label", "Close");

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body", "catalogoProductoP");
    modalBody.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-center");

    //carrusel
    const carrusel = document.createElement("div");
    carrusel.classList.add("carousel", "slide");
    carrusel.setAttribute("data-bs-ride", "carousel");

    //tiempo
    carrusel.setAttribute("data-bs-interval", "3000");

    const carruselInner = document.createElement("div");
    carruselInner.classList.add("carousel-inner");

    producto.imagen.forEach((imagen, index) => {
        const carruselItem = document.createElement("div");
        carruselItem.classList.add("carousel-item");
        if (index === 0) {
            carruselItem.classList.add("active");
        }

        const imgCarrusel = document.createElement("img");
        imgCarrusel.src = imagen;
        imgCarrusel.alt = `${producto.nombre} - Imagen ${index + 1}`;
        imgCarrusel.classList.add("d-block", "w-100", "img-fluid");
        imgCarrusel.style.maxWidth = "200px";
    imgCarrusel.style.height = "auto";
        imgCarrusel.style.marginBottom = "10px";

        carruselItem.appendChild(imgCarrusel);
        carruselInner.appendChild(carruselItem);
    });

    carrusel.appendChild(carruselInner);
    modalBody.appendChild(carrusel);

    const textoDescripcion = document.createElement("p");
    textoDescripcion.textContent = producto.descripcion;

    modalBody.appendChild(textoDescripcion);
    modalContent.appendChild(modalBody);

    const modalFooter = document.createElement("div");
    modalFooter.classList.add("modal-footer");

    const precioModal = document.createElement("p");
    precioModal.textContent = `Precio: $${producto.precio}`;

    const agregarBtn = document.createElement("button");
    agregarBtn.classList.add("btn", "agregarCarrito");
    agregarBtn.dataset.id = producto.id;
    agregarBtn.dataset.val = producto.precio;
    agregarBtn.textContent = "Agregar al Carrito";

    agregarBtn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const val = parseInt(e.target.dataset.val);
        agregarProductoAlCarrito(id, val);
    });

    modalFooter.appendChild(precioModal);
    modalFooter.appendChild(agregarBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    descripcionDiv.appendChild(modalDialog);


    //agregar
    const agregarCarritoBtn = document.createElement("button");
    agregarCarritoBtn.classList.add("btn", "agregarCarrito");
    agregarCarritoBtn.dataset.id = producto.id;
    agregarCarritoBtn.dataset.val = producto.precio;
    agregarCarritoBtn.textContent = "Agregar al Carrito";

    agregarCarritoBtn.addEventListener('click', (e) => {
        const id = parseInt(e.target.dataset.id);
        const val = parseInt(e.target.dataset.val);
        agregarProductoAlCarrito(id, val);
    });

    const tituloH3 = document.createElement("h3");
    tituloH3.textContent = producto.nombre;

    elementoProducto.appendChild(tituloH3);
    elementoProducto.appendChild(precioElement);
    elementoProducto.appendChild(detallesBtn);
    elementoProducto.appendChild(descripcionDiv);
    elementoProducto.appendChild(agregarCarritoBtn);


    return elementoProducto;
}

//modal detalles boton
const detallesBtns = document.querySelectorAll('.detalles-btn');
detallesBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const descripcionId = btn.getAttribute('data-bs-target').substring(1);
        const descripcionElement = document.getElementById(descripcionId);
        descripcionElement.classList.toggle('d-none');
    });
});

let info = document.getElementById("info-carrito");
let reset = document.querySelector("#reset");
let addBtns = document.querySelectorAll(".agregarCarrito");
let delBtns = document.querySelectorAll(".eliminarProducto");

//detalles de carrito
const mostrarCarrito = () => {
    info.innerHTML = `
    Productos: ${carrito.productosIds}
    Cantidades: ${carrito.cantidades} (${carrito.cantidades.reduce((acum, n) => acum + n, 0)})
    Total: $${carrito.total}
    `;
};

mostrarCarrito();

//agregar productos
function agregarProductoAlCarrito(id, val) {
    const indice = carrito.productosIds.indexOf(id);
    if (indice !== -1) {
        carrito.cantidades[indice]++;
    } else {
        carrito.productosIds.push(id);
        carrito.cantidades.push(1);
    }
    carrito.total += val;
    mostrarCarrito();
    mostrarProductosCarrito(); 
}

//quitar productos
for (let btn of delBtns) {
    btn.addEventListener('click', (e) => {
        let id = parseInt(e.target.dataset.id);
        let val = parseInt(e.target.dataset.val);
        const indice = carrito.productosIds.indexOf(id);
        if (indice != -1) {
            if (carrito.cantidades[indice] > 0) {
                carrito.cantidades[indice]--;
                carrito.total = parseInt(carrito.total) - val;
            }
        }

        mostrarCarrito();
    });
}

reset.addEventListener('click', (e) => {
    carrito = {
        productosIds: [],
        cantidades: [],
        total: 0,
    };
    mostrarCarrito();
});


const filtros = document.querySelectorAll(".filtros a");

for (let filtro of filtros) {
    filtro.addEventListener('click', function (e) {
        e.preventDefault();

        
        filtros.forEach(f => f.classList.remove('active'));
        this.classList.add('active');

        const categoria = this.dataset.cat;
        const productos = document.querySelectorAll('.producto');

        productos.forEach(producto => {
            const isVisible = categoria === 'todos' || producto.dataset.cat === categoria;
            producto.classList.toggle('d-none', !isVisible);
        });

        let rutaImagen, textoOferta, textoBoton, productoEspecifico;
        const arrayProductos = Array.from(productos);
        switch (categoria) {
            case 'Aros':
                textoOferta = '¡Aros en oferta!';
                textoBoton = 'Agregar al carrito';
                rutaImagen = 'img/aros_serpiente_banner.webp';
                productoEspecifico = arrayProductos.find(producto => producto.dataset.cat === 'Aros');
                break;
            case 'Anillo':
                textoOferta = '¡Anillos en oferta!';
                textoBoton = 'Agregar al carrito';
                rutaImagen = 'img/anillo_BANNER.webp';
                productoEspecifico = arrayProductos.find(producto => producto.dataset.cat === 'Anillo');
                break;
            case 'Collar':
                textoOferta = '¡Collares en oferta!';
                textoBoton = 'Agregar al carrito';
                rutaImagen = 'img/collar_banner.webp';
                productoEspecifico = arrayProductos.find(producto => producto.dataset.cat === 'Collar');
                break;
            default:
                rutaImagen = '';
                textoOferta = '';
                textoBoton = '';
                productoEspecifico = '';
        }

        if (rutaImagen !== '') {
            mostrarModalConImagenYBoton(rutaImagen, textoOferta, textoBoton, productoEspecifico);
        }
    });
}

//funcion categoria actual
function obtenerCategoriaActual() {
    const filtroSeleccionado = document.querySelector('.filtros a.active');

    if (filtroSeleccionado) {
        const categoriaActual = filtroSeleccionado.dataset.cat;
        console.log('Categoría actual seleccionada:', categoriaActual);
        return categoriaActual;
    } else {
        console.log('Ningún filtro seleccionado. Usando "todos" por defecto.');
        return 'todos';
    }
}

function mostrarModalConImagenYBoton(rutaImagen, textoOferta, textoBoton) {
    
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = "modalOferta";
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-hidden", "true");

    
    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");
    modalDialog.style.padding = "0";
    modalDialog.style.width = "900px";
    modalDialog.style.height = "500px";
    modalDialog.style.display = "flex";
    modalDialog.style.justifyContent = "center";

    
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalContent.style.backgroundImage = `url('${rutaImagen}')`;
    modalContent.style.backgroundSize = "cover";
    modalContent.style.backgroundPosition = "center";
    modalContent.style.width = "400px";
    modalContent.style.height = "200px";
    modalDialog.appendChild(modalContent);

    
    const modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");

    const tituloOferta = document.createElement("h2");
    tituloOferta.classList.add("modal-title");
    tituloOferta.textContent = textoOferta;
    tituloOferta.style.color = "#406359";
    modalHeader.appendChild(tituloOferta);

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.classList.add("cerrarbtn");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.textContent = "x";
    closeButton.style.color = "black";
    closeButton.style.border = "none";
    closeButton.style.fontSize = "24px";

    closeButton.addEventListener('click', function () {
    modal.style.display = "none";
    modal.remove();
    
});

    modalHeader.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");

    const botonModal = document.createElement("button");
    botonModal.textContent = textoBoton;
    botonModal.classList.add("btn", "agregarCarrito");
    botonModal.style.zIndex = "1";


function obtenerProductosSegunCategoria(categoria) {
    switch (categoria) {
        case 'Aros':
            return [1]; 
        case 'Anillo':
            return [3]; 
        case 'Collar':
            return [4]; 
        default:
            return [];
    }
}

botonModal.addEventListener('click', function () {
    
    const categoriaActual = obtenerCategoriaActual();
    const productosCategoria = obtenerProductosSegunCategoria(categoriaActual);

    //agregar productos
    productosCategoria.forEach(productoId => {
        const producto = productos.find(p => p.id === productoId);
        if (producto) {
            agregarProductoAlCarrito(producto.id, producto.precio);
        }
    });

    modal.style.display = "none";
    modal.remove();
});
    
    modalBody.appendChild(botonModal);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalDialog);
    document.body.appendChild(modal);

    modal.classList.add("show");
    modal.style.display = "block";

        //tiempo
        setTimeout(function () {
            modal.style.display = "none";
            modal.remove();
        }, 10000);
}

document.getElementById('limpiarFiltros').addEventListener('click', function (e) {
    e.preventDefault();

    //para ver si esta abierto
    if (!filtroModal.classList.contains('show')) {
        filtroModal.show();
    }
});
        

//limpiar filtros
const limpiarFiltros = document.getElementById("limpiarFiltros");
limpiarFiltros.addEventListener('click', () => {
    const productos = document.querySelectorAll('.producto');
    productos.forEach(producto => producto.classList.remove('d-none'));
});

mostrarCarrito();

//modal Carrito
function mostrarProductosCarrito() {
    
    const carritoContenido = document.getElementById("carritoContenido");
    while (carritoContenido.firstChild) {
        carritoContenido.removeChild(carritoContenido.firstChild);
    }

    let totalPrecio = 0;

    carrito.productosIds.forEach((productoId, indice) => {
        const producto = productos.find((p) => p.id === productoId);
        const cantidad = carrito.cantidades[indice];
        const precioProducto = producto.precio * cantidad;

        const elementoProducto = document.createElement("div");
        elementoProducto.classList.add("producto-carrito");

        const imgProducto = document.createElement("img");
        imgProducto.src = producto.imagen[0];
        imgProducto.alt = producto.nombre;
        imgProducto.style.width = "150px";
        imgProducto.style.height = "150px";
        elementoProducto.appendChild(imgProducto);

        const tituloProducto = document.createElement("p");
        tituloProducto.classList.add("tituloProducto");
        tituloProducto.appendChild(document.createTextNode(producto.nombre));
        elementoProducto.appendChild(tituloProducto);

        const productosSumaResta = document.createElement("div");
        productosSumaResta.classList.add("productosSumaResta");

        const agregarCarritoModalBtn = document.createElement("button");
        agregarCarritoModalBtn.classList.add("agregarCarritoModal", "agregarCarritoCambio");
        agregarCarritoModalBtn.setAttribute("data-id", producto.id);
        agregarCarritoModalBtn.setAttribute("data-val", producto.precio);
        agregarCarritoModalBtn.appendChild(document.createTextNode("+"));
        agregarCarritoModalBtn.addEventListener("click", () => {
            agregarUnidadAlCarrito(productoId);
            mostrarProductosCarrito();
        });
        productosSumaResta.appendChild(agregarCarritoModalBtn);

        const cantidadSpan = document.createElement("span");
        cantidadSpan.appendChild(document.createTextNode(`${cantidad}x`));
        productosSumaResta.appendChild(cantidadSpan);

        const borrarCarritoModalBtn = document.createElement("button");
        borrarCarritoModalBtn.classList.add("borrarCarritoModal", "agregarCarritoCambio");
        borrarCarritoModalBtn.setAttribute("data-id", producto.id);
        borrarCarritoModalBtn.setAttribute("data-val", producto.precio);
        borrarCarritoModalBtn.appendChild(document.createTextNode("-"));
        borrarCarritoModalBtn.addEventListener("click", () => {
            quitarUnidadDelCarrito(productoId);
            mostrarProductosCarrito();
        });
        productosSumaResta.appendChild(borrarCarritoModalBtn);

        elementoProducto.appendChild(productosSumaResta);

        const precioElement = document.createElement("span");
        precioElement.appendChild(document.createTextNode(`Precio: $${precioProducto}`));
        elementoProducto.appendChild(precioElement);

        carritoContenido.appendChild(elementoProducto);

        totalPrecio += precioProducto;
        carrito.total = totalPrecio;
        mostrarCarrito();
    });

    const precioTotalElement = document.createElement("div");
    precioTotalElement.classList.add("precio-total");

    const totalP = document.createElement("p");
    totalP.appendChild(document.createTextNode(`Total: $${totalPrecio}`));
    precioTotalElement.appendChild(totalP);

    const comprarBtn = document.createElement("button");
    comprarBtn.classList.add("btn", "agregarCarrito");
    comprarBtn.setAttribute("type", "button");
    comprarBtn.setAttribute("data-bs-toggle", "modal");
    comprarBtn.setAttribute("data-bs-target", "#modalCompra");
    comprarBtn.setAttribute("id", "botonComprar");
    comprarBtn.appendChild(document.createTextNode("Comprar"));
    precioTotalElement.appendChild(comprarBtn);

    carritoContenido.appendChild(precioTotalElement);
    
}


mostrarProductosCarrito();

//agregar productos modal
for (let btn of addBtns) {
    btn.addEventListener('click', (e) => {
        mostrarProductosCarrito();
    });
}

//quitar productos
for (let btn of delBtns) {
    btn.addEventListener('click', (e) => {
        mostrarProductosCarrito();
    });
}

//reseteo
reset.addEventListener('click', (e) => {
    mostrarProductosCarrito();
});


// + y - del modal
function agregarUnidadAlCarrito(productoId) {
    const indice = carrito.productosIds.indexOf(productoId);
    if (indice !== -1) {
        carrito.cantidades[indice]++;
        mostrarProductosCarrito();
    }
}

function quitarUnidadDelCarrito(productoId) {
    const indice = carrito.productosIds.indexOf(productoId);
    if (indice !== -1 && carrito.cantidades[indice] > 0) {
        carrito.cantidades[indice]--;
        if (carrito.cantidades[indice] === 0) {
            carrito.productosIds.splice(indice, 1);
            carrito.cantidades.splice(indice, 1);
        }
        mostrarProductosCarrito();
        mostrarCarrito(); 
    }
}

cargarCatalogo();

//Formulario
document.addEventListener('DOMContentLoaded', function () {
    
    const modalWrapper = document.createElement('div');
    modalWrapper.classList.add('modal', 'fade');
    modalWrapper.id = 'modalCompra';
    modalWrapper.tabIndex = '-1';
    modalWrapper.setAttribute('aria-labelledby', 'modalCompraLabel');
    modalWrapper.setAttribute('aria-hidden', 'true');

    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    const modalTitle = document.createElement('h2');
    modalTitle.classList.add('modal-title');
    modalTitle.id = 'modalCompraLabel';
    modalTitle.textContent = 'Datos del Comprador';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.classList.add('btn-close');
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');

    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeButton);

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');

    const formularioCompra = document.createElement('form');
    formularioCompra.id = 'formularioCompra';

    const nombreInput = createFormInput('text', 'Nombre:', 'nombre', true);
    const emailInput = createFormInput('email', 'Email:', 'email', true);
    const telefonoInput = createFormInput('tel', 'Teléfono:', 'telefono', true);
    const direccionInput = createFormInput('text', 'Dirección:', 'direccion', true);
    const fechaEntregaInput = createFormInput('date', 'Fecha de Entrega:', 'fechaEntrega', true);
    const metodoPagoSelect = createFormSelect('Método de Pago:', 'metodoPago', true, [
        { value: 'debito', text: 'Tarjeta de Débito' },
        { value: 'credito', text: 'Tarjeta de Crédito' }
    ]);

    const comprarButton = document.createElement('button');
    comprarButton.type = 'submit';
    comprarButton.classList.add('btn', 'btn-primary', 'btn_compra');
    comprarButton.textContent = 'Comprar';

    formularioCompra.appendChild(nombreInput);
    formularioCompra.appendChild(emailInput);
    formularioCompra.appendChild(telefonoInput);
    formularioCompra.appendChild(direccionInput);
    formularioCompra.appendChild(fechaEntregaInput);
    formularioCompra.appendChild(metodoPagoSelect);
    formularioCompra.appendChild(comprarButton);
    modalBody.appendChild(formularioCompra);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalDialog.appendChild(modalContent);
    modalWrapper.appendChild(modalDialog);
    document.body.appendChild(modalWrapper);

    //evento del formulario
    formularioCompra.addEventListener('submit', function (event) {
        //confirmacion mensaje
        const nuevoDiv = document.createElement('div');
        nuevoDiv.classList.add("confirmacionCompra")

        const nuevaImagen = document.createElement('img');
        nuevaImagen.src = 'img/gracias.jpg';
        nuevaImagen.alt = 'Imagen de agradecimiento';
        nuevaImagen.width = 200;
        nuevaImagen.height = 200;

        const nuevoP = document.createElement('p');
        nuevoP.textContent = 'Se te enviará un correo electrónico con toda la información de la compra.';

        nuevoDiv.appendChild(nuevaImagen);
        nuevoDiv.appendChild(nuevoP);

        //Limpiar
        while (modalBody.firstChild) {
            modalBody.removeChild(modalBody.firstChild);
        }

        modalBody.appendChild(nuevoDiv);
        bootstrap.Modal.getInstance(modalWrapper).show();
        event.preventDefault();

        //vaciar el carrito
        carrito = {
            productosIds: [],
            cantidades: [],
            total: 0,
        };
        mostrarProductosCarrito();
        mostrarCarrito();
    });

    function createFormInput(type, label, id, required) {
        const div = document.createElement('div');
        div.classList.add('mb-3');

        const labelElement = document.createElement('label');
        labelElement.htmlFor = id;
        labelElement.classList.add('form-label');
        labelElement.textContent = label;

        const inputElement = document.createElement('input');
        inputElement.type = type;
        inputElement.classList.add('form-control');
        inputElement.id = id;
        if (required) {
            inputElement.required = true;
        }

        div.appendChild(labelElement);
        div.appendChild(inputElement);

        return div;
    }

    function createFormSelect(label, id, required, options) {
        const div = document.createElement('div');
        div.classList.add('mb-3');

        const labelElement = document.createElement('label');
        labelElement.htmlFor = id;
        labelElement.classList.add('form-label');
        labelElement.textContent = label;

        const selectElement = document.createElement('select');
        selectElement.classList.add('form-select');
        selectElement.id = id;
        if (required) {
            selectElement.required = true;
        }

        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            selectElement.appendChild(optionElement);
        });

        div.appendChild(labelElement);
        div.appendChild(selectElement);

        return div;
    }
});