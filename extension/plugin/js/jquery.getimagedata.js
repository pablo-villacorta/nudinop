(function( $ ){

  // jQuery getImageData Plugin
  $.getImageData = function(args) {

    var regex_url_test = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    // If a URL has been specified
    if(args.url) {
      // Ensure no problems when using http or http
      // var is_secure = location.protocol === "https:";
      var server_url = "";
      // If url specified and is a url + if server is secure when image or user page is
      // if(args.server && regex_url_test.test(args.server) && !(is_secure && args.server.indexOf('http:') == 0)) {
      //   server_url = args.server;
      // } else server_url = "//img-to-json.appspot.com/";

      server_url = args.server;
      server_url += "?url=" + escape(args.url) + "&callback=?";

      var xhr = new XMLHttpRequest();
      xhr.open("GET", server_url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          console.log("Image Received");
          console.log(xhr.responseText);
          var data;
          try
          {
            data = JSON.parse(xhr.responseText);
          }catch(e){
            console.log("GetImageData:Exception ", e);
          }
          if(data!=undefined){
            var return_image = new Image();
            $(return_image).load(function(){
              // Set image dimensions
              this.width = data.width;
              this.height = data.height;
              // Return the image
              if(typeof(args.success) == typeof(Function)) {
                args.success(this);
              }
              // Put the base64 encoded image into the src to start the load
            }).attr('src', data.data);
          }
        }
      }
      xhr.send();
    } else {
      if(typeof(args.error) == typeof(Function)) {
        args.error(null, "no_url");
      }
    }
  };
})(jQuery);
