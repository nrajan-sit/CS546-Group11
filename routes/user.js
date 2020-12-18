const express = require("express");
const router = express.Router();
const movieTheatreData = require("../data/movietheatres");
const User = require("../data/users");

const bcrypt = require("bcryptjs");
const saltRounds = 16;

const path = require("path");
const app = express();
app.use("/public", express.static(__dirname + "/public"));


router.get("/signUp", async (req, res) => {
  // console.log("inside user.js / get /signUp")
  //const movieTheatreList = await movieTheatreData.getMovieTheatreList();
  const userList = ""
  res.render("user/signUp", {userList: userList});
});


router.post("/signUp", async (req,res)=>{
    // console.log("inside user.js / post /signUp");
    try{
      console.log(req.body.psw);
      const userData =   await User.createUser(req.body.firstName, req.body.lastName, req.body.userName, req.body.email,req.body.psw );
      res.render("user/user");

    }catch(e){
      // console.log(e);
      res.status(500).json({ title: "Home page: Signup",
              status: false,
              message: "Error Occured"+ e})
    }
})


router.get("/logout", async (req, res) => {
  // console.log("inside user.js / get /logout")
  //const movieTheatreList = await movieTheatreData.getMovieTheatreList();
  const userList = ""
  req.session.destroy();
  res.redirect("/");
});

router.get("/", async (req, res) => {
  // console.log("inside user.js / get /")
  //const movieTheatreList = await movieTheatreData.getMovieTheatreList();
  const userList = ""
  res.render("user/user", {userList: userList});
});


router.post("/", async (req, res,next) => {
    // console.log("inside user.js / get /signin");
    let usersname = req.body.uname;
    let pass = req.body.psw
    let unameresult, passresult
    // console.log("here");
    try{
      if (!usersname || !pass) {
        var status="(Non-Authenticated User)";

      // console.log("["+ new Date().toUTCString()+"]"+":"+ req.method,req.originalUrl,status,"well1")
      
      res.render("user/user",
      {
        title: "Home page: Login",
        status: false,
        message: "No Username or password provided"

      })}

      else {

        unameresult = await User.getUser(usersname);

        if(!unameresult)
          throw "Username doesn't exist"

        if (unameresult && await bcrypt.compare(pass, unameresult.Password_Hashed)) {
            // console.log(unameresult, req.session);

           let { _id,
              First_Name,
              Last_Name,
              User_Name,
              Email,
              Gender,
              DOB,
              Home_Address_1,
              Home_Address_2,
              Home_City,Home_State,
              Home_Zip
              ,Phone_Number
              ,Credit_Card_Number_Hashed
              ,Expiry_Month
              ,Expiry_Year
              ,Security_Code} = unameresult

            res.cookie('name', 'AuthCookie')

            let user = {
                _id, First_Name,
                Last_Name,
                User_Name,
                Email,
                Gender,
                DOB,
                Home_Address_1,
                Home_Address_2,
                Home_City,
                Home_State,
                Home_Zip
                ,Phone_Number
                ,Credit_Card_Number_Hashed
                ,Expiry_Month
                ,Expiry_Year
                ,Security_Code
                                  }

            req.session.user = user;
            var status="(Authenticated User)";
            // console.log("["+ new Date().toUTCString()+"]"+":"+ req.method,req.originalUrl,status)
            return res.redirect("/");
        }
        else {
            var status="(Non-Authenticated User)";
            // console.log("["+ new Date().toUTCString()+"]"+":"+ req.method,req.originalUrl,status,"well2")
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
catch(e){
  //console.log(e);
  res.render("user/user",
                {
                    title: "Home page: Login",
                    status: false,
                    message: "The provided username and password is invalid !!"

                });
}
});

module.exports = router;
