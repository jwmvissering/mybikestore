# My bike store: back end

This project is written in Laravel.

## Install project
Create the .env file by running `cp .env.example .env` and fill in your database name, user and password.

Run `composer install` to install packages.

## Create database tables and add data

`php artisan migrate:fresh --seed`

## Serve local server

Run `php artisan serve` for a dev server. The api will now be available at http://127.0.0.1:8000/.
