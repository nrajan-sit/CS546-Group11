const express = require("express");
const router = express.Router();
const movieTheatreData = require("../data/movietheatres");
const User = require("../data/users");

const path = require("path");
const app = express();
app.use("/public", express.static(__dirname + "/public"));


router.get("/signUp", async (req, res) => {
  console.log("inside user.js / ")
  //const movieTheatreList = await movieTheatreData.getMovieTheatreList();
  const userList = ""
  res.render("user/signUp", {userList: userList});
});


router.post("/signUp", async (req,res)=>{
    try{
      console.log(req.body.psw);
  const userData =   await User.createUser(req.body.firstName, req.body.lastName, req.body.userName, req.body.email,req.body.psw );
   res.render("user/user");

}catch(e){

  console.log(e);
  res.status(500).json({ title: "Home page: Signup",
          status: false,
          message: "Error Occured"+ e})
}
})



router.get("/", async (req, res) => {
  console.log("inside user.js / ")
  //const movieTheatreList = await movieTheatreData.getMovieTheatreList();
  const userList = ""
  res.render("user/user", {userList: userList});
});


router.post("/signin", async (req, res,next) => {
    let usersname = req.body.uname;
    let pass = req.body.psw
    let unameresult, passresult
    console.log("here");
    try{
    if (!usersname || !pass) {
        var status="(Non-Authenticated User)";
    console.log("["+ new Date().toUTCString()+"]"+":"+ req.method,req.originalUrl,status)
  res.render("user/user",
  {

        title: "Home page: Login",
        status: false,
        message: "No Username or password provided"

    })}

    else {
      //  unameresult = User.usernameValidator(usersname);
        unameresult = await User.getUser(usersname);
        //passresult = User.passwordValidator(usersname, pass)

        if (unameresult && unameresult.Password_Hashed === pass) {
          console.log(unameresult, req.session);
            let { _id, username, firstName, lastName} = unameresult
            res.cookie('name', 'AuthCookie')
            let user = {
                _id,
                username,
                firstName,
                lastName,
            }
            req.session.user = user
            var status="(Authenticated User)";
            console.log("["+ new Date().toUTCString()+"]"+":"+ req.method,req.originalUrl,status)
            return res.redirect("/");
        }
        else {
            var status="(Non-Authenticated User)";
            console.log("["+ new Date().toUTCString()+"]"+":"+ req.method,req.originalUrl,status)
            res.render("user/user",
                {
                    title: "Home page: Login",
                    status: false,
                    message: "The provided username and password is invalid !!"

                }
            )
        }


    }

}
catch(e){console.log(e);}
});

module.exports = router;