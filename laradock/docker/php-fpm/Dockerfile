FROM php:7.3-fpm

RUN apt-get update && apt-get install -y --no-install-recommends \
  libpq-dev \
  libzip-dev \
  postgresql \
  python3 \
  unzip \
  && docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    fileinfo \
    sockets \
    zip \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# ENV NVM_DIR /usr/local/nvm
# ENV NODE_VERSION 14.17.5

# RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# RUN source $NVM_DIR/nvm.sh \
#     && nvm install $NODE_VERSION \
#     && nvm alias default $NODE_VERSION \
#     && nvm use default

# コンポ―サーのインストール
COPY --from=composer:1 /usr/bin/composer /usr/bin/composer

# nodeのインストール
COPY --from=node:14.2 /usr/local/bin /usr/local/bin
COPY --from=node:14.2 /usr/local/lib /usr/local/lib

WORKDIR /var/www/html
