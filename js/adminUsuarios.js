
    const formUsuario = document.getElementById("formUsuario");
    const tablaUsuarios = document.getElementById("tablaUsuarios")?.querySelector("tbody");
    const indexUsuario = document.getElementById("indexUsuario");

    function mostrarUsuarios() {
      if (!tablaUsuarios) return;
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      tablaUsuarios.innerHTML = "";

      usuarios.forEach((u, i) => {
        if (u.tipoUsuario === "admin" || u.tipoUsuario === "vendedor") {
          let fila = `
            <tr>
              <td>${u.run}</td>
              <td>${u.nombre}</td>
              <td>${u.apellidos}</td>
              <td>${u.correo}</td>
              <td>${u.tipoUsuario}</td>
              <td>
                <button class="enviar-btn-usu" onclick="editarUsuario(${i})"> Editar</button>
                <button class="enviar-btn-usu" onclick="eliminarUsuario(${i})"> Eliminar</button>
              </td>
            </tr>
          `;
          tablaUsuarios.innerHTML += fila;
        }
      });
    }

    // Validar correo permitido
    function correoValido(correo) {
      return correo.endsWith("@duoc.cl") || correo.endsWith("@profesor.duoc.cl");
    }

    function eliminarUsuario(index) {
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.splice(index, 1);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      mostrarUsuarios();
    }

    function editarUsuario(index) {
      let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      let u = usuarios[index];

      document.getElementById("run").value = u.run;
      document.getElementById("nombre").value = u.nombre;
      document.getElementById("apellidos").value = u.apellidos;
      document.getElementById("correo").value = u.correo;
      document.getElementById("contrasena").value = u.contrasena;
      document.getElementById("direccion").value = u.direccion;
      document.getElementById("tipoUsuario").value = u.tipoUsuario;
      indexUsuario.value = index;
    }

    if (formUsuario) {
      formUsuario.addEventListener("submit", e => {
        e.preventDefault();

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuario = {
          run: document.getElementById("run").value.trim(),
          nombre: document.getElementById("nombre").value.trim(),
          apellidos: document.getElementById("apellidos").value.trim(),
          correo: document.getElementById("correo").value.trim(),
          contrasena: document.getElementById("contrasena").value,
          direccion: document.getElementById("direccion").value.trim(),
          tipoUsuario: document.getElementById("tipoUsuario").value
        };

        // Evitar correos duplicados salvo en edición
        const existe = usuarios.some((u, idx) => u.correo === usuario.correo && idx != indexUsuario.value);
        if (existe) {
          alert("❌ El correo ya está registrado");
          return;
        }

        if (indexUsuario.value === "") {
          usuarios.push(usuario);
        } else {
          usuarios[indexUsuario.value] = usuario;
        }
        //Solo correos con @duoc.cl o @profesor.duoc.cl
        if (!correoValido(usuario.correo)) {
          alert("❌ Solo se permiten correos @duoc.cl o @profesor.duoc.cl");
          return;
        }

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("✅ Usuario guardado");
        formUsuario.reset();
        indexUsuario.value = "";
        mostrarUsuarios();
      });

      mostrarUsuarios();
    }