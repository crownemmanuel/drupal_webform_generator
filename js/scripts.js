var formMode = '#simple';
var yamlInput;

var yamlOutput = CodeMirror.fromTextArea(document.getElementById("yamlOutput"), {
  lineNumbers: true
});

$("#advance-tab a").click(function() {
  if (!yamlInput) {
    yamlInput = true;
    setTimeout(inityamlInput, 10);
  }

});

$("#generate").click(function() {
  var yaml = "";
  var lines = $('#text').val().split('\n');
  formMode = $('.nav-tabs .active a').attr('href');

  //simple form mode logic
  if (formMode == '#simple') {
    var field = $('#field').val();
    var machineid = $('#machineid').val();
    var startIndex = parseInt($("#startIndex").val());
    for (var i = 0; i < lines.length; i++) {
      yaml += machineid + "_" + parseInt(startIndex + i) + ":\n";
      yaml += "  '#type': " + field + " \n";
      yaml += "  '#title': '" + lines[i] + "' \n"
    }
  }

  //Advance form logic
  if (formMode == '#advance') {
    yinput = yamlInput.getDoc().getValue();
    var startIndex = yinput.match(/\{([\d)]+)\}/);
    for (var i = 0; i < lines.length; i++) {
      yp = yinput.replace(/\{\d\}/g, parseInt(parseInt(startIndex[1]) + i));
      yp = Setfieldvalue(yp, 'data', lines[i])
      yaml += yp + "\n";
    }
  }
  yamlOutput.getDoc().setValue(yaml);

});

$("#machineid,#startIndex").keyup(function() {
  $("#machineidSuggestion").text($("#machineid").val() + "_" + $(
    "#startIndex").val());
});

var inityamlInput = function() {
  yamlInput = CodeMirror.fromTextArea(document.getElementById(
    "yamlInput"), {
    lineNumbers: true
  });
  yamlInput.getDoc().setValue(
    "question_{1}:\n\t'#type': textfield \n\t'#title': '{data}'");
}

var Setfieldvalue = function(text, field, value) {
  s = text.replace(new RegExp('\\{' + field + '\\}', 'gm'), value);
  return s;
};
