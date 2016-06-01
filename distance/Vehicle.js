/**
	The Hero Object shall be a car that moves along path as directed by the Player. 
*/

class Vehicle
{
	constructor(scene,path,velocity)
	{

		var geometry = new THREE.BoxGeometry( 0.25, 3, 3 );
		var material = new THREE.MeshPhongMaterial( { color: 0xff55ff, emissive: 0x004400, shading: THREE.FlatShading, shininess: 10 } );
		this.mesh = new THREE.Mesh( geometry, material );
		
		this.scene = scene;
		this.path = path;
		this.velocity = velocity;
		
		this.scene.add(this.mesh);
		this.progress = 0;
	}
	
	run()
	{
		this.progress += this.velocity;
		this.progress = this.progress%1;

		var position = new THREE.Vector3();
		var tangent = new THREE.Vector3();
		var lookAt = new THREE.Vector3();
			
		position.copy(this.path.getPointAt( this.progress) );
		tangent.copy(this.path.getTangentAt(this.progress) );
				
		position.x+=10;
				
		this.mesh.position.copy( position );
		lookAt.copy(position).add(tangent);
		this.mesh.lookAt(lookAt)
	}
}