import * as THREE from "three";
import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { gsap } from "gsap";
// Scene
const scene = new THREE.Scene();

// Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ 
    color: "#00ff83",
});
const mesh = new THREE.Mesh(geometry, material); 
scene.add(mesh);

//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Light - Use a darker color
const light = new THREE.PointLight(0xffffff, 50, 100); // Adjust the distance parameter
light.position.set(0, 10, 10); // Move the light closer to the scene
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.z = 20; // Move the camera closer to the scene
scene.add(camera);

// Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2)
renderer.render(scene, camera);


//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

//resize

window.addEventListener('resize', ()=> {
    //update sizes
    // console.log(window.innerWidth)
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})


const loop = () => {
    // mesh.position.x += 0.2
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
}
loop()

//timeline magic
const t1 = gsap.timeline({defaults: {duration: 1}})
t1.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
t1.fromTo("nav", {y:"-100%"}, {y:"0%"})
t1.fromTo(".title", {opacity: 0}, {opacity:1})