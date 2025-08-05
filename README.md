# DueMinder
Managing bills can be overwhelming, especially when there are multiple due dates and bill amounts. DueMinder is a mobile application that offers a customizable, user-friendly platform to track bills, remind users of upcoming payments, and help them stay financially organized. It also features an AI-powered chatbot that can summarize the user’s bills and provide helpful insights on how to manage them better, offering a simple, conversational way to stay on top of finances.

## Features
- Add, edit, delete, and modify bills based on their priority (e.g., High, Medium)
- Automated reminders via email before due dates.
- Overview dashboard showing lists with upcoming payments, and total bills to pay.
- Secure user authentication and data storage.
- AI-powered summaries of current bills with smart insights and practical advice to help users make better financial decisions.

## How It Works 
### 1. User register and signs in to a dashboard in order to add bills with due dates and categories. 
### 2. Backend stores bill data securely.
### 3. AI analyzes and summarizes bills added by the User.
### 4. Scheduler checks for upcoming due dates. 
### 5. Notifications are sent via email/SMS.

## Opening the Project
In order to use DueMinder, one must open this repository, have an API key, have an API key and run the following commands:

### 1. Install all dependencies in the project root:
```
npm i
```
### 2. Navigate to the backend folder:
```
cd backend
```
### 3. Start the backend server:
```
node app.js
```
### 4. When Running the server and you stumble on this error:
```
node:fs:573
  return binding.open(
                 ^

Error: ENOENT: no such file or directory, open 'D:\PROG_FILES\Contests\DueMinder\backend\test\data\05-versions-space.pdf'
    at Object.openSync (node:fs:573:18)
    at Object.readFileSync (node:fs:452:35)
    at Object.<anonymous> (D:\PROG_FILES\Contests\DueMinder\node_modules\pdf-parse\index.js:15:25)
    at Module._compile (node:internal/modules/cjs/loader:1469:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1548:10)
    at Module.load (node:internal/modules/cjs/loader:1288:32)
    at Module._load (node:internal/modules/cjs/loader:1104:12)
    at cjsLoader (node:internal/modules/esm/translators:346:17)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:286:7)
    at ModuleJob.run (node:internal/modules/esm/module_job:234:25) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'D:\PROG_FILES\Contests\DueMinder\backend\test\data\05-versions-space.pdf'
}
```
This error message means Node.js is trying to read a PDF file located at, so don't worry we already have a solution for that.

### 5. Go to the node_modules that was located outside the directory and navigate the pdf-parse.
This is the file path:
```
C:\Users\Admin\Desktop\Python\DueMinder\node_modules\pdf-parse
```
### 6. Then click the pdf-parse inside that you'll see an index.js file, click it and then you will stumble on this code:
```
const Fs = require('fs');
const Pdf = require('./lib/pdf-parse.js');

module.exports = Pdf;

let isDebugMode = !module.parent; 

//process.env.AUTO_KENT_DEBUG

//for testing purpose
if (isDebugMode) {

    let PDF_FILE = '05-versions-space.pdf'; ------------------> This was the pdf that was trying to locate based on the error that was shown.
    let dataBuffer = Fs.readFileSync(PDF_FILE);
    Pdf(dataBuffer).then(function(data) {
        Fs.writeFileSync(`${PDF_FILE}.txt`, data.text, {
            encoding: 'utf8',
            flag: 'w'
        });
        debugger;
    }).catch(function(err) {
        debugger;
    });

}

```
### 7. Just change the 05-versions-space.pdf to ./Dueminder.pdf that was save on the backend folder:
```
const Fs = require('fs');
const Pdf = require('./lib/pdf-parse.js');

module.exports = Pdf;

let isDebugMode = !module.parent; 

//process.env.AUTO_KENT_DEBUG

//for testing purpose
if (isDebugMode) {

    let PDF_FILE = './Dueminder.pdf'; ------------------> Just change this to ./Dueminder.pdf
    let dataBuffer = Fs.readFileSync(PDF_FILE);
    Pdf(dataBuffer).then(function(data) {
        Fs.writeFileSync(`${PDF_FILE}.txt`, data.text, {
            encoding: 'utf8',
            flag: 'w'
        });
        debugger;
    }).catch(function(err) {
        debugger;
    });

}
```
### 7. Now start running the backend server again:
(Make sure u have your own API Key so that our AI Assitant would work)
(If you dont have an API key you can get it for free in https://aistudio.google.com/apikey)
(After getting the key create an .env folder on the backend and put the api key to GEMINI_API_KEY=xxxxxxx)
```
node app.js
```

### 8. After running the backend server open another terminal for the frontend and type this command:
```
npm run dev
```

### 9. Click the provided local URL to view the site in your browser (e.g., http://localhost:3000).

# That's it!

### Key Reminder:

Make sure you have your own API Key then create a .env file inside the backend folder then input your API key (e.g., GEMINI_API_KEY=xxxxxxx)

Thank you for using Dueminder.

