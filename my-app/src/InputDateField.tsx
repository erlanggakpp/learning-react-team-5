import React from "react";
import { useField } from "formik";

interface InputDateFieldProps {
    userProfileValue: string;
    userProfileKey: string;
    inputLabel: string;
    handleChangeUserProfile: (userProfileKey: string, userProfileValue: string) => void;
}

// DESTRUCTURE PARAMETER
const InputDateField: React.FC<InputDateFieldProps> = ({
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
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginBottom: "1vw" }}>
            <label className="text-left block text-white-700 text-sm font-bold mb-2">{inputLabel}</label>
            {/* INI DARI DOCUMENTATIONNYA FORMIK, JADI BIAR KONEK SAMA FORMIK, DIA HARUS PAKE SYNTAX DIBAWAH INI */}
            <input
                style={{ marginTop: "0.5vw" }}
                {...field}
                value={userProfileValue}
                type="date"
                className="text-sm h-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            {/* kenapa pake touched? biar validasinya jalan satu-satu dari input yg kita isi. Cobain aja kalo gapake touched biar kalian kebayang yaaa */}
            {meta.touched && meta.error ? (
                <div className="w-full flex flex-col justify-center items-center mt-1" role="alert">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-1 py-1 rounded relative text-xs w-36">
                        {meta.error}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default InputDateField;
