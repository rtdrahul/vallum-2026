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
                <li className="nav-item"> <a className="nav-link" href="https://www.viblo.in/public/img/uploads/pdfs/Investor_Charter_PMS.pdf">Investor Corner</a> </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside">Our Products</a>
                  <ul className="dropdown-menu signledropdown">
                    <li><a className="dd-item" href="/vallum-india-discovery">Vallum India Discovery</a></li>
                    <li><a className="dd-item" href="/vallum-multi-activa">Vallum India Multi-Activa</a></li>
                    <li><a className="dd-item d-flex align-items-center" href="/vallum-jan-principle">Vallum <img
                      src="https://www.viblo.in/public/img/uploads/media/1770088614.png"
                      alt="JAN Logo"
                      className="jan-white-14 mx-1"
                    /> Principles</a></li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" data-bs-auto-close="outside">Prespectives</a>
                  <ul className="dropdown-menu signledropdown">
                      <li><a className="dd-item" href="/blog/blog">Blogs</a></li>
                      <li><a className="dd-item" href="/blog/stakeholders-letters">Stakeholders Letter</a></li>
                      <li><a className="dd-item" href="/blog/media">Media</a></li>
                      <li><a className="dd-item" href="/blog/weekend-reading">Weekend Reading</a></li>
                  </ul>
                </li> 
              </ul>
            </nav>
          </div>
          <div className="sw-nav-cta">
            <ul className="sw-menu-sw-set d-flex align-items-center list-unstyled gap-3">
              <li><a href="#" className="onboard">Direct Onboarding</a></li>
              <li><a href="https://onlinefa.icici.bank.in/wealthspectrum/portal/sign-in" target="_blank" rel="noopener noreferrer"><button className="client-button"><span>Client Login</span></button></a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}