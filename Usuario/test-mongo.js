import mongoose from 'mongoose';
import { config } from 'dotenv';
config();

const testMongo = async () => {
    try {
        await mongoose.connect(process.env.URI_MONGODB);
        const db = mongoose.connection.db;
        
        const usuarios = await db.collection('usuarios').find().toArray();
        console.log("Usuarios en MongoDB:");
        console.log(usuarios);
        
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
testMongo();
