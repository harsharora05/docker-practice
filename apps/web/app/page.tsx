import { prismaClient } from "@repo/db/client";
export default async function Home() {
  const users = await prismaClient.user.findMany();
  return <div>
    Hii There all : {users.map((user) => <div key={user.id}>{user.username}</div>)}
  </div>
}