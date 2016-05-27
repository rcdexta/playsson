//
//  To build a Tile using bezier path
//
//  Inference
//
//  Created by Harini Maniam R on 18/11/15.
//  Copyright (c) 2015 Harini Maniam R. All rights reserved.
//
class TerrainTileFactory 
{
	constructor(radius,width)
	{
		this.radius = radius
		this.width = width
		this.flag = false;
		
		this.floorGeometry = new THREE.PlaneBufferGeometry( (this.radius+this.width)*2, (this.radius+this.width)*2);
		
		this.floorMaterial1 = new THREE.MeshBasicMaterial( {
						color: new THREE.Color().setHSL( 0.5, 0.65, ( 1/ 15 ) * 0.4 + 0.1 ),
						transparent: true
					} );
		
		this.floorMaterial2 = new THREE.MeshBasicMaterial( {
						color: new THREE.Color().setHSL( 0.3, 0.75, ( 1/ 15 ) * 0.4 + 0.1 ),
						transparent: true
					} );

	}
	
	/**
		To build the base material for the Fourway Node
	*/
	 makeFourWayNode()
	{
		let net = this.radius+this.width
		
		let rightBlock = this.makeRightBlock()
		let leftBlock = this.makeLeftBlock()
		let rBlock = this.makeRBlock()
		let lBlock = this.makeLBlock()
		let floor = this.makeFloor()
		
		
		var node = new THREE.Group();
		node.add(leftBlock)
		node.add(rightBlock)
		node.add(rBlock)
		node.add(lBlock)
		node.add(floor);
		
		leftBlock.position.set(-net,-net,0)
		lBlock.position.set(net,net,0)
		rBlock.position.set(-net,net,0)
		rightBlock.position.set(net,-net,0)
		
		return node
	}
	
	

	/**
		To mark the presence of a tile
	*/
	makeFloor()
	{
		var floor;
		if(this.flag)
		{
			floor = new THREE.Mesh( this.floorGeometry, this.floorMaterial2 );
		}
		else
		{
			floor = new THREE.Mesh( this.floorGeometry, this.floorMaterial1 );
		}
		
		this.flag = !this.flag;
		floor.position.z=-(this.radius)/2
		return floor;
	}
	
	

	/**
		A Block that appears to turn Left if held vertically. 1st Quandrant
	*/
	 makeLeftBlock()
	{
		let child = this.makeMesh(this.makeLeftTurnPath())
		let jointX = this.getJoint()
		let jointY = this.getJoint()
	   
		let block = new THREE.Group()
		
		block.add(child)
		block.add(jointX)
		block.add(jointY)
		
		let delta = this.width/2
		   
		jointX.position.set(this.radius-delta, 0, 1)
		jointY.position.set(0,this.radius-delta, 1)

		return block
	}
	

	 /**
		A block that appears to Turn Right if held vertically. 2nd Quadrant
	*/
	 makeRightBlock() 
	{
		let child = this.makeMesh(this.makeRightTurnPath())
		let jointX = this.getJoint()
		let jointY = this.getJoint()
		
		let block = new THREE.Group()
		
		block.add(child)
		block.add(jointX)
		block.add(jointY)
		
		let delta = this.width/2
		
		jointX.position.set(-(this.radius-delta), 0, 1)
		jointY.position.set(0,this.radius-delta, 1)
		
		return block
	}



	/**
		A block that appears like a L Shaped Curved. This can be constructed by rotating the Right Turn Shape
		in the Z-Axis by Pi/2 radians (90 Degrees)
	*/
	 makeLBlock() 
	{
		let child = this.makeMesh(this.makeRightTurnPath())
		let jointX = this.getJoint()
		let jointY = this.getJoint()
		
		let block = new THREE.Group()
		
		block.add(child)
		block.add(jointX)
		block.add(jointY)
		
		let delta = this.width/2
		
	   
		jointX.position.set(-(this.radius-delta), 0, 1)
		jointY.position.set(0,this.radius-delta, 1)
		
		block.rotateZ(Math.PI / 2)
		return block
	}
	
