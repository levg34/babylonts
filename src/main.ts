import './style.css'
import * as BABYLON from 'babylonjs'

const canvas = document.getElementById('renderCanvas')

let engine: BABYLON.Engine | null = null
let scene: BABYLON.Scene | null = null
let sceneToRender: BABYLON.Scene | null = null

const startRenderLoop = function (engine: BABYLON.Engine, canvas: HTMLElement | null) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render()
        }
    })
}

const createDefaultEngine = function () {
    return new BABYLON.Engine(canvas as BABYLON.Nullable<HTMLCanvasElement>, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false })
}

class Playground {
    static CreateScene(engine: BABYLON.Engine, canvas: BABYLON.Nullable<HTMLCanvasElement>) {
        // This creates a basic Babylon Scene object (non-mesh)
        const scene = new BABYLON.Scene(engine)
        // This creates and positions a free camera (non-mesh)
        const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene)
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero())
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true)
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene)
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7
        // Our built-in 'sphere' shape. Params: name, options, scene
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene)
        // Move the sphere upward 1/2 its height
        sphere.position.y = 1
        // Our built-in 'ground' shape. Params: name, options, scene
        const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
        return scene
    }
}

const createScene = function () {
    if (engine === null) throw 'Engine is null'
    return Playground.CreateScene(engine, engine.getRenderingCanvas())
}

const initFunction = async function () {
    const asyncEngineCreation = async function () {
        try {
            return createDefaultEngine()
        } catch (e) {
            console.log('the available createEngine function failed. Creating the default engine instead')
            return createDefaultEngine()
        }
    }

    engine = await asyncEngineCreation()
    if (!engine) throw 'engine should not be null.'
    startRenderLoop(engine, canvas)
    scene = createScene()
}

initFunction().then(() => {
    sceneToRender = scene
})

// Resize
addEventListener('resize', function () {
    if (engine === null) throw 'Engine is null'
    engine.resize()
})
