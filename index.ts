// Test file to verify AI PR Reviewer behavior
import { Client } from 'pg'; 

// 🚨 Issue 1: Hardcoded sensitive credentials (Security Flaw)
const dbConfig = {
    user: 'admin',
    host: 'localhost',
    database: 'shikaku_game',
    password: 'SuperSecretPassword123!', // Should be using process.env
    port: 5432,
};

interface User {
    id: string;
    username: string;
    score: number;
}

// Dummy database client
const client = new Client(dbConfig);

export async function processUserData(userId: string): Promise<void> {
    // 🚨 Issue 2: SQL Injection Vulnerability (Security Flaw)
    // The AI should flag this raw string concatenation and suggest parameterized queries instead.
    const query = `SELECT * FROM users WHERE id = '${userId}'`;
    
    // 🚨 Issue 3: Unhandled Promise / Missing Try-Catch (Logic Bug)
    // If the connection or query fails, this will crash the process via an unhandled rejection.
    await client.connect();
    const result = await client.query(query);
    const users: User[] = result.rows;

    // 🚨 Issue 4: Out-of-Bounds risk / No Empty Array Check (Logic Bug)
    // If no user is found, users[0] is undefined. Accessing .score will instantly throw a runtime crash.
    const topUser = users[0];
    console.log(`Processing top user score: ${topUser.score}`); 

    // 🚨 Issue 5: Accidental O(n^2) Matrix Operation (Performance Bottleneck)
    // Nested loops iterating through the exact same collection unnecessarily.
    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if (users[i].id === users[j].id) {
                // 🚨 Issue 6: Leftover raw console.log (Banned Practice in Config)
                console.log("Found matching ID pair in matrix processing!");
            }
        }
    }
}