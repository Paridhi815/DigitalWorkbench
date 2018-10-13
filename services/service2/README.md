# full-feature-micro-service-example Microservice

TODO : Update these badge links
[![pipeline status](https://gitlab.com/apifie/nodems/examples/full-feature-micro-service-example/badges/master/pipeline.svg)](https://gitlab.com/apifie/nodems/examples/full-feature-micro-service-example/commits/master)
[![coverage report](https://gitlab.com/apifie/nodems/examples/full-feature-micro-service-example/badges/master/coverage.svg)](https://gitlab.com/apifie/nodems/examples/full-feature-micro-service-example/commits/master)

**Latest Stable Version : 1.0.0**

---
### Running project
```bash
npm start
```

### Additional commands are:

| Command            | Description                                              |
| ------------------ | -------------------------------------------------------- |
| npm start          | Starts the server                                        |
| npm run dev        | Starts the server in live reload mode                    |
| npm run test       | Run tests                                                |
| npm run test:watch | Run tests in watch mode                                  |
| npm run lint       | Run lint                                                 |
| npm run lint:fix   | Run lint and try to auto fix errors                      |
| npm run coverage   | Generate code coverage report                            |

### Common capabilities from NodeJS BluePrint
 * [x] Scripts for Running project in multiple environments and modes
 * [x] Prerequisite setup for CI/CD
 * [x] DB Integration (mySQL)
 * [x] Redis Integration
 * [x] Inter-service communication (RabbitMQ)
 * [x] Support for Monitoring request response time
 * [x] Quality audit Using Sonarkube
 * [x] Standardize API specifications using Swagger guidelines
 * [x] Integration with Zipkin for Traceability support

TODO : Setup above check-boxes as per service need

For all above details, refer to [NODE JS Blueprint documentation](https://gitlab.com/apifie/nodems/node-microservice/wikis/home)

## Scope
Define here the business scope and context for having this service.
This should ideally be full of keywords from a search and tagging perspective.
Clearly describe which Business problem / technical (common) use case is solved by this service.

### Solution overview
Briefly describe the solution approach in context of above problem. Talk about critical components that make up this solution.

### What this service does
* xxx
* xxx
*

### What this service does not do
* xxx
* xxx
*

## Data Flow
Provide a link to main Data Flows as applicable to this service
* [Link]()
* [Link]()
*

## Important algorithms / business logic
* xxx
  * yyy
  * yyy
  *
* xxx
  * yyy
  * yyy
  *
## Deployment details
| Artifact |Dev | QA | QS | PREX | PROD |
|-----|----------|------|------|------|------|
| No. of instances | min / max | min / max | min / max | min / max | min / max) |
| Access control | AAD | AAD | PUB | IP-WL | PUB |
| Test report |[xxx]() | [xxx]() | [xxx]() | [xxx]() | [xxx]() |
| Stable Docker Build |[xxx]() | [xxx]() | [xxx]() | [xxx]() | [xxx]() |
| Cluster end-point |[xxx]() | [xxx]() | [xxx]() | [xxx]() | [xxx]() |
| APIM end-point |[xxx]() | [xxx]() | [xxx]() | [xxx]() | [xxx]() |
| Gateway end-point |[xxx]() | [xxx]() | [xxx]() | [xxx]() | [xxx]() |

## Important links
Provide links to assets that may be relevant for developers / maintainers of this service.
These links may be related to reading material, service accounts, service quotas, monitoring dashboards etc.
* xxx
* xxx
*

## Service Interface

### REST end-points
[Swagger specs]() for this service are maintained with source code.
A snapshot of available end-points is listed here.
#### REST End-points exposed
1. xxx
2. xxx
3.

#### REST End-points consumed
1. xxx
2. xxx
3.

### MQ end-points
#### MQ Setup
| Sno |Exchange | Pub / Sub | Routing Key | Event | Purpose
|-----|----------|------|------|------|------|
|1| full-feature-micro-service-example | sub | xxx | xxx | xxx |
|1| full-feature-micro-service-example | sub | xxx | xxx | xxx |
|2| full-feature-micro-service-example-delayed | sub | xxx | xxx | xxx |
|2| full-feature-micro-service-example-delayed | sub | xxx | xxx | xxx |
|3| incident | pub | incident | xxx | xxx | xxx |
|-|----------|------|

#### Subcribers
Describe all the MQ events that are processed / monitored by this service
1. **XXX** : Describe the event. And provide sample request and response payloads

```javascript
{
  "event": "LOG_MESSAGE",
  "data": {
    "applicationId": "12345678"
  },
  "metadata" : {
    "appKey": "test-app-key",
    "appContext": "test-app-context"
  }
}
```

2. xxx

#### Publishers
Describe all the MQ events that are generated / relayed by this service
1. **XXX** : Describe the event. And provide sample request and response payloads

```javascript
{
  "event": "LOG_MESSAGE",
  "data": {
    "applicationId": "12345678"
  },
  "metadata" : {
    "appKey": "test-app-key",
    "appContext": "test-app-context"
  }
}
```

## Service setup (specific to this service)
* xxx
* xxx
*

## Development team
* **Maintainer(s)** : @mail2gauravkumar
* **Team** : @charu.priya, @lalit.rhombus, @diwakar-s-maurya