module.exports= `
version: '3'

services:
{{#servicesList}}
  {{name}}:
    build:
        context: {{name}}/
        dockerfile: Dockerfile
    ports:
        - "{{port}}:3000"
    networks:
        - nodester-network
    environment:
        - NODE_ENV=development
    volumes:
        - ./{{name}}:/srv/app/
    command: ["npm", "start"]
    depends_on:
        - database_{{name}}

  database_{{name}}:
    image: 'mysql/mysql-server'
    restart: always
    ports:
        - "{{databasePort}}:3306"
    networks:
        - nodester-network
    environment:
        MYSQL_USER: nodester
        MYSQL_PASSWORD: nodester
        MYSQL_DATABASE: {{name}}db
        MYSQL_ROOT_PASSWORD: pass
    volumes:
        - {{name}}db-data-nodester-mysql:/var/lib/mysql
        - ./../lib/init/:/docker-entrypoint-initdb.d/ # initialization scripts

{{/servicesList}}

  storage:
    image: openzipkin/zipkin-mysql
    container_name: mysql
    # Uncomment to expose the storage port for testing
    # ports:
    #   - 3306:3306

  zipkin:
    image: openzipkin/zipkin
    container_name: zipkin
    # Environment settings are defined here https://github.com/openzipkin/zipkin/tree/1.19.0/zipkin-server#environment-variables
    environment:
      - STORAGE_TYPE=mysql
      # Point the zipkin at the storage backend
      - MYSQL_HOST=mysql
      # Uncomment to enable scribe
      # - SCRIBE_ENABLED=true
      # Uncomment to enable self-tracing
      # - SELF_TRACING_ENABLED=true
      # Uncomment to enable debug logging
      # - JAVA_OPTS=-Dlogging.level.zipkin=DEBUG
    ports:
      # Port used for the Zipkin UI and HTTP Api
      - 9411:9411
    depends_on:
      - storage
    restart: unless-stopped

  dependencies:
    image: openzipkin/zipkin-dependencies
    container_name: dependencies
    entrypoint: crond -f
    environment:
      - STORAGE_TYPE=mysql
      - MYSQL_HOST=mysql
      # Add the baked-in username and password for the zipkin-mysql image
      - MYSQL_USER=zipkin
      - MYSQL_PASS=zipkin
      # Uncomment to adjust memory used by the dependencies job
      - JAVA_OPTS=-verbose:gc -Xms512m -Xmx512m
    depends_on:
      - storage
    restart: unless-stopped

volumes:
{{#servicesList}}
  {{name}}db-data-nodester-mysql:

{{/servicesList}}


networks:
  nodester-network:
`;
