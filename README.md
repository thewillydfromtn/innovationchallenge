# Fortress AI Innovation Challenge

Static architecture for a self-playing cinematic HTML short film built with modern ES modules and no frontend framework.

## Production Architecture

The GitHub Pages site plays from beginning to end without menus, buttons, interaction, or playback controls. The active flow is:

```text
Opening office image
→ Act I full-screen HTML presentation
→ Office image after Act I
→ Act II full-screen HTML presentation
→ Office image after Act II
→ ...
→ Final office image
→ End credits
```

Office moments are full-frame cinematic still images. Each approved still is expected to already include William's pose, the Kerri portrait, wall artwork, drink, candle, desktop details, and every other office detail. No runtime HTML layers are added on top of the office stills.

Each act presentation is intended to live in its own standalone folder, for example:

```text
film/
  opening/
  act1/
  act2/
  act3/
  act4/
  act5/
  act6/
  act7/
```

Presentations own the entire browser viewport after a fade to black; they are never embedded into or aligned with details inside an office still.

## Project Structure

```text
/
  index.html
  style.css
  script.js
  sceneConfig.js
  README.md
  assets/
      master-office-reference.png
      master-final-act-reference.png
  engine/
      assetManager.js
      filmPlayer.js
      animationManager.js
      sceneManager.js
```

## Active Modules

- `script.js` boots the self-playing film, preloads office images, and starts playback.
- `sceneConfig.js` declares the office-image beats and future standalone presentation slots.
- `engine/filmPlayer.js` sequences office stills, fade-to-black transitions, full-screen presentation frames, and credits.
- `style.css` defines full-viewport film frames, crossfades, and the subtle whole-image office push.

## Presentation Rules

Office stills are flat static images. The only motion allowed during an office beat is the configurable whole-image push defined in `sceneConfig.js`; transitions between office stills and presentations are fade-out/fade-in cuts through black.

## View Online

This project is configured for GitHub Pages. After this branch is merged, GitHub Actions deploys the static HTML application from the repository root whenever changes are pushed to `main`.

## Run

Because the app uses ES modules, serve the folder with a local static server and open the shown URL:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
