const express=require('express');
const fs=require('fs');
const bodyParser=require('body-parser');
const app=express();
// const loginRoute=require('./routes/login');
// const messageRoute=require('./routes/message');

app.use(bodyParser.urlencoded({extended:false}));
// app.use(loginRoute);
// app.use(messageRoute);
// app.use((req,res,next)=>{
//     res.status(404).send('<h1>Page Not Found</h1>');
// })
app.get('/',(req,res,next)=>{
    fs.readFile('username.txt',(err,data)=>{
        if(err){
            console.log(err);
            data='No chat exists';
        }
        res.send(`${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value=localStorage.getItem('username')">
            <input type="text" name="message" id="message">
            <input type="hidden" name="username" id="username">
            <br />
            <button type="submit">Send</button>
            </form>`
    );
    })
    
});
app.post('/',(req,res)=>{
    console.log(req.body.username);
    console.log(req.body.message);
    fs.writeFile("username.txt",`${req.body.username}:${req.body.message}`,{flag:'a'}, (err)=>
        err?console.log(err):res.redirect('/')
    )
})

app.get('/login',(req,res,next)=>{
    res.send(`<form onSubmit="localStorage.setItem('username',document.getElementById('username').value)" action="/login" method="POST"><input id="username" type="text" name="username"><button type="submit">Add</button></form>`);
});
    
app.post('/login',(req,res,next)=>{
    // console.log(req.body)
    // console.log(req.body.title);
    res.redirect('/');
})
app.listen(3000);

    

