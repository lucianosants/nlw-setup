#!/bin/bash

# Install Dependencies to Web
echo "Install web"
cd web/ ; npm i ; cd ..

# Install Dependencies to Mobile 
echo "Install mobile"
cd mobile/ ; npm i ; cd ..

# Install Dependencies to Server/Back-end
echo "Install Server"
cd server/ ; npm i ; cd ..


