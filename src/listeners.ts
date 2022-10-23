import { Playground } from "./playground"

interface ListenersInterface {
    playground: Playground
    // initListeners(): void
}

export class Listeners implements ListenersInterface {
    playground: Playground

    constructor(playground: Playground) {
        this.playground = playground
        this.initListeners()
    }

    private initListeners(): void {
        // Resize
        const engine = this.playground.engine
        addEventListener('resize', function () {
            if (!engine) throw 'Engine is null'
            engine.resize()
        })

        // Scroll move
        const mesh = this.playground.mesh
        addEventListener('wheel', (e) => {
            e.preventDefault()
            // console.log({x:e.deltaX,y:e.deltaY,z:e.deltaZ})
            if (mesh['sphere']) {
                mesh['sphere'].position.y -=0.1*(e.deltaY/100);
            }
        })
    }
}
