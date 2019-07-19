# Sekai


<p>
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/ryeonghwi/gayar-app/blob/master/iOS/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" target="_blank" />
  </a>
</p>


# Installation 
### Install Homebrew (Mac OS)
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew -v
Homebrew 2.1.7
Homebrew/homebrew-core (git revision 2a8b; last commit 2019-07-15)
Homebrew/homebrew-cask (git revision 82630e; last commit 2019-07-16)
```
### Install Node 
```
brew install node
$ echo 'export PATH="/usr/local/opt/icu4c/bin:$PATH"' >> ~/.bash_profile
$ echo 'export PATH="/usr/local/opt/icu4c/sbin:$PATH"' >> ~/.bash_profile
```
### Clone Project 
```
$ git clone https://github.com/iStorry/sekai.git && cd sekai 
```
### Install Node Modules
```
npm i 
```
### Create Env File
``` 
touch .env
```

### Basic Env Config
```
NAME = BOT_NAME
TOKEN = DISCORD_TOKEN
DEBUG = true
GOOGLE_API =  GOOGLE_KEY
DARK_SKY = DARK_KEY
```
### Run Project
 
```
node app.js
```
