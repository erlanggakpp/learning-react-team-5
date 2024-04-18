import React from "react";

interface ButtonComponentProps {
    buttonText: string;
    // changeName: () => void;
    addElementToArray: () => void;
}
//react fc ini untuk menandakan bahwan function yg kita buat adalah sebuah component react
// ini namanya object destructuring
const ButtonComponent: React.FC<ButtonComponentProps> = ({ buttonText, addElementToArray }) => {
    // escape javascript bracket\
    // saat di klik, function add element to array di invoke
    return <button onClick={(e) => addElementToArray()}>{buttonText}</button>;
};

export default ButtonComponent;
