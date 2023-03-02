const express = require('express')
const app = express()
const session = require('express-session')
app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 60000 }, saveUninitialized: false, resave: false }))
const {insertObject,checkUserRole,checkUserLogin,USER_TABLE_NAME} = require('./databaseHandler')



app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.render('home')
})

const adminController = require('./controllers/admin')
app.use('/admin', adminController)
const testerController = require('./controllers/tester')
app.use('/tester', testerController)


app.post("/login", async(req, res) => {
    const userName = req.body.txtName;
    const pass = req.body.txtPassword;
    const user = await checkUserLogin(userName)
    if (user == -1) {
    res.render("login", { errorMsg: "Not found UserName!!" })
    
    } else {
        console.log(userName)
        const role = await checkUserRole(userName,pass)
        console.log(role)
        if (pass == user.password) {
            const role = await checkUserRole(userName,pass)
            if (role == -1) {
                res.render("login", { errorMsg: "Login failed!" })
            } else {
                console.log(req.body.Role)
                if (req.body.Role == role) {
                    req.session.user = {
                        userName: userName,
                        role: role
                    }
                    console.log("Login with: ")
                    console.log(req.session.user)
                    if (role == "Tester") {
                        res.redirect('/tester/home')
                    } else {
                        res.redirect("/admin/home")
                    }
                } else {
                    res.render("login", { errorMsg: "Not auth!!" })
                }
            }  
        } else {
            res.render("login", { errorMsg: "Incorrect password!!" })
            console.log(user.password)
            console.log(pass)
        }
    }
})


app.post('/register',(req,res)=>{
    const name = req.body.txtName
    const role = req.body.Role
    const pass= req.body.txtPassword

    const objectToInsert = {
        userName: name,
        role:role,
        password: pass
    }
    insertObject(USER_TABLE_NAME,objectToInsert)
    res.render('home')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.get('/register',(req,res)=>{
    res.render('register')
})


const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running! " + PORT)