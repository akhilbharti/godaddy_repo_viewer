// LoadingState.spec.tsx
import React from "react";
import { render } from "@testing-library/react";
import LoadingState from "./LoadingState";

describe("LoadingState component", () => {
  test("renders list loading state with the correct number of items", () => {
    const count = 5;
    const { container } = render(<LoadingState type="list" count={count} />);
    
    // The list variant renders a grid container with the class "animate-fade-in"
    const gridContainer = container.querySelector(".animate-fade-in");
    expect(gridContainer).toBeInTheDocument();
    
    // The grid container should have exactly 'count' child elements.
    // Each child represents a loading item.
    expect(gridContainer?.children.length).toBe(count);
  });

  test("renders detail loading state correctly", () => {
    const { container } = render(<LoadingState type="detail" />);
    
    // The detail variant renders a container with max-width and centered alignment.
    const detailContainer = container.querySelector(".max-w-3xl.mx-auto");
    expect(detailContainer).toBeInTheDocument();
    
    // Verify that within the detail container, the badge group is rendered.
    const badgeGroup = detailContainer?.querySelector(".flex.flex-wrap.gap-3.mb-6");
    expect(badgeGroup).toBeInTheDocument();
    
    // Also verify that a container for the large content skeleton is present.
    const contentGroup = detailContainer?.querySelector(".space-y-4");
    expect(contentGroup).toBeInTheDocument();
  });
});
