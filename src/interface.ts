import { Engine, Nullable, Scene, Mesh, Light, Camera } from 'babylonjs'

interface SceneBasics {
    scene: Scene
    camera: Camera
    light: Light
    mesh: Record<string,Mesh>
}

interface EngineBasics {
    engine: Engine
    canvas: Nullable<HTMLCanvasElement>
}

export interface PlaygroundInterface extends SceneBasics, EngineBasics {
    createScene(): Scene
    renderLoop(): void
}
