import React from "react";
import { SetStateAction } from "react";

import "./App.css";
import PokemonDashboard from "./components/PokemonDashboard";
import { PokemonResultProvider } from "./providers/PokemonResultProvider";
import { Withloading } from "./components/WithLoading";
import Test from "./components/Test";
import WithLoadingFix from "./components/WithLoadingFix";
import { Route, Routes } from "react-router-dom";
import { PokemonDetail } from "./components/PokemonDetail";

interface AdditionalProps {
    someProp: string;
    anotherProp: number;
}

interface LoadingProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}

function App() {
    // const PokemonDashboardWithLoadingAndProps = Withloading<AdditionalProps>(PokemonDashboard);
    // const TestWithLoadingAndProps = Withloading(Test);
    // const PokemonDashboardWithLoadingFix = WithLoadingFix(PokemonDashboard);
    // const TestWithLoadingFix = WithLoadingFix(Test);

    return (
        <div className="App">
            <header className="App-header">
                <PokemonResultProvider>
                    <Routes>
                        {/* <PokemonDashboardWithLoadingFix />
                    <TestWithLoadingFix /> */}
                        <Route path="/" element={<PokemonDashboard />} />
                        <Route path="/:name" element={<PokemonDetail pokemon={{}} />} />
                    </Routes>
                </PokemonResultProvider>
            </header>
        </div>
    );
}

export default App;
