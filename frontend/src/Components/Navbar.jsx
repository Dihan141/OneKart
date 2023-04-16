import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Navbar({user, role}) {
    const history = useNavigate()
    const Logout = ()=>{
        axios.post("users/logout").then(
            (response)=>{
                if(response.data.msg === "Logged out"){
                    localStorage.clear()
                    user = ''
                    history("/")
                    window.location.reload()
                }
            }
        ).catch((error)=>{
            console.log("Error logging out")
        })
    }
    let show = ''
    if(user){
        if(role === 'manager'){
            show = (
                <ul>
                    <li>
                        <Link to="/home-manager">Home</Link>
                    </li>
                    <li><Link>{user}</Link></li>
                    <li>
                        <Link to="/upload">upload</Link>
                    </li>
                    <li onClick={Logout}><Link>Logout</Link></li>
                </ul>
            )
        }
        else{
            show =(
                <ul>
                    <>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li><Link>{user}</Link></li>
                        <li onClick={Logout}><Link>Logout</Link></li>
                    </>
                </ul>
            )
        }
    }
    else{
        show = (
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
            </ul>
        )
    }
  return (
    <nav>
        {show}
    </nav>
  )
}

export default Navbar