export default function Header() {
  return (
    <header className="sw-header fixed-top animation">
      <div className="container-fluid">
        <div className="menu-header">
          <div className="menu-logo">
            <div className="desktop-logo">
              <a className="nav-brand" href="/">
                <img src="/assets/images/logo.png" alt="Logo" className="sw-logo logo-dark" />
              </a>
            </div>
          </div>
          <div className="sw-nav">
            <nav className="navbar navbar-expand-lg">
              <ul className="navbar-nav d-flex flex-row">
                <li className="nav-item active"> <a className="nav-link" href="/">Home</a> </li>
                <li className="nav-item"> <a className="nav-link" href="/about-us">About Us</a> </li>
                <li className="nav-item"> <a className="nav-link" href="#">Investor Corner</a> </li>
                <li className="nav-item"> <a className="nav-link" href="#">Our Productsss</a> </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside">Prespectives</a>
                  <ul className="dropdown-menu signledropdown">
                      <li><a className="dd-item" href="#">Blogs</a></li>
                      <li><a className="dd-item" href="#">Stakeholders Letter</a></li>
                      <li><a className="dd-item" href="#">Media</a></li>
                      <li><a className="dd-item" href="#">Weekend Reading</a></li>
                  </ul>
                </li> 
              </ul>
            </nav>
          </div>
          <div className="sw-nav-cta">
            <ul className="sw-menu-sw-set d-flex align-items-center list-unstyled gap-3">
              <li><a href="#" className="onboard">Direct Onboarding</a></li>
              <li><button className="client-button"><span>Client Login</span></button></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}