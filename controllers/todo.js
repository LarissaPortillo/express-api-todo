const express = require('express');
const router = express.Router();
const Todos = require('../models/todo');
const Data =require('../utilities/data')
//seed
router.get('/seed', async (req, res) => {
    await Todos.deleteMany({});
    await Todos.create(Data);
    res.send('done!');
  });

 
//INDUCES
//index
router.get('/', (req, res)=>{
    Todos.find({}, (err, foundTodos)=>{
        res.json(foundTodos);
    });
});

//new-will be handled by react application

//delete
router.delete('/:id', (req, res)=>{
    Todos.findByIdAndRemove(req.params.id, (err, deletedTodo)=>{
        res.json(deletedTodo);
    });
});

//update
router.put('/:id', (req, res)=>{
    Todos.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTodo)=>{
        res.json(updatedTodo);
    });
});

//create
//...farther down the page
router.post('/', (req, res)=>{
    Todos.create(req.body, (err, createdTodo)=>{
        res.json(createdTodo); //.json() will send proper headers in response so client knows it's json coming back
    });
});

//Edit - Will be handled by React application
//show
// router.get('/:id'),(req,res)=>{
//     Todos.findById(req.params.id,(err,foundTodo)=>{
//         res.json(foundTodo);
//     });
// }
// Show
router.get('/:id', (req, res)=>{
    Todos.findById(req.params.id, (err, foundTodo)=>{
        res.json(foundTodo);
    });
});

module.exports = router;