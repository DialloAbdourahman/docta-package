import { ILanguage } from "../../models";

export class LanguageOutputDto {
  title: string;
  level: string;

  constructor(lang: ILanguage) {
    this.title = lang.title;
    this.level = lang.level;
  }
}
