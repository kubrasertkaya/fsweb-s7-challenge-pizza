import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"
export default function Home() {
    return(
        <div className="homepage">
            <p>Teknolojik Yemekler</p>
            <h1>YAZDIKÇA DOYURAN PİZZA</h1>
            <Link to='/order'><button>BENİ DOYUR</button></Link>
            <img src={'../../Assets/mvp-banner.png'}></img>
        </div>
    )
}