import { db } from "../database/database.connection.js";

export async function getRentals(req, res) {
  try {
    res.send("alugueis recebidos!");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postRental(req, res) {
  try {
    res.send(req.body);
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
