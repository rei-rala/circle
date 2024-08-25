"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon, CaseSensitiveIcon, RouteIcon, LinkIcon } from "lucide-react";

export const PlaceInfo = ({
  place,
  disabled
}: {
  place: google.maps.places.PlaceResult;
  disabled: boolean;
}) => {
  const handleCopyUrl = (e: any) => {
    e.preventDefault();
    place?.url && navigator.clipboard.writeText(place.url);
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
          <Button onClick={handleCopyUrl} disabled={disabled}>
            <CopyIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
