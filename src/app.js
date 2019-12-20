const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname,'../public'));

const publicDirectoryPath = path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath));

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

// app.get('/', (request, response) => {
//     response.send('Hello World');
// });

// app.get('/api/courses', (request, response) => {
//     response.send(courses);
// });

// app.get('',(req,res)=>{
//     res.send('Hello Express');
// });
app.get('/about/:id',(req,res)=>{
    res.send(req.params.id);
});

app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.query);
});


// app.get('*',(req,res)=>{
//     res.send('404 page');
// });
// app.get('/help/*',(req,res)=>{
//     res.send('404 page');
// });

app.listen(port,()=>{
    console.log('Server is up and running on port 3000');
})


// send HTML code 
app.get('/html', (request, response) => {
    response.send('<h1>Hello World</h1>');
});