import  express from "express";
const app = express();

import authRouters from "./routes/auth.js";
import userRouters from "./routes/users.js";
import postRouters from "./routes/posts.js";
import commentRouters from "./routes/comments.js";
import likeRouters from "./routes/likes.js";
import relationshipRouters from "./routes/relationships.js";
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

//middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.json());
app.use(cors( {
    origin: "http://localhost:3000",
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)

    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/auth", authRouters);
app.use("/api/users", userRouters);
app.use("/api/posts", postRouters);
app.use("/api/comments", commentRouters);
app.use("/api/likes", likeRouters);
app.use("/api/relationships", relationshipRouters);

app.listen(8800, () =>{
    console.log("API working!");
});