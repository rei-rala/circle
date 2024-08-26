
type LoadingProps = {
  title?: string
}

export default function Loading({ title }: LoadingProps) {
  return (
    <div className="flex justify-center items-center space-x-2 w-full">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      <p className="text-lg font-medium text-primary">
        Cargando{title ? ` ${title}` : ''}...
      </p>
    </div>
  )
}