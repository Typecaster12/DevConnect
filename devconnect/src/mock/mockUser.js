const mockUser = {
    id: "user-001",

    personalInfo: {
        firstName: "Harsh",
        lastName: "Mishra",
        username: "@harshmishra",

        avatar:
            "https://i.pravatar.cc/300?img=12",

        headline:
            "Frontend Developer",

        bio:
            "Passionate about building scalable web applications with React, Node.js and modern UI design.",

        location:
            "Lucknow, India",
    },

    stats: {
        followers: 120,
        following: 80,
        posts: 24,
    },

    social: {
        github:
            "https://github.com/",

        linkedin:
            "https://linkedin.com/",

        portfolio:
            "https://portfolio.com",
    },

    quickLinks: [
        {
            id: 1,
            title: "Saved Posts",
            path: "/saved-posts",
        },
        {
            id: 2,
            title: "My Projects",
            path: "/projects",
        },
        {
            id: 3,
            title: "My Skills",
            path: "/skills",
        },
        {
            id: 4,
            title: "Bookmarks",
            path: "/bookmarks",
        },
    ],
};

export default mockUser;