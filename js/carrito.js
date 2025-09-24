  document.addEventListener('DOMContentLoaded', function() {
    actualizarCarrito();

    function actualizarCarrito() {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const listaCarrito = document.getElementById('carrito-lista');
      const contador = document.getElementById('contador');
      listaCarrito.innerHTML = '';

      carrito.forEach((producto, index) => {
        const elemento = document.createElement('li');
        elemento.textContent = `${producto.nombre} - ${producto.precio}`;
        
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.addEventListener('click', function() {
          eliminarProducto(index);
        });

        elemento.appendChild(botonEliminar);
        listaCarrito.appendChild(elemento);
      });

      contador.textContent = carrito.length;
      document.getElementById('carrito').style.display = carrito.length > 0 ? 'block' : 'none';
    }

    function eliminarProducto(index) {
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarCarrito(); 
    }

    const botones = document.querySelectorAll('.btn-add');
    
    botones.forEach(boton => {
      boton.addEventListener('click', function() {
        const nombreProducto = this.dataset.nombre || this.parentElement.querySelector('h3 a').innerText;
        const precioProducto = this.parentElement.querySelector('.price').innerText;

        const producto = { nombre: nombreProducto, precio: precioProducto };

        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito();
      });
    });

    const carritoDiv = document.getElementById('carrito');
  const tituloCarrito = carritoDiv.querySelector('h5');

  tituloCarrito.addEventListener('click', () => {
    
    if (carritoDiv.style.display === 'none') {
      carritoDiv.style.display = 'block';
    } else {
      carritoDiv.style.display = 'none';
    }
  });
  
  });
