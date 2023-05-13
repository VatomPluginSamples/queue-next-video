import { BasePlugin, BaseComponent } from 'vatom-spaces-plugins'

/**
 * Queue Next Video
 *
 * This plugin serves as an example for how plugin code can be used to control what
 * video is playing on a surface in a scene and queue a next video to play when
 * the current one ends.
 *
 * @license MIT
 * @author Liron-Toledo
 */


export default class QueueNextVideoPlugin extends BasePlugin {
  //================ properties of class QueueNextVideoPlugin

  // Plugin ID
  static get id()             { return 'queue-next-video' }
  static get name()           { return 'Queue Next Video' } 
  static get description()    { return "This plugin serves as an example for how plugin"
    + " code can be used to control what video is playing on a surface in a scene and"
    + " queue a next video to play when the current one ends." }
  //
  myVideoQueue     = null;   // Registered by VideoQueueComponent. // ${this.constructor.myVideoQueue}


  //================ methods for class QueueNextVideoPlugin

  /** Called on load */
  onLoad() {
    // Create BtnA - MLK video
    this.menus.register({
        icon: this.paths.absolute('button-icon.png'),
        text: 'MLK',
        action: () => this.onVideoRequestBtn('MLK Excerpt',
          'https://cdn.glitch.global/47d6365d-ba2a-41fc-8b34-f34cc5092916/mlk.mp4?v=1683901824751')
    });
    // Create BtnB - City Park video
    this.menus.register({
        icon: this.paths.absolute('button-icon.png'),
        text: 'Park',
        action: () => this.onVideoRequestBtn('City Park Scene',
          'https://cdn.glitch.global/47d6365d-ba2a-41fc-8b34-f34cc5092916/park.mp4?v=1683901843453')
    });
    // Create BtnC - Wakeboard video
    this.menus.register({
        icon: this.paths.absolute('button-icon.png'),
        text: 'Wake',
        action: () => this.onVideoRequestBtn('Wakeboard Cable Tow',
          'https://cdn.glitch.com/47d6365d-ba2a-41fc-8b34-f34cc5092916%2FCableTow-720p.mp4?v=1618272156296')
    });
    // Register component
    this.objects.registerComponent(VideoQueueComponent, {
        id: 'video-queue-component',
        name: 'Video Queue Component',
        description: 'Implement a queue by attaching this to an object that also has a media player component.',
        settings: [
          {   id:     'info-label',
              name:   'Info',
              type:   'label',
              value:  'The component was successfully attached.'
          }
        ]
    });
  }// onLoad


  onRegisterVideoQueue(aVideoQueue){
    this.myVideoQueue = aVideoQueue;
    //
    console.log(`onRegisterVideoQueue ${this.myVideoQueue}`);
  }
  
  
  onVideoRequestBtn(videoName, videoURL) {
    if ( ! this.myVideoQueue
      || ! videoName
      || ! videoURL
    ){
      this.menus.toast({
        text: 'Video request failed due to '
          + (!! this.myVideoQueue ? '' : 'invalid component ; ')
          + (!! videoName ? '' : 'invalid video name ; ')
          + (!! videoURL ? '' : 'invalid vide URL ; '),
        duration: 2000
      });
      return;
    }
    //
    let currentVideo = this.myVideoQueue.addToQueue(videoURL);
    if (!! currentVideo){
      this.menus.toast({
        text: `Queuing ${videoName} behind ${currentVideo}`,
        duration: 2000
      });
    }else{
      this.menus.toast({
        text: `Starting video: ${videoName}`,
        duration: 2000
      });
    }
  }// onVideoRequestBtn()


  onBtnA() {
    //
    //console.log(`onBtnA ${this.myVideoQueue}`);
    //
    if (!! this.myVideoQueue){
      let currentVideo = this.myVideoQueue.addToQueue(
        'https://cdn.glitch.global/47d6365d-ba2a-41fc-8b34-f34cc5092916/mlk.mp4?v=1683901824751');
      if (!! currentVideo){
        this.menus.toast({
          text: `Queuing MLK video behind ${currentVideo}`,
          duration: 2000
        });
      }else{
        this.menus.toast({
          text: 'Starting MLK video',
          duration: 2000
        });
      }
    }
  }


  onBtnB() {
    this.menus.toast({
      text: 'Queuing city park scene video',
      duration: 2000
    });
    //
    if (!! this.myVideoQueue){
      this.myVideoQueue.addToQueue(
      'https://cdn.glitch.global/47d6365d-ba2a-41fc-8b34-f34cc5092916/park.mp4?v=1683901843453');
    }
  }


