
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import DashboardLayout from "../../../components/common/DashboardLayout";
import styles from '../../../styles/upload.module.css'
import { BsFillPersonFill } from "react-icons/bs";


const  Home = () => {
    return (
        <DashboardLayout title="buyer">
            <div className={`${styles.uploadCon} h-2/4 w-2/4`}>
                <div className="mt-16 flex justify-evenly text-color_pink">
                    <div>
                        <p className="text-8xl"><HiOutlineBuildingOffice2 />
                        </p>
                        <p className="text-justify font-extrabold">COMPANIES</p>
                    </div>
                    <div>
                        <p className="text-8xl"><BsFillPersonFill />
                        </p>
                        <p className="text-center font-extrabold">BUYER</p>
                    </div>
                </div>
            </div>

        </DashboardLayout >
    );
}

Home.auth = {
    adminOnly: true
}

export default Home
