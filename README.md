# MTT App

Ionic App for MTT

## Table of Contents

1. [Getting Started](#getting-started)
2. [i18n](#i18n) (adding languages)

## <a name="getting-started"></a>Getting Started
Follow the steps below to clone the repositry on your computer and compile the app.

1. Clone the repository
```bash
git clone https://gitlab.com/isearch-lab/mtt
```

2. Move inside the project's folder
```bash
cd mtt
```

3. Install the dependences
```bash
npm i
```

4. Initialize Ionic by just typing the "ionic" command
```bash
ionic
```

5. Add the Android platform
```bash
ionic cordova platform add android
```

6. Build and run the app on Android
```bash
ionic cordova run android
```

## i18n

The app comes with internationalization (i18n) out of the box with
[ngx-translate](https://github.com/ngx-translate/core). This makes it easy to
change the text used in the app by modifying only one file. 

### Adding Languages

To add new languages, add new files to the `src/assets/i18n` directory,
following the pattern of LANGCODE.json where LANGCODE is the language/locale
code (ex: en/gb/de/es/etc.).

### Changing the Language

To change the language of the app, edit `src/app/app.component.ts` and modify
`translate.use('en')` to use the LANGCODE from `src/assets/i18n/`

## License
This software is released under the MIT license. Please see the `LICENSE.txt` file.
