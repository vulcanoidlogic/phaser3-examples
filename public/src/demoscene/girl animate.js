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

var track;
var bird;
var egg = 0;
var chick1;
var chick2;
var chick3;
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
    this.load.audio('jungle', [ 'assets/audio/jungle.ogg', 'assets/audio/jungle.mp3' ]);
    this.load.animation('birdyAnims', 'assets/demoscene/birdy.json');
    this.load.image('bg1', 'assets/demoscene/birdy-nam-nam-bg1.png');
    this.load.image('bg2', 'assets/demoscene/birdy-nam-nam-bg2.png');
    this.load.atlas('birdy', 'assets/demoscene/budbrain.png', 'assets/demoscene/budbrain.json');

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
    this.sound.pauseOnBlur = false;

    track = this.sound.add('mitekudasai');

    this.add.image(0, 0, 'bg1').setOrigin(0);

    this.anims.create({
        key: 'lay',
        frames: this.anims.generateFrameNames('birdy', { prefix: 'lay', start: 0, end: 19 }),
        frameRate: 28,
        delay: 1,
        onComplete: dropEgg,
        callbackScope: this
    });

    // bird = this.add.sprite(328, 152, 'birdy', 'lay0').setOrigin(0).setDepth(10);

    track.play();
    // girlGroup = this.make.group([{ key: 'head', setXY: {x: 200, y: 50}, setScale: {x: 0.18, y:0.18} },
    //                                 { key: 'shirt', setXY: {x: 215, y: 120}, setScale: {x: 0.3, y:0.3} },
    //                                 { key: 'pants', setXY: {x: 208, y: 116}, setScale: {x: 0.25, y:0.25} }]);

                                    // girlGroup = this.add.group()
    // girlGroup.createMultiple([{ key: 'head', setXY: {x: 200, y: 50}, setScale: {x: 0.15, y:0.15} },
    // { key: 'shirt', setXY: {x: 215, y: 120}, setScale: {x: 0.35, y:0.35} },
    // { key: 'pants', setXY: {x: 208, y: 116}, setScale: {x: 0.25, y:0.25} }]);
    
    // this.add.image(0, 0, 'head').setOrigin(0);
    // Phaser.Actions.Angle(girlGroup.getChildren(), 45, 0);

    hairLeft = (this.add.sprite(184, -5, 'hair-left')).setScale(0.18, 0.18).setOrigin(0.5,0).setAngle(8);
    hairRight = (this.add.sprite(214, 5, 'hair-right')).setScale(0.18, 0.18).setOrigin(0.5,0).setAngle(-8);

    // head is a Sprite at this point vs. just an Image
    // head = _.find(girlGroup.getChildren(), {texture: {key:'head'}});
    head = (this.add.sprite(204, 83, 'head')).setScale(0.18, 0.18).setOrigin(0.5,0.7);
    eyes = (this.add.sprite(203, 80, 'eyes')).setScale(0.15, 0.15).setOrigin(0.5,0.7);
    // console.log('head scale', head.setScale(0.18, 0.18));
    // Phaser.Actions.SetScale([head], 0.18, 0.18);
    // head.setOrigin(0,0);
    // console.log('girlGroup.getChildren(), head=',girlGroup.getChildren(), head);
    // head.setAngle(270);
    // head.setY(83);
    // head.setOrigin(0.5,0.7);
    legLeft = (this.add.sprite(198, 160, 'leg-left')).setScale(0.22, 0.22).setOrigin(0.5,0).setAngle(0);
    legRight = (this.add.sprite(211, 158, 'leg-right')).setScale(0.22, 0.22).setOrigin(0.5,0).setAngle(0);

    girlGroup = this.make.group([{ key: 'shirt', setXY: {x: 215, y: 116}, setScale: {x: 0.26, y:0.26} },
                                    { key: 'pants', setXY: {x: 208, y: 116}, setScale: {x: 0.22, y:0.22} }]);

    armLeft = (this.add.sprite(170, 60, 'arm-left')).setScale(0.22, 0.22).setOrigin(0.5,0).setAngle(0);
    armRight = (this.add.sprite(236, 32, 'arm-right')).setScale(0.22, 0.22).setOrigin(0.5,0).setAngle(0);
                                                                    
}

function update (time, delta)
{
    // Phaser.Actions.ScaleXY([head], 0.0001, 0.0001);
    // console.log('head.rotation=', head.rotation)
    if (track.isPlaying) {
        if (head.rotation > 0.3 || head.rotation < -0.3) {
            headRotationStep = -1*headRotationStep;
            hairRotationStep = -1*hairRotationStep;
        }
        Phaser.Actions.Rotate([head, eyes], headRotationStep);
        Phaser.Actions.Rotate([ hairLeft, hairRight], -1*hairRotationStep);
    }
    // Phaser.Actions.RotateAround([head], { x: 204, y: 60 }, 0.01);
    // Phaser.Actions.Angle([head], 0.01);
    // Phaser.Actions.SetRotation([head], 20, 0.01);
}

function dropEgg ()
{
    var smallEgg = this.add.image(bird.x + 116, 228, 'birdy', 'egg-small').setOrigin(0);

    this.tweens.add({
        targets: smallEgg,
        y: 288,
        ease: 'Linear',
        delay: 500,
        duration: 200,
        onComplete: moveBird,
        callbackScope: this
    });

    egg++;
}

function moveBird ()
{
    if (egg < 3)
    {
        bird.x -= 124;

        bird.play('lay');
    }
    else
    {
        //  Ready for scene 2
        this.time.addEvent({ delay: 800, callback: changeScene, callbackScope: this });
    }
}

function changeScene ()
{
    this.children.removeAll();

    this.add.image(0, 0, 'bg2').setOrigin(0);

    chick1 = this.add.sprite(100, 72, 'birdy', 'hatch1').setOrigin(0);
    chick2 = this.add.sprite(260, 72, 'birdy', 'hatch1').setOrigin(0);
    chick3 = this.add.sprite(420, 72, 'birdy', 'hatch1').setOrigin(0);

    chick1.anims.delayedPlay(1.2, 'hatch');
    chick2.anims.delayedPlay(2.2, 'hatch');
    chick3.anims.delayedPlay(3.2, 'hatch');

    this.time.addEvent({ delay: 5500, callback: checkDisOut, callbackScope: this });
}

function checkDisOut ()
{
    chick1.anims.play('lookRight');
    chick2.anims.play('checkDisOut');
    chick3.anims.play('lookLeft');
}
