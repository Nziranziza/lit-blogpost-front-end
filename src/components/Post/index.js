import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContentLoader from "react-content-loader";
import { fetchPost } from "../../redux/actions/postActions";

class Post extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      onFetchPost
    } = this.props;
    onFetchPost(id);
  }

  render() {
    const { post } = this.props;
    return (
      <div className="container margin-top">
        {Object.keys(post).length ? (
          <div>
            <div className="view">
              <img
                className="card-img-top"
                src={post.cover}
                alt="Card image cap"
              />
              <a href="#!">
                <div className="mask rgba-white-slight" />
              </a>
            </div>
            <div className="card-body card-body-cascade text-center">
              <h4 className="card-title">
                <strong>{post.title}</strong>
              </h4>
              <p className="card-text">{post.text}</p>
              <a className="px-2 fa-lg li-ic">
                <i className="fab fa-linkedin-in" />
              </a>
              <a className="px-2 fa-lg tw-ic">
                <i className="fab fa-twitter" />
              </a>
              <a className="px-2 fa-lg fb-ic">
                <i className="fab fa-facebook-f" />
              </a>
            </div>
          </div>
        ) : (
          <ContentLoader
            height={200}
            width={400}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
          >
            <rect x="0" y="0" rx="0" ry="0" width="400" height="100" />
            <rect x="75" y="110" rx="3" ry="3" width="250" height="6" />
            <rect x="15" y="130" rx="3" ry="3" width="201" height="3" />
            <rect x="15" y="140" rx="3" ry="3" width="350" height="3" />
            <rect x="15" y="150" rx="3" ry="3" width="380" height="3" />
            <rect x="15" y="160" rx="3" ry="3" width="380" height="3" />
            <rect x="15" y="170" rx="3" ry="3" width="380" height="3" />
            <rect x="15" y="180" rx="3" ry="3" width="380" height="3" />
            <rect x="15" y="290" rx="3" ry="3" width="380" height="3" />
          </ContentLoader>
        )}
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  onFetchPost: id => dispatch(fetchPost(id))
});

export const mapStateToProps = ({ posts: { post } }) => ({ post });

Post.propTypes = {
  match: PropTypes.any.isRequired,
  onFetchPost: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
