var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('eye', 'assets/pics/lance-overdose-loader-eye.png');
}

function create ()
{
    var image1 = this.add.sprite(200, 300, 'eye').setInteractive();
    var image2 = this.add.sprite(400, 300, 'eye').setInteractive();
    var image3 = this.add.sprite(600, 300, 'eye').setInteractive();

    this.input.setDraggable([ image1, image2, image3 ]);

    image1.setScrollFactor(1);
    image2.setScrollFactor(0.7);
    image3.setScrollFactor(0.5);

    this.input.on('GAME_OBJECT_OVER_EVENT', function (event) {

        event.gameObject.setTint(0x00ff00);

    });

    this.input.on('GAME_OBJECT_OUT_EVENT', function (event) {

        event.gameObject.clearTint();

    });

    this.input.on('DRAG_START_EVENT', function (event) {

        event.gameObject.setTint(0xff0000);

    });

    this.input.on('DRAG_EVENT', function (event) {

        event.gameObject.x = event.dragX;
        event.gameObject.y = event.dragY;

    });

    this.input.on('DRAG_END_EVENT', function (event) {

        event.gameObject.clearTint();

    });
}
