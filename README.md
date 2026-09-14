# Abolfazl Rajabi — Resume

Personal resume website for **Abolfazl Rajabi (ابوالفضل رجبی)**, packaged as a small self-contained Docker image.

## Run with Docker Compose

```bash
docker compose up -d --build
```

The English site is published at `http://127.0.0.1:9545/` and the Persian version at `http://127.0.0.1:9545/fa/`. Point the reverse proxy already installed on the server to this address.

To change the published host port, edit the `ports` entry in `compose.yaml`.

## Run with Docker

```bash
docker build -t abolfazl-rajabi-resume:local .
docker run -d \
  --name abolfazl-rajabi-resume \
  --restart unless-stopped \
  --read-only \
  --security-opt no-new-privileges \
  -p 127.0.0.1:8080:8080 \
  abolfazl-rajabi-resume:local
```

## Server deployment

1. Point the DNS records for `abolfazl-rajabi.ir` to the server.
2. Start the container with Docker Compose.
3. Configure the existing reverse proxy to forward the domain to `http://127.0.0.1:9545`.
4. Enable TLS and redirect HTTP traffic to HTTPS at the reverse proxy.
5. Submit `https://abolfazl-rajabi.ir/sitemap.xml` in Google Search Console.

If the production domain changes, update the canonical URL, Open Graph URL, JSON-LD, `robots.txt` and `sitemap.xml` before deployment.

## Useful commands

```bash
docker compose ps
docker compose logs --tail=100 resume
docker compose down
```
