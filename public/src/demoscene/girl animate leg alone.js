console.log(_.find);

var loaderSceneConfig = {
    key: 'loader',
    active: true,
    preload: bootLoader,
    create: bootCreate
};

var demoSceneConfig = {
    key: 'demo',
    active: false,
    visible: false,
    preload: preload,
    create: create,
    update: update
};

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 640,
    height: 338,
    scene: [ loaderSceneConfig, demoSceneConfig ]
};

var voice;
var head;
var eyes;
var hairLeft;
var hairRight;
var headRotationStep = -0.00675;
var hairRotationStep = -0.005;
var armLeft;
var armRight;
var legLeft;
var legRight;
var legRight2;
var redOvalLong;
var redOvalArmLeftUpper;
var redOvalArmLeftUpper;
var redOvalArmRightUpper;
var redOvalArmRightUpper;

var girlGroup;

var game = new Phaser.Game(config);

function bootLoader ()
{
    // this.load.image('loader', 'assets/demoscene/monitor.png');
}

function bootCreate ()
{
    this.add.image(0, 0, 'loader').setOrigin(0);

    this.scene.launch('demo');
}

function preload ()
{
    this.load.image('bg1', 'assets/demoscene/birdy-nam-nam-bg1.png');

    this.load.audio('mitekudasai', [ 'assets/audio/mitekudasai.wav']);
    this.load.image('head', 'assets/demoscene/head3.png');
    this.load.image('eyes', 'assets/demoscene/eyes.png');
    this.load.image('shirt', 'assets/demoscene/shirt.png');
    this.load.image('pants', 'assets/demoscene/pants.png');
    this.load.image('hair-left', 'assets/demoscene/hair left.png');
    this.load.image('hair-right', 'assets/demoscene/hair right.png');
    this.load.image('arm-left', 'assets/demoscene/arm left2.png');
    this.load.image('arm-right', 'assets/demoscene/arm right.png');
    this.load.image('leg-left', 'assets/demoscene/leg left.png');
    this.load.image('leg-right', 'assets/demoscene/leg right.png');
    this.load.image('red-oval-long-h', 'assets/demoscene/red-oval-horizontal.png');
    this.load.image('red-oval-short-h', 'assets/demoscene/red-oval-horizontal.png');
    this.load.image('red-oval-body', 'assets/demoscene/red-oval-vertical.png');
}

function create ()
{
    // this.add.image(0, 0, 'bg1').setOrigin(0);

    this.sound.pauseOnBlur = false;
    voice = this.sound.add('mitekudasai');
    voice.play();

    var redOvalScale = 0.75;
    var redOvalArmScale = 0.35
    // redOvalBody = (this.add.sprite(210, 100, 'red-oval-body')).setScale(redOvalScale,redOvalScale).setOrigin(0.5,0).setAngle(0);
    // redOvalArmLeftUpper = (this.add.sprite(150, 154, 'red-oval-long-h')).setScale(redOvalArmScale,redOvalArmScale).setOrigin(0.5,0).setAngle(-45);
    // redOvalArmLeftLower = (this.add.sprite(120, 218, 'red-oval-long-h')).setScale(redOvalArmScale,redOvalArmScale).setOrigin(0.5,0).setAngle(-90);
    // redOvalArmRightUpper = (this.add.sprite(270, 154, 'red-oval-long-h')).setScale(redOvalArmScale,redOvalArmScale).setOrigin(0.5,0).setAngle(45);
    // redOvalArmRightLower = (this.add.sprite(300, 218, 'red-oval-long-h')).setScale(redOvalArmScale,redOvalArmScale).setOrigin(0.5,0).setAngle(90);
    // var redOvalShort;
    // var redOvalBody;
        
    legRight = (this.add.sprite(211, 85, 'red-oval-long-h')).setScale(0.22, 0.22).setOrigin(0.5,0).setAngle(0);
    legRight2 = (this.add.sprite(211, 180, 'red-oval-long-h')).setScale(0.22, 0.22).setOrigin(0.5,0.8).setAngle(0);

}

function update (time, delta)
{
    // if (voice.isPlaying) {
        if (legRight.rotation > 0.3 || legRight.rotation < -0.3) {
            headRotationStep = -1*headRotationStep;
            hairRotationStep = -1*hairRotationStep;
        }
        Phaser.Actions.Rotate([legRight], headRotationStep);
        Phaser.Actions.Rotate([legRight2], -1*headRotationStep);
    // }
}
