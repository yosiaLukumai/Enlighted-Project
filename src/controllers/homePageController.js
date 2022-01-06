
const User = require("../Models/User");
const encrypted = require("../passwords/encrypt");
const passport = require("passport")


const register= (req, res)=>
{
    return res.render("register",
    {
        errors: req.flash("errors")
    })
}

const login = (req, res)=>
{
    const full = req.flash("data")
    return res.render("login",{
        full:full,
        errors: req.flash("errors")
    })
}
const homepage = (req, res)=>{
    return res.render("homepage")
};

const createUser = (req, res)=>
{
    //let errorsArray = [];
    // validating the data obtained in The Server Side
    // var validationResult = validationResult(req);
    // if(!validationResult.isEmpty())
    // {
    //     let errors = Object.values(validationResult.mapped());
    //     errors.forEach((item)=>
    //     {
    //         errorsArray.push(item.msg)
    //     });
        //req.flash("errors", errorsArray);
        // }
        console.log(req.body)
        // let me create my custom js validation
        const {username, passwordone, passwordtwo} = req.body
        let arrayErrors = [];
        if(!username || !passwordone || !passwordtwo)
        {
            arrayErrors.push({err: "Please fill all parts"})
        }
        if(passwordtwo != passwordone)
        {
            arrayErrors.push({err: "Passwords don't match"})
        }

        if(arrayErrors.length > 0)
        {
           return res.render('register', {
                arrayErrors,
                passwordtwo,
                passwordone,
                username
            })
        }
        else
        {
            // no validation errors obtained
            // we have to find  a way to check if one with email already exists
            User.findOne({where: {username:username}})
            .then(user => 
                {
                    console.log(user)
                  // the user exist we haveto push the error
                  if(user){
                    arrayErrors.push({err: "Email already exists"})
                    return res.render('register',{
                        arrayErrors,
                        email: email,
                        passwordone: passwordone,
                        passwordtwo: passwordtwo
                    })
                  }
                  else
                  {
                    // we don't have somebody let send dummy data
                    // let hash passwords
                    const hashedpassword = encrypted(passwordone)
                    const user = 
                    {
                        username: username,
                        password: hashedpassword,
  
                    }
                    model.create(user)
                    .then(created => 
                    {
                        req.flash("data", created)
                        return res.redirect('/login')
                    })
                    .catch(err =>
                        {
                           console.log(err.message);
                           return res.render('404')  
                        })
                  }
                  
                   
                })
           //return res.render('login')
        }
        
    

}

// let post a user data who want to log in



const dash = (req, res) =>
{
    return res.render('dashboard')
}


module.exports =
{
    register: register,
    login : login,
    homepage: homepage,
    createUser: createUser,
    dash: dash
}



