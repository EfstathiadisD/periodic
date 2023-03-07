# Periodic

## Description

A Monorepo build with Pnpm and Turbo. All the build tools one might need.
On top of that, we have used `Plop` in order to generate the boilerplate code for the packages.

## Tools (Plop Generators)

You can find the code in the `tools` dir. That package is using the same build tools as the rest of the packages.

It needs to be build before one can use it. So, in order to do that, you need to run the following command(s) in case you haven't.


Install all dependancies.
```bash
pnpm install
```

Build the `tools` package from the root of the repo.
```bash
pnpm -F @periodic/tools build
```

Run the generators from the root of the repo.
```bash
pnpm run generate
```

After that, a CLI will appear and you have to choose the package you want to generate. You can choose from the following:

- `Script`: A TS Package built using TSup.
- `React`: A React Package built using Vite.
- `Remix`: A Remix Package built using PlopStack.
