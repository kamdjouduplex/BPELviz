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
        
        // get all the div parent elements and store them in the var obj.
        var obj = $( "div#processContainer" ).find("*");
        
        // this part of the code handle all the cases where there is flow component with 
        //links. So, we are getting all the source and target link in the flow here.
        var linkObj = [];
        //console.log(links);
        //console.log(lines);
        for (var i = 0; i < lines.length; i++) {
            for (var j = 0; j < links.length; j++) {
                if (lines[i] === links[j]) {
                    linkObj.push(links[j-1]);
                    break;
                };
            };
        };


        //console.log(linkObj);


        // declaration of all the arrays used to sotre the id of each instance of the jsPlumb connection.
        var prRootIdsArray  = [];
        var sqRootIdsArray  = [];
        var scRootIdsArray  = [];
        var piRootIdsArray  = [];
        /*var flowArray       = [];
        var flowSeqArray1   = [];
        var flowSeqArray2   = [];
        var flowSeqArray3   = [];
        var scopeSqArray    = [];
        var scopeSqArray1   = [];
        var scopeSqArray2   = [];
        var CatchAllArray1  = [];
        var CatchAllArray2  = [];
        var prArray         = [];
        var startTarget     = [];
        var fhArray         = [];*/

        // we declare a variable that will call the function eliminateivalidId and store it returning value
        
        for (var i = 0; i < obj.length; i++) {
            var Id = obj[i].id;
            var prRootIdRegex = /^(pr-[1-9]).(receive|assign|reply|invoke|empty|rethrow|catchAll|catch|compensate|exit|compensateScope|throw|validate|wait|if|extensionActivity|sq|sc|CH|else|elif|EH|FH|fw|fe|oA|oE|oM|pi|pr|ru|TH|w)($|-[1-9]$)/i;
            var sqRootIdRegex = /sq(|-[1-9]).(receive|assign|reply|invoke|empty|rethrow|catchAll|catch|compensate|exit|compensateScope|throw|validate|wait|if|extensionActivity|sq|sc|CH|else|elif|EH|FH|fw|fe|oA|oE|oM|pi|pr|ru|TH|w)($|-[1-9]$)/i;
            var scRootIdRegex = /sc(|-[1-9]).(receive|assign|reply|invoke|empty|rethrow|catchAll|catch|compensate|exit|compensateScope|throw|validate|wait|if|extensionActivity|sq|sc|CH|else|elif|EH|FH|fw|fe|oA|oE|oM|pi|pr|ru|TH|w)($|-[1-9]$)/i;
            var piRootIdRegex = /pi(|-[1-9]).(|receive|assign|reply|invoke|empty|rethrow|catchAll|catch|compensate|exit|compensateScope|throw|validate|wait|if|extensionActivity|sq|sc|CH|else|elif|EH|FH|fw|fe|oA|oE|oM|pi|pr|ru|TH|w)($|-[1-9]$)/i;
            if(prRootIdRegex.test(Id)){
                prRootIdsArray.push(Id);
            }else if(sqRootIdRegex.test(Id)){
                sqRootIdsArray.push(Id);
            }else if(scRootIdRegex.test(Id)){
                scRootIdsArray.push(Id);
            }else if(piRootIdRegex.test(Id)){
                piRootIdsArray.push(Id);
            }
        };   
                
console.log(piRootIdsArray);
        var sqArray1 = [];
        var sqArray2 = [];
        var sqArray3 = [];
        var sqArray4 = [];
        var sqArray5 = [];
        var prev     = "";
        for (var i = 0; i < sqRootIdsArray.length; i++) {
            var Id = sqRootIdsArray[i]
            var occurence = Id.match(/sq/g).length;
            switch(occurence){
                case 1:
                    /*var res = Id.split(".");
                    sqArray1.push(Id);
                    if(prev === ""){
                        sqArray1.push(Id);
                    }else if(prev === res[res.length-2]){
                        sqArray1.push(Id);
                    }else{
                        sqArray3.push(Id);
                    }
                    prev = res[res.length-2]*/
                    sqArray1.push(Id);
                    break;
                case 2:
                    var regex1 = /sq\./;
                    if(regex1.test(Id)){
                        sqArray2.push(Id);
                    }else{
                        sqArray3.push(Id);
                    }
                    break;
                case 3:
                    var regex1 = /sq\./;
                    var regex2 = /sq-1/;
                    if(regex1.test(Id)){
                        sqArray2.push(Id);
                    }else if(regex2.test(Id)){
                        sqArray3.push(Id);
                    }else{
                        sqArray4.push(Id);
                    }
                    break;
                case 4:
                    var regex1 = /sq\./;
                    var regex2 = /sq-1/;
                    var regex3 = /sq-2/;
                    if(regex1.test(Id)){
                        sqArray2.push(Id);
                    }else if(regex2.test(Id)){
                        sqArray3.push(Id);
                    }else if(regex3.test(Id)){
                        sqArray4.push(Id);
                    }else{
                        sqArray5.push(Id);
                    }
                    break;
                default:
                break;
            }
        };

