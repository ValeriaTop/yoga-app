function signUp() {

    const usuarios = `[
      {
        "usuario": "Valeria",
        "contraseña": "valeria123"
      },
      {
        "usuario": "Carlos",
        "contraseña": "carlos123"
      },
      {
        "usuario": "JoseLuis",
        "contraseña": "joseluis123"
      },
      {
        "usuario": "Ivan",
        "contraseña": "ivan123"
      }  
    ]`;

    console.log(typeof usuarios)
    const jsonData = JSON.parse(usuarios)
    console.log(jsonData)
    const usuariosJ = JSON.stringify(jsonData);
    console.log(usuariosJ)
    const fs =require('fs')
    const usuarioNuevo = {
      usuario: 'Vale',
      contraseña: 'vale2'
    }
    console.log(usuarioNuevo+" este es el usuario nuevo")
    
    jsonData.push(usuarioNuevo)
    console.log(jsonData)
    const usuerNew = JSON.stringify(jsonData)

  
  
  fs.writeFile('usuarios.json', usuerNew, (error)=>{
    if(error) throw error;
    console.log('informacion recibida')
  })
  }

  signUp()