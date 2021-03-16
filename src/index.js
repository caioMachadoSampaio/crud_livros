//importa os módulos http e express
const http = require('http');
const express = require('express');
//constrói um objeto express
const app = express();
//importa o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//configura a porta do servidor e o coloca em execução.
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);
let id=2;
let livros =[{
    id: 1,
    titulo:'Senhor dos Aneis',
    descricao : 'livro medieval',
    edicao: 5,
    autor: 'RR TOLKIEN',
    isbn : '34052'
},
{
    id: 2,
    titulo:'Game of Thrones',
    descricao:'livro medieval',
    edicao: 2,
    autor: 'RR Martin',
    isbn: '23544'
    
}];
app.get('/livros',(req,res,next)=>{
    res.status(200).json(livros);
});
app.post('/livros', (req,res,next)=>{
    const livro = {
        id : id+1,
        titulo:req.body.titulo,
        descricao:req.body.descricao,
        edicao:req.body.edicao,
        autor:req.body.autor,
        isbn:req.body.isbn
    }
    livros.push(livro);
    id += 1;
    res.status(200).json(livros);
});
app.delete('/livros',(req,res,next)=>{
    let newLivros=[];
    for(let livro of livros){
        if(livro.id !== req.body.id){
            newLivros.push(livro);
        }
    }
    id = newLivros.length;
    livros = newLivros;
    res.status(200).json(livros);
});
app.put('/livros', (req,res,next)=>{
    for(let livro of livros){
        if(livro.id === req.body.id){
            livro.titulo = req.body.titulo;
            livro.descricao = req.body.descricao;
            livro.ledicao = req.body.edicao;
            livro.autor = req.body.autor;
            livro.isbn = req.body.isbn;
        }
    }
    res.status(200).json(livros);
});

//id ,titulo, descricao,edicao, autor, isbn