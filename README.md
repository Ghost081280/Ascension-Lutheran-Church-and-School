# Ascension Lutheran Church Website
## Developer Guide & Documentation

> **📋 Quick Start:** To update website content, edit `content/content.js` only. No coding knowledge required for content updates!

---

## 🏛️ Project Overview

This is the development codebase for the Ascension Lutheran Church & School website in Fort Wayne, Indiana. Built as a Progressive Web App (PWA) with a content-driven architecture that enables simple and safe updates.

### ✨ Key Features
- **📱 Mobile App Experience** - Can be installed on phones/computers
- **🔄 Offline Functionality** - Works without internet connection
- **📝 Easy Content Management** - Update content without touching code
- **🎨 Professional Design** - Modern, accessible, and responsive
- **⚡ Fast Loading** - Optimized performance with caching
- **♿ Accessibility First** - Screen reader friendly, keyboard navigation

---

## 📁 Project Structure

```
/
├── content/
│   ├── README.md           # Content management guide
│   └── content.js          # 🎯 ALL WEBSITE CONTENT HERE
├── css/
│   ├── main.css           # Main styles and layout
│   ├── components.css     # UI component styles
│   ├── loading.css        # Loading screen styles
│   └── pwa.css           # PWA install prompt styles
├── js/
│   ├── app.js            # Main application logic
│   ├── components.js     # Reusable UI components
│   └── navigation.js     # Navigation functionality
├── images/               # Image assets
├── index.html           # Main HTML file
├── manifest.json        # PWA configuration
├── offline.html         # Offline fallback page
└── sw.js               # Service worker for caching
```

---

## 🚀 Getting Started

### For Content Updates (Non-Technical)

**⚠️ IMPORTANT: Only edit `content/content.js` for content changes!**

1. **Open** `content/content.js` in any text editor
2. **Find** the section you want to update
3. **Edit** the text between quotes
4. **Save** the file
5. **Refresh** the website to see changes

### For Development Setup

1. **Clone/Download** the project files
2. **Open** `index.html` in a web browser, or
3. **Serve** with a local web server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using Live Server (VS Code extension)
   Right-click index.html → "Open with Live Server"
   ```

---

## 📝 Content Management

### Quick Content Updates

All website content is stored in `content/content.js`. Here are common update scenarios:

#### 🕐 Update Service Times
```javascript
// In content/content.js, find:
worship: {
  sunday: {
    services: ["8:00 AM", "10:45 AM"],  // ← Edit these times
    adultClass: "9:30 AM",              // ← Edit this time
    sundaySchool: "9:30 AM"             // ← Edit this time
  }
}
```

#### 📞 Update Contact Information
```javascript
// In content/content.js, find:
contact: {
  phone: "(260) 486-2226",              // ← Edit phone
  email: "office@alcsfw.org",           // ← Edit email
  address: {
    street: "8811 St. Joe Road",        // ← Edit address
    city: "Fort Wayne",
    state: "IN",
    zip: "46835"
  }
}
```

#### 📢 Add Announcements
```javascript
// In content/content.js, find:
announcements: {
  current: [
    {
      title: "Sunday Worship Services",
      message: "Join us for worship at 8:00 AM or 10:45 AM every Sunday",
      type: "info",
      active: true                      // ← Set to false to hide
    },
    // Add new announcements here:
    {
      title: "New Announcement",
      message: "Your announcement text here",
      type: "info",
      active: true
    }
  ]
}
```

#### 👨‍💼 Update Staff Information
```javascript
// In content/content.js, find:
staff: {
  seniorPastor: {
    name: "Rev. James Dale Gier Jr.",
    title: "Senior Pastor",
    bio: [
      "First paragraph of bio...",         // ← Edit bio paragraphs
      "Second paragraph of bio..."
    ],
    image: "./images/Pastor.png"          // ← Change image path
  }
}
```

### 📖 Detailed Content Guide

See `content/README.md` for comprehensive content management instructions.

---

## 🛠️ Technical Architecture

### Technology Stack
- **Frontend:** Vanilla JavaScript (ES6+), CSS3, HTML5
- **PWA:** Service Worker, Web App Manifest
- **Fonts:** Google Fonts (Inter, Playfair Display)
- **Icons:** Unicode symbols and Luther Rose logo
- **Hosting:** Any static web host (GitHub Pages, Netlify, etc.)

### Key Technical Features

#### 📱 Progressive Web App
- **Installable** on mobile devices and desktops
- **Offline support** with cached content
- **App-like experience** when installed
- **Push notification ready** (basic setup included)

#### 🎨 Responsive Design
- **Mobile-first** approach
- **Professional navigation** that adapts to screen size
- **Touch-friendly** interface with proper tap targets
- **Optimized images** with lazy loading

#### ♿ Accessibility
- **WCAG compliant** with proper ARIA labels
- **Keyboard navigation** support
- **Screen reader** compatible
- **Focus management** for interactive elements
- **Skip links** for easy navigation

#### ⚡ Performance
- **Lazy loading** for images
- **Service worker caching** for offline functionality
- **Optimized fonts** with preload hints
- **Compressed assets** for fast loading

---

## 🔧 Development Workflows

### Content Updates (Recommended)
1. Edit `content/content.js`
2. Test locally by opening `index.html`
3. Deploy to hosting service

### Code Changes (Advanced)
1. **CSS Changes:** Edit files in `css/` folder
2. **JavaScript Changes:** Edit files in `js/` folder
3. **HTML Changes:** Edit `index.html` (rarely needed)
4. **PWA Settings:** Edit `manifest.json` or `sw.js`

### Adding New Images
1. **Add image files** to `images/` folder
2. **Update image paths** in `content/content.js`
3. **Test loading** on different devices

### Testing Checklist
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile devices (phones and tablets)
- [ ] PWA installation on mobile
- [ ] Offline functionality
- [ ] Accessibility with screen reader
- [ ] Loading performance

---

## 🚀 Deployment

### Quick Deployment Options

#### GitHub Pages (Free)
1. **Push code** to GitHub repository
2. **Enable Pages** in repository settings
3. **Select source** as main branch
4. **Access site** at `https://username.github.io/repo-name`

