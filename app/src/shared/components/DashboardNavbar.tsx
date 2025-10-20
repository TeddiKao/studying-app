import HomeIcon from "./icons/Home";

function DashboardNavbar() {
    return (
        <div className="w-max flex flex-col gap-3 items-center bg-gray-100 h-screen py-2 px-3">
            <HomeIcon className="fill-gray-950 w-5 h-5" />
        </div>
    )
}

export default DashboardNavbar;