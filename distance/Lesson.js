/**
	A controller that converses with the Service to exchange information about
	the student-system interaction
*/

class Lesson
{

	constructor(scene)
	{

	}
	
	function installLessonBoardAt(id)
	{
		var warningMaterial = new THREE.MeshLambertMaterial( { color: "rgb(107,0, 1)"} );

		var boardGeo = new THREE.BoxGeometry(10,4);
		var warningInfoGeo = new THREE.BoxGeometry(4,2);
	

		var place = 0.01 * (id); 
		var point = curve.getPointAt(place);
		var tangent = curve.getTangentAt(place);

		var lesson = new THREE.Group();

		var board = new THREE.Mesh(boardGeo,boardMaterial);
		var warningInfoLeft = new THREE.Mesh(warningInfoGeo,errorMaterial);
		var warningInfoRight = new THREE.Mesh(warningInfoGeo,pandaMaterial);
	
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
	
		lessonBoards.push(lesson);
	
		scene.add(lesson);				
	}
	
}