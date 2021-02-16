import React, { Component } from "react";
import { Link } from "../routes";

import web3 from "./abis/web3";

class Header extends Component {
  async componentWillMount() {
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
  }

  constructor(props) {
    super(props);

    this.state = {
      account: "",
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <Link route="/">
            <a className="navbar-brand col-sm-3 col-md-2 mr-0 item">
              &nbsp; HospCord
            </a>
          </Link>

          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-secondary">
                <h6 id="account">Account: {this.state.account}</h6>
              </small>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
