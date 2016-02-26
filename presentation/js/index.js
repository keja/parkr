/*Only needed for the controls*/
var phone = document.getElementById("phone_1"),
  iframe = document.getElementById("frame_1");

/*View*/
function updateView(view) {
  if (view) {
    phone.className = "phone view_" + view;
  }
}

/*Controls*/
function updateIframe() {
  iframe.src = document.getElementById("iframeURL").value;

  phone.style.width = document.getElementById("iframeWidth").value + "px";
  phone.style.height = document.getElementById("iframeHeight").value + "px";

  /*Idea by /u/aerosole*/
  document.getElementById("wrapper").style.perspective = (
    document.getElementById("iframePerspective").checked ? "1000px" : "none"
  );
}
updateIframe();

/*Events*/
document.getElementById("controls").addEventListener("change", function() {
  updateIframe();
});

document.getElementById("views").addEventListener("click", function(evt) {
  updateView(evt.target.value);
});



/* Toggle wrapper margin UP */
function marginUp() {
  var el = document.getElementById("wrapper");
    el.style.marginBottom="400px";
  var el2 = document.getElementById("pre-wrapper");
    el2.style.opacity="0";
}

/* Toggle wrapper margin DOWN */
function marginDown() {

  var el = document.getElementById("wrapper");
    el.style.marginBottom="0px";
  var el2 = document.getElementById("pre-wrapper");
    el2.style.opacity="1";
}

var ml = 0;


document.onkeyup = function(e) {

  /* Toggle pre-wrapper margin RIGHT */
  if(e.keyCode == 39 || e.keyCode == 40) {
      ml -= 2000;
      var el = document.getElementById("pre-wrapper");
      el.style.marginLeft = ml + "px";

      if (ml == -8000){
        var el = document.getElementById("wrapper");
          el.style.marginBottom="400px";
        var el2 = document.getElementById("pre-wrapper");
          el2.style.opacity="0";

        var phone_bla = document.getElementById("phone_1");
        phone_bla.className = "phone view_3";
      }

      if (ml == -10000){
        var el = document.getElementById("wrapper");
          el.style.marginBottom="0px";
        var el2 = document.getElementById("pre-wrapper");
          el2.style.opacity="1";

        var phone_bla = document.getElementById("phone_1");
        phone_bla.className = "phone view_1";
      }

  }

  /* Toggle pre-wrapper margin LEFT */
  if(e.keyCode == 37 || e.keyCode == 38) {
      ml += 2000;
      if (ml >= 0){
        ml = 0;
      }
      var el = document.getElementById("pre-wrapper");
      el.style.marginLeft = ml + "px";

      if (ml == -8000){
        var el = document.getElementById("wrapper");
          el.style.marginBottom="400px";
        var el2 = document.getElementById("pre-wrapper");
          el2.style.opacity="0";

        var phone_bla = document.getElementById("phone_1");
        phone_bla.className = "phone view_3";

      }


      if (ml == -6000){
        var el = document.getElementById("wrapper");
          el.style.marginBottom="0px";
        var el2 = document.getElementById("pre-wrapper");
          el2.style.opacity="1";

        var phone_bla = document.getElementById("phone_1");
        phone_bla.className = "phone view_1";
      }

  }

}

