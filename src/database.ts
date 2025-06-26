import  pg from "pg";
import  dotenv from "dotenv";

dotenv.config();

const {Pool} = pg
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necessário para o Render
  },
});

export default db