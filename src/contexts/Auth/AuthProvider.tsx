import React, { useState, useCallback, useEffect } from "react";
import { authStore } from "../../utils/authSingleton";
import { AUTH_SERVICE } from "../../api/services/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(localStorage.getItem("authToken"));
    const [role, setRoleState] = useState<string | null>(localStorage.getItem("userRole"));
    const [userName, setUserNameState] = useState<string | null>(localStorage.getItem("userName"));

    const setAccessToken = useCallback((t: string | null) => {
        setAccessTokenState(t);
        authStore.setAccessToken(t);
        if (t) localStorage.setItem("authToken", t);
        else localStorage.removeItem("authToken");
    }, []);

    const setRole = useCallback((r: string | null) => {
        setRoleState(r);
        authStore.setRole(r);
        if (r) localStorage.setItem("userRole", r);
        else localStorage.removeItem("userRole");
    }, []);

    const setUserName = useCallback((n: string | null) => {
        setUserNameState(n);
        authStore.setUserName(n);
        if (n) localStorage.setItem("userName", n);
        else localStorage.removeItem("userName");
    }, []);

    useEffect(() => {
        authStore.setAccessToken(accessToken);
        authStore.setRole(role);
        authStore.setUserName(userName);
    }, [accessToken, role, userName]);

    const login = useCallback(
        async (email: string, password: string) => {
            const response = await AUTH_SERVICE.login({ email, password });
            if (response.ok) {
                // Handle response where data might be at top level or nested in 'data'
                const authData = response.data || response;
                const token = authData.accessToken ?? null;
                const role = authData.role ?? null;
                const name = authData.name ?? role ?? null;

                setAccessToken(token);
                setRole(role);
                setUserName(name);
            }
            return response;
        },
        [setAccessToken, setRole, setUserName]
    );

    const logout = useCallback(async () => {
        try {
            await AUTH_SERVICE.logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
        setAccessToken(null);
        setRole(null);
        setUserName(null);
    }, [setAccessToken, setRole, setUserName]);

    const register = useCallback(
        async (email: string, password: string, phone: string) => {
            const response = await AUTH_SERVICE.register({ email, password, phoneNumber: phone });
            if (response.ok) {
                setAccessToken(response.data?.accessToken ?? null);
                setRole(response.data?.role ?? null);
                setUserName(response.data?.name ?? response.data?.role ?? null);
            }
            return response;
        },
        [setAccessToken, setRole, setUserName]
    );

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                role,
                userName,
                setAccessToken,
                setRole,
                setUserName,
                login,
                logout,
                register,
                isAuthenticated: !!accessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
