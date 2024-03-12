import { useEffect, useState } from "react";

export const useMessage = () => {
    // These state variables control whether or not we show
    // the success and error message sections after making
    // a network request (see JSX below).
    const [showMessage, setShowMessage] = useState(false);

    // This useEffect hook automatically hides the
    // success and error messages after 3 seconds when they're shown.
    // Just a little user interface improvement.
    useEffect(() => {
        if (showMessage) {
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    }, [showMessage]);

    return [showMessage, setShowMessage];
}