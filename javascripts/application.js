$(function() {
  $book = $('.book');
  var pages = $book.children().length; // assumes only one book
  var pagesFlipped = 0;
  var $leftPage = null;
  var $rightPage = $($book.children()[0]);
  
  $book.children('.sheet').click(function() {
    var $this = $(this);
    if ($this.hasClass("flipped")) {
      ///////////////////////////////////////////////////////
      // Flipping back (page moves to the right)
      pagesFlipped--;
      
      // Move left page to front
      $leftPage = $this.prev();
      if ($leftPage) {
        $leftPage.css({
          "-webkit-transform": "translateZ(0) rotate3d(0,1,0, -180deg)",
          "z-index": "1"
        });
      }
      // Move right page slightly back
      if ($rightPage) {
        $rightPage.css({
          "-webkit-transform": "translateZ(-3px)",
          "z-index": "1"
        });
      }
      $rightPage = $this;

      // Flip it to the right
      $this.css({
        "-webkit-transform": "translateZ(0)",
        "z-index": "2"
      });
      $this.removeClass("flipped");
    
    } else { 
      ///////////////////////////////////////////////////////
      // Flipping forward (page moves to the left)
      pagesFlipped++;
      // Move left page slightly back
      if ($leftPage) {
        $leftPage.css({
          "-webkit-transform": "translateZ(-3px) rotate3d(0,1,0, -180deg)",
          "z-index": "1"
        });
      }
      // Move right page to the front
      $rightPage = $this.next();
      if ($rightPage) {
        $rightPage.css({
          "-webkit-transform": "translateZ(0)",
          "z-index": "1"
        });
      }
      $leftPage = $this;

      // Flip it to the left
      $this.css({
        "-webkit-transform": "translateZ(0) rotate3d(0,1,0, -180deg)",
        "z-index": "2"
      });
      $this.addClass("flipped");
    }
    
    if ($($this.children()[0]).hasClass("cover") ) { // if first child is the cover
      // Open or close the book
      $($this.parent()).toggleClass("opened", $this.hasClass("flipped"));
    }
  });
});
