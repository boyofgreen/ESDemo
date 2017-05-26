

var mode = 'system';
function modeSwitch(ev) {

    mode = ev.target.displayText;
}
if (typeof Windows != 'undefined') {

    // Modify System Defaults to Only Show Volume and Next/Prev Track as per guidance.
    // https://docs.microsoft.com/en-us/windows/uwp/input-and-devices/windows-wheel-interactions


    //initilize dial
    var config = Windows.UI.Input.RadialControllerConfiguration.getForCurrentView();
    config.setDefaultMenuItems([Windows.UI.Input.RadialControllerSystemMenuItemKind.scroll]);
    var controller = Windows.UI.Input.RadialController.createForCurrentView();



    // Add our own item to respond to
    // var mi = Windows.UI.Input.RadialControllerMenuItem.createFromKnownIcon("Undo/Redo", Windows.UI.Input.RadialControllerMenuKnownIcon.undoRedo);
    // mi.addEventListener("invoked", modeSwitch);

    // Add two custom sections for the dial interface
    // If images do not show on Dial, change path to be absolute
    var mi2 = Windows.UI.Input.RadialControllerMenuItem.createFromIcon("Review Builds", Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(new Windows.Foundation.Uri("https://es-tracker.azurewebsites.net/images/dial2.png")));
    var mi3 = Windows.UI.Input.RadialControllerMenuItem.createFromIcon("Release", Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(new Windows.Foundation.Uri("https://es-tracker.azurewebsites.net/images/dial1.png")));
  //push to controler
    controller.menu.items.push(mi2);
    controller.menu.items.push(mi3);

    mi2.addEventListener("invoked", modeSwitch);
    mi3.addEventListener('invoked', modeSwitch);
  //  controller.menu.items.push(mi);


    controller.addEventListener("buttonclicked", function (e) {
     if(mode !== 'Release') return

     sendOffRelease()
    });

    controller.addEventListener("rotationchanged", function (e) {
        if(mode !== 'Review Builds') return
        var changeDirection = e.detail[0].rotationDeltaInDegrees;
      if(changeDirection < 0){
        changeFactor('lower')
      }else{
        changeFactor('higher')

      }

      //  log("rotation changed: " + e.detail[0].rotationDeltaInDegrees + " in " + mode);
    });



}


var sendOffRelease = function(){
makeRelease();
     document.body.classList.toggle('build');


}

document.addEventListener("keydown", function(e){
if(e.keyCode === 66){
sendOffRelease()

}


}); 