/**
	The Geometry required for the games environment
*/
var SkyGeometry = function () {

	THREE.BufferGeometry.call( this );

	var vertices = [];

	for ( var i = 0; i < 100; i ++ ) {

		var x = Math.random() * 8000 - 4000;
		var y = Math.random() * 500 + 500;
		var z = Math.random() * 8000 - 4000;

		var size = Math.random() * 400 + 200;

		vertices.push( x - size, y, z - size );
		vertices.push( x + size, y, z - size );
		vertices.push( x - size, y, z + size );

		vertices.push( x + size, y, z - size );
		vertices.push( x + size, y, z + size );
		vertices.push( x - size, y, z + size );

	}

	this.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );

};

SkyGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );

var TreesGeometry = function ( landscape ) {

	THREE.BufferGeometry.call( this );

	var vertices = [];
	var colors = [];

	var raycaster = new THREE.Raycaster();
	raycaster.ray.direction.set( 0, -1, 0 );

	for ( var i = 0; i < 2000; i ++ ) {

		var x = Math.random() * 5000 - 2500;
		var z = Math.random() * 5000 - 2500;

		raycaster.ray.origin.set( x, 500, z );

		var intersections = raycaster.intersectObject( landscape );

		if ( intersections.length === 0 ) continue;

		var y = intersections[ 0 ].point.y;

		var height = Math.random() * 50 + 5;

		var angle = Math.random() * Math.PI * 2;

		vertices.push( x + Math.sin( angle ) * 10, y, z + Math.cos( angle ) * 10 );
		vertices.push( x, y + height, z );
		vertices.push( x + Math.sin( angle + Math.PI ) * 10, y, z + Math.cos( angle + Math.PI ) * 10 );

		angle += Math.PI / 2;

		vertices.push( x + Math.sin( angle ) * 10, y, z + Math.cos( angle ) * 10 );
		vertices.push( x, y + height, z );
		vertices.push( x + Math.sin( angle + Math.PI ) * 10, y, z + Math.cos( angle + Math.PI ) * 10 );

		var random = Math.random() * 0.1;

		for ( var j = 0; j < 6; j ++ ) {

			colors.push( 0.2 + random, 0.4 + random, 0 );

		}

	}

	this.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( vertices ), 3 ) );
	this.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( colors ), 3 ) );

};

TreesGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
