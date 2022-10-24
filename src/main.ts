import './style.css'
import { Engine, Scene, Nullable } from 'babylonjs'
import { Playground } from './playground'
import { initListeners } from './listeners'

const canvas: Nullable<HTMLCanvasElement> = document.getElementById('renderCanvas') as Nullable<HTMLCanvasElement>

let engine: Engine
let scene: Scene
let playground: Playground

const startRenderLoop = function (engine: Engine) {
    engine.runRenderLoop(function () {
        if (scene && scene.activeCamera) {
            playground.renderLoop()
            scene.render()
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

    initListeners(playground)
}

initFunction()
