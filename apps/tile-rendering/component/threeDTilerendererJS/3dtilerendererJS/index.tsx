import React from "react"
import ReactDOM from "react-dom"

import {RenderingComponent,renderedImageState} from './RenderingComponent'


let argsInput:renderedImageState; 

ReactDOM.render(
<React.StrictMode><RenderingComponent  /> </React.StrictMode>
, document.getElementById('root'))