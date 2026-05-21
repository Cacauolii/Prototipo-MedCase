# MedCase — Protótipo de Alta Fidelidade

Protótipo navegável das telas principais do sistema **MedCase**, uma plataforma de gestão de casos clínicos para estudantes de medicina. Desenvolvido como entrega do Sprint Review.

---

## Como executar

O protótipo é estático (HTML + CSS + JavaScript puros, sem dependências externas além das fontes do Google Fonts).

**Opção 1 — Abrir diretamente:**
Dê duplo-clique no arquivo `index.html`. Ele abrirá no navegador padrão.

**Opção 2 — Servidor local (recomendado):**
Caso o navegador bloqueie algum recurso por política de origem (CORS), rode um servidor local na pasta do projeto:

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js
npx serve .
```

Depois acesse `http://localhost:8000` no navegador.

---

## Navegação

- A tela inicial é a **Tela 06 — Login**.
- Use as **abas no topo** para navegar entre as 6 telas do protótipo.
- Atalhos de teclado: pressione **1, 2, 3, 4, 5 ou 6** para alternar diretamente entre as telas.

---

## Estrutura de arquivos

```
medcase-prototipo/
│
├── index.html                    # Página principal (carrega todos os recursos)
├── README.md                     # Este arquivo
│
├── css/                          # Folhas de estilo modulares por tela
│   ├── base.css                  # Variáveis CSS, reset, tipografia, header
│   ├── app-shell.css             # Barra superior do app, botões, content area
│   ├── screen-1-caso.css         # Estilos da Tela 01 (Caso Clínico)
│   ├── screen-2-evolucao.css     # Estilos da Tela 02 (Evolução)
│   ├── screen-3-grupo.css        # Estilos da Tela 03 (Grupo de Estudo)
│   ├── screen-4-comunidade.css   # Estilos da Tela 04 (Comunidade)
│   ├── screen-5-dashboard.css    # Estilos da Tela 05 (Dashboard)
│   ├── screen-6-login.css        # Estilos da Tela 06 (Login)
│   └── responsive.css            # Media queries para telas menores
│
├── js/
│   └── main.js                   # Lógica de navegação entre telas
│
└── screens/                      # Cópia isolada do HTML de cada tela (para revisão)
    ├── tela-1.html
    ├── tela-2.html
    ├── tela-3.html
    ├── tela-4.html
    ├── tela-5.html
    └── tela-6.html
```

> **Nota:** Os arquivos em `screens/` são fragmentos isolados do `<section>` de cada tela. Eles não são carregados diretamente pelo `index.html` — servem apenas para facilitar a revisão e a documentação. Toda a renderização real acontece a partir do `index.html`.

---

## As 6 telas do protótipo

### Tela 01 — Caso Clínico
Visualização completa de um caso. Renderiza todos os campos da entidade `CasoClinico`: queixa principal, histórico da doença, exame físico (com sinais vitais), conduta/prescrição, dados do paciente (iniciais, idade, sexo, prontuário), autor, especialidade, tags e mídias anexadas.

### Tela 02 — Evolução
Linha do tempo cronológica das evoluções vinculadas a um caso (`Evolucao.id_caso → CasoClinico.id_caso`). Cada registro mostra autor, data, conteúdo e badge de visibilidade (público/privado, mapeando o campo `is_publico`). Inclui formulário para registrar nova evolução.

### Tela 03 — Grupo de Estudo
Página de um grupo, exibindo `nome_grupo`, `descricao` e `codigo_acesso` em destaque. Mostra contadores de membros, casos compartilhados, evoluções públicas e especialidades. Grid de casos compartilhados via tabela de associação `grupo_casos`.

### Tela 04 — Comunidade
Feed público de casos clínicos publicados pela comunidade. Exibe `upvotes`, `downvotes`, `score_relevancia` e `quantidade_endossos` (campos da entidade `PostComunidade`). Inclui filtros de ordenação, sidebar com tags em alta e diretrizes de moderação (LGPD).

