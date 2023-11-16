const express=require('express');
const bodyParser= require('body-parser');
const https=require('https');
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
})

app.post("/",function(req,res){
    const first_name=req.body.fname;
    const last_name=req.body.lname;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address:email,
                email_type:'string',
                status:"subscribed",
                merge_fields:{
                    FNAME:first_name,
                    LNAME:last_name
                }
            }
        ]
    }

    const jsonData=JSON.stringify(data);

    const url="https://us21.api.mailchimp.com/3.0/lists/81eaa9f507/members";
    const options={
        method:"POST",
        auth:"kgs:5888d24b3bf7ec8a1e0b5f3e4709e660-us21"
    }
   const request= https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
request.end();
})


app.listen(3000,function(){
    console.log("Server running in port 3000");
})
