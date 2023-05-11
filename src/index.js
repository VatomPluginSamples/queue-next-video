import { BasePlugin, BaseComponent }  from 'vatom-spaces-plugins'
import { VideoScreenComponent }       from './VideoScreenComponent.js';

/**
* This is the main entry point for your plugin.
*
* All information regarding plugin development can be found at
* https://developer.vatom.com/spaces/plugins-in-spaces/guide-create-plugin
*
* @license MIT
* @author Vatom Inc.
*/
export default class MyPlugin extends BasePlugin {
//================ Properties of class MyPlugin

  /** Plugin info */
  static id = "queue-next-video"
  static name = "Queue Next Video" // ${this.constructor.name}
  static description = "This plugin serves as an example for how plugin code"
    + " can be used to control what video is playing on a surface in a scene and"
    + " to queue a next video to play when it the current video ends."

//================ Begin methods for class MyPlugin

/** Called on load */
onLoad() {

  // Create BtnA - MLK video
  this.menus.register({
      icon: this.paths.absolute('button-icon.png'),
      text: 'MLK',
      action: () => this.onBtnA()
  });

  // Create BtnB - City Park video
  this.menus.register({
      icon: this.paths.absolute('button-icon.png'),
      text: 'Park',
      action: () => this.onBtnA()
  });

  // Create BtnC - Wakeboard video
  this.menus.register({
      icon: this.paths.absolute('button-icon.png'),
      text: 'Wake',
      action: () => this.onBtnA()
  });

}// onLoad


onBtnA() {
  this.menus.toast({
    text: 'onBtnA',
    duration: 2000
  });
}


onBtnB() {
  this.menus.toast({
    text: 'onBtnB',
    duration: 2000
  });
}


onBtnC() {
  this.menus.toast({
    text: 'onBtnC',
    duration: 2000
  });
}


//================ End methods for class MyPlugin
}// class MyPlugin
