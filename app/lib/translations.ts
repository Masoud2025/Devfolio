import { en } from "../messages/en";
import { fa } from "../messages/fa";
import { de } from "../messages/de";
import { es } from "../messages/es";
import { ptBR } from "../messages/pt-BR";
import { ja } from "../messages/ja";
import { zh } from "../messages/zh";
import { sv } from "../messages/sv";
import { no } from "../messages/no";
import { ru } from "../messages/ru";
import { uk } from "../messages/uk";

export const translations = {
  en,
  fa,
  de,
  es,
  "pt-BR": ptBR,
  ja,
  zh,
  sv,
  no,
  ru,
  uk,
};

export type Locale =
  | "en"
  | "fa"
  | "de"
  | "es"
  | "pt-BR"
  | "ja"
  | "zh"
  | "sv"
  | "no"
  | "ru"
  | "uk";
