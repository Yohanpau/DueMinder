# DueMinder
Managing bills can be overwhelming, especially when there are multiple due dates and bill amounts. DueMinder is a mobile application that offers a customizable, user-friendly platform to track bills, remind users of upcoming payments, and help them stay financially organized. It also features an AI-powered chatbot that can summarize the user’s bills and provide helpful insights on how to manage them better, offering a simple, conversational way to stay on top of finances.

## Features
- Add, edit, delete, and modify bills based on their priority (e.g., High, Medium)
- Automated reminders via email before due dates.
- Overview dashboard showing lists with upcoming payments, and total bills to pay.
- Secure user authentication and data storage.
- AI-powered summaries of current bills with smart insights and practical advice to help users make better financial decisions.

## New Features
- Real-time pop-up notifications to alert users of upcoming due dates and important updates.
- Profile image upload feature to personalize user accounts.
- Backend database integration for storing and managing user data securely.
- Full CRUD API support for users, bills, budgets, and priorities.
- AI integration through the database to provide personalized bill insights, budget tracking, and smart financial assistance.
- AI response format for bills, delivering clear and structured insights.

## How It Works 
### 1. User register and signs in to a dashboard in order to add bills with due dates and categories. 
### 2. Backend stores bill data securely.
### 3. AI analyzes and summarizes bills added by the User.
### 4. Scheduler checks for upcoming due dates. 
### 5. Notifications are sent via email/SMS.


## Opening the Project
In order to use DueMinder, one must open this repository, have an API key, have an API key and run the following commands:
Its still the same as before we've just added some new key intrusctions:

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

    let PDF_FILE = '05-versions-space.pdf'; ------------------> Just change this to ./Dueminder.pdf
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

### 9. Open another terminal, Next navigate to the database folder:
```
cd database
```

### 10. Install all dependencies in the project root:
```
npm i
```

### 11. Since were using prisma and needed sa api key for the database this will be provided for the judges:
- API key will be removed after the winners are announced
- DATABASE_URL="mongodb+srv://root:randompassword@cluster0.yxw8fgt.mongodb.net/dueminder?retryWrites=true&w=majority&appName=Cluster0&tls=true&tlsAllowInvalidCertificates=true"
- JWT_SECRET="adyohanpeyt"
- GEMINI_API_KEY=XXXXXXX - for the api key of this there's an Intrucion on 7 be sure to follow that and include it also here.
- Create a .env file in inside the database folder just like this C:\Users\Admin\Desktop\Python\DueMinder\database\.env
```
npx prisma generate
```

### 12. After everything is settled run this command in the terminal:
```
npm run start:dev
```

### 13. Once you see this in the terminal then your good to go:
```
[Nest] 5540  - 08/24/2025, 10:47:19 AM     LOG [RoutesResolver] AuthController {/auth}: +0ms
[Nest] 5540  - 08/24/2025, 10:47:19 AM     LOG [RouterExplorer] Mapped {/auth/register, POST} route +2ms
[Nest] 5540  - 08/24/2025, 10:47:19 AM     LOG [RouterExplorer] Mapped {/auth/login, POST} route +1ms
[Nest] 5540  - 08/24/2025, 10:47:19 AM     LOG [RouterExplorer] Mapped {/auth/profile, POST} route +2ms
[Nest] 5540  - 08/24/2025, 10:47:19 AM     LOG [RoutesResolver] UsersController {/users}: +1ms
[Nest] 5540  - 08/24/2025, 10:47:19 AM     LOG [RouterExplorer] Mapped {/users/budget, GET} route +2ms
[Nest] 5540  - 08/24/2025, 10:47:19 AM     LOG [RouterExplorer] Mapped {/users/:id/budget, PUT} route +4ms
✅ Database connected
[Nest] 5540  - 08/24/2025, 10:47:20 AM     LOG [NestApplication] Nest application successfully started +262ms
🚀 Server running on http://localhost:3000
```

### 14. After running the backend and database server open another terminal for the frontend and type this command:
```
npm run dev
```

### 15. Click the provided local URL to view the site in your browser (e.g., http://localhost:3000).

# That's it!

### Key Reminder:

Make sure you have your own API Key then create a .env file inside the backend and database folder then input your API key (e.g., GEMINI_API_KEY=xxxxxxx)
- API key will be removed after the winners are announced

Thank you for using Dueminder.
