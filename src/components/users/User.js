import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";

const User = ({ user, loading, getUserAndRepos, repos }) => {
  const params = useParams();
  useEffect(() => {
    getUserAndRepos(params.login);
  }, [getUserAndRepos, params.login]);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    company,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <Link to="/" className="btn btn-light">
          Back
        </Link>
        Hireable:{" "}
        {hireable ? (
          <i className="fas fa-check text-success"></i>
        ) : (
          <i className="fas fa-times-circle text-danger"></i>
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              className="round-img"
              alt=""
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            {location ? <p>Location: {location}</p> : null}
          </div>
          <div>
            {bio ? (
              <>
                <h3>Bio</h3>
                <p>{bio}</p>
              </>
            ) : null}
            <a href={html_url} className="btn btn-dark my-1">
              Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <p>
                    <strong>Username: </strong> {login}
                  </p>
                )}
                {company && (
                  <p>
                    <strong>Company: </strong> {company}
                  </p>
                )}
                {blog && (
                  <p>
                    <strong>Website: </strong> {blog}
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">following: {following}</div>
          <div className="badge badge-light">Public repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos} />
      </>
    );
  }
};

export default User;
