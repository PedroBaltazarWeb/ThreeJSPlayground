import * as THREE from 'three';
import { createCamera } from './camera.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

//Initial scene setup
const gameWindow = document.getElementById('render-target');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x777777);

const camera = createCamera(gameWindow);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( gameWindow.offsetWidth, gameWindow.offsetHeight );
gameWindow.appendChild( renderer.domElement );

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
gameWindow.addEventListener('mousedown', onMouseDown);
gameWindow.addEventListener('mouseup', onMouseUp);
gameWindow.addEventListener('mousemove', onMouseMove);

// Handle window resize
window.addEventListener('resize', () => {
    camera.camera.aspect = gameWindow.offsetWidth / gameWindow.offsetHeight;
    camera.camera.updateProjectionMatrix();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
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
    window.addEventListener('load', () => {
        start(); // Call the function that initializes the renderer and starts the animation loop
    });
} else {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.getElementById('root-window').appendChild( warning );
}


