import React from 'react'
import {FaSuitcase,FaBuilding,FaUsers,FaUserPlus} from "react-icons/fa"


const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className='heroSection'>
      <div className="container">
        <div className="title">
           <h1>Find a best job for you</h1>
           <h1>Your intrest and Skill</h1>
           <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. In excepturi labore consequuntur fuga quaerat modi odio impedit placeat obcaecati molestiae? Eaque fuga numquam ad commodi non modi quidem libero distinctio enim deserunt, expedita quasi laboriosam officiis facilis excepturi deleniti obcaecati illo exercitationem sunt in repudiandae voluptates repellat similique vel? Non!
           </p>
        </div>
        <div className="image">
          <img src="/Jobs.jpg" alt="hero"/>
        </div>
      </div>
       <div className="details">
         {details.map(element=>{
           return(
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="content">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
           )
         })}
       </div>
    </div>
  )
}

export default HeroSection
