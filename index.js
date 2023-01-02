const express=require('express');
const jwt =require('jsonwebtoken')
const app=express();
const secreatekey="secreatekey";

app.get('/',(req,res)=>{
    res.json(
        {
            "Msg":"Hello Good Afternoon"
        }
    )
})


app.post('/',(req,res)=>{
    const user={
        id:1,
        username:"Vandana",
        emailid:'Vandana@gmailcom'
    }
    jwt.sign({user},secreatekey,{expiresIn:'300s'},(err,token)=>{
        res.json({token})
    })
})


app.post('/profile', verifytoken, (req, resp) => {
    jwt.verify(req.token, secreatekey, (err, authdata) => {
        if (err) {
            resp.send({ result: "Invalid Token" });
        }
        else {
            resp.send({ result: "Accessed", authdata });
        }
    })
})

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token

function verifytoken(req, resp, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(" ");
        // Get token from array
        const token = bearer[1];
        // Set the token
        req.token = token;
        // Next middleware
        next();

    }
    else {
        // Forbidden
        resp.send({ result: "Token Is Invalid" });
    }
}
app.listen(5000)