import {useState} from "react";

export const InputSynchronization = () => {
    const [value, setValue] = useState("text in the input")

    return (
        <div>
            <h1>{value}</h1>
            <input
                type="text"
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
            />
        </div>
    )
}