const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let listItems = [];

let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
    let day = date.getDay();
    res.render("list", {
        listTitle: day,
        newListItems: listItems
    });
});

app.get("/work", (req, res) => {
    res.render("list", {
        listTitle: "work",
        newListItems: workItems
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});
app.post("/", (req, res) => {

    let item = req.body.listItem;

    if (req.body.list === "work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        listItems.push(item);
        res.redirect("/");
    }

});

app.post("/work", (req, res) => {


    let newItem = req.body.newItem;
    workItems.push(newItem);

    res.redirect("/work");
});

app.listen(3000, () => {
    console.log("app is up and running");
});