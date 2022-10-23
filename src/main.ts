import './style.css'
import { Engine, Scene, Nullable } from 'babylonjs'
import { Playground } from './playground'
import { Listeners } from './listeners'

const canvas: Nullable<HTMLCanvasElement> = document.getElementById('renderCanvas') as Nullable<HTMLCanvasElement>

let engine: Engine
let scene: Scene
let sceneToRender: Scene
let playground: Playground
let listeners: Listeners

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

    listeners = new Listeners(playground)
}

initFunction()
