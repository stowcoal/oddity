import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.requestAnimationFrame = (cb) => { cb(); };

configure({ adapter: new Adapter() });
