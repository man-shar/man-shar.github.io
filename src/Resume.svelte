<script>
  import pdfjsLib from "pdfjs-dist/build/pdf.js";
  import pdfWorker from "pdfjs-dist/build/pdf.worker.entry";
  // pdfjsLib.GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.entry";

  var desktopPdfPath = "assets/desktop-resume.pdf";
  var mobilePdfPath = "assets/phone-resume.pdf";
  var loadingTask = pdfjsLib.getDocument(desktopPdfPath);
  loadingTask.promise
    .then(function (pdf) {
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function (page) {
        console.log("Page loaded");

        var scale = 5;
        var viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById("desktop-canvas");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        // context.scale()

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log("Page rendered");
        });
      });
    })
    .then(
      function () {
        console.log("# End of Document");
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
        console.log("Page loaded");

        var scale = 5;
        var viewport = page.getViewport({ scale: scale });

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById("mobile-canvas");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        // context.scale()

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log("Page rendered");
        });
      });
    })
    .then(
      function () {
        console.log("# End of Document");
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
  #resume-container canvas {
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
  /* .hide-on-desktop iframe html body.c29 {
    display: ;
  } */
</style>

<div id="resume-container">
  <div class="hide-on-mobile"><canvas id="desktop-canvas" /></div>
  <div class="hide-on-desktop"><canvas id="mobile-canvas" /></div>
</div>
