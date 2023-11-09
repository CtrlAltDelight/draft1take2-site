import { Client } from "pg";

export default async function handler(req, res) {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  // Parse the JSON body of the request to get the episode data
  const { title, description, url } = req.body;

  // Create a new episode in the database
  const result = await client.query(
    "INSERT INTO episodes(title, description, url) VALUES($1, $2, $3) RETURNING *",
    [title, description, url],
  );

  await client.end();

  // Send back the newly created episode
  res.status(201).json(result.rows[0]);
}
