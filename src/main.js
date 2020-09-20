import App from "./App.svelte";
import projects from "./projects.json";

const app = new App({
  target: document.body,
  props: {
    name: "Manas Sharma",
    projects: projects,
  },
  hydrate: true,
});

export default app;