console.log("1= "+sqArray1);
console.log("2= "+sqArray2);
console.log("3= "+sqArray3);
console.log("4= "+sqArray4);
console.log("5= "+sqArray5);

        var scArray1 = [];
        var scArray1 = [];
        var scArray2 = [];
        var scArray3 = [];
        var scArray4 = [];
        var scArray5 = [];
        for (var i = 0; i < scRootIdsArray.length; i++) {
             var Id = scRootIdsArray[i]
             var occurence = Id.match(/sc/g);
             switch(occurence.length){
                case 1:
                    scArray1.push(Id);
                    break;
                case 2:
                    scArray2.push(Id);
                    break;
                case 3:
                    scArray3.push(Id);
                    break;
                case 4:
                    scArray4.push(Id);
                    break;
                case 5:
                    scArray5.push(Id);
                default:
                    break;
             }
         }; 

        /*var piArray1 = [];
        var piArray1 = [];
        var piArray2 = [];
        var piArray3 = [];
        var piArray4 = [];
        var piArray5 = [];
        for (var i = 0; i < piRootIdsArray.length; i++) {
             var Id = piRootIdsArray[i]
             var occurence = Id.match(/pi/g);
             switch(occurence){
                             case 1:
                                 /*var res = Id.split(".");
                                 sqArray1.push(Id);
                                 if(prev === ""){
                                     sqArray1.push(Id);
                                 }else if(prev === res[res.length-2]){
                                     sqArray1.push(Id);
                                 }else{
                                     sqArray3.push(Id);
                                 }
                                 prev = res[res.length-2]
                                 piArray1.push(Id);
                                 break;
                             case 2:
                                 var regex1 = /pi\./;
                                 if(regex1.test(Id)){
                                     piArray2.push(Id);
                                 }else{
                                     piArray3.push(Id);
                                 }
                                 break;
                             case 3:
                                 var regex1 = /pi\./;
                                 var regex2 = /pi-1/;
                                 if(regex1.test(Id)){
                                     piArray2.push(Id);
                                 }else if(regex2.test(Id)){
                                     piArray3.push(Id);
                                 }else{
                                     piArray4.push(Id);
                                 }
                                 break;
                             case 4:
                                 var regex1 = /pi\./;
                                 var regex2 = /pi-1/;
                                 var regex3 = /pi-2/;
                                 if(regex1.test(Id)){
                                     piArray2.push(Id);
                                 }else if(regex2.test(Id)){
                                     piArray3.push(Id);
                                 }else if(regex3.test(Id)){
                                     piArray4.push(Id);
                                 }else{
                                     piArray5.push(Id);
                                 }
                                 break;
                             default:
                             break;
                         }

         /*var validId = eliminateInvalideId(Id);
            if(validId.indexOf("pr") == 0){
                validArray.push(validId);
            }*/
            /*if(Id.indexOf("pr-1.FH-1") == 0){
                var j=0
                while(j<1){
                startTarget.push("pr-1.FH-1");
                j++;
                }
            }*/
        

        
        /*for (var i = 0; i < validArray.length; i++) {
            var Id_1 = validArray[i]
            var prRootId  = getProcessRootIds(Id_1);
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
                prRootIdsArray.push(prRootId);
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
            
        };*/  
     //   console.log(prRootIdsArray);
       // console.log(sqRootIdsArray);
        // eliminating all the invalid Ids
        /*function eliminateInvalideId(id){
            validId = "";

            var myRegex = /partnerLinks|variables|correlationSets|correlations|copy|toPart|fromParts|links|parent|startCounterValue|finalCounterValue|messageExchange|sources|targets/i;
            if(myRegex.test(id)){
            }else{
                validId = id;
            }
            return validId;
        }

        // this array is to store all the process that are at the root of the process
        function getProcessRootIds(id){
            var rootId = "";
            var rootIdRegex = /^(pr-[1-9]).(receive|assign|reply|invoke|empty|rethrow|catchAll|catch|compensate|exit|compensateScope|throw|validate|wait|if|extensionActivity|sq|sc|CH|else|elif|EH|FH|fw|fe|oA|oE|oM|pi|pr|ru|TH|w)($|-[1-9]$)/i;
            if(rootIdRegex.test(id)){
                rootId = id;
            }
            return rootId;
        }*/
        /*remove duplicated element from startTarget array
        startTarget.push("pr-1.sq-1");    
        startTarget.unshift("start");
        var uniqueTargetArray = [];
        $.each(startTarget, function(i, el){
            if($.inArray(el, uniqueTargetArray) === -1) uniqueTargetArray.push(el);
        });
        //console.log(uniqueTargetArray);
        console.log(flowSeqArray1);
        console.log(scopeSqArray);
        console.log(prArray);*/

        
        /*function getFlowId(id){
            var flowId = "";
            var flowRegex = /\.(fw|fw-[1-9])\.(receive|assign|reply|invoke|empty|rethrow)/i;
            if(flowRegex.test(id)){
                flowId = id;
            }
            return flowId;
        }
        function getFHId(id){
            var fhId = "";
            var fhRegex = /\.fh-[1-9]\.(catchAll|catchAll-[1-9])\.(receive|assign|invoke|reply|empty|compensateScope|compensate|rethrow)/i;
            if(fhRegex.test(id)){
                fhId = id;
            }
            return fhId;
        }
        
        function getFlowSeqId1(id){
            var flowSeqId1 = "";
            var flowSequenceRegex1 = /\.fw-[1-9]\.(sq)\.(receive|assign|reply|invoke|empty|rethrow)/i;
            if(flowSequenceRegex1.test(id)){
                flowSeqId1 = id;
            }
            return flowSeqId1;
        }
        function getFlowSeqId2(id){
            var flowSeqId2 = "";
            var flowSequenceRegex2 = /\.fw-[1-9]\.(sq-1)\.(receive|assign|reply|empty|invoke|rethrow)/i;
            if(flowSequenceRegex2.test(id)){
                flowSeqId2 = id;
            }
            return flowSeqId2;
        }
        function getFlowSeqId3(id){
            var flowSeqId3 = "";
            var flowSequenceRegex3 = /\.fw-[1-9]\.(sq-2)\.(receive|assign|reply|invoke|empty|rethrow)/i;
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
            var sqScopeRegex2 = /\.sc-[1-9]\.(sq)\.(receive|assign|reply|empty|invoke|rethrow)/i;
            if(sqScopeRegex2.test(id)){
                sqScope2 = id;
            }
            return sqScope2;
        }
        function getSqScope3(id){
            var sqScope3 = "";
            var sqScopeRegex3 = /\.sc-[1-9]\.(sq-1)\.(receive|assign|invoke|reply|empty|rethrow)/i;
            if(sqScopeRegex3.test(id)){
                sqScope3 = id;
            }
            return sqScope3;
        }

        function getCatchAllAct1(id){
            var catAll = "";
            var catAllRegex = /\.catchAll\.(receive|assign|reply|empty|invoke|rethrow)/i;
            if(catAllRegex.test(id)){
                catAll = id;
            }
            return catAll;
        }
        function getCatchAllAct2(id){
            var catAll = "";
            var catAllRegex = /\.catchAll-[1-9]\.(receive|assign|reply|invoke|empty|rethrow)/i;
            if(catAllRegex.test(id)){
                catAll = id;
            }
            return catAll;
        }*/
        
        
        
        

        //jsblomp code goes here
        jsPlumb.bind("ready", function() {        
          // jsplomb code for all the elements that are directly under the root element of the process
            var prRootIdsConnection = jsPlumb.getInstance();
            prRootIdsConnection.importDefaults({
              Connector : [ "Straight", { curviness: 150 } ],
              Anchors : [ "BottomCenter", "TopCenter" ],
            });
            for (var i = 0; i < prRootIdsArray.length; i++) {
                prRootIdsConnection.connect({
                    source: prRootIdsArray[i],
                    target: prRootIdsArray[i+1],
                    overlays:[["Arrow" , { width:25, length:25, location:1 }]] 
                })
            };

            // jsplomb code for the start link
            var startconnection = jsPlumb.getInstance();
            startconnection.importDefaults({
                Connector : [ "Straight", { curviness: 150 } ],
                Anchors : [ "BottomCenter", "TopCenter" ]
            });
            startconnection.connect({ 
              source: "start", 
              target: prRootIdsArray[0], 
              overlays:[["Arrow" , { width:25, length:25, location:1 }]]   
            });

            // jsplomb code for the end link
            var lastArrayItem = prRootIdsArray.length-1;
            var endconnection = jsPlumb.getInstance();
            endconnection.importDefaults({
                Connector : [ "Straight", { curviness: 150 } ],
                Anchors : [ "BottomCenter", "TopCenter" ]
            });
            endconnection.connect({ 
              source: prRootIdsArray[lastArrayItem], 
              target:"end", 
              overlays:[["Arrow" , { width:25, length:25, location:1 }]]    
            });
          
          // jsplomb code for all the elements that are directly under the root element of the sequence
            var sqConnection1 = jsPlumb.getInstance();
            sqConnection1.importDefaults({
              Connector : [ "Straight", { curviness: 150 } ],
              Anchors : [ "BottomCenter", "TopCenter" ],
            });
            for (var i = 0; i < sqArray1.length; i++) {
                sqConnection1.connect({
                    source: sqArray1[i],
                    target: sqArray1[i+1],
                    overlays:[["Arrow" , { width:25, length:25, location:1 }]] 
                })
            };
            var sqConnection2 = jsPlumb.getInstance();
            sqConnection2.importDefaults({
              Connector : [ "Straight", { curviness: 150 } ],
              Anchors : [ "BottomCenter", "TopCenter" ],
            });
            for (var i = 0; i < sqArray2.length; i++) {
                sqConnection2.connect({
                    source: sqArray2[i],
                    target: sqArray2[i+1],
                    overlays:[["Arrow" , { width:25, length:25, location:1 }]] 
                })
            };
            var sqConnection3 = jsPlumb.getInstance();
            sqConnection3.importDefaults({
              Connector : [ "Straight", { curviness: 150 } ],
              Anchors : [ "BottomCenter", "TopCenter" ],
            });
            for (var i = 0; i < sqArray3.length; i++) {
                sqConnection3.connect({
                    source: sqArray3[i],
                    target: sqArray3[i+1],
                    overlays:[["Arrow" , { width:25, length:25, location:1 }]] 
                })
            };
            var sqConnection4 = jsPlumb.getInstance();
            sqConnection4.importDefaults({
              Connector : [ "Straight", { curviness: 150 } ],
              Anchors : [ "BottomCenter", "TopCenter" ],
            });
            for (var i = 0; i < sqArray4.length; i++) {
                sqConnection4.connect({
                    source: sqArray4[i],
                    target: sqArray4[i+1],
                    overlays:[["Arrow" , { width:25, length:25, location:1 }]] 
                })
            };
            var sqConnection5 = jsPlumb.getInstance();
            sqConnection5.importDefaults({
              Connector : [ "Straight", { curviness: 150 } ],
              Anchors : [ "BottomCenter", "TopCenter" ],
            });
            for (var i = 0; i < sqArray5.length; i++) {
                sqConnection5.connect({
                    source: sqArray5[i],
                    target: sqArray5[i+1],
                    overlays:[["Arrow" , { width:25, length:25, location:1 }]] 
                })
            };

              // jsplomb code for all the elements that are directly under the root element of the sequence
              var piConnection1 = jsPlumb.getInstance();
              piConnection1.importDefaults({
                Connector : [ "Straight", { curviness: 150 } ],
                Anchors : [ "BottomCenter", "TopCenter" ],
              });
              for (var i = 0; i < piRootIdsArray.length; i++) {
                  piConnection1.connect({
                      source: piRootIdsArray[i],
                      target: piRootIdsArray[i+1],
                      overlays:[["Arrow" , { width:25, length:25, location:1 }]] 
                  })
              };
              
            /*// jsplomb code for all the internal process link
            var interconnection = jsPlumb.getInstance();
            interconnection.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < prArray.length; i++) {
                interconnection.connect({
                    source: prArray[i],
                    target: prArray[i+1],
                    overlays:[ 
                                ["Arrow" , { width:25, length:25, location:1 }]
                            ]
                })
            };
            */
            console.log("test:"+linkObj);
            // jsplomb code for all the internal process link
            var linksConnections = jsPlumb.getInstance();
            linksConnections.importDefaults({
                connector:[ "Flowchart", {stub:15} ],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < linkObj.length; i=i+2) {
                linksConnections.connect({
                    source: linkObj[i],
                    target: linkObj[i+1],
                    paintStyle:{ strokeStyle:"blue", lineWidth:4 },
                    overlays:[ 
                                ["Arrow" , { width:25, length:25, location:1 }]
                            ]
                })
            };

            /*// jsplomb code for the first flow sequence link
            var flowSeqConnection1 = jsPlumb.getInstance();
            flowSeqConnection1.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < flowSeqArray1.length; i++) {
                flowSeqConnection1.connect({
                    source: flowSeqArray1[i],
                    target: flowSeqArray1[i+1],
                    overlays:[ 
                                ["Arrow" , { width:25, length:25, location:1 }]
                            ]
                })
            };

            // jsplomb code for the second flow sequence link
            var flowSeqConnection2 = jsPlumb.getInstance();
            flowSeqConnection2.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < flowSeqArray2.length; i++) {
                flowSeqConnection2.connect({
                    source: flowSeqArray2[i],
                    target: flowSeqArray2[i+1],
                    overlays:[ 
                                ["Arrow" , { width:25, length:25, location:1 }]
                            ]
                })
            };

            // jsplomb code for the tirdth flow sequence link
            var flowSeqConnection3 = jsPlumb.getInstance();
            flowSeqConnection3.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < flowSeqArray3.length; i++) {
                flowSeqConnection3.connect({
                    source: flowSeqArray3[i],
                    target: flowSeqArray3[i+1],
                    overlays:[ 
                                ["Arrow" , { width:25, length:25, location:1 }]
                            ]
                })
            };

            // jsplomb code for the fault handler link
            var fhConnection = jsPlumb.getInstance();
            fhConnection.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < fhArray.length; i++) {
                fhConnection.connect({
                    source: fhArray[i],
                    target: fhArray[i+1],
                    overlays:[ 
                                ["Arrow" , { width:25, length:25, location:1 }]
                            ]
                })
            };

            // jsplomb code for the sequence of scope link
            var scopeSqConnection = jsPlumb.getInstance();
            scopeSqConnection.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < scopeSqArray.length; i++) {
                scopeSqConnection.connect({
                    source: scopeSqArray[i],
                    target: scopeSqArray[i+1],
                    overlays:[ 
                                ["Arrow" , { width:25, length:25, location:1 }]
                            ]
                })
            };

            // jsplomb code for the sequence1 of scope link
            var scopeSqConnection1 = jsPlumb.getInstance();
            scopeSqConnection1.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < scopeSqArray1.length; i++) {
                scopeSqConnection1.connect({
                    source: scopeSqArray1[i],
                    target: scopeSqArray1[i+1],
                    overlays:[ 
                                ["Arrow" , { width:25, length:25, location:1 }]
                            ]
                })
            };

            // jsplomb code for the sequence2 of scope link
            var scopeSqConnection2 = jsPlumb.getInstance();
            scopeSqConnection2.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < scopeSqArray2.length; i++) {
                scopeSqConnection2.connect({
                    source: scopeSqArray2[i],
                    target: scopeSqArray2[i+1],
                    overlays:[ 
                                ["Arrow" , { width:25, length:25, location:1 }]
                            ]
                })
            };

            // jsplomb code for the sequence2 of scope link
            var catchAllConnection1 = jsPlumb.getInstance();
            catchAllConnection1.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < CatchAllArray1.length; i++) {
                catchAllConnection1.connect({
                    source: CatchAllArray1[i],
                    target: CatchAllArray1[i+1],
                    overlays:[ 
                                ["Arrow" , { width:25, length:25, location:1 }]
                            ]
                })
            };
            // jsplomb code for the sequence2 of scope link
            var catchAllConnection2 = jsPlumb.getInstance();
            catchAllConnection2.importDefaults({
                Connector : ["Straight", { curviness: 65 }],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < CatchAllArray2.length; i++) {
                catchAllConnection2.connect({
                    source: CatchAllArray2[i],
                    target: CatchAllArray2[i+1],
                    overlays:[ 
                                ["Arrow" , { width:25, length:25, location:1 }]
                            ]
                })
            };*/

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
            //document.getElementById("title").innerHTML = activityName;

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