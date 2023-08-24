# @gadus/reconstruction-cli package
This cli package wraps the call above the lillypad / 3DTIlesrendering in order to execute the georender package and then rendering the job once the resulting 3Dtile is generated.

## Building steps:

- User needs to set the wallet address (ie PRIVATE_KEY) parameter along with funding sufficient [lil-ETH](https://docs.lilypadnetwork.org/lilypad-v1-testnet/quick-start/funding-your-wallet-from-faucet) in order to start running the job submission.

- build the package via `turbo build` and then getting access directly from the repository using `npm start -h`.


## Running tasks

To execute the test / buld operations, you need to install the whole pipeline and then get:

```
npx turbo run test
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
