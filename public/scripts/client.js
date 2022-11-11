/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('#input-button').click(function() {
    if ($('form').css('display') === 'none') {
      $('form').slideDown();
      $('#tweet-text').focus();
      return;
    }
    return $('form').slideUp();
  })

  //rendering function to append user data onto the webpage
  const renderTweets = function(tweets) {
    console.log(tweets);
    if (Array.isArray(tweets)) {
      for (const tweet of tweets) {
        const $tweet = createTweetElement(tweet);
        $('#tweet-container').prepend($tweet);
      }
    }
    if (!Array.isArray(tweets)) {
      $('#tweet-container').prepend(createTweetElement(tweets));
    }
  };
  //escape function
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // new html markup adding function
  const createTweetElement = function(data) {
    const userInfo = data.user;
    const markup = `
      <article class="tweet">
        <header class="space-between">               
          <div>
            <img src="${(userInfo.avatars)}" alt="user-avatar">
            &nbsp;${userInfo.name}
          </div>
          <span>
            ${userInfo.handle}
          </span>
        </header>
          <p>${escape(data.content.text)}</p>
        <footer class="space-between">
          <div>
            ${timeago.format(data.created_at)}
          </div>
          <i>
            <i class="fa-sharp fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </i>
        </footer>
      </article>
      <br>
    `;
    return markup;
  };

  const loadtweets = function() {
    $.get({
      url:'/tweets',
    })
      .then(function(userData) {
        renderTweets(userData);
      });
  };

  loadtweets();

  $('form').submit(function(event) {
    event.preventDefault();
    const dataSer = $(this).serialize();
    let countSpace = dataSer.split('%20').length - 1;
    let textLength = dataSer.length - countSpace * 2;
    console.log(textLength);


    if (dataSer === 'text=') {
      $('#error-message2').slideUp();
      return $('#error-message1').slideDown();
    }
    if (textLength > 145) {
      $('#error-message1').slideUp();
      return $('#error-message2').slideDown();
    }
    $('.error-message').slideUp();
    $.post({
      url: '/tweets',
      data: dataSer,
    })
      .then(() => {
        $.get({
          url:'/tweets',
        })
          .then(function(userData) {
            renderTweets(userData[userData.length - 1]);
          });
      });
  });
});