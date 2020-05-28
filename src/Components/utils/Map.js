import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import mapping from '../Library/Mapping.js';
import findPlace from '../Library/FindPlace';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlace: '',
      searchPlace: '',
      x: this.props.position.x,
      y: this.props.position.y,
      click: this.props.position.click,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSearchValue = this.handleSearchValue.bind(this);
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleSearchValue = () => {
    this.setState({ currentPlace: this.state.searchPlace });
  };

  componentDidMount() {
    mapping(this.state, this.props.marketList);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentPlace !== prevState.currentPlace) {
      findPlace(this.state);
    }
  }

  render() {
    return (
      <div>
        <Mapping id="mapContainer"></Mapping>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.handleSearchValue();
            }}
          >
            <Link
              style={{
                color: 'dodgerblue',
              }}
              to="/"
            >
              HOME
            </Link>
            <input
              type="text"
              placeholder="찾고싶은 곳이 있나요?"
              style={{ width: 550, height: 50 }}
              onChange={this.handleInputValue('searchPlace')}
              id="keyword"
            ></input>
            <input
              type="submit"
              value="찾기"
              style={{ width: 130, height: 50 }}
            />
          </form>
        </div>
      </div>
    );
  }
}

const Mapping = styled.div`
  width: 1800px;
  height: 900px;
  margin: 0 auto;
`;

export default withRouter(Map);
