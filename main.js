import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //atenção aos ultimos dois atributos (far, near) para melhorar performance

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight, false );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 7;
camera.position.y = 2;

function animate() {
	cube.rotation.y += 0.05;

	renderer.render( scene, camera );
}

import WebGL from 'three/addons/capabilities/WebGL.js';

if ( WebGL.isWebGL2Available() ) {

	// Initiate function or other initializations here
	renderer.setAnimationLoop( animate );
	console.log('good')

} else {

	const warning = WebGL.getWebGL2ErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}