var img_height = 32;
var img_width = 32;
var imageData;
var parsedImgData = new Float32Array(img_height*img_width*3);
var prediction;

function classifyImage(image)
{
  let url = image.src;

  // fetch("http://localhost:8000/nudiAPI/prediction", {
  fetch("https://nudinop.herokuapp.com/nudiAPI/prediction", {
    method: "POST",
    //mode: "no-cors",
    body: JSON.stringify({
      urls: [
        url
      ]
    })
  })
  .then(res => res.json())
  .then(res => {
    let preds = Object.values(res)[0];
    if (preds["neutral"] > 0.6) {
      image.style.filter = "none";
    } else {
      // console.log(preds);
    }
  })
  .catch(err => {
    
  })
}

function hideBannedWords(bannedWords, textElement) {
  let text = textElement.innerHTML;
  let textLower = text.toLowerCase();
  let presentBannedWords = bannedWords.filter(word => textLower.includes(word));
  
  var searchMask = presentBannedWords.join("|");
  // console.log(searchMask)
  var regEx = new RegExp(searchMask, "ig");
  var replaceMask = "";

  textElement.innerHTML = text.replace(regEx, replaceMask);
}




function mutHandlerText(summary, bannedWords){
  // console.log(summary);
  
  summary[0].added.forEach(function(textElement){
    hideBannedWords(bannedWords, textElement);
  })

}

function startBanningWords(words) {
  let bannedWords = words.map(word => word.filterOut ? word.word : null);

  var texts = document.querySelectorAll("h1, h2, h3, h4, h5, p, li, td, caption, span, a");

  for (let textIndex = 0; textIndex < texts.length; textIndex++) {
    hideBannedWords(bannedWords, texts[textIndex]);
  }

  let elements = ["h1", "h2", "h3", "h4", "h5", "p", "li", "td", "caption", "span", "a"];

  let mutHandlerText_ = (summary) => mutHandlerText(summary, bannedWords);

  elements.forEach(el => {
    new MutationSummary({
      callback: mutHandlerText_,
      queries: [{ 
        element: el 
      }]
    });
  })
}


// chrome.storage.sync.get("nudinop_banned_words", ({nudinop_banned_words}) => {
//   startBanningWords(nudinop_banned_words);
// })

chrome.storage.sync.get([
  "nudinop_banned_words", 
  "nudinop_visual_filter_active", 
  "nudinop_text_filter_active", 
  "nudinop_active"], ({ nudinop_banned_words,  nudinop_visual_filter_active, nudinop_text_filter_active, nudinop_active }) => {

    if (!nudinop_active) return;
    
    if (nudinop_text_filter_active) {
      startBanningWords(nudinop_banned_words);
    }

    if (nudinop_visual_filter_active) {
      startFilteringImages();
    }

});


function mutHandler(summary){
  // console.log(summary);
  
  modelReady = true;
  summary[0].added.forEach(function(image){
    // Add blur class
    image.style.filter = "blur(10px)";
    classifyImage(image)
  })

}

function startFilteringImages() {
  console.log("filtering images...")
  // Iterate over all the images
  var images = document.getElementsByTagName('img');

  for (var imgIndex = 0; imgIndex < images.length; imgIndex++) {
    // Add blur class
    let image = images[imgIndex];
    image.style.filter = "blur(10px)";
    classifyImage(images[imgIndex])
  }

  new MutationSummary({
    callback: mutHandler,
    queries: [{ 
      element: 'img' 
    }]
  });
}
