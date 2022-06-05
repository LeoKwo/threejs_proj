// nada
// render the scene (canvas)
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor("#e5e5e5")
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})

// create a sphere
const geometry = new THREE.SphereGeometry(1, 100, 100)
const material = new THREE.MeshLambertMaterial({color: 0xF7F7F7})
const mesh = new THREE.Mesh(geometry, material)

// add sphere to the Scene
scene.add(mesh)

// add some lighting
const light = new THREE.PointLight(0xFFFFFF, 1, 100)
light.position.set(0, 0, 0)
scene.add(light)
const light2 = new THREE.PointLight(0xFFFFFF, 0.1, 2000)
light2.position.set(20, 5, 25)
scene.add(light2)

// create a box
const geometry2 = new THREE.BoxGeometry(1, 1, 1)
const material2 = new THREE.MeshLambertMaterial({color: 0xF7F7F7})
const mesh2 = new THREE.Mesh(geometry2, material2)
scene.add(mesh2)

// change Perspective
mesh.position.z = -4
mesh.position.x = -2
mesh2.position.x = 2

// render!
// ask threejs to re-render stuff in 60 fps
const render = () => {
  requestAnimationFrame(render)

  // add a little rotation
  mesh2.rotation.x += 0.01
  mesh2.rotation.y += 0.02

  renderer.render(scene, camera)
}
render()

// get mouse and raycaster
const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster();


// callback function that randomly changes shapes and positions of objects
function onMouseMove(event) {
  event.preventDefault()
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(mouse, camera)

  let intersects = raycaster.intersectObjects(scene.children, true)
  for (let i = 0; i < intersects.length; i++) {
    this.tl = new TimelineMax()
    this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
    this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut})
    this.tl.to(intersects[i].object.position, .5, {x: (Math.random() - 0.5) * 5, ease: Expo.easeOut})
    this.tl.to(intersects[i].object.position, .5, {y: (Math.random() - 0.5) * 5, ease: Expo.easeOut})
  }
}

// add eventlistener for mousing-overs
window.addEventListener('mousemove', onMouseMove)

// add a bunch of random objects
let meshX = -10
for (let i = 0; i < 15; i++) {
  if (i % 2 === 1) {
    let meshR = new THREE.Mesh(geometry, material)
    meshR.position.x = (Math.random() - 0.5) * 15
    meshR.position.y = (Math.random() - 0.5) * 15
    meshR.position.z = (Math.random() - 0.5) * 15
    scene.add(meshR)
  } else {
    let meshR = new THREE.Mesh(geometry2, material2)
    meshR.position.x = (Math.random() - 0.5) * 10
    meshR.position.y = (Math.random() - 0.5) * 10
    meshR.position.z = (Math.random() - 0.5) * 10
    scene.add(meshR)
  }
  meshX += 1
}
