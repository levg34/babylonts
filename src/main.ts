import './style.css'
import { Engine, Scene, Nullable } from 'babylonjs'
import { Playground } from './playground'

const canvas: Nullable<HTMLCanvasElement> = document.getElementById('renderCanvas') as Nullable<HTMLCanvasElement>

let engine: Engine | null = null
let scene: Scene | null = null
let sceneToRender: Scene | null = null

const startRenderLoop = function (engine: Engine, _canvas: Nullable<HTMLCanvasElement>) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            Playground.renderLoop()
            sceneToRender.render()
        }
    })
}

const createDefaultEngine = function () {
    return new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false })
}

const createScene = function () {
    if (engine === null) throw 'Engine is null'
    Playground.engine = engine
    Playground.canvas = engine.getRenderingCanvas()
    return Playground.createScene()
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
    if (!engine) throw 'Engine is null'
    engine.resize()
})
