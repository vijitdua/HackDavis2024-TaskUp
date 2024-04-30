# Getting Started with Client App Hosted On SERVER

- This is a note to self.
- run `bash server-default-start.sh`
- run `sudo docker build . -t taskup`
- run `sudo docker run --restart=always -p 80:3000 taskup` 
(or run without --restart=always if you don't auto restart with server boot)