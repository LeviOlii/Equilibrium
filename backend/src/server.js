import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import testimonyRoutes from "./routes/testimonyRoutes.js";
import userRoutes from "./routes/user.routes";
import professionalRoutes from "./routes/professional.routes";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/testimonies", testimonyRoutes);
app.use("/api", userRoutes);
app.use("/api", professionalRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
