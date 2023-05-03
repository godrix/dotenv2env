# dotenv2env

dotenv2env is a command line tool that loads environment variables from a .env file and runs a script with those variables as part of the environment. It supports both npm and yarn package managers.

Usage
To use dotenv2env, run the following command:

```bash
npx dotenv2env <script-name> [options]
```
The following options are available:

--useFile <file-name>: Use the specified file as the source of environment variables. Defaults to .env.

--useVerbose: Enable verbose logging.

--useYarn: Use yarn as the package manager instead of npm.

Example

To run a script named start with environment variables from a .env file using npm, run the following command:

```bash
npx dotenv2env start
```

To run the same script using yarn instead of npm, run the following command:

```bash
npx dotenv2env start --useYarn
```

To use a different file name for the environment variables, run the following command:

```bash
npx dotenv2env start --useFile env.prod
```

License
dotenv2env is licensed under the MIT License.