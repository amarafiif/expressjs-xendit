const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

// Add user
app.post('/user', async (req, res) => {
	try {
		const { username, email } = req.body;

		if (!username || !email) {
			return res.status(400).json({ error: 'Username and email are required' });
		}

		const addUser = await prisma.user.create({ data: { username, email } });
		res.status(200).json(addUser);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create user' });
	}
});

// Get user by ID
app.get('/user/:id', async (req, res) => {
	try {
		const userId = parseInt(req.params.id);
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to retrieve user' });
	}
});

// Update user by ID
app.put('/user/:id', async (req, res) => {
	try {
		const userId = parseInt(req.params.id);
		const { username, email } = req.body;

		if (!username && !email) {
			return res.status(400).json({ error: 'At least one property (username or email) is required' });
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				username,
				email,
			},
		});

		res.json({ message: 'User updated successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to update user' });
	}
});

// Delete user by ID
app.delete('/user/:id', async (req, res) => {
	try {
		const userId = parseInt(req.params.id);
		await prisma.user.delete({
			where: {
				id: userId,
			},
		});

		res.json({ message: 'User deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to delete user' });
	}
});

// Create product
app.post('/product', async (req, res) => {
	try {
		const { name, description, price } = req.body;

		if (!name || !description || !price) {
			return res.status(400).json({ error: 'Name, description, and price are required' });
		}

		const newProduct = await prisma.product.create({
			data: {
				name,
				description,
				price,
			},
		});

		res.status(200).json(newProduct);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create product' });
	}
});

// Get product by ID
app.get('/product/:id', async (req, res) => {
	try {
		const productId = parseInt(req.params.id);
		const product = await prisma.product.findUnique({
			where: {
				id: productId,
			},
		});

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		res.json(product);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to retrieve product' });
	}
});

// Update product by ID
app.put('/product/:id', async (req, res) => {
	try {
		const productId = parseInt(req.params.id);
		const { name, description, price } = req.body;

		if (!name && !description && !price) {
			return res.status(400).json({ error: 'At least one property (name, description, or price) is required' });
		}

		const updatedProduct = await prisma.product.update({
			where: {
				id: productId,
			},
			data: {
				name,
				description,
				price,
			},
		});

		res.json({ message: 'Product updated successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to update product' });
	}
});

// Delete product by ID
app.delete('/product/:id', async (req, res) => {
	try {
		const productId = parseInt(req.params.id);
		await prisma.product.delete({
			where: {
				id: productId,
			},
		});

		res.json({ message: 'Product deleted successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to delete product' });
	}
});
