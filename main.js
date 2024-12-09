const app = Vue.createApp({
    data(){
      return {
        pageTitle:'Clases de Yoga y Meditación Online.',
        pageTitle_1:'Clases de Yoga y Meditación',
        pageTitle_2:'Bienvenido a',
        pageTitle_3:'Espacio Om',
        content: 'Diferentes disciplinas de Yoga, descubre mas allá de la práctica física. Aprende de diversos profesores de Yoga en casa o mientras viajas.',
        image: 'assets/img/yoga_index.jpg',
        icono: 'assets/img/logo_152.PNG',
        bienvenida: 'Bienvenido a Padma Online',
        icono2:'assets/img/login.jpg',
        image:'assets/img/_.jpeg',
        image2:'assets/img/yoga_index.jpg',
        image3:'assets/img/yoga_1.jpg',
        saludo:'Hola',
        liIdReg: 2,
        liIdPre: 1,
        liIdAdm: 4,
        liIdFree: 3,
        horarioClaseLunes: [1, 2, 3],
        horarioClaseMartes: [1, 2, 3, 4],
        horarioClaseMiercoles: [1, 2, 3, 4],
        horarioClaseJueves: [1, 2, 3, 4],
        horarioClaseViernes: [1, 2, 3],
        horarioClaseSabado: [1, 2, 3],
        horarioClaseDomingo: [1, 2, 3], 
        dia: null,
        horario: {
          clase: null, // Agrega una propiedad "clase" a "horario" y inicialízala con null
          horario: null
        },
        horarioEncontrado: null,
        horarios: []
      }
    },
    methods:{
      handleClickEvent(day, timeStart, timeEnd, eventName) {
        this.dia = day;
        this.horario.clase = eventName;
        this.horario.horario = timeStart;

        // Mostrar la información en la consola
        console.log("Día:", day);
        console.log("Horario:", timeStart + " - " + timeEnd);
        console.log("Nombre de la clase:", eventName);
      },
         obtenerUsuario() {
            var inputUsuario = document.getElementById("usuarioText");
            var inputPassword = document.getElementById("passwordText");
            var usuario = inputUsuario.value;
            var pass = inputPassword.value;
            console.log("Texto ingresado: " + usuario + " " + pass);
                
            this.login(usuario, pass)
        
        },
        async dblcLunes_1() {
          try {
            const horario = this.horario.horario;
            const dia = this.dia;
            const id = await this.idHorario(dia, horario);
            await this.updateHorario(id, dia);
          } catch (error) {
            console.error('error', error);
            return null;
          }
        },

        async idHorario(dia, horario) {
          console.log("idHorario horario " + horario);
          console.log("idHorario dia " + dia);
      
          try {
              let endpoint = '';
      
              switch (dia) {
                  case 'Lunes':
                      endpoint = '/api/lunes';
                      break;
                  case 'Martes':
                      endpoint = '/api/martes';
                      break;
                  case 'Miercoles':
                      endpoint = '/api/miercoles';
                      break;
                  case 'Jueves':
                      endpoint = '/api/jueves';
                      break;
                  case 'Viernes':
                      endpoint = '/api/viernes';
                      break;
                  case 'Sabado':
                      endpoint = '/api/sabado';
                      break;
                  case 'Domingo':
                      endpoint = '/api/domingo';
                      break;
                  default:
                      throw new Error('Día no válido');
              }
      
              const response = await axios.get(endpoint);
              const data = response.data;
      
              this.horarios = data[day.toLowerCase()];
              this.horarioEncontrado = this.horarios.find(sche => sche.horario === horario);
      
              if (this.horarioEncontrado) {
                  const idHorario = this.horarioEncontrado.id;
                  console.log("horario encontrado " + this.horarioEncontrado.horario + " id " + idHorario);
                  console.log("búsqueda exitosa");
                  this.horario = null;
                  this.day = null;
                  return idHorario;
              } else {
                  this.mostrarAviso();
                  console.log("no se encontró el horario");
                  this.horario = null;
                  this.day = null;
                  return null;
              }
          } catch (error) {
              console.error('Error al obtener el horario:', error);
              return null;
          }
      },
      

      async updateHorario(id, dia) {
        console.log("this horarios updateHorario " + JSON.stringify(this.horarios));
        console.log("id updateHorario " + id);
        console.log("dia updateHorario " + dia);
    
        try {
            const updatedClase = prompt("Ingrese la nueva Clase:");
            console.log("updateclase updateHorario " + updatedClase);
            
            const updatedHorario = this.horarios.find((item) => item.id === id);
            updatedHorario.clase = updatedClase;
    
            let endpoint = `/api/horarios/${dia.toLowerCase()}/${id}`;
    
            const response = await axios.put(endpoint, updatedHorario, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 200) {
                console.log(`Horario ${dia} actualizado correctamente.`);
            } else {
                console.error(`Error updating data ${dia}:`, response.status);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    },
    

        
        async login(usuario, pass) {
          try {
            const response = await axios.get('http://localhost:3000/api/usuarios');
            const usuarios = response.data;
            
            const usuarioEncontrado = usuarios.usuar.find(user => user.usuario === usuario && user.contraseña === pass);
            if (usuarioEncontrado) {
              const usuario = usuarioEncontrado.usuario;
              const idMembresia = usuarioEncontrado.idMembresia;
      
              console.log("membresia " + idMembresia);
              console.log("usuario "+ usuario);
              console.log("Inicio de sesión exitoso");
              window.location.href = "sesion.html"; 
      
              this.datos(usuario, idMembresia);
            } else {
              this.mostrarAviso();
              console.log("Credenciales inválidas. Inicio de sesión fallido");
            }
          } catch (error) {
            console.error('Error al obtener los usuarios:', error);
          }
        },

        async schedule() {
          try {
              const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];
              const horarios = {};
      
              for (const dia of dias) {
                console.log('Día solicitado:', dia);
                const response = await axios.get(`http://localhost:3000/api/horarios/${dia}`);
                console.log('Datos recibidos:', response.data);

                  horarios[dia] = response.data[dia];

              }
      
              this.horarioClaseLunes = horarios.lunes.map(item => item.clase);
              this.horarioClaseMartes = horarios.martes.map(item => item.clase);
              this.horarioClaseMiercoles = horarios.miercoles.map(item => item.clase);
              this.horarioClaseJueves = horarios.jueves.map(item => item.clase);
              this.horarioClaseViernes = horarios.viernes.map(item => item.clase);
              this.horarioClaseSabado = horarios.sabado.map(item => item.clase);
              this.horarioClaseDomingo = horarios.domingo.map(item => item.clase);
      
          } catch (error) {
              console.error('Error al obtener los horarios:', error);
              return null;
          }
      },
      
         

          datos(usuario, idMembresia){
            const datos = {
              nombre: usuario,
              idMembresia: idMembresia
            };
            console.log('se guardo en sesion', datos);
            localStorage.setItem('datos', JSON.stringify(datos));
            window.location.href = ' /sesion.html'; 
          }, 

          nombreUsuario(){

             // Página de destino
             const datosString = localStorage.getItem('datos');
             const datos = JSON.parse(datosString);
 
             console.log(datos.nombre + " se guardo nombre"); // John
             return datos.nombre
          },
          membresiaUsuario(){

            // Página de destino
            const datosString = localStorage.getItem('datos');
            const datos = JSON.parse(datosString);

            // console.log(datos.idMembresia+ " se guardo  idMembresia"); // membresia
            return datos.idMembresia
         },

         membresiaDataList() {
          axios.get('/api/planes')
              .then(response => {
                  const dataList = document.getElementById('membership');
                  const planes = response.data.planes;
      
                  // Generar las opciones del datalist desde el JSON
                  planes.forEach(item => {
                      const option = document.createElement('option');
                      option.value = item.nombre;
                      dataList.appendChild(option);
                  });
              })
              .catch(error => console.error('Error:', error));
      },
      

      claseDataList() {
        axios.get('/api/clases')
            .then(response => {
                const dataList = document.getElementById('practica');
                const clases = response.data.clases;
    
                // Generar las opciones del datalist desde el JSON
                clases.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.clase;
                    dataList.appendChild(option);
                });
            })
            .catch(error => console.error('Error:', error));
    },
    

          mostrarAviso() {
            alert("El usuario o contraseña que ingreso es incorrecto");
          },
              

          openSignupForm() {
            
            var signupForm = document.getElementById("signupForm");
            signupForm.style.display = "block";
            this. membresiaDataList();
         
          },

          openInstructorForm() {
            
            var instructorForm = document.getElementById("instructorForm");
            instructorForm.style.display = "block";
            this.claseDataList();
          },

          openClassForm() {
            var classForm = document.getElementById("classForm");
            classForm.style.display = "block";
          },

          closeSignupForm() {
            var signupForm = document.getElementById("signupForm");
            signupForm.style.display = "none";
          },

          closeInstructorForm() {
            var instructorForm = document.getElementById("instructorForm");
            instructorForm.style.display = "none";
          },

          closeClassForm() {
            var classForm = document.getElementById("classForm");
            classForm.style.display = "none";
          },

          async idMembresia(membership) {
            try {
                const response = await axios.get('/api/planes');
                const planes = response.data.planes;
                const planEncontrado = planes.find(plan => plan.nombre === membership);
        
                if (planEncontrado) {
                    const idPlan = planEncontrado.id;
                    console.log("membresia " + planEncontrado.nombre + " id " + idPlan);
                    console.log("búsqueda exitosa");
                    return idPlan;
                } else {
                    this.mostrarAviso();
                    console.log("no se encontró el plan");
                    return null;
                }
            } catch (error) {
                console.error('Error al obtener los planes:', error);
                return null;
            }
        },
        

        async idClase(claseY) {
          console.log("funcion clase " + claseY);
          try {
              const response = await axios.get('/api/clases');
              const clases = response.data.clases;
              const claseEncontrada = clases.find(clase => clase.clase === claseY);
      
              if (claseEncontrada) {
                  const idClase = claseEncontrada.id;
                  console.log("clase " + claseEncontrada.clase + " id " + idClase);
                  console.log("búsqueda exitosa");
                  return idClase;
              } else {
                  this.mostrarAviso();
                  console.log("no se encontró la clase");
                  return null;
              }
          } catch (error) {
              console.error('Error al obtener las clases:', error);
              return null;
          }
      },
      

      async signUp() {
        const usernameInput = document.getElementById("username");
        const passwordInput = document.getElementById("password");
        const emailInput = document.getElementById("email");
        const membershipInput = document.querySelector('input[list="membership"]');
        const usuario = usernameInput.value;
        const contraseña = passwordInput.value;
        const email = emailInput.value;
        const membership = membershipInput.value;
    
        console.log(usuario, contraseña, email, membership);
    
        try {
            // Obtener el ID de la membresía
            const idMembresiaValue = await this.idMembresia(membership);
            console.log(idMembresiaValue + " este es el id de la membresía");
    
            // Crear el objeto usuario nuevo
            const usuarioNuevo = {
                usuario: usuario,
                contraseña: contraseña,
                correo: email,
                idMembresia: idMembresiaValue
            };
    
            console.log(usuarioNuevo + " este es el usuario nuevo");
    
            // Enviar la solicitud POST con axios
            const response = await axios.post('http://localhost:3002/usuarios', usuarioNuevo, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 201 || response.status === 200) {
                console.log("Usuario registrado con éxito");
                alert("Tu registro se realizó con éxito");
            } else {
                console.error(`Error al registrar usuario: ${response.status}`);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud POST:', error.message);
        }
    },
    
    
          async getIntructor() {

            const instructorInput = document.getElementById("instructorname");
            const classInput = document.querySelector('input[list="practica"]');
            const instructor= instructorInput.value;
            const claseY = classInput.value;
           
           console.log(instructor, claseY);
           var idClaseValue = await this.idClase(claseY);
           console.log(idClaseValue);
              const instructorNuevo = {
                instructor: instructor,
                idClase: idClaseValue,

              }

             
              const postData = async () => {
                const newInstructor = instructorNuevo;
                console.log(newInstructor.instructor + " este es el instructor nuevo");
                
                try {
                    const response = await axios.post('http://localhost:3003/instructores', newInstructor, {
                        headers: { 'Content-Type': 'application/json' }
                    });
            
                    console.log("instructor***");
                    console.log(response.status); // Imprime el código de estado de la respuesta
                    console.log(response.statusText); // Imprime el mensaje de estado de la respuesta
            
                    if (response.status === 201 || response.status === 200) {
                        alert("El registro se realizó con éxito");
                        console.log("se guardó con éxito1 instructor");
                        const { instructor, clase } = response.data;
                        console.log("se guardó con instructor éxito2");
                    }
                } catch (error) {
                    console.error('Error al realizar la solicitud POST:', error.message);
                }
            };
            
              
              postData();
              alert("El registro se realizo con éxito");
              console.log("se guardo con clase exito2")
             
           
            },

            getClass() {
              console.log("getclass");
          
              const classInput = document.getElementById("classname");
              const typeInput = document.querySelector('input[list="typeClass"]');
              const clase = classInput.value;
              const tipo = typeInput.value;
              
              console.log(tipo, clase);
          
              const claseNueva = {
                  clase: clase,
                  tipo: tipo
              };
          
              console.log(claseNueva + " este es la clase nueva");
          
              const postData = async () => {
                  try {
                      const response = await axios.post('http://localhost:3004/clases', claseNueva, {
                          headers: { 'Content-Type': 'application/json' }
                      });
          
                      if (response.status === 201 || response.status === 200) {
                          alert("El registro se realizó con éxito");
                          console.log("se guardo con exito1 clase");
                          const { tipo, clase } = response.data;
                          console.log("se guardo con clase exito2");
                      }
                  } catch (error) {
                      console.error('Error al realizar la solicitud POST:', error.message);
                  }
              };
          
              postData();
              alert("El registro se realizo con éxito");
              console.log("se guardo con clase exito2");
          }
          
              
    },
    mounted() {
      console.log("mounted")
      this.schedule();
    }
   })