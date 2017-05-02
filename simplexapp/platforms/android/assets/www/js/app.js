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
      adicionarVariavel();
    }
  });

  $(".add-var-restricao").click(function() {
    adicionarVariavelRestricao();
  });

  $(".add-restricoes").click(function(){
    var variaveis = $(".variavelObj input");
    var variavelVazia = false;

    for (var i = 0; i < variaveis.length; i++) {
      var variavel = variaveis[i];
      if (variavel.value == '') {
        variavelVazia = true;
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

function adicionarVariavel() {
  var funcaoObjetivo = $(".funcao-objetivo");
  var id = (funcaoObjetivo.children().length - 1) + 1;

  var variavel = "<div class='input-field col s2 variavelObj'>"
                + "<input id='" + id + "' type='number' class='validate'>"
                + "<label for='" + id + "'> x" + id + "</label>"
                + "</div>";

  funcaoObjetivo.append(variavel);
}

function adicionarVariavelRestricao() {
  var restricao = $(".restricao");
  var id = (restricao.children().length -2) + 1;

  var igual = $("#igual");

  var variavel = "<div class='input-field col s2 variavelRestri'>"
                + "<input id='r" + id + "' type='number' class='validate'>"
                + "<label for='r" + id + "'> x" + id + "</label>"
                + "</div>";

  igual.before(variavel);
}
