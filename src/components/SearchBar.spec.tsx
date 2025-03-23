// SearchBar.spec.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import SearchBar from "./SearchBar";


describe("SearchBar", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  
  test("calls onSearchChange after debounce delay when typing in the search input", async () => {
    const onSearchChangeMock = jest.fn();
    const onLanguageChangeMock = jest.fn();
  
    render(
      <SearchBar
        onSearchChange={onSearchChangeMock}
        onLanguageChange={onLanguageChangeMock}
        languages={["JavaScript", "TypeScript"]}
      />
    );
  
    const searchInput = screen.getByPlaceholderText("Search repositories...");
    // Wrap typing in act
    await act(async () => {
      userEvent.type(searchInput, "react");
    });
  
    // Advance timers: 200ms should not trigger the callback.
    jest.advanceTimersByTime(200);
    expect(onSearchChangeMock).not.toHaveBeenCalled();
  
    // Advance by another 100ms (total 300ms) so the debounced callback fires.
    jest.advanceTimersByTime(100);
    await waitFor(() => {
      expect(onSearchChangeMock).toHaveBeenCalledWith("react");
    });
  });
});
