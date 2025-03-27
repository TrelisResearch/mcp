import { z } from 'zod';
import { githubRequest } from '../common/utils.js';

export const AddCollaboratorSchema = z.object({
  owner: z.string().describe("Repository owner (username or organization)"),
  repo: z.string().describe("Repository name"),
  username: z.string().describe("The GitHub username to add as a collaborator")
});

export const RemoveCollaboratorSchema = z.object({
  owner: z.string().describe("Repository owner (username or organization)"),
  repo: z.string().describe("Repository name"),
  username: z.string().describe("The GitHub username to remove as a collaborator")
});

export async function addCollaborator(params: z.infer<typeof AddCollaboratorSchema>) {
  const { owner, repo, username } = params;
  
  await githubRequest(
    `https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`,
    {
      method: 'PUT',
      body: {
        permission: 'pull' // Read-only access
      }
    }
  );
}

export async function removeCollaborator(params: z.infer<typeof RemoveCollaboratorSchema>) {
  const { owner, repo, username } = params;
  
  await githubRequest(
    `https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`,
    {
      method: 'DELETE'
    }
  );
} 