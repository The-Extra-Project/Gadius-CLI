import ReactDOM from "react-dom"
import { Streamlit, RenderData } from "streamlit-component-lib"


import {
    Scene, PerspectiveCamera,
    WebGLRenderer,
    Clock
} from "three"

import React, {Fragment, ReactNode, useEffect} from "react"    



import { TilesRenderer } from '3d-tiles-renderer';

const scene = new Scene()
const camera = new PerspectiveCamera()
const renderer = new WebGLRenderer()
const clock = new Clock()

let tilerendering: TilesRenderer


function rendering(ipfs_cid_tilesetjson?: string, tilejson_filename?: string) {
let url = 'https://' + ipfs_cid_tilesetjson + '.ipfs.ipfs.w3s.link/' + tilejson_filename + '.json'
tilerendering = new TilesRenderer(url)
tilerendering.setCamera(scene)
tilerendering.setResolutionFromRenderer(camera, renderer);
scene.add(tilerendering.group);
return renderLoop()
}

export  function renderLoop(): Node {
const rendering = document.createElement("area")
requestAnimationFrame(
    renderLoop
);
camera.updateMatrixWorld();
tilerendering.update()
let result = renderer.render(scene, camera)
return rendering.appendChild(result)

}


const renderSpan = document.body.appendChild(document.createElement("span"))
const render = document.createElement("area")
const renderarea = renderSpan.appendChild(render)
const button = renderSpan.appendChild(document.createElement("button"))
button.textContent = "render image"


let tilesetPassed = false

button.onclick = function(): void {
tilesetPassed = true

}

function onRender(event: Event): void {

// Get the RenderData from the event
const data = (event as CustomEvent<RenderData>).detail


// Disable our button if necessary.
button.disabled = data.disabled


let ipfsName = data.args["ipfs_cid"];
let tileset = data.args["tileset_details"];

renderarea.appendChild(rendering(ipfsName,tileset))
Streamlit.setFrameHeight()
}  


Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)

Streamlit.setComponentReady()

Streamlit.setFrameHeight()


