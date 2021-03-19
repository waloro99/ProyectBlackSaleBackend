//const { pseudoRandomBytes } = require("node:crypto");

// JSON data
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

let producto = {
    name: '',
    category: ''
};

// Router
const router = app => {

    //create
    app.post('/api/v1/products', (req, res) => {
        if(!req.body.name) {
            respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Todos los campos son requeridos'
            };
        } else {
                producto = {
                name: req.body.name,
                category: req.body.category
                };
                respuesta = {
                error: false,
                codigo: 201,
                mensaje: 'Producto creado',
                respuesta: producto
                };
        }
    res.send(respuesta);
    })  

    //read
    app.get('/api/v1/products', (req, res) => {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: ''
            };
            if(producto === '') {
            respuesta = {
                error: true,
                codigo: 501,
                mensaje: 'El producto no ha sido creado'
            };
            } else {
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'respuesta del producto',
                respuesta: producto
            };
            }
            res.send(respuesta);
    })

    //update
    app.put('/api/v1/products', (req, res) => {
        if(!req.body.name) {
            respuesta = {
            error: true,
            codigo: 502,
            mensaje: 'Todos los campos son requeridos'
        };
        } else {
            if(producto.name === '') {
                respuesta = {
                error: true,
                codigo: 404,
                mensaje: 'El producto no ha sido creado'
                };
            } else {
                producto = {
                name: req.body.name,
                category: req.body.category
                };
                respuesta = {
                error: false,
                codigo: 204,
                mensaje: 'Producto actualizado',
                respuesta: producto
                };
            }
        }
    res.send(respuesta);
    })

    //delete
    app.delete('/api/v1/products', (req, res) => {
        if(products.name === '') {
            respuesta = {
            error: true,
            codigo: 404,
            mensaje: 'El producto no ha sido creado'
            };
        } else {
            respuesta = {
            error: false,
            codigo: 204,
            mensaje: 'Producto eliminado'
            };
            producto = {
            name: '',
            category: ''
            };
        }
    res.send(respuesta);
    })

app.use(function(req, res, next) {
    respuesta = {
    error: true, 
    codigo: 404, 
    mensaje: 'URL no encontrada'
    };
    res.status(404).send(respuesta);
});


}
// Export the router
module.exports = router;