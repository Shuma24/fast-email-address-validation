import { IProps } from './index.interface';

export const validateEmail = (props: IProps) => {
  if (!props.inputEmail.length || typeof props.inputEmail !== 'string') {
    throw new Error('inputEmail must be a string or no length');
  }

  if (!props.emailType) {
    throw new Error('emailType is required');
  }

  let result = {
    isValidEmail: false,
  };
  const customAccountLength = props.customAccountLength || 64;
  const customDomainLength = props.customDomainLength || 24;

  const ValidateRegexps = {
    all: /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/gi,
    gmail: /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/gi,
    googleEmail: /(\W|^)[\w.+\-]*@g(oogle)?mail\.com(\W|$)/gi,
    outlook: /(\W|^)[\w.+\-]*@outlook\.com(\W|$)/gi,
    yahoo: /(\W|^)[\w.+\-]*@yahoo\.com(\W|$)/gi,
  };

  props.emailType === 'all'
    ? ValidateRegexps.all.test(props.inputEmail)
      ? (result.isValidEmail = true)
      : (result.isValidEmail = false)
    : null;

  props.emailType === 'google'
    ? ValidateRegexps.googleEmail.test(props.inputEmail) ||
      ValidateRegexps.gmail.test(props.inputEmail)
      ? (result.isValidEmail = true)
      : (result.isValidEmail = false)
    : null;

  props.emailType === 'outlook'
    ? ValidateRegexps.outlook.test(props.inputEmail)
      ? (result.isValidEmail = true)
      : (result.isValidEmail = false)
    : null;

  props.emailType === 'yahoo'
    ? ValidateRegexps.yahoo.test(props.inputEmail)
      ? (result.isValidEmail = true)
      : (result.isValidEmail = false)
    : null;

  if (props.emailType === 'custom' && props.customEmail) {
    const splitCustomEmail = props.customEmail.split('.');
    const addFirstElementSlash = splitCustomEmail.map((el, index) =>
      index === 0 ? el + '\\' : el,
    );
    const createStringForRegex = addFirstElementSlash.join('.');
    const customEmailRegexValidate = new RegExp(
      `(\\W|^)[\\w.+\\-]*@${createStringForRegex}(\\W|$)`,
      'gi',
    );
    customEmailRegexValidate.test(props.inputEmail)
      ? (result.isValidEmail = true)
      : (result.isValidEmail = false);
  }

  if (result.isValidEmail) {
    const splitInputEmail = props.inputEmail.split('@');
    const userName = splitInputEmail[0];
    const domain = splitInputEmail[1];

    userName.length > customAccountLength || domain.length > customDomainLength
      ? (result.isValidEmail = false)
      : (result.isValidEmail = true);

    result.isValidEmail ? Object.assign(result, { userName: userName, domain: domain }) : null;
  }

  return result;
};
