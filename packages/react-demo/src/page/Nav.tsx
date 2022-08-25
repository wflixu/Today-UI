import { Link } from "react-router-dom";
import './nav.css'
function Nav() {
  return (
    <nav>
      <Link className="link" to="/tooltip">
        tooltip
      </Link>
      <Link className="link" to="/dialog">
        dialog
      </Link>
      <Link className="link" to="/dropdown">
        dropdown
      </Link>
    </nav>
  );
}

export default Nav;
