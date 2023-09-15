import { ExecException, exec } from 'child_process';
import { readFileSync } from 'fs';
import { dirname } from 'path';

interface Parameters {
  tilesetURI: string;
  fileName: string;
}

/**class for invoking rendering streamlit application with the resulting rendered data
 *
 */

class ResultVisualization {
  streamlitProviderUrl: any;
  constructor() {
   
   this.streamlitProviderUrl = process.env.STREAMLIT_PROVIDER_URL || 'http://localhost:8501';
    
    
  }
  /**
   * opens the streamlit app to the given default browser provider
   */

  renderURIOutput() {
    exec(
      '/bin/bash -c cd ../../tile-rendering && poetry shell',
      (err, output, errString) => {
        console.log('tile-rendering application activated' + output);
      }
    );
    exec('/bin/bash -c streamlit run' + 'app.py');
    
    open(this.streamlitProviderUrl);
  }
}

export function createStreamlitPopup() {
  let streamclassOutput = new ResultVisualization();
  streamclassOutput.renderURIOutput();
}
