<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
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

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

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
              <button class="waves-effect btn-small blue darken-1" @click="editar(produto)"><i class="material-icons">create</i></button>
              <button class="waves-effect btn-small red darken-1" @click="deletar(produto._id)"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>

  </div>
</template>
<script>
import Produto from "./services/produtos.js";
export default {
  data() {
    return {
      produtos: [],
      produto: {
        id: "",
        titulo: "",
        descricao: "",
        preco: ""
      }
    };
  },
  mounted() {
    this.listar();
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
          this.produto = {};
          alert("Produto cadastrado com sucesso!");
          this.listar();
        });
      } else {
        Produto.atualizar(this.produto).then(res => {
          this.produto = {};
          this.listar();
          alert("Produto atualizado com sucesso!");
        });
      }
    },
    editar(produto) {
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
      background-color: #063c6b !important ;
}
.btn, .btn-large, .btn-small:hover {
      background-color: #00427bd4 !important ;
}
input:not([type]):focus:not([readonly]), input[type=text]:not(.browser-default):focus:not([readonly]), input[type=password]:not(.browser-default):focus:not([readonly]), input[type=email]:not(.browser-default):focus:not([readonly]), input[type=url]:not(.browser-default):focus:not([readonly]), input[type=time]:not(.browser-default):focus:not([readonly]), input[type=date]:not(.browser-default):focus:not([readonly]), input[type=datetime]:not(.browser-default):focus:not([readonly]), input[type=datetime-local]:not(.browser-default):focus:not([readonly]), input[type=tel]:not(.browser-default):focus:not([readonly]), input[type=number]:not(.browser-default):focus:not([readonly]), input[type=search]:not(.browser-default):focus:not([readonly]), textarea.materialize-textarea:focus:not([readonly]) {
    border-bottom: 1px solid #00427b;
    -webkit-box-shadow: 0 1px 0 0 #0643b6c9;
    box-shadow: 0 1px 0 0 #00427b;
}
    
</style>
