FROM php:8.2-alpine

RUN apk --no-cache add \
        libzip-dev \
        gettext-dev \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        postgresql-dev \
        git \
        gettext \
        freetype \
    && mkdir /app

#####################################
# PHP extensions:
#####################################

RUN docker-php-ext-install \
    exif \
    pcntl \
    zip \
    pdo_pgsql \
    bcmath \
    intl \
    gettext

RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd

WORKDIR /app

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8000"]
