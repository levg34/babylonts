import './style.css'
import { Engine, Scene, Nullable } from 'babylonjs'
import { Playground } from './playground'

const canvas: Nullable<HTMLCanvasElement> = document.getElementById('renderCanvas') as Nullable<HTMLCanvasElement>

let engine: Engine
let scene: Scene
let sceneToRender: Scene
let playground: Playground

const startRenderLoop = function (engine: Engine) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            playground.renderLoop()
            sceneToRender.render()
        }
    })
}

const createDefaultEngine = function () {
    return new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false })
}

const createScene = function () {
    playground = new Playground(engine, engine.getRenderingCanvas())
    return playground.createScene()
}

const initFunction = function () {
    engine = createDefaultEngine()
    if (!engine) throw 'engine should not be null.'
    startRenderLoop(engine)
    scene = createScene()

    sceneToRender = scene
}

initFunction()

// Resize
addEventListener('resize', function () {
    if (!engine) throw 'Engine is null'
    engine.resize()
})
