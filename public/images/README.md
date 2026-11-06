# Photos the clinic must supply

Format: JPG/WebP, landscape ≥ 2400 px wide (portraits ≥ 1600 px tall), sRGB, no watermarks.
File names below match the paths already referenced in `src/content/*`.

## clinic/
- Exterior of the building and entrance
- Reception / waiting area
- Treatment rooms (2–3 angles)
- Surgery room
- `tech-3d-ct.jpg` — 3D CT (CBCT) machine
- `tech-intraoral-scanner.jpg` — intraoral scanner in use
- `tech-digital-x-ray.jpg` — digital X-ray
- `tech-guided-surgery.jpg` — surgical guide / guided surgery setup
- `featured-same-day.jpg`, `featured-clinic.jpg` — mega-menu feature images
- Short video tour of the clinic (MP4) + poster frame

## team/
- `dr-donela-dede.jpg` — professional portrait (+ 2–3 at-work photos)
- One portrait per team member, named `<slug>.jpg` (slug = name in kebab-case)
- Group photo of the team

## treatments/
- One image per treatment, named `<slug>.jpg`:
  single-implant, multiple-implants, all-on-4, all-on-6, replacing-old-bridges,
  bone-grafting-sinus-lift, 3d-ct-scan, digital-impressions, guided-surgery,
  digital-smile-design, zirconia-crowns, veneers, bridges, teeth-whitening,
  endodontics, oral-surgery, hygiene, children

## lab/
- `cad-cam.jpg` — CAD/CAM milling machine
- Technicians at work, design software on screen, finished zirconia work

## apartments/
- Per apartment: `<slug>-01.jpg`, `<slug>-02.jpg`, … (living room, bedroom, kitchen, bathroom, view, building exterior)
- `featured-apartments.jpg` — mega-menu feature image

## results/
- Per case: `<case-slug>-before.jpg` and `<case-slug>-after.jpg`, same framing and lighting
- **Only with signed written patient consent** (set `consentConfirmed: true` in `src/content/results.ts`)

## journal/
- Cover image per article: `<slug>.jpg` (1600×900)
