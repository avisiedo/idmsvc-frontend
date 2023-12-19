FROM registry.redhat.io/rhel9/nodejs-16:1-110 AS builder
# https://github.com/cypress-io/cypress/issues/25236
# TODO Set env variable indicated into the URL
USER root
# The working dir is at /opt/app-root/src
COPY package*.json .
RUN npm install
COPY src src
COPY *.js .
COPY tsconfig.json tsconfig.json
RUN npm run build

COPY build/package/gen.app.info.sh gen.app.info.sh
RUN mv dist target \
    && mkdir dist \
    && cp -Rvf target dist/preview \
    && cp -Rvf target dist/stable \
    && true
ARG SRC_HASH
ENV SRC_HASH=${SRC_HASH}
ARG APP_NAME
ENV APP_NAME=${APP_NAME}
RUN ./gen.app.info.sh


FROM quay.io/cloudservices/caddy-ubi:11145b1


COPY build/package/Caddyfile /opt/app-root/src/Caddyfile
COPY --from=builder /opt/app-root/src/dist /opt/app-root/src/dist/

COPY --from=builder /opt/app-root/src/app.info.json /opt/app-root/src/dist/app.info.json
COPY --from=builder /opt/app-root/src/app.info.deps.json /opt/app-root/src/dist/app.info.deps.json
COPY --from=builder /opt/app-root/src/app.info.stable.json /opt/app-root/src/dist/stable/app.info.json
COPY --from=builder /opt/app-root/src/app.info.preview.json /opt/app-root/src/dist/preview/app.info.json

COPY ./package.json /opt/app-root/src


WORKDIR /opt/app-root/src

RUN sed -i -e 's/\/beta\/apps/\/apps/g' /opt/app-root/src/dist/stable/fed-mods.json

ENV APP_NAME="idmsvc"
ENV ROUTE_PATH="/apps/${APP_NAME}"
ENV BETA_ROUTE_PATH="/beta/apps/${APP_NAME}"
ENV PREVIEW_ROUTE_PATH="/preview/apps/${APP_NAME}"

CMD ["caddy", "run", "--config", "/opt/app-root/src/Caddyfile"]

EXPOSE 8000
EXPOSE 9000

ENV CADDY_TLS_MODE="http_port 8000"

