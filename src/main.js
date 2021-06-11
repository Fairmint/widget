(function () {
  var loadScript = function () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "./widget.js";

    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
  };

  window.addEventListener("load", loadScript, false);
})();
