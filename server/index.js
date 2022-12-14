const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const FoodModel = require('./models/food');

app.use(express.json());
app.use(cors());



mongoose.connect('mongodb+srv://testi:testi123@crud.kakbr56.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    });

    app.post('/insert', async (req, res) => {
        const foodName= req.body.foodName;
        const daysSinceIAte= req.body.daysSinceIAte;
        const food = new FoodModel({foodName: foodName, daysSinceIAte: daysSinceIAte});
        
        try {
            await food.save();
            res.send("food saved to database");
        } catch(err) {
            console.log(err);
        }
    });

    app.get('/read', async (req, res) => {
       FoodModel.find({}, (err, result) => {
              if (err) {
                res.send(err);
              }
                res.send(result);
            });
    });

    app.put('/update', async (req, res) => {
        const newFoodName= req.body.newFoodName;
        const id= req.body.id;
        
        try {
          await FoodModel.findById(id, (err, updatedFood) => {
                updatedFood.foodName = newFoodName;
                updatedFood.save();
                res.send("updated");
             });
             
        } catch(err) {
            console.log(err);
        }
    });

    app.delete('/delete/:id', async (req, res) => {
        const id= req.params.id;
        await FoodModel.findByIdAndRemove(id).exec();
        res.send("deleted");
        
    });

app.listen(3001, () => {
    console.log('Server started on port 3001...');
    });