# 📘 Project Documentation (React + TypeScript + Vite)

## 🌐 Live Demo

The application is deployed on GitHub Pages:  
👉 [movies-app](https://alexandermezhenskyi.github.io/movies-app)

## 🚀 Getting Started

To set up the project locally, follow these steps:

1. **Install Dependencies**  
   Run the following command in the root directory to install all libraries defined in `package.json`:

   ```bash
   yarn install
   ```

2. **Start Development Server**  
   Launch the Vite development server with Hot Module Replacement (HMR):

   ```bash
   yarn dev
   ```

   After startup, the app will be available at the URL shown in the terminal ([http://localhost:5173/movies-app](http://localhost:5173/movies-app/)).

3. **Build for Production**  
   Create an optimized production build:

   ```bash
   yarn build
   ```

   The build output will be located in the `dist` directory.

4. **Preview Production Build Locally**  
   Serve the built application locally to test the production version:
   ```bash
   yarn preview
   ```

---

## 🧩 Available Scripts

The `package.json` file includes several useful scripts. Run them using:

```bash
yarn <script_name>
```

| Script      | Description                                                             |
| ----------- | ----------------------------------------------------------------------- |
| `dev`       | Starts the Vite dev server with Hot Module Replacement.                 |
| `build`     | Bundles the app for production into the `dist` folder.                  |
| `preview`   | Serves the production build locally using a static file server.         |
| `lint`      | Runs ESLint on `.ts` and `.tsx` files to ensure code style consistency. |
| `format`    | Runs Prettier on all project files to enforce code formatting rules.    |
| `predeploy` | Automatically runs `yarn build` before deploying to GitHub Pages.       |
| `deploy`    | Deploys the `dist` folder to GitHub Pages using the `gh-pages` package. |
