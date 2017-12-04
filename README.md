# JotVocab-API
JotVocab back-end API

#### Endpoints
You can try to send a request to https://jotvocab-api.herokuapp.com/ deployed to Heroku.

>+ <ins>GET</ins> [/vocabs](https://jotvocab-api.herokuapp.com/vocabs) - to retrieve all vocabularies from all users
>+ <ins>POST</ins> [/vocab](https://jotvocab-api.herokuapp.com/vocab) - to append a new word the user's vocab list

#### Related Global Packages
+ nodemon@1.12.1

#### Related Local Dependencies
+ morgan@1.9.0
+ jsonwebtoken@8.1.0
+ body-parser@1.18.2
+ express@4.16.2
+ mongoose@4.13.5

### Files Description

>##### index.js
> Main entry point of the project
-----------------------------------------------
> ##### config.js
> Storing some configurations used for MongoDB connection. mLab, Database-as-a-Service for MongoDB, is used for online MongoDB.
> + port used
> + secret
> + database (for connect using a driver via the standard MongoDB URI)