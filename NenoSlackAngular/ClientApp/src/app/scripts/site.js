
$(document).ready(function () {
  $(".cmpsl").each(function () {
    $(this).change(function () {

      var v = $(this);
      if (v.val() === '') {
        v.addClass("txterror");
      }
      else {
        v.removeClass("txterror");
      }
    });
  });
  $(".Mobile").keypress(function (e) {

    var c = e.charCode;
    console.log(c);
    if (c >= 48 && c <= 57)
      return true;
    else
      return false;
    //if (v.val() == '') {
    //    v.addClass("txterror");
    //}
    //else {
    //    v.removeClass("txterror");
    //}
  });
});

function checkValidation() {
  var s = true;
  $(".cmpsl").each(function () {

    var v = $(this);
    if (v.val() === '') {
      v.addClass("txterror");
      s = false;
    }
    else {
      v.removeClass("txterror");
    }
  });
  console.log(s);
  if (s === false)
    return false;
  else
    return true;
  //return false;
}
function disableButton() {
  if ($(".txterror").length > 0) {
    $("input[type=submit]").attr("disable", "disable");
    return false;
  } else {
    $("input[type=submit]").removeAttr("disable");
  }
}
