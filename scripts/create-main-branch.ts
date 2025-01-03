import { Octokit } from '@octokit/rest';

const REPO = 'RishiStaticNEXTsite';
const OWNER = 'RishiCo-Canna';

async function createMainBranch() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN environment variable is required');
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  try {
    console.log('Starting branch creation process...');

    // First, check if we can access the repository
    const { data: repo } = await octokit.repos.get({
      owner: OWNER,
      repo: REPO
    });

    console.log('Repository access confirmed');

    // Get the default branch's latest commit SHA
    const { data: defaultBranch } = await octokit.repos.getBranch({
      owner: OWNER,
      repo: REPO,
      branch: repo.default_branch
    });

    // Create the main branch
    try {
      await octokit.git.createRef({
        owner: OWNER,
        repo: REPO,
        ref: 'refs/heads/main',
        sha: defaultBranch.commit.sha
      });
      console.log('Main branch created successfully');
    } catch (error: any) {
      if (error.status === 422) {
        console.log('Main branch already exists');
      } else {
        throw error;
      }
    }

    // Update default branch to main
    await octokit.repos.update({
      owner: OWNER,
      repo: REPO,
      default_branch: 'main'
    });

    console.log('Successfully set main as the default branch');
  } catch (error) {
    console.error('Error creating main branch:', error);
    throw error;
  }
}

createMainBranch().catch(console.error);
