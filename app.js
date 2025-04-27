const mysql=require('mysql');
const express=require('express');
const path=require('path');

const app=express();
app.use(express.json());

//MYSQL CONNECTION
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Arya@001',
    database:'myCollege'

});

db.connect((err)=>{
    if(err) throw err;
    console.log('MySQL Connected...');
});

//serve HTML Form  
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.use(express.urlencoded({extended:true}));
//INSERT DATA INTO MYSQL
app.post('/student',(req,res)=>{
    const {id,name}=req.body;
    const sql='INSERT INTO student (id,name) VALUES (?,?)';
    db.query(sql, [id,name],(err,result)=>{
        if (err)
            console.error('Error inserting data:', err);
        console.log('Data inserted:',id);
        res.send('Data inserted successfully!');
    });
});

//start server 
app.listen(3000,()=>{
    console.log('API running at http://localhost:3000');
});