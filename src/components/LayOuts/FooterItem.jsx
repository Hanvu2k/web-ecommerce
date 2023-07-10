import React from "react";

const FooterItem = ({ title, subItem }) => {
    return (
        <>
            <h2 className="footer-title mb-4">{title}</h2>
            {subItem.map((item, index) => {
                return (
                    <div key={index} className="footer-subItem">
                        <div className="subItem-content my-2">{item}</div>
                    </div>
                );
            })}
        </>
    );
};

export default FooterItem;
