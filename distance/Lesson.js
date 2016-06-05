/**
	To converse with the Service to exchange information about
	the student-system interaction
*/

class Lesson
{

	constructor(scene)
	{
		this.scene = scene;
		var me = this;

		var textureLoader = new THREE.TextureLoader();

		var pandaTexture = textureLoader.load('textures/panda.jpg');
		this.pandaMaterial = new THREE.MeshBasicMaterial( {map:pandaTexture} );

		var errorTexture = textureLoader.load('textures/error.png');
		this.errorMaterial = new THREE.MeshBasicMaterial( {map:errorTexture} );

		this.boardMaterial = new THREE.MeshLambertMaterial( { color: "rgb(28,96, 97)"} );

		this.textMaterial = new THREE.MultiMaterial( [
					new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } ), // front
					new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } ) // side
				] );

		this.lessonBoards = []
		

		var fontName = 'helvetiker';
		var fontWeight = 'bold';

		var loader = new THREE.FontLoader();		
		loader.load( 'fonts/' + fontName + '_' + fontWeight + '.typeface.js', function ( response ) {
			me.font = response;
		} );

		this.written = false;
	}

	installLessonBoardAt(id)
	{
		var boardGeo = new THREE.BoxGeometry(10,4);
		var warningInfoGeo = new THREE.BoxGeometry(4,2);

		var place = 0.01 * (id); 
		var point = curve.getPointAt(place);
		var tangent = curve.getTangentAt(place);

		var board = new THREE.Mesh(boardGeo,this.boardMaterial);
		var warningInfoLeft = new THREE.Mesh(warningInfoGeo,this.errorMaterial);
		var warningInfoRight = new THREE.Mesh(warningInfoGeo,this.pandaMaterial);
	
		var lesson = new THREE.Group();
		lesson.add(board);
		lesson.add(warningInfoLeft)
		lesson.add(warningInfoRight)
	
		lesson.position.copy(point);
		lesson.position.y += 4.5
		lesson.rotation.y = tangent.x-0.314
		
		warningInfoLeft.position.y += 3
		warningInfoLeft.position.x += 3
	
		warningInfoRight.position.y += 3
		warningInfoRight.position.x -= 3
	
		this.lessonBoards.push(lesson);
	
		this.scene.add(lesson);				
	}

	
	paintFirstInstruction()
	{

		var textNode = this.lessonBoards[0];

		var line1 = "Welcome to this Journey to Pandaras"
		var line2 = "Pandaras is a wonderful city that is located at 25 metres from here."
		var line3 = "You will travel on this elevated high-way that leads to Pandaras."
		var line4 = "The high-way is built up with colored slabs."
		var line5 = "Beware of broken slabs on the way."
		var line6 = "Hint: Observe the number of slabs between posts."
		var line7 = "A panda will help you on your mission."


		var y = this.addHeaderText(textNode,line1,1.5);
		y=this.addText(textNode,line2,y,"ins_1");
		y=this.addText(textNode,line3,y,"ins_2");
		y=this.addText(textNode,line4,y,"ins_3");
		y=this.addText(textNode,line5,y,"ins_4");
		y=this.addText(textNode,line6,y,"ins_5");
		y=this.addText(textNode,line7,y,"ins_6");

		textNode.rotation.y+=0.628
	}

	paintSecondInstruction()
	{

		this.removeText("ins_1")
		this.removeText("ins_2")
		this.removeText("ins_3")
		this.removeText("ins_4")
		this.removeText("ins_5")
		this.removeText("ins_6")

		var line = "Wishing you a safe journey."

		var textNode = this.lessonBoards[0];
		this.addText(textNode,line,1,"ins_2");
	}

	removeText(name)
	{
		var selectedObject = this.scene.getObjectByName(name);
		selectedObject.visible = false;				
		this.scene.remove( selectedObject );
	}

	paintLesson()
	{

		var textNode = this.lessonBoards[1];

		var tiles = FAULT_FACTOR-1;

		var line1 = "What is the distance you travelled?"	
		var line2 = "You travelled "+tiles+" slabs.";
		var line3 = "You observed "+DIVISION+" slabs for every metre.";
		var line4 = "Hence the length of one slab = 1 meter/"+DIVISION;
		var line5 = "Thus the total distance travelled = "+tiles+" x 1/"+DIVISION+" metre."		
		var line6 = "So, You travelled a distance of "+(tiles*1/DIVISION)+ " metre."

		var y = this.addHeaderText(textNode,line1,1.5);
		y=this.addText(textNode,line2,y,"lesson_l_1");
		y=this.addText(textNode,line3,y,"lesson_l_2");
		y=this.addText(textNode,line4,y,"lesson_l_3");
		y=this.addText(textNode,line5,y,"lesson_l_4");
		y=this.addText(textNode,line6,y,"lesson_l_5");
	}

	addText(container,text,y,line_id)
	{
		var lineGeo = new THREE.TextGeometry( text, {font:this.font, size: 0.20, height:0.15, material: 0, extrudeMaterial: 1} )
		var mesh = new THREE.Mesh(lineGeo,textMaterial);
		container.add(mesh);


		mesh.position.x+=4.5
		mesh.position.y+=y
		mesh.rotation.y = Math.PI
		mesh.name = line_id

		return y-0.5;
	}

	addHeaderText(container,text,y)
	{
		var lineGeo = new THREE.TextGeometry( text, {font:this.font, size: 0.20, height:0.15, material: 0, extrudeMaterial: 1} )
		var mesh = new THREE.Mesh(lineGeo,textMaterial);
		container.add(mesh);

		mesh.position.x+=2.5
		mesh.position.y+=y
		mesh.rotation.y = Math.PI

		return y-0.5;
	}
	
}