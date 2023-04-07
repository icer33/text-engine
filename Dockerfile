FROM ubuntu:22.04

ENV workdirectory /home/ubuntu
WORKDIR $workdirectory

COPY fonts ./fonts
COPY game-disks ./game-disks
COPY package.json .
COPY readme.md ./readme.md
COPY styles ./styles

RUN apt-get update && apt-get install -y coreutils

ENTRYPOINT ["tail","-f","/dev/null"]
