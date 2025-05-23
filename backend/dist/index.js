import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerjsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.js";
import { PORT } from "./utils/secrets.js";
import userRouter from "./routes/user.js";
import booksRouter from "./routes/books.js";
import cartRouter from "./routes/cart.js";
import wishlistRouter from "./routes/wishlist.js";
import { authMiddleware } from "./utils/authMiddleware.js";
const app = express();
const port = PORT || 4000;
app.use(cors({
    origin: process.env.APP_HOME,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
// Logger middleware with Winston
// app.use(requestLogger)
// app.use(errorLogger) // Log unhandled errors
// catch all route for better-auth
// app.all("/api/auth/*", toNodeHandler(auth)) // For ExpressJS v4
app.all("/api/auth/*splat", toNodeHandler(auth)); // For ExpressJS v5
// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.static("public", { dotfiles: "allow" }));
app.use(express.urlencoded({ extended: true }));
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
};
const swaggerDocs = swaggerjsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/user", authMiddleware, userRouter);
app.use("/api/books", booksRouter);
app.use("/api/cart", authMiddleware, cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.get("/", (req, res, next) => {
    console.log("Hello World");
    res.status(200).json("hello world");
});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.listen(port, () => {
    console.log(`SERVER HTTP server started on port ${port}`);
});
