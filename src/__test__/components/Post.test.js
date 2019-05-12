import React from "react";
import { shallow } from "enzyme";
import { Post, mapDispatchToProps } from "../../components/Post";
import { posts } from "../../__mocks__/dummyData.json";

const props = {
  post: posts[0],
  match: {
      params: {
          id: '',
      }
  },
  onFetchPost: jest.fn(),
};
describe("<Post />", () => {
  test("should render the <Post />", () => {
    const wrapper = shallow(<Post {...props}/>);
    const postCard = wrapper.find('[data-test="post-card"]');
    expect(postCard.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the <Post /> with content loader", () => {
    const newProps = { ...props, post: {} };
    const wrapper = shallow(<Post {...newProps} />);
    const postCard = wrapper.find('[data-test="skeleton-loading"]');
    expect(postCard.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("mapDispatchToProps", () => {
  test("should map fetchPosts to props", () => {
    const dispatch = jest.fn();
    const { onFetchPost } = mapDispatchToProps(dispatch);
    onFetchPost();
    expect(dispatch).toHaveBeenCalled();
  });
});
