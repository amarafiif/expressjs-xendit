const express = require('express'),
	cors = require('cors'),
	port = process.env.PORT || 3000,
	app = express();

require('dotenv').config();

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
