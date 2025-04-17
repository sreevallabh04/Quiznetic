export type QuestionType = 'multiple_choice' | 'fill_blank' | 'matching' | 'drag_drop_order' | 'dropdown';

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  question: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: string[];
  correct: string;
  mapData?: any;
  imageUrl?: string;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill_blank';
  correct: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  prompt: string;
  pairs: { left: MatchingItem; right: MatchingItem }[];
}

export interface DragDropOrderQuestion extends BaseQuestion {
  type: 'drag_drop_order';
  prompt: string;
  items: DragDropOrderItem[];
}

export interface DropdownQuestion extends BaseQuestion {
  type: 'dropdown';
  dropdowns: {
    placeholder: string;
    options: string[];
    correct: string;
  }[];
}

export interface MatchingItem {
  id: string;
  text: string;
}

export interface DragDropOrderItem {
  id: string;
  text: string;
}

export type Question = 
  | MultipleChoiceQuestion 
  | FillBlankQuestion 
  | MatchingQuestion 
  | DragDropOrderQuestion 
  | DropdownQuestion;

export interface APIResponse {
  success: boolean;
  questions: Question[];
  error?: string;
}

export interface QuestionTypeResponse {
  success: boolean;
  questionTypes: {
    id: QuestionType;
    label: string;
    description: string;
  }[];
  error?: string;
} 