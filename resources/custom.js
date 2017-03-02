// single-window mode, sets all UI links to open in the same window
// doesn't affect links in notebook output
if (IPython) {
  IPython._target = '_self';
  firstAttempt = true;

  require(["base/js/events", "base/js/dialog"], function (events, dialog) {
    events.on("notebook_loaded.Notebook", function () {
      // disable warn-on-unsaved changes
      // these are ephemeral notebooks, nobody should have any work to lose
      window.onbeforeunload = null;
    });

    events.off('kernel_connection_failed.Kernel');
    events.on('kernel_connection_failed.Kernel', function (event) {
      // only show message once
      if (firstAttempt) {
        dialog.kernel_modal({
          title: "Connection lost",
          body: "This notebook has been inactive for too long. Please reload \
          the page to get a new one.",
          buttons : {
              "OK": {}
          }
        });

        firstAttempt = false;
      }
    })
  });
}
