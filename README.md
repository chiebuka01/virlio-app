# Virlio

A scalable, cloud-native video sharing web application built on Microsoft Azure, developed for COM769 (79672) Scalable Advanced Software Solutions, Coursework 2.

## Attribution

This project began from the open-source starting point [fazt/tiktok-mern](https://github.com/fazt/tiktok-mern) (no explicit license was specified in the source repository). The original project provided a basic MERN-stack video-sharing skeleton (React + Vite frontend, Express + MongoDB + Typegoose backend).

It has since been substantially modified and extended to:
- Run on Microsoft Azure Cosmos DB (MongoDB API) instead of local MongoDB
- Store and serve video files via Azure Blob Storage instead of local disk storage
- Deploy the frontend as a static website on Azure Blob Storage / the backend as an Azure App Service, connected via GitHub Actions CI/CD
- Add creator/consumer user roles with route-level authorisation
- Add video metadata fields required by the coursework brief (publisher, producer, genre, age rating)
- Fix a routing bug in the original repository where the `/signin` endpoint incorrectly called the signup handler
- Add a missing sign-in page (the original only implemented signup)

## Architecture

- **Frontend:** React + TypeScript + Vite + TailwindCSS, hosted as a static website on Azure Blob Storage
- **Backend:** Node.js + Express + TypeScript, hosted on Azure App Service
- **Database:** Azure Cosmos DB (MongoDB API), accessed via Mongoose/Typegoose
- **File storage:** Azure Blob Storage for video files
- **Auth:** Custom JWT-based authentication with argon2 password hashing and role-based access control (creator / consumer)

## Local development

### Server
```bash
cd server
npm install
npm run dev
```
Requires environment variables: `COSMOS_DB_CONNECTION_STRING`, `JWT_SECRET`, `AZURE_STORAGE_CONNECTION_STRING`, `CLIENT_URL`.

### Client
```bash
cd client
npm install
npm run dev
```
Requires `VITE_API_URL` set in `.env` (defaults to `http://localhost:3000`).
