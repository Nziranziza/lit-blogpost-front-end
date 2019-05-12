import React from "react";
import { shallow, mount } from "enzyme";
import { Login, mapDispatchToProps, mapStateToProps } from "../../components/Login";
const props = {
  onLoginInput: jest.fn(),
  loginUser: jest.fn().mockImplementation(() => Promise.resolve({ status: 200 })),
  verifyInput: jest.fn().mockImplementation(() => Promise.resolve('validationSuccess')),
  history: {
    push: jest.fn()
  },
  email: 'test@test.com',
  password: '123456',
};
describe("<Login />", () => {
  test("should render the <Login />", () => {
    const wrapper = shallow(<Login {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("should render the <Login /> with error", () => {
    const newProps = {...props, message: 'user not found'}
    const wrapper = shallow(<Login {...newProps} />);
    const errorSpan = wrapper.find('[data-test="error-field"]');
    expect(errorSpan.length).toEqual(1);
    expect(wrapper).toMatchSnapshot();
  });

  test("should signIn a user", () => {
    const wrapper = mount(<Login {...props} />);
    const { signIn } = wrapper.instance();
    const e = {
      preventDefault: jest.fn(),
    }
    signIn(e);
    const { verifyInput } = wrapper.props();
    expect(verifyInput).toHaveBeenCalled();
  });

  test("should not signIn a user", () => {
    const newProps = {
      ...props, 
      verifyInput: jest.fn().mockImplementation(() => Promise.resolve('validationFailure')),
    }
    const wrapper = mount(<Login {...newProps} />);
    const { signIn } = wrapper.instance();
    const e = {
      preventDefault: jest.fn(),
    }
    signIn(e);
    const { verifyInput } = wrapper.props();
    expect(verifyInput).toHaveBeenCalled();
  });

  test("should handle inout", () => {
    const wrapper = mount(<Login {...props} />);
    const { onChange } = wrapper.instance();
    const e = {
      preventDefault: jest.fn(),
      target: {
        value: 'helo',
        name: 'password'
      }
    }
    onChange(e);
    const { onLoginInput } = wrapper.props();
    expect(onLoginInput).toHaveBeenCalled();
  });
});

describe('mapDispatchToProps', () => {
  test('should map handleLoginInput to props', () => {
    const target = {
      name: 'password',
      value: 'hello',
    }
    const dispatch = jest.fn();
    const { onLoginInput } = mapDispatchToProps(dispatch);
    onLoginInput(target);
    expect(dispatch).toHaveBeenCalled();
  });

  test('should map login to props', () => {
    const  username= 'password';
    const  value = 'hello';
    
    const dispatch = jest.fn();
    const { loginUser } = mapDispatchToProps(dispatch);
    loginUser(username, value);
    expect(dispatch).toHaveBeenCalled();
  });

  test('should map inputValidation to props', () => {
    const  username= 'password';
    const  value = 'hello';
    
    const dispatch = jest.fn();
    const { verifyInput } = mapDispatchToProps(dispatch);
    verifyInput(username, value);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('mapStateToProps', () => {
  test('should map handleLoginInput to props', () => {
    const login = {
      message: '',
      credentials: {
        email: '',
        password: "",
      }
    }
    const { email, password, message } = mapStateToProps({ login });
    expect(email).toBeDefined();
    expect(password).toBeDefined();
    expect(message).toBeDefined();
  });
});
