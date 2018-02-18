var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var group;

function preload ()
{
    this.load.spritesheet('bobs', 'assets/sprites/bobs-by-cleathley.png', { frameWidth: 32, frameHeight: 32 });
}

function create ()
{
    //  This will create a Group with 400 children.
    //  Each child will use the 'bobs' texture and a random frame number between 0 and 399 (inclusive)
    //  Change 'randomFrame' to false to see the difference it makes
    group = this.make.group({
        key: 'bobs',
        frame: Phaser.Utils.Array.NumberArray(0, 399),
        randomFrame: true,
        gridAlign: {
            x: 16,
            y: 16,
            width: 25,
            height: 25,
            cellWidth: 32,
            cellHeight: 32
        },
        setScale: {x:2,y:2}
    });

    // Phaser.Actions.ScaleXY(group.getChildren(), 0, 0);

}

function update ()
{
    Phaser.Actions.RotateAround(group.getChildren(), { x: 400, y: 300 }, 0.01);
}