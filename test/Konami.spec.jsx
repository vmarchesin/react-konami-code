import React from 'react';
import Konami from '../src';

describe('Test cases', () => {
  it('should render default component', () => {
    const wrapper = shallow(<Konami>{'Hey, I\'m an Easter Egg!'}</Konami>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should add a className to the wrapping div', () => {
    const wrapper = shallow(<Konami className="customClass">{'Hey, I\'m an Easter Egg!'}</Konami>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should not be done after wrong code input', () => {
    const wrapper = shallow(<Konami>{'Hey, I\'m an Easter Egg!'}</Konami>);

    const instance = wrapper.instance();
    instance.onKeyUp({ keyCode: 38 });
    instance.onKeyUp({ keyCode: 37 });
    instance.onKeyUp({ keyCode: 40 });
    instance.onKeyUp({ keyCode: 40 });
    instance.onKeyUp({ keyCode: 37 });
    instance.onKeyUp({ keyCode: 39 });
    instance.onKeyUp({ keyCode: 37 });
    instance.onKeyUp({ keyCode: 39 });
    instance.onKeyUp({ keyCode: 66 });
    instance.onKeyUp({ keyCode: 65 });

    expect(wrapper.state('done')).toEqual(false);
  });

  it('should be done after code input', () => {
    const cb = jest.fn();
    const wrapper = shallow(<Konami action={cb}>{'Hey, I\'m an Easter Egg!'}</Konami>);

    const instance = wrapper.instance();
    instance.onKeyUp({ keyCode: 38 });
    instance.onKeyUp({ keyCode: 38 });
    instance.onKeyUp({ keyCode: 40 });
    instance.onKeyUp({ keyCode: 40 });
    instance.onKeyUp({ keyCode: 37 });
    instance.onKeyUp({ keyCode: 39 });
    instance.onKeyUp({ keyCode: 37 });
    instance.onKeyUp({ keyCode: 39 });
    instance.onKeyUp({ keyCode: 66 });
    instance.onKeyUp({ keyCode: 65 });

    expect(wrapper.state('done')).toEqual(true);
    expect(cb.mock.calls.length).toEqual(1);
  });

  it('should not be done after code input while disabled', () => {
    const wrapper = shallow(<Konami disabled>{'Hey, I\'m an Easter Egg!'}</Konami>);

    const instance = wrapper.instance();
    instance.onKeyUp({ keyCode: 38 });
    instance.onKeyUp({ keyCode: 38 });
    instance.onKeyUp({ keyCode: 40 });
    instance.onKeyUp({ keyCode: 40 });
    instance.onKeyUp({ keyCode: 37 });
    instance.onKeyUp({ keyCode: 39 });
    instance.onKeyUp({ keyCode: 37 });
    instance.onKeyUp({ keyCode: 39 });
    instance.onKeyUp({ keyCode: 66 });
    instance.onKeyUp({ keyCode: 65 });

    expect(wrapper.state('done')).toEqual(false);
  });

  it('should be done after custom code input', () => {
    const wrapper = shallow(<Konami code={[55, 55]}>{'Hey, I\'m an Easter Egg!'}</Konami>);

    const instance = wrapper.instance();
    instance.onKeyUp({ keyCode: 55 });
    instance.onKeyUp({ keyCode: 55 });

    expect(wrapper.state('done')).toEqual(true);
  });

  it('should not be done after timeout', (done) => {
    const onEnd = jest.fn();
    const wrapper = shallow(
      <Konami code={[55, 55]} onTimeout={onEnd} timeout={1000}>
        {'Hey, I\'m an Easter Egg!'}
      </Konami>,
    );

    const instance = wrapper.instance();
    instance.onKeyUp({ keyCode: 55 });
    instance.onKeyUp({ keyCode: 55 });

    setTimeout(() => {
      expect(wrapper.state('done')).toEqual(false);
      expect(onEnd.mock.calls.length).toEqual(1);
      done();
    }, 1000);
  });

  it('should not be done if you are slower than resetDelay', (done) => {
    const wrapper = shallow(<Konami code={[55, 55]}>{'Hey, I\'m an Easter Egg!'}</Konami>);

    const instance = wrapper.instance();
    instance.onKeyUp({ keyCode: 55 });

    setTimeout(() => {
      instance.onKeyUp({ keyCode: 55 });
      expect(wrapper.state('done')).toEqual(false);
      done();
    }, 1000);
  });

  it('should be done if you are slow but resetDelay is zero', (done) => {
    const wrapper = shallow(<Konami code={[55, 55]} resetDelay={0}>{'Hey, I\'m an Easter Egg!'}</Konami>);

    const instance = wrapper.instance();
    instance.onKeyUp({ keyCode: 55 });

    setTimeout(() => {
      instance.onKeyUp({ keyCode: 55 });
      expect(wrapper.state('done')).toEqual(true);
      done();
    }, 1000);
  });

  it('should reset input if user is slow', (done) => {
    const wrapper = shallow(<Konami code={[55, 55]}>{'Hey, I\'m an Easter Egg!'}</Konami>);

    const instance = wrapper.instance();
    instance.onKeyUp({ keyCode: 55 });

    setTimeout(() => {
      expect(wrapper.state('input')).toEqual([]);
      done();
    }, 1000);
  });

  it('should unmount component', () => {
    const wrapper = shallow(<Konami code={[55, 55]}>{'Hey, I\'m an Easter Egg!'}</Konami>);

    const instance = wrapper.instance();
    const componentWillUnmount = jest.spyOn(instance, 'componentWillUnmount');
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalled();
  });
});
