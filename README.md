# Fortress AI Innovation Challenge

Reusable architecture for a cinematic HTML short film built with modern ES6 modules and no frontend framework.

## Project Structure

```text
/
  index.html
  style.css
  script.js
  README.md
  assets/
      office/
      portraits/
      props/
      ui/
  scenes/
      scene1.js
  engine/
      camera.js
      sceneManager.js
      animationManager.js
      assetManager.js
```

## Architecture

- `engine/sceneManager.js` registers scene modules, mounts the active scene, and cleans up when changing scenes.
- `engine/camera.js` applies smooth pan and zoom transforms to the camera stage.
- `engine/animationManager.js` runs timeline-based animations with reusable easing functions.
- `engine/assetManager.js` registers, preloads, caches, and retrieves reusable assets.
- `scenes/scene1.js` is a placeholder title scene that verifies the engine is wired together. It intentionally does not build the office yet.

## View Online

This project is configured for GitHub Pages. After this branch is merged, GitHub Actions deploys the static HTML application from the repository root whenever changes are pushed to `main`.

To view the deployed project:

1. Open this repository on GitHub.
2. Select **Settings** > **Pages**.
3. Confirm the source is set to **GitHub Actions**.
4. Use the published GitHub Pages URL shown on that page. It usually follows this format:

   ```text
   https://<owner>.github.io/<repository>/
   ```

You can also open the latest **Deploy static site to GitHub Pages** workflow run from the **Actions** tab and use the deployment URL reported by the `github-pages` environment.

## Run

Because the app uses ES6 modules, serve the folder with a local static server and open the shown URL:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
