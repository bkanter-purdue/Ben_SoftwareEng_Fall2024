import chalk from 'chalk';
import { catchArgs } from './Processors/argProcessor';
import { ReadUrlFile } from './Input/Input';
import { buildReposFromUrls } from './Processors/urlProcessor';
import { mockUrls } from './TestUtils/constants';
import { repoQueryBuilder } from './Requests/QueryBuilders/repos';
import { BaseRepoQueryResponse } from './Types/ResponseTypes';
import { requestFromGQL } from './Requests/GitHub/gql';
import * as dotenv from 'dotenv';

/**
 * Things to change... our names for variables in the .env. There is a specification in the doc
 * For now..
 * GITHUB_PAT=<Personal access token>
 * GITHUB_API_URL=https://api.github.com/graphql
 */

// temporary filepath
const exampleFilepath = './src/Input/example_inFile.txt';
const contents = ReadUrlFile(exampleFilepath);
console.log(contents);
console.log(`🌟 Everything appears to be ${chalk.greenBright('Operational')}! 🌟`);
catchArgs();
dotenv.config();

const runner = async () => {
    const repos = await buildReposFromUrls<BaseRepoQueryResponse>(mockUrls); //using mock urls for now
    const query = repoQueryBuilder(repos); //add an array of fields here... see Request/QueryBuilders/fields.ts for examples
    const result = await requestFromGQL(query);
    console.log(result);
};

runner();
