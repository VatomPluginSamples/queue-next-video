import { isValidPollChoiceName }            from './HelperFuncs.js';
import { Position3d }                       from './Position3d.js';


export class PollChoicePadComponent extends BaseComponent {

  // Instance properties
  myCenter = null;


  getPadChoice(){
    return this.getField('poll-choice') ?? this.plugin.constKeyAbstain;
  }
  
  getPadCenter(){
    if (! this.myCenter) { throw 'Unititialized property of class instance'; }
    //
    this.myCenter.assign(
      (this.fields.x    ?? 0.0),
      0.0,
      (this.fields.y    ?? 0.0) // Beware that this.fields diabolically swaps y for z.
    );
    return this.myCenter;
  }

  getPadRadius(){
    return this.getField('activation-radius') ?? this.plugin.constDefaultPadRadius;
  }
  
  // Called when the component is loaded
  async onLoad() {
    this.myCenter = new Position3d();
  
    const theChoice   = this.getPadChoice();
    const thePosition = this.getPadCenter();
    const theRadius   = this.getPadRadius();
  
    console.log(`Loading PollChoicePadComponent with ${theChoice} ${thePosition.x} ${thePosition.z} ${theRadius}`);
    console.dir(this);

    // Add this pad to plugin list
    this.plugin.onPadEnabled(theChoice, thePosition, theRadius);
  }

  // Called when the component is unloaded
  onUnload() {
    // This method could be used to disable pad info that was copied.
    // No urgent need to do so because no component ref was shared.
    //
    const theChoice   = this.getPadChoice();
    const thePosition = this.getPadCenter();
    const theRadius   = this.getPadRadius();
  
    console.log(`Unloading PollChoicePadComponent with ${theChoice} ${thePosition.x} ${thePosition.z} ${theRadius}`);
    console.dir(this);
  }// onUnload

  // Called when a remote message is received
  onMessage(msg) {
  }

  onObjectUpdated(newFields){
    const theChoice   = this.getPadChoice();
    const thePosition = this.getPadCenter();
    const theRadius   = this.getPadRadius();
    //
    console.log(`onObjectUpdated with c x z r ${theChoice} ${thePosition.x} ${thePosition.z} ${theRadius} then newFields obj below`);
    console.dir(newFields);
  }// onObjectUpdated()

}// class PollChoicePadComponent

