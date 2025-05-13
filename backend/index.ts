import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"

import swaggerjsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

import { toNodeHandler } from "better-auth/node"
import { auth } from "./src/utils/auth"

import { PORT, APP_HOME } from "./src/utils/secrets"

import userRouter from "./src/routes/user"
import booksRouter from "./src/routes/books"
import cartRouter from "./src/routes/cart"
import { authMiddleware } from "./src/utils/authMiddleware"

const app = express()

const port = PORT || 4000

const allowedOrigins = [
  "http://localhost:3000",
  "https://books-app-b.ahmedlotfy.dev",
]

// Configure CORS middlewar
app.use(
  cors({
    origin: allowedOrigins, // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
)

// catch all route for better-auth
// app.all("/api/auth/*", toNodeHandler(auth)) // For ExpressJS v4
app.all("/api/auth/*splat", toNodeHandler(auth)) // For ExpressJS v5

// Middlewares
app.use(helmet())
app.use(express.json())
app.use(express.static("public", { dotfiles: "allow" }))
app.use(express.urlencoded({ extended: true }))

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Books App Api Docs",
      version: "1.0.0",
      description: "Swagger Documentation for Books App Backend Api",
      contact: {
        name: "Ahmed Lotfy",
        url: "https://ahmedlotfy.dev",
      },
      exposeSwaggerUI: true,
    },
    servers: [
      {
        url: "http://localhost:4000/",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.js"],
}

const swaggerDocs = swaggerjsdoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use("/api/user", authMiddleware, userRouter)
app.use("/api/books", authMiddleware, booksRouter)
app.use("/api/cart", authMiddleware, cartRouter)

app.get("/", (req, res, next) => {
  console.log("Hello World")
  res.status(200).json("hello world")
})

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

app.listen(port, () => {
  console.log(`SERVER HTTP server started on port ${port}`)
})
