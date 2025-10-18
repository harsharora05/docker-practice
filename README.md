## Docker installation without docker compose

### create volume for postgres
docker volume create pg_data
### create network
docker network create mono_network 


### run postgress in that network
docker run --name postgres -e  DATABASE_PASSWORD=mysecretpassword --network mono_network -d -p 5432:5432 -v pg_data:/var/lib/postgresql/data postgres


### build backend image
docker build -t my_backend -f docker/dockerfile.backend . 

### run backend container
docker run --network mono_network --name backend_containter -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres -p 3001:3001 my_backend




### build frontend image (making Buildkit=0 helps you pass network to build command so that you can connect to your postgres db which is running in that network)
DOCKER_BUILDKIT=0 docker build --build-arg DB_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres -t my_frontend -f docker/dockerfile.frontend . --network mono_network

### run frontend container
docker run --network mono_network -p 3000:3000 -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres --name frontend_container my_frontend


