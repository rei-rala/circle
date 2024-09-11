

export default function BannedProfile() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-[#222222] p-8 rounded-lg text-center">
                <div className="text-4xl font-bold mb-4">¡Lo sentimos!</div>
                <div className="text-lg mb-4">Tu cuenta ha sido baneada.</div>
                <div className="text-sm text-[#cccccc] mb-4">
                    Por favor, contacta con el administrador si crees que esto es un error.
                </div>
            </div>
        </div>
    )
}

