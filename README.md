# restserver

# Getting Started

## Step 1: Start your Application

```bash
# using npm
npm i
npx nodemon app
```

## Tags:
- v1.0.0 -m “First section”
- v2.0.0 -m “Second section” -> feat/8_DELETE_erase_user
- v3.0.0 -m “Third section” -> Branch feat/10_optimize_imports
- v5.0.0 -m “v5.0.0” -> feat/14_Search -> Branch 5.0.0-rc-5 
- 6.0.0 -m “v6.0.0” -> feat/20_Cloudinary -> Branch 6.0.0-rc-6 
- 7.0.0 -m “v7.0.0” -> feat/22_Send_Email -> Branch 7.0.0-rc-7
- 8.0.0 -m “v8.0.0” -> feat/23_Updates -> Branch 8.0.0-rc-8


## Env File:

- MONGODB_CNN: <mongodb+srv://...>
- SECRETEORPRIVATEKEY: used for jwt.verify

- GOOGLE_CLIENT_ID= GoogleCloud -> API's & Services -> Credentials -> Cliend ID
- GOOGLE_SECRET_ID= GoogleCloud -> API's & Services -> Credentials -> Cliend secrete

- CLOUDINARY_URL= https://console.cloudinary.com/ -> Dashboard -> API Environment variable <cloudinary://....>

- NODEMAILER_AUTH_USER= google email
- NODEMAILER_AUTH_PASS= Google Account -> Security -> App password
- NODEMAILER_FROM= google email

- CLIENT_URL=http//...

https://miracleio.me/snippets/use-gmail-with-nodemailer/

```bash

PORT=8080
MONGODB_CNN=
SECRETEORPRIVATEKEY=

GOOGLE_CLIENT_ID=
GOOGLE_SECRET_ID=

CLOUDINARY_URL=


NODEMAILER_AUTH_USER=
NODEMAILER_AUTH_PASS=
NODEMAILER_FROM=

CLIENT_URL=http://localhost:3000
```
