// Create PostgreSQL Connection Pool here !
import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

const connectionPool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default connectionPool;