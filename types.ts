
export enum GameStage {
  WELCOME = 'welcome',
  CIPHER = 'cipher',
  AI_ETHICS = 'ai_ethics',
  LOGIC = 'logic',
  BOOLEAN_LOGIC = 'boolean_logic',
  BINARY_SEARCH = 'binary_search',
  CYBER = 'cyber',
  SUCCESS = 'success'
}

export interface LogicCommand {
  id: string;
  label: string;
  hebrew: string;
  icon: string;
}

export interface CyberFlag {
  id: string;
  found: boolean;
}
