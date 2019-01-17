
var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];

//original colourNameToHex code from
//http://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
function colourNameToHex(colour) {
		//TODO, colors with more than one word
    var colours = {
    	"antique":"#faebd7",
    	"aqua":"#00ffff",
    	"aquamarine":"#7fffd4",
    	"azure":"#f0ffff",
    	"beige":"#f5f5dc",
    	"bisque":"#ffe4c4",
    	"black":"#000000",
    	"blue":"#0000ff",
    	"brown":"#a52a2a",
    	"burlywood":"#deb887",
    	"chartreuse":"#7fff00",
    	"chocolate":"#d2691e",
    	"coral":"#ff7f50",
    	"crimson":"#dc143c",
    	"cyan":"#00ffff",
    	"fire":"#b22222",
      "forest":"#228b22",
    	"fuchsia":"#ff00ff",
    	"gainsboro":"#dcdcdc",
    	"ghost":"#f8f8ff",
    	"gold":"#ffd700",
    	"gray":"#808080",
    	"grey":"#808080",
    	"green":"#008000",
    	"honeydew":"#f0fff0",
    	"indigo":"#4b0082",
    	"ivory":"#fffff0",
    	"khaki":"#f0e68c",
    	"lavender":"#e6e6fa",
      "lawn":"#7cfc00",
      "lemon":"#fffacd",
    	"lime":"#00ff00",
    	"linen":"#faf0e6",
    	"magenta":"#ff00ff",
    	"maroon":"#800000",
      "midnight":"#191970",
      "mint":"#f5fffa",
      "navy":"#000080",
    	"olive":"#808000",
    	"orange":"#ffa500",
    	"orchid":"#da70d6",
      "papaya":"#ffefd5",
      "peach":"#ffdab9",
    	"pink":"#ffc0cb",
    	"plum":"#dda0dd",
    	"purple":"#800080",
    	"red":"#ff0000",
    	"salmon":"#fa8072",
      "seashell":"#fff5ee",
    	"sienna":"#a0522d",
    	"silver":"#c0c0c0",
    	"sky":"#87ceeb",
    	"snow":"#fffafa",
    	"tan":"#d2b48c",
    	"teal":"#008080",
    	"thistle":"#d8bfd8",
    	"tomato":"#ff6347",
    	"turquoise":"#40e0d0",
    	"violet":"#ee82ee",
    	"wheat":"#f5deb3",
    	"white":"#ffffff",
    	"yellow":"#ffff00"
  	};
    if (typeof colours[colour] != 'undefined'){
        return colours[colour];
    }
    return false;
}
//end code from 
//http://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes

