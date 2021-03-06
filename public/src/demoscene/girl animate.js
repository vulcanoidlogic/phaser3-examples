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

var girlGroup;

var game = new Phaser.Game(config);

function bootLoader ()
{
    this.load.image('loader', 'assets/demoscene/monitor.png');
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
}

function create ()
{
    this.add.image(0, 0, 'bg1').setOrigin(0);

    this.sound.pauseOnBlur = false;
    voice = this.sound.add('mitekudasai');
    voice.play();

    hairLeft = (this.add.sprite(184, -5, 'hair-left')).setScale(0.18, 0.18).setOrigin(0.5,0).setAngle(8);
    hairRight = (this.add.sprite(214, 5, 'hair-right')).setScale(0.18, 0.18).setOrigin(0.5,0).setAngle(-8);

    // head is a Sprite at this point vs. just an Image
    head = (this.add.sprite(204, 83, 'head')).setScale(0.18, 0.18).setOrigin(0.5,0.7);
    eyes = (this.add.sprite(203, 80, 'eyes')).setScale(0.15, 0.15).setOrigin(0.5,0.7);

    legLeft = (this.add.sprite(198, 160, 'leg-left')).setScale(0.22, 0.22).setOrigin(0.5,0).setAngle(0);
    legRight = (this.add.sprite(211, 158, 'leg-right')).setScale(0.22, 0.22).setOrigin(0.5,0).setAngle(0);

    girlGroup = this.make.group([{ key: 'shirt', setXY: {x: 215, y: 116}, setScale: {x: 0.26, y:0.26} },
                                    { key: 'pants', setXY: {x: 208, y: 116}, setScale: {x: 0.22, y:0.22} }]);

    armLeft = (this.add.sprite(170, 60, 'arm-left')).setScale(0.22, 0.22).setOrigin(0.5,0).setAngle(0);
    armRight = (this.add.sprite(236, 32, 'arm-right')).setScale(0.22, 0.22).setOrigin(0.5,0).setAngle(0);
                                                                    
}

function update (time, delta)
{
    if (voice.isPlaying) {
        if (head.rotation > 0.3 || head.rotation < -0.3) {
            headRotationStep = -1*headRotationStep;
            hairRotationStep = -1*hairRotationStep;
        }
        Phaser.Actions.Rotate([head, eyes, legRight], headRotationStep);
        Phaser.Actions.Rotate([ hairLeft, hairRight, legLeft], -1*hairRotationStep);
    }
}
