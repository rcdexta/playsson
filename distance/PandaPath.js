var PandaPathGeometry = function ( curve, size ) {

	THREE.BufferGeometry.call( this );

	var vertices = [];
	var normals = [];
	var colors = [];

	var up = new THREE.Vector3( 0, 1, 0 );
	var forward = new THREE.Vector3();
	var right = new THREE.Vector3();

	var quaternion = new THREE.Quaternion();
	var prevQuaternion = new THREE.Quaternion();
	prevQuaternion.setFromAxisAngle( up , Math.PI / 2 );

	var point = new THREE.Vector3();
	var prevPoint = new THREE.Vector3();

	var PI2 = Math.PI * 2;

	var sides = 6;
	var rail = [];
	var sideWalk = [];
	var road=[]
	

	var vector = new THREE.Vector3();
	var normal = new THREE.Vector3();

	var vector1 = new THREE.Vector3();
	var vector2 = new THREE.Vector3();
	var vector3 = new THREE.Vector3();
	var vector4 = new THREE.Vector3();

	var normal1 = new THREE.Vector3();
	var normal2 = new THREE.Vector3();
	var normal3 = new THREE.Vector3();
	var normal4 = new THREE.Vector3();

	var offset = new THREE.Vector3();
	
	var black = [ 0, 0, 0 ];
	var yellow = [ 1, 1, 0 ];
	var cyan = [1.05,0.89,0.65];
	var blue = [1.02,0.79,0.61];
	
	var defects = [];
	
	var extrudeShape = function ( shape, offset, color ) {

		for ( var j = 0, jl = shape.length; j < jl; j ++ ) {

			var point1 = shape[ j ];
			var point2 = shape[ ( j + 1 ) % jl ];

			vector1.copy( point1 ).add( offset );
			vector1.applyQuaternion( quaternion );
			vector1.add( point );

			vector2.copy( point2 ).add( offset );
			vector2.applyQuaternion( quaternion );
			vector2.add( point );

			vector3.copy( point2 ).add( offset );
			vector3.applyQuaternion( prevQuaternion );
			vector3.add( prevPoint );

			vector4.copy( point1 ).add( offset );
			vector4.applyQuaternion( prevQuaternion );
			vector4.add( prevPoint );

			vertices.push( vector1.x, vector1.y, vector1.z );
			vertices.push( vector2.x, vector2.y, vector2.z );
			vertices.push( vector4.x, vector4.y, vector4.z );

			vertices.push( vector2.x, vector2.y, vector2.z );
			vertices.push( vector3.x, vector3.y, vector3.z );
			vertices.push( vector4.x, vector4.y, vector4.z );

			//

			normal1.copy( point1 );
			normal1.applyQuaternion( quaternion );
			normal1.normalize();

			normal2.copy( point2 );
			normal2.applyQuaternion( quaternion );
			normal2.normalize();

			normal3.copy( point2 );
			normal3.applyQuaternion( prevQuaternion );
			normal3.normalize();

			normal4.copy( point1 );
			normal4.applyQuaternion( prevQuaternion );
			normal4.normalize();

			normals.push( normal1.x, normal1.y, normal1.z );
			normals.push( normal2.x, normal2.y, normal2.z );
			normals.push( normal4.x, normal4.y, normal4.z );

			normals.push( normal2.x, normal2.y, normal2.z );
			normals.push( normal3.x, normal3.y, normal3.z );
			normals.push( normal4.x, normal4.y, normal4.z );

			colors.push( color[ 0 ], color[ 1 ], color[ 2 ] );
			colors.push( color[ 0 ], color[ 1 ], color[ 2 ] );
			colors.push( color[ 0 ], color[ 1 ], color[ 2 ] );

			colors.push( color[ 0 ], color[ 1 ], color[ 2 ] );
			colors.push( color[ 0 ], color[ 1 ], color[ 2 ] );
			colors.push( color[ 0 ], color[ 1 ], color[ 2 ] );
		}

	};

	var extrudeFaultyShape = function ( shape, offset, color ) {

		for ( var j = 0, jl = shape.length; j < jl; j ++ ) {

			var point1 = shape[ j ];
			var point2 = shape[ ( j + 1 ) % jl ];

			vector1.copy( point1 ).add( offset );
			vector1.applyQuaternion( quaternion );
			vector1.add( point );

			vector2.copy( point2 ).add( offset );
			vector2.applyQuaternion( quaternion );
			vector2.add( point );

			vector3.copy( point2 ).add( offset );
			vector3.applyQuaternion( prevQuaternion );
			vector3.add( prevPoint );

			vector4.copy( point1 ).add( offset );
			vector4.applyQuaternion( prevQuaternion );
			vector4.add( prevPoint );

			vertices.push( vector1.x, vector1.y-0.5, vector1.z );
			vertices.push( vector2.x, vector2.y-0.1, vector2.z );
			vertices.push( vector4.x, vector4.y-0.25, vector4.z );

			vertices.push( vector2.x, vector2.y-0.1, vector2.z );
			vertices.push( vector3.x, vector3.y-0.5, vector3.z );
			vertices.push( vector4.x, vector4.y-0.75, vector4.z );

			normal1.copy( point1 );
			normal1.applyQuaternion( quaternion );
			normal1.normalize();

			normal2.copy( point2 );
			normal2.applyQuaternion( quaternion );
			normal2.normalize();

			normal3.copy( point2 );
			normal3.applyQuaternion( prevQuaternion );
			normal3.normalize();

			normal4.copy( point1 );
			normal4.applyQuaternion( prevQuaternion );
			normal4.normalize();

			normals.push( normal1.x, normal1.y-1, normal1.z );
			normals.push( normal2.x, normal2.y-1, normal2.z );
			normals.push( normal4.x, normal4.y, normal4.z );

			normals.push( normal2.x, normal2.y, normal2.z );
			normals.push( normal3.x, normal3.y, normal3.z );
			normals.push( normal4.x, normal4.y, normal4.z );

			colors.push( color[ 0 ], color[ 1 ], color[ 2 ] );
			colors.push( color[ 0 ], color[ 1 ], color[ 2 ] );
			colors.push( color[ 0 ], color[ 1 ], color[ 2 ] );

			colors.push( color[ 0 ], color[ 1 ], color[ 2 ] );
			colors.push( color[ 0 ], color[ 1 ], color[ 2 ] );
			colors.push( color[ 0 ], color[ 1 ], color[ 2 ] );
		}

	};

	/**
		Let us make a particular segment as black for the students to calculate
	*/
	var getColor = function (index)
	{
		return index%2==0?cyan:blue;
	};
	
	var isFaulty = function(index)
	{
		return index == 16;
	}

	
	/**
		Create the Shape Segments
	*/
	for ( var i = 0; i < sides; i ++ ) {
		var angle = ( i / sides ) * PI2;
		sideWalk.push( new THREE.Vector3( Math.cos( angle ) * 0.50, 0.25, 1 ) );
		rail.push(new THREE.Vector3( Math.cos( angle ),2.5,1 ));
		road.push(new THREE.Vector3( Math.cos( angle )*6.25,0.25,1 ));
	}


	/**
		Extrude the Shapdes
	*/
	for ( var i = 1; i <= size; i ++ ) {

		point.copy( curve.getPointAt( i / size ) );

		up.set( 0, 1, 0 );

		forward.subVectors( point, prevPoint ).normalize();
		right.crossVectors( up, forward ).normalize();
		up.crossVectors( forward, right );

		var angle = Math.atan2( forward.x, forward.z );

		quaternion.setFromAxisAngle( up, angle );
		
		var color = getColor(i);
		
		if(isFaulty(i))
		{
			extrudeFaultyShape(rail, offset.set( 0, 0, 0 ), color);
		}
		else
		{
			extrudeShape(rail,offset.set(0,0,0), color);
		}
		
		extrudeShape(sideWalk,offset.set(-7,0,0),yellow);
		extrudeShape(sideWalk,offset.set(7,0,0),yellow);
		extrudeShape(road,offset.set(0,0,0),black);
		
		prevPoint.copy( point );
		prevQuaternion.copy( quaternion );
	}

	this.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
	this.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( normals ), 3 ) );
	this.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( colors ), 3 ) );

};

PandaPathGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
