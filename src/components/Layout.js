import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="fixed top-0 left-0 w-full h-[124px] ">
         
            <nav className="flex items-center space-x-4 ml-custom-left">
                <Link className="nav_link font-bold text-main-color mt-10" to="/beauty">
                    피부 미용
                </Link>
                <Link className="nav_link font-bold mt-10 text-main-color" to="/health">
                    헬스
                </Link>
                <Link className="nav_link font-bold mt-10  text-main-color" to="/nutrients">
                    영양제
                </Link>
            </nav>


            <div className="header_login relative ml-[1050px] mt-[-27px]">
                <button className="button_nickname  text-main-color border border-main-color rounded px-2 py-2 ">로그인</button>
            
            </div>
            
        </header>
    );
}

export default Header;
