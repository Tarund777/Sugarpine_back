
import express from 'express'
import cors from 'cors'
import axios from 'axios'
const app = express()
import bodyParser from 'body-parser'
import fs from 'fs'
import locations from '../backend/mongodb.js'
import logins from '../backend/mongodb.js'
import blogs from '../backend/mongodb.js'
import { get } from 'http'

// // const json = require('../../latest/suggestion.json');
// import json from '../../latest/suggestion.json' assert {type:"json"}


const port = 3001
const sep = ',\n'

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!')

 

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const data = [];



app.post('/', async (req, res) => {
 


  const data1 = {
     username : req.body.name,
     place: req.body.place,
     placedesc: req.body.description
  }
try{
  if(data1.username!="" && data1.place !="" && data1.placedesc !=""){
  await locations.locations.insertMany(data1)  

  const jsondata = await locations.locations.find();
  
    data.push(JSON.stringify(jsondata))

   fs.writeFileSync("suggestion.json",`${data.join(sep)}`, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("file written")
    }
  });}

 }
catch{console.log("try again")} })

  app.get('/login',(req,res)=>{
   res.send(req)
   
  })



let loginjsondata = []

  app.post('/login', async (req, res) => {
   const  logindata1 = {
      username : req.body.username,
      Email: req.body.Email,
      phone: req.body.phone
    }

    

  
    try{
  let  loginjsondata1 = await logins.logins.findOne(logindata1);
    if(logindata1.username == loginjsondata1.username){
      if(logindata1.Email == loginjsondata1.Email){
        const login = "success"
        console.log("already user")
        
        fs.writeFileSync('logindata.json',`[${JSON.stringify(logindata1)}]`, err => {
            if (err) {
              console.error(err);
            } else {
              console.log("file written")
            }
          });

      }
    }
    else{  await logins.logins.insertMany(logindata1)
      // fs.writeFileSync('logindata.json',`["${logindata1.username}"]`, err => {
      //   if (err) {
      //     console.error(err);
      //   } else {
      //     console.log("file written")
      //   }
      // })

    }
  }
  catch{
    await logins.logins.insertMany(logindata1)
    console.log(logindata1.Email)
    fs.writeFileSync('logindata.json',`[${JSON.stringify(logindata1)}]`, err => {
      if (err) {
        console.error(err);
      } else {
        console.log("file written")
      }
    })


  }

  const blogdataarr=[];

  try{
   const blogdata = await blogs.blogs.find();
  //  blogdataarr.push(JSON.stringify(blogdata))
   fs.writeFileSync('blogs.json',`${JSON.stringify(blogdata)}`,(err)=>{
    if(err){
      console.log(err)
  
    }
    else{
      console.log("Success")
    }
   })
  }  
  catch(err){
    console.log(err)
  }


  })

  app.post('/logout',(req,res)=>{
  console.log(req.body)
  fs.writeFileSync('logindata.json',`[]`,err=>{
    if(err){
      console.log(err)
    }
    else{
      console.log("loggedout")
    }
  })

  })
 