  onBtnC() {
    this.menus.toast({
      text: 'Queuing wake tow video',
      duration: 2000
    });
    //
    if (!! this.myVideoQueue){
      this.myVideoQueue.addToQueue(
      'https://cdn.glitch.com/47d6365d-ba2a-41fc-8b34-f34cc5092916%2FCableTow-720p.mp4?v=1618272156296');
    }
  }


}// class QueueNextVideoPlugin ===========================================================


class VideoQueueComponent extends BaseComponent {
  //================ Properties of class VideoQueueComponent

  // Instance properties
  currentVideo = null;
  queuedVideo = null;

  // Heartbeat timer counts lifetime of this instance in Bims = BigInt milliseconds.
  myHeartbeatTimer  = null;   // Interval timer triggers this.onHeartbeat()
  myHeartbeatBims   = BigInt(250);
  myLifetimeBims    = BigInt(0);
  myBimsSinceLastMediaUpdate    = BigInt(0);
  myMediaExpirationBims         = BigInt(1500);
  myMediaIntervalMinBims        = BigInt(1500);
  myMediaIntervalMaxBims        = BigInt(0);


  //================ Begin methods for class VideoQueueComponent

  // Called when the component is loaded
  async onLoad() {
    this.plugin.onRegisterVideoQueue(this); 
    //
    this.plugin.hooks.addHandler('plugins.media-playback.updated', this.onMediaUpdated);
    //
    console.log(`VideoQueueComponent::onLoad ${this}`);
    // Heartbeat
    this.myHeartbeatTimer = setInterval(this.onHeartbeat.bind(this), Number(this.myHeartbeatBims));
  }


  // Called when the component is unloaded
  onUnload() {
  }// onUnload


  // Called when a remote message is received
  onMessage(msg) {
  }


  onObjectUpdated(newFields){
  }// onObjectUpdated()


  addToQueue(videoURL){
    if (!! this.currentVideo){
      this.queuedVideo = videoURL;
      return this.currentVideo;
    }
    this.startNewVideo(videoURL);
    this.queuedVideo = null;
    return null;
  }// addToQueue()


  async startNewVideo(videoURL){
    if (!! videoURL){
      console.log(`startNewVideo ${videoURL}`);
      //
      this.currentVideo = videoURL;
      //
      await this.plugin.hooks.trigger('plugins.media-playback.properties.set', {
        objectID: this.objectID,
        changes: {
          // Set media source
          ['component:media-playback:media-source:src']: videoURL,
          // Sync command: Play immediately from the beginning
          public: {
            media_source_sync_action: 'play',
            media_source_sync_time: Date.now(),
            media_source_sync_nonce: Date.now(),
            media_source_sync_seek: 0
          }
        }
      });
    }// (!! videoURL)
    //
    console.log('startNewVideo failed on bad input');
  }// addToQueue()


  onHeartbeat() {
    this.myLifetimeBims             += this.myHeartbeatBims;
    this.myBimsSinceLastMediaUpdate += this.myHeartbeatBims;
    //  
    if ((this.myLifetimeBims % BigInt(2 * 60 * 1000)) < this.myHeartbeatBims){
      console.log(`onHeartbeat ${this.myLifetimeBims} lifetime at a 2 min milestone`);
    }
  }// onHeartbeat()

  
  onMediaUpdated = async (info) => {
    /*****
    const { paused, url } = info;
    /*****/
    const { objectID, currentTime, duration, hlsIsLive, paused, eventName, url } = info;
    console.log(`updated ${hlsIsLive ? 'live stream' : 'vod'} media object ${objectID},`
      + ` with url ${url} and time ${currentTime}s out of ${duration}s,`
      + ` which is currently ${paused ? 'paused' : 'playing'}.`
      + ` Event name is ${eventName}`);
    /*****/
    // Compare duration
    console.log(`Interval ${this.myBimsSinceLastMediaUpdate}`);
    // Log this media update
    if (!! url && ! paused){
      this.currentVideo = url;
    }else if(!! this.queuedVideo){
      this.startNewVideo(this.queuedVideo);
      this.queuedVideo = null;
    }else{
      this.currentVideo = null;
    }
    // Log update interval and reset
    if (this.myMediaIntervalMinBims > this.myBimsSinceLastMediaUpdate){
      this.myMediaIntervalMinBims   = this.myBimsSinceLastMediaUpdate;
    }
    if (this.myMediaIntervalMaxBims < this.myBimsSinceLastMediaUpdate){
      this.myMediaIntervalMaxBims   = this.myBimsSinceLastMediaUpdate;
    }
    this.myBimsSinceLastMediaUpdate = BigInt(0);
  }


}// class VideoQueueComponent ============================================================

