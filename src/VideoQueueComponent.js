import { BaseComponent }  from 'vatom-spaces-plugins'


export class VideoQueueComponent extends BaseComponent {
//================ Properties of class VideoQueueComponent

// Instance properties
currentVideo = null;
queuedVideo = null;

// Heartbeat timer counts lifetime of this instance in Bims = BigInt milliseconds.
myHeartbeatTimer  = null;   // Interval timer triggers this.onHeartbeat()
myHeartbeatBims   = BigInt(250);
myLifetimeBims    = BigInt(0);


//================ Begin methods for class VideoQueueComponent

// Called when the component is loaded
async onLoad() {
  onRegisterVideoQueue(this);
  
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
  this.startNewVideo(videoURL);
}// addToQueue()


async startNewVideo(videoURL){
  await this.plugin.hooks.trigger('plugins.media-playback.properties.set', {
      objectID: this.objectID,
      changes: {
          // Set media source
          ['component:media-playback:media-source:src']: medivideoURLaSourceURL,
          // Sync command: Play immediately from the beginning
          public: {
              media_source_sync_action: 'play',
              media_source_sync_time: Date.now(),
              media_source_sync_nonce: Date.now(),
              media_source_sync_seek: 0
          }
      }
  });
}// addToQueue()


onHeartbeat() {
  this.myLifetimeBims += this.myHeartbeatBims;
  //  
  if ((this.myLifetimeBims % BigInt(2 * 60 * 1000)) < this.myHeartbeatBims){
    console.log(`onHeartbeat ${this.myLifetimeBims} lifetime at a 2 min milestone`);
  }
}// onHeartbeat()

  
//================ End of methods for class VideoQueueComponent
}// class VideoQueueComponent

