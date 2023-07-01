# Instruções de Execução

## Primemiro de tudo

Tenha certeza de ter instalado

- php

- sqlite3

- composer

- node.js

## Back End:

- Clone o repositório do projeto para o seu ambiente local.
```
git clone <repolink> 
```
Tenha certeza de como se acessa um repositório privado

- Em um bash vá para o diretório da aplicação “cd Reminder-DTI” e execute o comando:
```  
composer install
```
- Copie o conteúdo arquivo ".env.example", crie um arquivo chamado “.env” na raiz do projeto.

- Abra o arquivo ".env" e cole o conteúdo do arquivo ".env.example" nele. Salve o arquivo.

- Execute o comando para migrar as tabelas do banco de dados.
```  
php artisan migrate
```
- Execute o comando para popular o banco de dados com dados de teste (se houver).
```  
php artisan db:seed
```
- Execute o comando "php artisan key:generate" para gerar a chave de criptografia da aplicação.
```  
php artisan key:generate
```
- Execute o comando para iniciar o servidor de desenvolvimento do Laravel.
 ``` 
php artisan serve
```
## Front End:

- Em uma nova janela do terminal ou bash, navegue até a pasta raiz do projeto.
- Execute o comando para entrar na pasta do projeto front-end.
```  
cd reminder-react
```
- Execute o comando para instalar as dependências do projeto front-end.
 ``` 
npm install
```
- Copie o conteúdo arquivo ".env.example", crie um arquivo chamado “.env” na raiz do projeto.
  
- Abra o arquivo ".env" e cole o conteúdo do arquivo ".env.example" nele. Salve o arquivo.
  
- Execute o comando  para iniciar o ambiente de desenvolvimento do front-end.
```
npm run dev
```
- Abra o Link apresentado no terminal.
