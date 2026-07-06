import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'authbank_db',
    user: 'informatica6toc',
    password: 'admin',
});

export const getUserEmailById = async (userId) => {
    try {
        const res = await pool.query('SELECT email FROM "user" WHERE id = $1', [userId]);
        if (res.rows.length > 0) {
            return res.rows[0].email;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user email from PostgreSQL:', error);
        return null;
    }
};
