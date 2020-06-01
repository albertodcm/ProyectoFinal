# ICC111C6

## Table of contents
* [About](#about)
* [Objective](#objective)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Setup](#setup)
* [Authors](#authors)

# About
MiServicio is a free application that helps the student community find events and companies to carry out their social service, as well as keep track of the hours completed. Use MiServicio application to find the next events so that you can carry out your social service in a simpler way.

# Objective
The main objective is to facilitate student access to the source code of each application, in order to review and compare it with their own.

# Getting Started
In this section, you will be able to clone this repository and set up a local instance of each application. 

## Prerequisites
To successfully clone, configure and run each project, you must have installed:

* Git
* Node.js
* Npm
* Angular 8
* Capacitor
* Ionic Framework 5 [only for Ionic apps]
* Firebase [only for Ionic apps]
* Have a Firebase Project (you can set it up logging in with your Google account on [Firebase Console](https://console.firebase.google.com)) [Only for Ionic apps]

## Setup
To run a local instance of a project, just follow these steps.

1. Clone the repo

```bash
git clone https://github.com/albertodcm/ProyectoFinal.git
```

2. Cd into the required folder, i.e. ProyectoFinal
```bash
cd your route/ProyectoFinal
```

3. Install npm packages
```bash
npm install
```

4.  Install Firebase packages
```bash
npm install
```

5.  Install capacitor packages
```bash
--save @capacitor/core @capacitor/cli
cap init
ionic build
npx cap add ios
```

6. Run the project
> For Angular projects use `ng`.
```bash
ng serve 
```

> For Ionic projects use `ionic`.
```bash
ionic serve
```

# Authors
* [Alberto Cruz](https://github.com/albertodcm)
* [Luis Muñoz](https://github.com/ludamuac)
* [Hugo Sevilla](HugoElcabezas)
