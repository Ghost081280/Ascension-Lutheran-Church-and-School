# Content Management System for Ascension Lutheran Church

## Overview

This site uses a **content-driven architecture** where all text, schedules, announcements, and other content is stored in a separate `content/content.js` file. This makes it incredibly easy to update the website without touching any code.

## File Structure

```
/
├── content/
│   └── content.js          # ALL SITE CONTENT HERE
├── css/
│   ├── main.css           # Styles and layout
│   └── components.css     # Component styles
├── js/
│   └── app.js            # Presentation logic only
├── images/               # Image assets
├── index.html           # HTML structure
└── README.md           # This file
```

## How to Update Content

### 🎯 **To update ANY site content, only edit `content/content.js`**

### Common Updates:

#### 1. **Change Service Times**
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

#### 2. **Update Contact Information**
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

#### 3. **Add Announcements**
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

#### 4. **Update Pastor Information**
```javascript
// In content/content.js, find:
pastor: {
  name: "Rev. James Gier",
  title: "Senior Pastor",
  bio: [
    "First paragraph of bio...",         // ← Edit bio paragraphs
    "Second paragraph of bio..."
  ],
  image: "./images/Pastor.png"          // ← Change image path
}
```

#### 5. **Change Page Content**
```javascript
// In content/content.js, find the pages section:
pages: {
  home: {
    hero: {
      title: "Welcome to Ascension Lutheran Church",  // ← Edit titles
      subtitle: "Join our family in worshipping..."   // ← Edit subtitles
    }
  }
}
```

#### 6. **Update Office Hours**
```javascript
// In content/content.js, find:
contact: {
  officeHours: {
    "Monday - Thursday": "9:00 AM - 3:00 PM",    // ← Edit hours
    "Friday": "9:00 AM - 12:00 PM",
    "Saturday - Sunday": "By Appointment"
  }
}
```

## Content Types

### 📅 **Schedules & Times**
- Worship service times
- Office hours
- Special events
- Class schedules

### 👥 **People & Contact Info**
- Pastor information
- Staff details
- Contact information
- Office details

### 📝 **Page Content**
- Hero sections
- About text
- Mission statements
- Program descriptions

### 📢 **Announcements**
- Current announcements
- Special events
- Important notices

### 🖼️ **Images & Media**
- Image paths
- Placeholder images
- Social media links

## Advanced Content Management

### Adding New Pages

1. **Add navigation item:**
```javascript
navigation: [
  // existing items...
  { id: "newpage", label: "New Page", url: "#newpage" }
]
```

2. **Add page content:**
```javascript
pages: {
  // existing pages...
  newpage: {
    hero: {
      title: "New Page Title",
      subtitle: "Page description"
    },
    // Add more sections as needed
  }
}
```

3. **Add page generator in app.js** (requires code changes)

### Content Validation

The content file includes validation to ensure:
- Required fields are present
- Links are properly formatted
- Image paths are correct
- Content structure is maintained

## Benefits of This System

✅ **Easy Updates**: Change content without touching code  
✅ **Non-Technical Friendly**: Anyone can update text content  
✅ **Version Control**: Track all content changes  
✅ **Consistency**: Structured content prevents formatting issues  
✅ **Maintainable**: Clear separation of content and presentation  
✅ **Scalable**: Easy to add new content types  

## Deployment

After updating `content/content.js`:

1. **Test locally** - Open `index.html` in a browser
2. **Commit changes** - Git commit the content file
3. **Deploy** - Push to GitHub Pages or your hosting service

The site will automatically reflect your content changes!

## Troubleshooting

### Content Not Updating?
- Check browser cache (hard refresh: Ctrl+F5)
- Verify `content.js` syntax (no missing commas/brackets)
- Check browser console for errors

### Images Not Loading?
- Verify image paths in `content.js`
- Ensure images exist in `images/` folder
- Check image file names match exactly

### JavaScript Errors?
- Validate JSON syntax in `content.js`
- Check for missing commas or quotes
- Use browser developer tools to debug

## Support

For technical issues or questions about updating content:
1. Check the browser console for errors
2. Validate your content.js syntax
3. Test changes locally before deploying

---

**Remember: All content updates happen in `content/content.js` - you never need to edit HTML, CSS, or JavaScript files for content changes!**
