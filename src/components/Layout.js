import React from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/img/logo.png';
import  './Layout.css';
function Header() {
    return (
        <div className="flex items-center justify-center">
            <header className="relative w-[512px] h-[92px]">
            <div className="absolute inset-0 flex items-center justify-center mb-[30px]">
                    <img src={Logo} alt="Logo"  /> 
                </div>
                <nav className="absolute top-[69px] left-0 right-0 flex justify-center gap-10">
                    <Link className="nav_link font-bold text-[15px]" to="/beauty">
                        피부 미용
                    </Link>
                    <Link className="nav_link font-bold text-[15px]" to="/health">
                        헬스
                    </Link>
                    <Link className="nav_link font-bold text-[15px]" to="/nutrients">
                        영양제
                    </Link>
                </nav>

                
            </header>
        </div>
    );
}


export default Header;
