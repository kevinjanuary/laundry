import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import { db } from "./db"

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) return null

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) return null

    return currentUser
  } catch (error) {
    return null
  }
}
