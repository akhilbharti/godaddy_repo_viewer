
import { ApiError } from './types';
import { RepositorySchema, ValidRepository } from './schemas';

const API_URL = 'https://api.github.com';
const ORG_NAME = 'godaddy';

/**
 * Fetches all repositories for a specific organization
 */
export async function fetchRepositories(): Promise<ValidRepository[]> {
  const response = await fetch(`${API_URL}/orgs/${ORG_NAME}/repos?per_page=150&type=all`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      message: errorData.message || 'Failed to fetch repositories',
      status: response.status
    } as ApiError;
  }

  const data = await response.json();
  
  // Use Zod's safeParse to handle validation errors gracefully
  return data.map((repo: any) => {
    const result = RepositorySchema.safeParse(repo);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation error for repo:", repo.name, result.error);
      // Provide fallback values for invalid data
      return RepositorySchema.parse({
        ...repo,
        license: repo.license ? {
          ...repo.license,
          url: repo.license.url || null
        } : null
      });
    }
  });
}

/**
 * Fetches a specific repository by name
 */
export async function fetchRepositoryByName(repoName: string): Promise<ValidRepository> {
  const response = await fetch(`${API_URL}/repos/${ORG_NAME}/${repoName}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      message: errorData.message || `Failed to fetch repository: ${repoName}`,
      status: response.status
    } as ApiError;
  }

  const data = await response.json();
  
  // Handle the license field specifically
  try {
    return RepositorySchema.parse(data);
  } catch (error) {
    // If parsing fails, try to fix the license field
    if (data.license) {
      data.license.url = data.license.url || null;
    }
    return RepositorySchema.parse(data);
  }
}
