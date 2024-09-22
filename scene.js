import * as THREE from 'three';
import { createCamera } from './camera.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

//Initial scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x777777);

const camera = createCamera(document.body);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function draw() {
    renderer.render(scene, camera.camera);
}

function start() {
    renderer.setAnimationLoop(draw);
}

function stop() {
    renderer.setAnimationLoop(null);
}


// Add mouse event listeners
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('mousemove', onMouseMove);

// Handle window resize
window.addEventListener('resize', () => {
    camera.camera.aspect = window.innerWidth / window.innerHeight;
    camera.camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

export function onMouseDown(){
   camera.onMouseDown();
   console.log('heyyy')
}

export function onMouseUp(){
    camera.onMouseUp();
    console.log('heyyy1')
}

export function onMouseMove(event){
    camera.onMouseMove(event);
    console.log('heyyy2')
}


if ( WebGL.isWebGL2Available() ) {
    // Initiate function or other initializations here
    start(); 
} else {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.getElementById( 'container' ).appendChild( warning );
}


