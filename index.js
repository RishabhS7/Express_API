const express = require('express');
const app = express();
app.use(express.json());

                           //couses = basket  course fruit
const basket=[
    {id:1,name:'Banana',number:10},
    {id:2,name:'Apple',number:5},
    {id:3,name:'Mango',number:7}
]

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/api/fruits',(req,res)=>{
    res.send(basket);
});

app.post('/api/fruits',(req,res)=>{
    if((req.body.name.length)<3){
        res.status(404).send('enter valid name');
        return;
    }
    const fruit = {
        id:basket.length  + 1,
        name:req.body.name,
        number:req.body.number
    }
    basket.push(fruit);
    res.send(fruit);
});


app.get('/api/fruits/:id',(req,res)=>{
  let fruit= basket.find(c=>c.id===parseInt(req.params.id))
  if(!fruit){res.status(404).send('the cousre of id not found')
return;
}
res.send(fruit)

})


app.put('/api/fruits/:id',(req,res)=>{
    const fruit = basket.find(c=>c.id===parseInt(req.params.id));
    if(!fruit) {res.status(404).send('the cousre of id not found');
    return;
    }
    fruit.name = req.body.name?req.body.name:fruit.name;
    fruit.number=req.body.number?req.body.number:fruit.number;
    res.send(fruit);
})

app.delete('/api/fruits/:id',(req,res)=>{
    const fruit = basket.find(c=>c.id===parseInt(req.params.id));
    if(!fruit) res.status(404).send('the cousre of id not found');

    const index = basket.indexOf(fruit);
    basket.splice(index,1);
    res.send(fruit);
});

const port=process.env.PORT||3000
app.listen(port,()=> console.log('listenting to port 3000'));