	/**
		A block that appears to take some one to the Right Hand side from bottom to top if held vertically
		This can be constructed by rotating the Left Turn Shape in the Z-Axis by Pi/2 radians
	*/
	 makeRBlock() 
	{
		let child = this.makeMesh(this.makeLeftTurnPath())
		let jointX = this.getJoint()
		let jointY = this.getJoint()
		
		let block = new THREE.Group()
		
		block.add(child)
		block.add(jointX)
		block.add(jointY)
		
		let delta = this.width/2
		
		jointX.position.set(this.radius-delta, 0, 1)
		jointY.position.set(0,this.radius-delta, 1)
		
		block.rotateZ(-Math.PI / 2)
		
		return block
	}

	/**
		The Joints will look like Tall Buildings when two Bezier paths are integrated.
	**/
	 getJoint() 
	{
		var geometry = new THREE.BoxGeometry( this.width/2, this.width/2, this.width )

		var material = new THREE.MeshBasicMaterial( { color:0x407000} );
		
		var joint = new THREE.Mesh( geometry, material )
					
		return joint
	}

	/**
		Wrap the Given Shape in a Mesh
	*/
	 makeMesh(shape)
	{
		var geometry = new THREE.ShapeGeometry( shape )

		var material = new THREE.MeshPhongMaterial( { color: 0x606066, emissive: 0x407000, shading: THREE.FlatShading, shininess: 0 } );
		
		var mesh = new THREE.Mesh( geometry, material )
		
		return mesh
	}		
	
	/**
		A path which is equivalent to the 1st Quadrant of a Circle that looks like a right-turn
		from x-0.
		
		To Return a collection of BezierPath pushed into a Shape. 
	*/
	
	 makeRightTurnPath()  
	{
			let path = new THREE.Shape()
			
			let r1 = this.radius
			let r2 = r1-this.width
		   
			var x = r2 * Math.cos(this.toRadian(90))
			var y = r2 * Math.sin(this.toRadian(90))
			
			path.moveTo(x,y)
			
			path.lineTo(x,y+this.width)
			
			var angle= 90
			let inc = 5
			
			for(angle = 90; angle < 180+inc; angle = angle+inc)
			{
				x = r1 * Math.cos(this.toRadian(angle))
				y = r1 * Math.sin(this.toRadian(angle))
				path.lineTo(x,y)
			}
			
			path.lineTo(x+this.width,y)
			for(angle = 180; angle > 90+inc; angle = angle-inc)
			{
				let x = r2 * Math.cos(this.toRadian(angle))
				let y = r2 * Math.sin(this.toRadian(angle))
				
				path.lineTo(x,y)
			}
			
			return path
	}


	/**
		A path which is equivalent to the 2nd Quadrant of a Circle that looks like a Left-turn
		
		Returns a Bezier Path
	*/
	 makeLeftTurnPath() 
	{
		let path = new THREE.Shape()
		
		let r1 = this.radius
		let r2 = r1-this.width
		
		path.moveTo(r2,0)
		path.lineTo(r2+this.width,0)
		
		var angle = 0
		let inc = 5

		var x=0
		var y=0
		for (angle = 0; angle < 90+inc; angle = angle+inc)
		{
			x = r1 * Math.cos(this.toRadian(angle))
			y = r1 * Math.sin(this.toRadian(angle))

			path.lineTo(x,y)
		}
		
		path.lineTo(x,y-this.width)
		
		for(angle = 90; angle > -inc; angle = angle-inc)
		{
			x = r2 * Math.cos(this.toRadian(angle))
			y = r2 * Math.sin(this.toRadian(angle))

			path.lineTo(x,y)
		}
		
		return path
	}
    
	 /**
			to convert a Degree to Radian. Pi Radian is 180 degree.
	 */
	 
	 toRadian(deg) 
	{
		return (22 * deg)/(7*180)
	}
}