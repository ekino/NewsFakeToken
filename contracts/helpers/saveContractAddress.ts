import { outputFile } from 'fs-extra';

export default (name, address) =>
    outputFile(`${process.cwd()}/deployments/${name}.ts`, `export default "${address}";`);
