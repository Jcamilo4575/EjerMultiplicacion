const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express()

const port = process.env.port || 3000;
 
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',function(req, res)  {
  res.send("<h1 style='color: green'> Hola mundo</h1>");
})


app.post('/tabla', (req, res) => {
  const n = req.body.numero;
  let TXT = 'Resultado \n\n';
  let Respuesta = '<h1>Resultado</h1><br/>';
  for(let i = 0; i<=10; i++){
      TXT += `${n} x ${i} = ${n*i} \n`;
      Respuesta += `<p>${n} x ${i} = ${n*i}</p>`;
  }
  fs.writeFile('./public/resultado.txt', TXT, (err) => {
      if(err){
          console.log("Ocurrió un error: ", err);
      }
      else{
          console.log("Archivo creado");
      }
  });

  res.send(`
  <!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="../css3/formulario.css">
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@200&display=swap" rel="stylesheet">
      <title>Formulario</title>
  </head>
  <body>
  ${Respuesta}
  </body>
</html>
  `)
})
app.listen(port, ()=> {
    console.log(`Servidor listening on ${port}`);
})