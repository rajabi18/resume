FROM busybox:1.37.0-musl

WORKDIR /site

COPY index.html robots.txt sitemap.xml ./
COPY assets/ ./assets/

USER 65534:65534
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=3s --retries=3 \
  CMD wget --quiet --output-document=/dev/null http://127.0.0.1:8080/index.html || exit 1

CMD ["httpd", "-f", "-p", "8080", "-h", "/site"]
