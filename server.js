const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dbFilePath = path.join(__dirname, 'db.json');  

app.use(bodyParser.json());

// Habilitar CORS para todas las rutas
app.use(cors());

// Endpoint para obtener usuarios
app.get('/api/usuarios', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error al leer db.json:', err);
          return res.status(500).send('Error al leer la base de datos.');
      }
      const usuarios = JSON.parse(data);
      res.json(usuarios);
  });
});
// Nuevo Endpoint para registrar un nuevo usuario
app.post('/api/usuarios', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error al leer db.json:', err);
          return res.status(500).send('Error al leer la base de datos.');
      }

      const usuarios = JSON.parse(data).usuar;
      const nuevoUsuario = req.body;

      // Asignar un ID único al nuevo usuario
      nuevoUsuario.id = usuarios.length + 1;

      // Agregar el nuevo usuario a la lista
      usuarios.push(nuevoUsuario);

      // Guardar la lista actualizada en db.json
      fs.writeFile(dbFilePath, JSON.stringify({ usuar: usuarios }, null, 2), 'utf8', (err) => {
          if (err) {
              console.error('Error al escribir en db.json:', err);
              return res.status(500).send('Error al guardar el usuario.');
          }

          res.status(201).send('Usuario registrado con éxito');
      });
  });
});

function getHorarioForDay(day) {
  return (req, res) => {
      fs.readFile(dbFilePath, 'utf8', (err, data) => {
          if (err) {
              console.error('Error al leer db.json:', err);
              return res.status(500).send('Error al leer la base de datos.');
          }
          const horarios = JSON.parse(data);
          res.json({ [day]: horarios[day] });
      });
  };
}

app.get('/api/lunes', getHorarioForDay('Lunes'));
app.get('/api/martes', getHorarioForDay('Martes'));
app.get('/api/miercoles', getHorarioForDay('Miercoles'));
app.get('/api/jueves', getHorarioForDay('Jueves'));
app.get('/api/viernes', getHorarioForDay('Viernes'));
app.get('/api/sabado', getHorarioForDay('Sabado'));
app.get('/api/domingo', getHorarioForDay('Domingo'));

app.put('/api/horarios/:dia/:id', (req, res) => {
  const { dia, id } = req.params;
  const updatedHorario = req.body;

  fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error al leer db.json:', err);
          return res.status(500).send('Error al leer la base de datos.');
      }

      const horarios = JSON.parse(data);
      const dayHorarios = horarios[dia.charAt(0).toUpperCase() + dia.slice(1)];

      const horarioIndex = dayHorarios.findIndex(h => h.id === parseInt(id));
      if (horarioIndex === -1) {
          return res.status(404).send('Horario no encontrado.');
      }

      dayHorarios[horarioIndex] = updatedHorario;

      fs.writeFile(dbFilePath, JSON.stringify(horarios, null, 2), 'utf8', (err) => {
          if (err) {
              console.error('Error al escribir en db.json:', err);
              return res.status(500).send('Error al actualizar el horario.');
          }

          res.status(200).send('Horario actualizado correctamente.');
      });
  });
});

app.get('/api/horarios/:dia', (req, res) => {
  const { dia } = req.params;

  fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error al leer db.json:', err);
          return res.status(500).send('Error al leer la base de datos.');
      }

      const horarios = JSON.parse(data);
      const dayHorarios = horarios[dia.charAt(0).toUpperCase() + dia.slice(1)];

      if (!dayHorarios) {
          return res.status(404).send('No se encontraron horarios para el día especificado.');
      }

      res.json({ [dia]: dayHorarios });
  });
});

app.get('/api/planes', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error al leer db.json:', err);
          return res.status(500).send('Error al leer la base de datos.');
      }

      const planes = JSON.parse(data).planes;
      res.json({ planes });
  });
});
app.get('/api/clases', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error al leer db.json:', err);
          return res.status(500).send('Error al leer la base de datos.');
      }

      const clases = JSON.parse(data).clases;
      res.json({ clases });
  });
});

// Endpoint para registrar una nueva clase
app.post('/api/clases', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error al leer db.json:', err);
          return res.status(500).send('Error al leer la base de datos.');
      }

      const clases = JSON.parse(data).clases;
      const nuevaClase = req.body;

      // Asignar un ID único a la nueva clase
      nuevaClase.id = clases.length + 1;

      // Agregar la nueva clase a la lista
      clases.push(nuevaClase);

      // Guardar la lista actualizada en db.json
      fs.writeFile(dbFilePath, JSON.stringify({ clases }, null, 2), 'utf8', (err) => {
          if (err) {
              console.error('Error al escribir en db.json:', err);
              return res.status(500).send('Error al guardar la clase.');
          }

          res.status(201).send(nuevaClase);
      });
  });
});


// Endpoint para registrar un nuevo instructor
app.post('/api/instructores', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error al leer db.json:', err);
          return res.status(500).send('Error al leer la base de datos.');
      }

      const instructores = JSON.parse(data).instructores;
      const nuevoInstructor = req.body;

      // Asignar un ID único al nuevo instructor
      nuevoInstructor.id = instructores.length + 1;

      // Agregar el nuevo instructor a la lista
      instructores.push(nuevoInstructor);

      // Guardar la lista actualizada en db.json
      fs.writeFile(dbFilePath, JSON.stringify({ instructores }, null, 2), 'utf8', (err) => {
          if (err) {
              console.error('Error al escribir en db.json:', err);
              return res.status(500).send('Error al guardar el instructor.');
          }

          res.status(201).send(nuevoInstructor);
      });
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});