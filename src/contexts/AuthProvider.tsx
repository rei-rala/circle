import { useSession } from 'next-auth/react';
import { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from 'next-auth';

const publicRoutes = ["", "/", "/home", "/login", "/logout"]
const pendingAdmissionRoutes = publicRoutes.concat(["/profile/pending", "/profile/edit", "/home"])
const bannedUserAllowedRoutes = publicRoutes.concat(["/profile/banned", "/profile"])

export const AuthContext = createContext<{
    user: User | null;
    isLoadingSession: boolean;
    update: () => Promise<Session | null>;
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
    const [user, setUser] = useState<User | null>(null);

    const isLoadingSession = status === 'loading';
    const isUserBanned = session?.user.banned;
    const isUserAdmitted = session?.user.admitted;

    useEffect(() => {
        if (session?.user) {
            setUser(session.user);
        } else {
            setUser(null);
        }
    }, [session]);

    const updateUser = async () => {
        const updatedSession = await update();
        if (updatedSession?.user) {
            setUser(updatedSession.user);
        }
        return updatedSession;
    };

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