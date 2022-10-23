import { Engine, Nullable, Scene, FreeCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, TargetCamera, Light } from 'babylonjs'
import { PlaygroundInterface } from './interface'

export class Playground implements PlaygroundInterface {
    scene!: Scene
    camera!: TargetCamera
    light!: Light
    sphere!: Mesh
    ground!: Mesh

    engine: Engine
    canvas: Nullable<HTMLCanvasElement>

    constructor(engine: Engine, canvas: Nullable<HTMLCanvasElement>) {
        this.engine = engine
        this.canvas = canvas
    }

    createScene(): Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        this.scene = new Scene(this.engine)
        // This creates and positions a free camera (non-mesh)
        this.camera = new FreeCamera('camera1', new Vector3(0, 5, -10), this.scene)
        // This targets the camera to scene origin
        this.camera.setTarget(Vector3.Zero())
        // This attaches the camera to the canvas
        this.camera.attachControl(this.canvas, true)
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene)
        // Default intensity is 1. Let's dim the light a small amount
        this.light.intensity = 0.7
        // Built-in 'sphere' shape. Params: name, options, scene
        this.sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, this.scene)
        // Move the sphere upward 1/2 its height
        this.sphere.position.y = 1

        addEventListener("wheel", (e) => {
            e.preventDefault()
            // console.log({x:e.deltaX,y:e.deltaY,z:e.deltaZ})
            if (this.sphere) {
                this.sphere.position.y -=0.1*(e.deltaY/100);
            }
        })
    
        // Built-in 'ground' shape. Params: name, options, scene
        this.ground = MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, this.scene)
        return this.scene
    }

    renderLoop() {
        this.sphere.position.x -= 0.01
        return null
    }
}
