const express = require('express')
const router = express.Router();

const pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true // capitalize all generated SQL
});

const database_url = 'postgres://postgres:postgres@localhost:5432/codigos_postales';
const db = pgp(database_url);

router.get('/ping', function (req, res){
  res.status(200).send('pong');
});

router.post('/getInfoCP', function(req, res){
    const d_codigo = req.body.d_codigo;
    const d_estado = req.body.d_estado;
    const d_mnpio = req.body.d_mnpio;
    const d_asenta = req.body.d_asenta;

    db.any('SELECT * FROM cp WHERE d_codigo=$1 AND d_estado=$2 AND D_mnpio=$3 AND d_asenta=$4', [d_codigo, d_estado, d_mnpio, d_asenta])   
    .then(data => {
      res.status(200);
      res.json(data);
      console.log("BUENA", data);
    })
    .catch(error => {
      res.status(400);
      res.send(error);
      console.log("MALA");
    });
});

router.get('/getEstados', function(req, res){

  db.any('SELECT d_estado FROM cp GROUP BY d_estado ORDER BY d_estado ASC;')   
  .then(data => {
    res.status(200);
    let arr = [];

    data.forEach(elem => {
      arr.push(elem.d_estado);
    });
    res.json({
      estados: arr
    });
    console.log("BUENA");
  })
  .catch(error => {
    res.status(400);
    res.send(error);
    console.log("MALA");
  });
});

router.get('/getMunicipios', function(req, res) {
  const d_estado = req.query.d_estado;

  db.any('SELECT d_mnpio FROM cp WHERE d_estado=$1 GROUP BY d_mnpio ORDER BY d_mnpio ASC;', d_estado)   
  .then(data => {
    res.status(200);
    let arr = [];

    data.forEach(elem => {
      arr.push(elem.d_mnpio);
    });
    res.json({
      municipios: arr
    });
    console.log("BUENA");
  })
  .catch(error => {
    res.status(400);
    res.send(error);
    console.log("MALA");
  });
});

router.get('/getColonias', function(req, res) {
  const d_estado = req.query.d_estado;
  const d_mnpio = req.query.d_mnpio;

  db.any('SELECT d_asenta FROM cp WHERE d_estado=$1 AND d_mnpio=$2 GROUP BY d_asenta ORDER BY d_asenta ASC;', [d_estado, d_mnpio])   
  .then(data => {
    res.status(200);
    let arr = [];

    data.forEach(elem => {
      arr.push(elem.d_asenta);
    });
    res.json({
      colonias: arr
    });
    console.log("BUENA");
  })
  .catch(error => {
    res.status(400);
    res.send(error);
    console.log("MALA");
  });
});

module.exports = router;