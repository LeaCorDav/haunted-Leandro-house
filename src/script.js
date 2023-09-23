import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

THREE.ColorManagement.enabled = false

/**
 * Base
 */
// Debug
/* const gui = new dat.GUI() */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/* ------------------------------ TEXTURAS ------------------------------ */
const textureLoader = new THREE.TextureLoader()
// Puerta
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// Ladrillos
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
    // Array de Texturas para ladrillos
    const bricksTexture = {
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    }

// Cesped
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
    // Divide la superficie (en 8x8) y aplica la textura en 1 x 1
    grassColorTexture.repeat.set(15,15)
    grassAmbientOcclusionTexture.repeat.set(15,15)
    grassNormalTexture.repeat.set(15,15)
    grassRoughnessTexture.repeat.set(15,15)
    // Repite la textura
    grassColorTexture. wrapS = THREE.RepeatWrapping
    grassAmbientOcclusionTexture. wrapS = THREE.RepeatWrapping
    grassNormalTexture. wrapS = THREE.RepeatWrapping
    grassRoughnessTexture. wrapS = THREE.RepeatWrapping
    grassColorTexture. wrapT = THREE.RepeatWrapping
    grassAmbientOcclusionTexture. wrapT = THREE.RepeatWrapping
    grassNormalTexture. wrapT = THREE.RepeatWrapping
    grassRoughnessTexture. wrapT = THREE.RepeatWrapping
/* ------------------------------ TEXTURAS ------------------------------ */


/* ------------------------------ AXES HELPER ------------------------------ */
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
/* ------------------------------ AXES HELPER ------------------------------ */


/* ------------------------------ HOUSE ------------------------------ */
// Grupo
const house = new THREE.Group()
scene.add(house)

// Casa: Paredes
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(8,8,8),
    new THREE.MeshStandardMaterial(bricksTexture)
)
    // Para subir la caja a ground level
    walls.position.y = walls.geometry.parameters.height / 2

const walls_2 = new THREE.Mesh(
    new THREE.BoxGeometry(4,10,4),
    new THREE.MeshStandardMaterial(bricksTexture)
)
    // Para subir la caja a ground level
    walls_2.position.y = walls_2.geometry.parameters.height / 2
    walls_2.position.z = 2.5

const walls_3 = new THREE.Mesh(
    new THREE.BoxGeometry(3,5,4),
    new THREE.MeshStandardMaterial(bricksTexture)
)
    // Para subir la caja a ground level
    walls_3.position.y = walls_3.geometry.parameters.height / 2
    walls_3.position.x = 5

const walls_4 = new THREE.Mesh(
    new THREE.BoxGeometry(3,5,4),
    new THREE.MeshStandardMaterial(bricksTexture)
)
    // Para subir la caja a ground level
    walls_4.position.y = walls_4.geometry.parameters.height / 2
    walls_4.position.x = -5

house.add(walls, walls_2, walls_3, walls_4)

// Casa: Techo
const roofShape = new THREE.Shape();
    roofShape.moveTo( 0,0 );
    roofShape.lineTo( 2, 1.5 );
    roofShape.lineTo( 6, 1.5 );
    roofShape.lineTo( 8, 0 );
    roofShape.lineTo( 0, 0 );
const roofExtrudeSettings = {
	steps: 2,
	depth: 8
};
const roof = new THREE.Mesh( 
    new THREE.ExtrudeGeometry( roofShape, roofExtrudeSettings ),
    new THREE.MeshStandardMaterial()
)
    roof.position.y = walls.geometry.parameters.height
    roof.position.x = walls.geometry.parameters.width * -0.5
    roof.position.z = walls.geometry.parameters.depth  * -0.5

const roofShape_2 = new THREE.Shape();
    roofShape_2.moveTo( 0,0 );
    roofShape_2.lineTo( 1.5, 1 );
    roofShape_2.lineTo( 2.5, 1 );
    roofShape_2.lineTo( 4, 0 );
    roofShape_2.lineTo( 0, 0 );
const roofExtrudeSettings_2 = {
	steps: 2,
	depth: 4
};
const roof_2 = new THREE.Mesh( 
    new THREE.ExtrudeGeometry( roofShape_2, roofExtrudeSettings_2 ),
    new THREE.MeshStandardMaterial()
)
    roof_2.position.y = walls_2.geometry.parameters.height
    roof_2.position.x = walls_2.geometry.parameters.width * -0.5
    roof_2.position.z = walls_2.position.z - walls_2.geometry.parameters.depth / 2

