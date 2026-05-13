# Sepsis ZeroNavigator

Sepsis ZeroNavigator is a React web app for quick clinical reference and bedside calculations:

- SSC 2021 guideline summary
- NEWS2 calculator
- qSOFA calculator
- Norepinephrine and Dobutamine infusion calculator

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy On GitHub Pages

This repository includes a GitHub Actions workflow that deploys the app to GitHub Pages when code is pushed to `main`.

After the first push, open the repository settings:

1. Go to `Settings > Pages`.
2. Set `Source` to `GitHub Actions`.
3. Wait for the `Deploy GitHub Pages` workflow to finish.
