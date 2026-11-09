# Dwiz Sharma — Portfolio

A scroll-driven portfolio and CV for Dwiz Sharma, B.Tech student at NIET. The site includes seven project stories with dedicated detail views, a 3D Earth from OceanEmbed, project-made UI scenes, encrypted-text reveal, liquid-glass surfaces, a terminal easter egg, a logic game, and an email-based meeting request flow.

## Run locally

```bash
cd ~/Desktop/dwiz-portfolio
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000). Stop the server with `Ctrl+C`.

## Deploy

The repository includes `vercel.json` with the production build and output settings. Connect this folder or its Git repository to Vercel and it will build with `npm run build` and publish the `build/` directory.

## Resume downloads

The CV page links to two provided DOCX files copied from Downloads:

- `public/resumes/Dwiz_Sharma_Resume_Amazon.docx` — Amazon resume, modified 27 Oct 2026.
- `public/resumes/Dwiz_Sharma_Resume.docx` — latest non-Amazon resume, modified 19 Oct 2026.

Use **CV** in the navigation to download either file, or use **Print / Save PDF** for the project-focused portfolio CV.

## Project assets and animation references

OceanEmbed uses its own Earth model, texture, Draco decoders, architecture diagrams, and depth-profile graphic. The headshot is `public/assets/profile-picture.jpeg`; NIET's official logo is loaded from the college's public logo page.

Scroll reveal, 3D globe interaction, liquid-glass surfaces, and encrypted text are implemented in the local React app with inspiration from [Animmaster Lib](https://animmasterlib.dev/), [Aceternity UI](https://ui.aceternity.com/components/liquid-glass), and [Skiper UI](https://skiper-ui.com/components). Free-component credit links are included in the site footer.
