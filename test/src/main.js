import kaboom from "kaboom"

const WORLD_SPEED = 240;
var looptime = 1;
function randomInt(max) {
	return Math.floor(Math.random() * max);
}

function spawnObj() {
	k.add([
		rect(48, 64),
        area(),
        outline(4),
        pos(width(), height() - 48),
        anchor("botleft"),
        color(255, 180, 255),
        move(LEFT, WORLD_SPEED),
        "object"
	])
}


const SPEED = 340;

const k = kaboom();

k.loadSprite("char", "sprites/dino_char.png");

k.loadSprite("char_run_1", "sprites/dino_char - run_frame_1.png")
k.loadSprite("char_run_2", "sprites/dino_char - run_frame_2.png")
k.loadSprite("char_run_3", "sprites/dino_char - run_frame_3.png")
k.loadSprite("char_run_4", "sprites/dino_char - run_frame_4.png")

const run_frames = ["char_run_1", "char_run_2", "char_run_3", "char_run_4", "char_run_3", "char_run_2"]
var i = 0

k.setGravity(1600);


k.scene("gameloop", () => { //gameloop starts here

var char = k.add([
	k.pos(80, 40),
	k.sprite("char"),
	k.area(),
	k.body(),
	k.scale()
])
char.scaleTo(3);
k.add([
	k.rect(width(), 48),
	k.pos(0, height() - 48),
	k.outline(4),
	k.area(),
	k.body({ isStatic: true }),
	k.color(127, 200, 255),
])

k.onKeyPress("space", () => { 
	if (char.isGrounded()) {
		char.jump();
	}
});

k.onKeyDown("d" ,() => {
	char.move(SPEED,0);
});
k.onKeyDown("a", () => {
	char.move(-SPEED,0);
});

k.loop(0.2, () => {

	if(i===5) i=0;
	else i+=1;
	char.use(sprite(run_frames[i]));
})

k.loop(looptime, () => {
	spawnObj();
	looptime = randomInt(3);
})

char.onCollide("object", () => {
	//k.shake();
	//go("dead"); <<< MAKE A DEATH SCENE
})

}) // gameloop ends here

k.go("gameloop");