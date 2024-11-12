# Carteira Digital

Esse projeto foi desenvolvido como requisito de avaliação da disciplina **Projeto de Software** do Professor Baldoino.

O projeto tem como objetivo a implementação de uma **Carteira Digital**, onde os usuários podem registrar, visualizar e realizar transações financeiras, além de gerar comprovantes de transações em formato PDF.

## Tecnologias Utilizadas

- **Frontend**: React.js
- **Backend**: Java, JavaScript
- **API para Autenticação de Usuário**: Firebase Authentication
- **API para Envio de SMS**: Twilio
- **Bibliotecas**:
  - `jsPDF` para gerar PDFs.
  - `styled-components` para estilização dos componentes.
  - `react-router-dom` para navegação entre páginas.

## Padrões de Projeto Utilizados

### Strategy no **TransferMoney**

Encapsulei o comportamento de transferência e geração de comprovantes como estratégias. O **padrão Strategy** define uma família de algoritmos, encapsula cada um deles e os torna intercambiáveis.

- **TransferStrategy** e **GeneratePDFStrategy** foram criadas como classes, cada uma encapsulando uma funcionalidade específica.
- O componente **TransferMoney** agora utiliza essas estratégias para realizar ações, ao invés de ter o código embutido diretamente no componente. Isso facilita a modificação ou extensão do comportamento sem alterar a lógica principal.

### Factory Method no **AddCard**

Criei uma função para a criação do objeto do cartão. Isso ajuda a encapsular a lógica de criação, o que pode ser útil no futuro se a criação do cartão envolver lógica mais complexa (como validações ou adição de mais informações).

- A função `createCard` é responsável por criar o objeto, tornando o processo mais modular e fácil de manter.

### Command no **TransactionHistory**

O **padrão Command** transforma solicitações ou operações simples em objetos, permitindo desacoplar o objeto que invoca a operação daquele que sabe como executá-la.

- Agora, as operações de **deletar uma transação** e **gerar um PDF** são encapsuladas em objetos de comando. Isso facilita a adição de novas operações ou mudanças no comportamento sem modificar diretamente o código principal da interface.

## Como Executar o Projeto

### Pré-requisitos

Antes de rodar o projeto, certifique-se de ter o **Node.js** e o **Java** instalados em sua máquina. Caso não tenha, você pode baixá-los nos seguintes links:

- **Node.js**: [https://nodejs.org/](https://nodejs.org/)
- **Java**: [https://www.oracle.com/java/technologies/javase-jdk11-downloads.html](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)

Além disso, será necessário configurar o Firebase para autenticação de usuários e o Twilio para envio de SMS.

