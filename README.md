# Projet Amboise - Site internet [![Stars](https://img.shields.io/github/stars/antoinemcx/projet-amboise)](https://github.com/antoinemcx/projet-amboise) [![Discord](https://img.shields.io/badge/-Discord-7389D8?logo=discord&logoColor=ffffff&labelColor=6A7EC2)](https://discord.gg/JhRhU2cKVQ)

Projet Amboise est un jeu de tir prenant place dans une modélisation 3D de Sainte-Marie (établissement à Albi, Tarn).
Ce projet, fait par des terminales, a par ailleurs pour but d'aider au financement d'une soirée pour l'année 2022-2023.
   
Ce repo est composé du **bot discord** et du **site internet** de Projet Amboise ; Si vous aimez, hésitez pas à lâcher une ⭐ !

## Setup du repo

### 1. Configuration : créez `config.js` en y remplaçant les valeurs de `config-secret.js`

### 2. Installation des dépendances

```sh
$ npm install
```

### 3. MariaDB

Naybor runs on the MariaDB database, a slightly modified version of MySQL.<br>
First, create the database. The name of the database must be the same as the one set in the `config.js` file  

![](https://i.imgur.com/ALeKvsf.png)

#### To create the table, run the following command (after creating the database of course) :

```sh
$ npm run migration
```

### 4. Lancement du bot

```sh
$ npm start
```
‎
   
###### Fait avec ❤️ par [antoinemcx](https://github.com/antoinemcx) en EJS, CSS et JavaScript.