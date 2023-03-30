const express = require('express')

const app = express()
const port = 3000
app.use(express.json())

const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "example",
    database: "carros"
});

app.get('/carros',(req,res) =>{
    con.query("select * from Carros",
        function(err,result){
            if(err){
                throw err;
            }
            res.status(200).json(result);
        });
});

app.get('/carros/:id',(req,res) =>{
    con.query("select * from Carros where id = ?",[id],
        function(err,result){
            if(err){
                throw err;
            }
            if(!!result && result.lenght > 0){
                res.status(200).json(result);
            }else{
                res.status(404).json({});
            }
        });
});

app.get('/carros/:id',(req,res) =>{
    const marca = req.body.marca;
    const nombre = req.body.nombre;

    let sql = "select * from Carros (marca,nombre) VALUES (marca,nombre)"
    con.query(sql,[marca],(err, result)=>{
        if(err){
            throw err;
        }
        else{
            res.status(200).json({});
        }
    });
});


app.listen(port, ()=>{
    console.log('Example app listening on port ${port}')
})