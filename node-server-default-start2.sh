#!/bin/bash

# Update the package list
sudo apt-get update

# Install prerequisites
sudo apt-get install -y \
  apt-transport-https \
  ca-certificates \
  curl \
  gnupg-agent \
  software-properties-common

# Add Docker’s official GPG key
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Add Docker's official APT repository
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# Update the package list after adding Docker repository
sudo apt-get update

# Install Docker CE, CLI, and Containerd.io
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Optionally, list available versions and install a specific version
sudo apt-cache madison docker-ce
# sudo apt-get install -y docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io

# Install Docker Compose
sudo apt install -y docker-compose

echo "Docker and Docker Compose have been installed successfully."
