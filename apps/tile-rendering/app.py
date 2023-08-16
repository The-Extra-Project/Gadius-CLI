import streamlit as st
import pandas as pd
import requests
import numpy as np
from component.TilerendererJS import threeTileRenderer
import argparse


def app():
    """
    function that runs the  threeDTilerendererJS component. takes the input from cli
    """
    
    # args = argparse.ArgumentParser(description="enter the parameters to render the 3DTiles")
    # args.add_argument("ipfs_cid_pipeline", help="final pipeline.json CID that user wants to render")
    # args.add_argument("filename", help="name of the file to be fetched from given CID")
    # parsedargs = args.parse_args()
    st.title("rendered tile")
    with st.expander("add details"):
        # ipfs_cid_pipeline = 'bafybeieoxxdf73ptkw3uqgx225fxpacc6gxdmvb3t5hggtnjmro72e3wl4'
        # filename = 'pipeline_gen'
        button = st.button("render tileset")
        
        ipfs_cid_pipeline = st.text_input("enter the tileset that you want to render")
        filename = st.text_input("enter the pipeline file")
        if button:
            threeTileRenderer(ipfs_cid_pipeline,filename)
    # st.button("zoom-in")
    # st.button("zoom out")

if __name__ == "__main__":
    app()