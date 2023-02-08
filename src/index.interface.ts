type emailTypes = 'google' | 'yahoo' | 'custom' | 'outlook' | 'all';

export interface IProps {
  inputEmail: string;
  emailType: emailTypes;
  customEmail?: string;
  customAccountLength?: number;
  customDomainLength?: number;
}
