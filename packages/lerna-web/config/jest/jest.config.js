// import './jsdom-config'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// create "root"-div element
// https://facebook.github.io/jest/docs/en/tutorial-jquery.html
document.body.innerHTML = '<div id="root" />'
