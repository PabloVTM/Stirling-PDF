<p align="center">
  <img src="./docs/stirling.png" width="80" alt="Stirling PDF logo">
</p>

# Stirling PDF (fork)

A self-hosted PDF platform: edit, merge, split, sign, redact, convert, OCR, compress and automate PDFs from the browser or through a REST API, without sending documents to external services.

This is a fork of [Stirling-Tools/Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF), maintained at [PabloVTM/Stirling-PDF](https://github.com/PabloVTM/Stirling-PDF) with the PabloVTM terminal theme shared with the other PabloVTM tools.

![Stirling PDF](docs/images/home-light.png)

## Image

Images are published to GitHub Container Registry for `linux/amd64` and `linux/arm64`:

| Tag | Content |
| --- | --- |
| `ghcr.io/pablovtm/stirling-pdf:latest` | Latest build of `main`. |
| `ghcr.io/pablovtm/stirling-pdf:YYYY-MM-DD` | Dated version, e.g. `2026-11-08`. A new one is built every Monday with the latest Ubuntu security updates. |

The image is the **core** edition: only the MIT-licensed code, with LibreOffice, Calibre, Tesseract and OCRmyPDF for conversions and OCR. The enterprise features under `app/proprietary` and the admin portal under `frontend/src/processor` are covered by the Stirling PDF User License, which does not allow redistribution, so they are not built into this image.

## Quick start

```yaml
services:
  stirling-pdf:
    container_name: stirling-pdf
    image: ghcr.io/pablovtm/stirling-pdf:latest
    ports:
      - 8080:8080
    volumes:
      - ./configs:/configs
      - ./logs:/logs
      - ./customFiles:/customFiles
      - ./pipeline:/pipeline
    environment:
      - PUID=1000
      - PGID=1000
    restart: unless-stopped
```

or

```bash
docker run -d --name stirling-pdf -p 8080:8080 -v ./configs:/configs ghcr.io/pablovtm/stirling-pdf:latest
```

Then open http://localhost:8080. The first start takes a minute or two; the container reports its health on `/api/v1/info/status`.

| Volume | Content |
| --- | --- |
| `/configs` | `settings.yml`, the database and other persistent settings. |
| `/logs` | Application logs. |
| `/customFiles` | Custom static files and templates. |
| `/pipeline` | Watched folders for automated pipelines. |

Configuration lives in `/configs/settings.yml` (created on first start) and can be overridden with environment variables. See the [upstream documentation](https://docs.stirlingpdf.com) for every setting.

## API

Almost every tool has a REST endpoint, for example:

```bash
curl -F "fileInput=@a.pdf" -F "fileInput=@b.pdf" http://localhost:8080/api/v1/general/merge-pdfs -o merged.pdf
```

The interactive API documentation is served by the instance at `/swagger-ui.html`.

## Building

```bash
docker build -f docker/embedded/Dockerfile -t stirling-pdf:local .
```

The Dockerfile builds the core edition by default. Building it needs about 8 GB of RAM and a recent Docker with BuildKit.

## Development

The project uses [Task](https://taskfile.dev/) for every build, dev and test command. You need JDK 25, Node.js 22 and Task.

```bash
task             # list the most common commands
task dev         # run the backend and the editor with hot reload
task backend:build:ci
task frontend:check:all
```

See [AGENTS.md](AGENTS.md) and the [developer guide](docs/developer/DeveloperGuide.md) for details.

## Credits

Stirling PDF is created by [Stirling-Tools](https://github.com/Stirling-Tools) and its contributors. This fork is maintained by [PabloVTM](https://github.com/PabloVTM).

## License

Open-core: everything outside the directories listed in [LICENSE](LICENSE) is under the MIT License. Those directories (`app/proprietary`, `app/saas`, `engine`, parts of `frontend/src`) have their own licenses.
