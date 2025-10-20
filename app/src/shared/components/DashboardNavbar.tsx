import HomeIcon from "./icons/Home";
import ProfilePicture from "./ProfilePicture";

function DashboardNavbar() {
    return (
        <div className="w-max flex flex-col gap-5 items-center bg-gray-100 h-screen py-3 px-4">
            <div className="flex flex-col">
                <ProfilePicture className="w-8 h-8 rounded-md bg-gray-950 hover:cursor-pointer" />
            </div>
            
            <div className="flex flex-col">
                <HomeIcon className="fill-gray-950 w-6 h-6 hover:cursor-pointer" />
            </div>
        </div>
    )
}

export default DashboardNavbar;