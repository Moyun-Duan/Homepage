# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Add project screenshots to README
- Add more interactive features
- Improve mobile responsiveness

---

## [2.0.0] - 2025-10-28

### Added
- 📁 **CSS Modularization**: Refactored monolithic `public.css` into 7 modular files
  - `global.css` - Global styles and resets
  - `layout.css` - Navigation, header, footer layouts
  - `components.css` - Reusable UI components
  - `forum.css` - Forum-specific styles
  - `project.css` - Project page styles
  - `animations.css` - Animation keyframes
  - `responsive.css` - Mobile-responsive design
- 📝 Documentation improvements
  - Added `CSS_REFACTOR.md` - CSS refactoring summary
  - Added `CUSTOMIZATION_GUIDE.md` - Content customization guide
  - Added `css/README.md` - CSS module usage guide
  - Added `.gitignore` - Git ignore rules
  - Added `CHANGELOG.md` - Version history tracking
  - Added `images/README.md` - Image asset guide
- ✨ New features
  - Forum message persistence with localStorage
  - Nickname management system
  - Dynamic content loading for SQTP project

### Changed
- 🎨 Improved CSS organization and maintainability
- 📱 Enhanced mobile responsiveness
- ⚡ Optimized page load performance with selective CSS loading

### Fixed
- CSS specificity conflicts
- Mobile layout issues
- Animation performance improvements

---

## [1.0.0] - 2025-01-15

### Added
- 🎉 Initial release
- Basic homepage with navigation
- Person information page
- Project showcase page
- Forum/message board page
- SQTP project detail page with sidebar navigation
- LocalStorage-based message persistence
- Responsive design for mobile devices

### Features
- **Pages**: Home, Person, Book, Project, Forum, SQTP
- **JavaScript Modules**: 
  - `forum.js` - Forum functionality
  - `sqtp.js` - SQTP page navigation
- **SQTP Content Modules**:
  - `members.html` - Team members
  - `settings.html` - Project settings
  - `results.html` - Research results

---

## Version History Overview

- **v2.0.0** - CSS Modularization & Documentation (2025-10-28)
- **v1.0.0** - Initial Release (2025-01-15)

---

### Labels

- `Added` - New features
- `Changed` - Changes in existing functionality
- `Deprecated` - Soon-to-be removed features
- `Removed` - Removed features
- `Fixed` - Bug fixes
- `Security` - Security improvements
