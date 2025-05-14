"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        let timeout;
        let warningTimeout;

        const resetTimeout = () => {
            clearTimeout(timeout);
            clearTimeout(warningTimeout);

            // Set a 5-minute inactivity timer
            timeout = setTimeout(() => {
                const stayLoggedIn = confirm("You have been inactive for 5 minutes. Do you want to stay logged in?");
                if (!stayLoggedIn) {
                    // Clear the token and redirect to login
                    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                    setIsLoggedIn(false);
                    router.push("/login");
                } else {
                    // Reset the timer if the user chooses to stay logged in
                    resetTimeout();
                }
            }, 5 * 60 * 1000); // 5 minutes
        };

        // Reset the timer on user activity
        const handleActivity = () => resetTimeout();

        window.addEventListener("mousemove", handleActivity);
        window.addEventListener("keydown", handleActivity);

        resetTimeout();

        return () => {
            clearTimeout(timeout);
            clearTimeout(warningTimeout);
            window.removeEventListener("mousemove", handleActivity);
            window.removeEventListener("keydown", handleActivity);
        };
    }, [router]);

    return (
        <SessionContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);