import React, { useState, SetStateAction } from "react";

interface IsLoadingProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

const WithLoadingFix = <P extends {}>(ChildrenComponent: React.FC<P & IsLoadingProps>): React.FC<P> => {
    const WithLoadingComponentFix: React.FC<P> = (props) => {
        const [isLoading, setIsLoading] = useState<boolean>(false);
        return <ChildrenComponent {...props} isLoading={isLoading} setIsLoading={setIsLoading} />;
    };
    // return (props: P) => {
    //     return <ChildrenComponent {...props} isLoading={isLoading} setIsLoading={setIsLoading} />;
    // };
    return WithLoadingComponentFix;
};

export default WithLoadingFix;
