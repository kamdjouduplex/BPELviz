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
        var flowSeqArray1 = [];
        var flowSeqArray2 = [];
        var flowSeqArray3 = [];
        var scopeSqArray  = [];
        var scopeSqArray1  = [];
        var scopeSqArray2  = [];
        var CatchAllArray1 = [];
        var CatchAllArray2 = [];
       var prArray      = [];
        var startTarget  = [];
        var fhArray      = [];
        for (var i = 0; i < obj.length; i++) {
            var Id = obj[i].id;
            if(Id.indexOf("pr-1.FH-1") == 0){
                var j=0
                while(j<1){
                startTarget.push("pr-1.FH-1");
                j++;
                }
            }
            var validId = eliminateInvalideId(Id);
            console.log(validId);
            if(validId.indexOf("pr") == 0){
                validArray.push(validId);
            }
        };  
        for (var i = 0; i < validArray.length; i++) {
            var Id_1 = validArray[i]
            var validId_0 = getFlowId(Id_1);
            var validId_1 = getFlowSeqId1(Id_1);
            var validId_2 = getFlowSeqId2(Id_1);
            var validId_3 = getFlowSeqId3(Id_1);
            var validId_4 = getFHId(Id_1);
            var validId_5 = getSqScope1(Id_1);
            var validId_6 = getSqScope3(Id_1);
            var validId_7 = getSqScope3(Id_1);
            var validId_8 = getCatchAllAct1(Id_1);
            var validId_9 = getCatchAllAct2(Id_1);
            if(validId_0.indexOf("pr") == 0){
                flowArray.push(validId_0);
            }else if(validId_1.indexOf("pr") == 0){
                flowSeqArray1.push(validId_1);
            }else if(validId_2.indexOf("pr") == 0){
                flowSeqArray2.push(validId_2);
            }else if(validId_3.indexOf("pr") == 0){
                flowSeqArray3.push(validId_3);
            }else if(validId_4.indexOf("pr") == 0){
                fhArray.push(validId_4);
            }else if(validId_5.indexOf("pr") == 0){
                scopeSqArray.push(validId_5);
            }else if(validId_6.indexOf("pr") == 0){
                scopeSqArray1.push(validId_6);
            }else if(validId_7.indexOf("pr") == 0){
                scopeSqArray2.push(validId_7);
            }else if(validId_8.indexOf("pr") == 0){
                CatchAllArray1.push(validId_8);
            }else if(validId_9.indexOf("pr") == 0){
                CatchAllArray2.push(validId_9);
            }else {
                prArray.push(validArray[i]);
            }
            
        };

        /*remove duplicated element from startTarget array*/
        startTarget.push("pr-1.sq-1");    
        startTarget.unshift("start");
        var uniqueTargetArray = [];
        $.each(startTarget, function(i, el){
            if($.inArray(el, uniqueTargetArray) === -1) uniqueTargetArray.push(el);
        });
        //console.log(uniqueTargetArray);
        //console.log(flowSeqArray1);
        //console.log(scopeSqArray);
        console.log(prArray);

        function eliminateInvalideId(id){
            validId = "";

            var myRegex = /partnerLinks|invoke|variables|correlationSets|.wait-1.for|wait-1.until|correlations|copy|messageExchange|toPart|fromParts|links|parent|startCounterValue|finalCounterValue|messageExchange|sources|targets|\.fe-[1-9](\.sc$|\.sc-[1-9]$)|\.fw-([1-9])(\.sq$|\.sq-[1-9]$)|\.FH-([1-9])(catchAll$|\.catchAll-[1-9]$)/i;
            if(myRegex.test(id)){
            }else{
                validId = id;
            }
            return validId;
        }
        function getFlowId(id){
            var flowId = "";
            var flowRegex = /\.(fw|fw-[1-9])\.(receive|assign|reply|empty|rethrow)/i;
            if(flowRegex.test(id)){
                flowId = id;
            }
            return flowId;
        }
        function getFHId(id){
            var fhId = "";
            var fhRegex = /\.fh-[1-9]\.(catchAll|catchAll-[1-9])\.(receive|assign|reply|empty|compensateScope|compensate|rethrow)/i;
            if(fhRegex.test(id)){
                fhId = id;
            }
            return fhId;
        }
        
        function getFlowSeqId1(id){
            var flowSeqId1 = "";
            var flowSequenceRegex1 = /\.fw-[1-9]\.(sq)\.(receive|assign|reply|empty|rethrow)/i;
            if(flowSequenceRegex1.test(id)){
                flowSeqId1 = id;
            }
            return flowSeqId1;
        }
        function getFlowSeqId2(id){
            var flowSeqId2 = "";
            var flowSequenceRegex2 = /\.fw-[1-9]\.(sq-1)\.(receive|assign|reply|empty|rethrow)/i;
            if(flowSequenceRegex2.test(id)){
                flowSeqId2 = id;
            }
            return flowSeqId2;
        }
        function getFlowSeqId3(id){
            var flowSeqId3 = "";
            var flowSequenceRegex3 = /\.fw-[1-9]\.(sq-2)\.(receive|assign|reply|empty|rethrow)/i;
            if(flowSequenceRegex3.test(id)){
                flowSeqId3 = id;
            }
            return flowSeqId3;
        }
        function getSqScope1(id){
            var sqScope1 = "";
            var sqScopeRegex1 = /\.sc-[1-9]\.(sq$|sq-[1-9]$)/i;
            if(sqScopeRegex1.test(id)){
                sqScope1 = id;
            }
            return sqScope1;
        }
        function getSqScope2(id){
            var sqScope2 = "";
            var sqScopeRegex2 = /\.sc-[1-9]\.(sq)\.(receive|assign|reply|empty|rethrow)/i;
            if(sqScopeRegex2.test(id)){
                sqScope2 = id;
            }
            return sqScope2;
        }
        function getSqScope3(id){
            var sqScope3 = "";
            var sqScopeRegex3 = /\.sc-[1-9]\.(sq-1)\.(receive|assign|reply|empty|rethrow)/i;
            if(sqScopeRegex3.test(id)){
                sqScope3 = id;
            }
            return sqScope3;
        }

        function getCatchAllAct1(id){
            var catAll = "";
            var catAllRegex = /\.catchAll\.(receive|assign|reply|empty|rethrow)/i;
            if(catAllRegex.test(id)){
                catAll = id;
            }
            return catAll;
        }
        function getCatchAllAct2(id){
            var catAll = "";
            var catAllRegex = /\.catchAll-[1-9]\.(receive|assign|reply|empty|rethrow)/i;
            if(catAllRegex.test(id)){
                catAll = id;
            }
            return catAll;
        }
        

        //jsblomp code goes here
        jsPlumb.bind("ready", function() {          
          // your jsPlumb related init code goes here
          /* jsplomb code for the start link*/
          var firstInstance = jsPlumb.getInstance();
            firstInstance.importDefaults({
              Connector : [ "Straight", { curviness: 150 } ],
              Anchors : [ "BottomCenter", "TopCenter" ]
            });
            for (var i = 0; i < uniqueTargetArray.length; i++) {
                firstInstance.connect({
                    source: uniqueTargetArray[i],
                    target: uniqueTargetArray[i+1],
                    scope: "someScope"
                })
            };

            /* jsplomb code for the end link*/
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
            
            /* jsplomb code for all the internal process link*/
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
            
            /*var flowConnection = jsPlumb.getInstance();
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
            };*/

            /* jsplomb code for the first flow sequence link*/
            var flowSeqConnection1 = jsPlumb.getInstance();
            flowSeqConnection1.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < flowSeqArray1.length; i++) {
                flowSeqConnection1.connect({
                    source: flowSeqArray1[i],
                    target: flowSeqArray1[i+1],
                    scope: "someScope"
                })
            };

            /* jsplomb code for the second flow sequence link*/
            var flowSeqConnection2 = jsPlumb.getInstance();
            flowSeqConnection2.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < flowSeqArray2.length; i++) {
                flowSeqConnection2.connect({
                    source: flowSeqArray2[i],
                    target: flowSeqArray2[i+1],
                    scope: "someScope"
                })
            };

            /* jsplomb code for the tirdth flow sequence link*/
            var flowSeqConnection3 = jsPlumb.getInstance();
            flowSeqConnection3.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < flowSeqArray3.length; i++) {
                flowSeqConnection3.connect({
                    source: flowSeqArray3[i],
                    target: flowSeqArray3[i+1],
                    scope: "someScope"
                })
            };

            /* jsplomb code for the fault handler link*/
            var fhConnection = jsPlumb.getInstance();
            fhConnection.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < fhArray.length; i++) {
                fhConnection.connect({
                    source: fhArray[i],
                    target: fhArray[i+1],
                    scope: "someScope"
                })
            };

            /* jsplomb code for the sequence of scope link*/
            var scopeSqConnection = jsPlumb.getInstance();
            scopeSqConnection.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < scopeSqArray.length; i++) {
                scopeSqConnection.connect({
                    source: scopeSqArray[i],
                    target: scopeSqArray[i+1],
                    scope: "someScope"
                })
            };

            /* jsplomb code for the sequence1 of scope link*/
            var scopeSqConnection1 = jsPlumb.getInstance();
            scopeSqConnection1.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < scopeSqArray1.length; i++) {
                scopeSqConnection1.connect({
                    source: scopeSqArray1[i],
                    target: scopeSqArray1[i+1],
                    scope: "someScope"
                })
            };
