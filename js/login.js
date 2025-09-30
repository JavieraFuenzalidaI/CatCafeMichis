const formLogin = document.getElementById('loginForm');

    formLogin.addEventListener('submit', function (event) {
      event.preventDefault(); // evita recarga

      const correo = document.getElementById('correo').value.trim();
      const contrasena = document.getElementById('contrasena').value;

      // Recuperar usuarios desde localStorage
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      // Buscar usuario con ese correo
      const usuario = usuarios.find(u => u.correo === correo);

      if (!usuario) {
        // Si el correo no existe, redirige a registro
        alert("❌ Este correo no está registrado. Regístrate primero.");
    
        return;
      }

      if (usuario.contrasena === contrasena) {
          alert("✅ Bienvenido " + usuario.nombre);

          // Verificar si el correo termina en @duoc.cl o @profesor.duoc.cl
          if (
            usuario.correo.endsWith('@duoc.cl') || 
            usuario.correo.endsWith('@profesor.duoc.cl')
            ) {
            // Redirige a la página del administrador
            window.location.href = "../admin/InicioAdmin.html";
          } else if (usuario.correo.endsWith('@gmail.com')){
            // Redirige a la página de usuario normal
            window.location.href = "../Inicio.html";
          }

      } else {
          alert("❌ Contraseña incorrecta. Intenta de nuevo.");
      }
    });