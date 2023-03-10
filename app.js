const express = require('express')
const app = express()
const session = require('express-session')
app.use(session({ secret: '124447yd@@$%%#', cookie: { maxAge: 60000 }, saveUninitialized: false, resave: false }))
const {getAllDocumentFromCollection,checkUserRole,checkUserLogin,ROLE_TABLE_NAME} = require('./databaseHandler')



app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.render('home')
})

const adminController = require('./controllers/admin')
app.use('/admin', adminController)
const testerController = require('./controllers/tester')
app.use('/tester', testerController)
const staffController = require('./controllers/staff')
app.use('/staff', staffController)
const qamanagerController = require('./controllers/qamanager')
app.use('/qamanagemer', qamanagerController)
const qacoordinatorController = require('./controllers/qacoordinator')
app.use('/qacoordinator', qacoordinatorController)


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


app.get('/login', async(req,res)=>{
    const results = await getAllDocumentFromCollection(ROLE_TABLE_NAME)
    console.log(results)
    res.render('login',{"roles":results})
})
function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

app.get("/logout", (req, res) => {
    req.session.user = null
    res.redirect("/")
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server is running! " + PORT)