# dotenv2env

dotenv2env is a command line tool that loads environment variables from a .env file and runs a script with those variables as part of the environment. It supports both npm and yarn package managers.

A good use for this library is in conjunction with the ```babel-plugin-transform-inline-environment-variables```, which enables you to inline environment variables directly into your code during the build process.

Here is an example of how to use dotenv2env with babel-plugin-transform-inline-environment-variables and expo

```bash
npx dotenv2env start
```

## Usage
To use dotenv2env, run the following command:

```bash
npx dotenv2env <script-name> [options]
```
The following options are available:

--useFile <file-name>: Use the specified file as the source of environment variables. Defaults to .env.

--useVerbose: Enable verbose logging.

--useYarn: Use yarn as the package manager instead of npm.

In addition to these options, the user can pass other flags that will be forwarded to the script execution.

## Example

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

>Please note that the --useFile, --useVerbose, and --useYarn parameters are reserved for the library, and all other flags that are passed will be forwarded to the script execution.

## License
dotenv2env is licensed under the MIT License.

## Show your support

Give a ⭐️ if this project helped you!

## :memo: License

dotenv2env is licensed under the [MIT License](LICENSE.md).

---

Made with ♥ by Godrix :wave: [Get in touch!](https://www.linkedin.com/in/carlosgodri/)