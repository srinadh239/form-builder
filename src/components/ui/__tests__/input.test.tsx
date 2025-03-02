import '@testing-library/jest-dom'
import {jest} from '@jest/globals'
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../input";

describe("Input Component", () => {
  test("renders input with placeholder", () => {
    render(<Input type="text" value="" onChange={() => {}} placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  test("updates value on change", () => {
    const handleChange = jest.fn();
    render(<Input type="text" value="" onChange={handleChange} placeholder="Enter text" />);
    
    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.change(inputElement, { target: { value: "Hello" } });
    expect(handleChange).toHaveBeenCalled();
  });
});