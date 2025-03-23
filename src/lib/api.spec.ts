import { fetchRepositories } from "./api";

const validRepo = {
  id: 1,
  name: "Repo1",
  full_name: "user/Repo1",
  description: "A test repository",
  html_url: "https://github.com/user/Repo1",
  stargazers_count: 10,
  forks_count: 5,
  open_issues_count: 2,
  watchers_count: 100,
  created_at: "2020-01-01T00:00:00Z",
  updated_at: "2020-06-01T00:00:00Z",
  pushed_at: "2020-06-01T00:00:00Z",
  homepage: "https://repo1.example.com",
  size: 1234,
  default_branch: "main",
  owner: { 
    login: "user", 
    id: 123, 
    avatar_url: "https://example.com/avatar.png", 
    html_url: "https://github.com/user" 
  },
  archived: false,
  visibility: "public",
  license: { 
    key: "mit", 
    name: "MIT License", 
    spdx_id: "MIT", 
    url: "https://api.github.com/licenses/mit", 
    node_id: "MDc6TGljZW5zZW1pdA==" 
  },
  language: "JavaScript"
};

const incompleteRepo = {
  id: 1,
  name: "Repo1",
  language: "JavaScript"
};

if (!global.fetch) {
  (global as any).fetch = jest.fn();
}

describe("fetchRepositories", () => {
  beforeEach(() => {
    jest.spyOn(global as any, "fetch");
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  it("fetches repositories successfully and returns valid data", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => [validRepo],
    });
    
    const result = await fetchRepositories();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(1);
    expect(result[0].full_name).toBe("user/Repo1");
  });
  
  
  it("throws an error when fetch rejects (network error)", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
    await expect(fetchRepositories()).rejects.toThrow("Network error");
  });
});
