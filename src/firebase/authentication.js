import { getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const auth = getAuth(getApp());

export default auth;
