import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";


export function FormActionButton(props: React.ComponentProps<typeof Button>) {
    const { pending } = useFormStatus();

    return (
        <Button
            {...props}
            disabled={pending || props.disabled}
            type="submit">
            {
                pending
                    ? <div className="animate-spin rounded-full w-4 h-4 border-t-4"></div>
                    : props.children
            }
        </Button>
    )
}