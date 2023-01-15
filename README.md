# gpt3-demo

A collection of interactive GPT-3 demos in a NextJS+Mantine web app.

<p align="center">
<img src="https://user-images.githubusercontent.com/220799/189034554-2670ee49-03be-4df3-bd19-14ef28496246.png"
   width="600" alt="Screenshot of npm app with GPT-3 demos" />
</p>

## Bootstrap

Run the webserver locally to interact with the demo

### Node 18.* recommended

```sh
node --version
v18.7.0
```

Other versions may work but your mileage may vary. Installable here: https://nodejs.org/en/download/current/

### Open AI token required

Create one here: [https://openai.com/api/](https://openai.com/api/)

```sh
cp .env.local.example .env.local
```

Declare your API token in `.env.local`

### Codex note

Codex is in private beta and requires approval from Open AI. See details here: https://openai.com/blog/openai-codex/

### Starting the server

```sh
npm install
npm run dev
```

If you are seeing HTTP Code 429 errors, make sure your OpenAI account is in good standing (trial could be expired).

## Pre-commit setup
```sh
python3 -m pip install pre-commit
pre-commit --install
```
