import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * Fetch public repository data for a given GitHub username.
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} Array of repo objects
 */
export async function fetchGitHubRepos(username) {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username,
      sort: "updated",
      per_page: 100,
    });
    return data.map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
      language: repo.language,
      description: repo.description,
      forks: repo.forks_count,
      url: repo.html_url,
    }));
  } catch (error) {
    console.error("GitHub fetch error:", error);
    throw new Error("Failed to fetch GitHub repositories");
  }
}