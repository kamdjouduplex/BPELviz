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
        var obj = $( "div#parent" ).find("*");
        
        var validArray   = [];
        var flowArray    = [];
        var flowSeqArray = [];
        var prArray      = [];
        for (var i = 0; i < obj.length; i++) {
            var Id = obj[i].id;
            var validId = eliminateInvalideId(Id);
            if(validId.indexOf("pr") == 0){
                validArray.push(validId);
            }
        };  
        for (var i = 0; i < validArray.length; i++) {
            var Id_1 = validArray[i]
            var validId_1 = getFlowId(Id_1);
            var validId_2 = getFlowSeqId(Id_1);
            if(validId_1.indexOf("pr") == 0){
                flowArray.push(validId_1);
            }else
            if(validId_2.indexOf("pr") == 0){
                flowSeqArray.push(validId_2);
            }else {
                prArray.push(validArray[i]);
            }
            
        };

            
       console.log(flowArray);
       console.log(flowSeqArray);
       console.log(prArray);

        function eliminateInvalideId(id){
            validId = "";

            var myRegex = /partnerLinks|variables|correlationSets|correlations|copy|links|parent|sources|targets|\.fw-([1-9])($|\.sq$)/i;
            if(myRegex.test(id)){
            }else{
                validId = id;
            }
            return validId;
        }
        function getFlowId(id){
            var flowId = "";
            var flowRegex = /\.fw-[1-9]\.(receive|assign|reply|empty)/i;
            if(flowRegex.test(id)){
                flowId = id;
            }
            return flowId;
        }
        function getFlowSeqId(id){
            var flowSeqId = "";
            var flowSequenceRegex  = /\.fw-[1-9]\.(sq|sq-[1-9])\.(receive|assign|reply|empty)/i;
            if(flowSequenceRegex.test(id)){
                flowSeqId = id;
            }
            return flowSeqId;
        }

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
            

            var interconnection = jsPlumb.getInstance();
            interconnection.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < prArray.length; i++) {
                interconnection.connect({
                    source: prArray[i],
                    target: prArray[i+1],
                    scope: "someScope"
                })
            };
            
            var flowConnection = jsPlumb.getInstance();
            flowConnection.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < flowArray.length; i++) {
                flowConnection.connect({
                    source: flowArray[i],
                    target: flowArray[i+1],
                    scope: "someScope"
                })
            };
            var flowSeqConnection = jsPlumb.getInstance();
            flowSeqConnection.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < flowSeqArray.length; i++) {
                flowSeqConnection.connect({
                    source: flowSeqArray[i],
                    target: flowSeqArray[i+1],
                    scope: "someScope"
                })
            };
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