#### Netlify (Free)
1. **Drag and drop** project folder to Netlify
2. **Connect** GitHub repository for auto-deploys
3. **Custom domain** support available

#### Traditional Web Hosting
1. **Upload all files** via FTP/File Manager
2. **Ensure** `index.html` is in root directory
3. **Test PWA features** with HTTPS

### Deployment Checklist
- [ ] All images load correctly
- [ ] Contact information is up-to-date
- [ ] Service times are accurate
- [ ] PWA install prompts work
- [ ] Offline page loads
- [ ] Mobile experience is smooth

---

## 📊 Performance Monitoring

### Built-in Performance Features
- **Service Worker** caches assets for faster loading
- **Lazy loading** delays image loading until needed
- **Optimized fonts** with display swap
- **Compressed images** with WebP fallbacks

### Monitoring Tools
- **Google PageSpeed Insights:** Test loading performance
- **Chrome DevTools:** Debug and test locally
- **Lighthouse:** PWA and accessibility auditing
- **Browser Console:** Check for JavaScript errors

---

## 🔒 Security & Best Practices

### Security Features
- **No sensitive data** in client-side code
- **HTTPS required** for PWA features
- **Content Security Policy** headers recommended
- **Regular updates** of external dependencies

### Best Practices
- **Test changes** locally before deployment
- **Backup files** before major updates
- **Validate content** structure when editing
- **Monitor site** for broken images or links
- **Keep content** current and accurate

---

## 🆘 Troubleshooting

### Common Issues

#### Content Not Updating?
- **Hard refresh:** Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
- **Check syntax:** Ensure no missing commas or quotes in `content.js`
- **Browser cache:** Try incognito/private browsing mode

#### Images Not Loading?
- **Check file paths** in `content.js`
- **Verify files exist** in `images/` folder
- **Case sensitivity** matters for file names

#### PWA Not Installing?
- **Requires HTTPS** (except localhost)
- **Check manifest.json** for proper configuration
- **Service worker** must be registered successfully

#### Mobile Menu Not Working?
- **Check JavaScript** console for errors
- **Ensure** `js/navigation.js` is loaded
- **Test touch events** on actual mobile device

### Getting Help
1. **Check browser console** for error messages
2. **Validate JSON syntax** in content.js
3. **Test on different devices** and browsers
4. **Refer to** `content/README.md` for content guidance

---

## 📚 Additional Resources

### Documentation
- **Content Management:** See `content/README.md`
- **PWA Features:** Check `manifest.json` and `sw.js`
- **Styling Guide:** Review CSS files for customization
- **Component Library:** Explore `js/components.js`

### External Links
- **Google Fonts:** [fonts.google.com](https://fonts.google.com)
- **PWA Documentation:** [web.dev/progressive-web-apps](https://web.dev/progressive-web-apps/)
- **Accessibility Guidelines:** [webaim.org](https://webaim.org)
- **Church Website Best Practices:** Various online resources

### Church-Specific Features
- **Luther Rose Logo** integration
- **LCMS branding** considerations
- **Family ministry** content management
- **School information** sections
- **Worship service** scheduling

---

## 🎯 Quick Reference

### Most Common Tasks

| Task | File to Edit | Section |
|------|-------------|---------|
| Change worship times | `content/content.js` | `worship.sunday.services` |
| Update phone number | `content/content.js` | `contact.phone` |
| Add announcement | `content/content.js` | `announcements.current` |
| Change pastor info | `content/content.js` | `staff.seniorPastor` |
| Update office hours | `content/content.js` | `contact.officeHours` |
| Modify page content | `content/content.js` | `pages.[pageName]` |

### Emergency Contacts
- **Website Issues:** Check browser console first
- **Content Problems:** Refer to `content/README.md`
- **Technical Support:** Review this README and troubleshooting section

---

## 🏛️ About This Project

This website was built specifically for **Ascension Lutheran Church & School** in Fort Wayne, Indiana. It combines modern web technologies with a simple content management approach, making it easy for church staff to maintain while providing a professional experience for visitors.

The site reflects the church's mission: *"To seek, make, and mature disciples for God's eternal kingdom through preaching, baptizing, teaching, and communing."*

**God's blessings on your ministry work! 🙏**

---

*Last updated: January 2025*
*Version: 2025.01.15*
