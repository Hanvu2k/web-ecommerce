import React from "react";

import "../../css/footer.scss"; // Importing the footer styling
import FooterItem from "./FooterItem"; // Importing the FooterItem component

function Footer() {
    // footer data
    const footerInfos = [
        {
            title: "CUSTOMER SERVICES",
            subItem: [
                "Help & Contact Us",
                "Retuns & Refunds",
                "Online Stores",
                "Terms & Conditions",
            ],
        },
        {
            title: "COMPANY",
            subItem: [
                "What We Do",
                "Available Services",
                "Latest Post",
                "FAQs",
            ],
        },
        {
            title: "SOCIAL MEDIA",
            subItem: ["Twitter", "Instagram", "Facebook", "Pinterest"],
        },
    ];

    return (
        <div className="footer-container">
            <div className="footer-content container py-6 d-flex justify-content-between">
                {footerInfos.map((item, index) => {
                    return (
                        <div key={index} className="footer-item my-6">
                            <FooterItem
                                title={item.title}
                                subItem={item.subItem}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Footer;
