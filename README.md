# JotVocab-API
The JotVocab back-end API, deployed at http://jotvocab-api.herokuapp.com. The front-end one is deployed at https://tmwatchanan.github.io/JotVocab/.

#### Endpoints
You can try to send a request to https://jotvocab-api.herokuapp.com/ deployed to Heroku.

> **User's Vocabulary**
>+ **<ins>GET</ins>** [/vocab/all](https://jotvocab-api.herokuapp.com/vocab/all) - to retrieve all vocabularies from all users
>   + *for example, http://jotvocab-api.herokuapp.com/vocab/all*
>+ **<ins>POST</ins>** [/vocab/user/list](https://jotvocab-api.herokuapp.com/vocab/user/list) - to retrieve all saved words of the user's
>   + *for example, http://jotvocab-api.herokuapp.com/vocab/user/list* with *token* in the request body
>+ **<ins>POST</ins>** [/vocab/user/add](https://jotvocab-api.herokuapp.com/vocab/user/add) - to append a new word (you want to add) the user's vocab list
>   + *for example, http://jotvocab-api.herokuapp.com/vocab/user/add* with *token*, *word* and *definition* in the request body
>+ **<ins>DELETE</ins>** [/vocab/user/delete](https://jotvocab-api.herokuapp.com/vocab/user/delete) - to append a new word the user's vocab list
>   + *for example, http://jotvocab-api.herokuapp.com/vocab/user/delete* with *token*, *word* and its *definition* (you want to delete) in the request body
>+ **<ins>POST</ins>** [/vocab/user/random](https://jotvocab-api.herokuapp.com/vocab/user/random) - to randomly select a word from the user's vocab list
>   + *for example, http://jotvocab-api.herokuapp.com/vocab/user/random* with *token* in the request body

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