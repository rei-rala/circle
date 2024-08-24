"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { CopyIcon, MapPinIcon, CalendarIcon, ClockIcon, FilePenIcon, MapIcon, UsersIcon } from "lucide-react"
import { Separator } from "../ui/separator"
import { useState } from "react"

import MyMapWithSearch from "../MyMapWithSearch"

export function NewEventPageComponent() {
  const [socialEvent, setSocialEvent] = useState<SocialEvent>({
    title: "",
    description: "",
    date: new Date(),
    place: null,
    minAttendees: 0,
    attendees: [],
  });


  const handleCopyUrl = (e: any) => {
    e.preventDefault();
    socialEvent.place?.url && navigator.clipboard.writeText(socialEvent.place.url);
  }

  return (
    <Card className="bg-[#222222] p-4 rounded-lg">
      <CardHeader>
        <CardTitle>Crear Evento</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6">
          <input type="hidden" name="id" value={socialEvent.id} />

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
              <div className="flex items-center gap-2">
                <FilePenIcon className="w-5 h-5" />
                <Label htmlFor="title">Título</Label>
              </div>
              <Input id="title" placeholder="Ingresa el título del evento" />
            </div>
            <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                <Label htmlFor="min-attendees" className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">Mínimo asistentes requerido</Label>
              </div>
              <Input id="min-attendees" type="number" placeholder="Ingresa el mínimo de asistentes (0 sin mínimo)" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <Label htmlFor="date">Fecha</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start font-normal">
                    Seleccionar fecha
                    <div className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1 flex flex-col gap-2 min-w-[200px]">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <Label htmlFor="time">Hora</Label>
              </div>
              <Input id="time" type="time" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FilePenIcon className="w-5 h-5" />
              <Label htmlFor="description">Descripción</Label>
            </div>
            <Textarea id="description" placeholder="Describe el evento" />
          </div>

          <Separator />

          {
            socialEvent.place && (
              <>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <MapIcon className="w-5 h-5" />
                    <Label htmlFor="place">
                      Lugar
                    </Label>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="place-name">Nombre</Label>
                      </div>
                      <Input disabled className="cursor-not-allowed" placeholder="Nombre del lugar" value={socialEvent.place.name} />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="place-address">Dirección</Label>
                      </div>
                      <Input disabled className="cursor-not-allowed" placeholder="Dirección del lugar" value={socialEvent.place.formatted_address} />
                    </div>

                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="place-address">Link</Label>
                      </div>

                      <div className="flex">
                        <Input disabled className="cursor-not-allowed" placeholder="Dirección del lugar" value={socialEvent.place.url} />

                        <Button onClick={handleCopyUrl}>
                          <CopyIcon className="w-5 h-5" />
                        </Button>
                      </div>

                    </div>
                  </div>
                </div>
                <Separator />

              </>
            )
          }
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5" />
              <Label htmlFor="description">Seleccion de lugar</Label>
            </div>
            <MyMapWithSearch
              mapsPlace={null}
              setMapsPlace={(place) => setSocialEvent({ ...socialEvent, place })}
              customInput={
                <Input
                  id="place"
                  placeholder="Busca una ubicación en Google Maps"
                />
              }
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Crear Evento</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