CatchAllArray1
            /* jsplomb code for the sequence2 of scope link*/
            var scopeSqConnection2 = jsPlumb.getInstance();
            scopeSqConnection2.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < scopeSqArray2.length; i++) {
                scopeSqConnection2.connect({
                    source: scopeSqArray2[i],
                    target: scopeSqArray2[i+1],
                    scope: "someScope"
                })
            };

            /* jsplomb code for the sequence2 of scope link*/
            var catchAllConnection1 = jsPlumb.getInstance();
            catchAllConnection1.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < CatchAllArray1.length; i++) {
                catchAllConnection1.connect({
                    source: CatchAllArray1[i],
                    target: CatchAllArray1[i+1],
                    scope: "someScope"
                })
            };
            /* jsplomb code for the sequence2 of scope link*/
            var catchAllConnection2 = jsPlumb.getInstance();
            catchAllConnection2.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < CatchAllArray2.length; i++) {
                catchAllConnection2.connect({
                    source: CatchAllArray2[i],
                    target: CatchAllArray2[i+1],
                    scope: "someScope"
                })
            };

        });

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

            return false;
        });
    }

    var module = {
        initialize: initialize
    }
    return module;
}));

/*function hasMoreThanOneSq(id){
            var flowSequenceRegex  = /\.fw-[1-9]\.(sq-[1-9])\.(receive|assign|reply|empty)/i;
            if(flowSequenceRegex.test(id)){
                var arr = id.split("."); 
                for(var i=0;i<arr.length;i++){ 
                    if(i>1){ 
                        if(arr[i].indexOf("fw") > -1){
                            if(arr[i+1].indexOf("sq") > -1){
                                var n = arr[i+1].split("-")[1];
                            }
                        }
                    }
                }
            }
            if (n>1) {
                return true;
            };
        }*/