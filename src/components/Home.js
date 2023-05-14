import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"
// import kart1 from "../../Assets/adv-aseets/kart-1.png";

export default function Home() {
    
    return(
        <div className="homepage">
           <strong><p className="text-home">Teknolojik Yemekler</p></strong>
            <h1 className="title">YAZDIKÇA DOYURAN PİZZA</h1>
            <Link to='/order'><button className="my-button">BENİ DOYUR</button></Link>
            {/* <img src={kart1} className="position"></img> */}
        </div>
    )
}