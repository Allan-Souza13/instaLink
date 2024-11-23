
import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

// Função assíncrona para buscar todos os posts do banco de dados
export  async function getTodosPosts(){
      // Obtém o banco de dados 'imercao-instaByte' a partir da conexão
      const db = conexao.db("imercao-instaByte");
     // Obtém a coleção 'posts' dentro do banco de dados
    const colecao = db.collection("posts");
      // Retorna todos os documentos da coleção como um array
      return colecao.find().toArray();
      
}


export async function criarPost(novoPost) {
      
       const db = conexao.db("imercao-instaByte");
       //rota que busca todos os posts
      const colecao = db.collection("posts");
      //rota que cria um post
        return colecao.insertOne(novoPost)
}

export async function atualizaPost(id, novoPost) {
  const db = conexao.db("imercao-instaByte");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id)
  return colecao.updateOne( {_id: new ObjectId(objID)}, {$set:novoPost}) //informa ao mongo qual post é para artualizar. set informa o conjunto de dados que esta sendo enviado para o conjunto de post
  
}