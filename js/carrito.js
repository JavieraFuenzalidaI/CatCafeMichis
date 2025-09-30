document.addEventListener('DOMContentLoaded', function () {
  const listaCarrito = document.getElementById('carrito-lista');
  const contador = document.getElementById('contador');
  const carritoDiv = document.getElementById('carrito');
  const tituloCarrito = carritoDiv.querySelector('h5');

  // Mostrar/Ocultar carrito al hacer clic en el título
  tituloCarrito.addEventListener('click', () => {
    carritoDiv.style.display = carritoDiv.style.display === 'none' ? 'block' : 'none';
  });

  // Formato: "$4.000" → 4000
  function parsearPrecio(precioTexto) {
    return Number(precioTexto.replace(/[$.]/g, ''));
  }

  // Agrega un producto al carrito y guarda en localStorage
  function agregarProducto(nombre, precio, imagen = '') {
    const producto = { nombre, precio, imagen };
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
  }

  // Elimina un producto por índice
  function eliminarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
  }

  //Muestra el carrito
  function actualizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((producto, index) => {
      const precioNumero = parsearPrecio(producto.precio);
      total += precioNumero;

      const li = document.createElement('li');
      li.style.marginBottom = '10px';
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';

      li.innerHTML = `
        <span>${producto.nombre} - $${precioNumero.toLocaleString('es-CL')}</span>
        <button style="margin-left: 10px;" onclick="eliminarProducto(${index})">❌</button>
      `;

      listaCarrito.appendChild(li);
    });

    contador.textContent = carrito.length;
    carritoDiv.style.display = carrito.length > 0 ? 'block' : 'none';

    // Mostrar total
    if (carrito.length > 0) {
      const totalLi = document.createElement('li');
      totalLi.style.marginTop = '10px';
      totalLi.style.fontWeight = 'bold';
      totalLi.textContent = `Total: $${total.toLocaleString('es-CL')}`;
      listaCarrito.appendChild(totalLi);

      const pagarBtn = document.createElement('button');
      pagarBtn.textContent = 'Pagar';
      pagarBtn.style.marginTop = '10px';
      pagarBtn.style.padding = '8px 16px';
      pagarBtn.style.backgroundColor = '#4CAF50';
      pagarBtn.style.color = 'white';
      pagarBtn.style.border = 'none';
      pagarBtn.style.cursor = 'pointer';

      pagarBtn.addEventListener('click', function () {
        alert('¡Gracias por tu compra en CatCafe Michis 😺!\nTe esperamos de nuevo pronto.');
        localStorage.removeItem('carrito');
        actualizarCarrito();
      });

      const pagarLi = document.createElement('li');
      pagarLi.appendChild(pagarBtn);
      listaCarrito.appendChild(pagarLi);
    }

  }

  // Captura los botones de agregar y extrae la info del producto
  const botones = document.querySelectorAll('.btn-add');
  botones.forEach((boton) => {
    boton.addEventListener('click', function () {
      const item = this.closest('.item');
      const nombreProducto = item.querySelector('h3 a').innerText;
      const precioTexto = item.querySelector('.price').innerText;
      const imagen = item.querySelector('img')?.src || '';

      agregarProducto(nombreProducto, precioTexto, imagen);
    });
  });

  // Hace global la función de eliminar (necesario para el onclick dentro de HTML dinámico)
  window.eliminarProducto = eliminarProducto;

  // Carga inicial
  actualizarCarrito();
});