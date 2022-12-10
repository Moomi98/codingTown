interface mappingType {
  [key: string]: string;
}

interface whiteboardType {
  languages: Array<string>;
  mapping: mappingType;
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
  mapping: {
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
};
