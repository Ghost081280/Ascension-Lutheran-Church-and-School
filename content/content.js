// Content Management System for Ascension Lutheran Church
// Edit this file to update all site content
// Version: 2025.01.15

const SITE_CONTENT = {
  // Site Information
  site: {
    name: "Ascension Lutheran Church & School",
    shortName: "Ascension Lutheran",
    tagline: "Church & School",
    location: "Fort Wayne, Indiana",
    description: "Welcome to Ascension Evangelical Lutheran Church in Fort Wayne, Indiana. Join our family in worshipping and serving our glorious God.",
    founded: "1977"
  },

  // Contact Information
  contact: {
    address: {
      street: "8811 St. Joe Road",
      city: "Fort Wayne",
      state: "IN",
      zip: "46835"
    },
    phone: "(260) 486-2226",
    email: "office@alcsfw.org",
    officeHours: {
      "Monday - Thursday": "9:00 AM - 3:00 PM",
      "Friday": "9:00 AM - 12:00 PM",
      "Saturday - Sunday": "By Appointment"
    }
  },

  // Social Media Links
  social: {
    facebook: "https://www.facebook.com/alcsfw/",
    youtube: "https://www.youtube.com/c/alcsfw"
  },

  // Worship Schedule
  worship: {
    sunday: {
      services: ["8:00 AM", "10:45 AM"],
      adultClass: "9:30 AM",
      sundaySchool: "9:30 AM"
    },
    special: {
      lentAdvent: "Wednesdays 6:30 PM"
    }
  },

  // Pastor Information
  pastor: {
    name: "Rev. James Gier",
    title: "Senior Pastor",
    bio: [
      "Pastor Gier was a licensed architect prior to entering the Holy Ministry and is a graduate of Concordia Theological Seminary in Fort Wayne. He brings a unique perspective to ministry, combining his background in design with his passion for God's Word.",
      "Pastor Gier has been faithfully serving our congregation, providing pastoral care, preaching God's Word, and administering the sacraments with dedication and love."
    ],
    image: "./images/Pastor.png"
  },

  // Navigation Menu
  navigation: [
    { id: "home", label: "Home", url: "#home" },
    { id: "church", label: "Church", url: "#church" },
    { id: "family", label: "Family", url: "#family" },
    { id: "school", label: "School", url: "#school" },
    { id: "worship", label: "Worship", url: "#worship" },
    { id: "contact", label: "Contact", url: "#contact" }
  ],

  // Page Content
  pages: {
    home: {
      hero: {
        title: "Welcome to Ascension Lutheran Church",
        subtitle: "Join our family in worshipping and serving our glorious God in Fort Wayne, Indiana",
        backgroundImage: "./images/ascension-lutheran-school-fort-wayne-in-primaryphoto.jpg",
        buttons: [
          { text: "Join Us for Worship", style: "primary", page: "worship" },
          { text: "Learn More", style: "secondary", page: "church" }
        ]
      },
      sections: {
        worshipTimes: {
          title: "Divine Worship",
          items: [
            { label: "Sunday Morning Services", value: "8:00 AM & 10:45 AM" },
            { label: "Adult Discipleship Class", value: "9:30 AM" },
            { label: "Children's Sunday School", value: "9:30 AM" }
          ]
        },
        ministry: {
          title: "Church • Family • School",
          subtitle: "At Ascension, new life finds its expression in a three-fold fellowship and ministry where you will encounter and know the Lord Jesus Christ for your forgiveness, life, and salvation!",
          cards: [
            {
              title: "Church",
              image: "./images/ascension-lutheran-school-fort-wayne-in-primaryphoto.jpg",
              text: "Ascension follows the teaching of the Holy Scripture, firmly accepting the Bible as God's inerrant Word, teaching and confessing the truth proclaimed by God through His Son, Jesus Christ.",
              buttonText: "Learn About Our Church →",
              buttonPage: "church"
            },
            {
              title: "Family",
              image: "./images/families.jpg",
              text: "Ascension is a place for families with many opportunities to study God's Word together. We offer programs for all ages to grow in faith.",
              buttonText: "Explore Family Programs →",
              buttonPage: "family"
            },
            {
              title: "School",
              image: "./images/Ascension-Lutheran-School-5l01p65peb8ccskgkkck08s4s-1122.webp",
              text: "Providing traditional, Christian education to students in Preschool through 8th grade with academic excellence within our Christ-centered Lutheran worldview.",
              buttonText: "Learn About Our School →",
              buttonPage: "school"
            }
          ]
        },
        pastor: {
          title: "Meet Our Pastor",
          subtitle: "Shepherding our congregation with wisdom and faith"
        }
      },
      verse: {
        text: "I am the way, and the truth, and the life. No one comes to the Father except through me.",
        reference: "John 14:6 (ESV)"
      }
    },

    church: {
      hero: {
        title: "Our Church",
        subtitle: "Faithful to the Gospel of Christ since 1977"
      },
      stewardshipQuote: {
        verses: [
          "Luke 15:2 – \"And the Pharisees and the scribes grumbled, saying, 'This man receives sinners and eats with them.'\"",
          "Thanks be to God: Jesus receives us sinners! What the Pharisees can't understand, we praise with all our being. We give thanks for the grace of God, and we live by that grace."
        ],
        reference: "LCMS Stewardship Bulletin Sentences"
      },
      beliefs: {
        title: "What We Believe",
        subtitle: "As Evangelical Lutherans, we are loyal to the Gospel of Christ",
        content: [
          "Ascension Lutheran Church and School follows the teaching of the Holy Scripture, firmly accepting the Bible as God's inerrant Word, teaching and confessing the truth proclaimed by God through His Son, Jesus Christ, our Lord and Savior. Ascension is a member of the Lutheran Church Missouri Synod.",
          "We are guided in our interpretation of the Scriptures by the Lutheran Confessions as contained in the Book of Concord, to which we unconditionally subscribe."
        ],
        points: [
          "Holy Scripture reveals one God in three persons: Father, Son and Holy Spirit. The three persons are equal in power, authority, and majesty.",
          "God the Father is the Eternal Father of God the Son. God the Father has made us and all creatures. He provides for all by giving us what we need for this body and life.",
          "Because of our inherited sin we need to be saved from what we are and what our actions deserve. Salvation is found in our Savior, Jesus Christ.",
          "By His death on the cross and resurrection He paid the penalty of all sin and guilt."
        ]
      },
      verse: {
        text: "Jesus Christ Is the Great Shepherd of His Sheep.",
        reference: "Luke 15:4"
      }
    },

    family: {
      hero: {
        title: "Family Ministry",
        subtitle: "Ascension is a place for families with many opportunities to grow in faith together"
      },
      programs: {
        title: "Family Programs",
        content: [
          "Ascension Lutheran Church is a place for families. Ascension offers many opportunities to study God's Word together.",
          "As the school year approaches, remember that Jesus is going with you and your family there, too."
        ]
      },
      learnByHeart: {
        title: "Learn by Heart",
        subtitle: "Weekly Bible and Catechism study and devotion for the whole family",
        description: "Learn by Heart is updated weekly and includes:",
        items: [
          "Bible Verse of the Week",
          "Catechism Memory Work",
          "Hymn of the Week",
          "Psalm Meditation of the Week",
          "Daily Bible/Catechism Meditations of the Week"
        ],
        note: "The Hymn of the Week will be sung in Chapel and is encouraged for use in family daily devotions."
      },
      verse: {
        text: "Train up a child in the way he should go; even when he is old he will not depart from it.",
        reference: "Proverbs 22:6 (ESV)"
      }
    },

    school: {
      hero: {
        title: "Ascension Lutheran School",
        subtitle: "Providing traditional, Christian education from Preschool through 8th grade",
        buttons: [
          { text: "Call for Information", style: "primary", link: "tel:+12604862226" },
          { text: "Email Us", style: "secondary", link: "mailto:office@alcsfw.org" }
        ]
      },
      mission: {
        title: "Excellence in Christian Education",
        subtitle: "We proclaim the Gospel to the next generation and provide a quality education so children can grow spiritually, academically, socially, emotionally, and physically",
        content: [
          "Ascension Lutheran Church has established this school to proclaim the Gospel to the next generation and to provide a quality education so children can grow spiritually, academically, socially, emotionally, and physically.",
          "Ascension Lutheran School will continue to provide its students with an education that emphasizes academic excellence within our Christ-centered Lutheran worldview, so that its graduates are effective thinkers, readers, writers, and problem-solvers who become the next generation of leaders in their home, church, and community."
        ]
      },
      verse: {
        text: "But in your hearts honor Christ the Lord as holy, always being prepared to make a defense to anyone who asks you for a reason for the hope that is in you; yet do it with gentleness and respect.",
        reference: "1 Peter 3:15 (ESV)"
      }
    },

    worship: {
      hero: {
        title: "Worship With Us",
        subtitle: "Traditional Lutheran worship services every Sunday"
      },
      schedule: {
        title: "Sunday Worship Schedule",
        items: [
          { label: "Divine Service", value: "8:00 AM & 10:45 AM" },
          { label: "Holy Communion", value: "Offered at both services" },
          { label: "Adult Discipleship Class", value: "9:30 AM" },
          { label: "Children's Sunday School", value: "9:30 AM" },
          { label: "Lent & Advent Services", value: "Wednesdays 6:30 PM" }
        ]
      },
      online: {
        title: "Online Worship",
        subtitle: "Can't make it in person? Join us online",
        content: [
          "Sunday morning worship services and Adult Discipleship classes are available for viewing on our YouTube channel.",
          "Don't miss the Order of Service links to follow along in the bulletin during online worship."
        ],
        button: {
          text: "Watch on YouTube",
          link: "https://www.youtube.com/c/alcsfw"
        }
      },
      verse: {
        text: "Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another—and all the more as you see the Day approaching.",
        reference: "Hebrews 10:25 (NIV)"
      }
    },

    contact: {
      hero: {
        title: "Contact Us",
        subtitle: "We'd love to hear from you and answer any questions"
      },
      sections: {
        office: {
          title: "Church Office",
          items: [
            {
              label: "Address",
              content: "8811 St. Joe Road<br>Fort Wayne, IN 46835"
            },
            {
              label: "Phone",
              content: "<a href=\"tel:+12604862226\">(260) 486-2226</a>"
            },
            {
              label: "Email",
              content: "<a href=\"mailto:office@alcsfw.org\">office@alcsfw.org</a>"
            }
          ]
        },
        pastor: {
          title: "Pastor Information",
          content: [
            "<strong>Rev. James Gier</strong><br>Senior Pastor",
            "Pastor Gier was a licensed architect prior to entering the Holy Ministry and is a graduate of Concordia Theological Seminary in Fort Wayne."
          ]
        }
      },
      officeHours: {
        title: "Office Hours"
      },
      verse: {
        text: "Come to me, all you who are weary and burdened, and I will give you rest.",
        reference: "Matthew 11:28 (NIV)"
      }
    }
  },

  // Global Elements
  loading: {
    title: "Ascension Lutheran Church",
    subtitle: "Church & School",
    location: "Fort Wayne, Indiana",
    status: "Loading...",
    verse: {
      text: "I am the way, and the truth, and the life.",
      reference: "John 14:6"
    }
  },

  footer: {
    sections: [
      {
        title: "Contact Information",
        content: [
          "8811 St. Joe Road<br>Fort Wayne, IN 46835",
          "Phone: <a href=\"tel:+12604862226\">(260) 486-2226</a>",
          "Email: <a href=\"mailto:office@alcsfw.org\">office@alcsfw.org</a>"
        ]
      },
      {
        title: "Worship Times",
        content: [
          "Sunday Divine Worship:<br>8:00 AM & 10:45 AM",
          "Sunday School & Adult Class:<br>9:30 AM"
        ]
      },
      {
        title: "Connect With Us",
        social: true
      }
    ],
    bottom: [
      "&copy; 2025 Ascension Lutheran Church and School. All rights reserved.",
      "Visit us at 8811 St. Joe Road, Fort Wayne, IN 46835"
    ]
  },

  // Announcements (easily editable)
  announcements: {
    current: [
      {
        title: "Sunday Worship Services",
        message: "Join us for worship at 8:00 AM or 10:45 AM every Sunday",
        type: "info",
        active: true
      }
    ]
  },

  // Images and Assets
  images: {
    logo: "./images/Color Luther Rose - 72 dpi.jpg",
    pastor: "./images/Pastor.png",
    church: "./images/ascension-lutheran-school-fort-wayne-in-primaryphoto.jpg",
    families: "./images/families.jpg",
    school: "./images/Ascension-Lutheran-School-5l01p65peb8ccskgkkck08s4s-1122.webp",
    // Placeholder images for fallbacks
    placeholders: {
      church: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y3ZmFmYyIvPiA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzcxODA5NiI+Q2h1cmNoIEJ1aWxkaW5nPC90ZXh0Pjwvc3ZnPg==",
      families: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y3ZmFmYyIvPiA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzcxODA5NiI+Q2h1cmNoIEZhbWlsaWVzPC90ZXh0Pjwvc3ZnPg==",
      school: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y3ZmFmYyIvPiA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzcxODA5NiI+THV0aGVyYW4gU2Nob29sPC90ZXh0Pjwvc3ZnPg==",
      pastor: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y3ZmFmYyIvPiA8Y2lyY2xlIGN4PSI1MCUiIGN5PSIzNSUiIHI9IjIwJSIgZmlsbD0iI2EwYWVjMCIvPiA8ZWxsaXBzZSBjeD0iNTAlIiBjeT0iNzAlIiByeD0iMzAlIiByeT0iMjAlIiBmaWxsPSIjYTBhZWMwIi8+IDx0ZXh0IHg9IjUwJSIgeT0iOTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM3MTgwOTYiPlJldi4gSmFtZXMgR2llcjwvdGV4dD48L3N2Zz4="
    }
  },

  // External Links
  external: {
    donate: "https://secure.myvanco.com/L-YTGK/home"
  }
};

// Make content available globally
if (typeof window !== 'undefined') {
  window.SITE_CONTENT = SITE_CONTENT;
}

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONTENT;
}
