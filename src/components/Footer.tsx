import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { Separator } from "./ui/separator";

const siteSocialMedia = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/thecircle.ba/",
        icon: Instagram,
    },

]

export function Footer() {
    return (
        <footer className="w-full mt-10" id="footer">
            <div className="flex flex-col gap-3 justify-between items-center">
                <span className="text-md text-white/50">Unite en nuestras Redes sociales</span>
                <div className="flex text-muted-foreground">
                    {siteSocialMedia.map((social) => (
                        <Button
                            key={social.name}
                            variant="link"
                            className="flex gap-2"
                            asChild
                        >
                            <a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground transition-colors"
                            >
                                <social.icon className="h-5 w-5" />
                                <span>
                                    {social.name}
                                </span>
                            </a>
                        </Button>
                    ))}
                </div>

                <Separator />
                <p className="text-white/50 text-sm md:mb-0">
                    &copy; {new Date().getFullYear()} The Circle. All rights reserved.
                </p>
                <Separator />
            </div>
        </footer>
    );
}