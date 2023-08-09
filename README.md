# CSIS 3380 Semester Project

An AI-powered news analysis.

## Getting Started

1. Install packages using Yarn:

```
yarn install
```

2. Create a `.env` file inside `/server` using the values within the `.env.example` file.
3. Replace the `.env` values with your values.
4. Run the following commands at the root of the project:

```
yarn dev
```

This command will spin up both the server & the client.

### Note:

The `openai` module of this project uses the `gpt-4` model from OpenAI. If you can't access GPT-4 API, you can edit the `openai.ts` file and replace the `gpt-4` value with `gpt-3.5-turbo`.
