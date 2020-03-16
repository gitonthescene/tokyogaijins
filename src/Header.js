import React from 'react';
//import {baseurl as BASEURL} from './config.json';

const Header = () => {

  // Sadly browser specific logic
  const isFirefox = typeof InstallTrigger !== 'undefined';
  const maxWidth = isFirefox ? "-moz-available" : "-webkit-fill-available";
  return (
    <>
    <div className="top-header-flag"></div>
      <div style={{width:"80%", marginLeft:"auto", marginRight:"auto"}}>
      <div id="topmenu" className="navbar navbar-fixed-top">
        <div className="container">

          <a className="brand" href="../index.php"><img src="/images/logo.png" alt="Tokyo Gaijins" style={{maxWidth:maxWidth}} /></a>
        </div>
      </div>
      <section>
        <div className="sticky">
          <div  className="navbar navbar-fixed-top">
            <div className="container">
              <div className="col17">
                <div className=" nav-menu" style={{zIndex:4}}>
                  <nav className="clearfix">
                    <div className="nav-collapse">
                      <ul className="clearfix">
                        <li className=" menu"><a href="../index.php">Home</a></li>

                        <li className=" menu" data-role='dropdown'><a href="../upcoming.php">Upcoming <b className="caret"></b></a>
                          <ul>
                            <li><a href="../upcoming.php" >JANUARY</a></li>
                            <li><a href="../upcoming-february.php" >FEBRUARY</a></li>
                            <li><a href="../upcoming-march.php" >MARCH</a></li>
                            <li><a href="../upcoming-april.php" >APRIL</a></li>
                            <li><a href="../upcoming-may.php" >MAY</a></li>
                          </ul>
                        </li>

                        <li className=" menu" data-role='dropdown'><a href="/">Events <b className="caret"></b></a>
                          <ul>
                            <li><a href="../ski-snowboard.php">Skiing/Snowboarding</a></li>
                            <li><a href="../fuji-hikes.php">Mt. Fuji Hikes</a></li>
                            <li><a href="../island-adventures.php">Island Adventures</a></li>
                            <li><a href="../kayaking-rafting.php">Kayaking & Rafting</a></li>
                            <li><a href="../salsa.php">Salsa Party</a></li>
                            <li><a href="../basketball.php">Basketball</a></li>
                            <li><a href="../volleyball.php">Volleyball</a></li>
                          </ul>
                        </li>
                        <li className="menu"><a href="../reservations">Reserve</a></li>
                        <li className="menu"><a href="/">Gallery <b className="caret"></b></a>
                          <ul>
                            <li><a href="../photos.php">Photos</a></li>
                            <li><a href="../videos.php">Videos</a></li>
                          </ul>
                        </li>
                        <li className="menu"><a href="../membership.php">Membership</a></li>
                        <li className="menu"><a href="../contact.php">Contact</a></li>
                      </ul>

                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    </div>
    </>

  );
};

export default Header;
