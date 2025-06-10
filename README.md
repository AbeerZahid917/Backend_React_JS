### Backend_React_JS_Nayatel_Internship

## Video 43 - setting up the db
* remove the slash from node modules in the git ignore file cuz we dont want to push the node modules

## Video 44
* make a user.js ad notes.js file in a new folder called modules
* go to mongoose and get the first line showing and paste in users.js
* then go to read docs and then schemas and get the first entire piece of code without the firt two lines
* then past in users.js and remove all the inner content of the copied code and add your own categories/features
* need to make schemas for the modules folder
* for the routes folder:
    * a bunch of scattered stuff in the code

## Video 46
* a bunch of stuff for input validation

## Video 49 - Hacking prevention for passwords
* adding salt (extra letters) to the password so that it cant be hacked
* code to prevent hacking

## Video 55 - Starting the frontend
* npm i react-router-dom concurrently to make it so that both the front end can work simultaneously plus a bunch of things in this vid
* also make sure that the overarching file is also a create-react-app cuz otherwise it wont have the public and src etc
* ### do not move the public and src from the backend file and call it a day, make a separate app and then move the backend into it

## Video 56
* once upon a time there was a thing where we studied state etc in mern, now we've finally gotten to context
* so use context is basically used to change the state at a place where its hard to change state like at the end of one of the khane of a hash table
* you can make it for different things like color, auth token etc

## Video 58 - understanding how its gonna work with a pretty cool example
* maing states, basically make another folder in src and call it context and that is where the state and context files will go
* over there, there will be a state and context file, the context file is kinda bland but the state file has the state that basicallt controls the state wherever in the code its imported
* also just import it and then set the value from the file to a variable and you can use it anywhere

## Video 61 - Font Awesome
* Font awesome is a website that can be used to make icons for stuff like a trash can for deleting etc
* just search it and bring the code snippet from there and paste it where necessary, like the delete one went in noteitem at the end of the card
* to turn the cursor into that hand thing, add at the end of index.css
   i {
     cursor: pointer;
   }
