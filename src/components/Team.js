// src/components/Team.js
import React from "react";

function Team() {
  const teamMembers = [
    {
      name: "Farmer 1",
      designation: "Organic Specialist",
      image: "/img/team-1.jpg",
      socials: {
        twitter: "https://twitter.com/",
        facebook: "https://facebook.com/",
        linkedin: "https://linkedin.com/",
        youtube: "https://youtube.com/",
      },
    },
    {
      name: "Farmer 2",
      designation: "Crop Expert",
      image: "/img/team-2.jpg",
      socials: {
        twitter: "https://twitter.com/",
        facebook: "https://facebook.com/",
        linkedin: "https://linkedin.com/",
        youtube: "https://youtube.com/",
      },
    },
    {
      name: "Farmer 3",
      designation: "Livestock Manager",
      image: "/img/team-3.jpg",
      socials: {
        twitter: "https://twitter.com/",
        facebook: "https://facebook.com/",
        linkedin: "https://linkedin.com/",
        youtube: "https://youtube.com/",
      },
    },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="mx-auto text-center mb-5" style={{ maxWidth: "500px" }}>
          <h6 className="text-primary text-uppercase">The Team</h6>
          <h1 className="display-5">We Are Professional Organic Farmers</h1>
        </div>

        <div className="row g-5">
          {teamMembers.map((member, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="row g-0">
                <div className="col-10">
                  <div className="position-relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="img-fluid w-100"
                    />
                    <div
                      className="position-absolute start-0 bottom-0 w-100 py-3 px-4"
                      style={{ background: "#285430" }}
                    >
                      <h4 className="text-white">{member.name}</h4>
                      <span className="text-white">{member.designation}</span>
                    </div>
                  </div>
                </div>

                <div className="col-2">
                  <div className="h-100 d-flex flex-column align-items-center justify-content-around bg-secondary py-5">
                    <a
                      className="btn btn-square rounded-circle bg-white"
                      href={member.socials.twitter}
                    >
                      <i className="fab fa-twitter text-secondary"></i>
                    </a>
                    <a
                      className="btn btn-square rounded-circle bg-white"
                      href={member.socials.facebook}
                    >
                      <i className="fab fa-facebook-f text-secondary"></i>
                    </a>
                    <a
                      className="btn btn-square rounded-circle bg-white"
                      href={member.socials.linkedin}
                    >
                      <i className="fab fa-linkedin-in text-secondary"></i>
                    </a>
                    <a
                      className="btn btn-square rounded-circle bg-white"
                      href={member.socials.youtube}
                    >
                      <i className="fab fa-youtube text-secondary"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
