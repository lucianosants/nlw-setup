# Nlw - Setup

## Preview

![preview](https://user-images.githubusercontent.com/93036812/213884302-dd49fbd4-9f12-48a2-8fb9-9340b3301788.png)


projeto feito na `Nlw Setup` de `2023` pela `Rocketseat`.

Este projeto é uma aplicação `fullstack` que define hábitos para serem concluidos durante o ano de com a recorrencia escolhida pelo usuário.


## Tecnologias:
- `ReactJS`
- `React Native`
- `TypeScript`
- `TailwindCss`
- `JavaScript`
- `Fastfy`
- `Prisma`
- `NodeJS`
- `Radix-UI`
- `Expo`
- `SQLite`

## Rodando o projeto local

### 1 - Após clonar o repositório e acessar a pasta com o comando ```cd nlw-setup/```, com o terminal aberto rode o comando abaixo:

```
bash init.sh
```

e será executado um script para instalar todas as dependências.

### 2 - Configurando host

com o projeto aberto na sua IDE, acesse o arquivo que está no diretório `server/src/server.ts` e altere o host que se encontra com os valores `0.0.0.0` e defina o endereço IP da sua maquina.

`Com isso para acessar rotas da sua API use o endereço ip no lugar do localhost`

Renomeie o arquivo `.env.example` para `.env`


### 3 - E por fim, em web e mobiile vá acesse os aquivos de `src/lib/axios.ts` e altere para a o seu novo endereço da api. Em seguida Rode 
```
npm run dev
```

para a pasta web e server e use


```
npx expo start
``` 

para o mobile.

