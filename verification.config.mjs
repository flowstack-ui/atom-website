const verification = {
  schemaVersion: 1,
  id: "atom-website",
  kind: "public-prerendered-next-website",
  publicPackageBaseline: {
    dependencies: {
      "@flowstack-ui/atom": "0.24.0",
      "@flowstack-ui/brick": "0.1.11",
    },
    devDependencies: {
      "@flowstack-ui/theme": "0.1.1",
    },
    provenance: "content/atom-source.json",
    llmOutputs: ["public/llms.txt", "public/llms-full.txt"],
  },
  commands: {
    focused: "check:focused",
    repository: "check:repository",
    release: "check:release",
    processCheck: "test:processes",
    contract: "verify:repository-contract",
  },
  servers: [
    {
      name: "website",
      developmentPort: 3002,
      testPort: 4002,
      configurationFiles: ["package.json", "playwright.config.ts"],
      strictPort: false,
    },
  ],
  browserConfigs: ["playwright.config.ts"],
  workflows: {
    ci: ".github/workflows/ci.yml",
    nightly: ".github/workflows/nightly.yml",
  },
  impact: {
    strategy: "conservative-repository",
    focusedPaths: ["content", "src", "scripts"],
    conservativePaths: ["package.json", "package-lock.json", "next.config.ts", "tsconfig.json"],
  },
  manual: ["physical mobile browsers", "theme repaint and browser chrome", "human responsive and accessibility judgment"],
};

export default verification;
