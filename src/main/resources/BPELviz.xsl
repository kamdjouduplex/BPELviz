<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xs="http://www.w3.org/2001/XMLSchema"
                xmlns:fn="http://www.w3.org/2005/xpath-functions"
                xmlns:xdt="http://www.w3.org/2005/xpath-datatypes"
                xmlns:bpel="http://docs.oasis-open.org/wsbpel/2.0/process/executable"
                xmlns:bpelviz="http://github.com/BPELtools/BPELviz"
                xmlns:regexp="http://exslt.org/regular-expressions"
                extension-element-prefixes="regexp"
                xmlns:math="java.lang.Math"
                exclude-result-prefixes="math">

    <xsl:import href="BPELviz-id-handling.xsl" />

    <xsl:output method="html" indent="yes" encoding="UTF-8"/>

    <!-- create doctype html5 element -->
    <xsl:template match="/">
        <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html&gt;</xsl:text>
        <xsl:apply-templates select="node()"/>
    </xsl:template>

    <xsl:template match="/bpel:process">
        <html>
            <head>
                <title>Visual</title>
                <meta charset="utf-8"/>

                <!-- latest release is 3.0.83. That does not play well with requirejs. Therefore, everything of SyntaxHighlighter is loaded before requirejs -->
                <script src="http://alexgorbatchev.com/pub/sh/3.0.83/scripts/shCore.js" type="text/javascript"></script>
                <script src="http://alexgorbatchev.com/pub/sh/3.0.83/scripts/shBrushXml.js" type="text/javascript"></script>
                <script src="dom.jsPlumb-1.7.5-min.js"></script>
                <script src="http://requirejs.org/docs/release/2.1.9/minified/require.js"></script>
                <script>
                    require.config({
                    paths: {
                        "jquery": "http://codeorigin.jquery.com/jquery-2.0.3.min",
                        "bootstrap3": "http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min"
                    },
                    shim: {
                        "bootstrap3": ["jquery"]
                    }});
                </script>

                <link href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>

                <link href="http://alexgorbatchev.com/pub/sh/current/styles/shCore.css" rel="stylesheet" type="text/css" />
                <link href="http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css" rel="stylesheet" type="text/css" />
                <link href="http://alexgorbatchev.com/pub/sh/current/styles/shThemeEclipse.css" rel="stylesheet" type="text/css" />

                <link href="BPELviz.css" rel="stylesheet" type="text/css"/>

            </head>
            <body>
            <div class="container">
                <div class="row">
                    <!-- <div class="col-md-3 ">
                        <br/>
                     
                        <div class="panel panel-success">
                          <div class="panel-heading">
                            <h3 class="panel-title">How it works</h3>
                          </div>
                          <div class="panel-body">
                            just click on any acitivity and get more details about it in the panel below.
                            Thanks!
                          </div>
                        </div>
                        <br/>
                        <div class="panel panel-info">
                          <div class="panel-heading">
                            <h3 id="title" class="panel-title"></h3>
                          </div>
                          <div class="panel-body">
                            <strong >Time: </strong><p id="time"></p>
                            <strong >Status: </strong><p>Completed</p>
                            <strong >More: </strong><p >Some text</p>
                            
                          </div>
                        </div>
                    </div>
                    
                    <div class="col-md-8 "><br/>
                    <div class="row scrollable">
                    <div class="col-md-8 col-md-offset-3"> -->
                        <div id="processContainer">
                            <div class="bpel_process bpel">
                                <div id="start" class="start_dot bpel"><br/>start</div>
                                <xsl:apply-templates select="@* | node()"/>
                                <div id="end" class="end_dot bpel"><br/>end</div>
                            </div>
                        </div>
                     <!--</div> 
                    </div>
                    </div>-->
                </div>
            </div>

            <script>
                require(["BPELviz"], function(renderer) {
                    renderer.initialize();
                });
                SyntaxHighlighter.all();
            </script>        
            </body>
        </html>
    </xsl:template>

    <xsl:template match="bpel:condition">
        <div class="bpel_condition">
            <xsl:value-of select="."/>
        </div>
    </xsl:template>

    <xsl:template match="bpel:if">
        <div class="bpel_if">
            <xsl:apply-templates select="@*"/>

            <div class="bpel">
                <xsl:apply-templates select="bpel:condition"/>
                <xsl:apply-templates select="child[not(bpel:condition or bpel:else or bpel:elseif)]"/>
            </div>

            <xsl:apply-templates select="bpel:elseif"/>
            <xsl:apply-templates select="bpel:else"/>
        </div>
    </xsl:template>

    <!-- managing the id generation -->
    <xsl:template match="bpel:*">
        <xsl:variable name="actName" select="bpelviz:deriveIdentifier(.)"/>
        <xsl:variable name="flow">
            <xsl:analyze-string select="$actName" 
                regex="^(pr-[1-9]).sq-[1-9].fw-[1-9].(receive|assign|reply|empty|sq)($|-[1-9]$)">
              <xsl:matching-substring>
                <xsl:value-of select="$actName"/>
              </xsl:matching-substring>
            </xsl:analyze-string> 
        </xsl:variable>

        <xsl:choose>
            <xsl:when test="$actName = $flow">
                <div id="{bpelviz:deriveIdentifier(.)}" class="bpel col-md-6 bpel_{fn:local-name()}">
                    <div id="parent" class="content">
                        <xsl:apply-templates select="@* | node()"/>
                    </div>
                </div>
            </xsl:when>
            <xsl:otherwise>
                <div id="{bpelviz:deriveIdentifier(.)}" class="bpel bpel_{fn:local-name()}">
                    <div id="parent" class="content">
                        <xsl:apply-templates select="@* | node()"/>
                    </div>
                </div>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    <!-- end of id generation --> 
