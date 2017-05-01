function adicionarVariavel() {
  var funcaoObjetivo = $(".funcao-objetivo");
  var id = 0;

  var variavel = "<input id='" + id + "' type='number' class='validate'>"
                + "<label for='" + id + "'> x" + 2 + "</label>"

funcaoObjetivo.append(variavel);

  console.log(funcaoObjetivo);
}
