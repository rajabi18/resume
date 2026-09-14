FROM busybox:1.37.0-musl

WORKDIR /site

COPY index.html robots.txt sitemap.xml ./
COPY fa/ ./fa/
COPY assets/css/style.css ./assets/css/style.css
COPY assets/js/script.js ./assets/js/script.js
COPY assets/images/logo.ico ./assets/images/logo.ico
COPY assets/images/my-avatar.png ./assets/images/my-avatar.png
COPY assets/fonts/Vazirmatn-Regular.ttf ./assets/fonts/Vazirmatn-Regular.ttf

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=3s --retries=3 \
  CMD wget --quiet --output-document=/dev/null http://127.0.0.1:8080/index.html || exit 1

CMD ["httpd", "-f", "-p", "8080", "-u", "65534:65534", "-h", "/site"]