<xsl:template match="attribute::name">
    <xsl:variable name="name" select="./name(..)"/>
        <xsl:choose>
            <xsl:when test="$name='process'">
                <div class="bpel_name">
                <xsl:value-of select="."/>
                </div>
            </xsl:when>
            <xsl:when test="$name='flow'">
                <div class="bpel_name">
                <xsl:value-of select="."/>
                </div>
            </xsl:when>
            <xsl:when test="$name='forEach'">
                <div class="bpel_name">
                <xsl:value-of select="."/>
                </div>
            </xsl:when>
            <xsl:when test="$name='scope'">
                <div class="bpel_name">
                <xsl:value-of select="."/>
                </div>
            </xsl:when>
            <xsl:when test="$name='pick'">
                <div class="bpel_name">
                <xsl:value-of select="."/>
                </div>
            </xsl:when>
            <xsl:otherwise>
                <div class="bpel_name">
                  <div class="row">
                    <div class="col-xs-1">
                        <xsl:choose>
                            <xsl:when test="$name='assign'">
                                <span class="glyphicon glyphicon-arrow-right"></span>
                            </xsl:when>
                            <xsl:when test="$name='reply'">
                                <span class="glyphicon glyphicon-cloud-upload"></span>
                            </xsl:when>
                            <xsl:when test="$name='receive'">
                                <span class="glyphicon glyphicon-cloud-download"></span>
                            </xsl:when>
                            <xsl:when test="$name='compensate'">
                                <span class="glyphicon glyphicon-cog"></span>
                            </xsl:when>
                            <xsl:when test="$name='invoke'">
                                <span class="glyphicon glyphicon-transfer"></span>
                            </xsl:when>
                            <xsl:when test="$name='exit'">
                                <span class="glyphicon glyphicon-stop"></span>
                            </xsl:when>
                            <xsl:when test="$name='if'">
                                <span class="glyphicon glyphicon-filter"></span>
                            </xsl:when>
                            <xsl:when test="$name='throw'">
                                <span class="glyphicon glyphicon-cog"></span>
                            </xsl:when>
                            <xsl:otherwise>
                                <span class="glyphicon glyphicon-cog"></span>
                            </xsl:otherwise>
                        </xsl:choose>
                    </div>
                    <div class="col-xs-8">
                        <xsl:value-of select="."/>
                    </div>
                    <div class="col-xs-1">
                        <span class="glyphicon glyphicon-ok icone"></span>
                    </div>
                  </div>
                </div>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

    <!-- Override default template for copying text -->
    <xsl:template match="text()|@*"/>


</xsl:stylesheet>