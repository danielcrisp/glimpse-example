# Glimpse Example

This repo demonstrates the error described here: https://github.com/Glimpse/Home/issues/127

## Install

There are two parts to the project: a mock API server and a simple Angular app.

You need to install and start each one separately.

### Mock

    $ cd mock
    $ npm install
    $ npm start

This will start the mock here: http://localhost:3000

There are three endpoints:

 - http://localhost:3000 - [GET] - responds with a simple text message
 - http://localhost:3000/good - [ANY] - responds with a very simple JSON body 
 - http://localhost:3000/bad - [ANY] - responds with a HUGE (~400 KB) JSON body

### Angular App

    $ cd client
    $ npm install
    $ npm start

This will start the app here: http://localhost:4200

Glimpse HUD is already installed. 

You may see some errors in the console like this: `Uncaught (in promise) TypeError: Cannot read property 'replace' of null`.

Click the buttons to try the good and bad XHR requests.

With the 'good' request you will see no errors.

With the 'bad' request you should see a `413 Payload Too Large` error despite the `glimpse.config.json` file setting the size limits much higher than necessary.
