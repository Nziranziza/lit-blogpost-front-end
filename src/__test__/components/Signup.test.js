import React from "react";
import { shallow, mount } from "enzyme";
import { Signup, mapDispatchToProps, mapStateToProps } from "../../components/Signup";

const props = {
  onSignupInput: jest.fn(),
  onSignup: jest.fn().mockImplementation(() => Promise.resolve({ status: 201 })),
  verifyInput: jest.fn().mockImplementation(() => Promise.resolve('validationSuccess')),
  history: {
    push: jest.fn()
  },
};

describe("<Signup />", () => {
  test("should render the <Signup />", () => {
    const wrapper = shallow(<Signup {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the <Login /> with error", () => {
    const newProps = {...props, message: 'user not found'}
    const wrapper = shallow(<Signup {...newProps} />);
    const errorSpan = wrapper.find('[data-test="error-field"]');
    expect(errorSpan.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  test("should signUp a user", () => {
    const wrapper = mount(<Signup {...props} />);
    const { signUp } = wrapper.instance();
    const e = {
      preventDefault: jest.fn(),
    }
    signUp(e);
    const { verifyInput } = wrapper.props();
    expect(verifyInput).toHaveBeenCalled();
  });

  test("should not signIn a user", () => {
    const newProps = {
      ...props, 
      verifyInput: jest.fn().mockImplementation(() => Promise.resolve('validationFailure')),
    }
    const wrapper = mount(<Signup {...newProps} />);
    const { signUp } = wrapper.instance();
    const e = {
      preventDefault: jest.fn(),
    }
    signUp(e);
    const { verifyInput } = wrapper.props();
    expect(verifyInput).toHaveBeenCalled();
  });

  test("should handle input", () => {
    const wrapper = mount(<Signup {...props} />);
    const { onChange } = wrapper.instance();
    const e = {
      preventDefault: jest.fn(),
      target: {
        value: 'helo',
        name: 'password'
      }
    }
    onChange(e);
    const { onSignupInput } = wrapper.props();
    expect(onSignupInput).toHaveBeenCalled();
  });
});

describe('mapDispatchToProps', () => {
  test('should map handleSignupInput to props', () => {
    const target = {
      name: 'password',
      value: 'hello',
    }
    const dispatch = jest.fn();
    const { onSignupInput } = mapDispatchToProps(dispatch);
    onSignupInput(target);
    expect(dispatch).toHaveBeenCalled();
  });

  test('should map register to props', () => {
    const  username= 'password';
    const  value = 'hello';
    const firstName = 'john';
    const lastName = 'doe';
    
    const dispatch = jest.fn();
    const { onSignup } = mapDispatchToProps(dispatch);
    onSignup(username, value, firstName, lastName);
    expect(dispatch).toHaveBeenCalled();
  });

  test('should map inputValidation to props', () => {
    const  username= 'password';
    const  value = 'hello';
    const firstName = 'john';
    const lastName = 'doe';
    
    const dispatch = jest.fn();
    const { verifyInput } = mapDispatchToProps(dispatch);
    verifyInput(username, value, firstName, lastName);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('mapStateToProps', () => {
  test('should map handleLoginInput to props', () => {
    const signup = {
      message: '',
      credentials: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }
    }
    const { email, password, message, firstName, lastName } = mapStateToProps({ signup });
    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(message).toBeDefined();
    expect(firstName).toBeDefined();
    expect(lastName).toBeDefined();
  });
});
