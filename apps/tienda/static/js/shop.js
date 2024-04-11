function agregarProducto(sku, imagen, nombre, precio, cantidad) {
  // Obtener los productos almacenados en el Local Storage
  var productos = localStorage.getItem('productos');
  if (!productos) {
    productos = []; // Si no hay productos almacenados, crear un nuevo array
  } else {
    productos = JSON.parse(productos); // Si hay productos almacenados, convertir el string a un array
  }
  
  // Verificar si el producto ya existe en el carrito
  var productoExistente = productos.find(function(producto) {
    return producto.sku === sku;
  });

  if (productoExistente) {
    // Si el producto ya está en el carrito, actualizar la cantidad
    productoExistente.cantidad += cantidad;
  } else {
    // Si el producto no está en el carrito, agregarlo
    var nuevoProducto = {
      sku: sku,
      imagen: imagen,
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    };
    productos.push(nuevoProducto);
  }
  
  // Guardar los productos actualizados en el Local Storage
  localStorage.setItem('productos', JSON.stringify(productos));

  // Mostrar los productos y el total en el carrito
  mostrarProductosCarrito();

  // Mostrar el mensaje de alerta estilo toast
  // Mostrar el mensaje de alerta estilo toast
  mostrarMensajeToast("Producto agregado al carrito");

}
function mostrarMensajeToast(mensaje) {
  var toastContainer = document.getElementById('toastContainer');
  var toastElement = document.createElement('div');
  toastElement.classList.add('toast');
  toastElement.setAttribute('role', 'alert');
  toastElement.setAttribute('aria-live', 'assertive');
  toastElement.setAttribute('aria-atomic', 'true');
  toastElement.innerHTML = `
    <div class="toast-body">
      ${mensaje}
    </div>
  `;
  toastContainer.appendChild(toastElement);
  var bsToast = new bootstrap.Toast(toastElement);
  bsToast.show();
}

function vaciarCarrito() {
  // Eliminar los productos del Local Storage
  localStorage.removeItem('productos');

  // Mostrar el carrito vacío
  mostrarProductosCarrito();
}


function mostrarProductosCarrito() {
  var cartItems = document.getElementById('cartItems');
  var totalContainer = document.getElementById('cartTotal');
  var cartItemCount = document.getElementById('cartItemCount');
  cartItems.innerHTML = ''; // Limpiar el contenido del carrito antes de mostrar los productos

  // Obtener los productos almacenados en el Local Storage
  var productos = localStorage.getItem('productos');
  if (productos) {
    productos = JSON.parse(productos);

    // Mostrar cada producto en el carrito
    for (var i = 0; i < productos.length; i++) {
      var producto = productos[i];
      var item = document.createElement('div');
      item.innerHTML = `
        <img src="${producto.imagen}" class="cart-item-image" height="100">
        <span class="cart-item-name pe-3  ">${producto.nombre}</span>
        <span class="cart-item-price pe-3">$${producto.precio}</span>
        <span class="cart-item-quantity-container">
        <button class="cart-item-quantity-change" onclick="cambiarCantidad('${producto.sku}', -1)">-</button>
        <input type="number" class="cart-item-quantity" readonly value="${producto.cantidad}" min="1">
        <button class="cart-item-quantity-change" onclick="cambiarCantidad('${producto.sku}', 1)">+</button>
        </span>
        <button class="cart-item-remove" onclick="removerProducto('${producto.sku}')">Eliminar</button>
      `;
      cartItems.appendChild(item);
    }

    // Calcular el total
    var total = calcularTotal();

    // Mostrar el total en el contenedor correspondiente
    totalContainer.textContent = 'Total: $' + total.toFixed(0);

    // Mostrar la cantidad de productos en el icono del carrito
    cartItemCount.textContent = productos.length;
  } else {
    // Si no hay productos, ocultar el número en el icono del carrito
    cartItemCount.textContent = '';
  }
}

function calcularTotal() {
  var total = 0;

  // Obtener los productos almacenados en el Local Storage
  var productos = localStorage.getItem('productos');
  if (productos) {
    productos = JSON.parse(productos);

    // Calcular el total sumando el precio de cada producto
    for (var i = 0; i < productos.length; i++) {
      var producto = productos[i];
      total += producto.precio * producto.cantidad;
    }
  }

  return Math.round(total);
}


