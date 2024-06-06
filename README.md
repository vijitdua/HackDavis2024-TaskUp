# Hack Davis 2024, TaskUp 

---

[DevPost submission](https://devpost.com/software/taskup-fi8jkh)

---

## What is TaskUp?

"TaskUp" is designed to be a comprehensive productivity tool that allows users to manage their daily tasks efficiently
while providing an engaging and interactive experience. The application seamlessly integrates task management with 
gamification techniques and collaboration tools, catering to both individual users and teams.

[Check out the demo video](https://youtu.be/s_a5ya_JwBQ)

---

## Preview

- <img width="250" alt="image" src="https://github.com/vijitdua/HackDavis2024-TaskUp/assets/82555472/9878409f-5d3c-4749-b178-88c14e60da28">

- <img width="250" alt="image" src="https://github.com/vijitdua/HackDavis2024-TaskUp/assets/82555472/b477d7c2-c290-46d9-9141-650079813d30">
- <img width="250" alt="image" src="https://github.com/vijitdua/HackDavis2024-TaskUp/assets/82555472/1a6fde03-1b1e-4f7c-ba9b-10b619e65cc0">
- <img width="250" alt="image" src="https://github.com/vijitdua/HackDavis2024-TaskUp/assets/82555472/3ad2e15b-7757-400c-9818-f08e3be92747">
- <img width="250" alt="image" src="https://github.com/vijitdua/HackDavis2024-TaskUp/assets/82555472/785c4441-98c4-49ea-a5a6-c51443b7583e">

---

## Tech Stack

### Frontend

Built with React.js, Material UI, and deployed through Docker.

### Backend

Build with express.js on Node.js, MySQL, and deployed through Docker Compose, ran on amazon EC2 container during the hackathon (server currently offline).

---

## Run Locally

This guide assumes you are either running a Linux or Mac machine, for non-unix based machines please
appropriately translate the commands and running setup.

This guide also assumes that your port 3000 and 3002 are empty, if not you must either close any processes running on 
those ports or change the app posts in the .env or docker-compose.yml.

### Backend

You can run this in two ways, either through docker or npm. We recommend using docker for the backend.

#### Through Docker

- Install the docker engine.
- Open `/server`
- run `sudo docker compose -p task-up up --build`


##### Through NPM

- Install node.js onto your machine.
- Install mysql onto your machine.
- Ensure your root password is the same as the MY_SQL password in the `/server/.env`
- run `sudo npm install`
- run `sudo npm start`

### FrontEnd

This can also be run through both docker or npm.

#### Through Docker

- Install the docker engine.
- Open `/client`
- run `sudo docker build . -t taskup`
- run `sudo docker run -p 3000:3000 taskup`

#### Through NPM

- Install node.js onto your machine.
- Open `/client`
- Run `sudo npm install`
- Run `sudo npm start`

---

## Developed By
- [Vijit Dua](https://github.com/vijitdua) 
    - Backend: Everything
    - Frontend: API to communicate with backend and some (login, signup, bottom bar, and error message) UI components
- [Toniya Patil](https://github.com/tbpatil)
  - Frontend: Building main front-end components
- [Nandhana Selvam](https://github.com/nandhanaselvam) 
    - Frontend: Handling API returns and parsing them into built components.
- [Anirudh Venkatachalam](https://github.com/anirudhvee)
    - Frontend: Creating pages using created components.

---
