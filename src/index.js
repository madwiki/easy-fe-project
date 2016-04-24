var a = 0;
$(window).ready(function () {
  setTimeout(function () {
    $('.main-container').addClass('main-container-show');
  },500);
  setTimeout(function () {
    $('.content').append('<p>So,Have fun!</p>');
  },2600);
});