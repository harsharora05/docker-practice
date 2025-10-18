import express, { Request, Response } from "express"
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());


app.get("/", async (req: Request, res: Response) => {
    await prismaClient.user.create({
        data: {
            username: Math.random().toString(),
            password: Math.random().toString()
        }
    })
    res.json({ "message": "nameste jii" })
});

app.get("/users", async (req: Request, res: Response) => {
    const users = await prismaClient.user.findMany();
    res.json({ "message": users })
});


app.listen(3001)

