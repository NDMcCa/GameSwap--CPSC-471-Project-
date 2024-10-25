# Game Swap
> Project for **CPSC 471**!

![SvelteKit](https://img.shields.io/badge/sveltekit-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<br />

### Development `.env` file:
```ini
DATABASE_HOST=localhost
DATABASE_USER=user
DATABASE_PASSWORD=userpassword
DATABASE_NAME=gameswap_db
```
This goes in the root project directory.

### Working with containers:
 - Run `docker-compose up -d`. This will start all the containers specified in the `docker-compose.yml` file.
 - When your done with the container, run `docker-compose down` to shut it down.