# ReadIndo

Live demo: https://readindo.candys.page

See the story and all the features in this post: https://blog.candys.page/learn-indonesian-with-readindo

ReadIndo is a tool to help you learn Indonesian through reading text and videos of your choice!

## Running your own ReadIndo

### Prerequisites

- Auth0 account - Check [this article](https://auth0.com/docs/quickstart/webapp/nextjs/01-login#configure-the-sdk) on how to fill out the Auth0 environment variables

- MongoDB - The demo is currently using the free plan here on [MongoDB](https://www.mongodb.com/)

- Rapid API account - [Microsoft Translator Text](https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/) for the translations

Please fill in the `.env.example` file and save it as `.env.local` to run in development environments.

### Step 0: Setup MongoDB

- Create new database `readindo`
- Create a collection `words`


### Step 1: Install dependencies

```bash
npm install
# or
yarn
```

### Step 2: Start the development server

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

### Step 3: Check out ReadIndo

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

ReadIndo is an open source project so you're more than welcome to contribute ideas, report issues or send in pull requests!
