import streamlit as st
import pandas as pd
import requests
import numpy as np
import pydeck as pdk
from component.threeDTilerendererJS import threeTileRenderer
import argparse
def app(cliargs = None):
    
    
    
    """
    function that runs the  threeDTilerendererJS component. takes the input from cli
    
    """
    
    args = argparse.ArgumentParser(description="enter the parameters to render the 3DTiles")
    args.add_argument("ipfs_cid_pipeline", help="final pipeline.json CID that user wants to render")
    args.add_argument("filename", help="name of the file to be fetched from given CID")
    parsedargs = args.parse_args()
    st.title("rendered tile")
    with st.expander("tileset rendered"):
        threeTileRenderer(parsedargs.ipfs_cid_pipeline,parsedargs.filename)
    ## TODO: adding other functions in 3DTilerendering in order to render zoomed version of the given rendered file
    st.button("zoom-in")
    st.button("zoom out")
