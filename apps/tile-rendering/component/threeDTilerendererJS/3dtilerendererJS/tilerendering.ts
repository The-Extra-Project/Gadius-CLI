import {
    Scene, PerspectiveCamera,
    WebGLRenderer,
    Clock
} from "three"

import { TilesRenderer } from '3d-tiles-renderer';

const scene = new Scene()
const camera = new PerspectiveCamera()
const renderer = new WebGLRenderer()
const clock = new Clock()

let tilerendering: TilesRenderer


export async function rendering(ipfs_cid_tilesetjson?: string, tilejson_filename?: string): Promise<any> {
    let url = 'https://' + ipfs_cid_tilesetjson + '.ipfs.ipfs.w3s.link/' + tilejson_filename + '.json'
    tilerendering = new TilesRenderer(url)
    tilerendering.setCamera(scene)
    tilerendering.setResolutionFromRenderer(camera, renderer);
    scene.add(tilerendering.group);

    renderLoop()
}




export async function renderLoop() {
    requestAnimationFrame(
        renderLoop
    );
    camera.updateMatrixWorld();
    tilerendering.update()
    renderer.render(scene, camera);





}



