const endpoints = {
    // Auth
    SignIn: "/auth/login",
    SignUp: "/auth/register",
    SignOut: "/auth/logout",
    ForgotPassword: "/auth/forgot-password",
    ResetPassword: "/auth/reset-password",
    VerifyToken: "/auth/verify-token",
    VerifyOtp: "/auth/verify-password-reset-otp",
    Refresh: "/auth/refresh",
    Revoke: "/auth/revoke",
    SendOtp: "/auth/send-otp",

    // Core Features
    Product: "/product",
    ChatHistory: "/chat/history",
    AiDesign: "/ai/design",
    AiModels: "/ai/models",

    // Analytics
    AnalyticsStats: "/analytics/stats",
    RevenueGrowth: "/analytics/revenue-growth",

    // User Management
    Users: "/users",
    UserProfile: "/users/profile",
    ChangePassword: "/users/change-password",

    // Business Logic

    Orders: "/orders",
    OrderStatus: (id: number | string) => `/orders/${id}/status`,
    Inventory: "/inventory",
    Tasks: "/tasks",
    Reviews: "/reviews",
    ReviewStatus: (id: number | string) => `/reviews/${id}/status`,
    Reports: "/reports",
    Contact: "/contact",
    AdminLogs: "/adminlogs",
}

export default endpoints
