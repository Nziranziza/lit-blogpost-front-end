import React from "react";
import { shallow } from "enzyme";
import { Home, mapDispatchToProps } from "../../components/Home";
import { posts } from "../../__mocks__/dummyData.json";

const props = {
  onFetchPosts: jest.fn()
};
describe("<Home />", () => {
  test("should render the <App />", () => {
    const wrapper = shallow(<Home {...props} />);
    const loadingSkeleton = wrapper.find('[data-test="loading-skeleton"]');
    expect(loadingSkeleton.length).toEqual(3);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the <App /> with posts", () => {
    const newProps = { ...props, postList: posts };
    const wrapper = shallow(<Home {...newProps} />);
    const postCard = wrapper.find('[data-test="post-card"]');
    expect(postCard.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("mapDispatchToProps", () => {
  test("should map fetchPosts to props", () => {
    const dispatch = jest.fn();
    const { onFetchPosts } = mapDispatchToProps(dispatch);
    onFetchPosts();
    expect(dispatch).toHaveBeenCalled();
  });
});
