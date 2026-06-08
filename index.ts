// Test file to verify AI PR Reviewer behavior
import { Client } from 'pg'; 


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
  
    const query = `SELECT * FROM users WHERE id = '${userId}'`;
    

    await client.connect();
    const result = await client.query(query);
    const users: User[] = result.rows;

  
    const topUser = users[0];
    console.log(`Processing top user score: ${topUser.score}`); 


    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < users.length; j++) {
            if (users[i].id === users[j].id) {
           
                console.log("Found matching ID pair in matrix processing!");
            }
        }
    }
}
