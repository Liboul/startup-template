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

- Clone this template
- Rename the directory to your project name
- Rename every occurence of `startup-template` to your project name
- Rename every occurence of `Startup Template` to your project name (humanized)
- Rename every occurence of `example-app` to your app name, for instance client-app if it serves your clients. Another app could be admin-app, that's why we use NX
- Tour the repo and remove everything that's not needed for your project

# Deployment
- Create a Vercel account
- Create a project
- Create a database (e.g. neon)

# Company setup

- Setup a google app (https://console.cloud.google.com/apis/credentials)
- Buy a domain name (Namecheap or Google Domains or ...)
- Setup a DNS provider (Cloudflare or Hostinger or ...)
- Setup an email provider (Postmark or SendGrid or ...)

# Dev setup

- Create .env at the root and change the values to your own
- Download docker (docker desktop for mac)
- Install recommended VSCode extensions
- Start the DB and run the migrations: `nx run db:start && nx run db:migrate`
- Run `nx dev example-app` to start the dev server

# Deployment

TODO
