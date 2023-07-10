import React from "react";

function OtherInfo() {
    return (
        <div className="otherinfo-container my-6">
            <div className="otherinfo-top d-flex justify-content-around align-items-center">
                <div className="otherinfo-item ">
                    <div className="item-title">free shipping</div>
                    <div className="item-description">
                        Free shipping worldwide
                    </div>
                </div>
                <div className="otherinfo-item ">
                    <div className="item-title">24 X 7 service</div>
                    <div className="item-description">
                        Free shipping worldwide
                    </div>
                </div>
                <div className="otherinfo-item ">
                    <div className="item-title">festival offer</div>
                    <div className="item-description">
                        Free shipping worldwide
                    </div>
                </div>
            </div>
            <div className="otherinfo-bot d-flex justify-content-between align-items-center">
                <div className="otherinfo-item ">
                    <div className="item-title">let's be friends!</div>
                    <div className="item-description">
                        Nisi nisi tempor consequat laboris nisi
                    </div>
                </div>
                <div className="input-user d-flex  align-items-center">
                    <input
                        className="input-form"
                        type="text"
                        placeholder="Enter your email address"
                    />
                    <button className="btn-primary btn-subs">Subscribe</button>
                </div>
            </div>
        </div>
    );
}

export default OtherInfo;
