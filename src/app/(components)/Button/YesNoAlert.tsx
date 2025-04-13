import { useState } from "react";
import { signOut } from "next-auth/react"

export default function YesNoAlert() {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const triggerAlert = (msg: string) => {
    setMessage(msg);
    setShowModal(true);
  };

  const handleYes = () => {
    setShowModal(false);
    signOut();
  };

  const handleNo = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button className="bg-[#0a0a0a] text-[#ededed] px-[0.5rem] py-[0.2rem] rounded-md cursor-pointer"
      onClick={() => triggerAlert(`Do you want to logout?\n(The cart data is only stored temporarily.)`)}>
        Sign Out
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 flex justify-center items-center z-20">
          <div className="bg-[#ededed] p-[20px] rounded-md text-center">
            <p>{message}</p>
            <div className="flex justify-center gap-[1rem] mt-[1rem]">
              <button className="w-[100px] bg-[#0a0a0a] text-[#ededed] px-[0.5rem] py-[0.2rem] rounded-md cursor-pointer" onClick={handleYes}>Yes</button>
              <button className="w-[100px] bg-[#0a0a0a] text-[#ededed] px-[0.5rem] py-[0.2rem] rounded-md cursor-pointer" onClick={handleNo}>No</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
