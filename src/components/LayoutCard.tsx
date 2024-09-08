import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

type LayoutCardProps = {
    title: React.ReactNode;
    content: React.ReactNode;
    footer?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
    [key: string]: any;
}

export const LayoutCard = ({ title, content, footer, ...props }: LayoutCardProps) => {
    return (
        <Card className={cn("bg-[#222222] p-4 rounded-lg", props.className)} {...props}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
}
