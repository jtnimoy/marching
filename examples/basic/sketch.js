/**
   this example aims to show the simplest hello world code possible
   for marching.
*/

function setup() {
    // put setup code here
    createCanvas(100,100);

    background(0);
    fill(255);
    noStroke();
    ellipse(40,40,40,40);
    ellipse(60,60,40,40);
    

    //construct a 2d numeric array of pixel brightnesses, row by row
    let pixels = [];
    for(let y=0;y<height;y++){
	let xRow = [];
	for(let x=0;x<width;x++){
	    xRow.push( brightness(get(x,y)) );
	}
	pixels.push(xRow);
    }
    
    
    //call and draw marching vectors
    stroke(0,255,255);
    noFill();
    let lines = marchingSquares(pixels);
    lines.map(function(a){
	line(a[0],a[1],a[2],a[3]);
    });
    
    
}
