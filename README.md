<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


## Criação de Aplicação com NestJS

### Instalando NestJS Global
```
npm install -g @nestjs/cli
```

### Criando nova aplicação com Nest
```
nest new myapp
```

### Rodar aplicação
```
npm run start:dev
```

### Criar modulo
```
nest generate module nomedomodulo
```

### Criar controller
```
nest generate controller nomedocontroller
```

### Criar rota
- Dentro do controller desejado, importamos de dentro do '@nestjs/common' o protocolo:
```
import { Get } from '@nestjs/common';
```

- Depois declaramos o método com o @Get logo acima do método
```
@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {

  }

  @Get('/:id')
  getMessage(@Param() id) {
    console.log(id)
  }
}
```

- A rota dica declarada no @Controller(), e se quisermos adicionar mais caminhos, é só colocar no método http o próximo caminho como mostrado no get/:id

### Recuperando parâmetros (BODY/QUERY/ROUTE)
- Podemos recuperar os parâmetros direto de dentro do método chamado. Exemplo:

- Recuperando o corpo: @Body() body: any
```
@Post()
  createMessage(@Body() body: CreateMessageDto) {
    const { content } = body
    console.log(content)
  }
```
- Nesse caso, nosso body já tem uma tipagem chamada CreateMessageDto

- Recuperando o id do params: @Param('id') id: any
```
@Get()
  getMessage(@Param('id') id: String) {
    console.log(id)
  }
```

### Usando pipes para validação
- Dentro do arquivo main.ts, precisamos importar o ValidationPipe
```
import { ValidationPipe } from '@nestjs/common'
```

- Depois dentro da função principal, precisamos dizer pra aplicação usar a validação com o useGlobalPipes

```
async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();

```

### Criando tipo para os dados para usar na regra de validação
- Dentro da pasta src/messages, podemos criar uma pasta chamada dtos, e dentro dela um arquivo de tipos para a criação de messages. Por exemplo: create-message-dto.ts
Vamos instalar a lib 'class-validator' e a lib 'class-transformer' e dentro do arquivo create-message-dto.ts, criar a seguinte tipagem:

```
import { IsString } from 'class-validator'

export class CreateMessageDto {
  @IsString()
  content: string
}
```

- Depois disso, podemos importar a tipagem no controller desejado, e colocar como tipo dentro da função:
```
import { CreateMessageDto } from './dtos/create-message-dto'

createMessage(@Body() body: CreateMessageDto) {
  
}
```