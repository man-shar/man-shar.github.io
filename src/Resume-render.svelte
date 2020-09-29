<script>
  import pdfjsLib from "pdfjs-dist/build/pdf.js";
  import pdfjsViewer from "pdfjs-dist/web/pdf_viewer";
  import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";

  import "../node_modules/pdfjs-dist/web/pdf_viewer.css";

  var desktopPdfPath = "assets/desktop-resume.pdf";
  var mobilePdfPath = "assets/phone-resume.pdf";
  var loadingTask = pdfjsLib.getDocument(desktopPdfPath);
  // dealing with weirdness inside pdf_viewer which makes things 1.33 itmes bigger
  var CSS_UNITS = 96.0 / 72.0;

  loadingTask.promise
    .then(function (pdf) {
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function (page) {
        var container = document.querySelector(
          "#resume-container .hide-on-mobile"
        );
        var scale = 1;
        var viewport = page.getViewport({ scale: scale });

        var eventBus = new pdfjsViewer.EventBus();

        var pdfPageView = new pdfjsViewer.PDFPageView({
          container: container,
          id: pageNumber,
          scale: scale,
          defaultViewport: viewport,
          eventBus: eventBus,
          // We can enable text/annotations layers, if needed
          textLayerFactory: new pdfjsViewer.DefaultTextLayerFactory(),
          annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
        });

        pdfPageView.setPdfPage(page);
        // rescale entire div
        // container.style.transform = viewport.width /
        return pdfPageView.draw();
      });
    })
    .then(
      function () {
        console.log("# End of desktop Document");
      },
      function (err) {
        console.error("Error: " + err);
      }
    );

  var phoneLoader = pdfjsLib.getDocument(mobilePdfPath);
  phoneLoader.promise
    .then(function (pdf) {
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function (page) {
        var scale = 1;
        var viewport = page.getViewport({ scale: 1 });

        var eventBus = new pdfjsViewer.EventBus();

        var pdfPageView = new pdfjsViewer.PDFPageView({
          container: document.querySelector(
            "#resume-container .hide-on-desktop"
          ),
          id: pageNumber,
          scale: scale,
          defaultViewport: viewport,
          eventBus: eventBus,
          // We can enable text/annotations layers, if needed
          textLayerFactory: new pdfjsViewer.DefaultTextLayerFactory(),
          annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
        });

        pdfPageView.setPdfPage(page);
        return pdfPageView.draw();
      });
    })
    .then(
      function () {
        console.log("# End of phone Document");
      },
      function (err) {
        console.error("Error: " + err);
      }
    );
</script>

<style>
  #resume-container {
    text-align: left;
    max-width: 1000px;
    margin: 3rem auto;
    width: 90%;
    min-width: 300px;
  }
  #resume-container {
    width: 100%;
    border: none;
  }
  .hide-on-mobile :global(#header),
  .hide-on-mobile :global(#footer) {
    display: none !important;
  }
  .hide-on-desktop :global(#header),
  .hide-on-desktop :global(#footer) {
    display: none !important;
  }
  .pdf-container {
    position: relative;
  }
  .pdf-container :global(.page) {
    /* margin: 0 auto; */
    position: relative;
    /* max-width: 100%; */
  }
  .textLayer {
    /* width: 100%;
    height: 100%; */
  }
  /* .hide-on-desktop iframe html body.c29 {
    display: ;
  } */
</style>

<div id="resume-container">
  <div class="hide-on-mobile pdf-container" />
  <div class="hide-on-desktop pdf-container" />
</div>
