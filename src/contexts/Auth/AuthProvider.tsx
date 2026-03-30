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
    const [email, setEmailState] = useState<string | null>(localStorage.getItem("userEmail"));

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

    const setEmail = useCallback((e: string | null) => {
        setEmailState(e);
        authStore.setEmail(e);
        if (e) localStorage.setItem("userEmail", e);
        else localStorage.removeItem("userEmail");
    }, []);

    useEffect(() => {
        authStore.setAccessToken(accessToken);
        authStore.setRole(role);
        authStore.setUserName(userName);
        authStore.setEmail(email);
    }, [accessToken, role, userName, email]);

    const login = useCallback(
        async (email: string, password: string) => {
            const response = await AUTH_SERVICE.login({ email, password });
            if (response.ok) {
                const authData = response.data || response;
                const token = authData.accessToken ?? null;
                const role = authData.role ?? null;
                const name = authData.name ?? role ?? null;

                setAccessToken(token);
                setRole(role);
                setUserName(name);
                setEmail(email); // Store the email used for login
            }
            return response;
        },
        [setAccessToken, setRole, setUserName, setEmail]
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
        setEmail(null);
    }, [setAccessToken, setRole, setUserName, setEmail]);

    const register = useCallback(
        async (email: string, password: string, phone: string) => {
            const response = await AUTH_SERVICE.register({ email, password, phoneNumber: phone });
            if (response.ok) {
                setAccessToken(response.data?.accessToken ?? null);
                setRole(response.data?.role ?? null);
                setUserName(response.data?.name ?? response.data?.role ?? null);
                setEmail(email);
            }
            return response;
        },
        [setAccessToken, setRole, setUserName, setEmail]
    );

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                role,
                userName,
                email,
                setAccessToken,
                setRole,
                setUserName,
                setEmail,
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
