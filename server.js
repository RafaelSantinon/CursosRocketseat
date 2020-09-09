const express = require("express")
const nunjucks = require("nunjucks")
const pages = require("./data")

const server = express()

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    noCache: true
})

server.use(express.static("public"))
server.use(express.static("assets"))

server.get("/", function(req, res){

    const about = {
        name: "Rocketseat",
        image: "/logo.jpg",
        description: "Focada no avanço profissional de desenvolvedores",
        technologies: [
            {name: "HTML"},
            {name: "CSS"},
            {name: "JavaScript"},
            {name: "Node.JS"},
            {name: "React"}
        ]
    }
    return res.render("about", {about})
})

server.get("/courses", function(req, res){
    return res.render("courses", {pages})
})

server.get("/course/:id", function(req, res){
    const id = req.params.id;

    const course = pages.find(function(course){
        return course.id == id
    })

    if(!course){
        return res.render("not-found")
    }

    return res.render("course", {page: course})
})

server.use(function(req, res) {
    res.status(404).render("not-found")
})

server.listen(5000, function(){
})