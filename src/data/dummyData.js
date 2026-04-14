// =============================================
//  PORTER — PARCEL DELIVERY APP — DUMMY DATA
// =============================================

export const currentUser = {
    name: "Sri Julaekha",
    role: "Designer",
    balance: 1250.00,
    avatar: null,
    phone: "+91 98765 43210",
    email: "sri.julaekha@email.com",
    addresses: [
        "123 Main St, Connaught Place, Delhi - 110001",
        "45 Sector 14, Gurgaon, Haryana - 122001",
    ],
};

export const services = [
    { id: 1, name: "Pickup Delivery", icon: "bike", bg: "#FFF3E0", iconColor: "#FF8F00" },
    { id: 2, name: "Express Delivery", icon: "zap", bg: "#E8F5E9", iconColor: "#2FA36B" },
    { id: 3, name: "Pick a Pick", icon: "map-pin", bg: "#E3F2FD", iconColor: "#1976D2" },
    { id: 4, name: "Travel Check", icon: "navigation", bg: "#FCE4EC", iconColor: "#C2185B" },
    { id: 5, name: "Add Balance", icon: "plus-circle", bg: "#F3E5F5", iconColor: "#7B1FA2" },
    { id: 6, name: "Truck Delivery", icon: "truck", bg: "#E0F7FA", iconColor: "#0097A7" },
];

export const quickActions = [
    { id: 1, name: "Promote", icon: "megaphone", bg: "#FFF3E0" },
    { id: 2, name: "Payments", icon: "credit-card", bg: "#E8F5E9" },
    { id: 3, name: "Support", icon: "headphones", bg: "#E3F2FD" },
    { id: 4, name: "Tickets", icon: "ticket", bg: "#FCE4EC" },
];

export const orders = [
    {
        id: "ORD001",
        pickup: "Connaught Place, Delhi",
        drop: "Sector 14, Gurgaon",
        status: "In Transit",
        price: 250,
        date: "15 Jan 2024",
        type: "Express",
        weight: "2 kg",
        driver: "Ramesh Kumar",
        driverPhone: "+91 98111 22333",
    },
    {
        id: "ORD002",
        pickup: "Lajpat Nagar, Delhi",
        drop: "Noida Sector 62",
        status: "Delivered",
        price: 180,
        date: "14 Jan 2024",
        type: "Standard",
        weight: "1 kg",
        driver: "Suresh Yadav",
        driverPhone: "+91 99888 77655",
    },
    {
        id: "ORD003",
        pickup: "Karol Bagh, Delhi",
        drop: "Faridabad Sector 17",
        status: "Pending",
        price: 320,
        date: "13 Jan 2024",
        type: "Bike",
        weight: "3 kg",
        driver: "Pending Assignment",
        driverPhone: null,
    },
    {
        id: "ORD004",
        pickup: "Janakpuri, Delhi",
        drop: "Dwarka Sector 10",
        status: "Delivered",
        price: 120,
        date: "12 Jan 2024",
        type: "Bike",
        weight: "0.5 kg",
        driver: "Amit Sharma",
        driverPhone: "+91 90000 11234",
    },
    {
        id: "ORD005",
        pickup: "Rohini, Delhi",
        drop: "Pitampura, Delhi",
        status: "Cancelled",
        price: 90,
        date: "10 Jan 2024",
        type: "Standard",
        weight: "1 kg",
        driver: "N/A",
        driverPhone: null,
    },
];

export const trackingSteps = [
    { id: 1, label: "Order Placed", desc: "Your order has been confirmed", time: "10:00 AM", done: true },
    { id: 2, label: "Picked Up", desc: "Package collected from sender", time: "10:45 AM", done: true },
    { id: 3, label: "In Transit", desc: "Package is on the way", time: "11:30 AM", done: true },
    { id: 4, label: "Out for Delivery", desc: "Almost there!", time: "~2:00 PM", done: false },
    { id: 5, label: "Delivered", desc: "Package delivered successfully", time: "--", done: false },
];

export const packageTypes = [
    { id: 1, name: "Document", icon: "file-text" },
    { id: 2, name: "Clothing", icon: "shirt" },
    { id: 3, name: "Electronics", icon: "cpu" },
    { id: 4, name: "Food", icon: "utensils" },
    { id: 5, name: "Other", icon: "package" },
];

export const vehicleTypes = [
    { id: 1, name: "Bike", icon: "bike", base: 50, perKg: 10, eta: "30–45 min" },
    { id: 2, name: "Express", icon: "zap", base: 100, perKg: 15, eta: "15–25 min" },
    { id: 3, name: "Truck", icon: "truck", base: 200, perKg: 20, eta: "60–90 min" },
];

export const profileMenuItems = [
    { id: 1, label: "Edit Profile", icon: "user-pen", path: "/profile/edit" },
    { id: 2, label: "Order History", icon: "clipboard-list", path: "/orders" },
    { id: 3, label: "Notifications", icon: "bell", path: "/notifications" },
    { id: 4, label: "Pick Up Information", icon: "map-pin", path: "/pickup-info" },
    { id: 5, label: "Bank Account Information", icon: "building-2", path: "/bank" },
    { id: 6, label: "Mobile Financial Account", icon: "smartphone", path: "/mobile-finance" },
    { id: 7, label: "Privacy & Security", icon: "shield", path: "/privacy" },
];
