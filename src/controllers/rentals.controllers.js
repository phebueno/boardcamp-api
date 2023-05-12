import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function getRentals(req, res) {
  try {
    const rentals = await db.query(`
    SELECT customers.name AS "customerName", games.name AS "gameName", rentals.* FROM rentals
      JOIN customers
        ON customers.id=rentals."customerId"
      JOIN games
        ON games.id=rentals."gameId";`);

    const rentalsObj = rentals.rows.map(
      ({ customerName, gameName, ...rental }) => ({
        ...rental,
        customer: { id: rental.customerId, name: customerName },
        game: { id: rental.gameId, name: gameName },
      })
    );

    res.send(rentalsObj);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const rentDate = dayjs().format("YYYY-MM-DD");
  try {
    //só vai atualizar se encontrar os IDS de games e customers nas tabelas
    const rent = await db.query(
      `
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
      
    `,
      [customerId, gameId, rentDate, daysRented]
    );
    if (!rent.rowCount) return res.sendStatus(400); //não existe o ID
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function finishRental(req, res) {
  const {id} = req.params;
  const returnDate = dayjs().format("YYYY-MM-DD");
  try {
    const finishedRental = await db.query(
    `
    UPDATE rentals 
    SET "returnDate"=$2,
        "delayFee" = CASE
                        WHEN ($2 - "rentDate") > "daysRented"
                        THEN (($2 - "rentDate")-"daysRented")*"originalPrice"
                        ELSE 0
                     END
      WHERE id=$1 AND "returnDate" IS NULL
    `,[id,returnDate]);
  if(!finishedRental.rowCount) {
    //Ou não tem o ID, ou já havia sido finalizado
    const checkIfAlreadyFinished = await db.query(`SELECT * FROM rentals WHERE id=$1`,[id]);
    if(checkIfAlreadyFinished.rows[0]) return res.sendStatus(400);//aluguel finalizado anteriormente
    else return res.sendStatus(404);//id não encontrado
   } 
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function deleteRentalById(req, res) {
  const {id} = req.params;
  try {
    res.send(`aluguel de numero ${id} deletado!`);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