### Tela 05 — Dashboard
Tela inicial do usuário autenticado. Painel pessoal com métricas (casos ativos, evoluções na semana, grupos, endossos recebidos), cards "Continue de onde parou", feed de atividade dos grupos, gráfico de casos por especialidade, lista de grupos, próximas entregas acadêmicas e tópicos em alta. Funciona como hub central, agregando dados de todas as entidades.

### Tela 06 — Login
Ponto de entrada da plataforma. Layout em duas colunas: à esquerda, um painel atmosférico com identidade visual, citação acadêmica e métricas sociais da plataforma; à direita, o formulário de autenticação com suporte a SSO via Google Acadêmico. Conformidade explícita com a LGPD (Lei 13.709/2018).

---

## Decisões de design

### Paleta
- **Cream / Paper** (`#f5f1e8` / `#faf6ec`): fundo principal, tom editorial-acadêmico
- **Forest** (`#1f3a32`): cor primária, transmite seriedade clínica
- **Amber** (`#c87f3b`): cor de destaque para CTAs, links e acentos
- **Tons neutros** para texto e bordas, garantindo legibilidade

### Tipografia
- **Fraunces** (serif com variantes itálicas): títulos e elementos de destaque, dá peso editorial à interface
- **IBM Plex Sans** (sans-serif): corpo do texto, alta legibilidade em telas
- **IBM Plex Mono** (monoespaçada): valores numéricos, IDs, prontuários, códigos — reforça o tom técnico

### Padrões de UI
- Grid sutil de pontos no fundo (8% de opacidade) — referência ao papel quadriculado de prontuários
- Bordas finas e cantos com raio mínimo (2-3px) — estética editorial, não "app fofinho"
- Linha decorativa de ECG na tela de login — temática médica sem ser literal demais
- Sinais vitais e IDs sempre em fonte monoespaçada — convenção médica e técnica

---

## Tecnologias utilizadas no protótipo

- **HTML5** semântico
- **CSS3** com variáveis nativas (custom properties), sem pré-processadores
- **JavaScript vanilla** (sem frameworks) — apenas para a lógica de troca de telas
- **Google Fonts** (Fraunces, IBM Plex Sans, IBM Plex Mono)

Nenhuma biblioteca externa, nenhum build step. O projeto roda diretamente no navegador.

---

## Mapeamento com os models do banco

| Tela | Entidade principal | Campos visualizados |
|------|-------------------|---------------------|
| 01 | `CasoClinico` | Todos os campos da classe |
| 02 | `Evolucao` | `descricao_retorno`, `data_registro`, `is_publico`, autor (via `id_caso → autor`) |
| 03 | `GrupoEstudo` | `nome_grupo`, `descricao`, `codigo_acesso` + relationships `membros` e `casos` |
| 04 | `PostComunidade` | `score_relevancia`, `quantidade_endossos`, `upvotes`, `downvotes`, autor, caso vinculado |
| 05 | View agregada | Combina dados de todas as entidades anteriores |
| 06 | `Usuario` (entidade futura) | E-mail acadêmico + SSO institucional |

---

## Próximos passos (backlog identificado)

Pontos levantados durante a construção do protótipo que precisam ser tratados na implementação:

1. **Inconsistência de obrigatoriedade do autor** entre `CasoClinico` e `PostComunidade` — definir regra única.
2. **Redundância de campos de engajamento** em `PostComunidade` (upvotes/downvotes vs. quantidade_endossos) — escolher um modelo.
3. **Padronização de relationships** — substituir uso misto de `back_populates` e `backref` por `back_populates` em todos os models.
4. **Index em `especialidade`** de `CasoClinico` — campo de filtro pesado.
5. **Soft delete** (`deleted_at`) — não permitir exclusão definitiva de casos clínicos.
6. **Modelo `Usuario`** ainda não definido nas entregas anteriores.
7. **DPIA (Data Protection Impact Assessment)** para conformidade LGPD — dados de saúde são categoria sensível.

---

## Autoria

Protótipo desenvolvido pela equipe MedCase como parte da disciplina de Engenharia de Software.

