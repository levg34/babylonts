import './style.css'
import * as BABYLON from 'babylonjs'
import { Playground } from './playground'

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
