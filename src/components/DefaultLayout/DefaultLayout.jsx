import React from "react"
import HeaderComponent from "../HeaderComponent/HeaderComponent"
import FooterComponent from "../FooterComponent/FooterComponent"
import { Outlet } from "react-router-dom";

//Chứa header, Footer và các thành phần con khác
const DefaultLayout = () => {
    return (
        <>
            <HeaderComponent />
            <Outlet /> {/* Nội dung trang con sẽ hiển thị tại đây */}
            <FooterComponent />
        </>
    )
}
export default DefaultLayout