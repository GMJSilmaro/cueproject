import Image from "next/image";

export function Logo({ className = "", width = 150, height = 150 }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: width + 'px', height: height + 'px' }}>
      <Image
        src="/images/cueprojectLogo.png"
        alt="Cue Project DJ"
        fill
        sizes="(max-width: 768px) 100px, 150px"
        className={`${className} w-full h-full`}
        style={{ objectFit: 'contain' }}
        priority
      />
    </div>
  );
}