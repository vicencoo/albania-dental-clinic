# Images

All photos are optimized WebP (quality 70, long edge ≤ 1400 px); `next/image` serves
smaller responsive sizes automatically. Keep new files light: export WebP, ≤ 1600 px,
aim for < 150 KB per photo.

| Folder        | Contents                                                        |
| ------------- | --------------------------------------------------------------- |
| `brand/`      | Logo mark and full logo (PNG with transparency)                 |
| `flags/`      | Language-switcher flags (64 px)                                  |
| `clinic/`     | Exterior, reception, waiting room, treatment rooms, CBCT, X-ray |
| `lab/`        | Milling unit, printer/furnace, CAD designs, technicians at work |
| `team/`       | Dr. Donela Dede (portrait + at her desk)                        |
| `../videos/`  | Lab clips (H.264, no audio) with WebP posters                   |

## Still needed

- **results/** — before/after photos per case: `<slug>-before.webp` and `<slug>-after.webp`,
  same framing and lighting, **only with signed written patient consent**
  (add the case in `src/content/results.ts` with `consentConfirmed: true`).
- **apartments/** — photos of each patient apartment: `<slug>-01.webp`, `<slug>-02.webp`, …
- **team/** — portraits of the other team members, named `<slug>.webp`.
