import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from 'next-auth';
import { usePathname, useRouter } from 'next/navigation';

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
    const router = useRouter();
    const pathname = usePathname();

    const isLoadingSession = status === 'loading';
    const isUserBanned = !isLoadingSession && Boolean(session?.user.banned);
    const isUserAdmitted = !isLoadingSession && Boolean(session?.user.admitted);

    useEffect(() => {
        if (isLoadingSession) return; // Still loading session, no redirect yet

        const timeoutId = setTimeout(() => {
            if (!session) {
                if (!publicRoutes.includes(pathname)) {
                    router.push('/login');
                }
            } else {
                if (session.user.banned && !bannedUserAllowedRoutes.includes(pathname)) {
                    router.push('/profile/banned');
                } else if (!session.user.admitted) {
                    console.log("redirecting to admission")
                    console.log(pathname)
                    if (!pendingAdmissionRoutes.includes(pathname)) {
                        router.push('/profile/admission');
                    }
                } else {
                    setUser(session.user);
                }
            }
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [session, isLoadingSession, pathname, router]);

    useEffect(() => {
        const interval = setInterval(() => {
            update();
        }, 5 * 60 * 1000); // 5 minutes
        return () => clearInterval(interval);
    }, [update]);

    return (
        <AuthContext.Provider value={{
            user,
            isLoadingSession,
            update,
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

export const useUserBanned = () => {
    const { isUserBanned } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isUserBanned && !bannedUserAllowedRoutes.includes(pathname)) {
                router.push('/profile/banned');
            }
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [isUserBanned, pathname, router]);

    return isUserBanned;
};

export const useUserInAdmission = () => {
    const { isUserAdmitted } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!isUserAdmitted && 
                !pendingAdmissionRoutes.includes(pathname) && 
                (pathname === '/events' || 
                 (pathname.startsWith('/events/') && 
                  (pathname.endsWith('/edit') || pathname.includes('/edit/'))))) {
                router.push('/profile/admission');
            }
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [isUserAdmitted, pathname, router]);

    return !isUserAdmitted;
};

export const useUserBannedOrInAdmission = () => {
    const isBanned = useUserBanned();
    const isInAdmission = useUserInAdmission();

    return isBanned || isInAdmission;
};
