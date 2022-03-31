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
`components/` include **atoms**, **molecules** and **organisms**.
[More about atomic architecture](https://github.com/danilowoz/react-atomic-design)

## views/

This folder will contain views assembled using atoms, molecules and organisms. View is some kind of page. For example, `Home` view, `Auth` view, etc.

## utils/

Utility functions and helpers are stored here. if some function is used throughout the project, it should be stored in `utils/`.

## types/

If same type or interface is used throughout the project, it should be stored in `types/`, otherwise all type declarations should be stored in the same folder where user of these declarations stored. For example, if `foo.tsx` uses inteface that only `foo.tsx` needs, there should be a file named `types.ts` in the same directory with `foo.tsx`

## crypto/

All provider, network, etc. logic should be stored in `crypto/` folder.

## tests/

Tests folder will contain `crypto/`, `components/`, `utils/` folders with tests of the corresponding logic.

## globalStyle.tsx

Global styles are stored in this file.
