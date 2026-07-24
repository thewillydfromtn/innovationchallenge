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

Office moments are full-frame cinematic still images. Each approved still is expected to already include William's pose, the Kerri portrait, wall artwork, drink, candle, monitor previews, and every other office detail. Runtime HTML overlays are deprecated and are not part of the active film path.

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

Presentations own the entire browser viewport. They are not embedded into a fake monitor or aligned to monitor geometry.

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
      camera.js              # deprecated prototype support
      sceneManager.js         # deprecated prototype support
      timelineEngine.js       # deprecated prototype support
  overlays/                  # deprecated prototype support
  scenes/                    # deprecated prototype support
```

## Active Modules

- `script.js` boots the self-playing film, preloads office images, and starts playback.
- `sceneConfig.js` declares the office-image beats and future standalone presentation slots.
- `engine/filmPlayer.js` sequences office stills, fade-to-black transitions, full-screen presentation frames, and credits.
- `style.css` defines full-viewport film frames, crossfades, and the subtle whole-image office push.

## Deprecated Prototype Modules

The former overlay-based office system is retained only to avoid abrupt deletion while the production architecture changes. Do not use these modules for new film work:

- monitor overlay alignment
- fake monitor overlay screens
- right-monitor camera push/zoom calculations
- office element overlays for portrait, wall art, drink, candle, or monitors
- runtime positioning of office objects
- layered HTML recreation of the office

## View Online

This project is configured for GitHub Pages. After this branch is merged, GitHub Actions deploys the static HTML application from the repository root whenever changes are pushed to `main`.

## Run

Because the app uses ES modules, serve the folder with a local static server and open the shown URL:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
