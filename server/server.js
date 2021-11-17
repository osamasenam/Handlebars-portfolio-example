const PORT = 8080;
let homePage;
const express = require('express');
const path = require("path")
const hb = require("express-handlebars")
const projects = require("./projects.json")

let projectsArray = [];
projects.forEach(obj => {
    projectsArray.push(obj.directory);
} ); 
// console.log("projectsArray", projectsArray);


const app = express();
app.engine("handlebars", hb())
app.set("view engine", "handlebars")

app.use(express.static("public"))
app.use(express.static("projects"))

app.get("/", (req, res) => {
    res.render("home", {
        projects,
        layout: "main",
        headerMessage: "Welcome to My Hall of Fame",
        title: "My Projects"
    })
})

app.get("/description/:project", (req, res) => {
    const { project } = req.params;
    const selectedProject = projectsArray.find(item => item == project);
    if(!selectedProject) {
        console.log("project requested not found!");
        return res.sendStatus(404);
    } 

    const selectedProjectIndex = projectsArray.indexOf(selectedProject);
    let projectObj = projects[selectedProjectIndex];
    console.log("projectObj",projectObj);
    res.render("description", {
        projects,
        projectObj,
        layout: null,
        headerMessage: "Welcome to the description area",
        title: "My Projects"
    })
})

app.listen(8080, () => console.log('Server listening....'));
