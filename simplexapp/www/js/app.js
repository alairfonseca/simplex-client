var isShowingRestricoes = false;

//esconde o card das funcoes de restricao e de resultado simplex.
$(document).ready(function(){
  $("#restricoes").hide();
  $("#simplex").hide();
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
      $("select").attr("disabled",true);
      restricoes.attr("disabled",true);
      adicionarNovaRestricao();
  }
});

//adicionando restrições
  $(".add-restricoes").one("click", function(){
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
      variaveis.attr("disabled",true);
      $("#restricoes").show();
      isShowingRestricoes = true;
    }
  });
});

$(document).ready(function() {
    $('select').material_select();
});




//chama o back-end para cálcular o simplex e exibe o resultado
$("#executar-simplex").click(function(){
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
      $("select").attr("disabled",true);
      restricoes.attr("disabled",true);
      $("#simplex").show();
  }
});


$("#novo-calculo").click(function(){
  if($(".campo-resultado").value != ''){
      location.reload();
  }
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

  var posicaoRes = "#opcao-restricao-" + restricao.length;
  var id = restricao.length + 1;

  var igual = $(posicaoRes);

  var variavel = "<div class='input-field col s2 variavelRestri variavelRestriInput'>"
                + "<label> x" + id + "</label>"
                + "<input type='number' class='validate'>"
                + "</div>";

  igual.before(variavel);
}

function adicionarNovaRestricao(){
      var variavel = $(".restricao");

      var restricoes = $("#restricoesRows");

      var id = variavel.length + 1;

      var novaRestricao = "<div id=" +id+" class='row restricao'>"
                        + "<div class='input-field col s2 variavelRestri variavelRestriInput'>"
                        + "<label>x1</label>"
                        + "<input type='number' class='validate'>"
                        + "</div>"
                        + "<div class='input-field col s2' id=" + "opcao-restricao-" + id + ">"
                        + "<select>"
                        + "<option value=0><=</option>"
                        + "<option value=1>>=</option>"
                        + "<option value=2>=</option>"
                        + "</select>"
                        + "</div>"
                        + "<div class='input-field col s2 variavelRestri'>"
                        + "<input id='resultado' type='number' class='validate'>"
                        + "</div>"
                        + "</div>";

console.log(novaRestricao);
        restricoes.append(novaRestricao);
}
