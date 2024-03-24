# Pluto Policy Manager

Chrome OS policies manager

## Try it out

Check out our [Pluto Demo Application](https://pluto.chromebook.cloud/)!

## Features

Compared to Google's own admin console, Pluto aims to make the admin's life easier in the following ways:

- Visualise organisation units as diagram.
- Copy policies between organization units.
- Download policies of a specific organisation unit.

## Installation

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install all of Pluto's build dependencies.

```bash
npm install
```

## Developing

To start a development server:

```bash
npm run dev
```

## Docker
To test this on docker to these step:
```bash
DOCKER_BUILDKIT=1 docker build --pull --rm -f Dockerfile -t plutoappv2:your_tag . 
```

And finally run the container:
```bash
docker run --name given_container_name -p 3000:3000 -d image_id 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

