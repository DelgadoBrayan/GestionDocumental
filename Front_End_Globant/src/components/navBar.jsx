import {
    Typography,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
export const NavBar = () => {
    const styleText = "flex items-center hover:text-cyan-400 transition-colors text-2xl "

    return (
        <nav className="bg-slate-900">
            <ul className="flex  text-right gap-6 bg-gradient-to-r from-slate-300 to-slate-200">
                    <img className="w-56 h-24 mr-40" src="src/assets/logo.svg" alt="Logo"/>
                <Typography
                    as="li"
                    className="p-1 font-medium m-5 ml-96"
                >
                    <NavLink className={styleText} to='/organizador'>
                        Gestion de reportes
                    </NavLink>
                </Typography>
                <Typography
                    as="li"
                    className="p-1 font-medium m-5"
                >
                    <NavLink className={styleText} to='/gestionusuarios'>
                        Gestion de usuarios
                    </NavLink>
                </Typography>
                <Typography
                    as="li"
                    className="p-1 m-5 font-medium"
                >
                </Typography>
            </ul>
        </nav>
    );
}
