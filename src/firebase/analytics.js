import { getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const analytics = getAnalytics(getApp());

export default analytics;
