// AMD and non-AMD compatiblitiy inspired by 
//http://tkareine.org/blog/2012/08/11/why-javascript-needs-module-definitions/ and 
//https://github.com/blueimp/jQuery-File-Upload/blob/9.5.0/js/jquery.fileupload.js
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
        
        /*
        /* To handle linking of the DOM using JSPlumb we need the Id's of each element
        /* Here is the part of code to get all the ids
        */

        /************************ start source-target Id handler **********************************/

        var divs = $("div.bpel"); // we get all the div element that content the class bpel to the divs object
        var flink = {};
        
        for (var i = 0; i < divs.length; i++) {
            var div = divs[i];
            var sources = $(div).attr("data-source"); // we get all datasource attribute values as an array.
            if(sources == undefined){
                continue;  // we check for every div with data-source value undefined and skip
            }
            if(sources.length == 0){
                continue;  // Also we skip all div with data-source value empty
            }

            sources = sources.split(" ");
            for (var j = 0; j < sources.length; j++) {     
                var link = sources[j];                     // At this point we split the  
                if(flink[link] == undefined){              // sources array to get each element  
                    flink[link]={};                        // and store his id as key: value
                }                                          // object in the array flink
                flink[link]["source"] = div.id;            // this finally get something like 
            };                                             // buyToSettle: { source: pr-1.sq-1.fw-1.sq-1.receive-1}
                                                           
        };


        for (var i = 0; i < divs.length; i++) {
             var div = divs[i];
            var sources = $(div).attr("data-target");     // Here we did exactly the same thing except 
            if(sources == undefined){                     // that here we are handled target
                continue;                                 // so we will end up with somthing like this
            }                                             // buyToSettle: { target: "pr-1.sq-1.fw-1.empty-1"}
            if(sources.length == 0){
                continue;
            }
            sources = sources.split(" ");
            for (var j = 0; j < sources.length; j++) {
                var link = sources[j];
                if(flink[link] == undefined){
                    flink[link]={};
                }
                flink[link]["target"] = div.id;
            };
            
        };

        var lines =[];
        $.each(flink, function(linkname){           // and finally we push the two and get this
            var link = flink[linkname];             //  buyToSettle: {
            lines.push(link.source);                //                 source: "pr-1.sq-1.fw-1.sq-1.receive-1"   
            lines.push(link.target);                //                 target: "pr-1.sq-1.fw-1.empty-1"
        });                                         //               }


/******************* end source-target Id handler ************************************************/


/**************** declaration of variables to use for the rest of ids ***************************/
/******************* and strating of the id handler of the rest of linking **********************/

        var obj = $( "div#processContainer" ).find("*");
        var prRootIdsArray  = [];
        var sqRootIdsArray  = [];
        var scRootIdsArray  = [];
        var piRootIdsArray  = [];
        var prRootIdRegex = /^(pr-[1-9]).(receive|assign|reply|invoke|empty|rethrow|catchAll|catch|compensate|exit|compensateScope|throw|validate|wait|if|extensionActivity|sq|sc|CH|else|elif|EH|FH|fw|fe|oA|oE|oM|pi|pr|ru|TH|w)($|-[1-9]$)/i;
        var sqRootIdRegex = /sq(|-[1-9]).(receive|assign|reply|invoke|empty|rethrow|catchAll|catch|compensate|exit|compensateScope|throw|validate|wait|if|extensionActivity|sq|sc|CH|else|elif|EH|FH|fw|fe|oA|oE|oM|pi|pr|ru|TH|w)($|-[1-9]$)/i;
        var scRootIdRegex = /sc(|-[1-9]).(receive|assign|reply|invoke|empty|rethrow|catchAll|catch|compensate|exit|compensateScope|throw|validate|wait|if|extensionActivity|sq|sc|CH|else|elif|EH|FH|fw|fe|oA|oE|oM|pi|pr|ru|TH|w)($|-[1-9]$)/i;
        var piRootIdRegex = /pi(|-[1-9]).(|receive|assign|reply|invoke|empty|rethrow|catchAll|catch|compensate|exit|compensateScope|throw|validate|wait|if|extensionActivity|sq|sc|CH|else|elif|EH|FH|fw|fe|oA|oE|oM|pi|pr|ru|TH|w)($|-[1-9]$)/i;


        
        // looping the obj to check a push each id that match the regular expression defined above
        for (var i = 0; i < obj.length; i++) {
            var Id = obj[i].id;
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


/************************* end rest of id code *************************************************/

/***********************************************************************************************/
/****************************Start JsPlumb handler *********************************************/

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
              
            // jsplomb code for all the internal process link
            var linksConnections = jsPlumb.getInstance();
            linksConnections.importDefaults({
                connector:[ "Flowchart", {stub:15} ],
                Anchors : ["BottomCenter", "TopCenter"]
            });

            for (var i = 0; i < lines.length; i=i+2) {
                linksConnections.connect({
                    source: lines[i],
                    target: lines[i+1],
                    paintStyle:{ strokeStyle:"blue", lineWidth:4 },
                    overlays:[ 
                                ["Arrow" , { width:25, length:25, location:1 }]
                            ]
                })
            };

            
        });

/********************************end jsplumb handler******************************************/
     
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