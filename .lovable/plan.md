# Etapa 0 concluída — diagnóstico

Nenhuma página, imagem ou conteúdo do site foi alterado. O Git não apresenta alterações anteriores. Não há testes configurados no projeto, e os arquivos de diagnóstico disponíveis não apresentaram registros de erros.

## Arquivos identificados
- Página inicial: `src/pages/Index.tsx`.
- Cabeçalho e imagem inicial: `src/components/Header.tsx` e `src/components/Hero.tsx`.
- Agenda e botões sem destino: `src/components/Agenda.tsx`.
- Discografia: `src/components/Discografia.tsx`.
- Contato: `src/components/Contato.tsx`.
- Roteamento: `src/App.tsx` — página inicial e página de não encontrado; ainda não existe página de letras.

## Catálogo e imagens atuais
- Os álbuns estão em uma lista dentro de `Discografia.tsx`, com ano, título, tipo e nomes das faixas. Não há letras nem links individuais nessa lista.
- Imagens existentes: `guitar-hero.jpg`, `hero-stage.jpg`, `logo-cp.jpg` e `logo-full.jpg`.
- Arquivos públicos: `favicon.ico`, `placeholder.svg` e `robots.txt`.
- Foram recebidas nove imagens novas e o documento de instruções. Nenhum JSON de volume foi recebido; não serão acrescentadas faixas, letras ou informações por suposição.
- A imagem com o título incorreto “Por Te Amar Assim” não será utilizada.

## Próxima etapa para aprovação: links de contato
1. Alterar somente os destinos de **Comparecer** e **Agenda Completa** para `mailto:contato@charlespierre.com.br`.
2. Preservar aparência, nomes dos botões, eventos, discografia, fotos e demais links.
3. Conferir os destinos na página e os erros disponíveis.
4. Relatar os arquivos alterados e parar novamente para sua aprovação.

O e-mail já exibido no contato está correto e não precisa de alteração.

## Etapas posteriores
Após aprovação separada, trabalhar um volume por vez com suas descrições/JSON; depois letras e links verificados, capas correspondentes e eventual imagem aprovada. Não criar a página Frida Gimpel nesta etapa: ela depende de autorização específica e do arquivo indicado no documento.

## Detalhes técnicos
Na próxima execução, a alteração de página ficará restrita a `src/components/Agenda.tsx`; a lista de tarefas acompanhará a conclusão. Não instalar dependências, executar migrações ou publicar o site.