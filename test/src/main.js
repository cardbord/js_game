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

k.loadSprite("bean", "sprites/bean.png");

k.setGravity(1600);


k.scene("gameloop", () => { //gameloop starts here

const char = k.add([
	k.pos(80, 40),
	k.sprite("bean"),
	k.area(),
	k.body(),
])

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


k.loop(looptime, () => {
	spawnObj();
	looptime = randomInt(3);
})

char.onCollide("object", () => {
	k.shake();
	//go("dead"); <<< MAKE A DEATH SCENE
})

}) // gameloop ends here

k.go("gameloop");