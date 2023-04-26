$(document).ready(function () {
  $(".gnb_list").hover(
    function () {
      $(".lnb").stop().slideDown(300);
      $(".gnb_animte").stop().slideDown(300);
    },
    function () {
      $(".lnb").slideUp(300);
      $(".gnb_animte").slideUp(300);
    }
  );
});
