import data from './landing-static.json';
import type { CodeLine } from '../i18n/types';

interface LandingStaticData {
  heroTerminal: CodeLine[];
  quickStartTerminals: CodeLine[][];
  featureIcons: string[];
  quickStartNumbers: string[];
  downloadPlatforms: Array<{
    id: string;
    commands: string[];
  }>;
  verifyCommand: string;
}

export const landingStatic = data as LandingStaticData;
