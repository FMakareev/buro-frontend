# Project structure

* config - dev configs
  * jest - test configs
  * fileLoaderConfig.js - webpack file-loader
  * graphqlLoaderConfig.js - webpack graphql-loader
  * scriptsLoaderConfig.js - webpack config js
  * setupTests.js - enzyme config
  * styleLoaderConfig.js - webpack style loader config
  * webpack.client.js - browser config
  * webpack.server.js - server config
* docs - project documentation
* public - final build
* src - source code
    * apollo - [Apollo client](https://www.apollographql.com/)
        * graphql - fake resolvers for query and mutation
        * mocksClient - fake apollo client
        * schema.graphqls - backend graphql schema
        * index.client.js - Browser config
        * index.server.js - Server config
        * package.json
        * ...
    * components - components, (import alias: @lib/ui)
    * client - browser entry
        * index.js 
        * package.json
    * modules - project modules 
        * ...
        * index.js
        * package.json
    * routes -
        * errors - errors page template
        * index.js - create routes. 
        * package.json
    * server - server entry
        * index.js 
        * package.json
    * store - redux
      * reducers - reducers
        * [module name]
          * actionTypes.js
          * actions.js
          * reducers.js
      * index.js
    * style - styled
        * ...
        * index.js
        * package.json
* scripts
  * build.spa - create build single page application
  * build.ssr - create build isomorphic application
  * start.build.spa.js - run build spa application
  * start.spa - run development mode single page application
  * start.ssr - run development mode isomorphic application
* tools 
  * getVariablesesEnvironment - get cli variables
  * clear - remove temporary file
  * createIndex - create Index.js in `src/modules`:
    * --exclude - array of modules excluded from build `--exclude="home,about"`
    * --include - array of modules included from build `--include="home,about"`
  * initLocalizationFiles - create localization 
  * compilerPromise
  * logMessage
