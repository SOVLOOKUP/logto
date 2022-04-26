import { Language } from '@logto/phrases';
import { SignInExperience, SignInMethods } from '@logto/schemas';

export enum LanguageMode {
  Auto = 'auto',
  Fixed = 'fixed',
}

export type SignInExperienceForm = Omit<SignInExperience, 'signInMethods' | 'languageInfo'> & {
  signInMethods: {
    primary?: keyof SignInMethods;
    enableSecondary: boolean;
    username: boolean;
    sms: boolean;
    email: boolean;
    social: boolean;
  };
  languageInfo: {
    mode: LanguageMode;
    fixedLanguage: Language;
    fallbackLanguage: Language;
  };
};
