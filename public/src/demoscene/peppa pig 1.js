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
    title: 'Peppa Pig Experiment',
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 640,
    height: 480,
    backgroundColor: '#FCE6D7',
    scene: [ loaderSceneConfig, demoSceneConfig ]
};

var voice;
var armRotationStep = -0.03;
var legRotationStep = -0.06;
var armAtRestAngle = 0;
var legAtRestAngle = -90;
var peppa1;
var leftLeg;
var rightLeg;
var leftArm;
var rightArm;
var peppaGroup;
var mouth;
var leftEye;
var rightEye;

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
    this.load.audio('peppa-pig', [ 'assets/audio/Peppa-Pig.mp3']);
    this.load.audio('peppa-pig-greg', [ 'assets/audio/Peppa-Pig-Greg.mp3']);
    this.load.image('peppa-1', 'assets/demoscene/peppa1.png');
    this.load.spritesheet('mouth-default', 'assets/demoscene/mouthDefault.png', { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('eyes-default', 'assets/demoscene/eyes2.png', { frameWidth: 200, frameHeight: 200 });
    this.load.image('cartoon-arm', 'assets/demoscene/cartoon-arm.png');
    this.load.image('cartoon-leg', 'assets/demoscene/cartoon-leg.png');
}

function create ()
{

    this.sound.pauseOnBlur = false;
    voice = this.sound.add('peppa-pig');
    voice.play();


    var armScale = 0.1;
    leftArm = (this.add.sprite(150, 160, 'cartoon-arm')).setScale(armScale, armScale).setOrigin(0,1).setAngle(armAtRestAngle);
    rightArm = (this.add.sprite(70, 164, 'cartoon-arm')).setScale(armScale, armScale).setOrigin(0,1).setAngle(-90);

    var legScale = 0.25;
    leftLeg = (this.add.sprite(120, 212, 'cartoon-leg')).setScale(legScale, legScale).setOrigin(1,0).setAngle(legAtRestAngle);
    rightLeg = (this.add.sprite(70, 208, 'cartoon-leg')).setScale(legScale, legScale).setOrigin(1,0).setAngle(legAtRestAngle);

    var peppaScale = 0.15;
    peppa1 = (this.add.sprite(110, 204, 'peppa-1')).setScale(peppaScale, peppaScale).setOrigin(0.5,0.8).setAngle(0);

    var mouthScale = 0.7;
    mouth = (this.add.sprite(125, 110, 'mouth-default')).setScale(mouthScale).setAngle(-15);

    var eyesScale = 0.2;
    leftEye = (this.add.sprite(125, 42, 'eyes-default')).setScale(eyesScale).setAngle(-15);
    rightEye = (this.add.sprite(105, 55, 'eyes-default')).setScale(eyesScale).setAngle(-15);
    
    peppaGroup = this.add.group();
    peppaGroup.addMultiple([leftArm, rightArm, leftLeg, rightLeg, peppa1, mouth, leftEye, rightEye], true);

    this.anims.create({
        key: 'mouth-rest',
        frames: this.anims.generateFrameNumbers('mouth-default', { start: 8, end: 8 }),
        frameRate: 1,
        repeat: 0
    });

    this.anims.create({
        key: 'mouth-1',
        frames: this.anims.generateFrameNumbers('mouth-default', { start: 0, end: 30 }),
        frameRate: 5,
        repeat: -1
    });

    mouth.anims.play('mouth-1');

    this.anims.create({
        key: 'eyes-blink',
        frames: this.anims.generateFrameNumbers('eyes-default', { start: 0, end: 1 }),
        frameRate: 1,
        repeat: -1
    });

    leftEye.anims.play('eyes-blink');
    rightEye.anims.play('eyes-blink');

}

function update (time, delta)
{
    if (voice.isPlaying) {
            // console.log('time, rightLeg.rotation',time, rightLeg.rotation);
        if (rightLeg.rotation > -1.15 || rightLeg.rotation < -1.66) {
            armRotationStep = -1*armRotationStep;
            legRotationStep = -1*legRotationStep;
        }
        Phaser.Actions.Rotate([leftLeg], -1*legRotationStep);
        Phaser.Actions.Rotate([rightLeg], legRotationStep);
        Phaser.Actions.Rotate([leftArm], -1*armRotationStep);
        Phaser.Actions.Rotate([rightArm], armRotationStep);
        Phaser.Actions.IncX(peppaGroup.getChildren(), 1);

        if (peppa1.getBounds().x > 600) {
            Phaser.Actions.IncX(peppaGroup.getChildren(), -600);
        }

    } else {
        leftArm.setAngle(armAtRestAngle);
        rightArm.setAngle(-90);
        leftLeg.setAngle(legAtRestAngle);
        rightLeg.setAngle(legAtRestAngle);
        Phaser.Actions.IncX(peppaGroup.getChildren(), -1*peppa1.getBounds().x);
        mouth.anims.play('mouth-rest');
        mouth.anims.stop('mouth-1');
        leftEye.anims.stop('eyes-blink');
        rightEye.anims.stop('eyes-blink');
    }
}
