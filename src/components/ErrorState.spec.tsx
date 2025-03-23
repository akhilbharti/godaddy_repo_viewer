import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorState from "./ErrorState";

describe("ErrorState component", () => {
  it("renders correctly with message and without retry button if onRetry is not provided", () => {
    const errorMessage = "An unexpected error occurred.";
    render(<ErrorState message={errorMessage} />);
    
    // Check that the title is displayed.
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    // Check that the error message is displayed.
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    // Ensure the "Try again" button is not present.
    expect(screen.queryByRole("button", { name: /try again/i })).toBeNull();
  });

  it("renders the retry button and calls onRetry when clicked", () => {
    const errorMessage = "Failed to load data.";
    const onRetryMock = jest.fn();
    render(<ErrorState message={errorMessage} onRetry={onRetryMock} />);
    
    // Check that the title and error message are displayed.
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    
    // Find the "Try again" button.
    const retryButton = screen.getByRole("button", { name: /try again/i });
    expect(retryButton).toBeInTheDocument();
    
    // Click the retry button and ensure onRetry is called.
    fireEvent.click(retryButton);
    expect(onRetryMock).toHaveBeenCalledTimes(1);
  });
});
