import { BasePlugin, BaseComponent }  from 'vatom-spaces-plugins'
import { VideoScreenComponent }       from './VideoQueueComponent.js';

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

// Plugin ID
static id = "queue-next-video"
static name = "Queue Next Video" // ${this.constructor.name}
static description = "This plugin serves as an example for how plugin code"
  + " can be used to control what video is playing on a surface in a scene and"
  + " to queue a next video to play when it the current video ends."

// Heartbeat timer counts lifetime of this instance in Bims = BigInt milliseconds.
myHeartbeatTimer  = null;   // Interval timer triggers this.onHeartbeat()
myHeartbeatBims   = BigInt(250);
myLifetimeBims    = BigInt(0);
  

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
  /*--------------------*/
  // Register component
  this.objects.registerComponent(VideoQueueComponent, {
      id: 'video-queue-component',
      name: 'Video Queue Component',
      description: 'Implement a queue by attaching this to an object that also has a media player component.',
      settings: [
        {   id:     'info-label',
            name:   'Info',
            type:   'label',
            value:  'Settings'
        }
      ]
  });
  /*--------------------*
  //  
  this.objects.registerComponent(VideoQueueComponent, {
      id: 'video-queue-component',
      name: 'Video Queue Component',
      description: 'Implement a queue by attaching this to an object that also has a media player component.',
      settings: obj => [
          { id: 'info', type: 'label', value: 'Settings' },
          { id: 'select-name', name: 'Select Via Name', type: 'checkbox', help: 'Allows for selection of media player via its name rather than ID.'},
          this.getComponentField(obj, 'media-button', 'select-name') == true ? {id: 'media-player-name', name: 'Media Player Name', type: 'select-item', help: 'Name of the media player object. Leaving this blank will default button to nearest media player (within 20 metres).'} :
          { id: 'media-player-id', name: 'Media Player ID', type: 'input',
            help: 'ID of the media player object.Leaving this blank will default button to nearest media player (within 20 metres).'},
          { id: 'media-source-id', name: 'Media Source URL', type: 'input',
            help:'URL for the media source you wish to play with this button.'},
          { id: 'who-can-click', name: 'Who Can Press?', type: 'select', default: 'Everyone', values: ['Everyone', 'Admin Only'], help: 'Type of user who is allowed to click on the media button. Default is Everyone.' },
          { id: 'event-name', name: 'Event Name', type: 'text', help: 'If set, this button will record analytics events for the attached video using the given event name' },
      ]
  });
  /*--------------------*/
  // Heartbeat
  this.myHeartbeatTimer = setInterval(this.onHeartbeat.bind(this), Number(this.myHeartbeatBims));
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


onHeartbeat() {
  this.myLifetimeBims += this.myHeartbeatBims;
  //  
  if ((this.myLifetimeBims % BigInt(2 * 60 * 1000)) < this.myHeartbeatBims){
    console.log(`onHeartbeat ${this.myLifetimeBims} lifetime at a 2 min milestone`);
  }
}// onHeartbeat()

  
//================ End methods for class MyPlugin
}// class MyPlugin
