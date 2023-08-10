

import {
        StreamlitComponentBase,
        withStreamlitConnection,
      } from "streamlit-component-lib"
    
import React, { ReactNode } from "react"
      
import { rendering } from "./tilerendering"



export interface renderedImageState {
tilesetLoaded?: boolean,
ipfs?: string,
fileName?: string, 
}




export  class RenderingComponent extends StreamlitComponentBase<renderedImageState> {

    constructor(props ?: any) {
        super(props)
    }


    public state: renderedImageState = {
        tilesetLoaded: false,
        ipfs: '',
        fileName: ''
    }


    componentDidMount = async () => { 
        rendering(this.state.ipfs, this.state.fileName)
        .then((response) => { 
            response.json

        })
        .then(() => {
            this.state.tilesetLoaded = true;
})
}




/** when the button is cliked on the streamlit side and is to be rendered. */
private onUploaded = (): void => {
    this.setState({tilesetLoaded :true})
}
}


export default withStreamlitConnection(RenderingComponent)


