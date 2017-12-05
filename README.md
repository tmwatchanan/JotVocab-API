# JotVocab-API
JotVocab back-end API

#### Endpoints
You can try to send a request to https://jotvocab-api.herokuapp.com/ deployed to Heroku.

> **User's Vocabulary**
>+ <ins>GET</ins> [/vocabs](https://jotvocab-api.herokuapp.com/vocabs) - to retrieve all vocabularies from all users
>   + *for example, http://jotvocab-api.herokuapp.com/vocabs*
>+ <ins>POST</ins> [/vocab](https://jotvocab-api.herokuapp.com/vocab)/:uid - to append a new word the user's vocab list
>   + *for example, http://jotvocab-api.herokuapp.com/vocab/123456789*

> **Thai Dictionary**
>+ <ins>GET</ins>
>   + *for example, http://jotvocab-api.herokuapp.com/thaidict/hello*

#### Related Global Packages
+ nodemon@1.12.1

#### Related Local Dependencies
+ morgan@1.9.0
+ jsonwebtoken@8.1.0
+ body-parser@1.18.2
+ express@4.16.2
+ mongoose@4.13.5

#### Special Thanks to
+ [pureexe/node-thaidict](https://github.com/pureexe/node-thaidict) for the node dependency provides Thai dictionary _(based on Lexitron 2.0)_

### Files Description

>##### index.js
> Main entry point of the project
-----------------------------------------------
> ##### configs/globalConfig.js
> Storing some configurations used for MongoDB connection. mLab, Database-as-a-Service for MongoDB, is used for online MongoDB.
> + port used
> + secret
> + database (for connect using a driver via the standard MongoDB URI)

-----------------------------------------------
>#### controllers/
> ##### controllers/vocabController.js
> Contains methods used to serve for HTTP requests that involve with user's vocabularies.
> ##### controllers/thaidictController.js
> Contains methods used to serve for HTTP requests that response with Thai deifinition for an english word in JSON format.