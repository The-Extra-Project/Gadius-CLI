

import { TilesRenderer } from '3d-tiles-renderer';

import React, {ReactNode, useEffect, useState}from "react" 
import { Streamlit , withStreamlitConnection, RenderData} from 'streamlit-component-lib';

import {
    Scene, PerspectiveCamera,
    WebGLRenderer,
    Clock
} from "three"

let tilerendering: TilesRenderer

function rendering(ipfs_cid_tilesetjson?: string, tilejson_filename?: string): RenderData {

const scene = new Scene()
const camera = new PerspectiveCamera()
const renderer = new WebGLRenderer()
const clock = new Clock()


let url = 'https://' + ipfs_cid_tilesetjson + '.ipfs.ipfs.w3s.link/' + tilejson_filename + '.json'
tilerendering = new TilesRenderer(url)
tilerendering.setCamera(scene)
tilerendering.setResolutionFromRenderer(camera, renderer);
scene.add(tilerendering.group);

camera.updateMatrixWorld();
tilerendering.update()
return (
  renderer.render(scene, camera)
)

}

interface parameters {
    ipfs_cid: string
    tilesetname: string   

    }
    const initialState: parameters = {
      ipfs_cid: 'bafybeibbtseqjgu72lmehn2y2b772wvr36othnc4rpzu6z3v2gfsjy3ew4', tilesetname: 'pipeline_tileset'
    }


    export function RenderingComponent(args:any){
    const [ipfsName,tilesetName] = args

    const [selected, notSelected ] = useState(initialState)

    useEffect(() => {
        Streamlit.setFrameHeight()
      })

      return(
        rendering(ipfsName.args,tilesetName.args)
      )

}
//export default withStreamlitConnection(RenderingComponent);