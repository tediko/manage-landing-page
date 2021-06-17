import Slider from './slider';
import toggleMenu from './toggleMenu';
import stickyHeader from './stickyHeader';
import formValidation from './formValidation';
import onScrollAnimations from './onScrollAnimations';
import loadEvents from './loadEvents';

const slider = new Slider();
const menu = new toggleMenu();
const header = new stickyHeader();
const form = new formValidation();
const onScroll = new onScrollAnimations();
const onLoad = new loadEvents();