# StartupTemplate

Company codebase boilerplate using:

- NX for monorepo management
- TS for most things
- ESLint / Prettier for linting
- Jest for testing TS
- NextJS for apps
- Tailwind for styling
- shad-cn for the design system, lucide for icons
- tRPC for the API
- Postgres for the DB
- Prisma for schema management and DB client
- BetterAuth for authentication with individual accounts and organizations
- Postmark for sending emails
- # TODO CI

# Repo setup

- Create an empty repo on github
- Clone this template and link it to that github repo
- Buy a domain name (Namecheap or Google Domains or ...)
- Setup a DNS provider (Cloudflare or Hostinger or ...)
- Setup a google app (https://console.cloud.google.com/apis/credentials).
  - Authorized JavaScript origins:
    - http://localhost:3000
    - https://startup-template-example-app.vercel.app
    - https://startup-template.example.com
  - Authorized redirect URIs:
    - http://localhost:3000/api/auth/callback/google
    - https://startup-template-example-app.vercel.app/api/auth/callback/google
    - https://startup-template.example.com/api/auth/callback/google
- Setup an email provider (Postmark or SendGrid or ...)
- Rename the root directory to your project name
- Rename every occurence of `startup-template` to your project name
- Rename every occurence of `Startup Template` to your project name (humanized)
- Rename every occurence of `example-app` to your app name, including in package-lock.json, for instance client-app if it serves your clients. Another app could be admin-app, that's why we use NX
- Rename folder example-app into your app name, for instance client-app
- Tour the repo and remove everything that's not needed for your project

# Dev setup

- Create .env at the root and change the values to your own, including changing the db name
- `npm install`
- Download docker (docker desktop for mac)
- Install recommended VSCode extensions
- Start the DB and run the migrations: `nx run db:migrate`
- Run `nx dev example-app` to start the dev server

# Deployment

- Create a Vercel account
- Create a database (neon...) in the right region, and save the DATABASE_URL somewhere
- Check out .env and make sure you have all the values needed for a production deployment
- Change the regions in vercel.json to your own, and push
- Create a project, directory is packages/example-app, setup the env variables, including `DATABASE_URL`
- Setup the projet's domain on Vercel, this requires adding a CNAME record on your domain provider
- Activate Speed Insights on Vercel, the setup is already done in the codebase (Note that it's blocked by adblockers, so to test it make sure you turn the adblockers off)
- Go to the website, cross your fingers, and the app should be running smoothly in production!
