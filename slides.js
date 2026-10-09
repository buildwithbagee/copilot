// Slide content only — rendering lives in app.js (separation of concerns).
// Order mirrors the original "GitHub Copilot App.pptx" deck exactly.
// Shape: { section, title, lead?, links?: [url | {label, url}], prompts?: [{label?, text}], images?: [{src, alt}], layout?,
//          card?: {heading, items[]}, flow?: {heading, steps: [{label, tone}], note?},
//          qr?: {src, alt, caption?} }
// card items and flow notes support `code` and **bold**.

const img = (file, alt) => ({ src: `images/${file}`, alt });

window.SECTIONS = [
  "Welcome",
  "Step 0 · Setup",
  "Step 1 · Build",
  "Step 2 · Refine & Test",
  "Step 3 · Ship with GitHub",
  "Step 4 · Extend",
];

window.SLIDES = [
  // ── Welcome ──────────────────────────────────────────────
  {
    section: 0, layout: "hero", title: "GitHub Dev Days",
    links: [{ label: "Follow along with these slides:", url: "https://buildwithbagee.github.io/copilot/" }],
    qr: { src: "images/qr-slides.svg", alt: "QR code linking to https://buildwithbagee.github.io/copilot/", caption: "Scan to open on your phone" },
  },
  {
    section: 0, layout: "hero", title: "First Steps with the GitHub Copilot App",
    lead: "Workshop",
    links: [{
      label: "This is the original tutorial:",
      url: "https://github-samples.github.io/copilot-workshops/first-steps/copilot-app/",
    }],
  },
  {
    section: 0, layout: "overview", title: "What we\u2019re building",
    lead: "A Space Quiz. It\u2019s tiny on purpose, so we can focus on the workflow, not the code.",
    card: {
      heading: "The app",
      items: [
        "10 space questions",
        "Progress bar + score counter",
        "Green for correct \u00b7 red shake for wrong",
        "Results screen with emoji reaction",
        "Single `index.html` with zero dependencies",
      ],
    },
    flow: {
      heading: "The real goal: the full dev loop",
      steps: [
        { label: "Prompt", tone: "purple" },
        { label: "Test", tone: "purple" },
        { label: "Publish", tone: "blue" },
        { label: "Issue", tone: "green" },
        { label: "Plan", tone: "green" },
        { label: "PR + review", tone: "green" },
        { label: "Automate", tone: "pink" },
      ],
      note: "Same loop you\u2019d use on a real codebase, with the agent doing the typing and **you directing and verifying**.",
    },
  },

  // ── Step 0 · Setup ───────────────────────────────────────
  {
    section: 1, layout: "divider", title: "Create a GitHub Account", lead: "Step 0",
  },
  {
    section: 1, title: "Go to GitHub",
    links: ["https://github.com/"],
    images: [img("image4.png", "GitHub home page with the Sign up button")],
  },
  {
    section: 1, title: "Sign Up for GitHub",
    lead: "Continue with Google or Apple, or fill in email, password, username and country.",
    images: [img("image32.png", "GitHub sign-up form with email, password, username and country fields")],
  },
  {
    section: 1, title: "Copilot Plan Subscription",
    links: ["https://github.com/features/copilot/plans"],
    images: [img("image3.png", "GitHub Copilot plans and pricing page")],
  },
  {
    section: 1, title: "Download the GitHub Copilot App",
    links: ["https://github.com/features/ai/github-app"],
    images: [img("image23.png", "GitHub Copilot App download page")],
  },
  {
    section: 1, title: "Sign In to GitHub",
    lead: "Launch the app and choose “Sign in to GitHub”.",
    images: [img("image18.png", "Copilot App welcome screen with Sign in to GitHub and Sign in to GitHub Enterprise Cloud buttons")],
  },
  {
    section: 1, title: "Authorize the Device",
    lead: "Enter the code shown in the app on the device login page.",
    links: ["https://github.com/login/device"],
    images: [img("image5.png", "GitHub device activation page asking for a one-time code")],
  },
  {
    section: 1, title: "Explore the Copilot App",
    images: [img("image1.png", "GitHub Copilot App main window overview")],
  },

  // ── Step 1 · Build ───────────────────────────────────────
  {
    section: 2, title: "Create a New Folder: space-quiz",
    lead: "Create an empty folder anywhere on your laptop.",
    prompts: [
      { label: "Windows", text: "C:\\any\\path\\in\\your\\laptop\\space-quiz" },
      { label: "Linux / Mac", text: "/any/path/in/your/laptop/space-quiz" },
    ],
  },
  {
    section: 2, title: "Select the Folder in the Copilot App",
    images: [
      img("image12.png", "Step 1: open-folder option in the Copilot App"),
      img("image6.png", "Step 2: choosing the space-quiz folder"),
    ],
  },
  {
    section: 2, title: "Prompt: Build the Space Quiz",
    prompts: [{
      text: "Create a space exploration quiz with 10 questions, a progress bar, score counter, and colorful animated feedback (green for correct, red shake for wrong). Show a results screen with emoji reaction at the end. Center in a narrow column. Single index.html, no server/dependencies. Polished, sans-serif, 14–16px body, prefers-color-scheme. Open in the integrated browser.",
    }],
    images: [img("image21.png", "The prompt typed into the Copilot App chat box")],
  },
  {
    section: 2, title: "Review the Result",
    images: [img("image11.png", "Generated space quiz running in the integrated browser")],
  },
  {
    section: 2, title: "Open Panels from the Command Palette",
    lead: "View → Command Palette (⌘K) → Open in panel… → pick Terminal, Browser, Files, Side chat or Insights.",
    images: [
      img("image8.png", "Step 1: View menu with Command Palette highlighted"),
      img("image14.png", "Step 2: Command palette with Open in panel highlighted"),
      img("image13.png", "Step 3: Add to panel list showing Terminal, Browser, Files, Side chat and Insights"),
    ],
  },
  {
    section: 2, title: "Browse the Generated Code",
    images: [img("image19.png", "index.html open in the built-in editor with the file tree on the right")],
  },
  {
    section: 2, title: "Open the Code in Visual Studio Code",
    images: [img("image7.png", "Open in VS Code button in the Copilot App toolbar")],
  },

  // ── Step 2 · Refine & Test ───────────────────────────────
  {
    section: 3, title: "Refine a Selected Element",
    lead: "Select an element in the integrated browser, then ask Copilot to restyle just that part.",
    prompts: [{
      text: "Make the selected element feel more like a mission-control display. Keep it accessible and preserve the existing light and dark themes.",
    }],
    images: [
      img("image10.png", "Step 1: element picker in the integrated browser"),
      img("image26.png", "Step 2: question heading selected in the quiz"),
      img("image15.png", "Selected element attached to the chat prompt"),
    ],
  },
  {
    section: 3, title: "Before and After",
    images: [
      img("image22.png", "Before: plain question heading in the quiz card"),
      img("image29.png", "After: question heading styled as a Mission Control incoming signal panel"),
    ],
  },
  {
    section: 3, title: "Explore the Session Details",
    images: [img("image28.png", "Session details panel showing steps and file edits")],
  },
  {
    section: 3, title: "Test Prompt",
    prompts: [{
      text: "Run a browser-level smoke test for the quiz in the integrated browser. Check keyboard navigation, score updates, correct and incorrect feedback, and the results screen. Fix any failures, then report what passed.",
    }],
    images: [img("image16.png", "Copilot running a browser smoke test on the quiz")],
  },
  {
    section: 3, title: "Initialize Copilot Instructions",
    lead: "Initialize Copilot instructions and agentic features for this repository.",
    prompts: [{ text: "/init" }],
    images: [img("image17.png", "The /init slash command in the chat box")],
  },
  {
    section: 3, title: "Review copilot-instructions.md",
    lead: "/init generates .github/copilot-instructions.md describing the project, validation and architecture.",
    images: [img("image46.png", "Generated copilot-instructions.md with Project and validation and Architecture sections")],
  },

  // ── Step 3 · Ship with GitHub ────────────────────────────
  {
    section: 4, title: "Publish the Project",
    prompts: [{
      text: "Initialize this folder as a Git repository, create an initial commit, and create a new public GitHub repository named space-quiz in my account. Push the current branch and set it as the default branch. Refresh the project within this app so the GitHub project is linked.",
    }],
    images: [img("image25.png", "Copilot publishing the space-quiz repository to GitHub")],
  },
  {
    section: 4, title: "Review and Raise Issues",
    prompts: [{
      text: "Review the space quiz and suggest three focused feature ideas that could each be completed in a short session. Create a separate GitHub issue for each idea with a clear title, user-focused description, and acceptance criteria. Do not implement them yet.",
    }],
  },
  {
    section: 4, title: "Implement an Issue",
    prompts: [{
      text: "Implement this issue completely. Keep the single-file, dependency-free design, test the behavior in the integrated browser, and summarize the changes when finished.",
    }],
    images: [
      img("image20.png", "Step 1: issue list in the Copilot App"),
      img("image33.png", "Step 2: starting a session from the selected issue"),
      img("image30.png", "Step 3: implementation prompt attached to the issue"),
    ],
  },
  {
    section: 4, title: "View the Diff",
    images: [
      img("image24.png", "Session list showing the number key shortcuts session with 1 file changed"),
      img("image45.png", "Panel menu with Changes at the top, above Terminal, Browser, Files, Side chat and Insights"),
      img("image31.png", "Chat box with a Changes +20 chip"),
      img("image34.png", "Diff of index.html with added lines highlighted in green"),
    ],
  },
  {
    section: 4, title: "Plan Mode",
    lead: "Switch to Plan mode to investigate before any code changes.",
    prompts: [{
      text: "Plan how to implement this issue. Investigate the existing quiz, list the files you would change, call out risks to accessibility and the single-file constraint, and stop before making any edits.",
    }],
    images: [img("image35.png", "Plan mode output listing files, risks and steps")],
  },
  {
    section: 4, title: "Create a Pull Request",
    images: [
      img("image27.png", "Create pull request button"),
      img("image42.png", "Pull request draft with title and description"),
    ],
  },
  {
    section: 4, title: "Agent Merge",
    images: [
      img("image37.png", "Merge option in the Copilot App"),
      img("image38.png", "Agent merging the pull request"),
    ],
  },
  {
    section: 4, title: "Pull Request Merged",
    lead: "PR #4 “Add number-key shortcuts for answers” merged into main and closes issue #1.",
    images: [img("image48.png", "Merged pull request #4 with description, commit and merge timeline")],
  },

  // ── Step 4 · Extend ──────────────────────────────────────
  {
    section: 5, title: "Automations",
    lead: "Create an automation that runs on a schedule with this prompt.",
    prompts: [{
      text: "Review the latest GitHub issues created and still open in the last week, and provide a summary of the issues in a table, with title, description and date.",
    }],
    images: [
      img("image40.png", "New automation form"),
      img("image43.png", "Automation schedule settings"),
    ],
  },
  {
    section: 5, title: "Automation Running",
    images: [img("image44.png", "Your automations list showing Weekly Issue Triage running locally")],
  },
  {
    section: 5, title: "Explore a Canvas",
    images: [img("image36.png", "Canvas tab in the Copilot App marketplace")],
  },
  {
    section: 5, title: "Install the Accessibility Kanban Canvas",
    links: ["https://awesome-copilot.github.com/extension/accessibility-kanban/"],
    images: [
      img("image36.png", "Step 1: Canvas marketplace"),
      img("image41.png", "Step 2: Install from gist/URL dialog"),
    ],
  },
  {
    section: 5, title: "Canvas Installed",
    images: [img("image39.png", "Installed canvases: Editor, Browser, Terminal and Repository Issues Kanban")],
  },
  {
    section: 5, title: "Repository Issues Kanban",
    lead: "Your GitHub issues as a Backlog → Plan → Ready → Implement → Done board.",
    images: [img("image47.png", "Issues Kanban for builderbagee/space-quiz with two issues in Backlog")],
  },
];
