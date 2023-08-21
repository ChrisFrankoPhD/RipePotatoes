import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    password: "oishi69fohpo",
    port: 5432,
    database: "ripepotatoes"
});

const query = (text: string, params?: any[]) => {
    return pool.query(text, params);
};

export default query;