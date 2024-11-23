// Importa o framework Express para criar a aplicação web
import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância da aplicação Express
const app = express();
app.use(express.static("uploads"))//tudo que tiver dentro dessa pasta a gente abre para servir o que tem na pasta

routes(app)


// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor escutando...");
});




