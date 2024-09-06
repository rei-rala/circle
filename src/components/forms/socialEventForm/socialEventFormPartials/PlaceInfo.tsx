"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon, CaseSensitiveIcon, RouteIcon, LinkIcon } from "lucide-react";
import { toast } from "sonner";

export const PlaceInfo = ({
  place: initialPlace,
}: {
  place: google.maps.places.PlaceResult;
  disabled?: boolean;
}) => {
  const place = typeof initialPlace === "string" ? JSON.parse(initialPlace) : initialPlace;

  const handleCopyUrl = (e: any) => {
    e.preventDefault();

    if (place.url && navigator) {
      navigator.clipboard.writeText(place.url);
      toast.success("Link copiado al portapapeles");
    }

  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CaseSensitiveIcon className="w-4 h-4" />
          <Label htmlFor="place-name">Nombre</Label>
        </div>
        <Input
          id="place-name"
          name="place-name"
          disabled
          className="cursor-not-allowed"
          placeholder="Nombre del lugar"
          value={place.name}
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <RouteIcon className="w-4 h-4" />
          <Label htmlFor="place-address">Dirección</Label>
        </div>
        <Input
          id="place-address"
          name="place-address"
          disabled
          className="cursor-not-allowed"
          placeholder="Dirección del lugar"
          value={place.formatted_address}
        />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <LinkIcon className="w-4 h-4" />
          <Label htmlFor="place-url">Link</Label>
        </div>
        <div className="flex">
          <Input
            id="place-url"
            name="place-url"
            disabled
            className="cursor-not-allowed"
            placeholder="Link del lugar"
            value={place.url}
          />
          <Button onClick={handleCopyUrl}>
            <CopyIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
