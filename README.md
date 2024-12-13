# Game Swap

> Project for **CPSC 471**!
> Not affiliated in any way with GameStop. This project is not for realworld application and as such is not intended to benefit from similarity to the GameStop brand in any way.
> Also not affiliated with the real GameSwap or intended to benefit in any way off of that branding as well. We're just fans of gaming!

![SvelteKit](https://img.shields.io/badge/sveltekit-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

### Development `.env` file (for Docker):

```ini
DATABASE_HOST=localhost
DATABASE_USER=user
DATABASE_PASSWORD=userpassword
DATABASE_NAME=gameswap_db
JWT_SECRET=secret
```

This goes in the root project directory.

### Working with containers:

#### Initial startup:

Run `docker-compose up --build` to build the container(s) from scratch.

#### Continue from cached state:

Run `docker-compose up -d` to continue from the last saved state of the container

#### Shutdown container(s) and save state:

Run `docker-compose down`

#### Shutdown container(s) and clear saved state:

Run `docker-compose down -v`

#### Procedure to hard reset the container(s):

Run:

```bash
docker-compose down -v
docker-compose up --build
```

Do this if the schema has been modified so the sql scripts located in `schema` are re-executed.
