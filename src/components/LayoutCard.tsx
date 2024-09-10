import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

type LayoutCardProps = {
    title: React.ReactNode;
    content: React.ReactNode;
    footer?: React.ReactNode;
    ref?: React.Ref<HTMLDivElement>;
    [key: string]: any;
}

export const LayoutCard = ({ title, content, footer, ...props }: LayoutCardProps) => {
    
    return (
        <Card {...props} className={cn("bg-[#222222] p-4 rounded-lg", props.className)} >
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {content}
            </CardContent>
            {footer && <>
                <Separator className="my-6 mb-8" />
                <CardFooter>{footer}</CardFooter>
            </>
            }
        </Card>
    );
}
