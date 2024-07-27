import React from 'react'
import {FaUserPlus} from 'react-icons/fa'
import {MdFindInPage} from 'react-icons/md'
import {IoMdSend} from 'react-icons/io'
import {Link} from "react-router-dom"


const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>How Job Board Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus/>
            {/* <p>Create Account</p> */}
          <p> <Link to={'/register'} onClick={()=>setShow(false)}>Create Account</Link></p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quasi possimus veritatis sapiente impedit dolore laborum suscipit, quisquam voluptatibus saepe esse consequatur temporibus, similique ad delectus maiores exercitationem officia? Mollitia.</p>
          </div>
          <div className="card">
            <MdFindInPage/>
            {/* <p>Find a Job</p> */}
            <p> <Link to={'/job/getall'} onClick={()=>setShow(false)}>Find a Job</Link></p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quasi possimus veritatis sapiente impedit dolore laborum suscipit, quisquam voluptatibus saepe esse consequatur temporibus, similique ad delectus maiores exercitationem officia? Mollitia.</p>
          </div>
          <div className="card">
            <IoMdSend/>
            <p>Create Account</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quasi possimus veritatis sapiente impedit dolore laborum suscipit, quisquam voluptatibus saepe esse consequatur temporibus, similique ad delectus maiores exercitationem officia? Mollitia.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks