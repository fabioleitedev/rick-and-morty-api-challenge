# Rick and Morty API Challenge

Created by Fábio Leite
fabioleitedev@gmail.com
[linkedin.com/fabioleitedev](https://www.linkedin.com/in/fabioleitedev)

####👍🏻&nbsp;&nbsp;Please see my consideration at the end of this page.

## Pre-requisites

* Docker ([https://www.docker.com/](https://www.docker.com/))
* Docker Compose ([https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/))
* NodeJS >= v14 [https://nodejs.org/en/](https://nodejs.org/en/)

## Get started (100% Containerized)

📂 &nbsp;&nbsp;Go to the source folder `/src`
⚙️ &nbsp;&nbsp;Create the `.env` file following the `.env.sample` file.
📂 &nbsp;&nbsp;Go to the root folder.
🏃🏻 &nbsp;&nbsp;Run `./start.sh`
🚀 &nbsp;&nbsp;Start using the API

## Get started (Local)

📂 &nbsp;&nbsp;Go to the source folder `/src`
⚙️ &nbsp;&nbsp;Create the `.env` file following the `.env.sample` file.
📂 &nbsp;&nbsp;Go to the root folder.
🏃🏻 &nbsp;&nbsp;Run `./start-local.sh`
📂 &nbsp;&nbsp;Go to the source folder `/src`
🏃🏻 &nbsp;&nbsp;To run tests, type `npm run test` or `yarn test`
🚀 &nbsp;&nbsp;Start using the API

## Kubernetes

I left a `deployment.yaml` as an example to deploy it in K8S.

## Using the API

#### GET /v1/characters/locations

* Returns characters by name with other characters residing in the same location.
* Send a `GET` request to `localhost:5000/v1/characters/locations?name=Alan Rails`

#### GET /v1/characters/episodes

* Returns characters by name with the first episode that they appeared and other characters that appeard in the same episode
* Send a `GET` request to `localhost:5000/v1/characters/episodes?name=Rick`

## My Considerations
. I decided to use `Redis` to cache results in memory, because it's a kind of data that don't change very often. In a microservices approach, would became a cache microservice.
. I decided to remove the character search from the list of other characters, avoind data replicated.
. I created a ParseService to handle the transformation of the data comming from the external API to the internal model of the app. In a more complex architecture, we could use some ETL technology or a microservice with this reponsability.
