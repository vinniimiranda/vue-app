<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">Produtos VueJs</a>
      </div>
    </nav>

    <div class="container">
      <form @submit.prevent="salvar">
          
          <label >Título</label>
          <input type="text" placeholder="Título" id="titulo" v-model="produto.titulo">
          <label>Descrição</label>
          <input type="text" placeholder="Descrição" v-model="produto.descricao">
          <label>Preço</label>
          <input type="text" placeholder="Preço" v-model="produto.preco">
          <label for="genero">Generos</label>
          <select name="genero" id="" v-model="genero">
            <option value="" disabled selected>Selecione</option>
            <option v-for="genero in generos" :key="genero.val"  v-bind:value="genero.val">{{genero.label}}</option>
          </select>
          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table class='centered responsive' id="tabela">

        <thead>

          <tr>
            <th>Titulo</th>
            <th>Descricao</th>
            <th>Preço</th>
         
          </tr>

        </thead>

        <tbody>

          <tr v-for="produto in produtos" :key="produto.id">

            <td>{{produto.titulo}}</td>
            <td>{{produto.descricao}}</td>
            <td>{{produto.preco}}</td>
            <td>
              <a @click="editar(produto)"><i class="material-icons">create</i></a>
            </td>
            <td>
              <a @click="deletar(produto._id)"><i class="material-icons">delete_sweep</i></a>
            </td>
          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>
<script>
$(document).ready(function(){
    
    $('select').formSelect();
  });
import Produto from "./services/produtos.js";

export default {
  data() {
    return {
      genero: "",
      produtos: [],
      produto: {
        id: "",
        titulo: "",
        descricao: "",
        preco: ""
      },
      generos: [{
        val: 1,
        label: "Livro"
      },{
        val:15,
        label: "E-book"
      }]
    };
  },
  mounted() {
    this.listar()
  },
  methods: {
    listar() {
      Produto.listar().then(res => {
        this.produtos = [];
        res.data.docs.forEach(element => {
          this.produtos.push(element);
        });
      });
    },
    salvar() {
      
      
      if (!this.produto.id) {
        Produto.salvar(this.produto).then(res => {
          this.produto = {id: "", titulo:"", descricao:"", preco: ""};
          M.toast({html: 'Produto cadastrado com sucesso!', classes: 'azul'});

          this.listar();
        });
      } else {
        Produto.atualizar(this.produto).then(res => {
          this.produto = {id: "", titulo:"", descricao:"", preco: ""};
          this.listar();
          M.toast({html: 'Produto atualizado com sucesso!', classes: 'azul'});
        });
      }
    },
    editar(produto) {
      console.log(produto)
      this.produto.id = produto._id;
      this.produto.titulo = produto.titulo;
      this.produto.descricao = produto.descricao;
      this.produto.preco = produto.preco;
    },
    deletar(id) {
      console.log(id);
      Produto.deletar(id).then(res => {
        this.listar();
        alert("Produto deletado");
      });
    }
  }
};
</script>

<style>
.blue.darken-1 {
    background-color: #00427b !important;
}
.btn, .btn-large, .btn-small {
      background-color: #00427b !important ;
}
.btn, .btn-large, .btn-small:hover {
      background-color:  #00427bad !important ;
}
.azul{
  background-color:  #00427b !important ;
}
input:not([type]):focus:not([readonly]), input[type=text]:not(.browser-default):focus:not([readonly]), input[type=password]:not(.browser-default):focus:not([readonly]), input[type=email]:not(.browser-default):focus:not([readonly]), input[type=url]:not(.browser-default):focus:not([readonly]), input[type=time]:not(.browser-default):focus:not([readonly]), input[type=date]:not(.browser-default):focus:not([readonly]), input[type=datetime]:not(.browser-default):focus:not([readonly]), input[type=datetime-local]:not(.browser-default):focus:not([readonly]), input[type=tel]:not(.browser-default):focus:not([readonly]), input[type=number]:not(.browser-default):focus:not([readonly]), input[type=search]:not(.browser-default):focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {
    border-bottom: 1px solid #00427b;
    -webkit-box-shadow: 0 1px 0 0 hsla(219, 94%, 37%, 0.788);
    box-shadow: 0 1px 0 0 #00427b;
}
nav{
  background-color: #00427b !important ;
}

    @media (max-width: 425px) {
      nav .brand-logo.center {
      left: 30% !important;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
    
}
</style>