const roofShape_3 = new THREE.Shape();
    roofShape_3.moveTo( 0,0 );
    roofShape_3.lineTo( 1.75, 1 );
    roofShape_3.lineTo( 2.25, 1 );
    roofShape_3.lineTo( 4, 0 );
    roofShape_3.lineTo( 0, 0 );
const roofExtrudeSettings_3 = {
	steps: 2,
	depth: 13
};
const roof_3 = new THREE.Mesh( 
    new THREE.ExtrudeGeometry( roofShape_3, roofExtrudeSettings_3 ),
    new THREE.MeshStandardMaterial()
)
    roof_3.position.y = walls_3.geometry.parameters.height
    roof_3.position.x = -6.5
    roof_3.position.z = 2
    roof_3.rotation.y = Math.PI / 2

house.add( roof, roof_2, roof_3 );

// Portico: Techo
const roofPorticoShape = new THREE.Shape();
roofPorticoShape.moveTo( 0,0 );
roofPorticoShape.lineTo( 2, 0.5 );
roofPorticoShape.lineTo( 6, 0.5 );
roofPorticoShape.lineTo( 8, 0 );
roofPorticoShape.lineTo( 0, 0 );

const roofPorticoExtrudeSettings = {
	steps: 2,
	depth: 2
};

const roofPortico = new THREE.Mesh( 
    new THREE.ExtrudeGeometry( roofPorticoShape, roofPorticoExtrudeSettings ),
    new THREE.MeshStandardMaterial()
)
    roofPortico.position.y = walls.geometry.parameters.height / 2
    roofPortico.position.x = walls.geometry.parameters.width * -0.5
    roofPortico.position.z = walls.geometry.parameters.depth  / 2
house.add( roofPortico );

// Portico: Piso
const porticoFloor = new THREE.Mesh(
    new THREE.BoxGeometry(8,0.2,2),
    new THREE.MeshStandardMaterial({ color: "#ac8e82" })
)
    // Para subir la caja a ground level
    porticoFloor.position.z = 5
    porticoFloor.position.y = 1 - porticoFloor.geometry.parameters.height / 2
house.add(porticoFloor)

// Portico: Gradas
const gradaGeometria = new THREE.BoxGeometry(4,0.8,0.5)
const gradaMaterial = new THREE.MeshStandardMaterial({ color: "#ac8e82" })

const grada_1 = new THREE.Mesh( gradaGeometria,gradaMaterial )
    // Para subir la caja a ground level
    grada_1.position.z = 6.25
    grada_1.position.y = grada_1.geometry.parameters.height / 2

const grada_2 = new THREE.Mesh( gradaGeometria,gradaMaterial )
    // Para subir la caja a ground level
    grada_2.position.z = 6.75
    grada_2.position.y = grada_2.geometry.parameters.height / 2 - 0.2

const grada_3 = new THREE.Mesh( gradaGeometria,gradaMaterial )
    // Para subir la caja a ground level
    grada_3.position.z = 7.25
    grada_3.position.y = grada_3.geometry.parameters.height / 2 - 0.4

const grada_4 = new THREE.Mesh( gradaGeometria,gradaMaterial )
    // Para subir la caja a ground level
    grada_4.position.z = 7.75
    grada_4.position.y = grada_4.geometry.parameters.height / 2 - 0.6
    
house.add(grada_1, grada_2, grada_3, grada_4)

// Portico: Pilares
const pilarGeometria = new THREE.CylinderGeometry( 0.1, 0.1, 4, 5 )
const pilarMaterial = new THREE.MeshStandardMaterial()

const pilar_1 = new THREE.Mesh( pilarGeometria, pilarMaterial )
    pilar_1.position.z = 6 - pilar_1.geometry.parameters.radiusTop
    pilar_1.position.x = 2
    pilar_1.position.y = pilar_1.geometry.parameters.height / 2
scene.add( pilar_1 )

const pilar_2 = new THREE.Mesh( pilarGeometria, pilarMaterial )
    pilar_2.position.z = 6 - pilar_2.geometry.parameters.radiusTop
    pilar_2.position.x = 4 - pilar_1.geometry.parameters.radiusTop
    pilar_2.position.y = pilar_2.geometry.parameters.height / 2
scene.add( pilar_2 )

const pilar_3 = new THREE.Mesh( pilarGeometria, pilarMaterial )
    pilar_3.position.z = 6 - pilar_3.geometry.parameters.radiusTop
    pilar_3.position.x = -2
    pilar_3.position.y = pilar_3.geometry.parameters.height / 2
scene.add( pilar_3 )

