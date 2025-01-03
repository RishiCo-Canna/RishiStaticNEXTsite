import { Octokit } from '@octokit/rest';
import fs from 'fs/promises';
import path from 'path';

const REPO = 'RishiStaticNEXTsite';
const OWNER = 'RishiCo-Canna';
const BRANCH = 'main';

async function pushToGithub() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN environment variable is required');
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  try {
    console.log('Starting GitHub update process...');

    // List of files to update
    const filesToUpdate = [
      'public/admin/index.html',
      'src/components/CmsComponent.tsx',
      'pages/api/auth/[...nextauth].ts',
      'next.config.js',
      'public/admin/config.yml'
    ];

    // Get the latest commit SHA
    const { data: ref } = await octokit.git.getRef({
      owner: OWNER,
      repo: REPO,
      ref: `heads/${BRANCH}`
    });

    const latestCommitSha = ref.object.sha;
    console.log(`Latest commit SHA: ${latestCommitSha}`);

    // Update each file
    for (const filePath of filesToUpdate) {
      try {
        const fileContent = await fs.readFile(filePath, 'utf8');

        // Get the current file's blob SHA if it exists
        try {
          const { data: currentFile } = await octokit.repos.getContent({
            owner: OWNER,
            repo: REPO,
            path: filePath,
            ref: BRANCH
          });

          console.log(`Updating ${filePath}...`);

          await octokit.repos.createOrUpdateFileContents({
            owner: OWNER,
            repo: REPO,
            path: filePath,
            message: `fix: update Decap CMS configuration for private repository access\n\nUpdated file: ${filePath}`,
            content: Buffer.from(fileContent).toString('base64'),
            sha: Array.isArray(currentFile) ? undefined : currentFile.sha,
            branch: BRANCH
          });
        } catch (error: any) {
          if (error.status === 404) {
            // File doesn't exist yet, create it
            console.log(`Creating new file ${filePath}...`);
            await octokit.repos.createOrUpdateFileContents({
              owner: OWNER,
              repo: REPO,
              path: filePath,
              message: `feat: add ${filePath} for Decap CMS`,
              content: Buffer.from(fileContent).toString('base64'),
              branch: BRANCH
            });
          } else {
            throw error;
          }
        }
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
        throw error;
      }
    }

    console.log('Successfully updated repository!');
  } catch (error) {
    console.error('Error updating GitHub:', error);
    throw error;
  }
}

pushToGithub().catch(console.error);