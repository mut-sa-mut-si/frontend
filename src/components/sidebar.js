import React from "react";
import sideWrite from '../assets/img/side_write.png';
import sideSearch from '../assets/img/side_search.png';
import sidetoUp from '../assets/img/side_toup.png';

function Sidebar() {
    const MoveTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="fixed ml-[1185px] mt-[400px]">
            <div>
                <button className="w-12 h-12 mt-4">
                    <img src={sideWrite} alt="sideWrite" />
                </button>
            </div>

            <div>
                <button className="w-12 h-12 mt-4">
                    <img src={sideSearch} alt="sideSearch" />
                </button>
            </div>

            <div>
                <button className="w-12 h-12 mt-4" onClick={MoveTop}>
                    <img src={sidetoUp} alt="sidetoUP" />
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
