const express = require('express')
const mysql   = require('mysql')
const app     = express()
const port    = 3000

app.use(express.json())
var con = mysql.createConnection({
    host:"localhost",
    port:3307,
    user:"root",
    password:"example",
    database:"carros"


});
con.connect( function (err){
    if (err){ 
        throw err;
    }
        console.log("Se conecto")
})


app.listen(port, () =>{
    console.log('la app escucha el puerto '+port)
})


app.get("/carros",(req,res) => {
    con.query("select * from Carros",
    function (err,result){
        if(err) {
            throw err;
        }
        res.status(200).json(result)
    }
    )  }
)
app.get("/carros/:id",(req,res) => {
    let id = req.params.id ?? 0;
    con.query("select * from Carros where id= ?",[id],
    function (err,result){
        if(err) {
            throw err;
        }if(!!result && result.lenght > 0){
            res.status(200).json(result);
        }else{
            res.status(400).json({});
        }
    });
  });

app.post("/carros",(req,res) => {

    const marca = req.body.marca;
    const nombre= req.body.nombre;

    let sql = "insert into Carros (marca, nombre) Values (?, ?)"
    con.query(sql,[marca,nombre],(err,result)=>{
        if(err) {
            throw err;
        }else{
            res.status(200).json({});
        }
    }) 
 });

app.put("/carros/:id",(req,res) => {

    const id = req.params.id ?? 0;
    const marca =req.body.marca
    const nombre =req.body.nombre
    
    let sql = "update Carros set Marca = ?, nombre = ? where id = ?"
    con.query(sql,[marca,nombre,id],(err,result)=>{
        if(err) {
            throw err;
        }else{
            res.statu(200).json({});
        }
    })
});

app.delete("/carros/:id",(req,res) => {

    const {id} = req.params
    let insert = "delete from Carros  where id = ?"
    con.query(insert,[id],
    function (err,result){
        if(err) {throw err}
        res.status(200).json({"resultado":"borrado con exito"})
    }
    )  }
)


app.get('/', function (req, res) {
    res.send(""+req.body.id);
    // conslose.log(req)
  });