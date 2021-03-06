package bpelviz;

import javax.xml.transform.*;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Creates the html5 visualization of a bpel file.
 */
public class BPELViz {

    private static final Logger logger = LoggerFactory.getLogger(BPELViz.class);

    public static final String BPELVIZ_CSS = "BPELviz.css";
    public static final String BPELVIZ_JS = "BPELviz.js";
    public static final String BPELVIZ_JSPUMB = "dom.jsPlumb-1.7.5-min.js";

    public void bpel2html(Path bpelFile, Path htmlFile) throws BPELVizException {
        try {
            createTransformer().transform(new StreamSource(bpelFile.toFile()), new StreamResult(htmlFile.toFile()));
        } catch (TransformerException e) {
            throw new BPELVizException(e);
        }

        try {
            Files.copy(BPELViz.class.getResourceAsStream("/" + BPELVIZ_CSS), htmlFile.getParent().resolve(BPELVIZ_CSS), StandardCopyOption.REPLACE_EXISTING);
            Files.copy(BPELViz.class.getResourceAsStream("/" + BPELVIZ_JS), htmlFile.getParent().resolve(BPELVIZ_JS), StandardCopyOption.REPLACE_EXISTING);
            Files.copy(BPELViz.class.getResourceAsStream("/" + BPELVIZ_JSPUMB), htmlFile.getParent().resolve(BPELVIZ_JSPUMB), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new BPELVizException("Could not copy css/js/jsplumb file", e);
        }
    }

    private Transformer createTransformer() throws TransformerConfigurationException {
        Templates templates = createTemplates();
        Transformer trans = templates.newTransformer();
        trans.setErrorListener(new ErrorListener() {
            @Override
            public void warning(TransformerException exception) throws TransformerException {
                logger.warn("Transformation", exception);
            }

            @Override
            public void error(TransformerException exception) throws TransformerException {
                logger.error("Transformation", exception);
            }

            @Override
            public void fatalError(TransformerException exception) throws TransformerException {
                logger.error("Transformation", exception);
            }
        });
        return trans;
    }

    private Templates createTemplates() throws TransformerConfigurationException {
        InputStream is = BPELViz.class.getResourceAsStream("/BPELviz.xsl");
        if (is == null) {
            throw new IllegalStateException("Could not find BPELviz.xsl");
        }
        Source xsltSource = new StreamSource(is);
        TransformerFactory transFact = TransformerFactory.newInstance();
        transFact.setURIResolver(new URIResolver() {
            @Override
            public Source resolve(String href, String base) throws TransformerException {
                return new StreamSource(BPELViz.class.getResourceAsStream("/" + href));
            }
        });
        return transFact.newTemplates(xsltSource);
    }

}
