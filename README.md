<p align="center">
    <img src="public/android-chrome-192x192.png" style="width:50px;">
    <h1 style="margin-top: -20px;text-align: center;border-bottom: none;">CerbyMask</h1>
    <p style="margin-top: -20px;font-size:10px;text-align: center;border-bottom: none;">A Radix Protocol Lightweight Wallet</p>
</p>
<p align="center">
<a>https://cerbymask.io</a> - <a>https://t.me/cerbymask</a>
</p>

# 🚀 Features

- Fully Chrome Based Extension
- Lightweight (~4mb)
- Full seed phrase backup and recovery management
- Complete Token Asset management
- Multiple Public Addresses management
- Realtime USD for balance and stake

# Install

- Build the extension by following the previous steps

Navigate to `chrome://extensions`

Locate `Load unpacked` and point to the `build` folder you either built or downloaded.

# Getting Started

The plugin is in very early stages of development and it is community driven.

Clone this project in order to use the plugin.

This project has been developed using NodeJS v16.6.

## Install dependencies

After cloning the project, navigate to the root folder and run:

```bash
$ yarn install --ignore-engines
```

## Build

In order to build the extension, execute:

```bash
$ yarn build
```

## Develop

Extension will watch for code changes and re-upload an extension automatically. You'll need to restart (close and open) the extension in Chrome.

```bash
$ yarn watch
```
