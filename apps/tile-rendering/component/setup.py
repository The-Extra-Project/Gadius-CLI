from pathlib import Path

import setuptools


this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text()

setuptools.setup(
    name="tile-rendering",
    version="0.0.1",
    author="Dhruv Malik ",
    description="component to render the 3D tiles generated from pipeline",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="",
    packages=setuptools.find_packages(),
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.7",
    install_requires=[
        "streamlit >= 0.63",
    ],
)