export const sidebarLinks = [
    {
        route: '/subscription',
        label: 'Upgrade to Premium',
        premiumLabel: 'Premium',  // Nyckel för alternativ titel
        imgURL: "/icons/premiumIcon.svg",
        admin: true,
    },
    {
        route: '/',
        label: 'Home',
        imgURL: "/icons/home.svg",
        admin: false,
    },
    {
        route: '/explore',
        label: 'Explore',
        imgURL: '/icons/exploreIcon.svg',
        admin: false,
    },
    {
        route: '/underdevelopment',
        label: 'Take Quiz',
        imgURL: '/icons/quizIcon.svg',
        admin: false,
    }, 
    {
        route: '/stumarket',
        label: 'StuMarket',
        imgURL: '/icons/marketIcon.svg',
        admin: false,
    },
    {
        route: '/upload',
        label: 'Upload Documents',
        imgURL: '/icons/documentIcon.svg',
        admin: true,
    },
    {
        route: '/create-course',
        label: 'Create Course',
        imgURL: '/icons/createIcon.svg',
        admin: true,
    },
    {
        route: '/contact',
        label: 'About & Support',
        imgURL: '/icons/contactIcon.svg',
        admin: false,
    },
];
