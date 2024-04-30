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

# Install Docker CE, CLI, and Containerd.io
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Check available versions of Docker CE
sudo apt-cache madison docker-ce

# Install Docker CE, CLI, and Containerd.io again if needed
sudo apt-get install -y docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io

# Install Docker.io (usually not needed if the above Docker CE is installed)
sudo apt install -y docker.io

# Install Docker Compose
sudo apt install -y docker-compose