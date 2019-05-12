import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import PropTypes from "prop-types";
import { fetchPosts } from "../../redux/actions/postActions";

export class Home extends Component {
  componentDidMount() {
    const { onFetchPosts } = this.props;
    onFetchPosts();
  }

  loader = () => (
    <ContentLoader
      height={200}
      width={400}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      data-test="loading-skeleton"
    >
      <rect x="75" y="10" rx="3" ry="3" width="250" height="6" />
      <rect x="0" y="30" rx="0" ry="0" width="400" height="100" />
      <rect x="15" y="140" rx="3" ry="3" width="201" height="3" />
      <rect x="15" y="150" rx="3" ry="3" width="350" height="3" />
      <rect x="15" y="160" rx="3" ry="3" width="380" height="3" />
      <rect x="15" y="170" rx="3" ry="3" width="380" height="3" />
      <rect x="15" y="180" rx="3" ry="3" width="380" height="3" />
      <rect x="15" y="190" rx="3" ry="3" width="380" height="3" />
      <rect x="15" y="200" rx="3" ry="3" width="380" height="3" />
    </ContentLoader>
  );

  render() {
    const { postList } = this.props;
    return (
      <div className="container margin-top">
        {postList.length ? (
          postList.map(post => (
            <div className="card" key={post.id} data-test="post-card">
              <Link to={`/posts/${post.id}`} className="read-more">
                <h2 className="card-title">{post.title}</h2>
              </Link>
              <img className="card-img-top" src={post.cover} alt={post.title} />
              <div className="card-body">
                <p className="card-text">{post.text.slice(0, 200)}</p>
              </div>
              <Link to={`/posts/${post.id}`} className="read-more">
                Read More...
              </Link>
            </div>
          ))
        ) : (
          <div>
            <div className="card">{this.loader()}</div>
            <div className="card">{this.loader()}</div>
            <div className="card">{this.loader()}</div>
          </div>
        )}
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  onFetchPosts: () => dispatch(fetchPosts())
});

export const mapStateToProps = ({ posts: { postList } }) => ({ postList });

Home.propTypes = {
  postList: PropTypes.array,
  onFetchPosts: PropTypes.func
};

Home.defaultProps = {
  onFetchPosts: PropTypes.func,
  postList: []
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
