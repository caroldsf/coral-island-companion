# 🌴 Coral Island Companion

Guia não oficial de Coral Island em português, feito com React, TypeScript e Vite. O perfil (estação e rank) e os favoritos são armazenados no navegador. O perfil criado no MVP continua compatível.

[Abrir o guia](https://caroldsf.github.io/coral-island-companion/)

## Desenvolvimento

Use Node.js 24 ou superior.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
```

Edite a interface em `app/src` e os catálogos em `app/src/data`. As fichas apontam para suas fontes, principalmente referências comunitárias. Nomes em português podem ser traduções editoriais. Ao corrigir dados, mantenha os identificadores para preservar favoritos e registre a fonte na ficha.

## Plantio e lucro

- O filtro de estações usa interseção. Uma cultura precisa produzir em todas as estações marcadas.
- O rank do perfil limita a exibição até que o jogador habilite spoilers. Alguns desbloqueios dependem também de progresso fora do rank.
- A calculadora estima vendas em qualidade base e custos de plantio ao ar livre. Conta dias de crescimento, rebrote, unidades e compras de sementes por plantio. Exclui estufa, bônus, processamento e valor de frutos acumulados em árvores.
- O catálogo cobre agricultura, frutíferas, culinária, melhorias de ferramentas, criação de animais e construções selecionadas. As estimativas não foram reproduzidas em um save do jogo.

## Publicação no GitHub Pages

Rode `npm run build:pages` e inclua o `index.html` gerado no mesmo commit das alterações de código. A página autônoma inclui os arquivos produzidos pelo Vite e pode ser publicada pela configuração existente **Settings → Pages → Deploy from a branch → main / (root)**. Cada atualização de `main` aciona o deploy do GitHub Pages. O GitHub Actions executa os testes e confere se o arquivo publicado corresponde ao código.

Projeto de fãs, sem afiliação com a Stairway Games.
