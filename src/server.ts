import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const PORT = process.env.PORT || config.port

async function main() {
	try {
		await mongoose.connect(config.database_url as string);

		app.listen(PORT, () => {
			console.log(`Assignment 2 server is listening on port ${PORT}`);
		});
	} catch (err) {
		console.log(err);
	}
}

main();
