var isShowingRestricoes = false;
var countRest = 1;
var idRest = 1;
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



$('#novo-calculo').click(function (){
  countRest = 0;
  idRest = 1;
  $('#restricoes').hide();
  $('#simplex').hide();
});

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
    //conta variaveis da funcao objetivo
      var variavelaux = $(".variavelObj>input").length;
      //cria array variaveis da F.O
      var valfuncobj = [];
      for(var i = 0; i < variavelaux; i++){
        valfuncobj.push($(".variavelObj>input")[i].value);
      }
      //ve se a F.O é maximizacao ou minimizacao
      const maxmin = $(".opFO>.select-wrapper>.select-dropdown")[0].value == 'Min' ? false : true;
      var rest = [];
      var aux = [];
      //ve quantas restrições tem
      for(var i = 0; i < $('.restricao').length; i ++){
        rest.push('{');
        //itera em cada restricao
        for(var j = 0; j < $('#restricao-'+ (i+1) + '>.variavelRestriInput').length;j++){
          aux.push(parseFloat($('#restricao-'+ (i+1) +'>.variavelRestri>input')[j].value));
        }
        //adiciona as variaveis auxiliares na string de json
        rest.push('"variaveisLivres": [' + (aux.length == 1 ? aux[0] : aux.join(',')) + '],');
        aux = [];
        //adiciona o resultado
        rest.push('"resultado":' + (parseFloat($('#restricao-' + (i+1) + '>.variavelRestri>#resultado')[0].value)) + ',');
        //adiciona variavel aux
        variavelaux++;
        rest.push('"variavelAuxiliar":'+ (variavelaux) +',');
        //adiciona tipo da reta da funcao
        var tipofunc;
        switch ($('#opcao-restricao-' + (i+1) + '>.select-wrapper>.select-dropdown')[0].value) {
          case '<=':
               tipofunc = 'MENOR_OU_IGUAL';
            break;
          case '>=':
              tipofunc = 'MAIOR_OU_IGUAL';
              break;
          case '>':
              tipofunc = 'MAIOR';
            break;
          case '<':
              tipofunc = 'MENOR';
            break;
          default:
            tipofunc = 'IGUAL';
        }
        rest.push('"maiorQue": "' + tipofunc + '"');
        rest.push((i+1) == $('.restricao').length ? '}' : '},');
      }
      var dat = '{"variaveisLivres":[' + valfuncobj.join(',') + '],"maximizacao":' + maxmin + ',"variavelAuxiliar":0,"restricoes":[' + rest.join('') + ']}';
      console.log(dat);
      /*const dat = JSON.stringify(
            {
          "variaveisLivres": [
            valfuncobj.join(',')
          ],
          "maximizacao": maxmin,
          "variavelAuxiliar": 0,
          "restricoes": [
            JSON.stringify(rest.join(''))
          ]
        }
      );*/

      $.ajax({
            type: 'POST',
            url: 'http://54.94.163.200:8080/simplex-service-0.0.1-SNAPSHOT/simplex',
            data: dat,
            contentType: "application/json; charset=utf-8",
                      success: function (result) {
                        $('.campo-resultado').val(result);
                      },
                      error: function (request, status, errorThrown) {
                        $('.campo-resultado').val('Não foi obtido resultado da função');
                      }
                    });
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

  if($(".variavelRestriInput input").length < $(".variavelObj>input").length * countRest){
  idRest++;
  var restricao = $(".restricao");

  var posicaoRes = "#opcao-restricao-" + restricao.length;

  var igual = $(posicaoRes);

  var variavel = "<div class='input-field col s2 variavelRestri variavelRestriInput'>"
                + "<label> x" + idRest + "</label>"
                + "<input type='number' class='validate'>"
                + "</div>";

  igual.before(variavel);
}
}


function adicionarNovaRestricao(){
      countRest ++;
      idRest = 1;
      var variavel = $(".restricao");

      var restricoes = $("#restricoesRows");

      var id = variavel.length + 1;

      var novaRestricao = "<div id='restricao-" +id+"' class='row restricao'>"
                        + "<div class='input-field col s2 variavelRestri variavelRestriInput'>"
                        + "<label>x1</label>"
                        + "<input type='number' class='validate'>"
                        + "</div>"
                        + "<div class='input-field col s2' id=" + "opcao-restricao-" + id + ">"
                        + "<select id='select-rs-"+ id + "'>"
                        + "<option value=0><=</option>"
                        + "<option value=1>>=</option>"
                        + "<option value=2>=</option>"
                        + "<option value=2>></option>"
                        + "<option value=2><</option>"
                        + "</select>"
                        + "</div>"
                        + "<div class='input-field col s2 variavelRestri'>"
                        + "<input id='resultado' type='number' class='validate'>"
                        + "</div>"
                        + "</div>";

        restricoes.append(novaRestricao);
        $('#select-rs-' + id).material_select();
}
