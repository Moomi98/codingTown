interface mappingType {
  [key: string]: string;
}

interface whiteboardType {
  languages: Array<string>;
  language_mapping: mappingType;
  themes: Array<string>;
}

export const whiteboard: whiteboardType = {
  languages: [
    "C/C++",
    "C#",
    "CSS",
    "Dart",
    "Golang",
    "HTML",
    "Java",
    "Javascript",
    "Kotlin",
    "PHP",
    "Python",
    "Swift",
  ],
  language_mapping: {
    "C/C++": "c_cpp",
    "C#": "csharp",
    CSS: "css",
    Dart: "dart",
    Golang: "golang",
    HTML: "html",
    Java: "java",
    Javascript: "javascript",
    Kotlin: "kotlin",
    PHP: "php",
    Python: "python",
    Swift: "swift",
  },
  themes: ["monokai", "github", "twilight", "xcode", "terminal"],
};
