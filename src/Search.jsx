import {
  faBuilding,
  faCake,
  faHashtag,
  faLink,
  faLinkSlash,
  faLocation,
  faLocationArrow,
  faLocationPin,
  faLocationPinLock,
  faSearch,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

function Search() {
  const inputReference = useRef();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // useEffect has to be used in the main process, it runs the code one time in the beginning of the code
    fetchUser("octocat");
  }, []);

  const fetchUser = (username) => {
    setLoading(true);
    setUserData(null); // clears old data while fetching new user

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        // if you do not do this, the reponse will continue as normal even if there is no user, and the trigger of no user found in the return statement will not be triggered
        if (!res.ok) {
          throw new Error("user not found");
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setUserData(null);
      })
      .finally(() => setLoading(false)); // we use finally to indecate the end of the fetching
  };

  const searchFunction = () => {
    const username = inputReference.current.value;

    if (username) {
      fetchUser(username);
    }
  };

  return (
    <>
      <div className="search">
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        <input
          type="text"
          ref={inputReference}
          placeholder="Search GitHub username..."
        />
        <button onClick={searchFunction}>Search</button>
      </div>

      <div id="userContainer">
        {/* do not use any semicolons inside the jsx  */}
        {loading && <div className="loading">loading user data...</div>}

        {!loading && userData === null && (
          <div className="noData">No Data is available for this user.</div>
        )}

        {!loading && userData && (
          <>
            <img src={userData.avatar_url} alt="Avatar of User" />
            <section className="userData">
              <header>
                <h1>{userData.name || "no name found"}</h1>
                <p>
                  Joined{" "}
                  {new Date(userData.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </header>
              <div className="innerData">
                <a
                  className="githubLink"
                  href={userData.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{userData.login}
                </a>
                <p className="bio">
                  {userData.bio || "This profile has no bio"}
                </p>

                <div className="accountData">
                  <div className="bundle">
                    <h3>Repos</h3>
                    <p>{userData.public_repos ?? "Number not provided"}</p>
                  </div>
                  <div className="bundle">
                    <h3>Followers</h3>
                    <p>
                      {userData.followers ??
                        "Number of followers is not provided"}
                    </p>
                  </div>
                  <div className="bundle">
                    <h3>Following</h3>
                    <p>
                      {userData.following ??
                        "Number of followed accounts is not provided"}
                    </p>
                  </div>
                </div>

                <div className="links">
                  <div className="location">
                    <FontAwesomeIcon icon={faLocationPin}></FontAwesomeIcon>
                    {userData.location || "Not Available"}
                  </div>
                  <div className="twitter">
                    <FontAwesomeIcon icon={faHashtag} />
                    {userData.twitter_username || "Not Available"}
                  </div>
                  <div className="link">
                    <FontAwesomeIcon icon={faLink}></FontAwesomeIcon>
                    {userData.blog ? (
                      <a href={userData.blog} target="_blank" rel="noreferrer">
                        {userData.blog}
                      </a>
                    ) : (
                      "Not Available"
                    )}
                  </div>
                  <div className="company">
                    <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
                    {userData.company || "Not Available"}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default Search;

//  {
//   "login": "octocat",
//   "id": 1,
//   "node_id": "MDQ6VXNlcjE=",
//   "avatar_url": "https://github.com/images/error/octocat_happy.gif",
//   "gravatar_id": "",
//   "url": "https://api.github.com/users/octocat",
//   "html_url": "https://github.com/octocat",
//   "followers_url": "https://api.github.com/users/octocat/followers",
//   "following_url": "https://api.github.com/users/octocat/following{/other_user}",
//   "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
//   "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
//   "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
//   "organizations_url": "https://api.github.com/users/octocat/orgs",
//   "repos_url": "https://api.github.com/users/octocat/repos",
//   "events_url": "https://api.github.com/users/octocat/events{/privacy}",
//   "received_events_url": "https://api.github.com/users/octocat/received_events",
//   "type": "User",
//   "site_admin": false,
//   "name": "monalisa octocat",
//   "company": "GitHub",
//   "blog": "https://github.com/blog",
//   "location": "San Francisco",
//   "email": "octocat@github.com",
//   "hireable": false,
//   "bio": "There once was...",
//   "twitter_username": "monatheoctocat",
//   "public_repos": 2,
//   "public_gists": 1,
//   "followers": 20,
//   "following": 0,
//   "created_at": "2008-01-14T04:33:35Z",
//   "updated_at": "2008-01-14T04:33:35Z"
// }
