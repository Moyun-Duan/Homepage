# Images Directory

This folder contains all image assets used in the personal homepage project.

## 📁 Directory Structure

```
images/
├── README.md           # This file
├── profile.jpg         # Personal profile picture (optional)
└── screenshots/        # Project screenshots (recommended)
    ├── homepage.png
    ├── forum.png
    └── project.png
```

---

## 🖼️ Image Guidelines

### Profile Picture (`profile.jpg`)

- **Purpose**: Displayed on the homepage header
- **Recommended Size**: 400x400 pixels (square)
- **Format**: JPG, PNG, or WebP
- **File Name**: `profile.jpg` (or update the path in `index.html`)
- **Fallback**: If no image is provided, a purple gradient placeholder (👤) will be shown

**How to Add:**
1. Place your profile picture in this folder
2. Rename it to `profile.jpg` (or update line 28 in `index.html`)
3. Refresh the page

---

### Screenshots (Optional but Recommended)

For better project presentation on GitHub, consider adding screenshots:

#### Recommended Screenshots:
1. **homepage.png** - Full homepage view
2. **forum.png** - Forum/message board interface
3. **project.png** - Project showcase page
4. **sqtp.png** - SQTP project detail page

#### Screenshot Guidelines:
- **Format**: PNG (preferred) or JPG
- **Size**: 1920x1080 or 1280x720 (16:9 ratio)
- **Quality**: High quality but optimized for web
- **Content**: Show the actual UI with some sample content

#### How to Use Screenshots in README:
```markdown
## 📸 Screenshots

### Homepage
![Homepage](images/screenshots/homepage.png)

### Project Page
![Projects](images/screenshots/project.png)

### Forum
![Forum](images/screenshots/forum.png)
```

---

## 🎨 Other Images

If you add more images (icons, backgrounds, etc.), please:
1. Use descriptive file names (e.g., `icon-github.svg`, `bg-hero.jpg`)
2. Optimize images for web (compress file size)
3. Use appropriate formats:
   - **Photos**: JPG or WebP
   - **Graphics/Icons**: PNG or SVG
   - **Animations**: GIF or WebP
4. Update this README with new image descriptions

---

## ⚡ Performance Tips

- **Compress images**: Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
- **Responsive images**: Consider providing multiple sizes for different screen resolutions
- **Lazy loading**: For pages with many images, consider adding `loading="lazy"` attribute
- **Modern formats**: Use WebP for better compression (with JPG/PNG fallbacks)

---

## 📝 Current Status

- [x] Profile picture placeholder ready
- [ ] Add actual profile picture
- [ ] Add project screenshots
- [ ] Optimize existing images
- [ ] Create favicon (optional)

---

## 📄 License

All images in this directory should follow the project's [Apache 2.0 License](../LICENSE) or be properly attributed if from external sources.
