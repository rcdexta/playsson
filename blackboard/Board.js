/**
	The Blackboard implementation using three.js line geometry.
	
	An array of Glyphs can be offered to this board to get rendered as if a human is writting the glyphs
**/

THREE.Board = function ( glyphs ) {

	this.glyphs = glyphs;
	
	this.segments = [];
	
	this.glyphIndex = 0;
	
	this.index=0;
	
	this.lastX=0;
	this.lastY=0;
	
	this.x=0;
	this.y=0;
	this.z=0;
	
	this.x_width=25;
	this.y_width=0;
	
	this.buildSegments();
};

THREE.Board.prototype.constructor = THREE.Board;

THREE.Board.prototype.hasNext = function()
{
	return this.glyphIndex < this.glyphs.length || this.index < this.segments.length;
};

THREE.Board.prototype.addNextSegment = function(group)
{
	if(this.index < this.segments.length)
	{
		var segment = this.segments[this.index]
		var shape = this.createSegmentShape(segment,0.1/4,0);
		if(shape)
		{
			this.addShape(group,shape);
		}
		this.index++;
	}
	
	if(this.index >= this.segments.length)
	{
		if(this.glyphIndex < this.glyphs.length)
		{
			this.buildSegments();
			this.x += this.x_width;
		}
	}
};	
			
THREE.Board.prototype.addShape = function (group, shape) 
{
	var geometry = shape.createPointsGeometry();
	var material = new THREE.LineBasicMaterial( { linewidth: 1, color: 0x333333, transparent: false } );

	var line = new THREE.Line( geometry, material );
	line.position.set( this.x, this.y, this.z );
	group.add( line );
};
			
THREE.Board.prototype.createSegmentShape = function ( segment, scale, offset ) 
{
	if(!segment)
	{
		return null;
	}
			
	var shape = new THREE.Shape();
	
	var x, y, cpx, cpy, cpx0, cpy0, cpx1, cpy1, cpx2, cpy2;
	
	var outline = segment.split( ' ' );

	for ( var i = 0, l = outline.length; i < l; ) 
	{
		var action = outline[ i ++ ];

		switch ( action ) 
		{
			case 'm': // moveTo

				x = outline[ i ++ ] * scale + offset;
				y = outline[ i ++ ] * scale;

				shape.moveTo( x, y );

				this.lastX = x;
				this.lastY = y;
				
				break;

			case 'l': // lineTo

				x = outline[ i ++ ] * scale + offset;
				y = outline[ i ++ ] * scale;

				shape.moveTo(this.lastX,this.lastY);
				shape.lineTo( x, y );
				
				this.lastX = x;
				this.lastY = y;
			
				break;

			case 'q': // quadraticCurveTo

				cpx  = outline[ i ++ ] * scale + offset;
				cpy  = outline[ i ++ ] * scale;
				cpx1 = outline[ i ++ ] * scale + offset;
				cpy1 = outline[ i ++ ] * scale;

				shape.moveTo(this.lastX,this.lastY);
				shape.quadraticCurveTo( cpx1, cpy1, cpx, cpy );
				
				this.lastX = cpx;
				this.lastY = cpy;
			
				break;

			case 'b': // bezierCurveTo

				cpx  = outline[ i ++ ] * scale + offset;
				cpy  = outline[ i ++ ] * scale;
				cpx1 = outline[ i ++ ] * scale + offset;
				cpy1 = outline[ i ++ ] * scale;
				cpx2 = outline[ i ++ ] * scale + offset;
				cpy2 = outline[ i ++ ] * scale;
				
				shape.moveTo(this.lastX,this.lastY);
				shape.bezierCurveTo( cpx1, cpy1, cpx2, cpy2, cpx, cpy );
				
				this.lastX = cpx;
				this.lastY = cpy;

				break;
		}
	}
	return shape;
};


/**
	Reuse the segments array each time we build the segments.
	Check if we have built all the segments before invoking this 
*/
THREE.Board.prototype.buildSegments = function()
{
	if(this.glyphIndex >= this.glyphs.length)
	{
		return;
	}
	
	var glyph = this.glyphs[this.glyphIndex];
	
	this.segments.length=0;
	this.index=0;
	
	var outline = glyph.split( ' ' );
				
	for ( var i = 0, l = outline.length; i < l; ) 
	{
		var action = outline[ i ++ ];
		var segment = "";
		switch ( action ) 
		{
			case 'm': // moveTo
				
				segment=segment+"m ";
				segment += outline[ i ++ ]+" ";
				segment += outline[ i ++ ]+" ";
				
				break;
				
			case 'l':

				segment=segment+"l ";
				segment += outline[ i ++ ]+" ";
				segment += outline[ i ++ ]+" ";
				
				break;
				
			case 'b':
				segment=segment+"b ";
				segment += outline[ i ++ ] +" ";
				segment += outline[ i ++ ] +" ";
				segment += outline[ i ++ ] +" ";
				segment += outline[ i ++ ] +" ";
				segment += outline[ i ++ ] +" ";
				segment += outline[ i ++ ] +" ";
				
				break;
				
			case 'q':
				segment=segment+"q ";
				segment += outline[ i ++ ] +" ";
				segment += outline[ i ++ ] +" ";
				segment += outline[ i ++ ] +" ";
				segment += outline[ i ++ ] +" ";
		
				break;
		}
		if(segment.length > 0)
		{
			this.segments.push(segment);
		}
	}
	
	this.glyphIndex++;
};


