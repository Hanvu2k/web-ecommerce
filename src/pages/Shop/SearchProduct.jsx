import React, { Fragment } from "react";

function SearchProduct(props) {
    const { searchProduct, softProductHandler, selectedOption } = props;

    // Option data
    const optionsArr = [
        { value: "iphone", name: "Iphone" },
        { value: "ipad", name: "Ipad" },
        { value: "macbook", name: "Macbook" },
        { value: "airpod", name: "Airpod" },
        { value: "watch", name: "Watch" },
        { value: "mouse", name: "Mouse" },
        { value: "keyboard", name: "Keyboard" },
    ];

    return (
        <div className="search-product d-flex justify-content-between">
            <div className="search-by-key">
                <input
                    type="text"
                    placeholder="Enter Search Here!"
                    onChange={(event) => searchProduct(event.target.value)}
                />
            </div>
            <div className="search-by-select">
                <select
                    value={selectedOption}
                    onChange={(event) => softProductHandler(event.target.value)}
                >
                    <option defaultValue>Default sorting</option>
                    {optionsArr.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <option value={item.value}>{item.name}</option>
                            </Fragment>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}

export default SearchProduct;
