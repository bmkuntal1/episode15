import React from 'react'

export const Contact = () => {
    const masters: any = [
        {
            id: "r1",
            description: "Chemical Tank Lavel",
            range: "Ok",
            index: 0,
            Category: "DA Chemical",
        },
        {
            id: "r2",
            description: "Chemical Tank Lavel 1",
            range: "Ok",
            index: 0,
            Category: "DA Chemical",
        },
        {
            id: "r3",
            description: "Chemical Tank Lavel 2",
            range: "Ok",
            index: 0,
            Category: "DA Chemical",

        },
        {
            id: "r4",
            description: "Chemical Tank Lavel 2",
            range: "Ok",
            index: 0,
            Category: "DA Chemical",

        }
    ]

    const time: any = [
        { key: "T1", label: "6 AM" },
        { key: "T2", label: "8 AM" },
        { key: "T3", label: "10 AM" },
        { key: "T4", label: "12 PM" },
        { key: "T5", label: "02 PM" },
    ]

    let formData: any = {};

    const submitForm = () => {

        console.log(formData);

        const groupBy = (items: any, key: any) => formData.reduce(
            (result: any, item: any) => ({
                ...result,
                [item[key]]: [
                    ...(result[item[key]] || []),
                    item,
                ],
            }),
            {},
        );
        console.log(groupBy);
    }
    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={submitForm}>Submit</button>
            <table border={1}>
                <tbody>
                    <tr>
                        <td rowSpan={2}>Description</td>
                        <td rowSpan={2}>Range</td>
                        <td colSpan={time.length}>Day Crew</td>
                    </tr>
                    <tr>
                        {time.map((time: any, key: any) => <td key={key}>{time.label}</td>)}
                    </tr>
                    {masters.map((entry: any, key: any) => {
                        return (
                            <tr key={key}>
                                <td>{entry.description}</td>
                                <td>{entry.range}</td>
                                {time.map((time1: any, key: any) => {
                                    const _key = entry.id + "_" + time1.key;
                                    formData[_key] = _key;

                                    return <td key={key}><input id={entry.id + time1.key} /></td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}