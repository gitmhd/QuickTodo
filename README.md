# QuickTodo Chrome Extension

A lightweight Chrome extension for listing and managing your todo(s).

## Features

- Simple and intuitive todo list management
- Persistent storage using Chrome's storage API
- Clean and responsive UI
- Quick access via browser action popup

## Installation

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (toggle in the top right corner).
4. Click on "Load unpacked" and select the project directory.
5. The Todo extension icon will appear in your browser toolbar.

## Usage

1. Click the Todo extension icon in your browser toolbar.
2. The popup will appear, allowing you to add, view, and remove todos.
3. Your todos are saved automatically and will persist across browser sessions.

## Project Structure

- `manifest.json` – Chrome extension manifest file
- `index.html` – Popup HTML UI
- `js/` – JavaScript files for functionality
  - `main.js` – Main logic for todo management
  - `today.js` – Handles date
  - `vue.js` – Vue.js library
- `css/` – Stylesheets
  - `main.css` – Main styles
  - `flex-grids.min.css` – Grid layout styles
- `imgs/` – Extension icons

## Permissions

- `storage` – To save your todos
- `webRequest`, `webRequestBlocking` – (Reserved for future features or advanced use)

## Author

Mouhammad Albissaty Saleh
Github Account: [https://github/gitmhd](https://github/gitmhd)
Visit my developer portfolio: [https://mouhammad.tech](https://mouhammad.tech)

## License

See [LICENSE](LICENSE) for details.
