# PNPM Link Peers Issue

This project has been created in order to present an issue when linking a library that has peer dependencies using PNPM.

## Problem

When a package that has peer dependencies is linked to some destination, the `node_modules` of that package are included in the symbolic link. This causes the dependencies of the package to come from another source than the destination's `node_modules/.pnpm` folder. This becomes a problem with peer dependencies, because they end up not pointing to the same exact file. Even when the version on both side is an exact match, this can lead to problems when exact references (e.g.: singleton) are needed.

The simple example is for a React package, where React is marked as a peer dependency. When a consumer package links the first library, there will be a missing in the imported files, leading to countless problem on runtime.

## Steps to reproduce

This project shows a concrete use case where the problem occurs. Here, we have a library, `some-library`, that has a **peer dependency** on React. We have, in another location, a web app, `some-consumer`, that has a **dependency** on React. We want to test the integration of `some-library` inside `some-consumer` by "installing" that library locally.

1. Run `pnpm install` in the `some-consumer` folder **and** the `some-library` folder.
2. Run `pnpm link ../some-library` in the `some-consumer` folder.
3. Run `pnpm start` in the `some-consumer` folder.
4. Open `http://localhost:3000` in your browser.

After opening the console from the developer tools of your browser, you should find an error stating that the we made an invalid hook call. This comes from the fact that, even though, `some-consumer` and `some-library` are on the same version of React, they do not share the same module (i.e. the React dependency for both of them do not point to the same files on disk).
