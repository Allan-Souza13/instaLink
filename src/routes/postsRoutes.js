import express from "express";
import multer from "multer";
import cors from "cors"
import { listarPosts, postarNovoPost,uploadImagem,atualizaNovoPost} from "../controlers/postsControler.js";

// comunicar com o Front
const corsOptions = {
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
})

const upload = multer({dest: "./uploads" , storage})

const routes = (app) =>{
  // Habilita o middleware JSON para permitir que a aplicação entenda requisições com corpo em formato JSON
  app.use(express.json());  

  app.use(cors(corsOptions))

  //criando uma rota
  app.get("/posts",listarPosts ); //app.get()pega um recurso.

  app.post("/posts",postarNovoPost ) //app.post() cria um recurso

  app.post("/upload",upload.single("imagem"), uploadImagem)

  app.put("/upload/:id",atualizaNovoPost) //app.put() colocar algo em um registro que ja existe ou seja serve para atualizar
}
export default routes;

//localhost:3000/posts/1