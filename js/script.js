
// Global variables
var meshes = [];
var meshes_size = 0;


var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );

var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x6e8bd1);     
canvas.appendChild(renderer.domElement);

//////////////////////////////////////////////////////////////////////////////////////
// Set up camera
///////////////////////////////////////////////////////////////////////////////////////
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(0,12,20);
camera.lookAt(0,0,0);
scene.add(camera);

//////////////////////////////////////////////////////////////////////////////////////
// Set up orbit controls of camera
///////////////////////////////////////////////////////////////////////////////////////
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

//////////////////////////////////////////////////////////////////////////////////////
// Adapt to window resizing
///////////////////////////////////////////////////////////////////////////////////////
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

//////////////////////////////////////////////////////////////////////////////////////
// Event listener resize
///////////////////////////////////////////////////////////////////////////////////////
window.addEventListener('resize',resize);
resize();

//////////////////////////////////////////////////////////////////////////////////////
// Disable scrollbar funtion
///////////////////////////////////////////////////////////////////////////////////////
window.onscroll = function () {
 window.scrollTo(0,0);
}

//////////////////////////////////////////////////////////////////////////////////////
// Add to mesh list
///////////////////////////////////////////////////////////////////////////////////////
function addMesh(mesh) {
  meshes[meshes_size] = mesh;
  meshes_size++;
}

//////////////////////////////////////////////////////////////////////////////////////
// Remove the last mesh created
///////////////////////////////////////////////////////////////////////////////////////
function undo() {
  meshes_size--;
  scene.remove(meshes[meshes_size]);
  meshes.pop();
}

function createGeometry(geometry,colour,xpos) {
  if (geometry == 'SphereGeometry') {
    var geom = new THREE.SphereGeometry(1.0, 32, 32); // TODO: allow user to specify size
    mesh = new THREE.Mesh(geom, new THREE.MeshPhongMaterial({color: colourNameToHex(colour)}))
    addMesh(mesh);
   
  } else if (geometry == 'BoxGeometry') {
    var geom = new THREE.BoxGeometry(2, 2, 2); // TODO: allow user to specify size
    mesh = new THREE.Mesh(geom, new THREE.MeshPhongMaterial({color: colourNameToHex(colour)}))
    addMesh(mesh);

  }
     mesh.position.set(xpos,1,0);
    scene.add(mesh); 
}


//////////////////////////////////////////////////////////////////////////////////////
// Scene platform
///////////////////////////////////////////////////////////////////////////////////////
var size = 15;
floorMaterial = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.975});
floorGeometry = new THREE.BoxGeometry(size, size, 2.15);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

var divisions = 15;
var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);
light = new THREE.PointLight(0xffffff);
light.position.set(0,4,2);
scene.add(light);
sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments

sphere = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial( {color: 0xf6f0b6} ));
sphere.position.set(0,4,2);
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

boxGeometry = new THREE.BoxGeometry( 2, 2, 2 );
box = new THREE.Mesh( boxGeometry, new THREE.MeshLambertMaterial( {color: 0xcccccc} ) );
box.position.set(-4, 1, 0);
scene.add( box );


var worldFrame = new THREE.AxesHelper(5) ;
scene.add(worldFrame);


//////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
}


///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////
function update() {
  checkKeyboard();
  requestAnimationFrame(update);      // requests the next update call;  this creates a loop
  renderer.render(scene, camera);


}

update();