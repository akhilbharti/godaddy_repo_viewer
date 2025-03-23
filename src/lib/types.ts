
import { ValidRepository } from './schemas';

// Re-export the Repository type from the Zod schema
export type Repository = ValidRepository;

export interface ApiError {
  message: string;
  status?: number;
}

export type LanguageColor = {
  [key: string]: string;
};

// Common language colors for GitHub
export const languageColors: LanguageColor = {
  "JavaScript": "#f1e05a",
  "TypeScript": "#3178c6",
  "HTML": "#e34c26",
  "CSS": "#563d7c",
  "Python": "#3572A5",
  "Java": "#b07219",
  "Go": "#00ADD8",
  "Ruby": "#701516",
  "PHP": "#4F5D95",
  "C#": "#178600",
  "C++": "#f34b7d",
  "C": "#555555",
  "Shell": "#89e051",
  "Swift": "#ffac45",
  "Kotlin": "#A97BFF",
  "Rust": "#dea584",
  "Dart": "#00B4AB",
  "Scala": "#c22d40",
  "Objective-C": "#438eff",
  "unknown": "#9e9e9e"
};
