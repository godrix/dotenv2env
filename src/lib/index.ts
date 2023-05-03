import fs from 'fs';
import path from 'path'
import { spawn } from 'child_process'
import { argv } from 'yargs';

import chalk from 'chalk';

const log = console.log;

export async function run() {
  const response = await argv;

  if (!response._.length) {
    log(chalk.yellow.bold('No script was specified.'));
    log(chalk.dim('Please specify a script to run.'));
    log(chalk.dim('Example: dotenv2env start'));

    return
  }

  const runCommand = String(response._[0]);

  const appOptions = ['useFile', 'useVerbose', 'useYarn'];

  const filteredEntries = Object.entries(response).filter(([key]) => key !== '_' && key !== '$0');

  const aplicationArgs = Object.fromEntries(
    filteredEntries.filter(([key]) => appOptions.includes(key))
  ) as { [k: string]: string; }

  const otherOptionsArray = filteredEntries
    .filter(([key]) => !appOptions.includes(key))
    .map(([key, value]) => [`--${key}`, value])
    .filter(([key, value]) => value === true)
    .map(([key]) => key)
    .map((option) => String(option));

  const envFile = aplicationArgs.useFile ?? '.env';

  const verbose = aplicationArgs.useVerbose ?? false;
  
  const useYarn = aplicationArgs.useYarn ?? false;


  const envFilePath = path.join(process.cwd(), envFile);

  if (!fs.existsSync(envFilePath)) {
    log(chalk.red.bold('File not found.'));
    log(chalk.dim(`Could not find the file ${chalk.inverse(` ${envFile} `)}.`));
    log(chalk.dim('Please check if the path is correct and if the file exists.'));

    return
  }

  const envFileContent = fs.readFileSync(envFilePath, 'utf-8');
  const envLines = envFileContent.split('\n');

  const envVars = {} as { [k: string]: string; };

  for (let i = 0; i < envLines.length; i++) {
    const envLine = envLines[i].trim();
    if (envLine.length > 0 && envLine[0] !== '#') {
      const [envKey, envValue] = envLine.split('=');

      verbose && log(chalk.dim('SET ENV ') + chalk.magentaBright(`${envKey}=`) + chalk.whiteBright(envValue));
      envVars[envKey] = envValue;
    }
  }

  const packageManager = useYarn ? 'yarn' : 'npm';

  if (useYarn) {
    otherOptionsArray.unshift(runCommand);
  } else {
    otherOptionsArray.unshift('run', runCommand);
  }

  verbose && log(chalk.dim(`${packageManager} ${otherOptionsArray.join(' ')}`));

  const child = spawn(packageManager, otherOptionsArray, {
    env: {
      ...process.env,
      ...envVars,
    },
    stdio: 'inherit',
  });

  child.on('close', (code) => {
    if (code === 0) {
      log(chalk.green('Child process exited successfully.'));
    } else {
      log(chalk.red.bold(`Child process exited with code ${code}.`));
      log('This may indicate an error occurred during the script execution.');
      log('Please check your script and try again.');
    }
  });

}