// Cerrar el modal al hacer clic en la "X" de cerrar
var closeButtons = document.getElementsByClassName('close');
for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', function() {
    var modal = document.getElementById('cartModal');
    modal.style.display = 'none';
  });

  // Modificar el estilo de la "X"
  closeButtons[i].style.fontSize = '24px'; // Ajustar el tamaño de la fuente
  closeButtons[i].style.position = 'absolute'; // Cambiar la posición a absoluta
  closeButtons[i].style.top = '10px'; // Ajustar la posición superior
  closeButtons[i].style.right = '10px'; // Ajustar la posición derecha
}


// Función para cambiar la cantidad de un producto en el carrito
// Función para cambiar la cantidad de un producto en el carrito
function cambiarCantidad(sku, cantidad) {
  // Obtener los productos almacenados en el Local Storage
  var productos = localStorage.getItem('productos');
  if (productos) {
    productos = JSON.parse(productos);

    // Encontrar el producto correspondiente en el carrito
    var producto = productos.find(function (p) {
      return p.sku === sku;
    });

    if (producto) {
      // Actualizar la cantidad del producto
      producto.cantidad += cantidad;

      if (producto.cantidad <= 0) {
        // Si la cantidad se reduce a cero o menos, eliminar el producto del carrito
        productos = productos.filter(function (p) {
          return p.sku !== sku;
        });
      }

      // Guardar los productos actualizados en el Local Storage
      localStorage.setItem('productos', JSON.stringify(productos));

      // Mostrar los productos actualizados en el carrito
      mostrarProductosCarrito();
    }
  }
}

// Función para eliminar un producto del carrito
function removerProducto(sku) {
  // Obtener los productos almacenados en el Local Storage
  var productos = localStorage.getItem('productos');
  if (productos) {
    productos = JSON.parse(productos);

    // Filtrar el producto a eliminar
    productos = productos.filter(function (producto) {
      return producto.sku !== sku;
    });

    // Guardar los productos actualizados en el Local Storage
    localStorage.setItem('productos', JSON.stringify(productos));

    // Mostrar los productos actualizados en el carrito
    mostrarProductosCarrito();
  }
}

// Mostrar el modal al hacer clic en el botón "Agregar al carrito"
var addToCartButtons = document.getElementsByClassName('show');
for (var i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener('click', function () {
    var modal = document.getElementById('cartModal');
    modal.style.display = 'block';
  });
}

// Cerrar el modal al hacer clic en la "X" de cerrar
var closeButtons = document.getElementsByClassName('close');
for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener('click', function () {
    var modal = document.getElementById('cartModal');
    modal.style.display = 'none';
  });
}

// Centrar el contenido del modal
var modalContent = document.getElementsByClassName('modal-content');
for (var i = 0; i < modalContent.length; i++) {
  modalContent[i].style.display = 'flex';
  modalContent[i].style.justifyContent = 'between';
  modalContent[i].style.alignItems = 'center';
}

function mostrarToast() {
  // Crear contenedor para el toast
  var toastContainer = document.createElement('div');
  toastContainer.classList.add('position-fixed', 'bottom-0', 'end-0', 'p-3');

  // Crear elemento de toast
  var toast = document.createElement('div');
  toast.classList.add('toast', 'bg-danger', 'text-white');
  toast.setAttribute('role', 'alert');
  toast.innerHTML = 'No puede agregar productos al carrito, primero debe iniciar sesión';

  // Agregar toast al contenedor
  toastContainer.appendChild(toast);

  // Agregar contenedor al documento
  document.body.appendChild(toastContainer);

  // Mostrar toast
  $(toast).toast('show');

  // Eliminar toast después de 3 segundos
  setTimeout(function() {
    $(toast).toast('dispose');
    document.body.removeChild(toastContainer);
  }, 3000);
}

// Obtener referencia al botón
var loginButton = document.getElementById('loginButton');

// Agregar evento click al botón
loginButton.addEventListener('click', mostrarToast);

mostrarProductosCarrito()