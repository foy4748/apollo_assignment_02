# Instructions

## Running the server locally

First of all, install packages after cloning this repo. In this project, `pnpm` is used as package manager
```console
pnpm install

```

Then to start the server locally. You need to run this command below.
```console
pnpm run start:dev
```

**Important**    
If you want to edit source code, and immediately reflect changes during development please run the given command below **in a different terminal.**

```console
tsc -w
```
If it throws error, (in case if you run this in powershell) run this below

```console
npx tsc -w
```
If you make some modification in the source code. Please run the command below before making any git commit or doing git push

```console
pnpm run prettier:fix
```
Then you can do a git commit and then push the code maintaining same code format for all developers working on this project.
