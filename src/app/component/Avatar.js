import Image from "next/image";

export default function Avatar({src}) {
    return (
        <div className="rounded-full overflow-hidden w-12 h-12">
                    <Image 
                        src={src} 
                        alt="avatar"
                        width={48}  // Avatar size (48x48 pixels)
                        height={48} 
                        className="object-cover"
                    />
                </div>
    )
}