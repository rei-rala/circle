import { BetaWall } from "./beta/BetaWall";

export default async function BaseTemplate({ children }: { children: React.ReactNode }) {
    return (
        <>
            <BetaWall />
            {children}
        </>
    )
}