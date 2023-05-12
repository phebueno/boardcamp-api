import { db } from "../database/database.connection.js";

export async function getGames(req, res) {
  try {
    const {name} = req.query;
    console.log(name);
    const games = await db.query(`SELECT * FROM games;`);
    res.send(games.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postGame(req, res) {
  const { name, image, stockTotal, pricePerDay } = req.body;
  try {
    const checkGame = await db.query(`SELECT * FROM games WHERE name=$1;`,[name]);
    if(checkGame.rowCount) return res.sendStatus(409); //conflito
    const newGame = await db.query(
      `INSERT INTO games ("name","image","stockTotal", "pricePerDay") 
        VALUES ($1, $2, $3, $4);`,
      [name, image, stockTotal, pricePerDay]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
