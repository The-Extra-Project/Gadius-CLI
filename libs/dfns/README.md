# @Gadius/lib/dfns

This library was generated with [Nx](https://nx.dev).

This library defines methods to interact with DFNS backend services , which is used for 
- Defining the client wallet.
- Able to sign the operations offchain
- define the policies for the clients to spend for computations.

## significance: 

Building a robust RBAC for the clients in order to delegate the access to the resources (either current compute resources reserved or assigning the budget to other address).  

## Building

Run `nx build dfns` to build the library, also this after setting up the .env library with the parameters.

## Running unit tests

Run `nx test dfns` to execute the unit tests via [Jest](https://jestjs.io).