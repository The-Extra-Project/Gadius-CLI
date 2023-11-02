# Gadius CLI:  :fishing_pole_and_fish:

CLI for orchestrating jobs for geospatial analysis on onchain [COD](https://www.cod.cloud)) protocol network called [lilypad](). some other characterstics 
    - [ ] Able to build wallet, pay and instantiate the compute operations onchain.
    - [ ] visualize the results of the surface reconstruction, citygml models etc.
## packages:

- CLI: This is the core package that implements the CLI for client in order to run the compute jobs as the wrapper on the lilypad-cli compute jobs or via the lilypad onchain adapter contracts.

- Contracts: This is WIP package that deploys and provides the api with the wrapper solidity contracts that interact directly with the lilypad onchain adapter contracts.

## Build instructions 

### 1. From npm registry 

> npm install @devextralabs/cli

Then setup the ENV variables in cli/.env file (private key of the testnet based account that has the testnet tokens) or define them onchain.

### 2. (from source):

1. build the CLI package: 
```
npx turbo build cli

```

2. then go the corresponding package to run the commands

```
cd apps/cli && npm run cli

```

### 3. API calls.

```bash

gadius create-cod-point -c / --coordinates <X > <Y > --ipfs_shp_file <cid of the file> 

gadius create-cod-polygon -c <lattitude Xmax> <longitude Ymax> <lattitude Xmin> <longitude Ymin> --ipfs_shp_file <cid of the file> --username <username>

gadius create-job-cityGML -Y  <yaml_input_file> --obj_file <object_file_output_path> -C <citygml_output_path> 

```