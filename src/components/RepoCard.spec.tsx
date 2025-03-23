// RepoCard.spec.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RepoCard from "./RepoCard";
import { MemoryRouter } from "react-router-dom";

describe("RepoCard", () => {
  const sampleRepo = {
    id: 1,
    name: "SampleRepo",
    full_name: "user/SampleRepo",
    description: "This is a sample repository.",
    html_url: "https://github.com/user/SampleRepo",
    stargazers_count: 100,
    forks_count: 20,
    open_issues_count: 5,
    watchers_count: 50,
    created_at: "2021-01-01T00:00:00Z",
    updated_at: "2021-06-01T00:00:00Z",
    pushed_at: "2021-06-02T00:00:00Z",
    homepage: "https://example.com",
    size: 123,
    default_branch: "main",
    owner: {
      login: "user",
      id: 1,
      avatar_url: "https://example.com/avatar.png",
      html_url: "https://github.com/user",
    },
    archived: false,
    fork: false,
    mirror: false,
    is_template: false,
    visibility: "public",
    license: {
      key: "mit",
      name: "MIT License",
      spdx_id: "MIT",
      url: "https://api.github.com/licenses/mit",
      node_id: "MDc6TGljZW5zZW1pdA==",
    },
    language: "JavaScript",
  };

  const defaultProps = {
    repo: sampleRepo,
    isFavorite: false,
    onToggleFavorite: jest.fn(),
    onLanguageClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders repository details correctly", () => {
    render(
      <MemoryRouter>
        <RepoCard {...defaultProps} />
      </MemoryRouter>
    );

    // Check that the outer link is rendered with correct aria-label.
    const linkElement = screen.getByRole("link", {
      name: /view details for samplerepo/i,
    });
    expect(linkElement).toBeInTheDocument();
    // Check that repository name and description are rendered.
    expect(screen.getByText("SampleRepo")).toBeInTheDocument();
    expect(screen.getByText("This is a sample repository.")).toBeInTheDocument();
    // Check that visibility text is rendered.
    expect(screen.getByText("public")).toBeInTheDocument();
    // Check that language badge is rendered.
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    // Verify that stats are rendered using aria-labels.
    expect(screen.getByLabelText("100 stars")).toBeInTheDocument();
    expect(screen.getByLabelText("20 forks")).toBeInTheDocument();
    expect(screen.getByLabelText("50 watchers")).toBeInTheDocument();
  });

  it("calls onToggleFavorite when favorite button is clicked", () => {
    render(
      <MemoryRouter>
        <RepoCard {...defaultProps} />
      </MemoryRouter>
    );

    // Find the favorite button by its aria-label.
    const favoriteButton = screen.getByRole("button", {
      name: /add samplerepo to favorites/i,
    });
    fireEvent.click(favoriteButton);
    expect(defaultProps.onToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it("calls onLanguageClick when the language badge is clicked", () => {
    render(
      <MemoryRouter>
        <RepoCard {...defaultProps} />
      </MemoryRouter>
    );

    // The language badge is rendered with the text "JavaScript".
    const languageBadge = screen.getByText("JavaScript");
    fireEvent.click(languageBadge);
    expect(defaultProps.onLanguageClick).toHaveBeenCalledWith("JavaScript");
  });

  it("displays fallback text when description is missing", () => {
    const repoWithoutDescription = { ...sampleRepo, description: null };
    render(
      <MemoryRouter>
        <RepoCard {...defaultProps} repo={repoWithoutDescription} />
      </MemoryRouter>
    );

    expect(screen.getByText("No description provided")).toBeInTheDocument();
  });
});
