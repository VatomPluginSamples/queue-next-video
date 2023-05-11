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


onHeartbeat() {
  this.myLifetimeBims += this.myHeartbeatBims;
  //  
  if ((this.myLifetimeBims % BigInt(2 * 60 * 1000)) < this.myHeartbeatBims){
    console.log(`onHeartbeat ${this.myLifetimeBims} lifetime at a 2 min milestone`);
  }
}// onHeartbeat()

  
//================ End of methods for class VideoQueueComponent
}// class VideoQueueComponent

