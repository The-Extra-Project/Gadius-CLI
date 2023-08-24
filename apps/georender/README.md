# Georender

This package implements whole pipeline for running the [3D surface reconstruction]() on bacalhau. this package will be deployed as container on which the [cli](../cli/)  will be running the compute job.

## Dependencies: 

core dependencies are defined in pyproject.toml, you  can install them via `poetry install`

this package will also need external packages like:
 - [3Dtilesrenderer](https://github.com/NASA-AMMOS/3DTilesRendererJS): cli package that is used for rendering the resulting 3D tile format into visual format.

- [gdal]: in order for smooth functioning of the gdal package, you need to setup gdal installation
    - `brew install gdal` for macos

GDAL package faces issues while running on the macos along with the fact that its not pep517 compliant package, so reduce the issues by [following advice](https://stackoverflow.com/questions/70970561/install-gdal-on-poetry-project) on how to set it up, or better run it via the docker container.


## setup: 

- Add the private key of your dockerhub account in the .env file (as described in the `.env.example` file in the root folder).

- Then run the docker container build in order to run compute job onchain.
