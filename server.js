var express = require('express');
var bodyParser = require('body-parser');

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.delete = function(idSelected) {
    console.log(idSelected);
    for(var i = 0; i < storage.items.length; i++) {
        if (storage.items[i].id == idSelected) {
            console.log(storage.items[i]);
            var itemToDelete = storage.items.indexOf(storage.items[i]);
            storage.items.splice(itemToDelete, 1);
            console.log('deleted item');
        }
    }
}

Storage.prototype.update = function(name, idSelected) {
    for (var i = 0; i < storage.items.length; i++) {
        if (storage.items[i].id == idSelected) {
            storage.items[i].name = name;
            console.log('name updated: ' + storage.items[i].name);
        }
    }
}

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');



var app = express();
var jsonParser = bodyParser.json();
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items);
});

app.post('/items', jsonParser, function(request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    console.log("thing added");
    response.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(request, response) {
    var idSelected = request.params.id;
     storage.delete(idSelected);
    
    //refreshes shopping list with current list (storage.items)
    response.status(200).json(storage.items);
    
});

app.put('/items/:id', jsonParser, function(request, response) {
    //selects id that will be edited
    var idSelected = request.params.id;
    //selects the json name value that is in the payload (data->app.put->route->jsonParser->payload)
    var nameEdit = request.body.name;
    storage.update(nameEdit, idSelected);
 
    response.status(200).json(true);
    
});



app.listen(process.env.PORT, process.env.IP);