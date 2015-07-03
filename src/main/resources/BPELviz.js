//jsblomp code goes here

jsPlumb.bind("ready", function() {          
  // your jsPlumb related init code goes here
  var firstInstance = jsPlumb.getInstance();
    firstInstance.importDefaults({
      Connector : [ "Straight", { curviness: 150 } ],
      Anchors : [ "BottomCenter", "TopCenter" ]
    });

    firstInstance.connect({
      source:"start", 
      target:"pr-1.sq-1", 
      scope:"someScope" 
    });

    var secondInstance = jsPlumb.getInstance();
      secondInstance.importDefaults({
        Connector : [ "Straight", { curviness: 150 } ],
        Anchors : [ "BottomCenter", "TopCenter" ]
      });
    secondInstance.connect({ 
      source:"pr-1.sq-1", 
      target:"end", 
      scope:"someScope"   
    });
});




// AMD and non-AMD compatiblitiy inspired by http://tkareine.org/blog/2012/08/11/why-javascript-needs-module-definitions/ and https://github.com/blueimp/jQuery-File-Upload/blob/9.5.0/js/jquery.fileupload.js
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        // Register as named AMD module. Anonymous registering causes "Mismatched anonymous define() module" in requirejs 2.9.1 when script is loaded explicitly and then loaded with requirejs
        define(['jquery', 'bootstrap3'], factory);
    } else {
        // traditional browser loading: build restdoc-renderer object "renderer" without dependencies and inject it into window object
        window.renderer = factory(window.jQuery);
    }
}(function($) {
    // divs are nested
    // thus, a tooltip is still being displayed when a child is hovered
    // we hide the old tooltip when a new element is entered
    var currentToolTip = false;

    /**
     * Initialises the DOM elements on the page
     *
     * Has to be called when the DOM elements are available
     *
     * Currently, the DOM elements having the class "shrinkable" are handled
     */
    function initialize() {
        $("button.collapseExpandToggleBtn").on("click", function(e) {
            var element = $(e.delegateTarget);
            var bpelElement = element.parent();

            if (element.hasClass("glyphicon-plus")) {
                // collapsed -> expand it
                element.removeClass("glyphicon-plus").addClass("glyphicon-minus");
                bpelElement.children("div.content").slideDown();
            } else {
                // expanded -> collapse it
                element.removeClass("glyphicon-minus").addClass("glyphicon-plus");
                bpelElement.children("div.content").slideUp();
            }

            // no more further event handling
            return false;
        });

        //manipulating id of components
        $("div.content").on("load", function(e) {
            var element = $(e.delegateTarget);
            var bpelElement = element.parent();
            console.log(element);
            // no more further event handling
            return false;
        });

        // initialize tabs
        $('#SourceTabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        })

        // enable mouseover on elements
        $(".bpel").on("click", function(event) {
            // determine id of element
            var target = $(event.delegateTarget);
            var id = target.attr("class");
            var res = id.split(' ', 2);
            var elName = res.slice(-1)[0];
            var activityName = (elName.split('_', 2)).slice(-1)[0];
            if(elName.indexOf('_') == -1){
              activityName = "process";
            }
            document.getElementById("title").innerHTML = activityName;

            // For todays date;
            Date.prototype.today = function () { 
                return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
            }

            // For the time now
            Date.prototype.timeNow = function () {
                 return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
            }
            var newDate = new Date();
            var datetime = "On: " + newDate.today() + " at " + newDate.timeNow();

            document.getElementById("time").innerHTML = datetime;

            /* show source in "Source Extract" tab */
            var sourceId = "source-" + id;
            sourceId = sourceId.replace(/\./g,'\\.');
            var source = $("#" + sourceId).children().clone();
            $("#SourceExtractTab").empty().append(source);

            // mark the clicked item with another color
            $(".selected").removeClass("selected");
            target.addClass("selected");

            /* highlight source in "Full Source" tab. Doesn't work currently as we don't have the line numbers available */
            // highlight line number
            // $("#FullSource > div > div > table > tbody > tr > td.gutter > div.line.number2").addClass("highlighted")
            // highlight code fragment
            // $("#FullSource > div > div > table > tbody > tr > td.code > div > div.line.number2").addClass("highlighted")

            // don't show source for the parent element, just for the clicked one
            return false;
        });
    }

    var module = {
        initialize: initialize
    }
    return module;
}));
