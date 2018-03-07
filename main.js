function monthIntToStr( x ) {
  if( x === 0 ) return 'Jan';
  if( x === 1 ) return 'Feb';
  if( x === 2 ) return 'Mar';
  if( x === 3 ) return 'Apr';
  if( x === 4 ) return 'May';
  if( x === 5 ) return 'Jun';
  if( x === 6 ) return 'Jul';
  if( x === 7 ) return 'Aug';
  if( x === 8 ) return 'Sep';
  if( x === 9 ) return 'Oct';
  if( x === 10 ) return 'Nov';
  if( x === 11 ) return 'Dec';
}

function addTweet( tweetString ) {
  var x = new Date();
  var month = monthIntToStr( x.getMonth() );
  var date = x.getDate();
  var htmlString = `
  <div class="message-container">   <!-- Tweet 2 -->
    <div class="message-container-header">
      <img src="https://image.flaticon.com/icons/svg/23/23931.svg" height="100" width="100"/>
      <div class="tweet-container">
        <div class="tweet-container-header">
          <span class="display-name">You</span>
          <span class="handle-name">@McDonald</span>
          <span class="tweet-date">${month} ${date}</span>
          <div class="tweet-msg">${tweetString}</div>
        </div>
        <div class="tweet-container-controls">
          <a href='#' class="tweet-expand-info">Expand</a>
          <a href='#' class="show-tweet-control-hover collapse">Favorite</a>
          <a href='#' class="show-tweet-control-hover collapse">Retweet</a>
          <a href='#' class="show-tweet-control-hover collapse">Reply</a>
        </div>
      </div>
    </div>
    <div class="message-container-info collapse">
      <strong class="tweet-retweets  med-number">0</strong> <span class="sm-text">Retweets</span>
      <strong class="tweet-favorites med-number">0</strong> <span class="sm-text">Favorites</span>
      <span class="tweet-info-pics"></span>
    </div>
  </div>
  `;
  $('#message-list-container').prepend( htmlString );
  $('#tweet-input-box').val( '' );
  $('#submit-container').addClass( 'collapse' );
}

$('document').ready( function() {
  $('.submit-button').on( 'click', function(e) {
    e.preventDefault;
    $('.search-bar').val( '' );
  });
  
  var charCount = 0;
  $('#tweet-input-box').on( 'focus', function() {
    $('#submit-container').removeClass( 'collapse' );
  });

  $('#tweet-input-box').on( 'focusout', function() {
    if( charCount <= 0 ) $('#submit-container').addClass( 'collapse' );
  });

  $('#tweet-input-box').on( 'keyup', function() {
    charCount = $('#tweet-input-box').val().length;
    $('#char-count').text( charCount );
    if( charCount > 140 ) {
      $('#tweet-input-box').addClass( 'error' );
      $('#char-count').addClass( 'error-text' );
      $('#char-error-text').removeClass( 'collapse' );
    }
    else {
      $('#tweet-input-box').removeClass( 'error' );
      $('#char-count').removeClass( 'error-text' );
      $('#char-error-text').addClass( 'collapse' );
    }
  });
  
  $('#input-submit-button').on( 'click', function(e) {
    e.preventDefault();
    if( charCount <= 140 ) {
      addTweet( $('#tweet-input-box').val() );
    }
  });
  
  $('#message-list-container').on( 'mouseenter', '.message-container', function() {
    $(this).find( '.show-tweet-control-hover' ).removeClass( 'collapse' );
  });
  
  $('#message-list-container').on( 'mouseleave', '.message-container', function() {
    $(this).find( '.show-tweet-control-hover' ).addClass( 'collapse' );
  });
  
  $('#message-list-container').on( 'click', '.tweet-expand-info', function() {
    if( $(this).text() === "Expand" ) {
      $(this).closest( '.message-container' ).children( '.message-container-info' ).removeClass( 'collapse' );
      $(this).text( "Collapse" )
    }
    else {
      $(this).closest( '.message-container' ).children( '.message-container-info' ).addClass( 'collapse' );
      $(this).text( "Expand" )
    }
  });
});