const pilar_4 = new THREE.Mesh( pilarGeometria, pilarMaterial )
    pilar_4.position.z = 6 - pilar_4.geometry.parameters.radiusTop
    pilar_4.position.x = -4 + pilar_1.geometry.parameters.radiusTop
    pilar_4.position.y = pilar_4.geometry.parameters.height / 2
scene.add( pilar_4 );

// Casa: Puerta
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 2.5, 100, 100),
    new THREE.MeshStandardMaterial({ 
        map: doorColorTexture, //textura color principal
        transparent: true, // para que funcione el alphamap
        alphaMap:doorAlphaTexture, // Retira exceso de geometria y material
        aoMap: doorAmbientOcclusionTexture, // Agrega unas baked shadows
        displacementMap: doorHeightTexture, // Le da un relieve pero tiene que agregarse mas vertices a la geometria (100, 100)
        displacementScale: 0.1, // Escala la profundidad del height Map
        normalMap: doorNormalTexture, // Agrega reflexiones de luz y sombras
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
    door.position.y = 2.1
    door.position.z = 4.5
    door.position.x = -(door.geometry.parameters.width / 4)
// Hoja de puerta contraria
const doorPair = door.clone()
    doorPair.position.y = 2.1
    doorPair.position.z = 4.5
    doorPair.position.x = door.position.x + door.geometry.parameters.width/2
    // Hace la simetria
    doorPair.scale.x = -1
    doorPair.material.side = THREE.DoubleSide

house.add(door, doorPair)

// Exterior: Arbustos
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush1.scale.set(0.75, 0.75, 0.75)
    bush1.position.set(3, 0.2, 6.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush2.scale.set(0.25, 0.25, 0.25)
    bush2.position.set(2.4, 0.1, 7.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush3.scale.set(0.6, 0.6, 0.6)
    bush3.position.set(- 3.2, 0.1, 6.8)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush4.scale.set(0.35, 0.35, 0.35)
    bush4.position.set(- 2.5, 0.05, 7.8)

const bush5 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush5.scale.set(0.45, 0.45, 0.45)
    bush5.position.set(- 4.4, 0.05, 6.2)

const bush6 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush6.scale.set(0.85, 0.85, 0.85)
    bush6.position.set(- 5.4, 0.05, 2.2)

const bush7 = new THREE.Mesh(bushGeometry, bushMaterial)
    bush7.scale.set(0.85, 0.85, 0.85)
    bush7.position.set(4.4, 0.05, 2.2)

house.add(bush1, bush2, bush3, bush4, bush5, bush6, bush7)

/* ------------------------------ HOUSE ------------------------------ */

/* -------------------- FONTS -------------------- */
// Cargador de fonts
const fontLoader = new FontLoader()
// Cargamos fonts
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        // Geometria y parametros
        const textGeometry = new TextGeometry(
            'L', {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments:8,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 2
            }
        )
        // ------ OP1: Centrar geomtria con THREE JS ------
        textGeometry.center()
        
        const textMaterial = new THREE.MeshStandardMaterial()
        const text = new THREE.Mesh(textGeometry, textMaterial)
            text.position.z = 4.5
            text.position.y = 8
        scene.add(text)
    }
)
/* -------------------- FONTS -------------------- */


/* ------------------------------ LAPIDAS ------------------------------ */
// Grupo
const graves = new THREE.Group()
scene.add(graves)

// Constantes
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

// Ubica
for(let i = 0; i < 120; i++)
{
    const angle = Math.random() * Math.PI * 2 // Random angle (para posicionar las lapidas en cierto angulo random entre 360° = PI*2)
    const radius = 9 + Math.random() * 30     // Random radius (para posicionar las lapidas en un radio random mayor de 9 units + Random da un numero entre 0 y 1 * la distancia maxima de 30)
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus
    const y = (Math.random() / 3)     // Get the z position using sinus
    
    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    // Position
    grave.position.set(x, y, z)                              

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    // Sombras
    grave.castShadow = true

    // Add to the graves container
    graves.add(grave)
}

/* ------------------------------ LAPIDAS ------------------------------ */


/* ------------------------------ SUELO ------------------------------ */
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
    floor.rotation.x = - Math.PI * 0.5
    floor.position.y = 0
    
scene.add(floor)
/* ------------------------------ SUELO ------------------------------ */


/* ------------------------------ NIEBLA ------------------------------ */
// Color, donde comienza la niebla, lo mas lejos antes de ya no ver
const fogColor = "#4D5159"
const fog = new THREE.Fog(fogColor, 8, 45)
scene.fog = fog
/* ------------------------------ NIEBLA ------------------------------ */


/* ------------------------------ LUCES ------------------------------ */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0)
/* gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001) */
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.25)
moonLight.position.set(4, 5, - 2)
/* gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001) */
scene.add(moonLight)

