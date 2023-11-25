import Link from "next/link";
import React from "react";
import styles from "../../styles/popup.module.css";
import popImg from "../../public/assets/images/popup.png";
import Image from "next/image";

const PopUp = ({ route }) => {
  const { url, setUrl } = route;

  return (
    <div>
      <dialog id="my_modal_3" className={`modal ${styles.customModal}`}>
        <form method="dialog" className="modal-box">
          <button
            onClick={() => setUrl("/login")}
            className="absolute right-2 top-2"
          >
            ✕
          </button>
          <div className="grid items-center">
            <Image
              src={popImg}
              height={250}
              width={250}
              alt="this is img of popup"
            />
          </div>
          <h4>Please You Need to Login First</h4>
          <Link href={`${url}`}>Click Here to Login</Link>
        </form>
      </dialog>
    </div>
  );
};

export default PopUp;
