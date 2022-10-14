import { Engine, Nullable, Scene, FreeCamera, Vector3, HemisphericLight, MeshBuilder, Mesh, TargetCamera, Light } from 'babylonjs'

export class Playground {
    static scene: Scene
    static camera: TargetCamera // Camera
    static light: Light
    static sphere: Mesh
    static ground: Mesh

    static createScene(engine: Engine, canvas: Nullable<HTMLCanvasElement>): Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        this.scene = new Scene(engine)
        // This creates and positions a free camera (non-mesh)
        this.camera = new FreeCamera('camera1', new Vector3(0, 5, -10), this.scene)
        // This targets the camera to scene origin
        this.camera.setTarget(Vector3.Zero())
        // This attaches the camera to the canvas
        this.camera.attachControl(canvas, true)
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        this.light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene)
        // Default intensity is 1. Let's dim the light a small amount
        this.light.intensity = 0.7
        // Our built-in 'sphere' shape. Params: name, options, scene
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
    
        // Our built-in 'ground' shape. Params: name, options, scene
        this.ground = MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, this.scene)
        return this.scene
    }

    static renderLoop(_engine: Engine, _canvas: Nullable<HTMLCanvasElement>) {
        this.sphere.position.x -= 0.01
        return null
    }
}
