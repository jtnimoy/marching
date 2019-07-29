(function(){

    /**

       # M 4 R C H I N G #

       marching squares for p5js
       
       generates a 2D isosurface from 2D pixel data.
       3D will probably be added in the adhoc future.
       i'd love to see 1D and 4D as well.
       
       This implementation is left in non-table format so that people
       can understand how it works under the hood.
       
       @author jtnimoy
       
       @date july 29, 2019
       @param data [  [ [], [] ] , [ [], [] ] ] data[y][x]
       @param thresh 0.5, or 0.0, or 1.0, or whatever your test
       threshold is for your volume values.
       @returns list of lines, with 2 point components XY and XY
       [
         [x1, y1, x2, y2],
         [x1, y1, x2, y2],
         [x1, y1, x2, y2],
       ]
    */
    
    p5.prototype.marchingSquares = function(data, thresh){
	
	if(thresh == null)thresh = 0.0;
	
	let vecs = [];
	
	/**
	   takes array i of 2 XY pairs and does algebra on them.
	   returns the array
	*/
	function apply (x,y,i) {
	    i[0] = 0.5 + i[0] + x;
	    i[1] = 0.5 + i[1] + y;
	    i[2] = 0.5 + i[2] + x;
	    i[3] = 0.5 + i[3] + y;
	    return i;
	}

	//apply the 16 cases.
	for( let y=0;y<data.length-1;y++){
	    for( let x=0;x<data[y].length-1;x++){
		
		//case 15
		/*
		  .______.
		  |      |
		  |      |
		  .______.
		  
		*/
		if(     data[y  ][x  ] >   thresh && data[y  ][x+1] >   thresh &&
			data[y+1][x  ] >   thresh && data[y+1][x+1] >   thresh){

		    vecs.push( apply(x,y,[0,0,0,1]));
		    vecs.push( apply(x,y,[0,1,1,1]));
		    vecs.push( apply(x,y,[1,1,1,0]));
		    vecs.push( apply(x,y,[1,0,0,0]));
		}
		

				//case 14
		/*
		  .______.
		  |      |
		  |      |
		   \ ____.
		  
		*/
		
		else if(data[y  ][x  ] >   thresh && data[y  ][x+1] >   thresh &&
			data[y+1][x  ] <=  thresh && data[y+1][x+1] >   thresh){
		    
		    vecs.push( apply(x,y,[0,0,0,0.5]));
		    vecs.push( apply(x,y,[0,0.5,0.5,1]));
		    vecs.push( apply(x,y,[0.5,1,1,1]));
		    vecs.push( apply(x,y,[1,1,1,0]));
		    vecs.push( apply(x,y,[1,0,0,0]));
		    
		}
		
		//case 13
		/*
		  .______.
		  |      |
		  |      |
		  ._____/
		  
		*/
		else if(data[y  ][x  ] >   thresh && data[y  ][x+1] >   thresh &&
			data[y+1][x  ] >   thresh && data[y+1][x+1] <=  thresh){
		    
		    vecs.push( apply( x,y, [0,0,0,1]));
		    vecs.push( apply( x,y, [0,1,0.5,1]));
		    vecs.push( apply( x,y, [0.5,1,1,0.5]));
		    vecs.push( apply(x,y,[1,0.5,1,0]));
		    vecs.push( apply(x,y,[1,0,0,0]));
		    
		}
		
		//case 12
		/*
		  .______.
		  |      |
		  --------
		  
		  
		*/
		else if(data[y  ][x  ] >   thresh && data[y  ][x+1] >   thresh &&
			data[y+1][x  ] <=  thresh && data[y+1][x+1] <=  thresh){
		    
		    vecs.push( apply( x,y, [0,0,1,0]));
		    vecs.push( apply( x,y, [1,0,1,0.5]));
		    vecs.push( apply( x,y,[1,0.5, 0,0.5]));
		    vecs.push( apply(x,y,[0,0.5 , 0,0]));
		    
		}
		
		
		//case 11
		/*
		  ._____
		  |     \
		  |      |
		  .______.
		  
		  
		*/
		else if(data[y  ][x  ] >   thresh && data[y  ][x+1] <=   thresh &&
			data[y+1][x  ] >   thresh && data[y+1][x+1] >  thresh){
		    
		    vecs.push(apply(x,y,[0,0, 0,1]));
		    vecs.push(apply(x,y,[0,1 , 1,1]));
		    vecs.push(apply(x,y,[1,1 , 1,0.5]));
		    vecs.push(apply(x,y,[1,0.5 , 0.5,0]));
		    vecs.push(apply(x,y,[0.5,0 , 0,0]));
		    
		    
		}
		
		
		
		//case 10
		/*
		  ._____
		  |     \
		  |      |
		  \_____.
		  
		  
		*/
		else if(data[y  ][x  ] >   thresh && data[y  ][x+1] <=   thresh &&
			data[y+1][x  ] <=   thresh && data[y+1][x+1] >  thresh){
		    
		    vecs.push(apply(x,y,[0,0, 0,0.5]));
		    vecs.push(apply(x,y,[0,0.5 , 0.5,1]));
		    vecs.push(apply(x,y,[0.5,1 , 1,1]));
		    vecs.push(apply(x,y,[1,1 , 1,0.5]));
		    vecs.push(apply(x,y,[1,0.5, 0.5,0]));
		    vecs.push(apply(x,y,[0.5,0 , 0,0]));
		    
		}
		


		
		//case 9
		/*
		  .__
		  |  |
		  |  |
		  .__|
		  
		  
		*/
		else if(data[y  ][x  ] >   thresh && data[y  ][x+1] <=  thresh &&
			data[y+1][x  ] >   thresh && data[y+1][x+1] <=  thresh){
		    
		    vecs.push(apply(x,y,[0,0,   0.5,0]));
		    vecs.push(apply(x,y,[0.5,0, 0.5,1]));
		    vecs.push(apply(x,y,[0.5,1, 0,1]));
		    vecs.push(apply(x,y,[0,1,    0,0]));
		    
		}
		

		
		//case 8
		/*
		  .__
		  |  /
		  | /
		 
		  
		  
		*/
		else if(data[y  ][x  ] >   thresh && data[y  ][x+1] <=  thresh &&
			data[y+1][x  ] <=  thresh && data[y+1][x+1] <=  thresh){
		    
		    vecs.push(apply(x,y,[0,0,   0.5,0]));
		    vecs.push(apply(x,y,[0.5,0, 0,0.5]));
		    vecs.push(apply(x,y,[0,0.5, 0,0]));
		    
		}
		

		
		//case 7
		/*
		     ___.
		   /    |
		  |     |
		  ._____.
		  
		  
		*/
		else if(data[y  ][x  ] <=  thresh && data[y  ][x+1] >  thresh &&
			data[y+1][x  ] >   thresh && data[y+1][x+1] >  thresh){
		    
		    vecs.push(apply(x,y,[0.5,0,  1,0]));
		    vecs.push(apply(x,y,[1,0, 1,1]));
		    vecs.push(apply(x,y,[1,1, 0,1]));
		    vecs.push(apply(x,y,[0,1 , 0,0.5]));
		    vecs.push(apply(x,y,[0,0.5, 0.5,0]));
		    
		}
		



		
		//case 6
		/*
		   __.
		  |  |
		  |  |
		  |__.
		  
		  
		*/
		else if(data[y  ][x  ] <=   thresh && data[y  ][x+1] >  thresh &&
			data[y+1][x  ] <=   thresh && data[y+1][x+1] >  thresh){
		    
		    vecs.push(apply(x,y,[0.5,0,  1,0]));
		    vecs.push(apply(x,y,[1,0, 1,1]));
		    vecs.push(apply(x,y,[1,1, 0.5,1]));
		    vecs.push(apply(x,y,[0.5,1 , 0.5, 0]));
		    
		}
		
		

		
		//case 5
		/*
		    ___.
		   /    |
		  |     |
		  .____/
		  
		  
		*/
		else if(data[y  ][x  ] <=   thresh && data[y  ][x+1] >  thresh &&
			data[y+1][x  ] >   thresh && data[y+1][x+1] <=  thresh){
		    
		    vecs.push(apply(x,y,[0.5,0,  1,0]));
		    vecs.push(apply(x,y,[1,0,    1,0.5]));
		    vecs.push(apply(x,y,[1,0.5,  0.5,1]));
		    vecs.push(apply(x,y,[0.5,1,  0,1]));
		    vecs.push(apply(x,y,[0,1,    0,0.5]));
		    vecs.push(apply(x,y,[0,0.5, 0.5,0]));
		    
		}
		
		
		//case 4
		/*
		  ___.
		  \ |
		   \|
		  
		  
		*/
		else if(data[y  ][x  ] <=   thresh && data[y  ][x+1] >  thresh &&
			data[y+1][x  ] <=   thresh && data[y+1][x+1] <=  thresh){
		    
		    vecs.push(apply(x,y,[0.5,0,  1,0]));
		    vecs.push(apply(x,y,[1,0,    1,0.5]));
		    vecs.push(apply(x,y,[1,0.5,  0.5,0]));
		    
		}
		
		
		//case 3
		/*
		  --------
		  |      |
		  .______.
		  
		  
		*/
		else if(data[y  ][x  ] <=   thresh && data[y  ][x+1] <=  thresh &&
			data[y+1][x  ] >   thresh && data[y+1][x+1] >  thresh){
		    
		    vecs.push(apply(x,y,[0,0.5,  1,0.5]));
		    vecs.push(apply(x,y,[1,0.5,  1,1]));
		    vecs.push(apply(x,y,[1,1,    0,1]));
		    vecs.push(apply(x,y,[0,1,    0,0.5]));
		    
		}
		


		
		//case 2
		/*

		   / |
		  /__.
		  
		  
		*/
		else if(data[y  ][x  ] <=   thresh && data[y  ][x+1] <=  thresh &&
			data[y+1][x  ] <=   thresh && data[y+1][x+1] >  thresh){
		    
		    vecs.push(apply(x,y,[1,0.5 , 1,1]));
		    vecs.push(apply(x,y,[1,1,    0.5,1]));
		    vecs.push(apply(x,y,[0.5,1,  1,0.5]));
		}
		
		


		
		
		//case 1
		/*

		  | \
		  .__\
		  
		  
		*/
		else if(data[y  ][x  ] <=   thresh && data[y  ][x+1] <=  thresh &&
			data[y+1][x  ] >    thresh && data[y+1][x+1] <=  thresh){
		    
		    vecs.push(apply(x,y,[0,0.5, 0,1]));
		    vecs.push(apply(x,y,[0,1 , 0.5,1]));
		    vecs.push(apply(x,y,[0.5,1, 0,0.5]));
		}
		
	    }
	}

	//vecs is now populated with raw pixel outlines. there is a lot of redundancy. let's eliminate it.
	let removables = [];
	vecs.map( function (i) {
	    vecs.map( function (j) {
		
		function cmp(a,b){
		    return (a[0]==b[0] && a[1]==b[1] && a[2]==b[2] && a[3]==b[3])
			||
			(a[0]==b[2] && a[1]==b[3] && a[2]==b[0] && a[3]==b[1]);
		}
		
		if(i!==j){//not comparing against self
		    if(cmp(i,j)){//but they match geometrically
			removables.push(i);//queue the line for deletion
		    }
		}
	    });
	});

	//delete
	removables.map(function(i){
	    vecs.splice(vecs.indexOf(i), 1);
	    
	});
	

	
	
	return vecs;
    };
    
})();
