$.get('/flavors', function (data) {
  data = JSON.parse(data);
  for (var i = 0; i < data.length; ++i) {
    $('ul').append('<li>' + data[i] + '</li>');
  }
});

$('#add').click(function () {
  var f = $('#f').val();
  $.post('/addFlavor', f, function () {
    $('ul').append('<li>' + f + '</li>');
  });
});
