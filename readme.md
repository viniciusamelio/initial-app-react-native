## Demo - React Native (Expo)

Esse app de estudos desenvolvido com RN tem a finalidade de aplicar conceitos de desenvolvimento mobile, aprendidos por mim com Flutter, em outro ecossistema, afim de validar o quão reaproveitáveis são as práticas abstraídas de frameworks (óbviamente eu já sabia o resultado, mas queria uma desculpa para testar o RN).

## Padrões e práticas utilizadas
- Repository
- IoC
- Dependency Injection
- Contextos modulares


## Gestão de estado
- Hooks
- Zustand


## Considerações finais
Em comparação com o Flutter, tecnologia que usei para desenvolver praticamente todos os apps mobile que trabalhei desde 2019, algumas dificuldades apareceram, em grande parte pela falta de costume com o ambiente num geral, como por exemplo os componentes base do React Native, ou até mesmo, a falta de costume com a diferença entre os linters e ferramenta de debug entre as duas plataformas. Essa dificuldade também se estendeu um pouco na abordagem usada nas bibliotecas de controle de estado, devido a um uso mais funcional dos mesmos.
Como já tenho um background com TS/JS, com React, no front, por exemplo, a maioria dos problemas com nuances de linguagem praticamente não existiram. Em relação as práticas empregadas no app, nenhuma delas apresentou dificuldade ou barreira ao implementa-las no app, desde o sistema de injeções, que aqui nesse caso foi feito com a biblioteca tsyringe, até as implementações do Expo (que por sinal é uma grande adição ao ferramental do RN, facilitando e agilizando muito), tudo fluiu de maneira fácil e com uma agilidade, e novamente, isso para alguém que não trabalha com a linguagem no dia-a-dia há pelo menos 3 anos.
Quanto aos padrões, independente inclusive de plataforma (Back, web, mobile, IOT, sistemas embarcados e etc) os conceitos demonstrados aqui, assim como em outros projetos, podem ser aproveitados visando uma arquitetura coerente e padronização bem conveniente. Era isso que eu pensava antes de tentar ter essa breve experiência com o RN, e assim mantenho meu pensamento, agora validado.
Até o momento (dia 04/09/23) não me aventurei a escrever testes de componentes, creio que unitariamente o jest, ou mesmo outras ferramentas de testes (como o próprio framework atual do próprio node), acabem desempenhando da mesma forma que acontece num backend, e o mesmo pode ser dito de um testes de integração com o Maestro.dev por exemplo, então até o momento 0 preocupações quanto a isso, mas ainda pretendo voltar nesse repo em algum momento justamente para fazer os testes de componente especificamente.
Independente de tudo isso, fica aqui validada a ideia de que com os conceitos certos aprendidos, o framework/biblioteca/linguagem utilizados para desenvolver software, no final das contas, são apenas ferramentas, ou seja, um meio para um fim, e não um fim para um meio.