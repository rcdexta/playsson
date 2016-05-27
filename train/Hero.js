/**
	The Hero Object shall be a car that moves along path as directed by the Player. 
*/

class Hero
{

	constructor()
	{
		var geometry = new THREE.SphereGeometry( 0.5, 16, 16 );
		var material = new THREE.MeshPhongMaterial( { color: 'rgb(255,255,0)', emissive: 0x440000, shading: THREE.FlatShading, shininess: 0 } );
		this.mesh = new THREE.Mesh( geometry, material );
	}
	
	hero()
	{
		return this.mesh;
	}
}