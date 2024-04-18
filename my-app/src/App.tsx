import React, { useState } from "react";
import "./App.css";
import InputTextField from "./InputTextField";
import { Formik, Form } from "formik";

interface FirstPageForm {
    fullName: string;
    email: string;
}
interface SecondPageForm {
    occupation: string;
    hobby: string;
}

interface FullUserProfile {
    fullName: string;
    email: string;
    occupation: string;
    hobby: string;
}

function App() {
    const [userProfile, setUserProfile] = useState<FullUserProfile>({
        fullName: "",
        email: "",
        occupation: "",
        hobby: "",
    });
    const [page, setPage] = useState<string>("firstPage");
    function handleChangeUserProfile(userProfileKey: string, userProfileValue: string) {
        setUserProfile((oldProfile) => {
            // GUNAKAN SPREADING OPERATOR
            // {fullName: "", email: ""}
            // {email: "", fullName: userProfileValue}
            return { ...oldProfile, [userProfileKey]: userProfileValue };
        });
    }
    return (
        <div className="App">
            <header className="App-header">
                {/* DISINI KITA LEMPAR FUNCTIONNYA KE KOMPONENT. FUNCTION YG DILEMPAR TIDAK DIPANGGIL, KALO DIPANGGIL KAYA GINI BENTUKNYA changeName() */}
                <h1>Hello , {userProfile.fullName}!</h1>
                <h1>Your Email: {userProfile.email}</h1>
                {page === "firstPage" && (
                    <Formik
                        initialValues={{ fullName: userProfile.fullName, email: userProfile.email }}
                        validate={(values) => {
                            // INI ADALAH VALIDASI YG PAKE MANUAL GAPAKE YUP
                            // DISNI KITA BIKIN SEBUAH VARIABLE ERRORS YG BERUBAH OBJEK KOSONG
                            // kenapa syntaxnya pake tanda tanya? itu menandakan bagwa key email dan key fullName itu opsional

                            const errors: { email?: string; fullName?: string } = {};
                            if (!values.email) {
                                errors.email = "Required";
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = "Invalid email address";
                            }
                            if (!values.fullName) {
                                errors.fullName = "Required";
                            } else if (values.fullName.length > 10) {
                                errors.fullName = "Too Long";
                            }
                            return errors;
                        }}
                        onSubmit={(values) => {
                            console.log(values);
                            setPage("secondPage");
                        }}
                    >
                        <Form>
                            <div id="div-for-first-page">
                                <InputTextField
                                    userProfileKey="fullName"
                                    userProfileValue={userProfile.fullName}
                                    inputLabel="Input Full Name"
                                    // Function yg gua kirim disini, itu tidak diinvoke
                                    handleChangeUserProfile={handleChangeUserProfile}
                                />
                                <InputTextField
                                    userProfileKey="email"
                                    userProfileValue={userProfile.email}
                                    inputLabel="Input Email"
                                    handleChangeUserProfile={handleChangeUserProfile}
                                />
                                <button type="submit">Submit</button>
                            </div>
                        </Form>
                    </Formik>
                )}
            </header>
        </div>
    );
}

export default App;
