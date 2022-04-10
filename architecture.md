# CerbyMask architecture

Global list of rules:

- Use only named exports
- Use prettier
- Functions, not classes
- Before writing some kind of logic, think about several solutions. For example, is it possible to write it more compactly and simply or not, and so on

## assets/

`assets/` include style files, fonts, pictures, icons and everything related to media files.

#### assets/fonts/

Fonts should be separated by folders named with the font name.
For example, if font is named `IBMPlexSans` there should be a folder named `IBMPlexSans/` which contains this font family.

#### assets/icons/

All `.svg` icons should be stored in `icons/` folder.

#### assets/img/

All other images except `.svg` should be stored in `assets/img/` folder.

## components/

We stick to atomic architecture.
`components/` include **atoms**, **molecules**, **organisms** and **template**.
[More about atomic architecture](https://github.com/danilowoz/react-atomic-design)
**template** folder stores all components that are needed for templating views (e.g. Layout, because it's global).
Each subfolder exports all components that exists in this subfolder (for example, atoms) and also it exports all types in the separate file called `types.ts`. Export separation is mandatory.

## views/

This folder will contain views assembled using atoms, molecules and organisms. View is some kind of page. For example, `Home` view, `Auth` view, etc.

## chains/

The logic of various networks is stored here. Each network has the following folders:

#### api/

The logic of interaction with the server, network, external requests for various data is stored here. Index file in each network should export a hook which will be used by components.

#### crypto/

All provider, network, etc. logic is stored in `crypto/` folder.

#### hooks/

All hooks related to the network are stored here.

#### utils/

Utility functions and helpers related to the network are stored here.
Note: If some function is used throughout the project or by several networks, it should be stored in global folder `utils/`.

#### types/

Types or interfaces that are being used by the network in several folders should be stored here.

## utils/

Utility functions and helpers that are being used throughout the project are stored here.

## types/

If same type or interface is used throughout the project, it should be stored in `types/`, otherwise all type declarations should be stored in the same folder where user of these declarations stored. For example, if `foo.tsx` uses inteface that only `foo.tsx` needs, there should be a file named `types.ts` in the same directory with `foo.tsx`

## tests/

Tests of all project business logic will be stored here.

## globalStyle/

Global styles are stored in this folder.
`reset.ts` - remove default CSS styles
`fonts.ts` - include fonts
`index.tsx` - combine global styles and export `GlobalStyle` component

## tokens.tsx

Temporary mock file that exports token icons and its names.
