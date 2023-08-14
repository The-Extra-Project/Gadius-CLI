import { ExecException, exec } from 'child_process';
import { readFileSync } from 'fs';
import { dirname } from 'path';
import 'open';

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
    exec('/bin/bash -c streamlit run  ' + '../../tile-rendering/app.py');
    this.streamlitProviderUrl = 'https://localhost:8501';
  }
  /**
   * opens the streamlit app to the given default browser provider
   */
  renderURIOutput() {
    open(this.streamlitProviderUrl);
  }
}

export function createStreamlitPopup() {
  let streamclassOutput = new ResultVisualization();
  streamclassOutput.renderURIOutput();
}
