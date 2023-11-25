import Link from 'next/link';
import React from 'react';
import styles from '../../styles/popup.module.css'
import popImg from '../../public/assets/images/popup.png'
import Image from 'next/image';
const SingUpPopup = () => {
    return (
        <div>
            <dialog id="SignUPModal" className={`modal ${styles.customModal}`}>
                <form method="dialog" className="modal-box">
                    <button className="absolute right-2 top-2">✕</button>
                    <div className='grid items-center'>
                        <Image src={popImg} height={250} width={250} alt='this is img of popup' />
                    </div>
                    <h4>Please Contact With the IT Department</h4>
                </form>
            </dialog>
        </div>
    );
};

export default SingUpPopup;