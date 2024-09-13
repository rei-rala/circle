import { useSession } from 'next-auth/react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from 'next-auth';

// const publicRoutes = ["", "/", "/home", "/login", "/logout"]
// const pendingAdmissionRoutes = publicRoutes.concat(["/profile/pending", "/profile/edit", "/home"])
// const bannedUserAllowedRoutes = publicRoutes.concat(["/profile/banned", "/profile"])

export const AuthContext = createContext<{
    user: User | null;
    isLoadingSession: boolean;
    update: () => Promise<User | null>;
    isUserBanned: boolean;
    isUserAdmitted: boolean;
    status: 'loading' | 'authenticated' | 'unauthenticated';
}>({
    user: null,
    isLoadingSession: true,
    update: () => Promise.resolve(null),
    isUserBanned: false,
    isUserAdmitted: false,
    status: 'loading'
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status, update } = useSession();
    const [user, setUser] = useState<User | null>(session?.user ?? null);

    const isLoadingSession = status === 'loading';
    const isUserBanned = session?.user.banned || false;
    const isUserAdmitted = session?.user.admitted || false;

    useEffect(() => {
        if (session?.user) {
            setUser(session.user);
        } else {
            setUser(null);
        }
    }, [session]);

    const updateUser = useCallback(async () => {
        if (isLoadingSession) return null;


        const user = await update()
            .then(session => {
                const user = session?.user ?? null;
                setUser(user);
                return user;
            }).catch(() => {
                return null;
            });

        return user;
    }, [isLoadingSession, update]);

    return (
        <AuthContext.Provider value={{
            user,
            isLoadingSession,
            update: updateUser,
            isUserBanned,
            isUserAdmitted,
            status
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};