var isShowingRestricoes = false;

//esconde o card das funcoes de restricao.
$(document).ready(function(){
  $("#restricoes").hide();
});

//carrega os inputs, pois o Materialize sobreescreve algumas coisas do html.
$(document).ready(function() {
    Materialize.updateTextFields();
});

$(document).ready(function() {
  //funcao que adiciona uma variavel a funcao objetivo.
  $(".add-funcao-objetivo").click(function() {
    //array de inputs (variaveis).
    var variaveis = $(".variavelObj input");
    //boolean criado para controlar a criacao de novos campos.
    var variavelVazia = false;
    //percorre os inputs (variaveis) e caso encontre algum
    //vazio nao permitira a criacao de novas variaveis.
    for (var i = 0; i < variaveis.length; i++) {
      var variavel = variaveis[i];
      if (variavel.value == '') {
        variavel.classList.add('invalid');
        variavelVazia = true;
      }
    }
    //se houver variavel vazia nao permita a adicao de mais uma variavel.
    if (!variavelVazia && !isShowingRestricoes) {
      adicionarFuncaoObjetiva();
    }
  });

//adicionar variavel na restrição
  $(".add-var-restricao").click(function() {
    var restricoes = $(".variavelRestriInput input");
    var variavelVazia = false;
    for (var i = 0; i < restricoes.length; i++) {
      var restricao = restricoes[i];
      if (restricao.value == '') {//se houver variavel vazia nao permita a adicao de mais uma variavel.
        restricao.classList.add('invalid');
        variavelVazia = true;
      }
    }
    if(!variavelVazia){
      adicionarVariavelRestricao();
    }
  });

//adiciona nova restrição
$(".add-nova-restricao").click(function() {
  var restricoes = $(".variavelRestri input");
  var variavelVazia = false;

  for (var i = 0; i < restricoes.length; i++) {
      var restricao = restricoes[i];
      if (restricao.value == '') {//se houver variavel vazia nao permita a adicao de mais uma variavel.
          restricao.classList.add('invalid');
          variavelVazia = true;
      }
  }

  if (!variavelVazia) {
      adicionarNovaRestricao();
  }
});

//adicionando restrições
  $(".add-restricoes").click(function(){
    var variaveis = $(".variavelObj input");
    var variavelVazia = false;

    for (var i = 0; i < variaveis.length; i++) {
      var variavel = variaveis[i];
      if (variavel.value == '') {
        variavelVazia = true;
        variavel.classList.add('invalid');
      }
    }

    if (!variavelVazia) {
      $("#restricoes").show();
      isShowingRestricoes = true;
    }
  });
});

$(document).ready(function() {
    $('select').material_select();
});

function adicionarFuncaoObjetiva() {
  var funcaoObjetivo = $(".funcao-objetivo");
  var id = (funcaoObjetivo.children().length - 1) + 1;

  var variavel = "<div class='input-field col s2 variavelObj'>"
                + "<label> x" + id + "</label>"
                + "<input type='number' class='validate'>"
                + "</div>";

  funcaoObjetivo.append(variavel);
}

function adicionarVariavelRestricao() {
  var restricao = $(".restricao");
  var id = (restricao.children().length -2) + 1;

  var igual = $(".opcao-restricao");

  var variavel = "<div class='input-field col s2 variavelRestri'>"
                + "<label> x" + id + "</label>"
                + "<input type='number' class='validate'>"
                + "</div>";

  igual.before(variavel);
}

function adicionarNovaRestricao(){
      var val = $(".restricao");

      var id = (val.length) + 1;

      console.log(id);
}
