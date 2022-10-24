import { Playground } from "./playground"

export function initListeners(playground: Playground): void {
    // Resize
    const engine = playground.engine
    addEventListener('resize', function () {
        if (!engine) throw 'Engine is null'
        engine.resize()
    })

    // Scroll move
    const mesh = playground.mesh
    addEventListener('wheel', (e) => {
        e.preventDefault()
        // console.log({x:e.deltaX,y:e.deltaY,z:e.deltaZ})
        if (mesh['sphere']) {
            mesh['sphere'].position.y -= 0.1 * (e.deltaY / 100);
        }
    })
}
