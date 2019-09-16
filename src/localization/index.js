import { TranslateService } from 'ter-localization';
import en from './en';
import jp from './jp';

TranslateService.setConfig(require('./config'));

TranslateService.setTranslate({
  en,
  jp,
});

TranslateService.setLanguage('jp');

export default TranslateService;
