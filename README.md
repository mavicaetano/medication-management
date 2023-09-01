# Sistema de gestão de farmácias e medicamentos

Este projeto se trata de um sistema para gestão de medicamentos e farmácias.
Ele possui as seguintes páginas:
- Login
- Mapa (página inicial/home)
- Cadastro de medicamentos
- Listagem de medicamentos
- Cadastro de farmácia
  ... e uma página de erro 404, caso o usuário busque por uma rota inexistente.

Na página de Login, o usuário deve inserir um e-mail válido e uma senha com, no mínimo, 8 caracteres, composto por letras e números.
Ao fazer o login, o usuário será direcionado para a página inicial, onde há um mapa contendo as farmácias que o usuário cadastrar.
No menu de navegação, o usuário pode acessar as demais páginas:

### Cadastro de medicamentos:
Nessa página é realizado o cadastro das medicações, com os seguintes campos a serem preenchidos:
- Nome do medicamento (obrigatório)
- Nome do laboratório (obrigatório)
- Dosagem (obrigatório)
- Descrição (opcional)
- Preço unitário (obrigatório)
- Tipo de medicamento (comum ou controlado) (obrigatório)

### Lista de medicamentos:
Aqui é mostrado todos os medicamentos cadastrados pelo usuário. É possível fazer a busca pelo nome do medicamento, laboratório, tipo (comum ou controlado) ou preço.

### Cadastrar farmácia:
Nessa página é realizado o cadastro das farmácias, com os seguintes campos a serem preenchidos:
- Razão social (obrigatório)
- CNPJ (obrigatório)
- Nome Fantasia (obrigatório)
- E-mail (obrigatório)
- Telefone (opcional)
- Celular (obrigatório)
- Endereço
- CEP (obrigatório)
- Logradouro/Endereço (obrigatório)
- Número (obrigatório)
- Bairro (obrigatório)
- Cidade (obrigatório)
- Estado (obrigatório)
- Complemento (opcional)
