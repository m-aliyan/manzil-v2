# video/ — placeholder

Empty on purpose. Phase 3 builds the Manzil walkthrough video here using the
HyperFrames pipeline, after the interactive demo locks.

- Not part of the app build; ignored by ESLint and Prettier.
- Renders and caches (`video/renders/`, `video/*.mp4`, `video/.hyperframes/`)
  are git-ignored.
- Planned flow (mirrors the proven pipeline): Playwright captures the framed
  desktop demo → local TTS voiceover → a generated composition (paused GSAP root
  timeline) → render to MP4.

Do not add tooling here during Phase 1 or 2.
