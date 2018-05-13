var g = G$('Ian', 'Chen').setLang('zh-TW').greet(true).log();

$('#login').click((function () {
  var lang = $('#lang').val();
  G$('Ian', 'Chen').setLang(lang).HTMLGreeting('#greeting', true).log();
}))