// Casa: Luz sobre puerta
const doorLight = new THREE.PointLight("#ff7d46", 1, 25)
doorLight.position.set(0, 3.5, 5)
const doorLightHelper = new THREE.PointLightHelper( doorLight, 0.5 )
house.add(doorLight)
/* ------------------------------ LUCES ------------------------------ */


/* ------------------------------ FANTASMAS ------------------------------ */
//Luces
const ghost1Light = new THREE.PointLight("#ff00ff", 2, 3)
const ghost2Light = new THREE.PointLight("#00ffff", 2, 3)
const ghost3Light = new THREE.PointLight("#ffff00", 2, 3)
    ghost1Light.position.y = ghost2Light.position.y = ghost3Light.position.y = 0.5

// Geometria
const ghostsGeometry = new THREE.TorusKnotGeometry( 1, 0.5, 100, 16 )

// Material
const ghostsMaterial1 = new THREE.MeshToonMaterial()
const ghostsMaterial2 = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.25,
    emissive: "#000000",
    color: "#ffffff"
})
const ghostsMaterial3 = new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    transmission: 1,
    roughness: 0,
    ior: 1.7,
    thickness: 0.5,
    specularIntensity: 1,
    clearcoat: 1,
    envMap: fogColor,
    specularColor: "#ffffff",
    envMapIntensity: 1
})

// Mesh
const ghosts1Mesh = new THREE.Mesh( ghostsGeometry, ghostsMaterial3 )
const ghosts2Mesh = new THREE.Mesh( ghostsGeometry, ghostsMaterial3 )
    ghosts2Mesh.scale.set(1.5, 1.5, 1)
const ghosts3Mesh = new THREE.Mesh( ghostsGeometry, ghostsMaterial3 )
    ghosts3Mesh.scale.set(0.65, 0.65, 1)

// Grupo
const ghost1 = new THREE.Group()
const ghost2 = new THREE.Group()
const ghost3 = new THREE.Group()

// Agrupados
ghost1.add( ghosts1Mesh, ghost1Light )
ghost2.add( ghosts2Mesh, ghost2Light )
ghost3.add( ghosts3Mesh, ghost3Light )

scene.add(ghost1, ghost2, ghost3)
/* ------------------------------ FANTASMAS ------------------------------ */


/**
 * Sizes
*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    
    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
*/
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 8
camera.position.y = 8
camera.position.z = 20
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


/* ------------------------------ RENDERIZADOR ------------------------------ */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// Color de cielo
renderer.setClearColor(fogColor)
/* ------------------------------ RENDERIZADOR ------------------------------ */


/* ------------------------------ SOMBRAS ------------------------------ */
// Activa sombras para poder renderizarlas
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Activa que luces puedan proyectar sombras
moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls_2.castShadow = true
walls_3.castShadow = true
walls_4.castShadow = true

porticoFloor.castShadow = true
pilar_1.castShadow = true
pilar_2.castShadow = true
pilar_3.castShadow = true
pilar_4.castShadow = true

// Activa superficies que puedan recibir sombras
floor.receiveShadow = true


// Optimizaciones
doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 15

/* ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 15

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 15

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 15 */
/* ------------------------------ SOMBRAS ------------------------------ */


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Actualiza fantasmas
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 9
    ghost1.position.z = Math.sin(ghost1Angle) * 8
    ghost1.position.y = Math.sin(elapsedTime * 3) + 1.5
    ghost1.rotation.x = elapsedTime * 1.5
    ghost1.rotation.y = elapsedTime * 1.5
    
    const ghost2Angle = - elapsedTime * 0.15
    ghost2.position.x = Math.cos(ghost2Angle) * 14
    ghost2.position.z = Math.sin(ghost2Angle) * 4
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5) + 2
    ghost2.rotation.x = elapsedTime * 2.5
    ghost2.rotation.y = elapsedTime * 2.5
    
    const ghost3Angle = - elapsedTime * 0.4
    ghost3.position.x = Math.cos(ghost3Angle) * 4
    ghost3.position.z = Math.sin(ghost3Angle) * 12
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5) + 1.5
    ghost3.rotation.x = elapsedTime * 5
    ghost3.rotation.y = elapsedTime * 5

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()