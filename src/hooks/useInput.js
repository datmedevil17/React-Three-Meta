import { useEffect, useState } from "react";

export const useInput = () => {
    const [input, setInput] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        shift: false,
        dance: false
    });

    const keys = {
        KeyW: "forward",
        KeyS: "backward",
        KeyA: "left",
        KeyD: "right",
        ShiftLeft: "shift",
        Space: "dance"
    };

    const findKey = (key) => keys[key];

    useEffect(() => {
        const handleKeyDown = (event) => {
            const action = findKey(event.code);
            if (action) {
                setInput((prev) => ({ ...prev, [action]: true }));
            }
        };

        const handleKeyUp = (event) => {
            const action = findKey(event.code);
            if (action) {
                setInput((prev) => ({ ...prev, [action]: false }));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return input;
};
