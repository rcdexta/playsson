/**
    The Terrain will be formed with a matrix of Four Way Nodes with Obstacles.

    The Hero needs to select the right path that has less obstacles.
*/

class Terrain
{
	constructor(step) 
	{
		this.radius = 16;
		this.width	= 8;

		this.INITIAL_X = -96
		this.INITIAL_Z = 10
		this.INITIAL_Y = -15 +(step * (this.radius+this.width) * 10)
		
		this.tileFactory = new TerrainTileFactory(this.radius,this.width)
		
        this.gap = (this.radius+this.width)*2
		
		this.roofMaterial = new THREE.MeshPhongMaterial( { color: 'rgb(128,128,128)', emissive:0x110c0c, specular:0x559b61, shading: THREE.FlatShading, shininess: 50 } );
   }
	
    /**
        To provide a matrix of Fourway Nodes dispersed with obstacles to offer challenge and a Target
    */
    build()
    {
        let floor = this.buildFloorMatrix()

		floor.rotateX(-Math.PI /2)
        
        return floor;
    }
    
    /**
        Prepare a matrix of Four way Nodes along with Obstacles and target
    
        The Maxtrix will be a Positioned Vertically and later will be rotated on the x-axis to form a Terrain
    */
    
    buildFloorMatrix()
    {
  		let floor = new THREE.Group()

        var x = this.INITIAL_X 
        var y = this.INITIAL_Y
        
        for(var row=0;row<50;row++)
        {
            for(var col=0;col<5;col++)
            {
				let tile = this.tileFactory.makeFourWayNode()
				
				tile.position.set(x,y,this.INITIAL_Z)
                
                floor.add(tile)
                
                x = x+this.gap
            }
            
			if(row ==40)
			{
				floor.add(this.makeRoof());
			}
			
            y = y+(this.gap)
            x = this.INITIAL_X 
        }
        
        return floor
    }
	
	makeRoof()
	{
		var CustomCircularCurve = THREE.Curve.create(
			function ( scale ) { //custom curve constructor
				this.scale = (scale === undefined) ? 1 : scale;
			},

			function ( t ) { 
				var tx = Math.cos(Math.PI * t);
				var ty = Math.sin(Math.PI * t);
				var tz = 1;

				return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
			}
		);

		var path = new CustomCircularCurve( (this.radius+this.width)*(5));
		var geometry = new THREE.TubeGeometry(path,100,this.width*20,2,false);
		var roof = new THREE.Mesh( geometry, this.roofMaterial );
		
		roof.rotateX(Math.PI/2);
		roof.position.x = 0;
		roof.position.y = 300
		
		
		return roof;
	}

    
}