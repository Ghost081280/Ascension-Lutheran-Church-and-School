// Content Management System for Ascension Lutheran Church
// Edit this file to update all site content
// Version: 2025.01.15 - Enhanced with Real Website Content

const SITE_CONTENT = {
  // Site Information
  site: {
    name: "Ascension Lutheran Church & School",
    shortName: "Ascension Lutheran",
    tagline: "Church & School",
    location: "Fort Wayne, Indiana",
    description: "Welcome to Ascension Evangelical Lutheran Church in Fort Wayne, Indiana. We invite your family to join ours in worshipping and serving our glorious God.",
    founded: "1977",
    lcmsDistrict: "Indiana District (26) V-Circuit",
    membershipStats: {
      averageWeeklyAttendance: 226,
      baptizedMembership: 402,
      confirmedMembership: 333,
      lastReportYear: 2024
    }
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
    fax: "(260) 486-5793",
    email: "office@alcsfw.org",
    website: "www.alcsfw.org",
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
      sundaySchool: "9:30 AM",
      holyCommunion: "Offered at both services"
    },
    special: {
      lentAdvent: "Wednesdays 6:30 PM"
    },
    onlineWorship: {
      available: true,
      description: "Sunday morning worship services and Adult Discipleship classes are available for viewing on our YouTube channel.",
      note: "Don't miss the Order of Service links to follow along in the bulletin during online worship."
    }
  },

  // Staff and Leadership
  staff: {
    seniorPastor: {
      name: "Rev. James Dale Gier Jr.",
      title: "Senior Pastor",
      installedDate: "May 2019",
      previousService: "Mount Calvary Lutheran Church, Excelsior Springs, Missouri (16 years)",
      education: [
        "Ph.D. Missiology program at Concordia Theological Seminary (current)",
        "Master of Sacred Theology Degree (2016)",
        "Master of Divinity degree from Concordia Theological Seminary (2002)",
        "Bachelor's degree in Architecture from University of Idaho (1986)"
      ],
      background: "Licensed architect in Washington and Connecticut, member of the American Institute of Architects",
      bio: [
        "Pastor Gier was installed as Senior Pastor of Ascension in May of 2019. He previously served 16 years as the pastor of Mount Calvary Lutheran Church in Excelsior Springs, Missouri.",
        "Prior to his call to the sacred ministry, Pastor Gier worked as a licensed architect in Washington and Connecticut, and held membership in the American Institute of Architects. He brings a unique perspective to ministry, combining his background in design with his passion for God's Word."
      ],
      image: "./images/Pastor.png"
    },
    associatePastor: {
      name: "Rev. Zieroth",
      title: "Associate Pastor",
      joinedDate: "June 2021",
      previousRoles: [
        "Assistant Professor of Pastoral Ministry and Missions at CTSFW",
        "Dean of Students at CTSFW",
        "Director of Vicarage and Internship at CTSFW"
      ],
      pastoralExperience: "26 years serving congregations in Fort McMurray and St. Albert, Alberta, Canada; Kingsville, Maryland; and Chaska, Minnesota",
      education: [
        "Doctor of Ministry degree (2006)",
        "Master of Divinity degree from CTSFW (1990)",
        "Bachelor's degree in psychology from Concordia University, Ann Arbor (1986)"
      ]
    },
    deaconess: {
      name: "Deaconess Pamela Buhler",
      title: "Commissioned Deaconess",
      joinedDate: "June 2023",
      focus: "Family life, college students, and elder care",
      specialties: [
        "Creating mini devotional books",
        "Holy Week family devotional kits",
        "Godparent's baptismal remembrance packets",
        "Catechetical books and Bibles for young families",
        "Church member web pages"
      ],
      education: [
        "Master's degree in Deaconess Studies from CTSFW (2018)",
        "Bachelor's degree in electrical engineering from University of Massachusetts, Amherst (1997)"
      ],
      family: "Married to Buckley Buhler, seven children (five married, one in heaven), six grandchildren"
    },
    officeAdministrator: {
      name: "Colleen",
      title: "Office Administrator",
      description: "Serves as administrator for both the church and school. Long-time member of Ascension with husband Scott.",
      quote: "I love the people of Ascension. We are a family. Ascension is a joyful place where Christ is the center."
    },
    musicDirector: {
      name: "David Mussmann",
      title: "Music Director",
      serviceYears: "More than 20 years",
      education: "Studied organ under Dr. Mallory Bransford at Butler University in Indianapolis",
      previousService: [
        "Emmaus Lutheran Church, Indianapolis",
        "St. Matthew Lutheran Church, Indianapolis",
        "University Lutheran Church, West Lafayette, Indiana",
        "St. John Lutheran Church of Wilde Lake, Columbia, Maryland"
      ]
    }
  },

  // Navigation Menu
  navigation: [
    { id: "home", label: "Home", url: "#home" },
    { id: "church", label: "Church", url: "#church" },
    { id: "family", label: "Family", url: "#family" },
    { id: "school", label: "School", url: "#school" },
    { id: "worship", label: "Worship", url: "#worship" },
    { id: "ministries", label: "Ministries", url: "#ministries" },
    { id: "leadership", label: "Leadership", url: "#leadership" },
    { id: "contact", label: "Contact", url: "#contact" }
  ],

  // Page Content
  pages: {
    home: {
      hero: {
        title: "Welcome to Ascension Lutheran Church",
        subtitle: "We invite your family to join ours in worshipping and serving our glorious God in Fort Wayne, Indiana",
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
            { label: "Children's Sunday School", value: "9:30 AM" },
            { label: "Holy Communion", value: "Both Services" }
          ]
        },
        ministry: {
          title: "Church • Family • School",
          subtitle: "At Ascension, new life finds its expression in a three-fold fellowship and ministry where you will encounter and know the Lord Jesus Christ for your forgiveness, life, and salvation!",
          cards: [
            {
              title: "Church",
              image: "./images/ascension-lutheran-school-fort-wayne-in-primaryphoto.jpg",
              text: "As Evangelical Lutherans, we are loyal to the Gospel of Christ. This Gospel ministry and mission is to seek, make, and mature disciples for God's eternal kingdom through preaching, baptizing, teaching, and communing.",
              buttonText: "Learn About Our Church →",
              buttonPage: "church"
            },
            {
              title: "Family",
              image: "./images/families.jpg",
              text: "Ascension is a place for families with many opportunities to study God's Word together. We offer programs for all ages to grow in faith, including Learn by Heart devotions and family ministries.",
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
      },
      mission: {
        statement: "This Gospel ministry and mission of the Christian Church is to seek, make, and mature disciples for God's eternal kingdom through preaching, baptizing, teaching, and communing."
      }
    },

    church: {
      hero: {
        title: "Our Church",
        subtitle: "Faithful to the Gospel of Christ since 1977"
      },
      beliefs: {
        title: "What We Believe",
        subtitle: "As Evangelical Lutherans, we are loyal to the Gospel of Christ",
        content: [
          "In the Gospel of St. John (14:6), Jesus said \"I am the way, and the truth, and the life. No one comes to the Father except through me.\" Jesus is our way back to our Father in heaven. He is the Gospel (Good News) of God to the world.",
          "As Evangelical Lutherans, we are loyal to the Gospel of Christ, \"for there is no other name under heaven given among men by which we must be saved\" (Acts 4:12).",
          "This work of the Holy Spirit of God among mankind is centered in the Divine Service, in which the Word of God is first proclaimed and administered through sermons and sacraments. Through this Word and these means, God saves us from our captivity to sin, death, and the devil, and so works in us a new and everlasting life."
        ],
        niceneCreed: "And the third day, He rose again according to the Scriptures and ascended into heaven and sits at the right hand of the Father. ~ The Nicene Creed"
      },
      history: {
        founded: 1977,
        lcmsJoined: 1977,
        description: "Member congregation of the Lutheran Church Missouri Synod, Indiana District"
      },
      verse: {
        text: "And the third day, He rose again according to the Scriptures and ascended into heaven and sits at the right hand of the Father.",
        reference: "The Nicene Creed"
      }
    },

    family: {
      hero: {
        title: "Family Ministry",
        subtitle: "Ascension is a place for families with many opportunities to grow in faith together"
      },
      programs: {
        title: "Family Programs & Ministries",
        content: [
          "Ascension Lutheran Church offers many opportunities to study God's Word. Here are just a few of our ministry opportunities.",
          "As the school year approaches, remember that Jesus is going with you and your family there, too."
        ],
        offerings: [
          {
            name: "Adult Discipleship Class",
            schedule: "Every Sunday at 9:30 AM",
            description: "Visitors are most welcome. Nursery and Sunday School childcare are available for your little ones."
          },
          {
            name: "Sunday School",
            schedule: "9:30 AM - 10:30 AM every Sunday (except August)",
            description: "Christian educational opportunities for young members, ages 3 to 18."
          },
          {
            name: "Adult Inquirer's Class (Pastor's Class)",
            schedule: "Offered each spring and fall",
            description: "Basic Bible Study of the beliefs of our church and can lead to membership through adult confirmation."
          },
          {
            name: "Women's Bible Study",
            schedule: "Tuesday 7:00-8:30 PM (Room 144) & Friday 9:00-11:00 AM (Music Practice Room)",
            description: "Currently studying the Book of Acts. All women are welcome."
          }
        ]
      },
      learnByHeart: {
        title: "Taking Faith Home / Learn by Heart",
        subtitle: "Weekly Bible and Catechism study and devotion for the whole family",
        description: "The \"Taking Faith Home\" devotional series is a new resource for families, couples, individuals, and the congregation. The devotions incorporate the Four Key Faith Practices:",
        practices: [
          "Caring Conversations",
          "Family Devotions", 
          "Family Service",
          "Family Traditions and Celebrations"
        ],
        items: [
          "Bible Verse of the Week",
          "Catechism Memory Work",
          "Hymn of the Week", 
          "Psalm Meditation of the Week",
          "Daily Bible/Catechism Meditations of the Week"
        ],
        note: "Copies of the current and two most recent weeks of the devotional material are available."
      },
      specialPrograms: {
        title: "Special Family Ministries",
        programs: [
          {
            name: "Family Life Mission Printables",
            description: "Resources to support family faith practices at home"
          },
          {
            name: "Mental Health: Wellness of the Mind",
            description: "Supporting the mental and spiritual wellness of our families"
          },
          {
            name: "Deaconess Family Ministry",
            description: "Mini devotional books, Holy Week family devotional kits, and godparent baptismal remembrance packets"
          }
        ]
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
          "We provide a well rounded, faith based education where you're involved every step of the way. We are committed to providing the best possible education in an environment that is safe, and amplifies the values you are teaching at home."
        ]
      },
      stats: {
        title: "School Information",
        enrollment: 94,
        studentTeacherRatio: "12:1",
        minorityEnrollment: "14.9%",
        tuition: "$4,700 (approximate)",
        acceptanceRate: "98%",
        applicationDeadline: "Rolling admissions"
      },
      programs: {
        title: "Academic & Extracurricular Programs",
        academics: [
          "Preschool through 8th Grade",
          "Classical Lutheran Education approach",
          "Faith-based curriculum"
        ],
        arts: [
          "Band",
          "Choir", 
          "Handbells",
          "Strings Program"
        ],
        clubs: [
          "Crochet Club",
          "Girls Who Code",
          "Trail Life"
        ],
        sports: [
          "Basketball",
          "Cross Country",
          "Soccer", 
          "Track and Field",
          "Volleyball"
        ]
      },
      admissions: {
        title: "Admissions Information",
        requirements: [
          "Pastor's adult instruction class required for non-Lutheran families (10-12 weeks)",
          "School Choice school",
          "Rolling application process",
          "Home, church, and school must work together"
        ],
        note: "We require that all non-Lutheran families go through pastor's adult instruction class in order to learn and understand what we believe and will be teaching your children."
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
          "Online worship is the place to view the Sunday morning services. This page also includes a recording of the Adult Discipleship Class.",
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

    // NEW PAGES ADDED
    ministries: {
      hero: {
        title: "Ministries & Programs",
        subtitle: "Serving our community through Christ's love"
      },
      musicMinistry: {
        title: "Music Ministry",
        subtitle: "Many people participate in praising our Lord Jesus through music",
        ensembles: [
          "Adult Voice Choir",
          "Adult Handbell Choir", 
          "Children's Choirs",
          "Brass and Timpani Ensembles",
          "Woodwind and String Ensembles"
        ],
        invitation: "Come join us in praising our Lord Jesus through music."
      },
      education: {
        title: "Educational Ministries",
        programs: [
          "Early Childhood Education",
          "Elementary Education", 
          "Religious Education",
          "Youth Programs",
          "Tutoring/Lessons",
          "Classical Lutheran Education"
        ]
      },
      missions: {
        title: "Mission Work",
        focus: "\"Every One His Witness,\" in taking the message of the Eternal Gospel (Rev 14:6) to a world caught up in the evil and deception of these last days.",
        recentSpeakers: [
          "Rev. Dr. Cory Rajeck, International Lutheran Missions",
          "Rev. David Preus, LCMS Regional Director of Missions, Eurasia",
          "Seminarian Sergue Trifa, Mission work in Romania and Ukraine",
          "Rev. Jonah Domenichelli, LCMS Missionary to Germany",
          "Rev. Charles Ferry, LCMS Regional Director of Missions in Asia"
        ]
      },
      verse: {
        text: "And this is the victory that has overcome the world—our faith . . . that Jesus is the Son of God",
        reference: "1 John 5:4–5"
      }
    },

    leadership: {
      hero: {
        title: "Church Leadership",
        subtitle: "Faithful servants called to minister to God's people"
      },
      staff: {
        // Will use the detailed staff object from above
      },
      verse: {
        text: "Let the elders who rule well be considered worthy of double honor, especially those who labor in preaching and teaching.",
        reference: "1 Timothy 5:17 (ESV)"
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
              label: "Fax",
              content: "(260) 486-5793"
            },
            {
              label: "Email",
              content: "<a href=\"mailto:office@alcsfw.org\">office@alcsfw.org</a>"
            },
            {
              label: "Website",
              content: "<a href=\"https://www.alcsfw.org\" target=\"_blank\">www.alcsfw.org</a>"
            }
          ]
        },
        pastor: {
          title: "Pastor Information",
          content: [
            "<strong>Rev. James Dale Gier Jr.</strong><br>Senior Pastor",
            "Installed as Senior Pastor in May 2019. Previously served 16 years at Mount Calvary Lutheran Church in Excelsior Springs, Missouri.",
            "Licensed architect background with Master of Divinity from Concordia Theological Seminary."
          ]
        }
      },
      officeHours: {
        title: "Office Hours"
      },
      membership: {
        title: "Becoming a Member",
        content: [
          "Interested in becoming a member of Ascension Lutheran Church or having your children attend Ascension School?",
          "Pastor Gier conducts instructional classes regularly each fall and Pastor Zieroth in the spring, as preparation for those who want to join Ascension or have children in Ascension Lutheran School."
        ],
        requirement: "The pastor's class is a requirement for both church membership and school enrollment."
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
          "Fax: (260) 486-5793",
          "Email: <a href=\"mailto:office@alcsfw.org\">office@alcsfw.org</a>"
        ]
      },
      {
        title: "Worship Times",
        content: [
          "Sunday Divine Worship:<br>8:00 AM & 10:45 AM",
          "Sunday School & Adult Class:<br>9:30 AM",
          "Holy Communion:<br>Both Services"
        ]
      },
      {
        title: "Connect With Us",
        social: true
      }
    ],
    bottom: [
      "&copy; 2025 Ascension Lutheran Church and School. All rights reserved.",
      "Visit us at 8811 St. Joe Road, Fort Wayne, IN 46835",
      "Member of the Lutheran Church Missouri Synod"
    ]
  },

  // Announcements (easily editable)
  announcements: {
    current: [
      {
        title: "Sunday Worship Services",
        message: "Join us for worship at 8:00 AM or 10:45 AM every Sunday with Holy Communion at both services",
        type: "info",
        active: true
      },
      {
        title: "Learn by Heart Devotions",
        message: "New weekly family devotional materials available - strengthen your faith at home",
        type: "info", 
        active: true
      }
    ]
  },

  // Images and Assets
  images: {
    logo: "./images/Rose_ColorThumb.png",
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
    donate: "https://secure.myvanco.com/L-YTGK/home",
    lcms: "https://www.lcms.org",
    ctsfw: "https://www.ctsfw.edu"
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
