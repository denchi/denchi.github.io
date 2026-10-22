# Denis Chiriac — Portfolio

Personal portfolio site for Denis Chiriac. The live site is [https://denchi.github.io/](https://denchi.github.io/).

Portfolio content lives in [`js/portfolio.js`](js/portfolio.js); `js/autolayout.js` renders it into the page.

## Add or edit a project

Projects are entries on `portfolio.games`. The property name is the project id (for example `jellymaze`). The site lists projects in that object’s key order. An entry that is commented out stays off the page.

Fields the layout uses:

| Field | What it does |
|---|---|
| `title` | Project heading. |
| `description` | Short blurb under the heading. |
| `screenshots` | Paths from the site root. A `.mp4` file plays as a muted looping video; any other file is an image. Two files use two columns, three files use three, and any other count uses four. |
| `landscape` | Optional. With more than two screenshots, `true` lays them out two per row. |
| `urls` | Optional store links. Recognized keys are `android` (Google Play), `ios` (Apple Store), and `steam` (Steam). |

Some entries also store `url` (one store link) and `icon` (usually under `assets/img/icons/`). The layout reads `urls` for links and does not show `url` or `icon`.

To add a project, put images or videos in `assets/img/screenshots/<ProjectName>/` and add an object to `portfolio.games`:

```js
mygame: {
    title: 'My Game',
    description: 'One or two sentences about the project.',
    urls: {
        android: 'https://play.google.com/store/apps/details?id=com.example.mygame',
    },
    screenshots: [
        'assets/img/screenshots/MyGame/trailer.mp4',
        'assets/img/screenshots/MyGame/screenshot1.png',
    ],
},
```

To edit a project, change that object’s fields. GitHub Pages publishes the `master` branch to the live site.
