import React, { useState, useCallback, useEffect } from "react";
import { authStore } from "../../utils/authSingleton";
import { AUTH_SERVICE } from "../../api/services/auth";
import { AuthContext } from "./AuthContext";
import { tokenStorage } from "../../utils/tokenStorage";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [accessToken, setAccessTokenState] = useState<string | null>(tokenStorage.getAccessToken());
    const [role, setRoleState] = useState<string | null>(tokenStorage.getRole());
    const [userName, setUserNameState] = useState<string | null>(tokenStorage.getUserName());
    const [email, setEmailState] = useState<string | null>(tokenStorage.getUserEmail());
    const [isInitialized, setIsInitialized] = useState(false);

    const updateAuthState = useCallback((data: { 
        accessToken: string | null; 
        refreshToken?: string | null;
        role: string | null; 
        name: string | null; 
        email: string | null 
    }) => {
        setAccessTokenState(data.accessToken);
        setRoleState(data.role);
        setUserNameState(data.name);
        setEmailState(data.email);

        authStore.setAccessToken(data.accessToken);
        authStore.setRole(data.role);
        authStore.setUserName(data.name);
        authStore.setEmail(data.email);

        if (data.accessToken) {
            tokenStorage.setAccessToken(data.accessToken);
            if (data.refreshToken) tokenStorage.setRefreshToken(data.refreshToken);
            if (data.role) tokenStorage.setRole(data.role);
            if (data.name) tokenStorage.setUserName(data.name);
            if (data.email) tokenStorage.setUserEmail(data.email);
        } else {
            tokenStorage.clear();
        }
    }, []);

    // Initialize Auth Session
    useEffect(() => {
        const initAuth = async () => {
            const token = tokenStorage.getAccessToken();
            const refreshToken = tokenStorage.getRefreshToken();
            
            if (token) {
                try {
                    // Optional: Verify token with backend
                    const response = await AUTH_SERVICE.verifyToken({ token });
                    if (response.ok) {
                        updateAuthState({
                            accessToken: token,
                            refreshToken: refreshToken,
                            role: response.role as string,
                            name: response.name as string,
                            email: tokenStorage.getUserEmail()
                        });
                    } else {
                        throw new Error("Invalid token");
                    }
                } catch (error) {
                    console.warn("Token verification failed, attempting refresh...");
                    if (refreshToken) {
                        try {
                            const refreshResp = await AUTH_SERVICE.refresh(refreshToken);
                            updateAuthState({
                                accessToken: refreshResp.accessToken || refreshResp.data?.accessToken || null,
                                refreshToken: refreshResp.refreshToken || refreshResp.data?.refreshToken || null,
                                role: (refreshResp.role || refreshResp.data?.role) as string,
                                name: (refreshResp.name || refreshResp.data?.name) as string,
                                email: (refreshResp.data?.email || tokenStorage.getUserEmail()) as string
                            });
                        } catch (refreshErr) {
                            updateAuthState({ accessToken: null, role: null, name: null, email: null });
                        }
                    } else {
                        updateAuthState({ accessToken: null, role: null, name: null, email: null });
                    }
                }
            }
            setIsInitialized(true);
        };

        initAuth();
    }, [updateAuthState]);

    const login = useCallback(
        async (email: string, password: string) => {
            const response = await AUTH_SERVICE.login({ email, password });
            const authData = response.data || response;
            
            if (authData.accessToken) {
                updateAuthState({
                    accessToken: authData.accessToken,
                    refreshToken: authData.refreshToken,
                    role: authData.role as string,
                    name: authData.name as string,
                    email: email
                });
            }
            return response;
        },
        [updateAuthState]
    );

    const logout = useCallback(async () => {
        const token = tokenStorage.getRefreshToken();
        if (token) {
            try {
                await AUTH_SERVICE.revoke(token);
            } catch (e) {
                console.warn("Revoke failed during logout", e);
            }
        }
        updateAuthState({ accessToken: null, role: null, name: null, email: null });
    }, [updateAuthState]);

    const register = useCallback(
        async (email: string, password: string, phone: string) => {
            const response = await AUTH_SERVICE.register({ email, password, phoneNumber: phone });
            const authData = response.data || response;
            
            if (authData.accessToken) {
                updateAuthState({
                    accessToken: authData.accessToken,
                    refreshToken: authData.refreshToken,
                    role: authData.role as string,
                    name: authData.name as string,
                    email: email
                });
            }
            return response;
        },
        [updateAuthState]
    );

    if (!isInitialized) return null; // Or a loading spinner

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                role,
                userName,
                email,
                setAccessToken: (t) => updateAuthState({ accessToken: t, role, name: userName, email }),
                setRole: (r) => updateAuthState({ accessToken, role: r, name: userName, email }),
                setUserName: (n) => updateAuthState({ accessToken, role, name: n, email }),
                setEmail: (e) => updateAuthState({ accessToken, role, name: userName, email: e }),
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

