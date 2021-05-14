let banned_words = [
    {
        word: "cheese",
        filterOut: true
    },
    {
        word: "majadahonda",
        filterOut: true
    }
]

let initial_storage = {
    nudinop_banned_words: banned_words,
    nudinop_visual_filter_active: true,
    nudinop_text_filter_active: true,
    nudinop_active: true
};

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set(initial_storage, function() {
      
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });