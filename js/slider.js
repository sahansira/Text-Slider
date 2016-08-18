/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @sahanhaz
 * Further changes, comments: @sahanhaz
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "slider",
        defaults = {
            text : "hazslider",
            delay : 300
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init(this.element);
    }

    Plugin.prototype = {

        init: function(element) {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).

            var element = $(element),
                textToShow = [],
                textCount;
            for (var i = 0, len = this.options.text.length; i < len; i++) {
              textToShow.push(this.options.text[i]);
              textCount = i+1;
            }
            element.width(textCount*32);
            Plugin.prototype.addEachLetterBlocks(element , textToShow , textCount);
            Plugin.prototype.randomStart(element , textToShow , textCount);
            Plugin.prototype.randomMoment(element , textCount , this.options.delay);
        },
        // Add text blocks to each slider blocks.text blocks are the sliding element which containing letters of each blocks.
        addEachLetterBlocks: function(element , textToShow , textCount) {
            var letterBlock = "";
            for (var i = 0, len = textToShow.length; i < len; i++) {
              letterBlock +=  '<span class="'+i+'">'+textToShow[i]+'</span>';
            }
            var fullBlock = '<div class="banner-block"><div class="main-block"></div><div class="letter-slider">'+letterBlock+''+letterBlock+'</div></div>';
            for (var i = 0, len = textCount; i < len; i++) {
              element.append(fullBlock);
            }
        },
        //Get random starting letter for each text block.
        randomStart: function(element , textToShow , textCount) {
            var blockTop = 0;
            element.find('.banner-block').each(function () {
                blockTop = (Plugin.prototype.rand(textCount)+1)*-57;
                $(this).find('.letter-slider').css('top',blockTop);
            });
        },
        //Give a random movment for every text block 
        randomMoment: function(element , textCount , delay) {
            element.find('.banner-block').each(function () {
                var direction = Plugin.prototype.rand(2),
                    index = $(this).index(),
                    slider = $(this).find('.letter-slider');
                if(direction == 0) {
                    $(this).addClass('down');
                    var bottom = (index*-57);
                    $(this).find('.letter-slider').animate( {top: bottom} , delay);
                }
                else {
                    $(this).addClass('up');
                    var bottom = (index*57);
                    $(this).find('.letter-slider').animate( {top: '-'+bottom} , delay);
                }
            });
        },
        rand: function(lastCount) {
            var count = Math.floor((Math.random() * lastCount-1));
            return count;
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
