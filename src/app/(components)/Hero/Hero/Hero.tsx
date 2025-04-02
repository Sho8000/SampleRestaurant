import TitleCard from "../Cards/TitleCard";

export default function Hero() {
  return (
    <section className="w-[100%] min-h-[80vh] relative">
      <video autoPlay muted loop preload='auto' playsInline className="h-[100%] w-[100%] justify-center top-0 left-0 object-cover absolute">
        <source src="/images/video.mp4" type="video/mp4" />
      </video>

      <TitleCard/>
      
    </section>
  );
}



