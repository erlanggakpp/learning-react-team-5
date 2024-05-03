import React, { useState } from "react";

interface AdditionalProps {
    someProp?: string;
    anotherProp?: number;
}

interface LoadingProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Withloading = <P extends AdditionalProps>(WrappedComponent: React.FC<P & LoadingProps>): React.FC<P> => {
    const WithLoadingComponent: React.FC<P> = (props) => {
        const [isLoading, setIsLoading] = useState<boolean>(false);
        return <WrappedComponent {...props} isLoading={isLoading} setIsLoading={setIsLoading} />;
    };
    return WithLoadingComponent;
};
