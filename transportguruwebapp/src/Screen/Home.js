import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const nav = useNavigate()
    React.useEffect(() => {
        const data = localStorage.getItem("@token");
        (!data) && nav('/', { replace: true })
    }, [nav])
    return (
        <div>Home</div>
    )
}
export default Home
