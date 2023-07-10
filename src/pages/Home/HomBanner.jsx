import React from "react";
import { Link } from "react-router-dom";
import routes from "../../configs/routes";

function HomBanner() {
    return (
        <div className="home-banner my-6">
            <div className="home-banner-link">
                <div className="home-banner-content">
                    <h4 className="content-title">new inspiration 2020</h4>
                    <div className="content-sale">20% off on new season</div>
                    <Link to={routes.shop} className="content-btn">
                        <button className="btn-primary btn-italic">
                            Browse collections
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomBanner;
