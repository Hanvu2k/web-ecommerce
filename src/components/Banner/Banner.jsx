import React from "react";

// Importing the banner styling
import "../../css/banner.scss";

function Banner({ title, path }) {
    return (
        <div className="banner-wrapper my-6">
            <div className="banner-content d-flex justify-content-between">
                <div className="banner-title-main">{title}</div>
                <div className="banner-title-sub">
                    {path ? (
                        <>
                            {path} <span>Checkout</span>
                        </>
                    ) : (
                        title
                    )}
                </div>
            </div>
        </div>
    );
}

export default Banner;
