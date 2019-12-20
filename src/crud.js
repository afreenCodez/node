const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());
const courses = [
    {id:1,name:'course1'},
    {id:2,name:'course2'},
    {id:3,name:'course3'},
];

// get all the courses
app.get('/api/courses',(req,res)=>{
    res.send(courses)
});

// get the course by its id
app.get('/api/courses/:id',(req,res)=>{


    /* The HyperText Transfer Protocol (HTTP) 400 Bad Request response status code indicates that the server cannot
     or will not process the request due to something that is perceived to be a client error 
     (e.g., malformed request syntax, invalid request message framing, or deceptive request routing) */

    if(!req.body.name || req.body.name.length<3){
        res.status(400)
    }

    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id');
    res.send(course);
});

// Post request
app.post('/api/courses',(req,res)=>{

    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body,schema);

    /* The HyperText Transfer Protocol (HTTP) 400 Bad Request response status code indicates that the server cannot
     or will not process the request due to something that is perceived to be a client error 
     (e.g., malformed request syntax, invalid request message framing, or deceptive request routing) */


    if(result.error){
        res.status(400).send(result.error);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// Put Request
app.put('/api/courses/:id',(req,res)=>{

    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id');
    
    const schema = {
        name: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error);
        return;
    }

    // update course
    course.name = req.body.name;
    // return the updated course
    res.send(course);
});

app.delete('/api/courses/:id',(req,res)=>{
    // Look up the course
    const course = courses.find(c=>c.id===parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given id');


    // not existing, return 404

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
})

app.listen(3000,()=>{
    console.log('Server is up and running on port 3000');
});