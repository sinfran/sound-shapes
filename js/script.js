
// Global variables
var meshes = [];
var meshes_size = 0;
var spinning = [];


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
  if (meshes.length > 0) {
    meshes_size--;
    scene.remove(meshes[meshes_size]);
    meshes.pop();
  }
}

//////////////////////////////////////////////////////////////////////////////////////
// Clear all meshes in scene
///////////////////////////////////////////////////////////////////////////////////////
function clear() {
  while(meshes.length > 0) {
    meshes_size--;
    scene.remove(meshes[meshes_size]);
    meshes.pop();
  }
}

//////////////////////////////////////////////////////////////////////////////////////
// Add rotation to last created mesh
///////////////////////////////////////////////////////////////////////////////////////
function spinMesh() {
  if (meshes.length != 0) {
    spinning.push(meshes[meshes_size-1]);
  }
}


function createGeometry(geometry,colour,xpos,ypos) {
  if (geometry != null) {
    var geom;
    if (geometry == 'SphereGeometry') {
      geom = new THREE.SphereGeometry(1.0, 32, 32); // TODO: allow user to specify size
    } 
    else if (geometry == 'BoxGeometry') {
      geom = new THREE.BoxGeometry(2, 2, 2);
    }
    else if (geometry == 'TorusKnotGeometry') {
      geom = new THREE.TorusKnotGeometry(1, 0.4, 64, 8, 2, 3);
    }
    mesh = new THREE.Mesh(geom, new THREE.MeshPhongMaterial({color: colourNameToHex(colour)}));
    addMesh(mesh);
  }
  mesh.position.set(xpos,ypos,0);
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

// Add grid to platform:
var divisions = 15;
var gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

// Add world coordinate axes
var worldFrame = new THREE.AxesHelper(5) ;
scene.add(worldFrame);


//////////////////////////////////////////////////////////////////////////////////////
// Set up lights and fog
///////////////////////////////////////////////////////////////////////////////////////
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);
light = new THREE.PointLight(0xffffff);
light.position.set(0,4,2);
scene.add(light);
var vcsLight = new THREE.Vector3(light.position);

// Sphere representing light:
sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);  
lightSphere = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial( {color: 0xf6f0b6} ));
lightSphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(lightSphere);

scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );


//////////////////////////////////////////////////////////////////////////////////////
// Box
///////////////////////////////////////////////////////////////////////////////////////
boxGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
box = new THREE.Mesh( boxGeometry, new THREE.MeshLambertMaterial( {color: 0xcccccc} ) );
box.position.set(-4, 0.8, 0);
scene.add( box );
meshes.push(box);
meshes_size++;



//////////////////////////////////////////////////////////////////////////////////////
// Toon shader
///////////////////////////////////////////////////////////////////////////////////////
var toonMaterial = new THREE.ShaderMaterial( {
  uniforms: {
   lightPosition: {value: new THREE.Vector3(0.0,0.0,-1.0) },
   myColor: { value: new THREE.Vector4(0.79,0.79,0.83,1.0) }
 },
 vertexShader: document.getElementById( 'myVertShader').textContent,
 fragmentShader: document.getElementById( 'toonFragShader' ).textContent
} );



//////////////////////////////////////////////////////////////////////////////////////
// Torus knot 
///////////////////////////////////////////////////////////////////////////////////////
var geometry = new THREE.TorusKnotGeometry(1, 0.4, 64, 8, 2, 3);
var torusKnot = new THREE.Mesh( geometry, toonMaterial );
torusKnot.position.set(-4.5,2.25,-3);
torusKnot.scale.set(1.25,1.25,1.25);
scene.add( torusKnot );
meshes.push(torusKnot);
meshes_size++;



/////////////////////////////////////////////////////////////////////////////////////
//  Standford bunny
/////////////////////////////////////////////////////////////////////////////////////
var bunnyMaterial = new THREE.ShaderMaterial( {

  vertexShader: document.getElementById( 'bunnyVertexShader' ).textContent,
  fragmentShader: document.getElementById( 'bunnyFragmentShader' ).textContent
} );

var manager = new THREE.LoadingManager();
manager.onProgress = function ( item, loaded, total ) {
  console.log( item, loaded, total );
};

var bunnyTexture = bunnyMaterial;

var onProgress = function ( xhr ) {
  if ( xhr.lengthComputable ) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round(percentComplete, 2) + '% downloaded' );
  }
};

var onError = function ( xhr ) {
};

var loader = new THREE.OBJLoader( manager );
loader.load( '/meshes/stanford_bunny.obj', function ( object ) {
  object.traverse( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
      child.material = bunnyTexture;
    }
  });
  scene.add( object );
  meshes.push(object);
  meshes_size++;
  object.scale.set(7.25,7.25,7.25);
  object.position.x = box.position.x;
  object.position.y = 1.3;
  object.position.z = box.position.z;
}, onProgress, onError );



//////////////////////////////////////////////////////////////////////////////////////
// Keyboard listener
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  vcsLight.set(light.position.x, light.position.y, light.position.z);
  vcsLight.applyMatrix4(camera.matrixWorldInverse);
  toonMaterial.uniforms.lightPosition.value = vcsLight;
  toonMaterial.uniforms.lightPosition.value.needsUpdate = true;
  if (keyboard.pressed("W")) {
    console.log('W pressed');
    light.position.y += 0.1;
  } else if (keyboard.pressed("S"))
  light.position.y -= 0.1;
  if (keyboard.pressed("A"))
    light.position.x -= 0.1;
  else if (keyboard.pressed("D"))
    light.position.x += 0.1;

  lightSphere.position.set(light.position.x, light.position.y, light.position.z);

  if (spinning.length != 0) {
    spinning.forEach(function(mesh) {
      mesh.rotation.y += 0.01;
    });
  }
}

var gui = new dat.GUI();

var guiCommandsFolder = gui.addFolder('Commands');

var commands = {
  clear: function() {
    clear();
  },
  delete: function() {
    undo();
  },
  spin: function() {
    spinMesh();
  },
  sphere: function() {
    createGeometry('SphereGeometry',0,0,1);
  },
  box: function() {
    createGeometry('BoxGeometry',0,0,1);
  },
  torusKnot: function() {
    createGeometry('TorusKnotGeometry',0,0,1);
  }
};

guiCommandsFolder.add( commands, 'delete' );
guiCommandsFolder.add( commands, 'clear' );
guiCommandsFolder.add( commands, 'spin' );
var guiCreateFolder = guiCommandsFolder.addFolder('create');
guiCreateFolder.add( commands, 'sphere');
guiCreateFolder.add( commands, 'box');
guiCreateFolder.add( commands, 'torusKnot');





///////////////////////////////////////////////////////////////////////////////////////
// Update callback function
///////////////////////////////////////////////////////////////////////////////////////
function update() {
  checkKeyboard();
  requestAnimationFrame(update);      // request the next update call
  renderer.render(scene, camera);

  for (var i in gui.__controllers) {
    gui.__controllers[i].updateDisplay();
  }
}

update();