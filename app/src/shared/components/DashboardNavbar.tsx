import HomeIcon from "./icons/Home";
import ProfilePicture from "./ProfilePicture";

function DashboardNavbar() {
    return (
        <div className="w-max flex flex-col gap-3 items-center bg-gray-100 h-screen py-2 px-3">
            <div className="flex flex-col">
                <ProfilePicture className="w-6 h-6 rounded-md bg-gray-950" />
            </div>
            
            <HomeIcon className="fill-gray-950 w-5 h-5" />
        </div>
    )
}

export default DashboardNavbar;