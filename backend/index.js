import express from "express"
import cors from "cors"
import session from "express-session"
import passport from "passport"
import MongoStore from "connect-mongo"
import helmet from "helmet"

import swaggerjsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

import dbConnection from "./utils/db.js"

import { PORT, SESSION_SECRET, MONGO_URI, APP_HOME } from "./utils/secrets.js"

import "./config/passport.js"

import authRoutes from "./routes/auth.js"
import booksRoutes from "./routes/books.js"
import cartRoutes from "./routes/cart.js"

const app = express()

const port = PORT || 4000

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://books-app-f.ahmedlotfy.dev"]
    : ["http://localhost:3000"]

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
)

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

// setting up session cookie with logged in user's database id
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: { httpOnly: true, secure: false, maxAge: 4 * 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      ttl: 14 * 24 * 60 * 60,
      autoRemove: "native",
    }),
  })
)

// initializing passportjs instance with its session
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/books", booksRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes)

app.get("/api/user", (req, res, next) => {
  // res.json(req.user);
  const user = req.user
  res.status(200).json({ user })
})

app.get("/", (req, res, next) => {
  console.log("Hello World")
  res.status(200).json("hello world")
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

app.listen(port, () => {
  dbConnection()
  console.log(`SERVER HTTP server started on port ${port}`)
})
