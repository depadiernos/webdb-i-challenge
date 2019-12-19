const express = require("express")

const db = require("./data/dbConfig.js")

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
  res.status(200).json({ message: "endpoints start with /api/accounts" })
})

server.get("/api/accounts", async (req, res) => {
  const accounts = await db.select("*").from("accounts")
  res.json(accounts)
})

server.get("/api/accounts/:id", async (req, res) => {
  const account = await db
    .select("*")
    .from("accounts")
    .where("id", req.params.id)
    .first()
  res.json(account)
})

server.post("/api/accounts", async (req, res) => {
  const data = {
    name: req.body.name,
    budget: req.body.budget
  }
  try {
    const [id] = await db('accounts').insert(data)
    console.log(id)
    const account = await db
      .select("*")
      .from("accounts")
      .where("id", id)
      .first()
    res.status(200).json(account)
  } catch (err) {
    console.log(err)
  }
})

server.put("/api/accounts/:id", async (req, res) => {})

server.delete("/api/accounts/:id", async (req, res) => {})

module.exports = server
