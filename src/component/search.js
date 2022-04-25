import React, { useState } from "react";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Search(props) {
    const [innerSearch, setInnerSearch] = useState("");
    console.log(innerSearch);
    return (
        <DropdownButton
            title={innerSearch === "" ? 'Select' : innerSearch}>
            {props.allTitles.map((title) => (
                <Dropdown.Item
                    eventKey={title}
                    onClick={(event) => {
                        setInnerSearch(event.target.textContent);
                        props.onSubmit(event.target.textContent);
                    }}>
                    {title}
                </Dropdown.Item>
            ))
            }
        </DropdownButton>

    )

}