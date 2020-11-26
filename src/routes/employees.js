const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

 
// GET all Employees
router.get('/Get_Dueno', (req, res) => {
  mysqlConnection.query('select * from Dueno', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

router.get('/Get_Especies',  (req, res) => { 
  mysqlConnection.query('CALL `Get_Especies`();', (err, rows, fields) => {
    
    if(!err) {
      var REgistros = rows;
      res.json(REgistros[0]);
    } else {
      console.log(err);
    }
  }); 
});

router.get('/Get_Razas/',  (req, res) => {
  const { in_EspecieID } = req.body;
  const query = `
  SET @in_EspecieID = ?; 
  CALL Get_Raza(@in_EspecieID ); `;
  mysqlConnection.query(query, [in_EspecieID], (err, rows, fields) => {
      if(!err) { 
        var REgistros = rows;
        console.log(REgistros[1] );
        res.json(REgistros[1]);
      } else {
        console.log(err);
        res.json('Error pues');
      }
  }); 

});

/*
router.get('/:IdDueno',(req,res) => {

  const { IdDueno } = req.params;
  console.log('El Id ingresado es: '+IdDueno);

} );*/

router.post('/CrearEditarMascota',(req,res)=>{

  const {in_RazaID , 
    in_Nombre , 
    in_Sexo , 
    in_FechaNacimiento , 
    in_Color , 
    in_Senas , 
    in_ObservacionesGenerales , 
    in_DuenoID} = req.body;
  console.log('Los datos a editar son: '+in_Nombre+" "+in_RazaID+" "+in_FechaNacimiento);
  const query = `
  SET @in_RazaID = ?;
  SET @in_Nombre = ?;
  SET @in_Sexo = ?;
  SET @in_FechaNacimiento = ?;
  SET @in_Color = ?;
  SET @in_Senas = ?;
  SET @in_ObservacionesGenerales = ?;
  SET @in_DuenoID = ?;
  CALL CrearEditarMascota(@in_RazaID, @in_Nombre, @in_Sexo,
    @in_FechaNacimiento,@in_Color, @in_Senas,
    @in_ObservacionesGenerales, @in_DuenoID); `;

    mysqlConnection.query(query, [in_RazaID,
      in_Nombre,
      in_Sexo,
      in_FechaNacimiento,
      in_Color,
      in_Senas,
      in_ObservacionesGenerales,
      in_DuenoID], (err, rows, fields) => {
        if(!err) {
            
          var elemen = rows[12][0]; 
          console.log(elemen['Resultado'] );
          res.json(elemen);
        } else {
          console.log(err);
          res.json('Error pues');
        }
    }); 
});

router.post('/',(req,res)=>{

  const {IdDueno,in_Nombre,in_Apellido,in_Calle,in_NumeroInt,in_NumeroExt,
    in_Colonia,in_TelefonoFijo,in_Celular,in_Correo,
    in_Estado,in_UsuarioID} = req.body;
  console.log('Los datos a editar son: '+in_Nombre+" "+IdDueno+" "+in_Apellido);
  const query = `
  SET @IdDueno = ?;
  SET @in_Nombre = ?;
  SET @in_Apellido = ?;
  SET @in_Calle = ?;
  SET @in_NumeroInt = ?;
  SET @in_NumeroExt = ?;
  SET @in_Colonia = ?; 
  SET @in_TelefonoFijo = ?;
  SET @in_Celular = ?;
  SET @in_Correo = ?;
  SET @in_Estado = ?;
  SET @in_UsuarioID = ?;
  CALL CrearEditarDueno(@IdDueno , @in_Nombre , @in_Apellido , @in_Calle , @in_NumeroInt , 
    @in_NumeroExt, @in_Colonia , @in_TelefonoFijo , @in_Celular , @in_Correo , 
    @in_Estado , @in_UsuarioID); `;

    mysqlConnection.query(query, [IdDueno,in_Nombre,in_Apellido,in_Calle,in_NumeroInt,in_NumeroExt,
      in_Colonia,in_TelefonoFijo,in_Celular,in_Correo,
      in_Estado,in_UsuarioID], (err, rows, fields) => {
        if(!err) {
            
          var elemen = rows[12][0]; 
          console.log(elemen['Resultado'] );
          res.json(elemen);
        } else {
          console.log(err);
          res.json('Error pues');
        }
    }); 
});



module.exports = router;
