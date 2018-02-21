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
    backgroundColor: '#FCE6D7',
    scene: [ loaderSceneConfig, demoSceneConfig ]
};

var voice;
var headRotationStep = -0.00675;
var hairRotationStep = -0.005;
var peppa1;
var stickLegsHigh;
var leftLeg;
var rightLeg;

var game = new Phaser.Game(config);

function bootLoader ()
{
    // this.load.image('loader', 'assets/demoscene/monitor.png');
}

function bootCreate ()
{
    // this.add.image(0, 0, 'loader').setOrigin(0);

    this.scene.launch('demo');
}

function preload ()
{
    this.load.image('bg1', 'assets/demoscene/birdy-nam-nam-bg1.png');

    this.load.audio('mitekudasai', [ 'assets/audio/mitekudasai.wav']);
    this.load.image('peppa-1', 'assets/demoscene/peppa1.png');
    this.load.image('stick-legs-hi', 'assets/demoscene/stick-legs-hi.png');
    this.load.image('cartoon-leg', 'assets/demoscene/cartoon-leg.png');
}

function create ()
{

    this.sound.pauseOnBlur = false;
    voice = this.sound.add('mitekudasai');
    voice.play();

    var peppaScale = 0.15;
    var legScale = 0.25;
        
    rightLeg = (this.add.sprite(205, 220, 'cartoon-leg')).setScale(legScale, legScale).setOrigin(0.5,0.8).setAngle(-90);
    leftLeg = (this.add.sprite(255, 220, 'cartoon-leg')).setScale(legScale, legScale).setOrigin(0.5,0.8).setAngle(0);
    peppa1 = (this.add.sprite(210, 184, 'peppa-1')).setScale(peppaScale, peppaScale).setOrigin(0.5,0.8).setAngle(0);

}

function update (time, delta)
{
    // if (voice.isPlaying) {
            console.log('time, rightLeg.rotation',time, rightLeg.rotation);
        if (rightLeg.rotation > -1.57 || rightLeg.rotation < -2.57) {
            headRotationStep = -1*headRotationStep;
            hairRotationStep = -1*hairRotationStep;
        }
        Phaser.Actions.Rotate([rightLeg], headRotationStep);
        // Phaser.Actions.Rotate([legRight2], -1*headRotationStep);
    // }
}
