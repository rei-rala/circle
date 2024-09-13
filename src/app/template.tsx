import { BetaWall } from "./BetaWall";

export default async function BaseTemplate({ children }: { children: React.ReactNode }) {
    return (
        <>
            <BetaWall />
            {children}
        </>
    )
}