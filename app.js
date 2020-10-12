const express = require("express")
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());


const user = {
    id: 1,
    email: "varikkottilusama@gmail.com",
    username: "usamav"

}
app.get("/api", (req, res) => {
    res.send("Welcome to the api");
});

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token,"secretkey", (err, authData) => {
        if(err) {
            res.send(err);
        } else {
            res.json({

                message: "Post created succcesfully...",
                authData
            })
        }
    })
 
})

app.post("/api/login", (req, res) => {
    jwt.sign({ user }, "secretkey",{expiresIn: "30s"}, (err, token) => {
        res.json({
            token
        })
    });
})

function verifyToken(req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if the bearer is undefined
    if (typeof bearerHeader !== "undefined") {

        //split at the space
        const bearer = bearerHeader.split(" ");
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        //next middleware
        next();

    } else {
        //forbidden
        res.status(403).send("Forbidden!!!!");
    }
}


app.listen(5000, () => console.log("server is listening on port 5000"));