const regionesYComunas = {
    "Metropolitana": ["Santiago", "Puente Alto", "Maipú", "La Florida"],
    "Valparaiso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
    "Biobio": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"]
    };

    const form = document.getElementById('registroForm');
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');
    const contrasena = document.getElementById('contrasena');
    const confirmarContrasena = document.getElementById('confirmarContrasena');
    const errorContrasena = document.getElementById('error-contrasena');
    const correoInput = document.getElementById('correo');

    // Cargar comunas dinámicamente
    regionSelect.addEventListener('change', () => {
        const region = regionSelect.value;
        comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>';

        if (regionesYComunas[region]) {
            regionesYComunas[region].forEach(comuna => {
                const opt = document.createElement('option');
                opt.value = comuna;
                opt.textContent = comuna;
                comunaSelect.appendChild(opt);
            });
            }
        });

        
    form.addEventListener('submit', function (event) {
        event.preventDefault(); //evitar recargas
        const correo = correoInput.value.trim();
        // Validar contraseñas iguales
        if (contrasena.value !== confirmarContrasena.value) {
            confirmarContrasena.classList.add('is-invalid');
            errorContrasena.style.display = 'block';
            return;
        } else {
            confirmarContrasena.classList.remove('is-invalid');
            errorContrasena.style.display = 'none';
        }

        //Validar correo cliente
        if (!correo.endsWith('@gmail.com')){
            correoInput.classList.add('is-invalid');
            return;
        }else{
            correoInput.classList.remove('is-invalid');
        }

        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

            // Si pasa validación se guarda el usuario
            const usuario = {
                tipoUsuario: document.getElementById('tipoUsuario').value,
                nombre: document.getElementById('nombre').value,
                apellidos: document.getElementById('apellidos').value,
                correo: correo,
                contrasena: contrasena.value,
                telefono: document.getElementById('telefono').value,
                fechaNacimiento: document.getElementById('fechaNacimiento').value,
                region: regionSelect.value,
                comuna: comunaSelect.value
            };

            // Validar si ya existe un correo igual
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const existeCorreo = usuarios.some(u => u.correo === usuario.correo);

            if (existeCorreo){
                alert("❌ El correo ya está registrado. Intenta con otro.")
                return; //Se detiene el registro
            }

            // Guardar en localStorage
            usuarios.push(usuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert("Usuario registrado con éxito ✅");

            // Reiniciar formulario
            form.reset();
            form.classList.remove('was-validated');
        });