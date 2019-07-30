let resolution = 16;
let pixels = [];
function setup() {
    // put setup code here
    createCanvas(windowWidth,windowHeight);
    background(127,127,127);

    
    
}

function draw() {
    noStroke();

    let halfres = resolution * 0.5;
    
    let locX1 = cos(frameCount * 0.02) * halfres + halfres;
    let locY1 = sin(frameCount * 0.03) * halfres + halfres;

    let locX2 = - cos(frameCount * 0.03) * halfres + halfres;
    let locY2 = - sin(frameCount * 0.05) * halfres + halfres;


    pixels = [];
    for(let y=0;y<resolution;y++){
	let xRow = [];
	for(let x=0;x<resolution;x++){
	    xRow.push(
		1 - dist(x,y,locX1,locY1) / resolution +
		    1 - dist(x,y,locX2,locY2) / resolution
	    );
	}
	pixels.push(xRow);
    }
    
    
    // put drawing code here
    scale(32);
    for(let y=0;y<resolution;y++){
	let xRow = [];
	for(let x=0;x<resolution;x++){
	    fill(pixels[y][x] * 128);
	    rect(x,y,1,1);
	}
    }

    stroke(255,0,0);
    noFill();
    strokeWeight(1.0/32.0);
    let lines = marchingSquares(pixels, 1.3);
    lines.map(function(a){
	line(a[0],a[1],a[2],a[3]);
    });
	
}

// dynamically adjust the canvas to the window
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(127,127,127);
}
