const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

const initMongoose = require('./initMongoose');
const Product = require('./models/Product');

app.use(cors());
app.use(express.json());


/* Get */
app.get('/products', async (req, res) => {
	try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(404).json({err : "Failed to get products"});
    }
})

app.get('/products/:id', async (req, res) => {
	try {
        const products = await Product.findById(req.params.id);
        if (!products)
            return res.status(404).json({err : "Product " + req.params.id + " not found"});
            res.status(200).json(products);
    } catch (err) {        
        res.status(404).json({err : "Failed to get products/" + req.params.id});
    }
})

/* Post */
app.post('/products', async (req, res) => {
	try {
        const products = new Product(req.body);
        await products.save();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({err : "Failed to post products"});
    }
})

/* Put */
app.put('/products/:id', async (req, res) => {
	try {
        let products = await Product.findById(req.params.id);
        if (!products)
            return res.status(404).json({err : "Product " + req.params.id + " not found"});
        products = req.body;
        await products.save();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({err: 'Failed to update product/' + req.params.id});
    }
})

/* Delete */
app.delete('/products/:id', async (req, res) => {
	try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product)
            return res.status(404).json({err : "Product " + req.params.id + " not found"});
        res.status(200).json({msg: 'Product delete'});
    } catch (error) {
        res.status(400).json({err: 'Failed to delete product/' + req.params.id});
    }
})


const main =  async () => {
    await initMongoose()
    app.listen(port, (err) => {
        if (err) console.log("Error in server setup")
        console.log("Server listening on Port", port);
    })
}

main()
