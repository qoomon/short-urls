import fs from 'node:fs/promises';
import YAML from 'yaml'

const outputDir = './_site';
await fs.mkdir(outputDir, { recursive: true });

const redirectsYaml = await fs.readFile('./redirects.yaml', 'utf-8');
const redirects = YAML.parse(redirectsYaml)

const redirectHtmlTemplate = await fs.readFile('./redirect.template.html', 'utf-8');

console.log('Redirects:');
for (const redirect of redirects) {
    console.log(`  ${redirect.alias} => ${redirect.url}`);
    const redirectHtml = redirectHtmlTemplate.replaceAll('${{url}}', redirect.url);
    await fs.writeFile(`${outputDir}/${redirect.alias}.html`, redirectHtml);
}
