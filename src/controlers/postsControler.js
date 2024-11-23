import {getTodosPosts, criarPost, atualizaPost }from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
  //requisição(req) e resposta(res)
    const posts =  await getTodosPosts();
    res.status(200).json(posts);
  }


  
  export function postarNovoPost(req,res) {
    const novoPost = req.body;
    criarPost(novoPost)
      .then(postCriado => {
        res.status(200).json(postCriado);
      })
      .catch(error => {
        console.error(erro.message)
        res.status(500).json({"erro":"Falha na requisição"})
      });
  }
  
  export async function uploadImagem(req,res) {
    const novoPost = req.body;
    try {
         const postCriado = await criarPost(novoPost);
         const imgaemAtualizada = `uploads/${postCriado.insertedId}.jpg`
          fs.renameSync(req.file.path, imgaemAtualizada)
         res.status(200).json(postCriado);
    }catch(erro){
       console.error(erro.message)
       res.status(500).json({"erro":"Falha na requisição"})
    }
   }

 export async function atualizaNovoPost(req, res){
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.jpg`
 

  try {
 
    const imgBuffer = fs.readFileSync(`uploads/${id}.jpg`)
    const descricao = await gerarDescricaoComGemini(imgBuffer)

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
  }
    const postCriado = await atualizaPost(id, post);


    
    res.status(200).json(postCriado);

  }catch(erro){
    console.log(erro.message);
    res.status(500).json({"Erro":"Falha na requisição"})
  }
}