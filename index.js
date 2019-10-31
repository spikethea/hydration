const express = require('express');
const Datastore = require('nedb');


const webapp = express();
const port = process.env.PORT || 3000;

webapp.listen(port, () => {
    console.log(`Starting server at ${port}`);
});
webapp.use(express.static('public'));
webapp.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

webapp.post('/api',(request, response) =>{
    const data = request.body;// the body of the request is the data of the '/api' fetch POST request, minus the meta information about the rquest details itself
    database.insert(data);
    response.json(data);
});

webapp.get('/api',(request,response)=>{
    database.find({}, function (err, data){
        if(err) {
            console.log(err)
            response.end();
            
            return;
        }
        response.json(data);
    });
}); 