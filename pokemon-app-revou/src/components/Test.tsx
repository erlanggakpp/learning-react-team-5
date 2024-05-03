import React, { SetStateAction } from "react";

interface TestProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

function Test({ isLoading, setIsLoading }: TestProps) {
    console.log(isLoading);

    return <h1>TEST</h1>;
}

export default Test;
