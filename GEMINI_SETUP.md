# Como Configurar a API do Gemini

## Passo 1: Adicionar sua chave API

Abra o arquivo `.env.local` na raiz do projeto e substitua `your_api_key_here` pela sua chave real:

```
NEXT_PUBLIC_GEMINI_API_KEY=SUA_CHAVE_AQUI
```

## Passo 2: Reiniciar o servidor

Pare o servidor de desenvolvimento (Ctrl+C) e inicie novamente:

```bash
npm run dev
```

## Como Funciona

### Gerador de Dietas
- Usa a API do Gemini para gerar dietas personalizadas
- Parametros: objetivo do paciente e calorias alvo
- Se a API falhar, usa dados mockados como fallback

### Analise de Dieta
- Usa a API do Gemini para analisar textos de dietas
- Fornece feedback nutricional detalhado
- Se a API falhar, usa resposta mockada como fallback

## Seguranca

A chave da API esta configurada como `NEXT_PUBLIC_` para funcionar no cliente.
Para producao, considere criar uma API route no Next.js para proteger a chave.

## Testando

1. Acesse `/diet-generator`
2. Configure os parametros
3. Clique em "Gerar Dieta com IA"
4. A IA real do Gemini vai criar uma dieta personalizada!

## Limites Gratuitos

- 15 requisicoes por minuto
- Suficiente para desenvolvimento e demonstracao
