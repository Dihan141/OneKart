import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import "../style/Home.css"

function Home() {
    const [loggedInUser, setLoggedInUser] = useState(null)

    const [data, setData] = useState([])
    const [topsellingProductData, setTopsellingProductData] = useState(null)

    const getUserData = async () => {
        const res = await axios.get("/products/", {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data.status === 201) {
            console.log("data get");
            setData(res.data.data)

        } else {
            console.log("error")
        }
    }

    const getTopSellingProducts = async () => {
        await axios.get("/products/topselling/").then(
            (response)=>{
                setTopsellingProductData(response.data.data)
            }
        ).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        const user = localStorage.getItem("loggedInUser")
        if(user){
            setLoggedInUser(user)
        }
    },[])

    useEffect(() => {
      getUserData()
      getTopSellingProducts()
  }, [])

  return (
    <>
    <div className="text-box">
      <h1>This is the homepage</h1>
      <h2>Top selling products</h2>
    </div>
      <div className = "top-container">
        {loggedInUser && <p>Welcome, {loggedInUser}!</p>}
        
        {topsellingProductData &&
          topsellingProductData.length>0?topsellingProductData.map((el, i) => {
            return (
                <>
                <Link to={`/product/${el.id}`}>
                  <div className = "top-selling">
                    <img src={`http://localhost:5000/uploads/${el.image}`} alt='bla bla bla' style={{width:'400px', height:'400px'}}/>
                    <p>{el.name}</p>
                    <p>{el.description}</p>
                  </div>
                </Link>
                </>
            )
        }) : ""
        }
      </div>
        <div className="text-box">
          <h2>All products</h2>
        </div>
      <div className="all-container">
        {data &&
          data.length>0?data.map((el, i) => {
            return (
                <>
                <Link to={`/product/${el.id}`}>
                  <div className = "all-products">
                    <img src={`http://localhost:5000/uploads/${el.image}`} alt='bla bla bla' style={{width:'400px', height:'400px'}}/>
                    <p>{el.name}</p>
                    <p>{el.description}</p>
                  </div>
                </Link>
                </>
            )
        }) : ""
        }
      </div>
    </>
  )
}

export default Home