import React, { useState } from "react";
import "./App.css";
import InputTextField from "./InputTextField";
import { Formik, Form } from "formik";
import InputDateField from "./InputDateField";
import * as Yup from "yup";

interface FullUserProfile {
    fullName: string;
    email: string;
    dob: string;
    address: string;
    zipcode: string;
}

function minimumDate(year: number) {
    let currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - year);
    return currentDate.toISOString().split("T")[0];
}
// INI VALIDASI UNTUK FIRST PAGE
const FirstPageSchema = Yup.object().shape({
    fullName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    dob: Yup.date()
        .required("Date of birth is required")
        .max(new Date(), "Date of birth cannot be in the future")
        //DISINI KITA BIKIN VALIDASI CUSTOM, MAKANYA KITA MAKE YG .test
        .test("is-old-enough", "You must be at least 17 years old", function (value) {
            const minAgeDate = new Date();
            minAgeDate.setFullYear(minAgeDate.getFullYear() - 17);
            return value <= minAgeDate;
        }),
});

// INI VALIDASI UNTUK SECOND PAGE
const SecondPageSchema = Yup.object().shape({
    address: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    zipcode: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
});

function App() {
    const [userProfile, setUserProfile] = useState<FullUserProfile>({
        fullName: "",
        email: "",
        address: "",
        zipcode: "",
        // YYYY-MM-DD
        dob: minimumDate(17),
    });

    const [page, setPage] = useState<string>("firstPage");
    function handleChangeUserProfile(userProfileKey: string, userProfileValue: string) {
        setUserProfile((oldProfile) => {
            // GUNAKAN SPREADING OPERATOR
            return { ...oldProfile, [userProfileKey]: userProfileValue };
        });
    }
    return (
        <div className="App">
            <header className="App-header">
                {page === "firstPage" && (
                    <Formik
                        initialValues={{
                            fullName: userProfile.fullName,
                            email: userProfile.email,
                            dob: userProfile.dob,
                        }}
                        // validate={(values) => {
                        //     // INI ADALAH VALIDASI YG PAKE MANUAL GAPAKE YUP
                        //     // DISNI KITA BIKIN SEBUAH VARIABLE ERRORS YG BERUBAH OBJEK KOSONG
                        //     // kenapa syntaxnya pake tanda tanya? itu menandakan bagwa key email dan key fullName itu opsional

                        //     const errors: { email?: string; fullName?: string } = {};
                        //     if (!values.email) {
                        //         errors.email = "Required";
                        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        //         errors.email = "Invalid email address";
                        //     }
                        //     if (!values.fullName) {
                        //         errors.fullName = "Required";
                        //     } else if (values.fullName.length > 10) {
                        //         errors.fullName = "Too Long";
                        //     }
                        //     return errors;
                        // }}
                        validationSchema={FirstPageSchema}
                        onSubmit={(values) => {
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
                                <InputDateField
                                    userProfileKey="dob"
                                    userProfileValue={userProfile.dob}
                                    inputLabel="Input Date of Birth"
                                    handleChangeUserProfile={handleChangeUserProfile}
                                />

                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm"
                                    type="submit"
                                >
                                    Next
                                </button>
                            </div>
                        </Form>
                    </Formik>
                )}
                {page === "secondPage" && (
                    <Formik
                        initialValues={{
                            address: userProfile.address,
                            zipcode: userProfile.zipcode,
                        }}
                        // validate={(values) => {
                        //     // INI ADALAH VALIDASI YG PAKE MANUAL GAPAKE YUP
                        //     // DISNI KITA BIKIN SEBUAH VARIABLE ERRORS YG BERUBAH OBJEK KOSONG
                        //     // kenapa syntaxnya pake tanda tanya? itu menandakan bagwa key email dan key fullName itu opsional

                        //     const errors: { email?: string; fullName?: string } = {};
                        //     if (!values.email) {
                        //         errors.email = "Required";
                        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        //         errors.email = "Invalid email address";
                        //     }
                        //     if (!values.fullName) {
                        //         errors.fullName = "Required";
                        //     } else if (values.fullName.length > 10) {
                        //         errors.fullName = "Too Long";
                        //     }
                        //     return errors;
                        // }}
                        validationSchema={SecondPageSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            setPage("secondPage");
                        }}
                    >
                        <Form>
                            <div id="div-for-first-page">
                                <InputTextField
                                    userProfileKey="address"
                                    userProfileValue={userProfile.address}
                                    inputLabel="Input Address"
                                    // Function yg gua kirim disini, itu tidak diinvoke
                                    handleChangeUserProfile={handleChangeUserProfile}
                                />
                                <InputTextField
                                    userProfileKey="zipcode"
                                    userProfileValue={userProfile.zipcode}
                                    inputLabel="Input Zipcode"
                                    handleChangeUserProfile={handleChangeUserProfile}
                                />

                                <button
                                    className="mr-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm"
                                    type="button"
                                    onClick={(e) => setPage("firstPage")}
                                >
                                    Back
                                </button>
                                <button
                                    className="ml-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </Formik>
                )}
            </header>
        </div>
    );
}

export default App;
