var express = require('express');
var http = require('http');
var app = express();
var bodyparser = require('body-parser');
var dal = require('./dal');
var util = require('util');

var Router = express.Router();
app.use('/',Router);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.get('/',function(req,res)
{
    res.end("Server started");
});

app.post('/movieData',function(req,res)
{
    console.log("Body Data : " + util.inspect(req.body));
    dal.insert(req.body.name,req.body.img,req.body.description,function(err,rows)
    {
        if(err == dal.dalResult.success)
        {
            res.end("Inserted Successfully");
        }
        else
        {
            res.end("Error In Insertion");
        }
    });
});

app.get('/movieData',function(req,res)
{
    dal.read("","all",function(err,rows)
    {
        if(err == dal.dalResult.success)
        {
            res.end(JSON.stringify(rows));
        }
        else
        {
            res.end("No record found");
        }
    });
});

app.get('/movieData/:id',function(req,res)
{
    dal.read(req.params.id,"",function(err,rows)
    {
        if(err == dal.dalResult.success)
        {
            res.end(JSON.stringify(rows));
        }
        else
        {
            res.end("No record found");
        }
    });
});

app.put('/movieData',function(req,res)
{
    dal.update(req.body.name,req.body.img,req.body.description,req.body.id,function(err,rows)
    {
        if(err == dal.dalResult.success)
        {
            res.end("Updation Successfully");
        }
        else
        {
            res.end("Error in Updation");
        }
    });
});

app.delete('/movieData',function(req,res)
{
    dal.delete(req.query.id,function(err,rows)
    {
        if(err == dal.dalResult.success)
        {
            res.end("Deletion Successfully");
        }
        else
        {
            res.end("Error in Deletion");
        }
    });
});

dal.createTable();
app.listen(8080,function()
{
    console.log("Server Started at 8080");
});
