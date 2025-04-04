import Link from "next/link";

interface BtnProps {
  text:string
}

export default function Button({text}:BtnProps) {
  return (
    <Link
      href="/menu"
      className={`w-fit border-1 border-black rounded-md shadow-md px-[1rem] py-[0.5rem] bg-[#fefefe]`}
      >
      <p className="text-xl font-bold">{text}</p>    
    </Link>
  );
}



