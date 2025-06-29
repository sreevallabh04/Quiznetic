// Fallback data for when API is unavailable
import { Question } from './api';

export const fallbackQuestions: Record<string, Record<string, Question[]>> = {
  maths: {
    'Algebra Basics': [
      {
        id: 'fb_math_1',
        type: 'multiple_choice',
        question: 'What is the value of x in the equation 2x + 5 = 15?',
        options: ['5', '10', '7', '3'],
        correct: '5'
      },
      {
        id: 'fb_math_2',
        type: 'fill_blank',
        question: 'The sum of angles in a triangle is [BLANK] degrees.',
        correct: '180'
      },
      {
        id: 'fb_math_3',
        type: 'multiple_choice',
        question: 'Which of the following is a prime number?',
        options: ['15', '21', '17', '25'],
        correct: '17'
      }
    ],
    'Geometry': [
      {
        id: 'fb_math_4',
        type: 'multiple_choice',
        question: 'What is the area of a rectangle with length 8 cm and width 5 cm?',
        options: ['40 sq cm', '26 sq cm', '13 sq cm', '30 sq cm'],
        correct: '40 sq cm'
      },
      {
        id: 'fb_math_5',
        type: 'drag_drop_order',
        prompt: 'Arrange these shapes by number of sides (least to most):',
        items: [
          { id: 'triangle', text: 'Triangle' },
          { id: 'square', text: 'Square' },
          { id: 'pentagon', text: 'Pentagon' },
          { id: 'hexagon', text: 'Hexagon' }
        ]
      }
    ]
  },
  science: {
    'Human Body': [
      {
        id: 'fb_sci_1',
        type: 'multiple_choice',
        question: 'Which organ pumps blood throughout the body?',
        options: ['Lungs', 'Heart', 'Liver', 'Kidney'],
        correct: 'Heart'
      },
      {
        id: 'fb_sci_2',
        type: 'matching',
        prompt: 'Match the organ with its function:',
        pairs: [
          { left: { id: 'L1', text: 'Heart' }, right: { id: 'R1', text: 'Pumps blood' } },
          { left: { id: 'L2', text: 'Lungs' }, right: { id: 'R2', text: 'Exchange gases' } },
          { left: { id: 'L3', text: 'Brain' }, right: { id: 'R3', text: 'Controls body' } }
        ]
      }
    ],
    'Plants': [
      {
        id: 'fb_sci_3',
        type: 'fill_blank',
        question: 'Plants make their own food through a process called [BLANK].',
        correct: 'photosynthesis'
      },
      {
        id: 'fb_sci_4',
        type: 'dropdown',
        question: 'Plants need [DROPDOWN_1] from the sun and [DROPDOWN_2] from the soil to grow.',
        dropdowns: [
          { placeholder: '[DROPDOWN_1]', options: ['light', 'heat', 'wind'], correct: 'light' },
          { placeholder: '[DROPDOWN_2]', options: ['water', 'rocks', 'sand'], correct: 'water' }
        ]
      }
    ]
  },
  social: {
    'Indian Geography': [
      {
        id: 'fb_soc_1',
        type: 'multiple_choice',
        question: 'MaP: What is the capital of Telangana?',
        options: ['Mumbai', 'Hyderabad', 'Chennai', 'Bangalore'],
        correct: 'Hyderabad',
        mapData: {
          center: [17.8495, 79.1151],
          zoom: 6,
          marker: [17.8495, 79.1151],
          type: 'state',
          name: 'telangana'
        }
      },
      {
        id: 'fb_soc_2',
        type: 'multiple_choice',
        question: 'Which river flows through Telangana?',
        options: ['Ganges', 'Godavari', 'Yamuna', 'Narmada'],
        correct: 'Godavari'
      }
    ],
    'Indian History': [
      {
        id: 'fb_soc_3',
        type: 'drag_drop_order',
        prompt: 'Arrange these historical periods in chronological order:',
        items: [
          { id: 'ancient', text: 'Ancient Period' },
          { id: 'medieval', text: 'Medieval Period' },
          { id: 'modern', text: 'Modern Period' }
        ]
      },
      {
        id: 'fb_soc_4',
        type: 'fill_blank',
        question: 'India gained independence from British rule in the year [BLANK].',
        correct: '1947'
      }
    ]
  }
};

export const getFallbackQuestions = (subject: string, chapter: string): Question[] => {
  const subjectData = fallbackQuestions[subject.toLowerCase()];
  if (!subjectData) {
    return getDefaultQuestions();
  }

  const chapterData = subjectData[chapter] || Object.values(subjectData)[0];
  return chapterData || getDefaultQuestions();
};

const getDefaultQuestions = (): Question[] => [
  {
    id: 'default_1',
    type: 'multiple_choice',
    question: 'This is a sample question. The API service is currently unavailable.',
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    correct: 'Option A'
  },
  {
    id: 'default_2',
    type: 'fill_blank',
    question: 'Please check your internet connection and [BLANK] again later.',
    correct: 'try'
  }
]; 