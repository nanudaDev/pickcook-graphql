<p align="center">
  <a href="http://www.pickcook.kr/" target="blank"><img src="https://www.pickcook.kr/img/logo.ae204840.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

[Pickcook] 픽쿡 서비스 Nest.JS + TypeORM + GraphQL 서비스 서버

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## GraphQL

- 크롬에서 GraphQL playground 플러그인 설치 후 진행

## GraphQL Resolver Conventions

```bash
# Admin Resolver
 - {methodName}{entityName}ForAdmin
    - findAllCommonCodeForAdmin()

# Common Resolver
 - {methodName}{entityName}
    - findallCommonCode()
```

## Scaffolding

```bash
# Basic structure
  - src
    - shared
      - common code enum
    - core
    - common
    - config
    - locales
      - kr
    - modules

# Module folder structure (src/modules)
  - {camelCaseModelName}
    - dto
      - admin-{modelName}-{requestMethod}.dto.ts
      - index.ts
    - {modelName}.model.ts
    - admin-{modelName}.resolver.ts
    - {modelName}.resolver.ts
    - {modelName}.service.ts

```

## Footnote

- Author - [이상준] illumeweb@gmail.com
- Website - [https://www.pickcook.kr](https://www.pickcook.kr)
- NestJS - [https://nestjs.com](https://nestjs.com/)
- TypeORM - [https://typeorm.io/#/](https://typeorm.io/#/)
