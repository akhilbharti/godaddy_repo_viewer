import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "./Layout";
import { MemoryRouter } from "react-router-dom";

describe("Layout component", () => {
  it("renders header, main and footer with default props", () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Child Content</div>
        </Layout>
      </MemoryRouter>
    );
    
    // Check that the header (role banner) is rendered and displays the default logo/title.
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("GoDaddy Repos")).toBeInTheDocument();
    
    // Check that the main area renders children.
    expect(screen.getByText("Child Content")).toBeInTheDocument();
    
    // Check that the footer (role contentinfo) is rendered.
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByText(/GitHub Repository Viewer – Created with ShadCN and React/i)
    ).toBeInTheDocument();
    
    // Check that the "GoDaddy GitHub" link is present.
    expect(
      screen.getByRole("link", { name: /GoDaddy GitHub/i })
    ).toBeInTheDocument();
  });

  it("renders the back button when showBackButton is true", () => {
    render(
      <MemoryRouter>
        <Layout showBackButton>
          <div>Child Content</div>
        </Layout>
      </MemoryRouter>
    );
    
    // When showBackButton is true, a Link with aria-label "Back to repository list" should render.
    expect(
      screen.getByRole("link", { name: /Back to repository list/i })
    ).toBeInTheDocument();
    
    // Also, the text "Back" should be visible.
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("renders the title when provided", () => {
    const title = "Test Title";
    render(
      <MemoryRouter>
        <Layout title={title}>
          <div>Child Content</div>
        </Layout>
      </MemoryRouter>
    );
    
    // Check that the provided title is rendered.
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
