// src/components/Team.js
import React from "react";

function Team() {
  const teamMembers = [
    {
      name: "Anubhav Patwal",
      designation: "Team Lead",
      image: "/img/team-1.jpg",
      socials: {
        linkedin: "https://linkedin.com/",
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Kshitiz Panwar",
      designation: "AI Engineer",
      image: "/img/team-2.jpg",
      socials: {
        linkedin: "https://linkedin.com/",
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Paras Badola",
      designation: "Backend Developer",
      image: "/img/team-3.jpg",
      socials: {
        linkedin: "https://linkedin.com/",
        instagram: "https://instagram.com/",
      },
    },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container">

        {/* Heading */}
        <div className="mx-auto text-center mb-5" style={{ maxWidth: "500px" }}>
          <h6 className="text-success text-uppercase">हमारी टीम</h6>
          <h1 className="display-5">KrishiAI की प्रोफेशनल टीम</h1>
        </div>

        <div className="row g-5">
          {teamMembers.map((member, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="row g-0">

                {/* Image + Name */}
                <div className="col-10">
                  <div className="position-relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="img-fluid w-100"
                    />
                    <div
                      className="position-absolute start-0 bottom-0 w-100 py-3 px-4"
                      style={{ background: "#1B5E20" }}
                    >
                      <h4 className="text-white mb-0">
                        {member.name}
                      </h4>
                      <span className="text-white">
                        {member.designation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="col-2">
                  <div className="h-100 d-flex flex-column align-items-center justify-content-around bg-light py-5">

                    <a
                      className="btn btn-square rounded-circle bg-white"
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in text-success"></i>
                    </a>

                    <a
                      className="btn btn-square rounded-circle bg-white"
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram text-success"></i>
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
