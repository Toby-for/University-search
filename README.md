# Global Scholarship Finder

Static website that lists affordable universities in the USA, UK, China, South Korea, Hong Kong, and Japan offering full-ride, full-tuition, or low-tuition options. The site is designed for deployment on GitHub Pages and uses only client-side HTML, CSS and JavaScript.

## Run locally

Open `index.html` in a modern browser. No build step or server is required.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. In the repository settings, enable **Pages** and select the `main` branch with `/root`.
3. The site will be available at `https://<username>.github.io/<repo>/`.

## Update data

Edit `data/universities.json` with new or updated entries and commit the changes. The site will automatically load the updated dataset.

## Data verification

Each entry contains a `SourceLink` and `VerifiedDate`. Data should be rechecked regularly to ensure accuracy.

## License

MIT License. See [LICENSE](LICENSE).
