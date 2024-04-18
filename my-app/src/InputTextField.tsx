import React from "react";
import { useField } from "formik";

interface InputTextFieldProps {
    userProfileValue: string;
    userProfileKey: string;
    inputLabel: string;
    handleChangeUserProfile: (userProfileKey: string, userProfileValue: string) => void;
}

// DESTRUCTURE PARAMETER
const InputTextField: React.FC<InputTextFieldProps> = ({
    userProfileKey,
    userProfileValue,
    inputLabel,
    handleChangeUserProfile,
}) => {
    // INI BUAT TRIGGER FUNCTION BAWAAN FORMIKNYA
    const [field, meta] = useField(userProfileKey);
    //ini function tambahan untuk handle case tsb
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // ini juga dari dokumentasinya formik, biar konek antara state kita sama valuesnya formik
        field.onChange(e);
        // ini itu function yg gua lempar dari App.tsx, bisa check functionnya disono. Functionnya cuma mengupdate state
        handleChangeUserProfile(userProfileKey, e.target.value);
    };

    return (
        // KONSEP KOMPONENT DARI REACT ADALAH, SETIAP KOMPONENT HANYA BOLEH MERETURN SATU ELEMENT
        // KITA BISA MENGGUNAKAN YANG NAMANYA REACT FRAGMENT
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "2vw" }}>
            <label>{inputLabel}</label>

            {/* INI DARI DOCUMENTATIONNYA FORMIK, JADI BIAR KONEK SAMA FORMIK, DIA HARUS PAKE SYNTAX DIBAWAH INI */}
            <input
                style={{ marginTop: "1vw" }}
                {...field}
                value={userProfileValue}
                type="text"
                onChange={(e) => handleChange(e)}
            />

            {/* <input
                value={userProfileValue}
                type="text"
                id={userProfileKey}
                name={userProfileKey}
                onChange={(e) => handleChangeUserProfile(userProfileKey, e.target.value)}
            /> */}
            {/* INI UNTUK NUNJUKKIN ERROR DARI VALIDASINYA */}
            {meta.error ? <div className="error">{meta.error}</div> : null}
        </div>
    );
};

export default InputTextField;
