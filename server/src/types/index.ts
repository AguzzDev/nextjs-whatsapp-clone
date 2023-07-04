import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { Stream } from "stream"

export interface Context {
  req: Request
  res: Response
  prisma: PrismaClient
}

declare module "express-session" {
  interface SessionData {
    userId: string
    chatId: string
  }
}

export interface FileUpload {
  image: Upload
}

export interface Upload {
  filename: string
  mimetype: string
  encoding: string
  createReadStream: () => Stream
}
