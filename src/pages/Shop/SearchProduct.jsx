import React, { Fragment } from "react";
import { DebounceInput } from "react-debounce-input";

function SearchProduct(props) {
    const { searchKey, onSearch, softProductHandler, selectedOption } = props;

    // Option data
    const optionsArr = [
        { value: "Iphone", name: "Iphone" },
        { value: "Ipad", name: "Ipad" },
        { value: "Macbook", name: "Macbook" },
        { value: "Airpod", name: "Airpod" },
        { value: "Watch", name: "Watch" },
        { value: "Mouse", name: "Mouse" },
        { value: "Keyboard", name: "Keyboard" },
    ];

    return (
        <div className="search-product d-flex justify-content-between">
            <div className="search-by-key">
                <DebounceInput
                    placeholder="Enter Search Here!"
                    minLength={1}
                    debounceTimeout={500}
                    onChange={(event) => onSearch(event.target.value)}
                    value={searchKey}
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
