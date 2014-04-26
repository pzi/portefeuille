`
# = require ../../bower_components/jquery/dist/jquery.min.js
# = require ../../bower_components/smoothscroll/dist/smoothscroll.js
# = require ../../bower_components/jquery.scrollTo/jquery.scrollTo.min.js
# = require ../../bower_components/jquery.localScroll/jquery.localScroll.min.js
`

# Initialize all .smoothScroll links
jQuery ($) -> $.localScroll filter:'.smoothScroll'
