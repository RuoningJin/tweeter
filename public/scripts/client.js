/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      console.log($tweet);
      $('#tweet-container').append($tweet);
    }
  }

  const createTweetElement = function(data) {
    const userInfo = data.user;
    const markup = `
      <article class="tweet">
                <header class="space-between">               
                  <div>
                    <img src="${userInfo.avatars}" alt="user-avatar">
                    &nbsp;${userInfo.name}
                  </div>
                  <span>
                    ${userInfo.handle}
                  </span>
                </header>
                <p>${data.content.text}</p>
                <footer class="space-between">
                  <div>
                    ${data.created_at}
                  </div>
                  <i>
                    <i class="fa-sharp fa-solid fa-flag"></i>
                    <i class="fa-solid fa-retweet"></i>
                    <i class="fa-solid fa-heart"></i>
                  </i>
                </footer>
              </article>
      `;
    return markup;
  };
  renderTweets(tweetData);
});