import * as THREE from 'three';

export function createCamera(gameWindow) {

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let cameraRadius = 4;
    let cameraAzimuth = 0;
    let cameraElevation = 0;
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    updateCameraPosition();
    
    function onMouseDown(){
        console.log('mousedown');
        isMouseDown = true;
    }

    function onMouseUp(){
        console.log('mouseup');
        isMouseDown = false;
    }

    function onMouseMove(event){
        console.log('mousemove');

        if (isMouseDown){
            cameraAzimuth += -((event.clientX - prevMouseX) * 0.5); //The camera's horizontal azimuth is updated based on how much the mouse has moved horizontally.
            cameraElevation += ((event.clientY - prevMouseY) * 0.5); //The camera's elevation is updated based on the vertical mouse movement.
            cameraElevation = Math.min(180, Math.max(0, cameraElevation)); //The elevation angle is restricted to the range [0, 180], ensuring that the camera doesn’t flip over the top or go under the bottom.
            updateCameraPosition();
        }

        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    }

    
    function updateCameraPosition() {
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * Math.PI / 360) * Math.cos(cameraElevation * Math.PI);
        camera.position.y = cameraRadius * Math.sin(cameraElevation * Math.PI / 360);
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * Math.PI / 360) * Math.cos(cameraElevation * Math.PI);
        camera.lookAt(0, 0, 0);
        camera.updateMatrix()
    }

    return {
        camera,
        onMouseDown,
        onMouseUp,
        onMouseMove
    }
}