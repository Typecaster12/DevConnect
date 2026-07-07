const mockUsers = [
    {
        id: 1,

        personalInfo: {
            firstName: "Harsh",
            lastName: "Mishra",
            username: "@harshmishra",

            avatar: "https://i.pravatar.cc/300?img=12",

            headline: "Frontend Developer",

            bio: "Passionate about building scalable web applications with React, Node.js and modern UI design.",

            location: "Lucknow, India",
        },

        stats: {
            followers: 120,
            following: 80,
            posts: 24,
        },

        social: {
            github: "https://github.com/",
            linkedin: "https://linkedin.com/",
            portfolio: "https://portfolio.com",
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
    },

    {
        id: 2,

        personalInfo: {
            firstName: "Rahul",
            lastName: "Verma",
            username: "@rahulverma",

            avatar: "https://i.pravatar.cc/300?img=15",

            headline: "Backend Developer",

            bio: "Node.js enthusiast building scalable REST APIs and microservices.",

            location: "Delhi, India",
        },

        stats: {
            followers: 340,
            following: 180,
            posts: 51,
        },

        social: {
            github: "https://github.com/",
            linkedin: "https://linkedin.com/",
            portfolio: "https://portfolio.com",
        },

        quickLinks: [],
    },

    {
        id: 3,

        personalInfo: {
            firstName: "Priya",
            lastName: "Sharma",
            username: "@priyasharma",

            avatar: "https://i.pravatar.cc/300?img=32",

            headline: "UI/UX Designer",

            bio: "Designing clean, accessible and delightful user experiences.",

            location: "Bengaluru, India",
        },

        stats: {
            followers: 890,
            following: 210,
            posts: 132,
        },

        social: {
            github: "https://github.com/",
            linkedin: "https://linkedin.com/",
            portfolio: "https://portfolio.com",
        },

        quickLinks: [],
    },

    {
        id: 4,

        personalInfo: {
            firstName: "Aman",
            lastName: "Singh",
            username: "@amansingh",

            avatar: "https://i.pravatar.cc/300?img=18",

            headline: "Full Stack Developer",

            bio: "React, Express and MongoDB developer. Coffee-powered coder.",

            location: "Pune, India",
        },

        stats: {
            followers: 520,
            following: 143,
            posts: 87,
        },

        social: {
            github: "https://github.com/",
            linkedin: "https://linkedin.com/",
            portfolio: "https://portfolio.com",
        },

        quickLinks: [],
    },

    {
        id: 5,

        personalInfo: {
            firstName: "Sneha",
            lastName: "Gupta",
            username: "@snehagupta",

            avatar: "https://i.pravatar.cc/300?img=47",

            headline: "Software Engineer",

            bio: "Passionate about JavaScript, cloud technologies and open-source contributions.",

            location: "Hyderabad, India",
        },

        stats: {
            followers: 760,
            following: 295,
            posts: 110,
        },

        social: {
            github: "https://github.com/",
            linkedin: "https://linkedin.com/",
            portfolio: "https://portfolio.com",
        },

        quickLinks: [],
    },
];

export default mockUsers;