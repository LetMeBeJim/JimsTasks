import {useEffect, useState} from 'react'

export default function Data() {
    const [backendData, setBackendData] = useState(null)
    useEffect(() => {

    fetch("http://localhost:3000/api").then(
        response => response.json()
    )
    .then(
        data => {
            setBackendData(data)
        }
    )
    }, [])
    return backendData;
}