import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors'

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors())

app.post("/usuario", async (req, res) => {
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.get("/usuario", async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});
app.put("/usuario/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/usuario/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "usuario deletado" });
});

app.listen(3000);
