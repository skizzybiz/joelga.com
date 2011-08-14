$(function() {
  $book = $('.book'); // Assumes only one book on the page
  var $leftPage = null;
  var $rightPage = $($book.children()[0]);
  
  ///////////////////////////////////////////////////////
  // Flipping forward (page moves to the left)
  function flipForward() {
    if (!$rightPage) return;
    $page = $rightPage;
    
    // Move left page slightly back
    if ($leftPage) {
      $leftPage.css({
        "-webkit-transform": "translateZ(-3px) rotate3d(0,1,0, -180deg)",
        "z-index": "1"
      });
    }
    // Move right page to the front
    $rightPage = $page.next();
    if ($rightPage) {
      $rightPage.css({
        "-webkit-transform": "translateZ(0)",
        "z-index": "4"
      });
    }
    $leftPage = $page;

    // Flip it to the left
    $page.css({
      "-webkit-transform": "translateZ(0) rotate3d(0,1,0, -180deg)",
      "z-index": "4"
    });
    $page.addClass("flipped");
    
    toggleOpenedIfCover($page);
  }
  
  ///////////////////////////////////////////////////////
  // Flipping back (page moves to the right)
  function flipBack() {
    if (!$leftPage) return;
    $page = $leftPage;
    
    // Move left page to front
    $leftPage = $page.prev();
    if ($leftPage) {
      $leftPage.css({
        "-webkit-transform": "translateZ(0) rotate3d(0,1,0, -180deg)",
        "z-index": "4"
      });
    }
    // Move right page slightly back
    if ($rightPage) {
      $rightPage.css({
        "-webkit-transform": "translateZ(-3px)",
        "z-index": "1"
      });
    }
    $rightPage = $page;

    // Flip it to the right
    $page.css({
      "-webkit-transform": "translateZ(0)",
      "z-index": "4"
    });
    $page.removeClass("flipped");
    
    toggleOpenedIfCover($page);
  }
  
  // Checks the page to see if it's the front cover, and if so, opens or
  // closes the book.
  function toggleOpenedIfCover($page) {
    if ($($page.children()[0]).hasClass("cover") ) { // if first child is the cover
      // Open or close the book
      $($page.parent()).toggleClass("opened", $page.hasClass("flipped"));
    }
  }
  
  // Click handlers for sheets
  $book.children('.sheet').click(function() {
    if ($(this).hasClass("flipped")) flipBack();
    else flipForward();
  });
  
  // Left and right arrow keyboard handlers
  $(document).keyup(function(event) {
    if (event.keyCode == '39') {
      flipForward();
    } else if (event.keyCode == '37') {
      flipBack();
    }
  });
});
