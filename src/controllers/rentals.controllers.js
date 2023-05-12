import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  try {
    res.send("alugueis recebidos!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const rentDate = dayjs().format("YYYY-MM-DD");
  try {
    //só vai atualizar se encontrar os IDS de games e customers nas tabelas
    const rent = await db.query(`
    INSERT INTO rentals ("customerId","gameId","rentDate", "daysRented","returnDate","originalPrice","delayFee")
      SELECT 
        $1 AS customerId,
        $2 AS gameId,
        $3 AS rentDate,
        $4 AS daysRented,
        null AS returnDate,
        "pricePerDay"*$4,
        null AS delayFee
          FROM games, customers
            WHERE games.id=$2 
              AND customers.id=$1 
              AND games."stockTotal">(SELECT COUNT(*) FROM rentals WHERE "gameId"=$2);
      
    `,[customerId,gameId,rentDate,daysRented]
    );
    if(!rent.rowCount) return res.sendStatus(400); //não existe o ID
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function endRental(req, res) {
  try {
    res.send("aluguel finalizado!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteRentalById(req, res) {
  try {
    res.send("aluguel deletado!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}
