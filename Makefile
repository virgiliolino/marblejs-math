docker-validate-config:
	docker-compose config
docker-up:
	docker-compose up 
docker-rebuild:
	docker-compose build --no-cache --force-rm
docker-create-project:
	@make docker-rebuild
	@make docker-up
docker-remake:
	@make docker-destroy
	@make docker-create-project
docker-stop:
	docker-compose stop
docker-down:
	docker-compose down
docker-restart:
	@make docker-down
	@make docker-up
docker-destroy:
	docker-compose down --rmi all --volumes
gradle-build:
	./gradlew clean build
test:
	gradle test
tdd:
	watch ./gradlew clean test --tests $(test)
